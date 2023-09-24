import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert,Image,ActivityIndicator } from 'react-native';

import { useState, useEffect } from 'react';

import { loginApi, getUsers, configAxiosWithAccessToken, saveTokenToDevice, getAccessToken } from "../services/todo";
import Background from './Background';


const LoginScreen = ({ navigation }) => {
    const [ user, setUser ] = useState<string>("")
    const [ password, setPassword ] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false);

    const loadToken = async() => {
        const token = await getAccessToken()
        if(token) {
            configAxiosWithAccessToken(token)
            navigation.navigate("HomeScreen")
        }
    }

    useEffect(() => {
        loadToken()

    }, [])


    const login = async () => {
        if (!user || !password) {
            alert("Vui lòng điền đầy đủ thông tin đăng nhập.");
            return;
        }
        if(!isLoading){
            setIsLoading(true)
            try {
                const loginResponse = await loginApi({
                    user,
                    password
                })
                const {data} = loginResponse
                // Kiểm tra tài khoản đã được lập trong phần Register
                const users = await getUsers()
                const registeredUser = users.find((u) => u.user === user && u.password === password);
                if (!registeredUser) {
                    alert("Tài khoản chưa được đăng ký!");
                    setIsLoading(false);
                    return;
                }

                //Lưu token lại
                
                const result = await saveTokenToDevice(data?.tokens?.access?.token)
                if(!result) {
                    alert("Lỗi khi xử lý đăng nhập!")
                } 
                alert("Đăng nhập thành công")
    
                
                console.log(token)
    
                //Chuyển hướng sang màn home
            } catch(err) {
                const {data} = err.response
                alert(data.message)
            }
            setIsLoading(false)
        }
        
    }

    return (
        <Background>
            <View style={styles.container}>
        <Text style={styles.mainText}>Login</Text>
        <View style={styles.mainContainer}>
            <View style={styles.content}>
            
                <Text style={styles.label}>User</Text>
                <TextInput value={user} onChangeText={(value) => {
                    setUser(value)
                }}  style={styles.input} placeholder=""/>
                <Text style={styles.label}>Password</Text>
                <TextInput value={password} onChangeText={(value) => {
                    setPassword(value)
                }}   style={styles.input} /> 
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={login}>
                    {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                                <Text style={styles.textbtn}>login</Text>
                    )}
                </TouchableOpacity>
                <View style={styles.signup}>
                    <Text style={styles.text}>Don't have an account?</Text>
                    <TouchableOpacity >
                        <Text style= {styles.textSignup} onPress={() => navigation.navigate('RegisterScreen')}>Signup</Text>
                    </TouchableOpacity>
                </View>
            
            </View>
            <View>
                    <Image source={require("../assets/kisspng-joystick-game-controllers-xbox-accessory-computer-gamepad-5b3bee0604bfc9.5411179315306542140195.png") } style={styles.image}/>
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
        
    },
    mainContainer:{
        marginVertical:10,
        backgroundColor:"#fff",
        height:700,
        width:390,
        borderTopLeftRadius:130,
        paddingTop: 35,
        alignItems: "center"
    },
    mainText: {
        marginTop: 20,
        fontSize: 30,
        fontWeight: "900",
        color:'#fff'
    },
    content: {
        alignItems: "flex-start",
        width: "80%"
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
    signup:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5
        
    },
    textSignup:{
        fontWeight:'bold',
        color:'#17741d',
        
        
    },
    text:{
        fontWeight:"500",
        color:'#222'
    },
    image:{
        marginTop: 10,
        width:200,
        height:200
    } 
    
})
export default LoginScreen
