import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import {Slider, Icon} from 'react-native-elements';
import { GenderRatio} from '../../api/HttpRequests';
import UsaSvgComponent from '../Svg/Usa';

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
    const [minYear,setMinYear] = useState<number>();
    const [yearToStart,setStart] = useState<number>();
    const [maxYear,setMaxYear] = useState<number>();
    const [stateArray,setStateArray] = useState<IResponse>();
    const [color, setColor] = useState<string>('#000');

    const processData = async () => {
        try{
            const response = await GenderRatio();

            if(response && response.data)
            {
                const responseData : IResponse = response.data;
                if(responseData.maxYear && responseData.minYear && responseData.stateGenderRatio){
                    let startValue = responseData.minYear + ((responseData.maxYear - responseData.minYear) / 2);
                    setLoading(true);
                    setStateArray(responseData);
                    setMinYear(responseData.minYear);
                    setMaxYear(responseData.maxYear);
                    setStart(startValue);
                    yearPercentages(startValue);
                }
                
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        processData()},[]);

    const yearPercentages = (year : number) => {
        if(stateArray)
        {
            for(const state in stateArray['stateGenderRatio'])
            {
                //for now
                if(state === 'WA')
                {
                    for(const percentageList of stateArray['stateGenderRatio'][state])
                    {
                        if(percentageList.year === year)
                        {
                            let colors = percentageList.Male > percentageList.Female ? '#3990e1' : '#FFC0CB';
                            console.log(colors);
                            setColor(colors);
                        } 
                    }
                }
            }
        }
        
    }

    return(
        <View>
            {
                isLoading ? 
                <View> 
                    <View>
                        <UsaSvgComponent color = {color}/>
                    </View>
                    <View>
                        <Text> {minYear} </Text>
                        <Slider
                            animateTransitions
                            animationType="timing"
                            maximumTrackTintColor="#0073e6"
                            minimumValue={minYear}
                            maximumValue={2014} //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                            minimumTrackTintColor="#ccc"
                            onSlidingComplete={() =>
                            console.log("onSlidingComplete()")
                            }
                            onSlidingStart={() =>
                            console.log("onSlidingStart()")
                            }
                            onValueChange={value =>
                                yearPercentages(value)
                            }
                            orientation="horizontal"
                            step={1}
                            style={{ width: "80%", height: 200 }}
                            thumbStyle={{ height: 20, width: 20 }}
                            thumbProps={{
                            children: (
                                <Icon
                                name="event"
                                type="material"
                                size={20}
                                reverse
                                containerStyle={{ bottom: 20, right: 20 }}
                                color="#0073e6"
                                />
                            )
                            }}
                            thumbTintColor="#0c0"
                            thumbTouchSize={{ width: 40, height: 40 }}
                            trackStyle={{ height: 10, borderRadius: 20 }}
                            value={yearToStart}
                        />
                        <Text>{maxYear}</Text>
                    </View>
                </View>  
                : 
                <Text>Loading</Text>
            }
        </View>
    );
}


export default GenderRatioScreen;