import React from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Props } from '../../models/NavigatorTypes';
import styles from '../../css/styles'

const HomeScreen : React.FC<Props>  = ({navigation}) => {
    return(
        <View style={styles.menuView}>
            <View style={styles.button}>
                <Button title = 'Gender Ratio' onPress={() => navigation.navigate('GenderRatio')}/>    
            </View>
            <View style={styles.button}>
                <Button title = 'Get Tendency' onPress={() => navigation.navigate('GetTendency')}/>      
            </View>
            <View style={styles.button}>
                <Button title = 'Phonetic Trend' onPress={() => navigation.navigate('PhoneticTrend')}/>    
            </View>
            <View style={styles.button}>
                <Button title = 'American Soundex' onPress={() => navigation.navigate('AmericanSoundex')}/>    
            </View>
            <View style={styles.button}>
                <Button title = 'Hamming Distance' onPress={() => navigation.navigate('HammingDistance')}/>    
            </View>
            <View style={styles.button}>
                <Button title = 'Births From To' onPress={() => navigation.navigate('BirthsFromTo')}/>
            </View>
        </View>
    );
}

export default HomeScreen;