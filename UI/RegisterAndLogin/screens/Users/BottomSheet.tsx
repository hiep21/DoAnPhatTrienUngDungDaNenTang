import React, { useEffect, useState } from "react";
import { Text, View, Dimensions, Animated, StyleSheet, Image, TouchableOpacity } from "react-native";

import SlidingUpPanel from "rn-sliding-up-panel";
import * as SecureStore from 'expo-secure-store';
import { deleteUsers, getByUser } from "../../services/todo";
import { string } from "yup";
import { LoginData, LoginDataToken, RegisterData } from "../../services/interfaces/User.interface";

const { height } = Dimensions.get("window");


class BottomSheet extends React.Component {
  static defaultProps = {
    draggableRange: { top: height + 180 - 64, bottom: 180 }
  };


  _draggedValue = new Animated.Value(180);

  constructor(props) {
    super(props);
    this.state = {
      isPanelVisible: false,
      userName: "",
      email: "",
    };
  }
  async componentDidMount() {
    // Lấy userName từ SecureStore và cập nhật state userName
    try {
      const getUser = await SecureStore.getItemAsync('accessToken');
      const tokenObject = JSON.parse(getUser);
      const userName = tokenObject.user;
      const email = tokenObject.email;
      this.setState({ email })
      this.setState({ userName });
    } catch (error) {
      console.log("Lỗi khi lấy thông tin người dùng", error);
    }
  }
  showPanel = () => {
    //this._panel.show(480);
    this.setState((prevState) => ({
      isPanelVisible: !prevState.isPanelVisible,
    }));
    const { isPanelVisible } = this.state
    if (isPanelVisible == true) {
      // this.test();
      this._panel.show(480);

    }
    else {
      this._panel.show(-48);
    }

  };
  navigateToUserScreen = async () => {
    const getUser = await SecureStore.getItemAsync('accessToken');
    const tokenObject = JSON.parse(getUser);
    const userName = tokenObject.user;
    const { navigation } = this.props;
    navigation.navigate('UserScreen', { user: userName }); // Điều hướng đến màn hình "UserScreen"
  };

  test = async () => { // Đánh dấu hàm test là async
    const getUserToken = async () => {
      try {
        const getUser = await SecureStore.getItemAsync('accessToken');
        const tokenObject = JSON.parse(getUser);
        const userName = tokenObject;
        return userName;
      } catch (error) {
        // Xử lý lỗi ở đây nếu cần
      }
    };

    const getData = await getUserToken();
    console.log(getData);

  }

  render() {


    const logout = async () => {
      try {
        const getUser = await SecureStore.getItemAsync('accessToken');
        const tokenObject = JSON.parse(getUser);
        const userName = tokenObject.user;
        const email = tokenObject.email;
        console.log(userName);
        console.log(email);
        await deleteUsers(userName);
        await SecureStore.deleteItemAsync('accessToken');
        const { navigation } = this.props;
        navigation.navigate("HomeScreen");
        // Nếu bạn muốn thực hiện thêm bất kỳ thao tác đăng xuất nào khác ở đây, bạn có thể thực hiện chúng.
        // Ví dụ: Xoá dữ liệu người dùng khỏi trạng thái ứng dụng hoặc thực hiện các thao tác khác liên quan đến đăng xuất.
        // ...
        console.log("Đăng xuất thành công");
      } catch (error) {
        console.log("Lỗi khi đăng xuất", error.response.data);
      }
    };
    const { userName } = this.state;
    const { email } = this.state;

    return (
      <View style={styles.container}>

        <SlidingUpPanel
          ref={c => (this._panel = c)}

          snappingPoints={[360]}
          height={height + 180}
          friction={0.5}
        >
          <View style={styles.panel}>

            <View style={styles.panelHeader}>

              <Animated.View
                style={styles.iconBg}
              >
                <Text style={styles.itemUser} >A</Text>
              </Animated.View>
              <View style={styles.user}>
                <Text style={styles.name} onPress={this.navigateToUserScreen}>{userName}</Text>
                <Text numberOfLines={1} style={styles.emailUser}>{email}</Text>
              </View>
              <View style={styles.tool}>
                <TouchableOpacity style={styles.itemTool}>
                  <Image style={styles.image} source={require("../../assets/favicon.png")} />
                  <Text style={styles.textTool}>Quản lý ứng dụng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemTool}>
                  <Image style={styles.image} source={require("../../assets/favicon.png")} />
                  <Text style={styles.textTool}>Thanh toán</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemTool}>
                  <Image style={styles.image} source={require("../../assets/favicon.png")} />
                  <Text style={styles.textTool}>Cài đặt</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemTool}>
                  <Image style={styles.image} source={require("../../assets/favicon.png")} />
                  <Text style={styles.textTool}>Trợ giúp và phản hồi</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.button}>
                <TouchableOpacity style={styles.buttons} onPress={logout}>
                  <Text>Đăng xuất</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </SlidingUpPanel>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: "100%",
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",

  },
  panel: {
    flex: 1,

    borderRadius: 20,
    position: "relative",

  },
  panelHeader: {
    backgroundColor: "#1119",
    justifyContent: "center",
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20,
    padding: 24
  },
  textHeader: {
    fontSize: 28,
    color: "#FFF"
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -24,
    right: 18,
    width: 48,
    height: 48,
    zIndex: 1
  },
  iconBg: {
    backgroundColor: "#2b8a3e",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",


  },
  itemUser: {
    fontSize: 38,
    color: "#FFF",
    fontWeight: "500",
  },
  user: {
    paddingTop: 10,
    alignItems: "center",
  },
  name: {
    fontSize: 27,
    fontWeight: "500",
    color: "#fff"
  },
  emailUser: {
    fontSize: 22,
    color: '#999',
    width: 250
  },
  tool: {
    paddingTop: 18,
    justifyContent: "flex-start",
    width: '80%',
  },
  itemTool: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 10
  },
  image: {
    width: 25,
    height: 25,
  },
  textTool: {
    fontSize: 20,
    color: '#fff',
    marginLeft: 20,
    fontWeight: "500"
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },
  buttons: {
    borderWidth: 1,
    borderColor: "#177413",
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#27bc32",
    width: 100,
    alignItems: "center",
  },

});
export default BottomSheet;