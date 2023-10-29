import React, { useEffect, useState } from 'react';

import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { BASE_URL_Image_Icon, getByName, getImageIconGame, getInfoFileAdmin, getInfoFileNCC } from '../services/Game';
import { InfoGame } from '../services/interfaces/GameService';
import { BASE_URL_Image, getByUser, getImageIcon } from '../services/todo';
import { ImageUri, RegisterData } from '../services/interfaces/User.interface';
import BottomSheet from './Users/BottomSheet';
import * as FileSystem from 'expo-file-system';

const List_Notification = ({ navigation }) => {
    const user = navigation.getParam("user")

    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [listNotification, setListNotification] = useState<InfoGame[]>([])
    const [reListGame, setReListGame] = useState<InfoGame[]>([])
    const [listNotificationAdmin, setListNotificationAdmin] = useState<InfoGame[]>([])
    const [listNotificationNCC, setListNotificationNCC] = useState<InfoGame[]>([])
    const [userNCC, setUserNCC] = useState<RegisterData>()
    let ListGame: InfoGame[] = []
    const loadTasks = async () => {
        setRefreshing(true)

        try {
            const { data } = await getInfoFileNCC(user)
            // console.log(data)
            setReListGame(data)
            setListNotification(data)
            const responseAdmin = await getInfoFileAdmin()
            setListNotificationAdmin(responseAdmin.data)
            const response = await getByUser(user)
            setUserNCC(response.data[0])

            if (response.data[0].note == "Admin") {
                ListGame = responseAdmin.data;
                for (let i = 0; i < ListGame.length; i++) {
                    const response = await getImageIconGame(ListGame[i].tenTroChoi)
                    const ImageName = response.data[0].imageName
                    await fetchImage(ListGame[i].tenTroChoi, ImageName)
                }
            }
            else {
                ListGame = data
                for (let i = 0; i < ListGame.length; i++) {
                    const response = await getImageIconGame(ListGame[i].tenTroChoi)
                    const ImageName = response.data[0].imageName
                    // console.log(ImageName)
                    await fetchImage(ListGame[i].tenTroChoi, ImageName)
                }

            }

            setListImageUri(checklist)

            const response2 = await getImageIcon(user)
            const name = response2.data[0].imageName
            fetchImageUser(name)

        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage)
        }
        setRefreshing(false)
    }
    const [listImageUri, setListImageUri] = useState<ImageUri[]>([])
    const [imageAdminUri, setImageAdminUri] = useState<string>();
    let checklist: ImageUri[] = [];
    const fetchImage = async (username: string, imageName: string) => {

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
    const [imageUri, setImageUri] = useState<string>();
    const fetchImageUser = async (imageName: string) => {

        const url = BASE_URL_Image.concat("getImage/").concat(user).concat("/").concat(imageName.replace(".png", ""));

        try {
            const response = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + imageName.replace(".png", ""));
            setImageUri(response.uri);

        } catch (error) {
            console.error('Error fetching image:', error.response.data);

        }


    };
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const handleSearch = () => {
        // const filteredTasks = listNotification.filter((item) =>

        // );

        // if (filteredTasks != "" && filteredTasks != null) {

        //     setListNotification(filteredTasks);

        // }
        // else {
        //     console.log(reListGame);
        //     setListNotification(reListGame);
        // }
    }
    useEffect(() => {

        loadTasks()
    }, [user])



    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <View style={styles.search}>
                    <Image style={{ width: 20, height: 20, marginTop: 7 }} source={require("../assets/Icon/search.png")} />
                    <TextInput placeholder='Tìm kiếm trò chơi' value={searchKeyword}
                        onChangeText={(text) => setSearchKeyword(text)} />
                    <TouchableOpacity onPress={() => { handleSearch() }} style={{ marginTop: 7 }}>
                        <Image style={{ width: 20, height: 10, marginTop: 7, }} source={require("../assets/Icon/paper-1349664_1280.png")} />
                    </TouchableOpacity>
                </View>

                <View style={styles.user}>
                    <TouchableOpacity style={{ paddingRight: 10, paddingTop: 7 }}>
                        <Image style={{ width: 20, height: 20, }} source={require("../assets/Icon/bell-jar-1096279_1280.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.bottomSheet.showPanel()} style={{ paddingRight: 10, paddingTop: 5 }}>
                        <Image style={{ width: 30, height: 30, }} source={{ uri: imageUri }} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.body}>
                <Text style={{
                    textAlign: 'left',
                    paddingLeft: 30,
                    borderBottomWidth: 1.5,
                    fontSize: 17,
                    fontWeight: '600',

                }}>Danh sách thông báo</Text>
                {userNCC?.note === "Admin" ? (
                <FlatList
                    data={listNotificationAdmin}
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
                ) : userNCC?.note === "Khách hàng" ? (
                    <FlatList
                        data={listNotificationNCC}
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
                ) : (
                    <FlatList
                        data={listNotification}
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
                )}
            </View>

            <BottomSheet ref={ref => (this.bottomSheet = ref)} navigation={navigation} />
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
        height: "88%",
        marginTop: 20,

    },
    end: {
        width: "100%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default List_Notification;