import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer} from '@react-navigation/native';
import NavigationDrawer from './src/routes/Drawer';

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
  return(
    <NavigationContainer>
      <NavigationDrawer/>
    </NavigationContainer>
  );
}

export default App;
