import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import MainScreenUser from './screens/Users/MainScreen';
import UserScreen from './screens/Users/UserScreen';
import InfoGameScreen from './screens/Users/InfoGameScreen';
import ChangeInfo from './screens/Users/ChangeInfo';
import ManagerGameUser from './screens/Users/ManagerGame';
import SettingUser from './screens/Users/Setting';
import SupportUser from './screens/Users/Support';
import QRScannerScreen from './screens/NhaCungCap/QRScannerScreen';
import InfoGame_dont_Install from './screens/Users/InfoGame_dont_Install';
import Buy_Game_to_Id from './screens/Users/Buy_Game_to_Id';
import MainScreenNCC from './screens/NhaCungCap/MainScreen';
const StackNAvigator = createStackNavigator({
  RegisterScreen: {
    screen: RegisterScreen,
    navigationOptions: {
      title: 'Đăng ký',
    },
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Đăng nhập',
    },
  },
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      title: '',
    },
  },
  MainScreenUser: {
    screen: MainScreenUser,
    navigationOptions: {
      title: 'Màn hình chính',
    },
  },
  UserScreen: {
    screen: UserScreen,
    navigationOptions: {
      title: '',
    },
  },
  InfoGameScreen: {
    screen: InfoGameScreen,
    navigationOptions: {
      title: 'Thông tin trò chơi',
    },
  },
  ChangeInfo: {
    screen: ChangeInfo,
    navigationOptions: {
      title: 'Thay đổi thông tin',
    },
  },
  ManagerGameUser: {
    screen: ManagerGameUser,
    navigationOptions: {
      title: 'Quản lý ứng dụng',
    },
  },
  SettingUser: {
    screen: SettingUser,
    navigationOptions: {
      title: 'Cài đặt',
    },
  },
  SupportUser: {
    screen: SupportUser,
    navigationOptions: {
      title: 'Trợ giúp và phản hồi',
    },
  },
  QRScannerScreen: {
    screen: QRScannerScreen,
    navigationOptions: {
      title: 'Trợ giúp và phản hồi',
    },
  },
  InfoGame_dont_Install: {
    screen: InfoGame_dont_Install,
    navigationOptions: {
      title: 'Thông tin trò chơi',
    },
  },
  Buy_Game_to_Id: {
    screen: Buy_Game_to_Id,
    navigationOptions: {
      title: 'Phương thức thanh toán',
    },
  },
  MainScreenNCC: {
    screen: MainScreenNCC,
    navigationOptions: {
      title: 'Màn hình chính',
    },
  },
  
}, {
  initialRouteName: 'MainScreenUser'

}
)
export default createAppContainer(StackNAvigator)