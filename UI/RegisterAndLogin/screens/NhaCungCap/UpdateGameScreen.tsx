import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator, FlatList } from 'react-native';
import { UpdateRegisterApi, getByUser, getImageIcon, postImageAva } from '../../services/todo';
import { ImageUri, RegisterData, UpdateRegister } from '../../services/interfaces/User.interface';
import * as DocumentPicker from 'expo-document-picker';
import { getItemAsync } from 'expo-secure-store';
import Background from '../Users/Background';
import { InfoGame } from '../../services/interfaces/GameService';
import { BASE_URL_Image, deleteImage, deleteImageIcon, getById, getImageGame, getImageIconGame, postImage, postImageIcon } from '../../services/Game';
import * as FileSystem from 'expo-file-system';

const UpdateGameNCC = ({ navigation }) => {
    const user = navigation.getParam("user")
    const gameId = navigation.getParam("gameId")
    const textChange = navigation.getParam("textChange")
    const imageUri = navigation.getParam("imageUri")
    const tenGame = navigation.getParam("tenGame")
    const [game, setGame] = useState<InfoGame>();
    const [refreshing, setRefreshing] = useState<boolean>(false)

    const [imageGameName, setImageGameName] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);


    const loadImage = async () => {
        setRefreshing(true)
        console.log(tenGame)
        try {
            const response = await getImageGame(tenGame)
            for (let index = 0; index < response.data.length; index++) {
                const imageName = response.data[index].imageName
                await fetchImage(tenGame, imageName)

            }
            console.log(checklist[0])
            setListImageUri(checklist)
        } catch (err) {
            const errorMessage = err.response
            console.log(errorMessage)
        }
        setRefreshing(false)
    }
    const [listImageUri, setListImageUri] = useState<ImageUri[]>([])
    let checklist: ImageUri[] = [];
    const fetchImage = async (username: string, imageName: string) => {

        let check: ImageUri = {
            username: "",
            imageUri: ""
        };


        const url = BASE_URL_Image.concat("getImage/").concat(username).concat("/").concat(imageName);

        try {
            const response = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + imageName);
            check.username = username
            check.imageUri = response.uri
            checklist.push(check)

        } catch (error) {
            console.error('Error fetching image:', error.response.data);
        }
    };

    const loadTasks = async () => {
        try {
            const response1 = await getById(gameId)
            setGame(response1.data[0])
            const response2 = await getImageIconGame(response1.data[0].tenTroChoi)
            setImageGameName(response2.data[0].imageName)
        } catch (err) {
            const errorMessage = err.response
            console.log(errorMessage.data)
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

    const uploadImageIcon = async () => {
        if (!image) {
            console.error('Chưa chọn hình ảnh.');
            return;
        }
        try {
            const response = await deleteImageIcon(game?.tenTroChoi.replace(".apk", ""), imageGameName?.replace(".png", ""))
        } catch (error) {

            console.log(error.response.data);
            return;
        }
        try {

            const response = await postImageIcon(image.assets[0].uri, image.assets[0].name, game?.tenTroChoi.replace(".apk", ""))
            alert('Thêm ảnh thành công: ' + response.data.oldFileName);
            navigation.navigate("ManagerGameNCC", user)
        } catch (error) {
            alert(error.response.data);
        }
    };

    const uploadImage = async () => {
        if (!image) {
            console.error('Chưa chọn hình ảnh.');
            return;
        }
        try {
            const response = await postImage(image.assets[0].uri, image.assets[0].name, game?.tenTroChoi.replace(".apk", ""))

            Alert.alert("Thành công", "Bạn có muốn thêm ảnh không?",
                [
                    {
                        text: "Hủy",
                        onPress: async () => {
                            navigation.navigate("ManagerGameNCC", user)
                        },
                    },
                    {
                        text: "Đồng ý",
                        style: "cancel",
                    },
                ]
            )
        } catch (error) {
            alert(error.response.data);
        }
    };

    const uploadTextChange = async (change: string) => {

        if (!isLoading) {
            setIsLoading(true)
            console.log();


            try {
                const { data } = await UpdateRegisterApi(users)

                console.log('Upload success:', data);
                navigation.navigate("HomeScreen")
            } catch (error) {
                console.log('Upload failed:', error.response.data.errors.Address);

            }
        }
        setIsLoading(false)
    }
    const [usersUpdate, setUsersUpdate] = useState<UpdateRegister>({
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
    const renderTask = async ({ item }: { item: ImageUri }) => {
        const size = await new Promise((resolve, reject) => {
            Image.getSize(item.imageUri, (width, height) => {
                resolve({ width, height });
            }, (error) => {
                reject("lỗi:" + error);
            });
        });
        return (
            <TouchableOpacity onPress={() => { }} >
                <Image style={{
                    width: size.width,
                    height: size.height
                }} source={{ uri: item.imageUri }} />
            </TouchableOpacity >

        )
    }
    useEffect(() => {
        loadTasks();
        loadImage();

    }, [textChange, gameId, imageUri, user])
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
                            }} onPress={() => { uploadImageIcon() }}>
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
            case '2':
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
                        <FlatList
                            data={listImageUri}
                            renderItem={(list) => renderTask(list)}
                            onRefresh={loadTasks}
                            refreshing={refreshing}
                            style={{
                                marginTop: "5%",
                                borderWidth: 1,
                                width: "95%",
                                alignSelf: 'center',
                                borderRadius: 5,
                                borderColor: "#bbb"
                            }}
                        />
                    </View>
                );
            case '3':
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