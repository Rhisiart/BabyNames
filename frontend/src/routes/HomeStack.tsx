import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/Screen/Home';
import { RootStackParamList } from '../models/NavigatorTypes';
import GenderRatioScreen from '../components/Screen/GenderRatio';
import GetTendencyScreen from '../components/Screen/GetTendency';
import PhoneticTrend from '../components/Screen/PhoneticTrend';
import AmericanSoundex from '../components/Screen/AmericanSoundex';
import HammingDistance from '../components/Screen/HammingDistance';
import BirthsFromTo from '../components/Screen/BirthsFromTo';
import Header from '../components/shared/Header';


const Stack = createStackNavigator<RootStackParamList>();

const HomeStack = () => {
    
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name= 'Home' 
            component = {HomeScreen}  
            options = {({navigation}) => {
                return{ 
                    headerTitle: () => <Header navigation = {navigation}/> 
                }
            }}/>
            <Stack.Screen name= 'GenderRatio' component = {GenderRatioScreen}/>
            <Stack.Screen name= 'GetTendency' component = {GetTendencyScreen}/>
            <Stack.Screen name= 'PhoneticTrend' component = {PhoneticTrend}/>
            <Stack.Screen name= 'AmericanSoundex' component = {AmericanSoundex}/>
            <Stack.Screen name= 'HammingDistance' component = {HammingDistance}/>
            <Stack.Screen name= 'BirthsFromTo' component = {BirthsFromTo}/>
        </Stack.Navigator>
    );
}

export default HomeStack;