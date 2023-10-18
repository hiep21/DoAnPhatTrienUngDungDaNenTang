import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import Background from './Background';


const SettingUser = ({ navigation }) => {
    const user = navigation.getParam("user")

    return (
        <Background >
            <View style={styles.container}>
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
        </Background>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 300,
        backgroundColor: "#fff",
        height: 400,
        marginHorizontal: 30,
        marginTop: 100,
        paddingLeft: 30,
        paddingTop: 20
    },
})

export default SettingUser;