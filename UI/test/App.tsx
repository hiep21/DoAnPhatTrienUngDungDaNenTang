import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator, FlatList } from 'react-native';
import  { useState } from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import TasksScreen from './screens/TasksScreen';
import DetailTaskScreen from './screens/DetailTaskScreen';
import AddTaskScreen from './screens/AddTaskScren';
import UpdateTaskScreen from './screens/UpdateTaskScreen';

const StackNavigator = createStackNavigator({

  TasksScreen: { screen:  TasksScreen},
  DetailTaskScreen: { screen:  DetailTaskScreen},
  AddTaskScreen: { screen:  AddTaskScreen},
  UpdateTaskScreen: { screen:  UpdateTaskScreen},
}, {
  initialRouteName: "TasksScreen"
})

 
export default createAppContainer(StackNavigator)