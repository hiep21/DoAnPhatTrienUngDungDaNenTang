import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import Background from './Background';
import { getByUser } from '../../services/todo';
import { RegisterData } from '../../services/interfaces/User.interface';

const UserScreen = ({ navigation }) => {
    const user = navigation.getParam("user")
    const [users, setUsers] = useState<RegisterData>();
    const loadTasks = async () => {
        try {
            
            const { data } = await getByUser(user)

            setUsers(data[0])

        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage)
        }

    }
    const changeInfo = (username: string, textChange: string) => {

        navigation.navigate("ChangeInfo", { user: username, textChange: textChange });
    }
    useEffect(() => {
        loadTasks()
    }, [user])
    return (
        <Background>
            <View style={styles.container}>
                <View style={styles.iconBg}>
                    <TouchableOpacity onPress={() => { changeInfo(users?.user, "image") }}>
                        {users?.image == "string" ? (
                            <Image style={{
                                height: 60,
                                width: 60,
                                borderRadius: 100
                            }} source={require("../../assets/games/cod/cod_1.jpg")} />
                        ) : (
                            <Image style={{
                                height: 60,
                                width: 60,
                                borderRadius: 100
                            }} source={{ uri: users?.image }} />
                        )}
                    </TouchableOpacity>

                </View>
                <Text style={[styles.mainText, { color: "blue" }]}>{user}</Text>
                <View style={styles.mainContainer}>
                    <View>
                        <Text>
                            {users?.image}...
                        </Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.label}>Thông tin cá nhân</Text>
                    </View>
                    <View style={styles.contents}>
                        <View style={styles.itemTool}>
                            <View style={styles.textAndImage}>
                                <Image style={styles.image} source={require("../../assets/favicon.png")} />
                                <View>
                                    <Text style={styles.textUser}>Tên của bạn</Text>
                                    <Text style={styles.textUser}>{users?.name}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.bonut} onPress={() => { changeInfo(users?.user, "name") }}>
                                <Text style={{ fontSize: 25 }}> {">"}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemTool}>
                            <View style={styles.textAndImage}>
                                <Image style={styles.image} source={require("../../assets/favicon.png")} />
                                <View>
                                    <Text style={styles.textUser}>Ngày sinh</Text>
                                    <Text style={styles.textUser}>{users?.dateOfBirth}</Text>
                                </View>
                            </View >
                            <TouchableOpacity style={styles.bonut} onPress={() => { changeInfo(users?.user, "dateOfBirth") }}>
                                <Text style={{ fontSize: 25 }}> {">"}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemTool}>
                            <View style={styles.textAndImage}>
                                <Image style={styles.image} source={require("../../assets/favicon.png")} />
                                <View>
                                    <Text style={styles.textUser}>Giới tính</Text>
                                    <Text style={styles.textUser}>{users?.gender}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.bonut} onPress={() => { changeInfo(users?.user, "gender") }}>
                                <Text style={{ fontSize: 25 }}> {">"}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemTool}>
                            <View style={styles.textAndImage}>
                                <Image style={styles.image} source={require("../../assets/favicon.png")} />
                                <View>
                                    <Text style={styles.textUser}>Email</Text>
                                    <Text numberOfLines={1} style={styles.textUser}>{users?.email}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.bonut} onPress={() => { changeInfo(users?.user, "email") }}>
                                <Text style={{ fontSize: 25 }}> {">"}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemTool}>
                            <View style={styles.textAndImage}>
                                <Image style={styles.image} source={require("../../assets/favicon.png")} />
                                <View>
                                    <Text style={styles.textUser}>Số điện thoại</Text>
                                    <Text style={styles.textUser}>{users?.phone}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.bonut} onPress={() => { changeInfo(users?.user, "phone") }}>
                                <Text style={{ fontSize: 25 }}> {">"}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemTool}>
                            <View style={styles.textAndImage}>
                                <Image style={styles.image} source={require("../../assets/favicon.png")} />
                                <View>
                                    <Text style={styles.textUser}>Địa chỉ</Text>
                                    <Text style={styles.textUser}>{users?.address}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.bonut} onPress={() => { changeInfo(users?.user, "address") }}>
                                <Text style={{ fontSize: 25 }}> {">"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </View>
        </Background>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: '100%',

    },
    mainContainer: {
        marginVertical: 10,
        backgroundColor: "#fff",
        height: 700,
        width: 360,
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
        color: '#17741d',


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