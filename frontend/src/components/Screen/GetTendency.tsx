import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { GetTendency } from '../../api/HttpRequests';

interface ITendency {
    'name': string;
    'prediction_born': number;
}

interface IResponse {
    'popular_names': ITendency[]
}

const GetTendencyScreen : React.FC = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [stateArray, setStateArray] = useState<IResponse>();

    const processData = async () => {
        try{
            const response = await GetTendency();

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
                    {stateArray?.popular_names.map((element) => 
                        <Text  key={element.name}>Name {element.name} com {element.prediction_born} nascidos</Text> 
                    )}
                </View>
                : <Text>Loading</Text>}
        </View>
    );
}


export default GetTendencyScreen;