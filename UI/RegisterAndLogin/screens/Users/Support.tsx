import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import Background from './Background';


const SupportUser = ({ navigation }) => {
    const user = navigation.getParam("user")

    return (
        <Background >
            <View style={styles.container}>
                <TouchableOpacity style={{
                    marginBottom: 30
                }}>
                    <Text style={{ fontSize: 15, fontWeight: '700', marginLeft: 5 }}>Bạn cần được trợ giúp gì?</Text>

                </TouchableOpacity>
                <TouchableOpacity style={{
                    marginBottom: 30
                }}>
                    <Text style={{ fontSize: 15, fontWeight: '700', marginLeft: 5 }}>Hỏi cộng đồng trợ giúp</Text>
                    <Text style={{
                        fontSize: 13,
                        color: "#555",
                        backgroundColor: "#eee",
                        width: "80%",
                        height: 50,
                        padding: 7,
                        borderRadius: 5,
                        marginTop: 5
                    }}>Có được câu trả lời từ các chuyên gia trong cộng đồng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    marginBottom: 30
                }}>
                    <Text style={{ fontSize: 15, fontWeight: '600', marginLeft: 5 }}>Gửi ý kiến phản hồi</Text>

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

export default SupportUser;