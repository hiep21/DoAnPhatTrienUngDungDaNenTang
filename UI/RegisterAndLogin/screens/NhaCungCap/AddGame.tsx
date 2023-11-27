import React, { useEffect, useState } from 'react';
import { Alert, View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Button, ActivityIndicator } from 'react-native';
import { CreateGame } from '../../services/interfaces/GameService';
import { createGame, deleteApkFile, deleteFolder, deleteImage, deleteImageIcon, getByName, postFileApk, postImage, postImageIcon } from '../../services/Game';
import * as DocumentPicker from 'expo-document-picker';
import { number } from 'yup';


const AddGameNCC = ({ navigation }: any) => {
    const nameNCC = navigation.getParam("nameNCC")
    const [checkNameGame, setCheckNameGame] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState(false);
    const [game, setgame] = useState<CreateGame>({
        tenTroChoi: "",
        moTaTroChoi: "",
        doTuoi: 0,
        theLoai: "",
        gia: 0,
        nhaCungCap: nameNCC,
        gioiThieuTroChoi: "",
        kichCoFile: 0,
        trangThai: "Chờ xét duyệt"
    });

    const validateInputs = () => {
        if (game.tenTroChoi.length < 5) {
            Alert.alert("Lỗi", "Tên game phải tối thiểu 5 ký tự, ");
            return false;
        }
        if (/[!@#$%^&*()+={}\[\]:;<>,.?~\\|]/.test(game.tenTroChoi) && game.tenTroChoi.includes(" ")) {
            Alert.alert("Lỗi", "Tên game không được chứa ký tự đặc biệt, thay vào đó sử dụng _ như là dấu cách");
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
    const addgameAction = async () => {

        if (!validateInputs()) {
            return;
        }

        try {
            const response = await createGame(game)
            alert("Thành công")
            console.log('Upload info game success');
            await navigation.navigate("MainScreenNCC")
        } catch (err: any) {

            const message = err.response.data
            console.log(message)
            await deleteFolder(nameDocumentUri)
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

    const [imageUri, setImageUri] = useState<string>("");
    const [imageName, setImageName] = useState<string>("");
    const pickImage = async () => {
        try {
            let result: any = await DocumentPicker.getDocumentAsync({
                type: 'image/*',
            });
            if (result != null) {
                setImageUri(result.assets[0].uri)
                setImageName(result.assets[0].name)
            } else {
                Alert.alert("Cảnh báo", 'Chưa chọn ảnh.');
            }
        } catch (error: any) {
            Alert.alert("Cảnh báo", 'Chưa chọn ảnh.');
        }
    };

    const uploadImage = async () => {
        if (imageUri) {
            try {
                const response = await postImageIcon(imageUri, imageName, nameDocumentUri)

                console.log('Upload success Image');
            } catch (error: any) {
                await deleteApkFile(nameDocumentUri);
                console.error('Upload failed:', error.response.data);
            }
        }
        else {
            console.error('Chưa chọn hình ảnh.');
        }


    };

    const [documentUri, setDocumentUri] = useState<string>("");
    const [nameDocumentUri, setNameDocumentUri] = useState<string>("");
    const pickDocument = async () => {
        try {
            let result: any = await DocumentPicker.getDocumentAsync({
                type: '*/*',
            });

            if (result != null) {
                setDocumentUri(result.assets[0].uri);
                setNameDocumentUri(result.assets[0].name);
                setgame({
                    ...game,
                    kichCoFile: parseFloat(((result.assets[0].size / 1024) / 1024).toFixed(2))
                })
            } else {
                Alert.alert("Cảnh báo", 'Chưa chọn file.');
            }
        } catch (error: any) {
            Alert.alert("Cảnh báo", 'Chưa chọn file.');
        }
    };

    const uploadDocument = async () => {
        if (documentUri) {
            try {
                // Gửi tệp APK lên API endpoint sử dụng Axios
                const response = await postFileApk(documentUri, nameDocumentUri)
                // Xử lý kết quả từ API nếu cần
                console.log('Upload file success ');
            } catch (err: any) {
                alert(err.response.data);
                // Xử lý lỗi nếu cần
            }
        } else {
            console.log('Chưa chọn tài liệu.');
        }
    };
    const uploadData = async () => {
        // console.log(nameDocumentUri)
        if (!isLoading) {
            setIsLoading(true)
            try {
                await uploadDocument();

            } catch (error: any) {

                const response = await deleteApkFile(nameDocumentUri)
                console.log(error.response.data);
            }
            try {
                await uploadImage();
            } catch (error: any) {
                const response = await deleteApkFile(nameDocumentUri)
                const response2 = await deleteImageIcon(nameDocumentUri, imageName)

                console.log(error.response.data);
            }

            await addgameAction();

            setIsLoading(false)
        }


    };
    useEffect(() => {
    }, [nameNCC])
    return (

        <View style={{ height: "100%" }}>
            <Text style={styles.mainText}>Gửi yêu cầu thêm trò chơi</Text>
            <View style={styles.container}>

                <View style={[styles.address, { height: "100%" }]}>
                    <ScrollView style={{
                        width: "100%",
                        height: "50%"
                    }}>
                        <Text style={styles.label}>Chọn file</Text>
                        <TouchableOpacity onPress={() => { pickDocument() }}>
                            <Text style={styles.input} >
                                {nameDocumentUri}
                            </Text>
                        </TouchableOpacity>



                        <Text style={styles.label}>Icon file</Text>

                        {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginTop: 20, alignSelf: "center" }} />}


                        <TouchableOpacity onPress={() => { pickImage(); }}>
                            <Text style={styles.input} >

                            </Text>

                        </TouchableOpacity>

                        <Text style={styles.label}>Tên trò chơi</Text>
                        <TextInput value={game?.tenTroChoi} onChangeText={(value) => {
                            setgame({
                                ...game,
                                tenTroChoi: value
                            })
                        }} style={styles.input} placeholder='Tên trò chơi' />

                        <Text style={styles.label}>Mô tả trò chơi</Text>
                        <TextInput value={game?.moTaTroChoi} onChangeText={(value) => {
                            setgame({
                                ...game,
                                moTaTroChoi: value
                            })
                        }} style={styles.input} placeholder='Mô tả trò chơi' />

                        <Text style={styles.label}>Độ tuổi</Text>
                        <TextInput value={game?.doTuoi.toString()} onChangeText={(value) => {
                            if (value != "") {
                                setgame({
                                    ...game,
                                    doTuoi: parseInt(value)
                                })
                            }
                        }} style={styles.input} placeholder='Độ tuổi' />

                        <Text style={styles.label}>Thể loại</Text>
                        <TextInput value={game?.theLoai} onChangeText={(value) => {
                            setgame({
                                ...game,
                                theLoai: value
                            })
                        }} style={styles.input} placeholder='Thể loại' />

                        <Text style={styles.label}>Giá</Text>
                        <TextInput value={game?.gia.toString()} onChangeText={(value) => {
                            if (value != "") {
                                setgame({
                                    ...game,
                                    gia: parseInt(value)
                                })
                            }
                        }} style={styles.input} placeholder='Giá' />
                        <Text style={styles.label}>Giới thiệu trò chơi</Text>
                        <TextInput numberOfLines={4} multiline value={game?.gioiThieuTroChoi} onChangeText={(value) => {
                            setgame({
                                ...game,
                                gioiThieuTroChoi: value
                            })
                        }} style={styles.inputAdd} />






                    </ScrollView>
                    <View style={styles.buttons}>

                        <View style={[styles.buttonSave, {
                            elevation: 5, padding: 3,
                            borderRadius: 5,
                            width: 90,
                            height: 30,
                            position: "absolute"
                        }]}>
                        </View>

                        <TouchableOpacity style={styles.buttonSave} onPress={() => { uploadData() }}>
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text>Up load file</Text>
                            )}
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </View >


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20
    },
    mainText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'center'
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
        justifyContent: "center",
        width: "100%",
        marginTop: 20
    },
    button: {
        alignItems: "center",
    },
    buttonSave: {
        backgroundColor: "#3498db",
        padding: 3,
        borderRadius: 5,
        width: 90,
        height: 30,
        alignItems: "center",
        justifyContent: "center"

    },
    inputAdd: {
        borderWidth: 2,
        height: 90,
        width: '100%',
        paddingHorizontal: 10
    }
})

export default AddGameNCC;