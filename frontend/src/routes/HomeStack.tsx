import React from 'react';
import 'react-native-gesture-handler';
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
import { Text, View } from 'react-native';
import styles from '../css/styles';


const Stack = createStackNavigator<RootStackParamList>();
const HomeStack = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={({ navigation },) => ({
                    headerTitle: () => <Header navigation={navigation} title="Menu" />,
                    headerLeft: () => (null),
                })}
                />

            <Stack.Screen name='GenderRatio' component={GenderRatioScreen} options={({ navigation },) => ({
                headerTitle: () => <Header navigation={navigation} title="Gender Ratio" />,
                headerLeft: () => (null),
            })}
            />

            <Stack.Screen name='GetTendency' component={GetTendencyScreen} options={({ navigation },) => ({
                headerTitle: () => <Header navigation={navigation} title="Get Tendency" />,
                headerLeft: () => (null),
            })}
            />

            <Stack.Screen name='PhoneticTrend' component={PhoneticTrend} options={({ navigation },) => ({
                headerTitle: () => <Header navigation={navigation} title="Phonetic Trend" />,
                headerLeft: () => (null),
            })}
            />

            <Stack.Screen name='AmericanSoundex' component={AmericanSoundex} options={({ navigation },) => ({
                headerTitle: () => <Header navigation={navigation} title="American Soundex" />,
                headerLeft: () => (null),
            })}
            />

            <Stack.Screen name='HammingDistance' component={HammingDistance} options={({ navigation },) => ({
                headerTitle: () => <Header navigation={navigation} title="Hamming Distance" />,
                headerLeft: () => (null),
            })}
            />

            <Stack.Screen name='BirthsFromTo' component={BirthsFromTo} options={({ navigation },) => ({
                headerTitle: () => <Header navigation={navigation} title="Births" />,
                headerLeft: () => (null),
            })}
            />
        </Stack.Navigator>
    );
}

export default HomeStack;