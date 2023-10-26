import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Button, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';

import { deleteApi, deleteFolder, getById, getByName } from '../../services/Game';
import { InfoGame } from '../../services/interfaces/GameService';
import { getByUser } from '../../services/todo';
import { RegisterData } from '../../services/interfaces/User.interface';
const InfoGameNCC = ({ navigation }) => {

    const gameId = navigation.getParam("gameId")
    const tenTroChoi = navigation.getParam("tenTroChoi")
    const imageUri = navigation.getParam("imageUri")
    const user = navigation.getParam("user")
    const [game, setGame] = useState<InfoGame>()
    const [users, setUsers] = useState<RegisterData>()
    const [deleteName, setDeleteName] = useState<string>(tenTroChoi)
    let getUser: RegisterData;
    const getGameById = async () => {
        try {
            const { data } = await getById(gameId)
            // console.log(data)
            setGame(data[0])
            const response = await getByUser(user)
            getUser = response.data[0]
            setUsers(response.data[0])

        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage)
        }
    }


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
                        try {
                            await deleteFolder(deleteName);
                            navigation.navigate("ManagerGameNCC", { user });
                            alert('Xóa game thành công');
                        } catch (error) {
                            console.log(error.response)
                        }
                    },
                },
            ]
        );
    }

    useEffect(() => {
        getGameById()
    }, [gameId, tenTroChoi, imageUri, user])
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
                        marginTop: 10
                    }} source={{ uri: imageUri }} />
                    <View style={{

                        justifyContent: 'center',

                        width: "50%"
                    }}>
                        <Text style={{ fontSize: 15 }}>{game?.tenTroChoi}</Text>
                        <Text style={{ fontSize: 10 }}>{game?.moTaTroChoi}</Text>
                        <Text style={{ fontSize: 10 }}>Trạng thái: {game?.trangThai}</Text>
                    </View>
                    <View style={{

                        width: "30%",

                    }}>

                        <TouchableOpacity style={{
                            height: "45%",
                            width: "100%",
                            backgroundColor: "#6C9EFF",
                            justifyContent: 'center',
                            borderRadius: 5
                        }} onPress={() => { navigation.navigate("ChoseUpdateGameScreen", { gameId, imageUri }) }}>
                            <Text style={{ textAlign: 'center' }}>Cập nhật</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            height: "45%",
                            width: "100%",
                            backgroundColor: "#FF6C6C",
                            marginTop: "5%",
                            justifyContent: 'center',
                            borderRadius: 5
                        }} onPress={() => { deleteGame() }}>
                            <Text style={{ textAlign: 'center' }}>Gỡ Khỏi kệ</Text>
                        </TouchableOpacity>
                    </View>
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
                        <Text>{game?.gia}$</Text>
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
                        <View style={{
                            flexDirection: "row"
                        }}>
                            <Text numberOfLines={1} style={{ paddingLeft: 30 }}>{game?.kichCoFile}</Text>
                            <Text style={{ paddingRight: 20 }}>Mb</Text>
                        </View>

                    </View>
                </View>

            </View>
            <View style={styles.end}>
                <Text>
                    {game?.gioiThieuTroChoi}
                </Text>
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
        height: "40%",
        marginTop: 20,

    },
    describeGame: {

        height: 70,
        width: "85%",
        alignSelf: 'center',
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
        width: "100%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }


})

export default InfoGameNCC;