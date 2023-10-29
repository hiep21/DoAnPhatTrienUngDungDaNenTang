import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import { useState, useEffect, useCallback } from 'react';

import { loginApi, configAxiosWithAccessToken, saveTokenToDevice, getAccessToken } from "../../services/todo";
import Background from '../Users/Background';
import { LoginData, LoginDataToken } from '../../services/interfaces/User.interface';




const BankAccount = ({ navigation }) => {
    const [users, setUsers] = useState<LoginData>({
        user: "",
        password: ""
    })

    const [user, setUser] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false);
    const [userVal, setUserVal] = useState(null);

    


    const UpBank = async () => {
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
                

                
                navigation.navigate("ManagerGameNCC")
                //Chuyển hướng sang màn home

            } catch (err) {
                alert(err.response.data)
                setUserVal(err.response.data.errors)

            }
            setIsLoading(false)

        }

    }

    return (
        <Background>
            <View style={styles.container}>
                <Text style={styles.mainText}>Banking</Text>
                <View style={styles.mainContainer}>
                    <View style={styles.content}>

                        <Text style={styles.label}>Account</Text>
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
                        <Text style={styles.label}>AccountNumber</Text>
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
                        <Text style={styles.label}>Name Bank</Text>
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
                        <TouchableOpacity style={styles.button} onPress={UpBank}>
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.textbtn}>Confirm</Text>
                            )}
                        </TouchableOpacity>
                        

                    </View>
                    <View>
                        <Image source={require("../../assets/Icon/kisspng-joystick-game-controllers-xbox-accessory-computer-gamepad-5b3bee0604bfc9.5411179315306542140195.png")} style={styles.image} />
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
    mainContainer: {
        marginVertical: 10,
        backgroundColor: "#fff",
        height: 700,
        width: 390,
        borderTopLeftRadius: 130,
        paddingTop: 35,
        alignItems: "center"
    },
    mainText: {
        marginTop: 20,
        fontSize: 30,
        fontWeight: "900",
        color: '#fff'
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
        backgroundColor: "#5555"
    },
    label: {
        marginVertical: 5,
        fontWeight: "bold",
        color: '#17741d',
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


    },
    text: {
        fontWeight: "500",
        color: '#222'
    },
    image: {
        marginTop: 10,
        width: 200,
        height: 200
    },
    textError: {
        color: "red"
    }

})
export default BankAccount
