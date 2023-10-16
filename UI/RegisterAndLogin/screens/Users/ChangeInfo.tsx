import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import { getByUser } from '../../services/todo';
import { RegisterData } from '../../services/interfaces/User.interface';
import * as DocumentPicker from 'expo-document-picker';

const ChangeInfo = ({ navigation }) => {
    const user = navigation.getParam("user")
    const textChange = navigation.getParam("textChange")
    const [users, setUsers] = useState<RegisterData>();

    const loadTasks = async () => {
        try {
            const { data } = await getByUser(user)

            setUsers(data[0])

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
        setUsers({
            ...users,
            image: image.assets[0].uri
        })
        try {

            const response = await post(image.assets[0].uri, image.assets[0].name, nameDocumentUri.replace(".apk", ""))

            console.log('Upload success:', response.data);
        } catch (error) {
            console.error('Upload failed:', error.response.data);
        }
    };
    useEffect(() => {
        loadTasks()
    }, [user, textChange])
    return (

        <View style={styles.container}>
            <Text>
                Nhập {textChange}
            </Text>
            {textChange != "image" ? (
                <View>
                    <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => { pickImage(); }}>
                        <Text>click</Text>
                    </TouchableOpacity>
                    {image && <Image source={{ uri: image.assets[0].uri }} style={{ width: 200, height: 200, marginTop: 20 }} />}
                    <TouchableOpacity onPress={() => { uploadImage() }}>
                        <Text>Upload File</Text>
                    </TouchableOpacity>
                </View>

            ) : (
                <Text>
                    <Text>{textChange}</Text>
                </Text>
            )}

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        marginHorizontal: 50
    },


})

export default ChangeInfo;