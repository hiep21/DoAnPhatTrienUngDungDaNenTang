import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';

import { RegisterData } from '../../services/interfaces/User.interface';
import { DeleteAccount, deleteImage, deleteUsers, getImageIcon } from '../../services/todo';
const InfoAccount = ({ navigation }) => {

    const item = navigation.getParam("item")
    const imageUri = navigation.getParam("imageUri")
    const [Account, setAccount] = useState<RegisterData>(item)




    const deleteAccount = async () => {
        const response = await getImageIcon(Account.userName)
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
                            await DeleteAccount(Account.userName)
                            await deleteImage(Account.userName, imageName)
                            
                            alert('Xóa game thành công');
                            navigation.navigate("MainScreenAdmin");
                        } catch (error) {
                            console.log(error.response.data)
                        }

                    },
                },
            ]
        );
    }

    useEffect(() => {

    }, [item, imageUri])
    return (
        <View style={styles.container}>

            <View style={styles.body}>
                <Text style={{
                    textAlign: 'left',
                    paddingLeft: 30,
                    borderBottomWidth: 1.5,
                    fontSize: 17,
                    fontWeight: '600',

                }}>Thông tin tài khoản {Account?.userName}</Text>
                <View style={styles.describeGame}>
                    <Image style={{
                        height: 50,
                        width: 50,
                        borderRadius: 5,
                        marginTop: 10
                    }} source={{ uri: imageUri }} />
                    <View style={{

                        justifyContent: 'center',

                        width: "50%"
                    }}>
                        <Text style={{ fontSize: 15 }}>{Account?.name}</Text>
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
                    height: 350,
                    marginTop: 10,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    padding: 30,

                }}>
                    <View style={{
                        backgroundColor: "#eee",
                        width: "100%",
                        height: 270,
                        borderWidth: 1,
                        borderRadius: 10,
                        paddingTop: 10
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
    end: {
        width: "100%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }


})

export default InfoAccount;