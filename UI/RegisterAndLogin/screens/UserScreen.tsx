import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert,Image,ActivityIndicator } from 'react-native';
import Background from './Background';

const UserScreen = ({ navigation }) => {
    
    return (
        <Background>
            <View style={styles.container}>
                <View style={styles.iconBg}>
                    <Text style={styles.itemUser} >A</Text>
                </View>
                <Text style={styles.mainText}>Username</Text>
                <View style={styles.mainContainer}>
                    <View style={styles.content}>
                        <Text style={styles.label}>Thông tin cá nhân</Text>
                    </View>
                    <View style={styles.contents}>
                        <View style ={styles.itemTool}>
                            <Image style={styles.image} source={require("../assets/favicon.png")}/>
                            <View>
                                <Text style={styles.textUser}>Tên của bạn</Text>
                                <Text style={styles.textUser}>Tên của bạn</Text>
                            </View>
                            <Text style={styles.bonut}> > </Text>
                        </View>
                        <View style ={styles.itemTool}>
                            <Image style={styles.image} source={require("../assets/favicon.png")}/>
                            <View>
                                <Text style={styles.textUser}>Ngày sinh</Text>
                                <Text style={styles.textUser}>Tên của bạn</Text>
                            </View>
                            <Text style={styles.bonut}> > </Text>
                        </View>
                        <View style ={styles.itemTool}>
                            <Image style={styles.image} source={require("../assets/favicon.png")}/>
                            <View>
                                <Text style={styles.textUser}>Giới tính</Text>
                                <Text style={styles.textUser}>Tên của bạn</Text>
                            </View>
                            <Text style={styles.bonut}> > </Text>
                        </View>
                        <View style ={styles.itemTool}>
                            <Image style={styles.image} source={require("../assets/favicon.png")}/>
                            <View>
                                <Text style={styles.textUser}>Email</Text>
                                <Text style={styles.textUser}>Tên của bạn</Text>
                            </View>
                            <Text style={styles.bonut}> > </Text>
                        </View>
                        <View style ={styles.itemTool}>
                            <Image style={styles.image} source={require("../assets/favicon.png")}/>
                            <View>
                                <Text style={styles.textUser}>Số điện thoại</Text>
                                <Text style={styles.textUser}>Tên của bạn</Text>
                            </View>
                            <Text style={styles.bonut}> > </Text>
                        </View>
                        <View style ={styles.itemTool}>
                            <Image style={styles.image} source={require("../assets/favicon.png")}/>
                            <View>
                                <Text style={styles.textUser}>Địa chỉ</Text>
                                <Text style={styles.textUser}>Tên của bạn</Text>
                            </View>
                            <Text style={styles.bonut}> > </Text>
                        </View>
                    </View>
                    
                </View>
        
            </View>
        </Background>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width:'100%',
        
    },
    mainContainer:{
        marginVertical:10,
        backgroundColor:"#fff",
        height:700,
        width:360,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        alignItems: "center"
    },
    mainText: {
        
        fontSize: 18,
        fontWeight: "500",
        
    },
    content: {
        alignItems: "center",
        width: "80%",
        
    },
    contents: {
        alignItems: "center",
        width: "85%",
        borderWidth:1,
        borderRadius:20,
        borderColor:"#999",
        height: 350
        
    },
    input: {
        borderWidth: 1,
        borderColor: "#bbb",
        padding: 5,
        borderRadius: 100,
        width: "100%",
        backgroundColor:"#5555"
    },
    label: {
        marginVertical: 5,
        fontWeight:"bold",
        color:'#17741d',
        fontSize: 16
    },
    buttons: {
        justifyContent: "space-between",
        width: 320,
        marginTop: 20,
        alignItems: "center",
        
    },
    button: {
        
        borderWidth: 1,
        borderColor: "#177413",
        padding: 8,
        borderRadius: 100,
        backgroundColor: "#27bc32",
        width: "80%",
        alignItems: "center"
    }, 
    textbtn:{
        fontWeight:'bold',
        color: '#fff',
        fontSize:15
    },
    bonut:{
        fontSize:25,
        paddingLeft:80
        
    },
    textSignup:{
        fontWeight:'bold',
        color:'#17741d',
        
        
    },
    text:{
        fontWeight:"500",
        color:'#222'
    },
    
    iconBg: {
        backgroundColor: "#2b8a3e",
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems:"center",
        justifyContent:"center",
        marginTop: 30,
    },
    itemUser:{
        fontSize: 38,
        color: "#FFF",
        fontWeight: "500",
    },
    itemTool:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingTop: 15,
        alignItems:'center'
    },
    image:{
        width:25,
        height:25,
    },
    textUser:{
        marginLeft:20,
        fontWeight:"500",
        
    },
    
})

export default UserScreen;