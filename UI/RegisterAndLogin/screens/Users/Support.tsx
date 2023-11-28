import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, AppState } from 'react-native';
import { UpdateStateLogin } from '../../services/todo';


const SupportUser = ({ navigation }: any) => {
    const username = navigation.getParam("username")
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
    }, [username])
    return (
        <View style={styles.container}>
            <Image style={{
                width: "100%",
                height: "100%",
                position: "absolute"
            }} source={require("../../assets/Icon/BG.jpg")} />
            <View style={{
                backgroundColor: "#fff",
                alignSelf: "center",
                height: "50%",
                width: "80%",
                borderRadius: 10,
                padding: 20
            }}>
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


        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center"
    },
})

export default SupportUser;