import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Background from './Users/Background';
import { ImageUri } from '../services/interfaces/User.interface';
import { BASE_URL_Image, getAllImage } from '../services/Game';
import * as FileSystem from 'expo-file-system';

const HomeScreen = ({ navigation }) => {
    const loadToken = async () => {
        try {
            const response = await getAllImage();

            for (let i = 0; i < response.data.length; i++) {


                await fetchImage(response.data[i].imagePath, response.data[i].imageName)

            }
            setListImageUri(checklist)
            // console.log(checklist)
        } catch (error) {
            console.log(error.response)
        }
    }
    const [listImageUri, setListImageUri] = useState<ImageUri[]>([])
    let checklist: ImageUri[] = [];
    const fetchImage = async (username: string, imageName: string) => {

        let check: ImageUri = {
            username: "",
            imageUri: ""
        };
        const url = BASE_URL_Image.concat("getImage/").concat(username).concat("/").concat(imageName);

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
        loadToken()

    }, [])
    return (
        <View style={styles.container}>
            <Image style={{
                width: "100%",
                height: "100%",
                position: "absolute"
            }} source={require("../assets/Icon/BG.jpg")} />
            <Text style={styles.mainText}>Welcome to the game store</Text>
            <View>
                <Image source={require("../assets/Icon/game2.png")} style={styles.image} />
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.buttonLogin} onPress={() => navigation.navigate('LoginScreen', { listImageUri })}>
                    <Text style={styles.buttonText1}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonRegisterScreen} onPress={() => navigation.navigate('RegisterScreen', { listImageUri })}>
                    <Text style={styles.buttonText2}>Signup</Text>
                </TouchableOpacity>
            </View>


        </View>



    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: "100%",
        height: "100%"

    },
    mainText: {
        fontSize: 40,
        color: "#fff",
        fontWeight: '500',
        width: "80%",
        height: "20%",
        marginTop: "25%",
        textAlign: "center"
    },
    buttons: {

        alignItems: 'center',
        paddingTop: 50,
        width: "70%",
        height: "11%"


    },
    buttonLogin: {
        marginBottom: 15,

        borderColor: "#000",
        padding: 8,
        borderRadius: 100,
        backgroundColor: "#27bc32",
        width: "100%",
        alignItems: "center",
        height: "100%",
        justifyContent: 'center'

    },
    buttonRegisterScreen: {
        borderColor: "#000",
        padding: 8,
        borderRadius: 100,
        backgroundColor: "#fff",
        width: "100%",
        alignItems: "center",
        height: "90%"
    },
    buttonText1: {
        fontWeight: 'bold',
        fontSize: 15,
        color: "#fff"
    },
    buttonText2: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#1c9124'
    },
    image: {

        width: 250,
        height: 200
    }

})

export default HomeScreen;