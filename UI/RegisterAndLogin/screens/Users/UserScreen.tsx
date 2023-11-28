import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator, AppState } from 'react-native';
import { BASE_URL_Image, UpdateStateLogin, getByUser, getImageIcon } from '../../services/todo';
import { RegisterData } from '../../services/interfaces/User.interface';
import * as FileSystem from 'expo-file-system';
const UserScreen = ({ navigation }: any) => {
    const username = navigation.getParam("username")
    const [account, setAccount] = useState<RegisterData>();
    const [imageUri, setImageUri] = useState<string>();

    const loadTasks = async () => {
        try {

            const { data } = await getByUser(username)
            setAccount(data[0])
            const response = await getImageIcon(username)
            const name = response.data[0].imageName
            console.log(response.data)
            fetchImage(name)

        } catch (err: any) {
            const errorMessage = err.response
            alert(errorMessage)
        }

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
    const changeInfo = (namePath: any, textChange: string) => {

        navigation.navigate("ChangeInfo", { username: namePath, textChange: textChange });
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
    }, [username])
    return (
        <View style={styles.container}>
            <Image style={{
                width: "100%",
                height: "100%",
                position: "absolute"
            }} source={require("../../assets/Icon/BG.jpg")} />
            <View style={styles.iconBg}>
                <TouchableOpacity onPress={() => { changeInfo(account?.username, "image") }}>
                    {imageUri ? (
                        <Image style={{
                            height: 60,
                            width: 60,
                            borderRadius: 100
                        }} source={{ uri: imageUri }} />
                    ) : (
                        <Image style={{
                            height: 60,
                            width: 60,
                            borderRadius: 100
                        }} source={require("../../assets/favicon.png")} />
                    )}
                </TouchableOpacity>

            </View>
            <Text style={[styles.mainText, { color: "blue" }]}>{username}</Text>
            <View style={styles.mainContainer}>

                <View style={styles.content}>

                    <Text style={styles.label}>Thông tin cá nhân</Text>
                </View>
                <View style={styles.contents}>
                    <View style={styles.itemTool}>
                        <View style={styles.textAndImage}>
                            <Image style={styles.image} source={require("../../assets/favicon.png")} />
                            <View>
                                <Text style={styles.textUser}>Tên của bạn</Text>
                                <Text style={styles.textUser}>{account?.name}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.bonut} onPress={() => { changeInfo(account?.username, "name") }}>
                            <Text style={{ fontSize: 25 }}> {">"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemTool}>
                        <View style={styles.textAndImage}>
                            <Image style={styles.image} source={require("../../assets/favicon.png")} />
                            <View>
                                <Text style={styles.textUser}>Ngày sinh</Text>
                                <Text style={styles.textUser}>{account?.dateOfBirth}</Text>
                            </View>
                        </View >
                        <TouchableOpacity style={styles.bonut} onPress={() => { changeInfo(account?.username, "dateOfBirth") }}>
                            <Text style={{ fontSize: 25 }}> {">"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemTool}>
                        <View style={styles.textAndImage}>
                            <Image style={styles.image} source={require("../../assets/favicon.png")} />
                            <View>
                                <Text style={styles.textUser}>Giới tính</Text>
                                <Text style={styles.textUser}>{account?.gender}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.bonut} onPress={() => { changeInfo(account?.username, "gender") }}>
                            <Text style={{ fontSize: 25 }}> {">"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemTool}>
                        <View style={styles.textAndImage}>
                            <Image style={styles.image} source={require("../../assets/favicon.png")} />
                            <View>
                                <Text style={styles.textUser}>Email</Text>
                                <Text numberOfLines={1} style={styles.textUser}>{account?.email}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.bonut} onPress={() => { changeInfo(account?.username, "email") }}>
                            <Text style={{ fontSize: 25 }}> {">"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemTool}>
                        <View style={styles.textAndImage}>
                            <Image style={styles.image} source={require("../../assets/favicon.png")} />
                            <View>
                                <Text style={styles.textUser}>Số điện thoại</Text>
                                <Text style={styles.textUser}>{account?.phone}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.bonut} onPress={() => { changeInfo(account?.username, "phone") }}>
                            <Text style={{ fontSize: 25 }}> {">"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemTool}>
                        <View style={styles.textAndImage}>
                            <Image style={styles.image} source={require("../../assets/favicon.png")} />
                            <View>
                                <Text style={styles.textUser}>Địa chỉ</Text>
                                <Text style={styles.textUser}>{account?.address}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.bonut} onPress={() => { changeInfo(account?.username, "address") }}>
                            <Text style={{ fontSize: 25 }}> {">"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: '100%',
        height: "100%"
    },
    mainContainer: {
        marginVertical: 10,
        backgroundColor: "#fff",
        height: "100%",
        width: "100%",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignItems: "center"
    },
    mainText: {
        fontSize: 18,
        fontWeight: "500",
    },
    content: {
        alignItems: "center",
        width: "80%",
    },
    contents: {
        alignItems: "center",
        width: "85%",
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#999",
        height: 350
    },
    input: {
        borderWidth: 1,
        borderColor: "#bbb",
        padding: 5,
        borderRadius: 100,
        width: "100%",
        backgroundColor: "#5555"
    },
    label: {
        marginVertical: 5,
        fontWeight: "bold",
        color: '#17741d',
        fontSize: 16
    },
    buttons: {
        justifyContent: "space-between",
        width: 320,
        marginTop: 20,
        alignItems: "center",
    },
    button: {
        borderWidth: 1,
        borderColor: "#177413",
        padding: 8,
        borderRadius: 100,
        backgroundColor: "#27bc32",
        width: "80%",
        alignItems: "center"
    },
    textbtn: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 15
    },
    bonut: {
        width: 20,
        justifyContent: 'flex-end'
    },
    textSignup: {
        fontWeight: 'bold',
        color: '#17741d'
    },
    text: {
        fontWeight: "500",
        color: '#222'
    },
    iconBg: {
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    itemUser: {
        fontSize: 38,
        color: "#FFF",
        fontWeight: "500",
    },
    itemTool: {
        flexDirection: 'row',
        paddingTop: 15,
        height: 55,
        width: "90%",
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    image: {
        width: 25,
        height: 25,
    },
    textUser: {
        marginLeft: 20,
        fontWeight: "500",
        width: 200,

    },
    textAndImage: {
        flexDirection: 'row',
    }
})

export default UserScreen;