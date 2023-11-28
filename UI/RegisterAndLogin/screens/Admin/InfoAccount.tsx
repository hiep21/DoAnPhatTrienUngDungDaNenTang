import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, Image, TextInput, AppState } from 'react-native';

import { RegisterData } from '../../services/interfaces/User.interface';
import { DeleteAccount, UpdateStateLogin, deleteImage, deleteUsers, getImageIcon } from '../../services/todo';
const InfoAccount = ({ navigation }: any) => {
    const username = navigation.getParam("username")
    const item = navigation.getParam("item")
    const imageUri = navigation.getParam("imageUri")
    const [Account, setAccount] = useState<RegisterData>(item)




    const deleteAccount = async () => {
        const response = await getImageIcon(Account.username)
        const imageName = response.data[0].imageName

        Alert.alert(
            "Xác nhận",
            "Bạn có chắc chắn muốn xóa không",
            [
                {
                    text: "Hủy",
                    style: "cancel",
                },
                {
                    text: "Đồng ý",
                    onPress: async () => {
                        try {
                            await DeleteAccount(Account.username)
                            await deleteImage(Account.username, imageName)

                            alert('Xóa tài khoản thành công');
                            navigation.navigate("MainScreenAdmin");
                        } catch (error: any) {
                            console.log(error.response.data)
                        }

                    },
                },
            ]
        );
    }
    const [colorOnl, setColorOnl] = useState<string>("red")
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
        if (AppState === 'background') {
            updateState(false)
        }
        else {
            updateState(true)
        }
    };
    useEffect(() => {
        AppState.addEventListener('change', handleAppStateChange);
    }, [item, imageUri,username])
    return (
        <View style={styles.container}>

            <View style={styles.body}>
                <Text style={{
                    textAlign: 'left',
                    paddingLeft: 30,
                    borderBottomWidth: 1.5,
                    fontSize: 17,
                    fontWeight: '600',

                }}>Thông tin tài khoản {Account?.username}</Text>
                <View style={styles.describeGame}>
                    <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", width: 55, height: 55, marginTop: 5 }}>
                        {ColorAva()}
                        <Image
                            style={{ width: 50, height: 50, borderRadius: 5 }}
                            source={{ uri: imageUri }}
                        />

                    </View>
                    <View style={{
                        justifyContent: 'center',
                        width: "50%"
                    }}>
                        <Text style={{ fontSize: 15 }}>{Account?.name}</Text>
                        <Text style={{ fontSize: 10 }}>Trạng thái hoạt động:</Text>
                        <Text style={{ fontSize: 10 }}>{Account.email}</Text>
                        <Text style={{ fontSize: 10 }}>Quyền hạn: {Account?.note}</Text>
                    </View>
                    <View style={{

                        width: "30%",

                    }}>
                        <TouchableOpacity style={{
                            height: "45%",
                            width: "100%",
                            backgroundColor: "#6C9EFF",
                            justifyContent: 'center',
                            borderRadius: 5
                        }}>
                            <Text style={{ textAlign: 'center' }}>Cập nhật</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            height: "45%",
                            width: "100%",
                            backgroundColor: "#FF6C6C",
                            marginTop: "5%",
                            justifyContent: 'center',
                            borderRadius: 5
                        }} onPress={() => { deleteAccount() }}>
                            <Text style={{ textAlign: 'center' }}>Xóa tài khoản</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    width: "100%",
                    height: "100%",
                    marginTop: 10,
                    borderTopWidth: 1,
                    paddingHorizontal: 30,
                    paddingTop: 30,

                }}>
                    <View style={{
                        backgroundColor: "#eee",
                        width: "100%",
                        height: "80%",
                        borderWidth: 1,
                        borderRadius: 10,
                        padding: "5%"
                    }}>
                        <View style={[styles.itemInfo, { width: 250 }]}>
                            <Text>Ngày sinh: {Account?.dateOfBirth}</Text>
                        </View>
                        <View style={[styles.itemInfo, { width: 250 }]}>
                            <Text>Giới tính: {Account?.gender}</Text>
                        </View>
                        <View style={[styles.itemInfo, { width: 250 }]}>
                            <Text>Địa chỉ: {Account?.address}</Text>
                        </View>
                        <View style={[styles.itemInfo, { width: 250 }]}>
                            <Text>Số điện thoại: {Account?.phone}</Text>
                        </View>
                    </View>

                </View>

            </View>

        </View>


    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        width: "100%",
        height: "100%"

    },
    body: {
        backgroundColor: "white",
        width: "100%",
        height: "90%",
        marginTop: 20,

    },
    describeGame: {
        height: 70,
        width: "85%",
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    itemInfo: {
        width: 70,
        height: 40,
        marginLeft: 10,

    },

})

export default InfoAccount;