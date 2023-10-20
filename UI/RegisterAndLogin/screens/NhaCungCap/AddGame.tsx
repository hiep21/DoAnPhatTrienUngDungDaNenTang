import React, { useEffect, useState } from 'react';
import { Alert, View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Button } from 'react-native';
import { CreateGame } from '../../services/interfaces/GameService';
import { createGame, deleteApkFile, deleteFolder, deleteImage, getByName, postFileApk, postImage } from '../../services/Game';
import * as DocumentPicker from 'expo-document-picker';


const AddGameNCC = ({ navigation }) => {

    const [game, setgame] = useState<CreateGame>({
        tenTroChoi: "",
        moTaTroChoi: "",
        doTuoi: "",
        theLoai: "",
        gia: "",
        nhaCungCap: "string",
        gioiThieuTroChoi: "",
        kichCoFile: "0Mb",
        trangThai: "Trên kệ"
    });

    const validateInputs = () => {
        if (game.tenTroChoi.length < 5) {
            Alert.alert("Lỗi", "tên phải tối thiểu 5 ký tự");
            return false;
        }
        if (game.moTaTroChoi.length < 10) {
            Alert.alert("Lỗi", "mô tả trò chơi phải tối thiểu 10 ký tự");
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
            navigation.navigate("ManagerGameScreen")
            console.log('Upload success:', response.data);
        } catch (err) {
            const message = err.response.data
            alert(message)
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
            const response = await postImage(image.assets[0].uri, image.assets[0].name, nameDocumentUri.replace(".apk", ""))

            console.log('Upload success:', response.data);
        } catch (error) {
            console.error('Upload failed:', error.response.data);
        }
    };

    const [documentUri, setDocumentUri] = useState<string>("");
    const [nameDocumentUri, setNameDocumentUri] = useState<string>("");
    const pickDocument = async () => {
        try {
            let result = await DocumentPicker.getDocumentAsync({
                type: '*/*',
            });

            if (result != null) {
                setDocumentUri(result.assets[0].uri);
                setNameDocumentUri(result.assets[0].name);
                setgame({
                    ...game,
                    kichCoFile: ((result.assets[0].size / 1024) / 1024).toString()
                })
            } else {
                Alert.alert("Cảnh báo", 'Chưa chọn file.');
            }
        } catch (error) {
            Alert.alert("Cảnh báo", 'Lỗi khi chọn file:' + error.message);
        }
    };

    const uploadDocument = async () => {
        if (documentUri) {
            try {
                // Gửi tệp APK lên API endpoint sử dụng Axios
                const response = await postFileApk(documentUri, nameDocumentUri)
                // Xử lý kết quả từ API nếu cần
                console.log('Upload success:', response.data);
            } catch (err) {
                alert(err.response.data);
                // Xử lý lỗi nếu cần
            }
        } else {
            console.log('Chưa chọn tài liệu.');
        }
    };
    const uploadData = async () => {
        try {
            // Gọi các hàm upload lần lượt và chờ cho đến khi hoàn thành mỗi hàm trước khi gọi hàm tiếp theo
            await uploadDocument();
            await uploadImage();
            await addgameAction();
            // Nếu tất cả các hàm trên chạy thành công, bạn có thể thực hiện các hành động tiếp theo ở đây
        } catch (error) {
            alert(error.response.data);
            const response = await deleteApkFile(nameDocumentUri)
            const response1 = await deleteImage(nameDocumentUri, image.assets[0].name)
            const response2 = await deleteFolder(nameDocumentUri)
        }
    };
    return (

        <View style={{ height: "100%" }}>
            <Text style={styles.mainText}>Gửi yêu cầu thêm trò chơi</Text>
            <View style={styles.container}>

                <View style={[styles.address, { height: "100%" }]}>
                    <ScrollView style={{
                        width: "100%",
                        height: "50%"
                    }}>
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
                        <TextInput value={game?.doTuoi} onChangeText={(value) => {
                            setgame({
                                ...game,
                                doTuoi: value
                            })
                        }} style={styles.input} placeholder='Độ tuổi' />

                        <Text style={styles.label}>Thể loại</Text>
                        <TextInput value={game?.theLoai} onChangeText={(value) => {
                            setgame({
                                ...game,
                                theLoai: value
                            })
                        }} style={styles.input} placeholder='Thể loại' />

                        <Text style={styles.label}>Giá</Text>
                        <TextInput value={game?.gia} onChangeText={(value) => {
                            setgame({
                                ...game,
                                gia: value
                            })
                        }} style={styles.input} placeholder='Giá' />
                        <Text style={styles.label}>Giới thiệu trò chơi</Text>
                        <TextInput numberOfLines={5} value={game?.gioiThieuTroChoi} onChangeText={(value) => {
                            setgame({
                                ...game,
                                gioiThieuTroChoi: value
                            })
                        }} style={styles.inputAdd} />

                        <Text style={styles.label}>Chọn file</Text>
                        <TouchableOpacity onPress={() => { pickDocument() }}>
                            <Text style={styles.input} >
                                {nameDocumentUri}
                            </Text>
                        </TouchableOpacity>



                        <Text style={styles.label}>Icon file</Text>

                        {image && <Image source={{ uri: image.assets[0].uri }} style={{ width: 200, height: 200, marginTop: 20 }} />}


                        <TouchableOpacity onPress={() => { pickImage(); }}>
                            <Text style={styles.input} >

                            </Text>

                        </TouchableOpacity>





                    </ScrollView>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.buttonSave} onPress={onCancel}>
                            <Text >Hủy bỏ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonSave} onPress={() => { uploadData() }}>
                            <Text>Upload File</Text>
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
        justifyContent: "space-between",
        width: "100%",
        marginTop: 20
    },
    button: {
        alignItems: "center",
    },
    buttonSave: {
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderWidth: 2
    },
    inputAdd: {
        borderWidth: 2,
        height: 100,
        width: '100%',

    }
})

export default AddGameNCC;