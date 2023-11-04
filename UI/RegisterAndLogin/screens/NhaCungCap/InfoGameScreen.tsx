import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Button, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';

import { CreateNotification, UpdateGame, deleteApi, deleteFolder, getById, getByName } from '../../services/Game';
import { InfoGame, NotificationInterface } from '../../services/interfaces/GameService';
import { getByUser } from '../../services/todo';
import { RegisterData } from '../../services/interfaces/User.interface';
const InfoGameNCC = ({ navigation }) => {

    const gameId = navigation.getParam("gameId")
    const tenTroChoi = navigation.getParam("tenTroChoi")
    const imageUri = navigation.getParam("imageUri")
    const user = navigation.getParam("user")
    const [game, setGame] = useState<InfoGame>()
    const [acceptGame, setAcceptGame] = useState<InfoGame>({
        tenTroChoi: "",
        moTaTroChoi: "",
        doTuoi: "",
        theLoai: "",
        gia: "",
        nhaCungCap: "",
        gioiThieuTroChoi: "",
        kichCoFile: "",
        trangThai: ""
    })
    const [users, setUsers] = useState<RegisterData>()


    const getGameById = async () => {
        try {
            const { data } = await getById(gameId)
            // console.log(data)
            setGame(data[0])
            const response = await getByUser(user)

            setUsers(response.data[0])
            // console.log(data[0])

            setAcceptGame(data[0])

        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage)
        }
    }

    let createNotification: NotificationInterface = {
        nameGame: "",
        forAccount: "",
        result: false,
        reason: ""
    };
    const NotificationDeleteGame = async () => {
        Alert.alert(
            "Xác nhận",
            "Bạn có chắc chắn muốn gỡ không",
            [
                {
                    text: "Hủy",
                    style: "cancel",
                },
                {
                    text: "Đồng ý",
                    onPress: async () => {
                        createNotification.nameGame = tenTroChoi
                        createNotification.forAccount = "Admin"
                        createNotification.result = false;
                        createNotification.reason = "Gỡ trò chơi"

                        try {
                            await CreateNotification(createNotification);
                            navigation.navigate("ManagerGameNCC", { user });
                            alert('Gửi yêu cầu xóa game thành công');
                        } catch (error) {
                            console.log(error.response)
                        }
                    },
                },
            ]
        );
    }
    let getAcceptGame: InfoGame
    const AcceptGameNCC = async () => {
        getAcceptGame = acceptGame
        getAcceptGame.trangThai = "Trên kệ"
        try {
            // console.log(getAcceptGame)
            const { data } = await UpdateGame(getAcceptGame);
            alert("Cập nhật thành công")
        } catch (error) {
            console.log(error.response.data)
        }
    }


    const denyGame = async (Reason: string) => {
        let notification : NotificationInterface = {
            nameGame: game?.tenTroChoi,
            forAccount: 'NCC',
            result: false,
            reason: Reason,
        }
        try {
            await CreateNotification(notification)
            alert("Gửi thông báo thành công")
            navigation.navigate("ManagerGameNCC", { user })
        } catch (error) {
            alert(error.response.data)
        }
    };
    const [isDeny, setIsDeny] = useState<boolean>(false)
    useEffect(() => {
        getGameById()
    }, [gameId, tenTroChoi, imageUri, user])
    const [reason, setReason] = useState<string>("Trò chơi không đạt yêu cầu")
    return (
        <View style={styles.container}>
            {isDeny == true &&
                <View style={{
                    width: "90%",
                    height: "30%",
                    marginLeft: "5%",
                    borderRadius: 10,
                    borderWidth: 1,
                    alignItems: "center"
                }}>
                    <Text>Ghi rõ lý do</Text>
                    <TextInput numberOfLines={3}
                        multiline
                        value={reason}
                        onChangeText={(value) => {
                            setReason(value)
                        }}
                        style={{
                            width: "90%",
                            paddingHorizontal: 15,
                            paddingVertical: 10,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: "#bbb",

                        }} />
                    <TouchableOpacity style={{
                        height: "20%",
                        width: "30%",
                        backgroundColor: "yellow",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 5,
                        marginTop: 10
                    }} onPress={() => { denyGame(reason) }}>
                        <Text>Gửi thông báo</Text>
                    </TouchableOpacity>
                </View>
            }
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
                        <Text style={{ fontSize: 10 }}>Trạng thái:
                            {game?.trangThai == "Chờ xét duyệt" ? (
                                <Text style={{ color: "red" }}>{game?.trangThai}</Text>
                            ) : (
                                <Text>{game?.trangThai}</Text>
                            )}
                        </Text>
                    </View>

                    {users?.note != "Admin" ? (
                        <View>
                            {game?.trangThai != "Chờ xét duyệt" ? (
                                <View style={{

                                    width: "120%",

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
                                    }} onPress={() => { NotificationDeleteGame() }}>
                                        <Text style={{ textAlign: 'center' }}>Gỡ Khỏi kệ</Text>
                                    </TouchableOpacity>
                                </View>

                            ) : (<View>

                            </View>)}
                        </View>
                    ) : (
                        <View style={{

                            width: "30%",

                        }}>

                            {game?.trangThai == "Chờ xét duyệt" ? (
                                <View>
                                    <TouchableOpacity style={{
                                        height: "45%",
                                        width: "100%",
                                        backgroundColor: "#6C9EFF",
                                        justifyContent: 'center',
                                        borderRadius: 5
                                    }} onPress={() => { AcceptGameNCC(); }}>
                                        <Text style={{ textAlign: 'center' }}>Chấp nhận</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{
                                        height: "45%",
                                        width: "100%",
                                        backgroundColor: "#FF6C6C",
                                        marginTop: "5%",
                                        justifyContent: 'center',
                                        borderRadius: 5
                                    }} onPress={() => {
                                        setIsDeny(true)
                                    }}>
                                        <Text style={{ textAlign: 'center' }}>Từ chối</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View style={{
                                    height: "100%",
                                    marginTop: 10
                                }}>
                                    <TouchableOpacity style={{
                                        height: "50%",
                                        width: "100%",
                                        backgroundColor: "#FF6C6C",
                                        marginTop: "5%",
                                        justifyContent: 'center',
                                        borderRadius: 5,
                                        alignSelf: 'center'
                                    }} onPress={() => { }}>
                                        <Text style={{ textAlign: 'center' }}>Gỡ trò chơi</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
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
                    <View style={[styles.itemInfo, { width: "30%" }]}>
                        <Text>Giá cho thuê</Text>
                        <Text>{game?.gia}$</Text>
                    </View>
                    <View style={styles.itemInfo}>
                        <Text>Tuổi</Text>
                        <Text style={{ width: "100%", height: "50%", textAlign: 'center', borderRightWidth: 1, borderLeftWidth: 1, borderColor: "#bbb" }}>{game?.doTuoi}</Text>
                    </View>
                    <View style={styles.itemInfo}>
                        <Text>Thể loại</Text>
                        <Text style={{ width: "100%", height: "50%", textAlign: 'center', borderRightWidth: 1, borderColor: "#bbb" }}>{game?.theLoai}</Text>
                    </View>
                    <View style={styles.itemInfo}>
                        <Text>Kích cỡ</Text>
                        <View style={{
                            flexDirection: "row"
                        }}>
                            <Text numberOfLines={1} style={{ paddingLeft: "30%" }}>{game?.kichCoFile}</Text>
                            <Text style={{ paddingRight: "25%" }}>Mb</Text>
                        </View>

                    </View>
                </View>

            </View>
            <View style={styles.end}>
                <Text style={{
                    paddingLeft: "5%"
                }}>
                    {game?.gioiThieuTroChoi}
                </Text>
            </View>
        </View >


    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"

    },
    body: {
        backgroundColor: "white",
        width: "100%",
        height: "40%",
        marginTop: "1%",

    },
    describeGame: {

        height: "30%",
        width: "85%",
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: "2%"
    },
    itemInfo: {

        width: "22%",
        height: "40%",
        alignItems: 'center'

    },
    end: {
        width: "90%",
        height: "10%",
        justifyContent: 'center',
        alignItems: 'center'
    }


})

export default InfoGameNCC;