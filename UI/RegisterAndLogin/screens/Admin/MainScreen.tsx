import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';
import { getByName } from '../../services/Game';
import BottomSheet from "../Users/BottomSheet";
import { BASE_URL_Image, getByUser, getGameManager, getImageIcon } from '../../services/todo';
import * as FileSystem from 'expo-file-system';


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

        const url = BASE_URL_Image.concat("getImage/").concat(user).concat("/").concat(imageName);

        try {
            const response = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + imageName);
            setImageUri(response.uri);

        } catch (error) {
            console.error('Error fetching image:', error.response.data);

        }

    };

    useEffect(() => {
        loadTasks()
    }, [])

    const renderTask = () => {
        return (
            <View style={{

            }}>
                <View style={styles.head}>


                    <View style={styles.user}>
                        <TouchableOpacity style={{ paddingRight: 10, paddingTop: 7 }}
                            onPress={() => {
                                navigation.navigate("List_NotificationScreen", { user });
                            }}>

                            <Image style={{ width: 20, height: 20, }} source={require("../../assets/Icon/bell-jar-1096279_1280.png")} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.bottomSheet.showPanel()} style={{ paddingRight: 10, paddingTop: 5 }}>
                            {imageUri != undefined ? (
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
                    }} onPress={() => { navigation.navigate("CreateAccountNCC", { user }) }}>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: '700'
                        }}>
                            Tạo tài khoản cho nhà cung cấp
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        paddingBottom: 10
                    }} onPress={() => { navigation.navigate("ChartComponent", { user }) }}>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: '700'
                        }}>
                            Doanh thu
                        </Text>
                    </TouchableOpacity>
                </View>

                
            </View >
        )
    }


    return (
        <View style={styles.container}>
            <FlatList
                data={"1"}
                renderItem={() => renderTask()}
                onRefresh={loadTasks}
                refreshing={refreshing}
                style={{
                    marginTop: "5%",
                    width: "100%",
                }}
            />
            <BottomSheet ref={ref => (this.bottomSheet = ref)} navigation={navigation} />
        </View>


    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
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
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20
    },
    user: {
        flexDirection: 'row',
        width: 100
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
        width: 325,
        height: 450,
        marginTop: 20,
        marginHorizontal: 5,
        borderRadius: 5,
        borderWidth: 1,
        padding: 30,
        marginHorizontal: 15

    },

})

export default MainScreenAdmin;