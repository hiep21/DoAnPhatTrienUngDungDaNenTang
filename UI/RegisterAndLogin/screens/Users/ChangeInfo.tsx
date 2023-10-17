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
    const [passwords, setPasswords] = useState<string>();

    const loadTasks = async () => {
        const getUser = await getItemAsync('accessToken');
        const tokenObject = JSON.parse(getUser);
        const password = tokenObject.password;
        setPasswords(password)
        try {
            const { data } = await getByUser(users)

            setUsers(data[0])
            setUsersUpdate(
                {
                    user: users,
                    password: passwords,
                    newPassword: passwords,
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
            } catch (error) {
                console.log('Upload failed:', error.response.data.errors.Address);

            }
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
            case 'dateOfBirth':
                return (
                    <View>
                        <Text style={styles.textInput}>Sửa ngày sinh của bạn</Text>
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
                        }} onPress={() => { uploadTextChange(usersUpdate.dateOfBirth); }}>
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.textbtn}>Cập nhật</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                );
            case 'gender':
                return (
                    <View>
                        <Text style={styles.textInput}>Sửa giới tính của bạn</Text>
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
                        }} onPress={() => { uploadTextChange(usersUpdate.gender); }}>
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.textbtn}>Cập nhật</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                );
            case 'email':
                return (
                    <View>
                        <Text style={styles.textInput}>Sửa email của bạn</Text>
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
                        }} onPress={() => { uploadTextChange(usersUpdate.email); }}>
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.textbtn}>Cập nhật</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                );
            case 'phone':
                return (
                    <View >
                        <Text style={styles.textInput}>Sửa số điện thoại của bạn</Text>
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
                        }} onPress={() => { uploadTextChange(usersUpdate.phone); }}>
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.textbtn}>Cập nhật</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                );
            case 'address':
                return (
                    <View>
                        <Text style={styles.textInput}>Sửa địa chỉ của bạn</Text>
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
                        }} onPress={() => { uploadTextChange(usersUpdate.address); }}>
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.textbtn}>Cập nhật</Text>
                            )}
                        </TouchableOpacity>
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