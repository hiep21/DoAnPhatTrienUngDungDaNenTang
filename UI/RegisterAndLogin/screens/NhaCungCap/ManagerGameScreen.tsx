import React, { useEffect, useRef, useState } from 'react';

import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Image, AppState } from 'react-native';

import { BASE_URL_Image_Icon, getByName, getImageIconGame, getInfoFileAdmin, getInfoFileNCC } from '../../services/Game';
import { InfoGame } from '../../services/interfaces/GameService';
import { BASE_URL_Image, UpdateStateLogin, getByUser, getImageIcon } from '../../services/todo';
import { ImageUri, RegisterData } from '../../services/interfaces/User.interface';
import BottomSheet from '../Users/BottomSheet';
import * as FileSystem from 'expo-file-system';

const ManagerGameNCC = ({ navigation }: any) => {
    const username = navigation.getParam("username")
    const bottomSheetRef = useRef<any>(null);

    const showBottomSheetPanel = () => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.showPanel();
        }
    };
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [listGame, setListGame] = useState<InfoGame[]>([])
    const [reListGame, setReListGame] = useState<InfoGame[]>([])
    const [listGameAdmin, setListGameAdmin] = useState<InfoGame[]>([])
    const [accountNCC, setAccountNCC] = useState<RegisterData>()
    let ListGame: InfoGame[] = []
    const loadTasks = async () => {
        setRefreshing(true)

        try {
            const { data } = await getInfoFileNCC(username)
            // console.log(data)
            setReListGame(data)
            setListGame(data)
            const responseAdmin = await getInfoFileAdmin()
            setListGameAdmin(responseAdmin.data)
            const response = await getByUser(username)
            setAccountNCC(response.data[0])

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

            const response2 = await getImageIcon(username)
            const name = response2.data[0].imageName
            fetchImageUser(name)

        } catch (err: any) {
            const errorMessage = err.response
            alert(errorMessage)
        }
        setRefreshing(false)
    }
    const [listImageUri, setListImageUri] = useState<ImageUri[]>([])
    const [imageAdminUri, setImageAdminUri] = useState<string>();
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
    const [imageUri, setImageUri] = useState<string>();
    const fetchImageUser = async (imageName: string) => {

        const url = BASE_URL_Image.concat("getImage/").concat(username).concat("/").concat(imageName);

        try {
            const response = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + imageName);
            setImageUri(response.uri);

        } catch (error: any) {
            console.error('Error fetching image:', error.response.data);

        }


    };
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const handleSearch = () => {


        const filteredTasks = listGame.filter((item: any) =>
            item.tenTroChoi.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.gia.toLowerCase().includes(searchKeyword.toLowerCase())
        );

        if (filteredTasks != null) {

            setListGame(filteredTasks);

        }
        else {
            console.log(reListGame);
            setListGame(reListGame);
        }
    }
    const updateState = async (result: boolean) => {
        
        try {
            await UpdateStateLogin({
                username: username,
                password: "......",
                checkOnline: result
            })
            console.log("Success")
        } catch (error: any) {
            console.log(error.response.data)
        }
    }
    const handleAppStateChange = (AppState: any) => {
        if (AppState === 'background' || AppState === 'inactive') {
            updateState(false)
        }
        else {
            updateState(true)
        }
    };
    useEffect(() => {
        AppState.addEventListener('change', handleAppStateChange);
        loadTasks()
        return () => {
            loadTasks()
        };
    }, [username])
    const goToDetail = (item: InfoGame, imageUri: any) => {
        navigation.navigate("InfoGameNCC", { gameId: item.id, tenTroChoi: item.tenTroChoi, imageUri, username })
    }

    const renderTask = ({ item }: { item: InfoGame }) => {
        return (
            <TouchableOpacity onPress={() => { goToDetail(item, listImageUri.find(f => f.namePath == item.tenTroChoi)?.imageUri) }} >

                {item.nhaCungCap == accountNCC?.username ? (
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: "5%",
                        marginTop: 20
                    }}>
                        {listImageUri.length != 0 ? (
                            // <Text>{listImageUri.find(f => f.username == item.tenTroChoi)?.imageUri}</Text>
                            <Image style={{ width: 50, height: 50, borderRadius: 5 }} source={{ uri: listImageUri.find(f => f.namePath == item.tenTroChoi)?.imageUri }} />
                        ) : (
                            <Image style={{ width: 50, height: 50, borderRadius: 5 }} source={require("../../assets/favicon.png")} />
                        )}
                        <View style={{
                            marginLeft: 15,
                            width: "70%"
                        }}>
                            <Text style={{ fontWeight: '600', fontSize: 12 }}>{item.tenTroChoi}</Text>
                            <Text style={{ fontSize: 10, marginTop: 5 }}>Thể Loại: {item.theLoai}</Text>
                            <View style={{
                                flexDirection: 'row',
                                width: "100%",
                                justifyContent: 'space-between'
                            }}>
                                <Text style={{ fontSize: 10 }}>Giá: {item.gia}</Text>
                                {item.trangThai == "Trên kệ" ? (
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
                {accountNCC?.note == "Admin" ? (
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: "5%",
                        marginTop: 20
                    }}>
                        <Image style={{ width: 50, height: 50, borderRadius: 5 }} source={{ uri: listImageUri.find(f => f.namePath == item.tenTroChoi)?.imageUri }} />
                        <View style={{
                            marginLeft: 15,
                            width: "70%"
                        }}>
                            <Text style={{ fontWeight: '600', fontSize: 12 }}>{item.tenTroChoi}</Text>
                            <View style={{ flexDirection: "row", width: 250, paddingTop: 5 }}>
                                <Text style={{ fontSize: 10, width: 115 }}>Thể Loại: {item.theLoai}</Text>
                                <Text style={{ fontSize: 10 }}>Nhà cung cấp: {item.nhaCungCap}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                width: "100%",
                            }}>
                                <Text style={{ fontSize: 10, width: 115 }}>Giá: {item.gia}</Text>
                                {item.trangThai == "Trên kệ" ? (
                                    <Text style={{ fontSize: 10, }}>Trạng thái:{item.trangThai}</Text>
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
                    <TouchableOpacity onPress={() => { handleSearch() }} style={{ marginTop: 7 }}>
                        <Image style={{ width: 20, height: 10, marginTop: 7, }} source={require("../../assets/Icon/paper-1349664_1280.png")} />
                    </TouchableOpacity>
                </View>

                <View style={styles.user}>
                    <TouchableOpacity style={{ paddingRight: 10, paddingTop: 7 }} onPress={() => {
                        if (accountNCC?.note == "NCC") {
                            navigation.navigate("List_NotificationScreen", { username, imageUri, listImageUri })
                        }
                        else {

                            navigation.navigate("List_NotificationScreen", { username });

                        }
                    }}>
                        <Image style={{ width: 20, height: 20, }} source={require("../../assets/Icon/bell-jar-1096279_1280.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={showBottomSheetPanel} style={{ paddingRight: 10, paddingTop: 5 }}>
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

                }}>Danh sách trò chơi</Text>
                {accountNCC?.note != "Admin" ? (
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
                ) : (
                    <FlatList
                        data={listGameAdmin}
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
            <View style={styles.end}>
                {accountNCC?.note != "Admin" ? (
                    <View style={styles.addAndUpdate}>
                        <TouchableOpacity onPress={() => { navigation.navigate("AddGameNCC", { nameNCC: accountNCC?.username }) }} style={{
                            backgroundColor: "#DFEEF6",
                            width: 100,
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 5,
                            marginHorizontal: 20

                        }}>
                            <Text style={{ fontWeight: '700', fontSize: 15 }}>Up Game</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate("BankAccount", { username }) }} style={{
                            backgroundColor: "#DFEEF6",
                            width: 100,
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 5,
                            marginHorizontal: 20
                        }}>
                            <Text style={{ fontWeight: '700', fontSize: 15 }}>Update Bank</Text>
                        </TouchableOpacity>

                    </View>


                ) : (
                    <View></View>
                )}
            </View>
            <BottomSheet ref={bottomSheetRef} navigation={navigation} />
        </View>

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"

    },
    head: {
        width: "100%",
        height: "5%",
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
    },
    body: {
        backgroundColor: "white",
        width: "100%",
        height: "80%",
        marginTop: 20,

    },
    end: {
        width: "100%",
        height: "15%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    addAndUpdate: {
        flexDirection: 'row',
        marginHorizontal: 20
    }
});

export default ManagerGameNCC;