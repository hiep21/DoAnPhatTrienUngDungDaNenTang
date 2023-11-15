import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';
import { InfoGame } from '../../services/interfaces/GameService';
import { BASE_URL_Image_Icon, getByName, getImageIconGame } from '../../services/Game';
import { getGameManager } from '../../services/todo';
import { GameManager, ImageUri } from '../../services/interfaces/User.interface';
import * as FileSystem from 'expo-file-system';

const ManagerGameUser = ({ navigation }) => {
    const users = navigation.getParam("user")

    const [listGame, setListGame] = useState<InfoGame[]>([])
    const [listGameIsInstall, setListGameIsInstall] = useState<GameManager[]>([])
    const [listGameHaveBuy, setListGameHaveBuy] = useState<GameManager[]>([])
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [isBuy, setIsBuy] = useState<boolean>()
    const [isInstall, setIsInstall] = useState<boolean>()


    let ListGame: InfoGame[] = []
    const loadTasks = async () => {
        setRefreshing(true)
        try {
            const { data } = await getByName()
            // console.log(data)
            const response = await getGameManager(users)

            if (!check) {
                const listGameInstall = []
                const listGameInfo = []
                for (let index = 0; index < response.data.length; index++) {

                    if (response.data[index].isInstall) {
                        listGameInstall.push(response.data[index])
                        for (let index2 = 0; index2 < data.length; index2++) {
                            if (response.data[index].nameGame == data[index2].tenTroChoi) {
                                listGameInfo.push(data[index2])
                            }
                        }
                    }
                }
                await setListGame(listGameInfo)
                await setListGameIsInstall(listGameInstall)

            }
            else {
                const listGameBuy = []
                const listGameInfo = []
                for (let index = 0; index < response.data.length; index++) {
                    if (response.data[index].isBuy) {
                        listGameBuy.push(response.data[index])
                        for (let index2 = 0; index2 < data.length; index2++) {
                            if (response.data[index].nameGame == data[index2].tenTroChoi) {
                                listGameInfo.push(data[index2])
                            }
                        }
                    }
                }
                await setListGame(listGameInfo)
                await setListGameHaveBuy(listGameBuy)
            }

            ListGame = data
            for (let i = 0; i < ListGame.length; i++) {
                const response = await getImageIconGame(ListGame[i].tenTroChoi)
                const ImageName = response.data[0].imageName
                // console.log(ImageName)
                await fetchImageGame(ListGame[i].tenTroChoi, ImageName)

            }

            setListImageUri(checklist)
        } catch (err) {
            const errorMessage = err.response
            alert("Lỗi: " + errorMessage.data)
        }
        setRefreshing(false)
    }
    const [listImageUri, setListImageUri] = useState<ImageUri[]>([])

    let checklist: ImageUri[] = [];
    const fetchImageGame = async (username: string, imageName: string) => {

        let check: ImageUri = {
            username: "",
            imageUri: ""
        };


        const url = BASE_URL_Image_Icon.concat("getImage/").concat(username).concat("/").concat(imageName);

        try {
            const response = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + imageName);
            check.username = username
            check.imageUri = response.uri
            checklist.push(check)

        } catch (error) {
            console.error('Error fetching image:', error.response.data);
        }
    };
    const [check, setCheck] = useState<number>(0)
    const ChoseBtn = () => {
        switch (check) {
            case 0:
                return (
                    <View style={styles.frameChoseBtn}>
                        <TouchableOpacity style={{
                            width: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 30,
                            backgroundColor: "#7FFF00",
                            borderRadius: 10
                        }} >
                            <Text>Đã cài đặt</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            width: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 30,
                            backgroundColor: "gray",
                            borderRadius: 10
                        }} onPress={() => { setCheck(1) }}>
                            <Text style={{ color: "white" }}>Đã Mua</Text>
                        </TouchableOpacity>
                    </View>
                )
                break;
            case 1:
                return (
                    <View style={styles.frameChoseBtn}>
                        <TouchableOpacity style={{
                            width: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 30,
                            backgroundColor: "gray",
                            borderRadius: 10
                        }} onPress={() => { setCheck(0) }}>
                            <Text style={{ color: "white" }} >Đã cài đặt</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            width: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 30,
                            backgroundColor: "#7FFF00",
                            borderRadius: 10
                        }} >
                            <Text >Đã Mua</Text>
                        </TouchableOpacity>
                    </View>
                )
                break;

        }
    }
    const renderListGameInstall = ({ item }: { item: InfoGame }) => {
        return (
            <TouchableOpacity onPress={() => { }}>

                <View style={{
                    flexDirection: 'row',
                    marginLeft: "5%",
                    marginTop: 20,
                }}>
                    <Image style={{ width: 50, height: 50, borderRadius: 5 }} source={{ uri: listImageUri.find(f => f.username == item.tenTroChoi)?.imageUri }} />
                    <View style={{
                        marginLeft: 15,
                        width: "70%"
                    }}>
                        <Text style={{ fontWeight: '600', fontSize: 12 }}>{item.tenTroChoi.replace(".apk", "")}</Text>
                        <Text style={{ fontSize: 10, marginTop: 3 }}>Thể Loại: {item.theLoai}</Text>
                        <View style={{
                            flexDirection: 'row',
                            width: "100%",
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{ fontSize: 10 }}>Giá: {item.gia}</Text>
                            {/* <Text style={{ fontSize: 10, textAlign: 'right' }}>Trạng thái:{item.trangThai}</Text> */}
                        </View>

                    </View>

                </View>


            </TouchableOpacity >

        )
    }
    useEffect(() => {
        loadTasks()
    }, [users])
    return (
        <View style={styles.container}>

            <View style={{
                flexDirection: 'row',

                width: 250,
                height: 30,
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                {ChoseBtn()}
            </View>
            {!check ? (
                <View style={{
                    width: 300,
                    height: 450,
                    marginTop: 20,
                    marginHorizontal: 5
                }}>
                    {listGameIsInstall ? (
                        <FlatList
                            data={listGame}
                            renderItem={(list) => renderListGameInstall(list)}
                            onRefresh={loadTasks}
                            refreshing={refreshing}
                            style={{
                                marginTop: "5%",
                                borderWidth: 1,
                                width: "95%",
                                alignSelf: 'center',
                                borderRadius: 5,
                                borderColor: "#bbb",
                                height: "100%"
                            }}
                        />
                    ) : (
                        <View>
                            <Text>
                                Bạn chưa cài đặt game nào cả
                            </Text>
                        </View>
                    )}
                </View>
            ) : (
                <View style={{
                    width: 300,
                    height: 450,
                    marginTop: 20,
                    marginHorizontal: 5
                }}>
                    {listGameHaveBuy ? (
                        <FlatList
                            data={listGame}
                            renderItem={(list) => renderListGameInstall(list)}
                            onRefresh={loadTasks}
                            refreshing={refreshing}
                            style={{
                                marginTop: "5%",
                                borderWidth: 1,
                                width: "95%",
                                alignSelf: 'center',
                                borderRadius: 5,
                                borderColor: "#bbb",
                                height: "100%"
                            }}
                        />
                    ) : (
                        <View>
                            <Text>
                                Bạn chưa mua game nào cả
                            </Text>
                        </View>
                    )}
                </View>
            )}
        </View>


    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        justifyContent: 'flex-start',
        width: "100%",
        backgroundColor: "#fff"

    },
    frameChoseBtn: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between"
    },

})

export default ManagerGameUser;