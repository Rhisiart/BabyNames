import React, { useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { GetHammingDistance } from '../../api/HttpRequests';
import modalStyle from '../../css/modalStyles';
import styles from '../../css/styles';
import { Dimensions } from "react-native";
interface IResponse {
    'hamming_distances': string[]
}

const HammingDistance: React.FC = () => {


    var savedName: string = "";
    const [isLoading, setLoading] = useState<boolean>(false);
    const [stateArray, setStateArray] = useState<IResponse>();
    const [inputColor, setInputColor] = useState<string>("black");
    const [infoMessage, setInfoMessage] = useState<string>("");
    const [showInfo, setShowInfo] = useState<boolean>(false);


    const processData = async (name: string) => {
        try {
            const digits_only = (string: any) => [...string].every(c => 'abcdefghijklmnopqrstuvxwyz \''.includes(c));
            if (!name) {
                setInputColor("black");
                setLoading(false);
                setInfoMessage("");
            }
            else if (!digits_only(name.toLowerCase())) {
                setInputColor("red");
                setLoading(false);
                setInfoMessage("Invalid Name");
            }
            else {
                setInputColor("black");
                setInfoMessage("Loading");
                setLoading(false);

                savedName = name;
                const response = await GetHammingDistance(name);
                setInfoMessage("Loaded");
                setLoading(true);

                if (response && response.data) {
                    if (savedName === name) {
                        const responseData: IResponse = response.data;
                        if (responseData.hamming_distances.length == 0) {
                            setLoading(false);
                            setInfoMessage("No information for selected name");
                        }
                        else {
                            setStateArray(responseData);
                        }
                    }

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

    return (
        <ScrollView style={{ marginLeft: 15, marginRight: 15, marginTop: 10 }}>
            <View style={{ flexDirection: "row" }}>
                <TextInput style={[styles.input, { borderColor: inputColor }]} onChangeText={name => processData(name)} placeholder="Search Name" />
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
                <View style={{ marginTop: 20 }}>

                    {stateArray?.hamming_distances.map((element) =>
                        <View key={element} style={[styles.dataItem,{flexDirection:"row"}]}>
                            <Image
                                style={{width: 32,height: 32, marginRight:10}}
                                source={require("../../img/userLogo.png")}
                            />
                            <Text style={[styles.basicText]}>{element}</Text>
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
                            <Text style={modalStyle.modalText}>For the specified name, it will retrieve all other names used with a Hamming Distance of 1 (only differs one letter)</Text>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView >
    );
}


export default HammingDistance;