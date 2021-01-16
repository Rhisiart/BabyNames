import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal, ScrollView, TextInput, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { GetPhoneticTrend } from '../../api/HttpRequests';
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
    'phonetic': string;
    'names': string[];
    'count': number;
}

interface IResponse {
    'phonetic_trends': IPhonetic[]
}

const PhoneticTrend: React.FC = () => {

    const topColors: string[] = ["#003f5c","#58508d","#bc5090","#ff6361","#ffa600"]

    const [isLoading, setLoading] = useState<boolean>(false);
    const [stateArray, setStateArray] = useState<IResponse>();
    const [inputColor, setInputColor] = useState<string>("black");
    const [infoMessage, setInfoMessage] = useState<string>("");
    const [showInfo, setShowInfo] = useState<boolean>(false);

    const [dataInfo, setData] = useState<{ name: string, babiesBorn: number, color: string, legendFontColor: string, legendFontSize: number }[]>([{
        name: "",
        babiesBorn: 0,
        color: "#ff0000",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    }]);

    const processData = async (year: string) => {

        try {
            const digits_only = (string: any) => [...string].every(c => '0123456789'.includes(c));

            if (!year) {
                setInputColor("black");
                setLoading(false);
                setInfoMessage("");
            }
            else if (!digits_only(year) || !year) {
                console.log("Invalid");
                setInputColor("red");
                setLoading(false);
                setInfoMessage("Invalid Year");
            }
            else {
                setInputColor("black");
                setInfoMessage("Loading");
                setLoading(false);
                const response = await GetPhoneticTrend(year);
                setInfoMessage("Loaded");
                setLoading(true);

                if (response && response.data) {
                    const responseData: IResponse = response.data;
                    if (responseData.phonetic_trends.length == 0) {
                        setLoading(false);
                        setInfoMessage("No information for selected year");
                    }
                    else {
                        //setStateArray(responseData);

                        var dataInfoManage: { name: string, babiesBorn: number, color: string, legendFontColor: string, legendFontSize: number }[] = [];

                        responseData.phonetic_trends.forEach((element, index) => {
                            dataInfoManage.push({
                                name: " - '" + element.phonetic + "'",
                                babiesBorn: element.count,
                                color:topColors[index],
                                legendFontColor: "#7F7F7F",
                                legendFontSize: 15
                            })
                        });

                        setData(dataInfoManage);
                    }

                }
                else {
                    setLoading(false);
                    setInfoMessage("Error getting Info Data");
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

    const data = dataInfo;

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
            <View style={{ flexDirection: "row" }} >
                <TextInput keyboardType="numeric" style={[styles.input, { borderColor: inputColor }]} onChangeText={year => processData(year)} placeholder="Choose Year" />

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
            {isLoading ?
                <View style={{ marginTop: 10 }}>
                    <PieChart
                        data={data}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                        accessor={"babiesBorn"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        absolute
                    />
                    {stateArray?.phonetic_trends.map((element) =>
                        <View key={element.phonetic} style={styles.dataItem}>
                            <Text style={styles.basicText}>{element.phonetic} with {element.count} born babies</Text>
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
                            <Text style={modalStyle.modalText}>For the specified year, it will show the top 5 phonetics used.</Text>
                        </View>
                    </View>
                </Modal>
            </View>

        </ScrollView>
    );
}



export default PhoneticTrend;