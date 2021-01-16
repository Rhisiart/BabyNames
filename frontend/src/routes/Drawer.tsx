import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeStack from './HomeStack';
import BirthsFromTo from '../components/Screen/BirthsFromTo';
import Header from '../components/shared/Header';
import GetTendencyScreen from '../components/Screen/GetTendency';
import GenderRatioScreen from '../components/Screen/GenderRatio';
import PhoneticTrend from '../components/Screen/PhoneticTrend';
import AmericanSoundex from '../components/Screen/AmericanSoundex';
import HammingDistance from '../components/Screen/HammingDistance';

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
            <Drawer.Screen name = 'Gender Ratio' component={GenderRatioScreen} options={({ navigation },) => ({
                headerTitle: () => <Header navigation={navigation} title="Gender Ratio" />,
                headerLeft: () => (null),
            })}
            />
            <Drawer.Screen name = 'Get Tendency' component={GetTendencyScreen} options={({ navigation },) => ({
                headerTitle: () => <Header navigation={navigation}  title="Get Tendency" />,
                headerLeft: () => (null),
            })}
            />
            <Drawer.Screen name = 'Phonetic Trend' component={PhoneticTrend} options={({ navigation },) => ({
                headerTitle: () => <Header navigation={navigation} title="Phonetic Trend" />,
                headerLeft: () => (null),
            })}
            />
            <Drawer.Screen name = 'American Soundex' component={AmericanSoundex} options={({ navigation },) => ({
                headerTitle: () => <Header navigation={navigation} title="American Soundex" />,
                headerLeft: () => (null),
            })}
            />
            <Drawer.Screen name = 'Hamming Distance' component={HammingDistance} options={({ navigation },) => ({
                headerTitle: () => <Header navigation={navigation} title="Hamming Distance" />,
                headerLeft: () => (null),
            })}
            />
            <Drawer.Screen name = 'Births' component={BirthsFromTo} options={({ navigation },) => ({
                headerTitle: () => <Header navigation={navigation} title="Births2" />,
                headerLeft: () => (null),
            })}
            />
        </Drawer.Navigator>
    );
}

export default NavigationDrawer;