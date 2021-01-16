import React, { useEffect, useState } from 'react';
import { Dimensions, Modal, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { GetBirtsFromTo } from '../../api/HttpRequests';
import modalStyle from '../../css/modalStyles';
import styles from '../../css/styles';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width - 30;

interface IPhonetic {
    'year': number;
    'count': number;
    'perc': number;
}

interface IResponse {
    'babyArray': IPhonetic[]
}

const BirthsFromTo: React.FC = () => {
    const [fromYear, setFromYear] = useState<string>("");
    const [toYear, setToYear] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);
    const [stateArray, setStateArray] = useState<IResponse>();
    const [inputColor, setInputColor] = useState<string>("black");
    const [infoMessage, setInfoMessage] = useState<string>("");
    const [showInfo, setShowInfo] = useState<boolean>(false);

    const [years, setYears] = useState<Array<string>>(["2020"]);
    const [babiesBorn, setBabiesBorn] = useState<number[]>([0]);

    const processData = async (year: string, type: boolean) => {
        try {
            const digits_only = (string: any) => [...string].every(c => '0123456789'.includes(c));
            var fromValue = fromYear;
            var toValue = toYear;
            
            if (type) {
                setFromYear(year);
                fromValue = year;
            }
            else {
                setToYear(year);
                toValue = year;
            }

            if (!fromValue || !toValue) {
                setInputColor("black");
                setLoading(false);
                setInfoMessage("");
            }
            else if (!digits_only(fromValue.toLowerCase()) || !digits_only(toValue.toLowerCase())) {
                setInputColor("red");
                setLoading(false);
                var message = type ? "Invalid From Year" : "Invalid To Year";
                setInfoMessage(message);
            }
            else {
                setInputColor("black");
                setInfoMessage("Loading");
                setLoading(false);

                // ALTERAR VERIFICACAO HARDCODED
                if(Number(fromValue) < 1800) return;
                if(Number(toValue) > 2020) return;

                const response = await GetBirtsFromTo(fromValue, toValue);

                if (response && response.data) {
                    const responseData: IResponse = response.data;

                    setLoading(true);
                    //setStateArray(responseData);
                    if(responseData.babyArray.length < 1) return;

                    var years:string[] = []
                    var count:number[] = []

                    
                    var t3 = Math.floor(responseData.babyArray.length/10) + 1;

                    responseData.babyArray.forEach((element,index) => {                        
                        if(index%t3 === 0){
                            years.push(element.year.toString());
                          }
                          else{
                            years.push("");
                          }
                        count.push(Math.round(element.count/1000));
                    });
                    
                    setYears(years);
                    setBabiesBorn(count);
                }
            }
        } catch (err) {
            console.log(err);
        }

    }
    /*
        useEffect(() => {
            processData()},[]);
    */
    const data = {
        labels: years,
        datasets: [
            {
                data: babiesBorn,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
                strokeWidth: 2, // optional
            }
        ],
        legend: ["Babies born (in k)"] // optional
    };
    const chartConfig = {
        decimalPlaces: 0,
        backgroundGradientFrom: "#ffffff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#ffffff",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    return (

        <ScrollView style={{ marginLeft: 15, marginRight: 15, marginTop: 10 }}>
            <View style={{ flexDirection: "row" }}>
                <TextInput keyboardType="numeric" style={[styles.input, { borderColor: inputColor }]} onChangeText={year => processData(year, true)} placeholder="From Year" />
                <View style={{ alignItems: "flex-end", marginTop: 20, marginLeft: 20 }}>
                    <Icon
                        onPress={() => {
                            setShowInfo(!showInfo);
                        }}
                        color="#0CC"
                        name="info"
                        size={35}
                        type="material"
                    />
                </View>
            </View>
            <View>
                <TextInput keyboardType="numeric" style={[styles.input, { borderColor: inputColor }]} onChangeText={year => processData(year, false)} placeholder="To Year" />
            </View>
            {isLoading ?
                <View>
                    {stateArray?.babyArray.map((element) =>
                        <View key={element.year} style={styles.dataItem}>
                            <Text style={[styles.basicText]} key={element.year}>Year: {element.year} , Count: {element.count}, Perc:{element.perc}</Text>
                        </View>
                    )}
                </View>
                : <Text style={{ marginTop: 20 }}>{infoMessage}</Text>}
            <View style={modalStyle.centeredView} onTouchEnd={() => {
                setShowInfo(false)
            }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showInfo}
                >
                    <View style={modalStyle.centeredView}>
                        <View style={modalStyle.modalView}>
                            <Text style={modalStyle.modalText}>Line Chart with the number of babies born between the selected years.</Text>
                        </View>
                    </View>
                </Modal>
            </View>

            <LineChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
            />
        </ScrollView >
    );
}
export default BirthsFromTo;