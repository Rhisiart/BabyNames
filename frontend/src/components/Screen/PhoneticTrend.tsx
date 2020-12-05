import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GetPhoneticTrend } from '../../api/HttpRequests';
import styles from '../../css/styles';

interface IPhonetic {
    'phonetic': string;
    'names': string[];
    'count': number;
}

interface IResponse {
    'phonetic_trends': IPhonetic[]
}

const PhoneticTrend : React.FC = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [stateArray, setStateArray] = useState<IResponse>();

    const processData = async () => {
        try{
            const response = await GetPhoneticTrend("2000");

            if(response && response.data)
            {
                console.log(response.data);
                const responseData: IResponse = response.data;

                setLoading(true);
                setStateArray(responseData);
                console.log(stateArray);
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        processData()},[]);

    return(
        <View>
            {isLoading ?
                <View>
                    {stateArray?.phonetic_trends.map((element) => 
                        <Text style={styles.bigBlue} key={element.phonetic}>Phonetic: {element.phonetic} com {element.count} nascidos</Text> 
                    )}
                </View>
                : <Text>Loading</Text>}
        </View>
    );
}


export default PhoneticTrend;