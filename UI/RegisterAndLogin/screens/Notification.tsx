import React, { useEffect, useState } from 'react';

import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';



const NotificationScreen = ({ navigation }) => {
    const userName = navigation.getParam("userName")
    const notification = navigation.getParam("notification")
    const imageUri = navigation.getParam("imageUri")

    const loadScreen = async () => {

    }

    useEffect(() => {
        loadScreen()
    }, [userName, notification, imageUri])


    return (
        <View style={styles.container}>

            {imageUri &&
                <View style={styles.head}>

                    <TouchableOpacity style={{}}>
                        <Image style={{ width: 40, height: 40, }} source={{ uri: imageUri }} />
                    </TouchableOpacity>
                    <View style={{
                        justifyContent: "center",
                        paddingLeft: 10
                    }}>
                        <Text>{notification.nameGame}</Text>
                    </View>
                </View>
            }
            <View style={styles.body}>

                {notification.forAccount == "NCC" ? (
                    <View>
                        {notification.result == true ?
                            (
                                <View>
                                    <Text style={{ alignSelf: 'center' }}>Trò chơi của bạn đã được chấp nhận bạn có thể cập nhật trò chơi của mình</Text>
                                </View>
                            ) : (
                                <View>
                                    <Text style={{ alignSelf: 'center', paddingBottom: 10 }}>Lý do từ chối</Text>
                                    <Text>{notification.reason}</Text>
                                </View>
                            )
                        }
                    </View>
                ) : (
                    <View >

                        <Text>{notification.reason}</Text>
                    </View>
                )}

            </View >
        </View >

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    head: {
        width: "80%",
        height: "10%",
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: 10,
        alignSelf: 'center'
    },

    body: {
        borderRadius: 10,
        borderWidth: 1,
        marginHorizontal: "5%",
        marginTop: 10,
        alignItems: "center",
        paddingVertical: 20
    },

});

export default NotificationScreen;