import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { DrawerProps } from '../../models/NavigatorTypes';



const Header: React.FC<DrawerProps> = ({ navigation,title }) => {

    const openMenu = () => {        
        
        navigation.openDrawer();
    }


    return (
        <View style={styles.header}>
            <View style={styles.hamburguer}>
                <Icon
                    color="#0CC"
                    name="menu"
                    onPress={openMenu}
                    size={28}
                    type="material"
                //iconStyle={styles.icon}
                />
            </View>
            <View style={styles.menuTitle}>
                <Text style={styles.headerText}>{title}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1
    },
    icon: {
        left: 16
    },
    menuTitle:{
        width: '100%',
        height: '100%',        
        alignItems: 'center',
        justifyContent: 'center'
    },
    hamburguer:{
        position: "absolute"
    }
});

export default Header;