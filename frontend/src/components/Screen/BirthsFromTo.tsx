import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { GetBirtsFromTo } from '../../api/HttpRequests';
import styles from '../../css/styles';

interface IPhonetic {
    'year': number;
    'count': number;
    'perc': number;
}

interface IResponse {
    'babyArray': IPhonetic[]
}

const BirthsFromTo : React.FC = () => {
    const [fromYear, setFromYear] = useState<string>("");
    const [toYear, setToYear] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);
    const [stateArray, setStateArray] = useState<IResponse>();

    const processData = async (year:string,type:boolean) => {
        try{
            
            var fromValue = fromYear;
            var toValue = toYear;

            if(type){
                setFromYear(year);
                fromValue = year;
            }
            else{
                setToYear(year);
                toValue = year;
            }

            console.log(fromValue);
            console.log(toValue);
            const response = await GetBirtsFromTo(fromValue,toValue);

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
                <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={year => processData(year,true)} placeholder="From Year"/>
                <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={year => processData(year,false)} placeholder="To Year"/>
            </View>
            {isLoading ?
                <View>
                    {stateArray?.babyArray.map((element) => 
                        <Text style={[styles.basicText,styles.marginTop10]} key={element.year}>Year: {element.year} , Count: {element.count}, Perc:{element.perc}</Text> 
                    )}
                </View>
                : <Text>Loading</Text>}
        </View>
    );
}
export default BirthsFromTo;