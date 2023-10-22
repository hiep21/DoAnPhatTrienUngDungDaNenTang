import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator, Modal } from 'react-native';
import { UpdateRegisterApi, deleteImage, getByUser, getImageIcon, postImageAva } from '../../services/todo';
import { RegisterData, UpdateRegister } from '../../services/interfaces/User.interface';
import * as DocumentPicker from 'expo-document-picker';
import { getItemAsync } from 'expo-secure-store';
import { bool } from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
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


    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [changeDate, setChangeDate] = useState<string>();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || selectedDate;

        setShowDatePicker(Platform.OS === 'ios');
        setSelectedDate(currentDate);
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Lưu ý rằng tháng bắt đầu từ 0, nên cần cộng thêm 1
        const year = currentDate.getFullYear();
        // const date = day+month+year;
        // setChangeDate(date);
        // console.log(`Ngày: ${day}, Tháng: ${month}, Năm: ${year}`);

        const date = day + "/" + month + "/" + year

        setUsersUpdate({
            ...usersUpdate,
            dateOfBirth: date
        });
    };



    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedGender, setSelectedGender] = useState<string>("");
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const selectGender = (Gender: string) => {
        setSelectedGender(Gender);
        setUsersUpdate({
            ...usersUpdate,
            gender: Gender
        });
        toggleModal();
    };

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
            setImage(result);
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
            await deleteImage(users, images.data[0].imageName)
            const response = await postImageAva(image.assets[0].uri, image.assets[0].name, users)
            console.log('Upload Image success:', response.data);

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
                        {/* <TextInput
                            value={usersUpdate.dateOfBirth}
                            onChangeText={(value) => {
                                setUsersUpdate({
                                    ...usersUpdate,
                                    dateOfBirth: value
                                })
                            }}
                            style={styles.input}
                            placeholder='xx/xx/xxxx'
                        /> */}
                        <TouchableOpacity style={styles.dropdownButton} onPress={() => setShowDatePicker(true)}>
                            <Text> {selectedDate.toDateString()}</Text>
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
                        {/* <TextInput
                            value={usersUpdate.gender}
                            onChangeText={(value) => {
                                setUsersUpdate({
                                    ...usersUpdate,
                                    gender: value
                                })
                            }}
                            style={styles.input}
                            placeholder='Gender'
                        /> */}
                        <TouchableOpacity onPress={toggleModal} style={styles.dropdownButton}>
                            <Text>
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

export default ChangeInfo;