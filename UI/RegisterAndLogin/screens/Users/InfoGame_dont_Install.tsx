import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Button, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { InfoGame } from '../../services/interfaces/GameService';
import { deleteApi, getById, getByName } from '../../services/Game';
import BottomSheet from "./BottomSheet";
import { BASE_URL_Image, getImageIcon } from '../../services/todo';
import * as FileSystem from 'expo-file-system';
const InfoGame_dont_Install = ({ navigation }) => {

    const gameId = navigation.getParam("gameId")
    const imageGameUri = navigation.getParam("imageGameUri")
    const user = navigation.getParam("user")
    const [game, setGame] = useState<InfoGame>()
    const getGameById = async () => {

        try {
            const { data } = await getById(gameId)
            // console.log(data)
            setGame(data[0])
            const response = await getImageIcon(user)
            const name = response.data[0].imageName

            fetchImage(name)
        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage)
        }
    }
    const [imageUri, setImageUri] = useState<string>();
    const fetchImage = async (imageName: string) => {

        const url = BASE_URL_Image.concat("getImage/").concat(user).concat("/").concat(imageName.replace(".png", ""));

        try {
            const response = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + imageName.replace(".png", ""));
            setImageUri(response.uri);

        } catch (error) {
            console.error('Error fetching image:', error.response.data);

        }

    };

    useEffect(() => {
        getGameById()
    }, [gameId, user, imageGameUri])
    return (
        <View style={styles.container}>
            <View style={styles.head}>
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
                    }} source={{ uri: imageGameUri }} />
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
                    <View style={{

                        width: "30%",
                        justifyContent: 'center',
                        alignItems: 'center'

                    }}>
                        <TouchableOpacity style={{
                            height: "45%",
                            width: "100%",
                            backgroundColor: "#6C9EFF",
                            justifyContent: 'center',
                            borderRadius: 5
                        }} onPress={() => { navigation.navigate('Buy_Game_to_Id', { gameId, user }) }}>
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

export default InfoGame_dont_Install;