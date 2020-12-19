import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/components/Screen/Home';
import { Props, RootStackParamList } from './src/models/NavigatorTypes';
import GenderRatioScreen from './src/components/Screen/GenderRatio';
import GetTendencyScreen from './src/components/Screen/GetTendency';
import PhoneticTrend from './src/components/Screen/PhoneticTrend';
import AmericanSoundex from './src/components/Screen/AmericanSoundex';
import HammingDistance from './src/components/Screen/HammingDistance';
import BirthsFromTo from './src/components/Screen/BirthsFromTo';
import { Button, Text, View } from 'react-native';
import Hamburger from './src/components/Screen/hamburguer';

class Parent extends Hamburger {  render() {  
   return (
      <Hamburger
              onPress={() => {                
                this.setState({ active: !this.state.active });
                console.log("Test2" + this.state.active);
              }}
              title="" />
   );
  }
 }

const App = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  return(
    <NavigationContainer> 
      <Stack.Navigator>
        <Stack.Screen name= 'Home' component = {HomeScreen} options={{title: 'Menu', headerLeft: (props) => (
            
            <Hamburger
              {...props}
              onPress={() => {
                console.log("Test");
              }}
              title=""              
              />)}}/>


        <Stack.Screen name= 'GenderRatio' component = {GenderRatioScreen} options={{title: 'Gender Ratio'}}/>
        <Stack.Screen name= 'GetTendency' component = {GetTendencyScreen} options={{title: 'Get Tendency'}}/>
        <Stack.Screen name= 'PhoneticTrend' component = {PhoneticTrend} options={{title: 'Phonetic Trend'}}/>
        <Stack.Screen name= 'AmericanSoundex' component = {AmericanSoundex} options={{title: 'American Soundex'}}/>

        <Stack.Screen name= 'HammingDistance' component = {HammingDistance} options={{title: 'Hamming Distance', headerLeft: (props) => (
            
            <Parent/>)}}/>

        <Stack.Screen name= 'BirthsFromTo' component = {BirthsFromTo} options={{title: 'Births From To'}}/>        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
