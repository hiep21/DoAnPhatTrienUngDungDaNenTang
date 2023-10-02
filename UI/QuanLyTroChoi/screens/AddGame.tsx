import React, { useEffect, useState } from 'react';

import { Alert, View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { CreateGame } from '../services/interfaces/GameService';
import { createGame, getByName } from '../services/Game';

const AddGame = ({ navigation }) => {

    const [user, setUser] = useState<CreateGame>({
        tenTroChoi: "",
        moTaTroChoi: "",
        doTuoi: "",
        theLoai: "",
        gia: "",
        nhaCungCap: "",
        gioiThieuTroChoi: ""
    });

    const validateInputs = () => {
        if (user.tenTroChoi.length < 5) {
            Alert.alert("Lỗi", "tên phải tối thiểu 5 ký tự");
            return false;
        }
        if (user.moTaTroChoi.length < 10) {
            Alert.alert("Lỗi", "mô tả trò chơi phải tối thiểu 10 ký tự");
            return false;
        }
        if (user.gioiThieuTroChoi.length < 50) {
            Alert.alert("Lỗi", "Vị trí tuyển dụng phải tối thiểu 50 ký tự");
            return false;
        }

        return true;
    };
    const addUserAction = async () => {
        if (!validateInputs()) {
            return;
        }
        try {
            console.log(user)
            const { data } = await createGame(user)
            alert("Thành công")
            navigation.navigate("ManagerGameScreen")
            
        } catch (err) {
            const message = err.response
            alert(message)
        }
    }
    const onCancel = () => {
        Alert.alert(
            "Xác nhận",
            "Bạn có chắc chắn muốn hủy thêm mới?",
            [
                {
                    text: "Hủy",
                    style: "cancel",
                },
                {
                    text: "Đồng ý",
                    onPress: () => {
                        navigation.navigate("TaskScreen");
                    },
                },
            ]
        );
    };
    return (

        <View style={{ height: "100%" }}>
            <Text style={styles.mainText}>Gửi yêu cầu thêm trò chơi</Text>
            <View style={styles.container}>

                <View style={[styles.address, { height: "100%" }]}>
                    <ScrollView style={{
                        width: "100%",
                        height: "50%"
                    }}>
                        <Text style={styles.label}>Tên trò chơi</Text>
                        <TextInput value={user?.tenTroChoi} onChangeText={(value) => {
                            setUser({
                                ...user,
                                tenTroChoi: value
                            })
                        }} style={styles.input} placeholder='Tên trò chơi' />

                        <Text style={styles.label}>Mô tả trò chơi</Text>
                        <TextInput value={user?.moTaTroChoi} onChangeText={(value) => {
                            setUser({
                                ...user,
                                moTaTroChoi: value
                            })
                        }} style={styles.input} placeholder='Mô tả trò chơi' />

                        <Text style={styles.label}>Độ tuổi</Text>
                        <TextInput value={user?.doTuoi} onChangeText={(value) => {
                            setUser({
                                ...user,
                                doTuoi: value
                            })
                        }} style={styles.input} placeholder='Độ tuổi' />

                        <Text style={styles.label}>Thể loại</Text>
                        <TextInput value={user?.theLoai} onChangeText={(value) => {
                            setUser({
                                ...user,
                                theLoai: value
                            })
                        }} style={styles.input} placeholder='Thể loại' />

                        <Text style={styles.label}>Giá</Text>
                        <TextInput value={user?.gia} onChangeText={(value) => {
                            setUser({
                                ...user,
                                gia: value
                            })
                        }} style={styles.input} placeholder='Giá' />

                        <Text style={styles.label}>File</Text>
                        <TextInput onChangeText={(value) => {

                        }} style={styles.input} placeholder='File.apk' />

                        <Text style={styles.label}>Giới thiệu trò chơi</Text>
                        <TextInput numberOfLines={5} value={user?.gioiThieuTroChoi} onChangeText={(value) => {
                            setUser({
                                ...user,
                                gioiThieuTroChoi: value
                            })
                        }} style={styles.inputAdd} />
                    </ScrollView>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.buttonSave} onPress={onCancel}>
                            <Text >Hủy bỏ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonSave} onPress={()=>{addUserAction()}}>
                            <Text>Lưu lại</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20
    },
    mainText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'center'
    },
    address: {
        alignItems: "flex-start",
        width: "100%",
        height: 100
    },
    input: {
        borderWidth: 2,
        padding: 5,
        width: "100%",
    },
    label: {
        marginVertical: 10,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 20
    },
    button: {
        alignItems: "center",
    },
    buttonSave: {
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderWidth: 2
    },
    inputAdd: {
        borderWidth: 2,
        height: 100,
        width: '100%',

    }
})

export default AddGame;