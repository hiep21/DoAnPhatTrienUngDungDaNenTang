import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Button, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { InfoGame } from '../../services/interfaces/GameService';
import { BASE_URL_APK_FILE, deleteApi, getById, getByName } from '../../services/Game';
import BottomSheet from "./BottomSheet";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import { GameManager } from '../../services/interfaces/User.interface';
import { BASE_URL_Image, UpdateGameManager, getImageIcon } from '../../services/todo';
const InfoGameScreen = ({ navigation }) => {

    const gameId = navigation.getParam("gameId")
    const installGame = navigation.getParam("installGame")
    const gameManager = navigation.getParam("gameManager")
    const imageGameUri = navigation.getParam("imageGameUri")
    const [game, setGame] = useState<InfoGame>()
    const [itemGameManager, setitemGameManager] = useState<GameManager>(gameManager)
    const getGameById = async () => {
        try {
            const { data } = await getById(gameId)
            // console.log(data)
            setGame(data[0])

            const response = await getImageIcon(itemGameManager.username)
            const name = response.data[0].imageName
            // console.log(response.data)
            fetchImage(name)
            // console.log(gameManager)
        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage)
        }
    }
    const [checkDownload, setCheckDownload] = useState<boolean>()
    const downloadApk = async (nameGame: string) => {
        const Url = BASE_URL_APK_FILE.concat("getFile/").concat(nameGame); 
        setitemGameManager({
            ...itemGameManager,
            isInstall: true
        })

        if (itemGameManager.isInstall) {
            try {
                // await console.log(itemGameManager)
                const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

                if (status === 'granted') {
                    const downloadResumable = FileSystem.createDownloadResumable(
                        Url,
                        FileSystem.documentDirectory + nameGame
                    );

                    const { uri } = await downloadResumable.downloadAsync();
                    await MediaLibrary.createAssetAsync(uri);

                    console.log('Downloaded successfully:', uri);

                    await UpdateGameManager(itemGameManager)
                    alert("Download thành công")

                } else {
                    return
                }
            } catch (error) {
                console.error('Error downloading :', error.response.data);
            }
        }
        else {
            alert("Mời bạn ấn lại")
        }
        setCheckDownload(true)
    };

    const deleteGame = async () => {
        Alert.alert(
            "Xác nhận",
            "Bạn có chắc chắn muốn xóa không",
            [
                {
                    text: "Hủy",
                    style: "cancel",
                },
                {
                    text: "Đồng ý",
                    onPress: async () => {
                        // await deleteApi(deleteName);
                        alert('Xóa game thành công');
                        navigation.navigate("MainScreen");
                    },
                },
            ]
        );
    }
    useEffect(() => {

        getGameById()
    }, [gameId, gameManager, installGame, imageGameUri])
    const [imageUri, setImageUri] = useState<string>();
    const fetchImage = async (imageName: string) => {

        const url = BASE_URL_Image.concat("getImage/").concat(itemGameManager.username).concat("/").concat(imageName);

        try {
            const response = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + imageName);
            setImageUri(response.uri);

        } catch (error) {
            console.error('Error fetching image:', error.response.data);

        }

    };
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Text style={{
                    textAlign: 'left',
                    paddingLeft: 30,
                    borderBottomWidth: 1.5,
                    fontSize: 17,
                    fontWeight: '600',

                }}>Trò chơi</Text>
                <View style={styles.describeGame}>
                    <Image style={{
                        height: 50,
                        width: 50,
                        borderRadius: 5,
                        marginTop: 10,
                        marginLeft: 20
                    }} source={{ uri: imageGameUri }} />
                    <View style={{
                        justifyContent: 'center',
                        width: "50%",
                        marginRight: 50,
                        marginLeft: 10
                    }}>
                        <Text style={{ fontSize: 15 }}>{game?.tenTroChoi}</Text>
                        <Text style={{ fontSize: 10 }}>{game?.moTaTroChoi}</Text>
                        <Text style={{ fontSize: 10 }}>Trạng thái: {game?.trangThai}</Text>
                    </View>
                    {installGame ? (
                        <View style={{

                            width: "30%",
                            justifyContent: 'center',
                            alignItems: 'center'

                        }}>

                            <TouchableOpacity style={{
                                height: "45%",
                                width: "100%",
                                backgroundColor: "#FF6C6C",
                                marginTop: "5%",
                                justifyContent: 'center',
                                borderRadius: 5
                            }} onPress={() => { deleteGame() }}>
                                <Text style={{ textAlign: 'center' }}>Gỡ cài đặt</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={{

                            width: "30%",
                            alignSelf: "center",
                        }}>
                            <TouchableOpacity style={{
                                height: "45%",
                                width: "100%",
                                backgroundColor: "#6C9EFF",
                                justifyContent: 'center',

                                borderRadius: 5
                            }} onPress={async () => {
                                await downloadApk(game?.tenTroChoi)
                                if (checkDownload == true) {
                                    navigation.navigate("MainScreenUser")
                                }
                            }}>
                                <Text style={{ textAlign: 'center' }}>Cài đặt</Text>
                            </TouchableOpacity>

                        </View>
                    )}
                </View>
                <View style={{
                    width: "100%",
                    height: 100,
                    marginTop: 10,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={[styles.itemInfo, { width: 80 }]}>
                        <Text>Giá cho thuê</Text>
                        <Text>{game?.gia}</Text>
                    </View>
                    <View style={styles.itemInfo}>
                        <Text>Tuổi</Text>
                        <Text style={{ width: "100%", height: 20, textAlign: 'center', borderRightWidth: 1, borderLeftWidth: 1, borderColor: "#bbb" }}>{game?.doTuoi}</Text>
                    </View>
                    <View style={styles.itemInfo}>
                        <Text>Thể loại</Text>
                        <Text style={{ width: "100%", height: 20, textAlign: 'center', borderRightWidth: 1, borderColor: "#bbb" }}>{game?.theLoai}</Text>
                    </View>
                    <View style={styles.itemInfo}>
                        <Text>Kích cỡ</Text>
                        <Text>{game?.kichCoFile}</Text>
                    </View>
                </View>

            </View>
            <View style={styles.end}>
                <Text>
                    {game?.gioiThieuTroChoi}
                </Text>
            </View>
            {/* <BottomSheet ref={ref => (this.bottomSheet = ref)} navigation={navigation} /> */}
        </View>


    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"

    },
    head: {

        width: "80%",
        height: 40,
        justifyContent: 'space-between',
        flexDirection: 'row',

    },
    search: {
        width: 200,
        height: 35,
        backgroundColor: "#bbb",
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderRadius: 20,
        marginLeft: "5%"

    },
    user: {
        flexDirection: 'row',
        marginLeft: "20%"
    },
    body: {
        backgroundColor: "white",
        width: "100%",
        height: "40%",
        marginTop: 20,

    },
    describeGame: {

        height: 70,
        width: "75%",
        //alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    itemInfo: {

        width: 70,
        height: 40,
        alignItems: 'center'

    },
    end: {
        width: "95%",
        height: 260,
        marginHorizontal: 15,

    }


})

export default InfoGameScreen;