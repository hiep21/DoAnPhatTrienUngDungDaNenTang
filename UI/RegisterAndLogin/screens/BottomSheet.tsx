import React from "react";
import { Text, View, Dimensions, Animated,StyleSheet,Image, TouchableOpacity } from "react-native";

import SlidingUpPanel from "rn-sliding-up-panel";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create( {
  container: {
    flex: 0,
    width: "100%",
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
    
  },
  panel: {
    flex: 1,
    backgroundColor: "#1119",
    borderRadius: 20,
    position: "relative",
    
  },
  panelHeader: {
    
    justifyContent: "center",
    alignItems:"center",
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
    alignItems:"center",
    justifyContent:"center",
    
   
  },
  itemUser:{
    fontSize: 38,
    color: "#FFF",
    fontWeight: "500",
  },
  user:{
    paddingTop:10,
    alignItems:"center",
  },
  name:{
    fontSize: 27,
    fontWeight:"500",
    color: "#fff"
  },
  emailUser:{
    fontSize:22,
    color:'#999',
  },
  tool:{
    paddingTop:18,
    justifyContent:"flex-start",
    width:'80%',
  },
  itemTool:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 10
  },
  image:{
    width:25,
    height:25,
  },
  textTool:{
    fontSize:20,
    color:'#fff',
    marginLeft:20,
    fontWeight:"500"
  },
  button:{
    justifyContent:"center",
    alignItems:"center",
    padding: 30
  },
  buttons:{
    borderWidth: 1,
    borderColor: "#177413",
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#27bc32",
    width: 100,
    alignItems: "center",
  }
});

class BottomSheet extends React.Component {
  static defaultProps = {
    draggableRange: { top: height, bottom: 0 }
  };

  _draggedValue = new Animated.Value(180);
  showPanel = () => {
    this._panel.show(480);
  };
  navigateToUserScreen = () => {
    const { navigation } = this.props;
    navigation.navigate('HomeScreen'); // Điều hướng đến màn hình "UserScreen"
  };
  
  render() {
    const { top, bottom } = this.props.draggableRange;

    
    // const backgoundOpacity = this._draggedValue.interpolate({
    //   inputRange: [height - 48, height],
    //   outputRange: [1, 0],
    //   extrapolate: "clamp"
    // });

    // const iconTranslateY = this._draggedValue.interpolate({
    //   inputRange: [height - 56, height, top],
    //   outputRange: [0, 56, 180 - 32],
    //   extrapolate: "clamp"
    // });
    

    const textTranslateY = this._draggedValue.interpolate({
      inputRange: [bottom, top],
      outputRange: [0, 8],
      extrapolate: "clamp"
    });

    const textTranslateX = this._draggedValue.interpolate({
      inputRange: [bottom, top],
      outputRange: [0, -112],
      extrapolate: "clamp"
    });

    const textScale = this._draggedValue.interpolate({
      inputRange: [bottom, top],
      outputRange: [1, 0.7],
      extrapolate: "clamp"
    });

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
                <Text style={styles.name} onPress={this.navigateToUserScreen}>Nguyễn Văn Anh</Text>
                <Text style={styles.emailUser}>anhnguyen@gmail.com</Text>
              </View>
              <View style = {styles.tool}>
                <View style ={styles.itemTool}>
                  <Image style={styles.image} source={require("../assets/favicon.png")}/>
                  <Text style={styles.textTool}>Thanh toán</Text>
                </View>
                <View style ={styles.itemTool}>
                  <Image style={styles.image} source={require("../assets/favicon.png")}/>
                  <Text style={styles.textTool}>Cài đặt</Text>
                </View>
                <View style ={styles.itemTool}>
                  <Image style={styles.image} source={require("../assets/favicon.png")}/>
                  <Text style={styles.textTool}>Chợ giúp và phản hồi</Text>
                </View>
              </View>
            </View>
            <View style={styles.button}>
              <TouchableOpacity style={styles.buttons}>
                <Text>Đăng xuất</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SlidingUpPanel>
      </View>
    );
  }
}

export default BottomSheet;
