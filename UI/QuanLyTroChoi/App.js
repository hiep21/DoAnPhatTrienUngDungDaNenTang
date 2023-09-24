import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import ManagerGameScreen from './screens/ManagerGameScreen';
import UpdateGameScreen from './screens/UpdateGameScreen';
import InfoGameScreen from './screens/InfoGameScreen';

const StackNAvigator = createStackNavigator({

  ManagerGameScreen: {
    screen: ManagerGameScreen
  },
  UpdateGameScreen: {
    screen: UpdateGameScreen
  },
  InfoGameScreen: {
    screen: InfoGameScreen
  }

}, {
  initialRouteName: 'ManagerGameScreen'
}
)
export default createAppContainer(StackNAvigator)