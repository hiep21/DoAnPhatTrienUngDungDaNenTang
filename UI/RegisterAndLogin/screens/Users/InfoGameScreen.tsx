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
    const [game, setGame] = useState<InfoGame>()
    const [itemGameManager, setitemGameManager] = useState<GameManager>(gameManager)
    const getGameById = async () => {
        try {
            const { data } = await getById(gameId)
            // console.log(data)
            setGame(data[0])

            const response = await getImageIcon(itemGameManager.username)
            const name = response.data[0].imageName
            console.log(response.data)
            fetchImage(name)
            console.log(gameManager)
        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage)
        }
    }
    const [checkDownload, setCheckDownload] = useState<boolean>()
    const downloadApk = async (nameGame: string) => {
        const apkUrl = BASE_URL_APK_FILE.concat("getFile/").concat(nameGame); // Thay thế bằng URL của tệp APK bạn muốn tải về
        setitemGameManager({
            ...itemGameManager,
            isInstall: true
        })
       
        if (itemGameManager.isInstall) {
            try {
                await console.log(itemGameManager)
                const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

                if (status === 'granted') {
                    const downloadResumable = FileSystem.createDownloadResumable(
                        apkUrl,
                        FileSystem.documentDirectory + nameGame
                    );

                    const { uri } = await downloadResumable.downloadAsync();
                    await MediaLibrary.createAssetAsync(uri);

                    console.log('APK downloaded successfully:', uri);

                    await UpdateGameManager(itemGameManager)
                    alert("Download thành công")

                } else {
                    return
                }
            } catch (error) {
                console.error('Error downloading APK:', error.response.data);
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
    }, [gameId, gameManager, installGame])
    const [imageUri, setImageUri] = useState<string>();
    const fetchImage = async (imageName: string) => {

        const url = BASE_URL_Image.concat("getImage/").concat(itemGameManager.username).concat("/").concat(imageName.replace(".png", ""));

        try {
            const response = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + imageName.replace(".png", ""));
            setImageUri(response.uri);

        } catch (error) {
            console.error('Error fetching image:', error.response.data);

        }

    };
    return (
        <View style={styles.container}>
            <View style={styles.head}>
                {/* <View style={styles.search}>
                    <Image style={{ width: 20, height: 20, marginTop: 7 }} source={require("../../assets/Icon/search.png")} />
                    <TextInput placeholder='Tìm kiếm trò chơi' />
                    <TouchableOpacity style={{
                        paddingTop: 5
                    }} onPress={() => {  }}>
                    <Image style={{ width: 20, height: 10, marginTop: 7, }} source={require("../../assets/Icon/paper-1349664_1280.png")} />
                    </TouchableOpacity>
                </View>

                <View style={styles.user}>
                    <TouchableOpacity style={{ paddingRight: 10, paddingTop: 7 }}>
                        <Image style={{ width: 20, height:20, }} source={require("../../assets/Icon/bell-jar-1096279_1280.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.bottomSheet.showPanel()} style={{ paddingRight: 10, paddingTop: 5 }}>
                        {imageUri !="undefined"?(
                            <Image style={{ width: 30, height: 30, }} source={{uri : imageUri}} />
                        ):(
                            <Image style={{ width: 30, height: 30, }} source={require("../../assets/favicon.png")} />
                        ) }
                        
                    </TouchableOpacity>
                </View> */}
            </View>
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
                    }} source={require("../../assets/Icon/1.png")} />
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
                            justifyContent:'center',
                            alignItems:'center'

                        }}>
                            {/* <TouchableOpacity style={{
                                height: "45%",
                                width: "100%",
                                backgroundColor: "#6C9EFF",
                                justifyContent: 'center',
                                borderRadius: 5
                            }}>
                                <Text style={{ textAlign: 'center' }}>Cập nhật</Text>
                            </TouchableOpacity> */}

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
                                    navigation.navigate("LoginScreen")
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
        paddingTop: 10
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