import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer} from '@react-navigation/native';
import NavigationDrawer from './src/routes/Drawer';


const App = () => {
  return(
    <NavigationContainer>
      <NavigationDrawer/>
    </NavigationContainer>
  );
}

export default App;
