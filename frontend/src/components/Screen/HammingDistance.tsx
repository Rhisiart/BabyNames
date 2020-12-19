import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { GetHammingDistance } from '../../api/HttpRequests';
import styles from '../../css/styles';

interface IResponse {
    'hamming_distances': string[]
}

const HammingDistance : React.FC = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [stateArray, setStateArray] = useState<IResponse>();

    const processData = async (name: string) => {
        try{
            const response = await GetHammingDistance(name);

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
/*
    useEffect(() => {
        processData()},[]);
*/

    return(
        <View>
            <View>
                <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={name => processData(name)} placeholder="Choose Name"/>
            </View>
            {isLoading ?
                <View>
                    <Text style={[styles.subHeader]}>Names:</Text>                    

                    {stateArray?.hamming_distances.map((element) => 
                        <Text style={styles.basicText} key={element}>{element}</Text> 
                    )}
                </View>
                : <Text>Loading</Text>}
        </View>
    );
}


export default HammingDistance;