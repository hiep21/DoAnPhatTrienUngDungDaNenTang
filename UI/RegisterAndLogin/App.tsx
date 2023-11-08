import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { createAppContainer } from 'react-navigation';
import { HeaderBackButton, createStackNavigator } from 'react-navigation-stack';

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
import InfoGame_dont_Install from './screens/Users/InfoGame_dont_Install';
import Buy_Game_to_Id from './screens/Users/Buy_Game_to_Id';
import MainScreenNCC from './screens/NhaCungCap/MainScreen';
import ManagerGameNCC from './screens/NhaCungCap/ManagerGameScreen';
import InfoGameNCC from './screens/NhaCungCap/InfoGameScreen';
import AddGameNCC from './screens/NhaCungCap/AddGame';
import ChoseUpdateGameScreen from './screens/NhaCungCap/ChoseUpdateGameScreen';
import UpdateGameNCC from './screens/NhaCungCap/UpdateGameScreen';
import MainScreenAdmin from "./screens/Admin/MainScreen";
import ListAccountScreen from "./screens/Admin/ListAccount";
import InfoAccount from "./screens/Admin/InfoAccount";
import CreateAccountNCC from "./screens/Admin/CreateAccountNCC";
import ChartComponent from './screens/Admin/ChartComponent';
import NotificationScreen from './screens/Notification';
import List_NotificationScreen from './screens/List_Notification';
import BankAccounts from './screens/NhaCungCap/BankAccounts';


const StackNAvigator = createStackNavigator({
  RegisterScreen: {
    screen: RegisterScreen,
    navigationOptions: {
      title: 'Đăng ký',
      headerTransparent: true
    },
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Đăng nhập',
      headerTransparent: true
    },
  },
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      title: '',
      headerTransparent: true
    },
  },
  MainScreenUser: {
    screen: MainScreenUser,
    navigationOptions: {
      title: 'Màn hình chính',
      headerLeft: () => (null),
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
      title: '',
      headerLeft: () => (null),
      headerTransparent: true
    },
  },
  ManagerGameNCC: {
    screen: ManagerGameNCC,
    navigationOptions: {
      title: 'Quản lý trò chơi',

    },
  },
  InfoGameNCC: {
    screen: InfoGameNCC,
    navigationOptions: {
      title: 'Thông tin trò chơi',
    },
  },
  AddGameNCC: {
    screen: AddGameNCC,
    navigationOptions: {
      title: 'Thêm trò chơi',
    },
  },
  ChoseUpdateGameScreen: {
    screen: ChoseUpdateGameScreen,
    navigationOptions: {
      title: 'lựa chọn cách cập nhật trò chơi',
    },
  },
  UpdateGameNCC: {
    screen: UpdateGameNCC,
    navigationOptions: {
      title: 'cập nhật trò chơi',
    },
  },
  MainScreenAdmin: {
    screen: MainScreenAdmin,
    navigationOptions: {
      title: 'Màn hình chính',
      headerLeft: () => (null),
    },
  },
  ListAccountScreen: {
    screen: ListAccountScreen,
    navigationOptions: {
      title: 'Danh sách tài khoản',
    },
  },
  InfoAccount: {
    screen: InfoAccount,
    navigationOptions: {
      title: 'Thông tin tài khoản',
    },
  },
  CreateAccountNCC: {
    screen: CreateAccountNCC,
    navigationOptions: {
      title: 'Tạo tài khoản cho nhà cung cấp',
    },
  },
  ChartComponent: {
    screen: ChartComponent,
    navigationOptions: {
      title: 'Doanh thu',
    },
  },
  NotificationScreen: {
    screen: NotificationScreen,
    navigationOptions: {
      title: 'Thông báo',
    },
  },
  List_NotificationScreen: {
    screen: List_NotificationScreen,
    navigationOptions: {
      title: 'Thông báo',
    },
  },
  BankAccount: {
    screen: BankAccounts,
    navigationOptions: {
      title: 'Điền tài khoản ngân hàng',
    },
  }


}, {
  initialRouteName: 'HomeScreen',

})
export default createAppContainer(StackNAvigator)