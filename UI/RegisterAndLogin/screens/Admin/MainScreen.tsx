import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, FlatList, RefreshControl, AppState } from 'react-native';
import { getByName } from '../../services/Game';
import BottomSheet from "../Users/BottomSheet";
import { BASE_URL_Image, UpdateStateLogin, getByUser, getGameManager, getImageIcon } from '../../services/todo';
import * as FileSystem from 'expo-file-system';


const MainScreenAdmin = ({ navigation }: any) => {
    const username = navigation.getParam("username")
    const [refreshing, setRefreshing] = useState<boolean>(false)

    const [imageUri, setImageUri] = useState<string>();
    const bottomSheetRef = useRef<any>(null);

    const showBottomSheetPanel = () => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.showPanel();
        }
    };
    const loadTasks = async () => {

        setRefreshing(true)
        try {
            const { data } = await getByName()
            // console.log(data)

            const response = await getImageIcon(username)
            const name = response.data[0].imageName

            fetchImage(name)

        } catch (err: any) {
            const errorMessage = err.response
            alert(errorMessage)
        }
        setRefreshing(false)
    }

    const fetchImage = async (imageName: string) => {
        const url = BASE_URL_Image.concat("getImage/").concat(username).concat("/").concat(imageName);

        try {
            const response = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + imageName);
            setImageUri(response.uri);

        } catch (error: any) {
            console.error('Error fetching image:', error.response.data);
        }
    };
    const handleRefresh = () => {
        setRefreshing(true);
        loadTasks();
    };
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
        updateState(true)
        AppState.addEventListener('change', handleAppStateChange);
        loadTasks()
    }, [username])
    return (
        <View style={styles.container}>

            <View style={styles.head}>
                <TouchableOpacity style={{ paddingRight: 10, paddingTop: 7 }}
                    onPress={handleRefresh}>
                    <Image style={{ width: 20, height: 20, }} source={require("../../assets/Icon/refresh.png")} />
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingRight: 10, paddingTop: 7 }}
                    onPress={() => {
                        navigation.navigate("List_NotificationScreen", { username });
                    }}>

                    <Image style={{ width: 20, height: 20, }} source={require("../../assets/Icon/bell-jar-1096279_1280.png")} />
                </TouchableOpacity>
                <TouchableOpacity onPress={showBottomSheetPanel} style={{ paddingRight: 10, paddingTop: 5 }}>
                    {imageUri != undefined ? (
                        <Image style={{ width: 30, height: 30, }} source={{
                            uri: imageUri
                        }} />
                    ) : (
                        <Image style={{ width: 30, height: 30, }} source={require("../../assets/favicon.png")} />
                    )}

                </TouchableOpacity>

            </View>
            <View style={{ borderBottomWidth: 1, width: "100%" }}></View>
            <View style={styles.body}>
                <TouchableOpacity style={{
                    paddingBottom: 10
                }} onPress={() => { navigation.navigate("ManagerGameNCC", { username }) }}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: '700'
                    }}>
                        Danh sách trò chơi
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    paddingBottom: 10
                }} onPress={() => { navigation.navigate("ListAccountScreen", { username }) }}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: '700'
                    }}>
                        Danh sách tài khoản
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    paddingBottom: 10
                }} onPress={() => { navigation.navigate("CreateAccountNCC", { username }) }}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: '700'
                    }}>
                        Tạo tài khoản cho nhà cung cấp
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    paddingBottom: 10
                }} onPress={() => { navigation.navigate("ChartComponent", { username }) }}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: '700'
                    }}>
                        Thống kê
                    </Text>
                </TouchableOpacity>


            </View>

            <BottomSheet ref={bottomSheetRef} navigation={navigation} />
        </View>


    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'flex-start',
        backgroundColor: "#fff",
        width: "100%",
        height: "100%"
    },
    head: {

        width: "100%",
        height: "7%",
        justifyContent: 'center',
        flexDirection: 'row',


    },
    body: {
        backgroundColor: "#eee",
        width: "90%",
        height: "85%",
        marginVertical: "5%",
        marginHorizontal: "5%",
        borderRadius: 5,
        borderWidth: 1,
        padding: 30,



    },
})

export default MainScreenAdmin;