
// screens/Screen1.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Modal, ScrollView } from 'react-native';
import { RegisterData } from '../services/interfaces/GameService';
import * as Yup from 'yup'
import { registerApi } from '../services/Game';
import Background from './Background';
const validationSchema = Yup.object().shape({
    user: Yup.string()
        .min(2, 'To Short!')
        .max(20, 'To Long!')
        .required("Username is required"),
    password: Yup.string().min(8).required("Password is required")
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
    email: Yup.string().email("Invalid email").required("Email is required"),
    dateOfBirth: Yup.string().required("Date of Birth is required").matches(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/\d{4}$/),
    rePassword: Yup.string().min(8).oneOf([Yup.ref('password')]).required("Confirm password is required"),
});

const AddUserScreen = ({ navigation }) => {

    const [user, setUser] = useState<RegisterData>({
        user: "",
        name: "",
        email: "",
        password: "",
        note: "Nhà sản xuất",
        address: "",
        phone: "",
        image: "",
        visa: "",
    });
    const [rePasswords, setRePasswords] = useState<string>();
 
   
    const validateInputs = () => {
        if (user.user.length < 5 && (user.user == null || user.user.includes(""))) {
            Alert.alert("Lỗi", "User phải tối thiểu 5 ký tự, không được bỏ trống");
            return false;
        }
        if (!user.email.includes("@")) {
            Alert.alert("Lỗi", "Email phải chứa ký tự @");
            return false;
        }
        
        return true;
    };
    const addUserAction = async () => {

        if (!validateInputs()) {
            return;
        }
        if (user.password != rePasswords) {
            alert("Confirm Password error");
            return;
        }
        try {
            const { data } = await registerApi(user)
            Alert.alert("Register complete!")
            navigation.navigate("LoginScreen")
        } catch (err) {
            const message = err.response
            alert(message)
        }
    }
    const onCancel = () => {
        Alert.alert(
            "Confirm",
            "Do you definitely want to cancel new?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Agree",
                    onPress: () => {
                        navigation.navigate("LoginScreen");
                    },
                },
            ]
        );
    };
    return (
        <Background>
            <KeyboardAvoidingView>
                <View style={styles.container}>
                    <Text style={styles.mainText}>Register</Text>
                    <View style={styles.mainContainer}>
                        <View style={styles.content}>
                            <ScrollView style={{

                                width: "85%",
                                height: "55%",
                                marginLeft: 20,

                            }}>
                                <Text style={styles.label}>user</Text>
                                <TextInput value={user.user} onChangeText={(value) => {
                                    setUser({
                                        ...user,
                                        user: value
                                    })
                                }} style={styles.input} placeholder='User name' />
                                <Text style={styles.label}>email</Text>
                                <TextInput value={user.email} onChangeText={(value) => {
                                    setUser({
                                        ...user,
                                        email: value
                                    })
                                }} style={styles.input} placeholder='...@gmail.com' />
                                <Text style={styles.label}>Full name</Text>
                                <TextInput value={user.name} onChangeText={(value) => {
                                    setUser({
                                        ...user,
                                        name: value
                                    })
                                }} style={styles.input} placeholder='Tên công ty hoặc studio' />

                                <Text style={styles.label}>Address</Text>
                                <TextInput value={user.address} onChangeText={(value) => {
                                    setUser({
                                        ...user,
                                        address: value
                                    })
                                }} style={styles.input} placeholder='Address' />
                                <Text style={styles.label}>Number phone</Text>
                                <TextInput value={user.phone} onChangeText={(value) => {
                                    setUser({
                                        ...user,
                                        phone: value
                                    })
                                }} style={styles.input} placeholder='XXXX-XXX-XXX' />
                                <Text style={styles.label}>Visa</Text>
                                <TextInput value={user.phone} onChangeText={(value) => {
                                    setUser({
                                        ...user,
                                        visa: value
                                    })
                                }} style={styles.input} placeholder='XXXX-XXX-XXX' />


                                <Text style={styles.label}>password</Text>
                                <TextInput value={user.password} onChangeText={(value) => {
                                    setUser({
                                        ...user,
                                        password: value
                                    })
                                }} style={styles.input} secureTextEntry />
                                <Text style={styles.label}>Confirm Password</Text>
                                <TextInput value={rePasswords
                                } onChangeText={(value) => {
                                    setRePasswords(value)
                                }} style={styles.input} secureTextEntry />

                            </ScrollView>
                            <View style={styles.buttons}>

                                <TouchableOpacity style={styles.button} onPress={addUserAction}>
                                    <Text style={styles.textbtn}>Signup</Text>
                                </TouchableOpacity>
                                <View style={styles.signup}>
                                    <Text style={styles.text}>Have an account?</Text>
                                    <TouchableOpacity onPress={onCancel}>
                                        <Text style={styles.textSignup}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </View>
                </View>
            </KeyboardAvoidingView>
        </Background>


    );
};

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
    content: {
        alignItems: "flex-start",
        width: "80%"
    },
    mainText: {
        marginTop: 20,
        fontSize: 30,
        fontWeight: "900",
        color: '#fff'
    },
    address: {
        alignItems: "flex-start",
        width: "100%",
        height: 100
    },
    input: {
        borderWidth: 1.25,
        paddingVertical: 1,
        width: "100%",
        borderRadius: 100,
        backgroundColor: "#7777",
        borderColor: '#555',
        paddingHorizontal: 15
    },
    label: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: '500',
        color: "#17741d",
        marginLeft: 10
    },
    buttons: {
        justifyContent: "space-between",
        width: 320,
        marginTop: 20,
        alignItems: "center",

    },

    buttonSave: {
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderWidth: 1
    },
    cancel: {
        textDecorationLine: 'underline',
        color: 'blue'
    },
    inputAdd: {
        borderWidth: 2,
        height: 100,
        width: '100%',

    },
    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.25,
        borderColor: '#777',
        padding: 6,
        borderRadius: 100,
        justifyContent: 'space-between',
        backgroundColor: "#5555",


    },
    selectedGenderText: {
        flex: 1,
        color: "#777",
        marginLeft: 10
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    button: {

        borderWidth: 1,
        borderColor: "#177413",
        paddingVertical: 8,
        borderRadius: 100,
        backgroundColor: "#27bc32",
        width: "80%",
        alignItems: "center",
        marginRight: 15
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
    textbtn: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 15
    },
})

export default AddUserScreen;