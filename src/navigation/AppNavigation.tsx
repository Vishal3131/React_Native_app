import React from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screen/Home';
import DetailView from '../screen/DetailView';
import Favourite from '../screen/Favourite';
import BottomNavigation from './BottomNavigation';

export type RootStackParamList = {
  Home: undefined;
  Details: { id: number };
  Favourite: undefined;
  BottomNavigation: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;
export type FavouriteScreenProps = NativeStackScreenProps<RootStackParamList, 'Favourite'>;
export type BottomNavigationScreenProps = NativeStackScreenProps<RootStackParamList, 'BottomNavigation'>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  return (
<NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={DetailView} />
        <Stack.Screen name='Favourite' component={Favourite}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
