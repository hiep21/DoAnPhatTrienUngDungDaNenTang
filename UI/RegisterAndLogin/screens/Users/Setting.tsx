import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';


const SettingUser = ({ navigation }: any) => {
    const username = navigation.getParam("username")

    return (
        <View style={styles.container}>
            <Image style={{
                width: "100%",
                height: "100%",
                position: "absolute"
            }} source={require("../../assets/Icon/BG.jpg")} />
            <View style={{
                backgroundColor: "#fff",
                width: "70%",
                height: "30%",
                padding: "5%",
                borderRadius: 10
            }}>
                <TouchableOpacity style={{
                    marginBottom: 10
                }}>
                    <Text style={{ fontSize: 15, fontWeight: '700' }}>Thông báo</Text>
                    <Text style={{ fontSize: 13, color: "#555" }}>Quản lý cài đặt thông báo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    marginBottom: 10
                }}>
                    <Text style={{ fontSize: 15, fontWeight: '700' }}>Giao diện</Text>
                    <Text style={{ fontSize: 13, color: "#555" }}>Sáng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    marginBottom: 10
                }}>
                    <Text style={{ fontSize: 15, fontWeight: '700' }}>Kích cỡ chữ</Text>
                    <Text style={{ fontSize: 13, color: "#555" }}>20</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
})

export default SettingUser;