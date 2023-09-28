import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import ManagerGameScreen from './screens/ManagerGameScreen';
import UpdateGameScreen from './screens/UpdateGameScreen';
import InfoGameScreen from './screens/InfoGameScreen';
import HomeScreen from './screens/HomeScreen'

const StackNAvigator = createStackNavigator({

  ManagerGameScreen: {
    screen: ManagerGameScreen
  },
  UpdateGameScreen: {
    screen: UpdateGameScreen
  },
  InfoGameScreen: {
    screen: InfoGameScreen
  },
  HomeScreen:{ screen: HomeScreen}

}, {
  initialRouteName: 'InfoGameScreen'
}
)
export default createAppContainer(StackNAvigator)