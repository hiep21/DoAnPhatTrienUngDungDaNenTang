import React, { useEffect, useState } from 'react';

import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { BASE_URL_Image_Icon, getByName, getImageIconGame, getInfoFileAdmin, getInfoFileNCC } from '../services/Game';
import { InfoGame, NotificationInterface } from '../services/interfaces/GameService';
import { BASE_URL_Image, getByUser, getImageIcon } from '../services/todo';
import { ImageUri, RegisterData } from '../services/interfaces/User.interface';
import BottomSheet from './Users/BottomSheet';
import * as FileSystem from 'expo-file-system';

const NotificationScreen = ({ navigation }) => {
    const user = navigation.getParam("user")
    const imageUri = navigation.getParam("imageUri")

    const [account, setAccount] = useState<RegisterData>();
    const [notification, setNotification] = useState<NotificationInterface>();
    const loadScreen = async () => {
        try {
            const response = await getByUser(user)
            setAccount(response.data[0])
            if (response.data[0].note == "Admin") {

            }
            else {

            }
        } catch (error) {
            console.log(error.response.data)
        }
    }
    let checklist: ImageUri[] = [];

    const fetchImage = async (username: string, imageName: string) => {

        let check: ImageUri = {
            username: "",
            imageUri: ""
        };


        const url = BASE_URL_Image_Icon.concat("getImage/").concat(username).concat("/").concat(imageName);

        try {
            const response = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + imageName);
            check.username = username
            check.imageUri = response.uri
            checklist.push(check)

        } catch (error) {
            console.error('Error fetching image:', error.response.data);
        }
    };
    useEffect(() => {

        loadScreen()
    }, [user, imageUri])


    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <TouchableOpacity style={{}}>
                    <Image style={{ width: 40, height: 40, }} source={{ uri: imageUri }} />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                {account?.note != "Admin" ? (
                    <View></View>
                ) : (
                    <View></View>
                )}
            </View>
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
        backgroundColor: "white",
        width: "100%",
        height: "88%",
    },

});

export default NotificationScreen;