import React, { useEffect, useState } from 'react';

import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { InfoGame } from '../services/interfaces/GameService';
import { getByName } from '../services/Game';

const ManagerGameScreen = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [listGame, setListGame] = useState<InfoGame[]>([])

    const loadTasks = async () => {
        setRefreshing(true)
        try {
            const { data } = await getByName()
            console.log(data)
            setListGame(data)

        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage)
        }
        setRefreshing(false)
    }
    const goToDetail = (item: InfoGame) => {
        navigation.navigate("InfoGameScreen", { item })
    }
    useEffect(() => {
        loadTasks()
    }, [])

    const renderTask = ({ item }: { item: InfoGame }) => {
        return (
            <TouchableOpacity onPress={() => { goToDetail(item) }}>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: "10%",
                    marginTop: 40,


                }}>
                    <Image style={{ width: 50, height: 50, borderRadius: 5 }} source={require("../assets/1.png")} />
                    <View style={{
                        marginLeft: 15,
                        width: "70%"
                    }}>
                        <Text style={{ fontWeight: '600', fontSize: 12 }}>{item.tenTroChoi}</Text>
                        <Text style={{ fontSize: 10, marginTop: 10 }}>Thể Loại: {item.theLoai}</Text>
                        <Text style={{ fontSize: 10 }}>Giá: {item.gia}</Text>
                        <Text style={{ fontSize: 10, textAlign: 'right' }}>Trạng thái:{item.trangThai}</Text>
                    </View>

                </View>
            </TouchableOpacity >

        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <View style={styles.search}>
                    <Image style={{ width: 20, height: 20, marginTop: 7 }} source={require("../assets/favicon.png")} />
                    <TextInput placeholder='Tìm kiếm trò chơi' />
                    <TouchableOpacity>
                        <Image style={{ width: 20, height: 20, marginTop: 7 }} source={require("../assets/favicon.png")} />
                    </TouchableOpacity>
                </View>

                <View style={styles.user}>
                    <TouchableOpacity style={{ paddingRight: 10, paddingTop: 5 }}>
                        <Image style={{ width: 30, height: 30, }} source={require("../assets/favicon.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingRight: 10, paddingTop: 5 }}>
                        <Image style={{ width: 30, height: 30, }} source={require("../assets/favicon.png")} />
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

                }}>Danh sách trò chơi</Text>
                <FlatList
                    data={listGame}
                    renderItem={(list) => renderTask(list)}
                    onRefresh={loadTasks}
                    refreshing={refreshing}
                />
            </View>
            <View style={styles.end}></View>
        </View>

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,


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
        height: "70%",
        marginTop: 20,

    },
});

export default ManagerGameScreen;