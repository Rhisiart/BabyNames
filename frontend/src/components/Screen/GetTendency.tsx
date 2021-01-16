import React, { useEffect, useState } from 'react';
import { Dimensions, Modal, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { GetTendency } from '../../api/HttpRequests';
import modalStyle from '../../css/modalStyles';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width - 30;

interface ITendency {
    'name': string;
    'prediction_born': number;
}

interface IResponse {
    'popular_names': ITendency[]
}

const GetTendencyScreen: React.FC = () => {

    const topColors: string[] = ["#003f5c", "#58508d", "#bc5090", "#ff6361", "#ffa600"]

    const [isLoading, setLoading] = useState<boolean>(false);
    const [stateArray, setStateArray] = useState<IResponse>();
    const [showInfo, setShowInfo] = useState<boolean>(false);

    const [dataInfo, setData] = useState<{ name: string, babiesBorn: number, color: string, legendFontColor: string, legendFontSize: number }[]>([{
        name: "",
        babiesBorn: 0,
        color: "#ff0000",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    }]);

    const processData = async () => {
        try {

            const response = await GetTendency("2015");

            if (response && response.data) {
                const responseData: IResponse = response.data;

                setLoading(true);
                //setStateArray(responseData);
                var dataInfoManage: { name: string, babiesBorn: number, color: string, legendFontColor: string, legendFontSize: number }[] = [];

                responseData.popular_names.forEach((element, index) => {
                    dataInfoManage.push({
                        name: " - '" + element.name + "'",
                        babiesBorn: element.prediction_born,
                        color: topColors[index],
                        legendFontColor: "#7F7F7F",
                        legendFontSize: 15
                    })
                });

                setData(dataInfoManage);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        processData()
    }, []);


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
        <View>
            <View style={{ alignItems: "flex-end", marginTop: 20, marginLeft: 20, marginRight: 15 }}>
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
            {isLoading ?
                <View>
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
                    {stateArray?.popular_names.map((element) =>
                        <Text key={element.name}>Name {element.name} com {element.prediction_born} nascidos</Text>
                    )}
                </View>
                : <Text>Loading</Text>}

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
                            <Text style={modalStyle.modalText}>For the 2015 year, it will retrieve the top 5 more predicted names and the predicted number of babies with those names.</Text>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}


export default GetTendencyScreen;