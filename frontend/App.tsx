import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/components/Screen/Home';
import { RootStackParamList } from './src/models/NavigatorTypes';
import GenderRatioScreen from './src/components/Screen/GenderRatio';
import GetTendencyScreen from './src/components/Screen/GetTendency';


const App = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name= 'Home' component = {HomeScreen} options={{title: 'Menu'}}/>
        <Stack.Screen name= 'GenderRatio' component = {GenderRatioScreen}/>
        <Stack.Screen name= 'GetTendency' component = {GetTendencyScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
