import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import {Slider, Icon} from 'react-native-elements';
import { GenderRatio, Teste } from '../../api/HttpRequests';

interface IGenderRatio{
    'Male': number;
    'Female': number;
    'year': number;
}

interface IGenderRatioList{
    [key : string] : Array<IGenderRatio>;
}

interface IResponse{
    'stateGenderRatio': IGenderRatioList;
    'minYear': number;
    'maxYear': number;
}

const GenderRatioScreen : React.FC = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [minYear,setMinYear] = useState<Number>();
    const [maxYear,setMaxYear] = useState<Number>();
    const [stateArray,setStateArray] = useState<IResponse>();

    const processData = async () => {
        try{
            const response = await GenderRatio();

            if(response && response.data)
            {
                const responseData : IResponse = response.data;
                if(responseData.maxYear && responseData.minYear && responseData.stateGenderRatio){
                    console.log(responseData.minYear);
                    setLoading(true);
                    setStateArray(responseData);
                    setMinYear(responseData.minYear);
                    setMaxYear(responseData.maxYear);
                }
                
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        processData()},[]);

    return(
        <View>
            {isLoading ? <View> <Text>{minYear}</Text> <Text>{maxYear}</Text> <Text>{stateArray}</Text> </View>  : <Text>Loading</Text>}
        </View>
    );
}


export default GenderRatioScreen;