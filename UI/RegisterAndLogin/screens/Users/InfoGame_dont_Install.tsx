import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Button, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { InfoGame } from '../../services/interfaces/GameService';
import { deleteApi, getById, getByName } from '../../services/Game';
import BottomSheet from "./BottomSheet";

const InfoGame_dont_Install = ({ navigation }) => {

    const gameId = navigation.getParam("gameId")
    const tenTroChoi = navigation.getParam("tenTroChoi")
    const [game, setGame] = useState<InfoGame>()
    const getGameById = async () => {
        try {
            const { data } = await getById(gameId)
            // console.log(data)
            setGame(data[0])

        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage)
        }
    }


    useEffect(() => {
        getGameById()
    }, [gameId, tenTroChoi])
    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <View style={styles.search}>
                    <Image style={{ width: 20, height: 20, marginTop: 7 }} source={require("../../assets/Icon/search.png")} />
                    <TextInput placeholder='Tìm kiếm trò chơi' />
                    <TouchableOpacity>
                        <Image style={{ width: 20, height: 20, marginTop: 7 }} source={require("../../assets/Icon/search.png")} />
                    </TouchableOpacity>
                </View>

                <View style={styles.user}>
                    <TouchableOpacity style={{ paddingRight: 10, paddingTop: 5 }}>
                        <Image style={{ width: 30, height: 30, }} source={require("../../assets/favicon.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.bottomSheet.showPanel()} style={{ paddingRight: 10, paddingTop: 5 }}>
                        <Image style={{ width: 30, height: 30, }} source={require("../../assets/favicon.png")} />
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
                        marginLeft:10
                    }}>
                        <Text style={{ fontSize: 15 }}>{game?.tenTroChoi}</Text>
                        <Text style={{ fontSize: 10 }}>{game?.moTaTroChoi}</Text>
                        <Text style={{ fontSize: 10 }}>Trạng thái: {game?.trangThai}</Text>
                    </View>
                    <View style={{

                        width: "30%",
                        justifyContent:'center',
                        alignItems:'center'

                    }}>
                        <TouchableOpacity style={{
                            height: "45%",
                            width: "100%",
                            backgroundColor: "#6C9EFF",
                            justifyContent: 'center',
                            borderRadius: 5
                        }}>
                            <Text style={{ textAlign: 'center' }}>Mua game</Text>
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
        marginHorizontal:15,

    }


})

export default InfoGame_dont_Install;