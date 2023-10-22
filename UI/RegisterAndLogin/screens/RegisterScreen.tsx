
// screens/Screen1.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Modal, ScrollView } from 'react-native';
import { RegisterData } from '../services/interfaces/User.interface';
import * as Yup from 'yup'
import { registerApi } from '../services/todo';
import Background from './Users/Background';
import DateTimePicker from '@react-native-community/datetimepicker';
// const validationSchema = Yup.object().shape({
//     user: Yup.string()
//         .min(2, 'To Short!')
//         .max(20, 'To Long!')
//         .required("Username is required"),
//     password: Yup.string().min(8).required("Password is required")
//         .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     dateOfBirth: Yup.string().required("Date of Birth is required").matches(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/\d{4}$/),
//     rePassword: Yup.string().min(8).oneOf([Yup.ref('password')]).required("Confirm password is required"),
// });

const AddUserScreen = ({ navigation }) => {

    const [user, setUser] = useState<RegisterData>({
        user: "",
        name: "",
        email: "",
        password: "",
        note: "User",
        gender: "LGBT",
        dateOfBirth: "",
        address: "",
        phone: "",
        image: ""
    });
    const [userVal, setUserVal] = useState(null);
    const [rePasswords, setRePasswords] = useState<string>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedGender, setSelectedGender] = useState<string>("");
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const selectGender = (Gender: string) => {
        setSelectedGender(Gender);
        setUser({
            ...user,
            gender: Gender
        });
        toggleModal();
    };


    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [changeDate, setChangeDate] = useState<string>();
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || selectedDate;
        console.log(currentDate.toDateString());
        setShowDatePicker(Platform.OS === 'ios');
        setSelectedDate(currentDate); // Nếu không có ngày nào được chọn, thì sử dụng ngày hiện tại
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Lưu ý rằng tháng bắt đầu từ 0, nên cần cộng thêm 1
        const year = currentDate.getFullYear();
        // const date = day+month+year;
        // setChangeDate(date);
        // console.log(`Ngày: ${day}, Tháng: ${month}, Năm: ${year}`);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = currentDate.toLocaleDateString(undefined, options);
        setChangeDate(date);

    };

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



        return true;
    };
    const addUserAction = async () => {

        // if (!validateInputs()) {
        //     return;
        // }
        // if (user.password != rePasswords) {
        //     alert("Confirm Password error");
        //     return;
        // }
        user.dateOfBirth = changeDate;

        try {


            const { data } = await registerApi(user)

            Alert.alert("Register complete!")
            navigation.navigate("LoginScreen")
        } catch (err) {
            const message = err.response
            setUserVal(err.response.data.errors)
            console.log(err.response.data.errors)
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
                                <Text style={styles.label}>User</Text>
                                <TextInput value={user.user} onChangeText={(value) => {
                                    setUser({
                                        ...user,
                                        user: value
                                    })
                                }} style={styles.input} placeholder='User name' />
                                {userVal != null && user.user.length < 5 ? (
                                    <View>
                                        <Text style={styles.textError}>{userVal.User}</Text>
                                    </View>

                                ) : null}
                                <Text style={styles.label}>Email</Text>
                                <TextInput value={user.email} onChangeText={(value) => {
                                    setUser({
                                        ...user,
                                        email: value
                                    })
                                }} style={styles.input} placeholder='...@gmail.com' />
                                {userVal != null && (!user.email.includes("@") || !user.email.includes(".")) ? (
                                    <View>
                                        <Text style={styles.textError}>{userVal.Email}</Text>
                                    </View>
                                ) : null}
                                <Text style={styles.label}>Full name</Text>
                                <TextInput value={user.name} onChangeText={(value) => {
                                    setUser({
                                        ...user,
                                        name: value
                                    })
                                }} style={styles.input} placeholder='Nguyễn Văn A' />
                                {userVal != null && !user.name ? (
                                    <View>
                                        <Text style={styles.textError}>{userVal.Name}</Text>
                                    </View>
                                ) : null}
                                <Text style={styles.label}>Gender</Text>
                                <TouchableOpacity onPress={toggleModal} style={styles.dropdownButton}>
                                    <Text style={styles.selectedGenderText}>
                                        {selectedGender ? selectedGender : 'LGBT'}
                                    </Text>
                                </TouchableOpacity>

                                <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={toggleModal}>
                                    <View style={styles.modalContainer}>
                                        <View style={styles.modalContent}>
                                            <TouchableOpacity onPress={() => selectGender('Male')} style={styles.modalItem}>
                                                <Text>Male</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => selectGender('Female')} style={styles.modalItem}>
                                                <Text>Female</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => selectGender('Other')} style={styles.modalItem}>
                                                <Text>Other</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                                                <Text>Close</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Modal>
                                <Text style={styles.label}>Date Of Birth</Text>


                                <TouchableOpacity style={styles.dropdownButton} onPress={() => setShowDatePicker(true)}>
                                    <Text style={styles.selectedGenderText}>Selected Date: {selectedDate.toDateString()}</Text>
                                </TouchableOpacity>
                                {showDatePicker && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={selectedDate}
                                        mode="date"
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange}
                                    />
                                )}
                                <Text style={styles.label}>Address</Text>
                                <TextInput value={user.address} onChangeText={(value) => {
                                    setUser({
                                        ...user,
                                        address: value
                                    })
                                }} style={styles.input} placeholder='Address' />
                                {userVal != null && !user.address ? (
                                    <View>
                                        <Text style={styles.textError}>{userVal.Address}</Text>
                                    </View>

                                ) : null}
                                <Text style={styles.label}>Number phone</Text>
                                <TextInput value={user.phone} onChangeText={(value) => {
                                    setUser({
                                        ...user,
                                        phone: value
                                    })
                                }} style={styles.input} placeholder='XXXX-XXX-XXX' />
                                {userVal != null && !user.phone ? (
                                    <View>
                                        <Text style={styles.textError}>{userVal.Phone}</Text>
                                    </View>

                                ) : null}

                                <Text style={styles.label}>Password</Text>
                                <TextInput value={user.password} onChangeText={(value) => {
                                    setUser({
                                        ...user,
                                        password: value
                                    })
                                }} style={styles.input} secureTextEntry />
                                {userVal != null && !user.password ? (
                                    <View>
                                        <Text style={styles.textError}>{userVal.Password}</Text>
                                    </View>
                                ) : null}
                                <Text style={styles.label}>Confirm Password</Text>
                                <TextInput value={rePasswords
                                } onChangeText={(value) => {
                                    setRePasswords(value)
                                }} style={styles.input} secureTextEntry />
                                {userVal != null && user.password !== rePasswords ? (
                                    <View>
                                        <Text style={styles.textError}>Password không khớp</Text>
                                    </View>
                                ) : null}

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
    textError: {
        color: "red"
    }
})

export default AddUserScreen;
