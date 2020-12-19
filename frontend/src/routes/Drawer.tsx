import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeStack from './HomeStack';

/*const CustomDrawerContent = (props: any) => {
    return(
        <DrawerContentScrollView>
            <DrawerItemList {...props}/>
        </DrawerContentScrollView>
    );
}*/
const Drawer = createDrawerNavigator();

const NavigationDrawer = () =>
{
    return(
        <Drawer.Navigator>
            <Drawer.Screen name = 'Home' component={HomeStack} />
        </Drawer.Navigator>
    );
}

export default NavigationDrawer;