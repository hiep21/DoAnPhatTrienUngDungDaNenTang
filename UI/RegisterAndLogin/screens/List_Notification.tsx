import React, { useEffect, useState } from 'react';

import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { GetNotification, getInfoFileNCC } from '../services/Game';
import { InfoGame, Notification, NotificationInterface } from '../services/interfaces/GameService';
import { ImageUri, RegisterData } from '../services/interfaces/User.interface';
import BottomSheet from './Users/BottomSheet';
import * as FileSystem from 'expo-file-system';

const List_Notification = ({ navigation }) => {
    const user = navigation.getParam("user")
    const listImageUri = navigation.getParam("listImageUri")
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [userNCC, setUserNCC] = useState<RegisterData>()
    const [nameGame, setNameGame] = useState<string[]>([])
    let ListGame: string[] = []
    let listNotification: NotificationInterface
    const loadTasks = async () => {
        setRefreshing(true)
        try {
            const response = await getInfoFileNCC(user)

            for (let index = 0; index < response.data.length; index++) {
                const response2 = await GetNotification(response.data[index].tenTroChoi)
                listNotification = response2.data[0]
                if (listNotification != undefined) {
                    ListGame.push(response.data[index].tenTroChoi)
                }
            }

            setNameGame(ListGame)


        } catch (err) {
            const errorMessage = err.response
            console.log("Lỗi: " + errorMessage)
        }
        setRefreshing(false)
    }


    useEffect(() => {

        loadTasks()
    }, [user, listImageUri])
    const goToDetail = (item: InfoGame, imageUri: string) => {
        navigation.navigate("NotificationScreen", {})
    }
    const renderTask = ({ item }: { item: string }) => {
        return (
            <TouchableOpacity onPress={() => { goToDetail(item, listImageUri.find(f => f.username == item)?.imageUri) }} >
                {item.nhaCungCap == userNCC?.user ? (
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: "5%",
                        marginTop: 20
                    }}>
                        {listImageUri.length != 0 ? (
                            // <Text>{listImageUri.find(f => f.username == item.tenTroChoi)?.imageUri}</Text>
                            <Image style={{ width: 50, height: 50, borderRadius: 5 }} source={{ uri: listImageUri.find(f => f.username == item)?.imageUri }} />
                        ) : (
                            <Image style={{ width: 50, height: 50, borderRadius: 5 }} source={require("../assets/favicon.png")} />
                        )}
                        <View style={{
                            marginLeft: 15,
                            width: "70%"
                        }}>
                            <Text style={{ fontWeight: '600', fontSize: 12 }}>{item.replace(".apk", "")}</Text>
                            <Text style={{
                                fontSize: 12,
                                paddingTop: 10
                            }}>Trạng thái
                                { }
                            </Text>
                        </View>
                    </View>
                ) : (
                    <View></View>
                )}

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

                <FlatList
                    data={nameGame}
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