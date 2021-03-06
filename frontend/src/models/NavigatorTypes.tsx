import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {DrawerNavigationProp } from '@react-navigation/drawer';

export type RootStackParamList = {
    Home : undefined,
    GenderRatio: undefined,
    GetTendency: undefined,
    PhoneticTrend: undefined,
    AmericanSoundex: undefined,
    HammingDistance: undefined,    
    BirthsFromTo: undefined
}
/*
type GenderRatioScreenNavigationProp = StackNavigationProp<RootStackParamList,'GenderRatio'>;
type GenderRatioScreenRouteProp = RouteProp<RootStackParamList,'GenderRatio'>;

export type Props = {
    navigation: GenderRatioScreenNavigationProp;
    route: GenderRatioScreenRouteProp;
}*/

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList,'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList,'Home'>;

export type Props = {
    navigation: HomeScreenNavigationProp;
    route: HomeScreenRouteProp;
}

type HomeDrawerNavigationProps = DrawerNavigationProp<RootStackParamList,'Home'>;

export type DrawerProps = {
    navigation: HomeDrawerNavigationProps;
    title: String;
}