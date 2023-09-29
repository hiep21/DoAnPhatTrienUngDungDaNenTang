
// screens/Screen1.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import { RegisterData } from '../services/interfaces/User.interface';
import { addTaskApi } from '../services/todo.service';
import * as Yup from 'yup'
import { registerApi } from '../services/todo';
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
        dateOfBirth: "",
        email: "",
        gender: "",
        note: "khách hàng",
        password: "",
        user: ""
    });
    const validateInputs = () => {
        if (user.user.length < 5 && (user.user == null || user.user.includes(""))) {
            Alert.alert("Lỗi", "User phải tối thiểu 5 ký tự, không được bỏ trống");
            return false;
        }
        if (!user.email.includes("@")) {
            Alert.alert("Lỗi", "Email phải chứa ký tự @");
            return false;
        }
        if (user.dateOfBirth == null) {
            Alert.alert("Lỗi", "Ngày sinh không được bỏ trống");
            return false;
        }
        if (user.gender == null) {
            Alert.alert("Lỗi", "Giới tính không được bỏ trống");
            return false;
        }
        if (user.password.length < 8) {
            Alert.alert("Lỗi", "Password phải tối thiểu 8 ký tự");
            return false;
        }

        return true;
    };
    const addUserAction = async () => {
        if (!validateInputs()) {
            return;
        }
        try {
            const { data } = await registerApi(user)
            Alert.alert("được rồi")
            navigation.navigate("LoginScreen")
        } catch (err) {
            const message = err.response
            alert(message)
        }
    }
    const onCancel = () => {
        Alert.alert(
            "Xác nhận",
            "Bạn có chắc chắn muốn hủy thêm mới?",
            [
                {
                    text: "Hủy",
                    style: "cancel",
                },
                {
                    text: "Đồng ý",
                    onPress: () => {
                        navigation.navigate("TaskScreen");
                    },
                },
            ]
        );
    };
    return (
        <KeyboardAvoidingView>
            <View style={styles.container}>
                <Text style={styles.mainText}>Thêm mới sinh viên</Text>
                <View style={styles.address}>
                    <Text style={styles.label}>user</Text>
                    <TextInput value={user.user} onChangeText={(value) => {
                        setUser({
                            ...user,
                            user: value
                        })
                    }} style={styles.input} />
                    <Text style={styles.label}>email</Text>
                    <TextInput value={user.email} onChangeText={(value) => {
                        setUser({
                            ...user,
                            email: value
                        })
                    }} style={styles.input} />
                    <Text style={styles.label}>dateOfBirth</Text>
                    <TextInput value={user.dateOfBirth} onChangeText={(value) => {
                        setUser({
                            ...user,
                            dateOfBirth: value
                        })
                    }} style={styles.input} />
                    <Text style={styles.label}>gender</Text>
                    <TextInput value={user.gender} onChangeText={(value) => {
                        setUser({
                            ...user,
                            gender: value
                        })
                    }} style={styles.input} />
                    <Text style={styles.label}>password</Text>
                    <TextInput value={user.password} onChangeText={(value) => {
                        setUser({
                            ...user,
                            password: value
                        })
                    }} style={styles.input} multiline={true} numberOfLines={1} />
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={onCancel}>
                            <Text style={styles.cancel}>Hủy bỏ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonSave} onPress={addUserAction}>
                            <Text>Lưu lại</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        padding: 20
    },
    mainText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    address: {
        alignItems: "flex-start",
        width: "100%",
        height: 100
    },
    input: {
        borderWidth: 2,
        padding: 5,
        width: "100%",
    },
    label: {
        marginVertical: 10,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 20
    },
    button: {
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

    }
})

export default AddUserScreen;
