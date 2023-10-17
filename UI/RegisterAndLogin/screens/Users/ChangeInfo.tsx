import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import { UpdateRegisterApi, getByUser } from '../../services/todo';
import { RegisterData, UpdateRegister } from '../../services/interfaces/User.interface';
import * as DocumentPicker from 'expo-document-picker';
import { getItemAsync } from 'expo-secure-store';
import { bool } from 'yup';
import Background from './Background';
const ChangeInfo = ({ navigation }) => {
    const users = navigation.getParam("user")
    const textChange = navigation.getParam("textChange")
    const [Users, setUsers] = useState<RegisterData>();
    const [usersUpdateImage, setUsersUpdateImage] = useState<UpdateRegister>();
    const [usersUpdate, setUsersUpdate] = useState<UpdateRegister>(
        {
            user: users,
            password: "",
            newPassword: "",
            name: Users?.name,
            email: Users?.email,
            note: Users?.note,
            gender: Users?.gender,
            dateOfBirth: Users?.dateOfBirth,
            address: Users?.address,
            phone: Users?.phone,
            image: Users?.image
        }
    );
    const [isLoading, setIsLoading] = useState(false);

    const loadTasks = async () => {

        try {
            const { data } = await getByUser(users)

            setUsers(data[0])

        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage)
        }

    }
    const loadImage = async () => {

        const getUser = await getItemAsync('accessToken');
        const tokenObject = JSON.parse(getUser);
        const password = tokenObject.password;
        setUsersUpdateImage({
            user: users,
            password: password,
            newPassword: password,
            name: Users.name,
            email: Users.email,
            note: Users.note,
            gender: Users.gender,
            dateOfBirth: Users.dateOfBirth,
            address: Users.address,
            phone: Users.phone,
            image: image.assets[0].uri
        })
        if (usersUpdateImage != undefined) {
            await uploadImage();
            setIsLoading(false)
        } else {
            setIsLoading(true)
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
            else {
                return;
            }

        } catch (error) {
            alert('Lỗi khi chọn hình ảnh:', error);
        }

    }
    const uploadImage = async () => {
        if (!image) {
            console.error('Chưa chọn hình ảnh.');
            return;
        }

        try {
            const response = await UpdateRegisterApi(users, usersUpdateImage)

            console.log('Upload success:', response.data);
        } catch (error) {
            console.log('Upload failed:', error.message);

        }
        setIsLoading(false)

    }
    useEffect(() => {

        loadTasks();
    }, [users, textChange])
    const renderInputField = (key) => {
        switch (key) {
            case 'name':
                return (
                    <View>
                        <Text style={styles.textInput}>Nhập tên của bạn</Text>
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
                    </View>
                );
            case 'dateOfBirth':
                return (
                    <View>
                        <Text style={styles.textInput}>Nhập ngày sinh của bạn</Text>
                        <TextInput
                            value={usersUpdate.dateOfBirth}
                            onChangeText={(value) => {
                                setUsersUpdate({
                                    ...usersUpdate,
                                    dateOfBirth: value
                                })
                            }}
                            style={styles.input}
                            placeholder='xx/xx/xxxx'
                        />
                    </View>
                );
            case 'gender':
                return (
                    <View>
                        <Text style={styles.textInput}>Nhập ngày sinh của bạn</Text>
                        <TextInput
                            value={usersUpdate.gender}
                            onChangeText={(value) => {
                                setUsersUpdate({
                                    ...usersUpdate,
                                    gender: value
                                })
                            }}
                            style={styles.input}
                            placeholder='Gender'
                        />
                    </View>
                );
            case 'email':
                return (
                    <View>
                        <Text style={styles.textInput}>Nhập ngày sinh của bạn</Text>
                        <TextInput
                            value={usersUpdate.email}
                            onChangeText={(value) => {
                                setUsersUpdate({
                                    ...usersUpdate,
                                    email: value
                                })
                            }}
                            style={styles.input}
                            placeholder='xxx@xxx.xxx'
                        />
                    </View>
                );
            case 'phone':
                return (
                    <View style={styles.textInput}>
                        <Text>Nhập ngày sinh của bạn</Text>
                        <TextInput
                            value={usersUpdate.phone}
                            onChangeText={(value) => {
                                setUsersUpdate({
                                    ...usersUpdate,
                                    phone: value
                                })
                            }}
                            style={styles.input}
                            placeholder='xxxx-xxx-xxx'
                        />
                    </View>
                );
            case 'address':
                return (
                    <View>
                        <Text style={styles.textInput}>Nhập ngày sinh của bạn</Text>
                        <TextInput
                            value={usersUpdate.address}
                            onChangeText={(value) => {
                                setUsersUpdate({
                                    ...usersUpdate,
                                    address: value
                                })
                            }}
                            style={styles.input}
                            placeholder='Address'
                        />
                    </View>
                );
        }
    };
    return (

        <Background style={styles.container}>
            <View style={{
                alignItems: "center",
                justifyContent: 'center',
                marginHorizontal: 5,
                width: 350,
                height: 500
            }}>
                {textChange == "image" ? (
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
                            }} onPress={() => { loadImage() }}>
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

                ) : (
                    <View style={{
                        width: 300,
                        height: 150,
                        backgroundColor: "#fff",
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                        borderWidth: 1
                    }}>
                        {renderInputField(textChange)}


                    </View>
                )}
            </View>
        </Background>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        marginHorizontal: 50,


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
    textbtn: {

    }

})

export default ChangeInfo;