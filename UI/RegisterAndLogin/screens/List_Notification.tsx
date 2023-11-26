import React, { useEffect, useState } from 'react';

import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { BASE_URL_Image_Icon, GetNotification, getImageIconGame, getInfoFileAdmin, getInfoFileNCC } from '../services/Game';
import { NotificationInterface } from '../services/interfaces/GameService';
import { ImageUri, RegisterData } from '../services/interfaces/User.interface';
import * as FileSystem from 'expo-file-system';
import { getByUser } from '../services/todo';

const List_Notification = ({ navigation }: any) => {
    const username = navigation.getParam("username")
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [nameGame, setNameGame] = useState<string[]>([])
    const [listNotification, setListNotification] = useState<NotificationInterface[]>([])
    let ListGame: string[] = []
    let lsNotification: NotificationInterface[] = []
    const loadTasks = async () => {
        setRefreshing(true)
        try {
            const getAccount = await getByUser(username)
            switch (getAccount.data[0].note) {
                case "Admin":
                    const responseAdmin = await getInfoFileAdmin()
                    // console.log(responseAdmin.data[0]);
                    //lấy thông báo theo quyền
                    const responseNotificationAdmin = await GetNotification(getAccount.data[0].note)
                    lsNotification = responseNotificationAdmin.data
                    setListNotification(lsNotification)
                    // console.log(responseNotificationAdmin.data)
                    //lấy tên game theo thông báo
                    for (let index = 0; index < responseAdmin.data.length; index++) {
                        if (lsNotification.find(f => f.nameGame == responseAdmin.data[index].tenTroChoi)) {
                            ListGame.push(responseAdmin.data[index].tenTroChoi)
                        }
                    }
                    setNameGame(ListGame)
                    //lấy icon game theo tên game
                    for (let i = 0; i < lsNotification.length; i++) {

                        const response = await getImageIconGame(ListGame[i])
                        const ImageName = response.data[0].imageName
                        await fetchImage(ListGame[i], ImageName)
                    }
                    // console.log(checklist)
                    setListImageUri(checklist)
                    break;
                case "NCC":
                    const responseNCC = await getInfoFileNCC(username)
                    // console.log(responseNCC.data[0].note);
                    //lấy thông báo theo quyền
                    const responseNotificationNcc = await GetNotification(getAccount.data[0].note)
                    lsNotification = responseNotificationNcc.data
                    setListNotification(lsNotification)
                    // console.log(responseNotificationNcc.data)
                    //lấy tên game theo thông báo
                    for (let index = 0; index < responseNCC.data.length; index++) {
                        if (lsNotification.find(f => f.nameGame == responseNCC.data[index].tenTroChoi)) {
                            ListGame.push(responseNCC.data[index].tenTroChoi)
                        }
                    }
                    setNameGame(ListGame)
                    //lấy icon game theo tên game
                    for (let i = 0; i < lsNotification.length; i++) {

                        const response = await getImageIconGame(ListGame[i])
                        const ImageName = response.data[0].imageName
                        await fetchImage(ListGame[i], ImageName)
                    }
                    // console.log(checklist)
                    setListImageUri(checklist)
                    break;
                default:
                    break;

            }

        } catch (err: any) {
            const errorMessage = err.response
            setErr(errorMessage.data)
        }
        setRefreshing(false)
    }
    const [err, setErr] = useState<string[]>([])
    const [listImageUri, setListImageUri] = useState<ImageUri[]>([])
    let checklist: ImageUri[] = [];
    const fetchImage = async (namePath: string, imageName: string) => {

        let check: ImageUri = {
            namePath: "",
            imageUri: ""
        };


        const url = BASE_URL_Image_Icon.concat("getImage/").concat(namePath).concat("/").concat(imageName);

        try {
            const response = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + imageName);
            check.namePath = namePath
            check.imageUri = response.uri
            checklist.push(check)

        } catch (error: any) {
            console.error('Error fetching image:', error.response.data);
        }
    };

    useEffect(() => {

        loadTasks()
    }, [username])
    const goToDetail = (notification: NotificationInterface, imageUri: any) => {
        navigation.navigate("NotificationScreen", { username, notification, imageUri })
    }
    const renderTask = ({ item }: { item: NotificationInterface }) => {
        return (
            <TouchableOpacity onPress={() => { goToDetail(item, listImageUri.find(f => f.namePath == item.nameGame)?.imageUri) }} style={{
                flexDirection: "row",
                padding: 20,
                justifyContent: "flex-start"
            }}>
                <Image style={{ marginLeft: 10, width: 50, height: 50, borderRadius: 5 }} source={{ uri: listImageUri.find(f => f.namePath == item.nameGame)?.imageUri }} />
                <View style={{ marginLeft: 20, marginTop: 10 }}>
                    <Text>Thông báo từ: {item.nameGame}</Text>
                </View>
            </TouchableOpacity >

        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Text style={{
                    textAlign: 'left',
                    paddingLeft: 30,
                    borderBottomWidth: 1.5,
                    fontSize: 17,
                    fontWeight: '600',

                }}>Danh sách thông báo</Text>
                {err && <Text style={{
                    color: "red",
                    fontSize: 20,
                    alignSelf: 'center'
                }}>{err}</Text>}

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


            </View>
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
    username: {
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