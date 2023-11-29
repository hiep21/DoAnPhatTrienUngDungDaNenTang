import React, { useEffect, useRef, useState } from 'react';

import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Image, Alert, AppState } from 'react-native';

import { BASE_URL_Image, GetStateAccount, UpdateStateLogin, getAllAccount, getByUser, getImageIcon } from '../../services/todo';
import { ImageUri, RegisterData, checkonl } from '../../services/interfaces/User.interface';
import BottomSheet from '../Users/BottomSheet';
import * as FileSystem from 'expo-file-system';
import { InfoGame } from '../../services/interfaces/GameService';

const ListAccountScreen = ({ navigation }: any) => {
    const bottomSheetRef = useRef<any>(null);

    const showBottomSheetPanel = () => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.showPanel();
        }
    };
    const username = navigation.getParam("username")

    const [refreshing, setRefreshing] = useState<boolean>(false)

    const [listAccount, setListAccount] = useState<RegisterData[]>([])
    const [reListAccount, setReListAccount] = useState<RegisterData[]>([])
    let list: RegisterData[] = [];
    const [colorOnl, setColorOnl] = useState<checkonl[]>([])
    const loadTasks = async () => {
        setRefreshing(true)
        try {
            const { data } = await getAllAccount()
            list = data;
            setListAccount(data)
            setReListAccount(data)
            const response = await getImageIcon(username)
            const name = response.data[0].imageName

            fetchImage(username, name)
            for (let i = 0; i < data.length; i++) {
                const response = await getImageIcon(list[i].username)
                const ImageName = response.data[0].imageName
                await fetchImage(list[i].username, ImageName)

            }

            setListImageUri(checklist)
            let lsCheckColor: checkonl[] = []
            if (data.length != 0) {
                for (let i = 0; i < data.length; i++) {
                    let name: string = data[i].username
                    let checkOnline: checkonl
                    try {
                        const Response = await GetStateAccount(name)
                        if (Response.data != 0) {
                            if (Response.data[0].checkOnline) {
                                checkOnline = { username: name, colorOnl: "green" }
                            }
                            else {
                                checkOnline = { username: name, colorOnl: "red" }
                            }
                        }
                        else {
                            checkOnline = { username: name, colorOnl: "red" }
                        }
                        lsCheckColor.push(checkOnline)
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
            setColorOnl(lsCheckColor)
        } catch (err: any) {

            console.log(err.TypeError)


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

        if (namePath == username) {
            const url = BASE_URL_Image.concat("getImage/").concat(namePath).concat("/").concat(imageName);

            try {
                const response = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + imageName);
                setImageAdminUri(response.uri);

            } catch (error: any) {
                console.error('Error fetching image:', error.response.data);

            }
        }
        else {
            const url = BASE_URL_Image.concat("getImage/").concat(namePath).concat("/").concat(imageName);

            try {
                const response = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + imageName);
                check.namePath = namePath
                check.imageUri = response.uri
                checklist.push(check)

            } catch (error: any) {
                console.error('Error fetching image:', error.response.data);

            }
        }

    };
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const handleSearch = () => {
        const filteredTasks = listAccount.filter((item) =>
            item.username.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.note.toLowerCase().includes(searchKeyword.toLowerCase())
        );

        if (filteredTasks != null) {

            setListAccount(filteredTasks);
        }
        else {
            setListAccount(reListAccount)
        }

    }
    const ColorAva = () => {
        return (
            <View style={{ position: 'absolute', width: '100%', height: '100%', }}>
                <View style={{ flex: 1, backgroundColor: '#FFFF00', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                <View style={{ flex: 1, backgroundColor: '#CCFF00' }} />
                <View style={{ flex: 1, backgroundColor: '#99FF00' }} />
                <View style={{ flex: 1, backgroundColor: '#99FF00' }} />
                <View style={{ flex: 1, backgroundColor: '#99FF00' }} />
                <View style={{ flex: 1, backgroundColor: '#00FF00' }} />
                <View style={{ flex: 1, backgroundColor: '#33CC00' }} />
                <View style={{ flex: 1, backgroundColor: '#00CC66', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }} />
            </View>
        )
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
        handleSearch()
        loadTasks()
    }, [username])
    const goToDetail = (item: RegisterData, imageUri: any) => {
        navigation.navigate("InfoAccount", { item, imageUri, username: item.username })
    }

    const renderTask = ({ item }: { item: RegisterData }) => {
        return (
            <TouchableOpacity onPress={() => { goToDetail(item, listImageUri.find(f => f.namePath == item.username)?.imageUri) }} >
                {item.username != username ? (
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: "5%",
                        marginVertical: "3%",
                    }}>

                        {listImageUri.length != 0 ? (

                            <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", width: 55, height: 55 }}>
                                {ColorAva()}
                                <Image
                                    style={{ width: 50, height: 50, borderRadius: 5 }}
                                    source={{ uri: listImageUri.find(f => f.namePath == item.username)?.imageUri }}
                                />
                                <View style={{
                                    width: 15,
                                    height: 15,
                                    position: "absolute",
                                    end: -5,
                                    alignSelf: "flex-end",
                                    bottom: -5,
                                    backgroundColor: colorOnl.find(f => f.username == item.username)?.colorOnl,
                                    borderRadius: 100,
                                    borderWidth: 0.2
                                }}>

                                </View>
                            </View>


                        ) : (
                            <Image style={{ width: 50, height: 50, marginTop: 7 }} source={require("../../assets/favicon.png")} />
                        )}
                        <View style={{
                            marginLeft: 15,
                            width: "70%"
                        }}>
                            <Text style={{ fontWeight: '600', fontSize: 12 }}>{item.name}</Text>
                            <Text style={{ fontSize: 10, marginTop: 10 }}>Email: {item.email}</Text>
                            <View style={{
                                flexDirection: 'row',
                                width: "100%",
                                justifyContent: 'space-between'
                            }}>
                                <Text style={{ fontSize: 10 }}>Quyền: {item.note}</Text>

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
                    <TextInput placeholder='Tìm kiếm tài khoản' value={searchKeyword}
                        onChangeText={(text) => setSearchKeyword(text)} />
                    <TouchableOpacity style={{

                        paddingTop: 5
                    }} onPress={() => { handleSearch() }}>
                        <Image style={{ width: 20, height: 10, marginTop: 7, }} source={require("../../assets/Icon/paper-1349664_1280.png")} />
                    </TouchableOpacity>
                </View>

                <View style={styles.user}>
                    <TouchableOpacity style={{ paddingRight: 10, paddingTop: 5 }} onPress={() => {
                        navigation.navigate("List_NotificationScreen", { username });
                    }}>
                        <Image style={{ width: 30, height: 30, }} source={require("../../assets/Icon/bell-jar-1096279_1280.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { showBottomSheetPanel() }} style={{ paddingRight: 10, paddingTop: 5 }}>
                        <Image style={{ width: 30, height: 30, }} source={{ uri: imageAdminUri }} />
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

                }}>Danh sách tài khoản</Text>
                <FlatList
                    data={listAccount}
                    renderItem={(list) => renderTask(list)}
                    onRefresh={loadTasks}
                    refreshing={refreshing}
                    style={{
                        marginTop: "5%",
                        borderWidth: 1,
                        width: "95%",
                        alignSelf: 'center',
                        borderRadius: 5,
                        borderColor: "#bbb",
                    }}
                />
            </View>

            <BottomSheet ref={bottomSheetRef} navigation={navigation} />
        </View>

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",

    },
    head: {
        width: "100%",
        height: "7%",
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: "#fff",

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
        width: "100%",
        height: "95%",
        paddingBottom: "10%"
    },
    end: {
        width: "100%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ListAccountScreen;