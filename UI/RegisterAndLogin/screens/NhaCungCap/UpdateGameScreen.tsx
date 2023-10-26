import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator, Modal } from 'react-native';
import { UpdateRegisterApi, deleteImage, getByUser, getImageIcon, postImageAva } from '../../services/todo';
import { RegisterData, UpdateRegister } from '../../services/interfaces/User.interface';
import * as DocumentPicker from 'expo-document-picker';
import { getItemAsync } from 'expo-secure-store';
import Background from '../Users/Background';

const UpdateGameNCC = ({ navigation }) => {

    const users = navigation.getParam("user")
    const gameId = navigation.getParam("gameId")
    const textChange = navigation.getParam("textChange")
    const imageUri = navigation.getParam("imageUri")
    const [Users, setUsers] = useState<RegisterData>();
    const [usersUpdateImage, setUsersUpdateImage] = useState<UpdateRegister>();
    const [usersUpdate, setUsersUpdate] = useState<UpdateRegister>(
        {
            user: "",
            password: "",
            newPassword: "",
            name: "",
            email: "",
            note: "",
            gender: "",
            dateOfBirth: "",
            address: "",
            phone: "",
            image: ""
        }
    );
    const [isLoading, setIsLoading] = useState(false);



    const loadTasks = async () => {
        const getUser = await getItemAsync('accessToken');
        const tokenObject = JSON.parse(getUser);
        const password = tokenObject.password;


        try {
            const { data } = await getByUser(users)

            setUsers(data[0])
            setUsersUpdate(
                {
                    user: users,
                    password: password,
                    newPassword: password,
                    name: data[0].name,
                    email: data[0].email,
                    note: data[0].note,
                    gender: data[0].gender,
                    dateOfBirth: data[0].dateOfBirth,
                    address: data[0].address,
                    phone: data[0].phone,
                    image: data[0].image
                }
            )

        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage)
        }

    }


    const [image, setImage] = useState(null);
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
            const images = await getImageIcon(users)
            if (images) {

                await deleteImage(users, images.data[0].imageName)
            }
            const response = await postImageAva(image.assets[0].uri, image.assets[0].name, users)


            console.log('Upload Image success:', response.data);
            navigation.navigate("HomeScreen")
        } catch (error) {
            console.error('Upload failed:', error.response.data);
        }
    };

    const uploadTextChange = async (change: string) => {

        if (!isLoading) {
            setIsLoading(true)
            console.log(usersUpdate);
            if (change == "") {
                console.error('Chưa chọn hình ảnh.');
                return;
            }

            try {
                const { data } = await UpdateRegisterApi(users, usersUpdate)

                console.log('Upload success:', data);
                navigation.navigate("HomeScreen")
            } catch (error) {
                console.log('Upload failed:', error.response.data.errors.Address);

            }
        }
        setIsLoading(false)
    }
    useEffect(() => {

        loadTasks();
    }, [textChange, gameId, imageUri])
    const renderInputField = (key: string) => {
        switch (key) {
            case '0':
                return (
                    <View style={{
                        width: 300,
                        height: 400,
                        backgroundColor: "#fff",
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                        borderWidth: 1
                    }}>
                        <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => { pickImage(); }}>
                            <Text style={{ fontWeight: '700' }}>Click chọn ảnh</Text>
                        </TouchableOpacity>
                        {image && <Image source={{ uri: image.assets[0].uri }} style={{ width: 200, height: 200, marginTop: 20 }} />}
                        <Text> </Text>
                        {image != null ? (
                            <TouchableOpacity style={{
                                width: 100,
                                height: 30,
                                backgroundColor: "#bbb",
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10,
                                borderWidth: 1.25
                            }} onPress={() => { uploadImage() }}>
                                {isLoading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.textbtn}>UploadFile</Text>
                                )}
                            </TouchableOpacity>
                        ) : (
                            <Text></Text>
                        )}
                    </View>
                );
            case '1':
                return (
                    <View>
                        <Text style={styles.textInput}>Sửa tên của bạn</Text>
                        <TextInput
                            value={usersUpdate.name}
                            onChangeText={(value) => {
                                setUsersUpdate({
                                    ...usersUpdate,
                                    name: value
                                })
                            }}
                            style={styles.input}
                            placeholder='Nguyễn văn A'
                        />
                        <TouchableOpacity style={{
                            backgroundColor: "#7FFF00",
                            width: 200,
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 5,
                            alignSelf: 'center',
                            marginTop: 10,
                            borderWidth: 1
                        }} onPress={() => { uploadTextChange(usersUpdate.name); }}>
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.textbtn}>cập nhật</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                );
        }
    };
    return (
        <View style={styles.container}>

            <View style={{
                alignItems: "center",
                justifyContent: 'center',
                marginHorizontal: 5,
                width: 350,
                height: 500
            }}>

                {renderInputField(textChange)}

            </View>
        </View>



    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',

        backgroundColor: "white"


    },

    input: {
        borderWidth: 1.25,
        paddingVertical: 1,
        width: 200,
        borderRadius: 5,
        backgroundColor: "#7777",
        borderColor: '#555',
        paddingHorizontal: 15,
        marginTop: 10
    },
    textInput: {
        paddingHorizontal: 5
    },
    dropdownButton: {
        borderWidth: 1.25,
        paddingVertical: 1,
        width: 200,
        borderRadius: 5,
        backgroundColor: "#7777",
        borderColor: '#555',
        paddingHorizontal: 15,
        marginTop: 10,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textbtn: {

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

})

export default UpdateGameNCC;