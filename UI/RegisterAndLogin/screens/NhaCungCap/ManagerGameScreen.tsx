import React, { useEffect, useState } from 'react';

import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { BASE_URL_Image_Icon, getByName, getImageIconGame } from '../../services/Game';
import { InfoGame } from '../../services/interfaces/GameService';
import { getByUser, getImageIcon } from '../../services/todo';
import { ImageUri, RegisterData } from '../../services/interfaces/User.interface';
import BottomSheet from '../Users/BottomSheet';
import * as FileSystem from 'expo-file-system';

const ManagerGameScreen = ({ navigation }) => {
    const user = navigation.getParam("user")

    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [listGame, setListGame] = useState<InfoGame[]>([])
    const [reListGame, setReListGame] = useState<InfoGame[]>([])
    const [userNCC, setUserNCC] = useState<RegisterData>()
    const loadTasks = async () => {
        setRefreshing(true)

        try {
            const { data } = await getByName()
            // console.log(data)
            setReListGame(data)
            setListGame(data)
            const response = await getByUser(user)
            setUserNCC(response.data[0])

            for (let i = 0; i < listGame.length; i++) {
                const response = await getImageIconGame(listGame[i].tenTroChoi)
                const ImageName = response.data[0].imageName
                await fetchImage(listGame[i].tenTroChoi, ImageName)

            }
            setListImageUri(checklist)


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
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const handleSearch = () => {
        const filteredTasks = listGame.filter((item) =>
            item.tenTroChoi.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.gia.toLowerCase().includes(searchKeyword.toLowerCase())
        );

        if (filteredTasks != "" && filteredTasks != null) {

            setListGame(filteredTasks);

        }
        else {
            console.log(reListGame);
            setListGame(reListGame);
        }
    }
    useEffect(() => {

        loadTasks()
    }, [user])
    const goToDetail = (item: InfoGame, imageUri: string) => {
        navigation.navigate("InfoGameNCC", { gameId: item.id, tenTroChoi: item.tenTroChoi, imageUri })
    }

    const renderTask = ({ item }: { item: InfoGame }) => {
        return (
            <TouchableOpacity onPress={() => { goToDetail(item, listImageUri.find(f => f.username == item.tenTroChoi)?.imageUri) }} >

                {item.nhaCungCap == userNCC?.user ? (
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: "5%",
                        marginTop: 20
                    }}>
                        {listImageUri.length != 0 ? (
                            // <Text>{listImageUri.find(f => f.username == item.tenTroChoi)?.imageUri}</Text>
                            <Image style={{ width: 50, height: 50, borderRadius: 5 }} source={{ uri: listImageUri.find(f => f.username == item.tenTroChoi)?.imageUri }} />
                        ) : (
                            <Image style={{ width: 50, height: 50, borderRadius: 5 }} source={require("../../assets/favicon.png")} />
                        )}
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
                                {item.trangThai == "trên kệ" ? (
                                    <Text style={{ fontSize: 10, textAlign: 'right' }}>Trạng thái:{item.trangThai}</Text>
                                ) : (
                                    <Text style={{ fontSize: 10, textAlign: 'right' }}>Trạng thái:<Text style={{ color: 'red' }}>{item.trangThai}</Text></Text>
                                )}
                            </View>
                        </View>
                    </View>
                ) : (
                    <View></View>
                )}
                {userNCC?.note == "Admin" ? (
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: "5%",
                        marginTop: 20
                    }}>
                        <Image style={{ width: 50, height: 50, borderRadius: 5 }} source={require("../../assets/Icon/1.png")} />
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
                                {item.trangThai == "trên kệ" ? (
                                    <Text style={{ fontSize: 10, textAlign: 'right' }}>Trạng thái:{item.trangThai}</Text>
                                ) : (
                                    <Text style={{ fontSize: 10, textAlign: 'right' }}>Trạng thái:<Text style={{ color: 'red' }}>{item.trangThai}</Text></Text>
                                )}
                            </View>
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
            <View style={styles.head}>
                <View style={styles.search}>
                    <Image style={{ width: 20, height: 20, marginTop: 7 }} source={require("../../assets/Icon/search.png")} />
                    <TextInput placeholder='Tìm kiếm trò chơi' value={searchKeyword}
                        onChangeText={(text) => setSearchKeyword(text)} />
                    <TouchableOpacity onPress={() => { handleSearch() }}>
                        <Image style={{ width: 20, height: 20, marginTop: 7 }} source={require("../../assets/Icon/search.png")} />
                    </TouchableOpacity>
                </View>

                <View style={styles.user}>
                    <TouchableOpacity style={{ paddingRight: 10, paddingTop: 5 }}>
                        <Image style={{ width: 30, height: 30, }} source={require("../../assets/Icon/1.png")} />
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

                }}>Danh sách trò chơi</Text>
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
                        borderColor: "#bbb"
                    }}
                />
            </View>
            <View style={styles.end}>
                {userNCC?.note != "Admin" ? (
                    <TouchableOpacity onPress={() => { navigation.navigate("AddGameNCC", { nameNCC: userNCC?.user }) }} style={{
                        backgroundColor: "#DFEEF6",
                        width: "90%",
                        height: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                    }}>
                        <Text style={{ fontWeight: '700', fontSize: 20 }}>+</Text>
                    </TouchableOpacity>
                ) : (
                    <View></View>
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
        height: "80%",
        marginTop: 20,

    },
    end: {
        width: "100%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ManagerGameScreen;