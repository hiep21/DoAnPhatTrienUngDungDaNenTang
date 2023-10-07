import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import MainScreen from './screens/MainScreen';
import UserScreen from './screens/UserScreen';
const StackNAvigator = createStackNavigator({
  RegisterScreen: {
    screen: RegisterScreen
  },
  LoginScreen: {
    screen: LoginScreen
  },
  HomeScreen: {
    screen: HomeScreen
  },
  MainScreen: {
    screen: MainScreen
  },
  UserScreen:{
    screen: UserScreen
  }

}, {
  initialRouteName: 'RegisterScreen'

}
)
export default createAppContainer(StackNAvigator)