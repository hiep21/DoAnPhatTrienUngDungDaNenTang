import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator, AppState } from 'react-native';
import { useState, useEffect, useCallback } from 'react';

import { loginApi, configAxiosWithAccessToken, saveTokenToDevice, getAccessToken } from "../services/todo";
import { LoginData, LoginDataToken } from '../services/interfaces/User.interface';
import { deleteItemAsync, getItemAsync } from 'expo-secure-store';
import React from 'react';



const LoginScreen = ({ navigation }: any) => {
    const listImageUri = navigation.getParam("listImageUri")
    const [account, setAccount] = useState<LoginData>({
        username: "",
        password: ""
    })

    const [username, setUserName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false);
    const [userVal, setUserVal] = useState(null);

    const loadToken = async () => {
        // await deleteItemAsync('accessToken');
        let getUser: any
        getUser = await getItemAsync('accessToken');
        const tokenObject = JSON.parse(getUser);

        if (tokenObject != null) {
            const note = tokenObject.note;
            const token = await getAccessToken()
            if (token) {
                configAxiosWithAccessToken(token)
                if (note == "User") {
                    navigation.navigate("MainScreenUser", { username: tokenObject.username, listImageUri })
                }
                else if (note == "NCC") {
                    navigation.navigate("MainScreenNCC", { username: tokenObject.username })
                }
                else if (note == "Admin") {
                    navigation.navigate("MainScreenAdmin", { username: tokenObject.username })
                }
            }
        }
    }
    
    useEffect(() => {
        console.log("Load token called!");
        loadToken()
        

    }, [listImageUri])


    const login = async () => {

        if (!isLoading) {
            setIsLoading(true)
            try {

                const loginResponse = await loginApi({
                    username,
                    password
                })
                const message = loginResponse.data
                // console.log(loginResponse.data.note);
                //Lưu token lại
                const note = loginResponse.data.note
                const result = await saveTokenToDevice({
                    username,
                    email: message.email,
                    image: message.image,
                    note: message.note,
                    password
                })
                if (!result) {
                    alert("Lỗi khi xử lý đăng nhập!")
                }
                alert("Đăng nhập thành công")
                console.log(note)

                if (note == "User") {
                    navigation.navigate("MainScreenUser", { username, listImageUri })
                }
                else if (note == "NCC") {
                    navigation.navigate("MainScreenNCC", { username })
                }
                else if (note == "Admin") {
                    navigation.navigate("MainScreenAdmin", { username })
                }


                //Chuyển hướng sang màn home

            } catch (err: any) {
                alert(err.response.data)
                setUserVal(err.response.data.errors)

            }
            setIsLoading(false)

        }

    }

    return (

        <View style={styles.container}>
            <Image style={{
                width: "100%",
                height: "100%",
                position: "absolute"
            }} source={require("../assets/Icon/BG.jpg")} />
            <Text style={styles.mainText}>Login</Text>
            <View style={styles.mainContainer}>
                <View style={styles.content}>

                    <Text style={styles.label}>User</Text>
                    <TextInput value={account.username} onChangeText={(value) => {
                        setAccount({
                            ...account,
                            username: value
                        }),

                            setUserName(value)
                    }} style={styles.input} placeholder="" />
                    {userVal != null && !account.username ? (
                        <View>
                            <Text style={styles.textError}>Vui lòng điền đầy đủ thông tin đăng nhập.</Text>
                        </View>
                    ) : null}
                    <Text style={styles.label}>Password</Text>
                    <TextInput value={account.password} onChangeText={(value) => {
                        setAccount({
                            ...account,
                            password: value
                        }),

                            setPassword(value)
                    }} style={styles.input} secureTextEntry />
                    {userVal != null && !account.password ? (
                        <View>
                            <Text style={styles.textError}>Vui lòng điền đầy đủ thông tin đăng nhập.</Text>
                        </View>
                    ) : null}
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
                            <Text style={styles.textSignup} onPress={() => navigation.navigate('RegisterScreen')}>Signup</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View>
                    <Image source={require("../assets/Icon/kisspng-joystick-game-controllers-xbox-accessory-computer-gamepad-5b3bee0604bfc9.5411179315306542140195.png")} style={styles.image} />
                </View>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        height: "100%",
        width: "100%",
        justifyContent: "flex-end"

    },
    mainContainer: {
        backgroundColor: "#fff",
        height: "80%",
        width: "100%",
        borderTopLeftRadius: 100,
        alignItems: "center",
        justifyContent: "center"
    },
    mainText: {
        marginTop: "20%",
        fontSize: 30,
        fontWeight: "900",
        color: '#fff'
    },
    content: {
        alignItems: "flex-start",
        width: "80%",
        margin: "5%"
    },
    input: {
        borderWidth: 1,
        borderColor: "#bbb",
        padding: 5,
        borderRadius: 20,
        width: "100%",
        backgroundColor: "#5555"
    },
    label: {
        marginVertical: 5,
        fontWeight: "bold",
        color: '#17741d',
        fontSize: 16,
        marginLeft: 6
    },
    buttons: {

        justifyContent: "space-between",
        width: "80%",
        marginTop: "1%",
        alignItems: "center",

    },
    button: {
        borderWidth: 1,
        borderColor: "#177413",
        paddingVertical: 8,
        borderRadius: 100,
        backgroundColor: "#27bc32",
        width: "80%",
        alignItems: "center"
    },
    textbtn: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 15
    },
    signup: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5

    },
    textSignup: {
        fontWeight: 'bold',
        color: '#17741d',
        marginLeft: 5
    },
    text: {
        fontWeight: "500",
        color: '#222'
    },
    image: {
        width: 200,
        height: 200
    },
    textError: {
        color: "red"
    }

})
export default LoginScreen
