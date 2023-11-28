
// screens/Screen1.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Modal, ScrollView, Platform, AppState } from 'react-native';
import { RegisterData } from '../../services/interfaces/User.interface';
import * as Yup from 'yup'
import { UpdateStateLogin, postImageAva, registerApi } from '../../services/todo';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';


const CreateAccountNCC = ({ navigation }: any) => {
    const username = navigation.getParam("username")
    const [account, setAccount] = useState<RegisterData>({
        username: "",
        name: "",
        email: "",
        password: "",
        note: "NCC",
        gender: "LGBT",
        dateOfBirth: "",
        address: "",
        phone: ""
    });
    const [userVal, setUserVal] = useState<any>(null);
    const [rePasswords, setRePasswords] = useState<string>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedGender, setSelectedGender] = useState<string>("");
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const selectGender = (Gender: string) => {
        setSelectedGender(Gender);
        setAccount({
            ...account,
            gender: Gender
        });
        toggleModal();
    };


    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || selectedDate;

        setShowDatePicker(Platform.OS === 'ios');
        setSelectedDate(currentDate);
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        const date = day + "/" + month + "/" + year

        setAccount({
            ...account,
            dateOfBirth: date
        });

    };

    const validateInputs = () => {
        if (account.username.length < 5 && (account.username == null || account.username.includes(""))) {
            Alert.alert("Lỗi", "User phải tối thiểu 5 ký tự, không được bỏ trống");
            return false;
        }
        if (!account.email.includes("@")) {
            Alert.alert("Lỗi", "Email phải chứa ký tự @");
            return false;
        }
        if (account.dateOfBirth == null) {
            Alert.alert("Lỗi", "Ngày sinh không được bỏ trống");
            return false;
        }



        return true;
    };
    const addUserAction = async () => {

        if (!image) {
            alert("Chưa chọn ảnh")
            return
        }


        try {


            const { data } = await registerApi(account)


            await uploadImage()

        } catch (err: any) {
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

    const [image, setImage] = useState<any>(null);
    const pickImage = async () => {
        try {
            let result = await DocumentPicker.getDocumentAsync({
                type: 'image/*',
                copyToCacheDirectory: false, // Tránh sao chép tệp vào thư mục bộ nhớ cache của ứng dụng
            });
            if (result.assets != null) {
                setImage(result);
            }
        } catch (error) {
            console.error('Lỗi khi chọn hình ảnh:', error);
        }
    };

    const uploadImage = async () => {
        if (!image) {
            console.error('Chưa chọn hình ảnh.');
            return;
        }

        try {
            const response = await postImageAva(image.assets[0].uri, image.assets[0].name, account.username)
            console.log('Upload Image success:', response.data);
            Alert.alert("Register complete!")
            navigation.navigate("MainScreenAdmin", { username: username })
        } catch (error: any) {
            console.error('Upload failed:', error.response.data);
        }
    };
    const updateState = async (result: boolean) => {

        try {
            await UpdateStateLogin({
                username: username,
                password: "......",
                checkOnline: result
            })
            console.log("Success")
        } catch (error: any) {
            console.log(error.response.data)
        }
    }
    const handleAppStateChange = (AppState: any) => {
        if (AppState === 'background') {
            updateState(false)
        }
        else {
            updateState(true)
        }
    };
    useEffect(() => {
        AppState.addEventListener('change', handleAppStateChange);
    }, [username])
    return (
        <View style={styles.container}>
            <Image style={{
                width: "100%",
                height: "100%",
                position: "absolute"
            }} source={require("../../assets/Icon/BG.jpg")} />
            <Text style={styles.mainText}>Register For NCC</Text>
            <View style={styles.mainContainer}>
                <View style={styles.content}>
                    <ScrollView style={{

                        width: "85%",
                        height: "73%",
                        marginLeft: 20,

                    }}>
                        <Text style={styles.label}>Avatar</Text>

                        {image != null ? (
                            <Image source={{ uri: image.assets[0].uri }} style={{ width: 100, height: 100, marginVertical: 20, alignSelf: 'center' }} />
                        ) : (
                            <Text style={{
                                paddingLeft: 10,
                                paddingVertical: 5,
                                color: "red"
                            }}>
                                Chưa chọn ảnh
                            </Text>
                        )}


                        <TouchableOpacity style={[styles.input, { height: 35, justifyContent: 'center' }]} onPress={() => { pickImage(); }}>
                            <Text  >
                                Chọn ảnh
                            </Text>

                        </TouchableOpacity>

                        <Text style={styles.label}>User</Text>
                        <TextInput value={account.username} onChangeText={(value) => {
                            setAccount({
                                ...account,
                                username: value
                            })
                        }} style={styles.input} placeholder='User name' />
                        {userVal != null && account.username.length < 5 ? (
                            <View>
                                <Text style={styles.textError}>{userVal.User}</Text>
                            </View>

                        ) : null}
                        <Text style={styles.label}>Email</Text>
                        <TextInput value={account.email} onChangeText={(value) => {
                            setAccount({
                                ...account,
                                email: value
                            })
                        }} style={styles.input} placeholder='...@gmail.com' />
                        {userVal != null && (!account.email.includes("@") || !account.email.includes(".")) ? (
                            <View>
                                <Text style={styles.textError}>{userVal.Email}</Text>
                            </View>
                        ) : null}
                        <Text style={styles.label}>Full name</Text>
                        <TextInput value={account.name} onChangeText={(value) => {
                            setAccount({
                                ...account,
                                name: value
                            })
                        }} style={styles.input} placeholder='Nguyễn Văn A' />
                        {userVal != null && !account.name ? (
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
                        <TextInput value={account.address} onChangeText={(value) => {
                            setAccount({
                                ...account,
                                address: value
                            })
                        }} style={styles.input} placeholder='Address' />
                        {userVal != null && !account.address ? (
                            <View>
                                <Text style={styles.textError}>{userVal.Address}</Text>
                            </View>

                        ) : null}
                        <Text style={styles.label}>Number phone</Text>
                        <TextInput value={account.phone} onChangeText={(value) => {
                            setAccount({
                                ...account,
                                phone: value
                            })
                        }} style={styles.input} placeholder='XXXX-XXX-XXX' />
                        {userVal != null && !account.phone ? (
                            <View>
                                <Text style={styles.textError}>{userVal.Phone}</Text>
                            </View>

                        ) : null}

                        <Text style={styles.label}>Password</Text>
                        <TextInput value={account.password} onChangeText={(value) => {
                            setAccount({
                                ...account,
                                password: value
                            })
                        }} style={styles.input} secureTextEntry />
                        {userVal != null && !account.password ? (
                            <View>
                                <Text style={styles.textError}>{userVal.Password}</Text>
                            </View>
                        ) : null}
                        <Text style={styles.label}>Confirm Password</Text>
                        <TextInput value={rePasswords
                        } onChangeText={(value) => {
                            setRePasswords(value)
                        }} style={styles.input} secureTextEntry />
                        {userVal != null && account.password !== rePasswords ? (
                            <View>
                                <Text style={styles.textError}>Password không khớp</Text>
                            </View>
                        ) : null}

                    </ScrollView>
                    <View style={styles.buttons}>

                        <TouchableOpacity style={styles.button} onPress={addUserAction}>
                            <Text style={styles.textbtn}>Signup</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </View>
        </View>


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
        height: "100%",
        width: "100%",
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
        width: "80%",
        marginTop: 20,
        alignItems: "center",
        alignSelf: "center"

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

export default CreateAccountNCC;
