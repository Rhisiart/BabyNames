import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import {Slider, Icon} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
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

interface IColor{
    [key : string] : string;
}

const GenderRatioScreen : React.FC = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [minYear,setMinYear] = useState<number>();
    const [yearToStart,setStart] = useState<number>();
    const [maxYear,setMaxYear] = useState<number>();
    const [stateArray,setStateArray] = useState<IResponse>();
    const [colorDic, setColor] = useState<IColor>({});


    const yearPercentages = (year : number, array : IResponse | undefined) => {
        if(stateArray)
        {
            SetColors(stateArray, year);
        }
        else if(array){
            SetColors(array, year);
        }
    }

    const SetColors = (array : IResponse, year : number) => {
        for(const state in array['stateGenderRatio'])
        {
            for(const percentageList of array['stateGenderRatio'][state])
            {
                if(percentageList.year === year)
                {
                    let color = percentageList.Male > percentageList.Female ? '#3990e1' : '#FFC0CB';
                    setColor(prevDic => ({
                        ...prevDic, [state] : color 
                    }));
                } 
            }
        }
    }

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
                    yearPercentages(startValue, responseData);
                }   
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        processData();});

    return(
        <View>
            {
                isLoading ? 
                <ScrollView>
                    <View> 
                        <View>
                            <UsaSvgComponent colors = {colorDic}/>
                        </View>
                        <View>
                            <View>
                                <Text> {minYear} </Text>
                            </View>
                            <View>
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
                                    onSlidingStart={() => {
                                    console.log("onSlidingStart()")}
                                    }
                                    onValueChange={value => {
                                        yearPercentages(value, undefined);
                                        console.log(value);}
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
                            </View>
                            <View>
                                <Text>{maxYear}</Text>
                            </View>
                        </View>
                    </View> 
                </ScrollView> 
                : 
                <Text>Loading</Text>
            }
        </View>
    );
}


export default GenderRatioScreen;