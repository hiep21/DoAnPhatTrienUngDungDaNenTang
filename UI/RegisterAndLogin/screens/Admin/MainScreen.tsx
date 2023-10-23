import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';
import Carousel from '../Users/Carousel';
import { InfoGame } from '../../services/interfaces/GameService';
import { getByName } from '../../services/Game';
import BottomSheet from "../Users/BottomSheet";
import { BASE_URL_Image, getByUser, getGameManager, getImageIcon } from '../../services/todo';
import { getItemAsync } from 'expo-secure-store';
import * as FileSystem from 'expo-file-system';
import { GameManager } from '../../services/interfaces/User.interface';


const MainScreenAdmin = ({ navigation }) => {
    const user = navigation.getParam("user")
    const [refreshing, setRefreshing] = useState<boolean>(false)

    const [imageUri, setImageUri] = useState<string>();

    const loadTasks = async () => {
        setRefreshing(true)
        try {
            const { data } = await getByName()
            // console.log(data)
  
            const response = await getImageIcon(user)
            const name = response.data[0].imageName

            fetchImage(name)

        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage)
        }
        setRefreshing(false)
    }
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
        loadTasks()
    }, [])




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
                        {imageUri ? (
                            <Image style={{ width: 30, height: 30, }} source={{
                                uri: imageUri
                            }} />
                        ) : (
                            <Image style={{ width: 30, height: 30, }} source={require("../../assets/favicon.png")} />
                        )}

                    </TouchableOpacity>

                </View>
            </View>
            <View style={{ borderBottomWidth: 1, width: 400 }}></View>
            <View style={styles.body}>
                <TouchableOpacity style={{
                    paddingBottom: 10
                }} onPress={() => { navigation.navigate("ManagerGameNCC", { user }) }}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: '700'
                    }}>
                        Danh sách trò chơi
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    paddingBottom: 10
                }} onPress={() => { navigation.navigate("ListAccountScreen", { user }) }}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: '700'
                    }}>
                        Danh sách tài khoản
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    paddingBottom: 10
                }}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: '700'
                    }}>
                        Tạo tài khoản cho nhà cung cấp
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    paddingBottom: 10
                }}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: '700'
                    }}>
                        Doanh thu
                    </Text>
                </TouchableOpacity>
            </View>

            <BottomSheet ref={ref => (this.bottomSheet = ref)} navigation={navigation} />

        </View>


    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 10,
        justifyContent: 'flex-start',
        width: "100%",

        backgroundColor: "#fff"

    },
    search: {
        width: 200,
        height: 35,
        backgroundColor: "#bbb",
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderRadius: 20,

    },
    head: {

        width: "100%",
        height: 40,
        justifyContent: 'space-between',
        flexDirection: 'row',

    },
    user: {
        flexDirection: 'row',
    },
    danhsachtrochoi: {
        fontSize: 15,
        fontWeight: "500",
        marginLeft: 20,
        paddingTop: 20

    },
    title: {
        justifyContent: 'flex-start',
        width: "100%",
        marginRight: 100
    },
    underlined: {
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        width: 420,
        fontSize: 15,
        fontWeight: "500",
        paddingLeft: 30,
        paddingTop: 10,


    },
    image: {
        //borderRadius: 15,
        //width:'95%',
        //marginTop:15,
        padding: 20
    },
    body: {
        backgroundColor: "#eee",
        width: 340,
        height: 470,
        marginTop: 20,
        marginHorizontal: 5,
        borderRadius: 5,
        borderWidth: 1,
        padding: 30

    },

})

export default MainScreenAdmin;