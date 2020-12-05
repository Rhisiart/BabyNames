import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { GetAmericanSoundex } from '../../api/HttpRequests';
import styles from '../../css/styles';

interface IAmericanSoundex {
    'phonetic': string;
    'names': string[];
    'count': number;
}

interface IResponse {
    'phonetic_trends': IAmericanSoundex[]
}

const AmericanSoundex : React.FC = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [stateArray, setStateArray] = useState<IResponse>();

    const processData = async (year: string) => {
        
        try{
            console.log(year);
            const response = await GetAmericanSoundex(year);

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
                <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={year => processData(year)} placeholder="Choose Year"/>
            </View>
            {isLoading ?
                <View>
                    {stateArray?.phonetic_trends.map((element) => 
                        <Text style={styles.basicText} key={element.phonetic}>Phonetic: {element.phonetic} com {element.count} nascidos</Text> 
                    )}
                </View>
                : <Text>Loading</Text>}
        </View>
    );
}


export default AmericanSoundex;