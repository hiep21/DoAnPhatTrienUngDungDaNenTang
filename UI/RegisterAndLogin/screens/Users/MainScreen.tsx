import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';
import Carousel from './Carousel';
import { InfoGame } from '../../services/interfaces/GameService';
import { BASE_URL_Image_Icon, getByName, getImageIconGame } from '../../services/Game';
import BottomSheet from "./BottomSheet";
import { BASE_URL_Image, getByUser, getGameManager, getImageIcon } from '../../services/todo';
import { getItemAsync } from 'expo-secure-store';
import * as FileSystem from 'expo-file-system';
import { GameManager, ImageUri } from '../../services/interfaces/User.interface';


const MainScreen = ({ navigation }) => {
    const user = navigation.getParam("user")
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [listGame, setListGame] = useState<InfoGame[]>([])
    const [reListGame, setReListGame] = useState<InfoGame[]>([])
    const [image, setImage] = useState<string>()
    const [imageUri, setImageUri] = useState<string>()
    let ListGame: InfoGame[] = []
    const loadTasks = async () => {
        setRefreshing(true)

        try {
            const { data } = await getByName()
            // console.log(data)
            setListGame(data)
            setReListGame(data)
            const response = await getImageIcon(user)
            const name = response.data[0].imageName

            // for (let i = 0; i < listGame.length; i++) {
            //     const response = await getImageIcon(listGame[i].tenTroChoi)
            //     const ImageName = response.data[0].imageName
            //     await fetchImage(listGame[i].tenTroChoi, ImageName)

            // }
            console.log(response.data)
            fetchImage(name)
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
            alert(errorMessage)
        }
        setRefreshing(false)
    }
    const fetchImage = async (imageName: string) => {

        const url = BASE_URL_Image.concat("getImage/").concat(user).concat("/").concat(imageName.replace(".png", ""));
        try {
            const response = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + imageName.replace(".png", ""));
            setImageUri(response.uri);

        } catch (error) {
            console.error('Error fetching image:', error.response.data);

        }

    };
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
    const loadimage = async () => {
        const getUser = await getItemAsync('accessToken');
        const tokenObject = JSON.parse(getUser);
        const userName = tokenObject.user;
        try {
            setRefreshing(true)
            const getImage = await getByUser(userName);

            setImage(getImage.data[0].image)


        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage.data)
        }
        setRefreshing(false)
    }

    useEffect(() => {

        loadimage()
        loadTasks()
    }, [])


    const CheckBuyAndInstall = async (name: string, item: InfoGame, imageGameUri: string) => {
        try {

            const { data } = await getGameManager(user);
            // console.log(data)
            const GameCheck = []
            for (let index = 0; index < data.length; index++) {
                if (data[index].nameGame == name) {
                    GameCheck.push(data[index])
                }
            }
            if (GameCheck.length == 0) {
                navigation.navigate("InfoGame_dont_Install", { gameId: item.id, user ,imageGameUri})
            }
            else {
                navigation.navigate("InfoGameScreen", { gameId: item.id, gameManager: GameCheck[0], installGame: GameCheck[0].isInstall,imageGameUri })
            }


        } catch (error) {
            if (error.response.data == "Tài khoản " + user + " chưa mua với tải game") {

                navigation.navigate("InfoGame_dont_Install", { gameId: item.id, user })

            }
            else {
                console.log(error.response.data)
            }



        }
    }

    const renderTask = ({ item }: { item: InfoGame }) => {
        return (
            <TouchableOpacity onPress={() => { CheckBuyAndInstall(item.tenTroChoi, item, listImageUri.find(f => f.username == item.tenTroChoi)?.imageUri) }}>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: "5%",
                    marginVertical: 10,

                }}>
                    <Image style={{ width: 50, height: 50, borderRadius: 5 }} source={{ uri: listImageUri.find(f => f.username == item.tenTroChoi)?.imageUri }

                    } />
                    <View style={{
                        marginLeft: 15,
                        width: "70%"
                    }}>
                        <Text style={{ fontWeight: '600', fontSize: 12 }}>{item.tenTroChoi.replace(".apk", "")}</Text>
                        <Text style={{ fontSize: 10, marginTop: 10 }}>Thể Loại: {item.theLoai}</Text>
                        <View style={{
                            flexDirection: 'row',
                            width: "100%",
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{ fontSize: 10 }}>Giá: {item.gia}</Text>
                            <Text style={{ fontSize: 10, textAlign: 'right' }}>Trạng thái:{item.trangThai}</Text>
                        </View>

                    </View>

                </View>
            </TouchableOpacity >

        )
    }



    return (
        <View style={styles.container}>

            <View style={styles.head}>
                <View style={styles.search}>
                    <Image style={{ width: 20, height: 20, marginTop: 7 }} source={require("../../assets/Icon/search.png")} />
                    <TextInput placeholder='Tìm kiếm trò chơi' />
                    <TouchableOpacity style={{

                        paddingTop: 5
                    }} onPress={() => { }}>
                        <Image style={{ width: 20, height: 10, marginTop: 7, }} source={require("../../assets/Icon/paper-1349664_1280.png")} />
                    </TouchableOpacity>
                </View>
                <View style={styles.user}>
                    <TouchableOpacity style={{ paddingRight: 10, paddingTop: 7 }}>

                        <Image style={{ width: 20, height: 20, }} source={require("../../assets/Icon/bell-jar-1096279_1280.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.bottomSheet.showPanel()} style={{ paddingRight: 10, paddingTop: 5 }}>
                        {imageUri ? (
                            <Image style={{ width: 30, height: 30, }} source={{
                                uri: imageUri
                            }} />
                        ) : (
                            <Image style={{ width: 30, height: 30, }} source={require("../../assets/favicon.png")} />
                        )}

                    </TouchableOpacity>

                </View>
            </View>
            <View>
            </View>
            <Carousel />


            <View style={styles.body}>
                <Text style={{
                    textAlign: 'left',
                    paddingLeft: 30,
                    borderBottomWidth: 1.5,
                    fontSize: 17,
                    fontWeight: '600',

                }}>Được đề xuất cho bạn</Text>
                <FlatList
                    data={listGame}
                    renderItem={(list) => renderTask(list)}
                    onRefresh={loadTasks}
                    refreshing={refreshing}
                    style={{
                        marginTop: "5%",
                        borderWidth: 1,
                        width: "95%",
                        alignSelf: 'center',
                        borderRadius: 5,
                        borderColor: "#bbb",
                        height: 100
                    }}
                />

            </View>

            <BottomSheet ref={ref => (this.bottomSheet = ref)} navigation={navigation} />

        </View>


    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 10,
        justifyContent: 'flex-start',
        width: "100%",

        backgroundColor: "#fff"

    },
    search: {
        width: 200,
        height: 35,
        backgroundColor: "#bbb",
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderRadius: 20,

    },
    head: {

        width: "100%",
        height: 40,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    user: {
        flexDirection: 'row',
    },
    danhsachtrochoi: {
        fontSize: 15,
        fontWeight: "500",
        marginLeft: 20,
        paddingTop: 20

    },
    title: {
        justifyContent: 'flex-start',
        width: "100%",
        marginRight: 100
    },
    underlined: {
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        width: 420,
        fontSize: 15,
        fontWeight: "500",
        paddingLeft: 30,
        paddingTop: 10,


    },
    image: {
        //borderRadius: 15,
        //width:'95%',
        //marginTop:15,
        padding: 20
    },
    body: {
        backgroundColor: "white",
        width: 340,
        height: 265,
        marginTop: 20,
        marginHorizontal: 5,

    },

})

export default MainScreen;