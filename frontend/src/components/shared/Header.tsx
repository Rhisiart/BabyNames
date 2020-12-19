import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import { DrawerProps } from '../../models/NavigatorTypes';



const Header : React.FC<DrawerProps> = ({navigation}) => {

    const openMenu = () => {
        navigation.openDrawer();
    }


    return(
        <View style = {styles.header}>
            <Icon
                color="#0CC"
                name="menu"
                onPress={openMenu}
                size={28}
                type="material"
                //iconStyle={styles.icon}
            />
            <View>
                <Text style={styles.headerText}>Menu</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1
    },
    icon: {
        left: 16
    }
});

export default Header;