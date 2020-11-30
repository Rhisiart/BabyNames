import React from 'react';
import { Button, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Props } from '../../models/NavigatorTypes';

const HomeScreen : React.FC<Props>  = ({navigation} : Props) => {
    return(
        <View>
            <Button title = 'Gender Ratio' onPress={() => navigation.navigate('GenderRatio')}/>
        </View>
    );
}

export default HomeScreen;