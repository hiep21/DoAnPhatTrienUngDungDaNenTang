import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Homescreen from './screens/HomeScreen';
import MainScreen from './screens/MainScreen';
const StackNAvigator = createStackNavigator({
  RegisterScreen:{
    screen: RegisterScreen
  },
  LoginScreen:{
    screen: LoginScreen
  },
  Homescreen:{
    screen: Homescreen
  },
  MainScreen:{
    screen: MainScreen
  }
  
},{
  initialRouteName: 'Homescreen'
}
)
export default createAppContainer(StackNAvigator)