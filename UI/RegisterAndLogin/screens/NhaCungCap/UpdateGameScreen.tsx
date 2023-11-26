import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator, FlatList, ScrollView } from 'react-native';

import { ImageUri } from '../../services/interfaces/User.interface';
import * as DocumentPicker from 'expo-document-picker';
import { InfoGame } from '../../services/interfaces/GameService';
import { BASE_URL_Image, deleteImage, deleteImageIcon, getById, getImageGame, getImageIconGame, postFileApk, postImage, postImageIcon, updateFileApk } from '../../services/Game';
import * as FileSystem from 'expo-file-system';

const UpdateGameNCC = ({ navigation }: any) => {
    const userName = navigation.getParam("userName")
    const gameId = navigation.getParam("gameId")
    const textChange = navigation.getParam("textChange")
    const imageUri = navigation.getParam("imageUri")
    const tenGame = navigation.getParam("tenGame")
    const [game, setGame] = useState<InfoGame>();
    const [refreshing, setRefreshing] = useState<boolean>(false)

    const [imageGameName, setImageGameName] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);

    const validateInputs = () => {
        if (game.tenTroChoi.length < 5) {
            Alert.alert("Lỗi", "tên phải tối thiểu 5 ký tự");
            return false;
        }
        if (game.moTaTroChoi.length < 5) {
            Alert.alert("Lỗi", "mô tả trò chơi phải tối thiểu 5 ký tự");
            return false;
        }
        if (game.gioiThieuTroChoi.length < 50) {
            Alert.alert("Lỗi", "Giới thiệu trò chơi phải tối thiểu 50 ký tự");
            return false;
        }
        return true;
    };
    const loadImage = async () => {
        setRefreshing(true)
        // console.log(tenGame)
        try {
            const response = await getImageGame(tenGame)

            for (let index = 0; index < response.data.length; index++) {
                const imageName = response.data[index].imageName
                await fetchImage(tenGame, imageName)

            }
            let lsImageUri: string[] = []
            for (let index = 0; index < checklist.length; index++) {
                lsImageUri.push(checklist[index].imageUri)
            }
            letSizeImage(lsImageUri);
            // console.log(checklist)
            setListImageUri(checklist)
        } catch (err) {
            const errorMessage = err.response
            alert("lỗi: " + errorMessage.data)
        }

        setRefreshing(false)
    }
    const [listImageUri, setListImageUri] = useState<ImageUri[]>()
    let checklist: ImageUri[] = [];
    const fetchImage = async (namePath: string, imageName: string) => {

        let check: ImageUri = {
            namePath: "",
            imageUri: ""
        };


        const url = BASE_URL_Image.concat("getImage/").concat(namePath).concat("/").concat(imageName);

        try {
            const response = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + imageName);
            check.namePath = namePath
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


    const [image, setImage] = useState();
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

            const response = await postImageIcon(image.assets[0].uri, image.assets[0].name, game?.tenTroChoi)
            alert('Thêm ảnh thành công: ' + response.data.oldFileName);
            navigation.navigate("ManagerGameNCC", userName)
            try {
                const response = await deleteImageIcon(game?.tenTroChoi, imageGameName)
            } catch (error) {

                console.log(error.response.data);
                return;
            }
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
            const response = await postImage(image.assets[0].uri, image.assets[0].name, game?.tenTroChoi)

            Alert.alert("Thành công", "Bạn có muốn thêm ảnh không?",
                [
                    {
                        text: "Hủy",
                        onPress: async () => {
                            navigation.navigate("ManagerGameNCC", userName)
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

    const [documentUri, setDocumentUri] = useState<string>();
    const [nameDocumentUri, setNameDocumentUri] = useState<string>();
    const pickApkFile = async () => {
        try {
            let result = await DocumentPicker.getDocumentAsync({
                type: '*/*',
            });

            if (result != null) {
                if (game?.tenTroChoi != result.assets[0].name) {
                    Alert.alert("Cảnh báo", 'Sai file game đã tải.');
                } else {
                    setDocumentUri(result.assets[0].uri);
                    setNameDocumentUri(result.assets[0].name);
                    setGame({
                        ...game,
                        kichCoFile: ((result.assets[0].size / 1024) / 1024).toFixed(2)
                    })
                }

            } else {
                Alert.alert("Cảnh báo", 'Chưa chọn file.');
            }
        } catch (error) {
            Alert.alert("Cảnh báo", 'Lỗi khi chọn file:' + error.message);
        }
    };

    const uploadApkFile = async () => {
        if (documentUri) {
            try {
                // Gửi tệp APK lên API endpoint sử dụng Axios
                const response = await updateFileApk(documentUri, nameDocumentUri)
                // Xử lý kết quả từ API nếu cần
                alert('Cập nhật thành công' + response.data);
                navigation
            } catch (err) {
                alert(err.response.data);
                // Xử lý lỗi nếu cần
            }
        } else {
            console.log('Chưa chọn tài liệu.');
        }
    };

    let height: number
    let width: number
    const getSizeImage = async (imageUri: string): Promise<{ width: number, height: number }> => {
        return new Promise((resolve, reject) => {
            Image.getSize(imageUri, (width, height) => {
                resolve({ width, height });
            }, (error) => {
                reject("lỗi:" + error);
            });
        });
    }
    const [imageSize, setImageSize] = useState<{
        width: number;
        height: number;
        imageUri: string;
    }[]>([]);

    const letSizeImage = async (imageUris: string[]) => {
        try {
            const sizePromises = imageUris.map(async (imageUri) => {
                const size = await getSizeImage(imageUri);
                const { width, height } = size;
                return { width, height, imageUri };
            });

            const imageSizes = await Promise.all(sizePromises);
            setImageSize(imageSizes);
            // Thực hiện các thao tác khác dựa trên imageSizes ở đây
        } catch (error) {
            console.error("Lỗi khi lấy kích thước ảnh:", error);
        }
    };

    // Sử dụng hàm letSizeImage với một mảng các imageUri
    // Thay bằng mảng các địa chỉ URL của ảnh của bạn
    const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);

    const renderTask = ({ item }: { item: ImageUri }) => {

        return (
            <TouchableOpacity style={{
                alignItems: 'center',
                margin: 5,
            }} onPress={() => setSelectedImageUri(item.imageUri)}>
                {imageSize.find(f => f.imageUri === item.imageUri) ? (
                    <Image style={{
                        width: selectedImageUri === item.imageUri ? imageSize.find(f => f.imageUri === item.imageUri).width : imageSize.find(f => f.imageUri === item.imageUri).width / 3,
                        height: selectedImageUri === item.imageUri ? imageSize.find(f => f.imageUri === item.imageUri).height : imageSize.find(f => f.imageUri === item.imageUri).height / 3
                    }} source={{ uri: item.imageUri }} />
                ) : null}
            </TouchableOpacity>

        )
    }

    const uploadData = async () => {
        console.log(nameDocumentUri)
        if (!isLoading) {

            if (!validateInputs()) {
                return;
            }

            try {
                const response = await createGame(game)
                alert("Thành công")
                console.log('Upload success:', response.data);
                await navigation.navigate("MainScreenNCC")
            } catch (err) {

                const message = err.response.data
                console.log(message)
            }
        }


    };

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

    useEffect(() => {
        loadTasks();
        if (textChange == "2") {
            loadImage();
        }


    }, [textChange, gameId, imageUri, userName])
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
                            onRefresh={loadImage}
                            refreshing={refreshing}
                            style={{
                                marginVertical: "5%",
                                borderWidth: 1,
                                width: "95%",
                                alignSelf: 'center',
                                borderRadius: 5,
                                borderColor: "#bbb",
                            }}
                        />
                    </View>
                );
            case '3':
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
                        <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => { pickApkFile(); }}>
                            <Text style={{ fontWeight: '700' }}>Click chọn file </Text>
                        </TouchableOpacity>
                        {documentUri && <Text>{nameDocumentUri}</Text>}
                        <Text> </Text>
                        {documentUri != null ? (
                            <TouchableOpacity style={{
                                width: 100,
                                height: 30,
                                backgroundColor: "#bbb",
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10,
                                borderWidth: 1.25
                            }} onPress={() => { uploadApkFile() }}>
                                {isLoading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.textbtn}>Cập nhật</Text>
                                )}
                            </TouchableOpacity>
                        ) : (
                            <Text></Text>
                        )}
                    </View>
                );
            case '4':
                return (
                    <View style={{
                        backgroundColor: "white",
                        width: "80%",
                        height: "80%",
                        borderRadius: 10

                    }}>
                        <Text style={styles.mainText}>Cập nhật thông tin trò chơi</Text>



                        <View style={styles.buttons}>
                            <TouchableOpacity style={styles.buttonSave} onPress={() => { onCancel() }}>
                                <Text style={{ color: "white", fontWeight: "700" }}>Hủy bỏ</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.buttonSave, { backgroundColor: "green" }]} onPress={() => { uploadData() }}>
                                {isLoading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={{ color: "white", fontWeight: "700" }}>Cập nhật</Text>
                                )}
                            </TouchableOpacity>

                        </View>
                    </View>



                );
        }
    };
    return (
        <View style={styles.container}>
            <Image style={{
                width: "100%",
                height: "100%",
                position: "absolute"
            }} source={{ uri: imageUri }} />
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
    mainText: {
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "900"
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",

    },
    buttonSave: {
        backgroundColor: "red",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5
    }

})

export default UpdateGameNCC;