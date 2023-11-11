import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import { useState, useEffect, useCallback } from 'react';

import { loginApi, configAxiosWithAccessToken, saveTokenToDevice, getAccessToken } from "../services/todo";
import Background from './Users/Background';
import { LoginData, LoginDataToken } from '../services/interfaces/User.interface';
import { deleteItemAsync, getItemAsync } from 'expo-secure-store';



const LoginScreen = ({ navigation }) => {
    const listImageUri = navigation.getParam("listImageUri")
    const [users, setUsers] = useState<LoginData>({
        user: "",
        password: ""
    })

    const [user, setUser] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false);
    const [userVal, setUserVal] = useState(null);

    const loadToken = async () => {
        // await deleteItemAsync('accessToken');
        const getUser = await getItemAsync('accessToken');
        const tokenObject = JSON.parse(getUser);

        if (tokenObject != null) {
            const note = tokenObject.note;
            const token = await getAccessToken()
            if (token) {
                configAxiosWithAccessToken(token)
                if (note == "User") {
                    navigation.navigate("MainScreenUser", { user: tokenObject.user, listImageUri })
                }
                else if (note == "NCC") {
                    navigation.navigate("MainScreenNCC", { user: tokenObject.user })
                }
                else if (note == "Admin") {
                    navigation.navigate("MainScreenAdmin", { user: tokenObject.user })
                }
            }
        }
    }

    useEffect(() => {
        console.log("Load token called!");
        loadToken()
    }, [listImageUri])


    const login = async () => {
        // if (!users.user || !users.password) {
        //     alert("Vui lòng điền đầy đủ thông tin đăng nhập.");
        //     return;
        // }

        if (!isLoading) {
            setIsLoading(true)
            try {

                const loginResponse = await loginApi({
                    user,
                    password
                })
                const message = loginResponse.data
                console.log(loginResponse.data.note);
                //Lưu token lại

                const result = await saveTokenToDevice({
                    user,
                    email: message.email,
                    image: message.image,
                    note: loginResponse.data.note,
                    password
                })
                if (!result) {
                    alert("Lỗi khi xử lý đăng nhập!")
                }
                alert("Đăng nhập thành công")

                navigation.navigate("HomeScreen")
                //Chuyển hướng sang màn home

            } catch (err) {
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
                    <TextInput value={users.user} onChangeText={(value) => {
                        setUsers({
                            ...users,
                            user: value
                        }),

                            setUser(value)
                    }} style={styles.input} placeholder="" />
                    {userVal != null && !users.user ? (
                        <View>
                            <Text style={styles.textError}>Vui lòng điền đầy đủ thông tin đăng nhập.</Text>
                        </View>
                    ) : null}
                    <Text style={styles.label}>Password</Text>
                    <TextInput value={users.password} onChangeText={(value) => {
                        setUsers({
                            ...users,
                            password: value
                        }),

                            setPassword(value)
                    }} style={styles.input} secureTextEntry />
                    {userVal != null && !users.password ? (
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
