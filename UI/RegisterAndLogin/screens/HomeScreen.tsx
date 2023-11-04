import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Background from './Users/Background';
import { ImageUri } from '../services/interfaces/User.interface';

const HomeScreen = ({ navigation }) => {
    const [lsUri, setLsUri] = useState<ImageUri[]>([])
    const loadToken =()=>{
        try {
            
        } catch (error) {
            
        }
    }
    useEffect(() => {
        loadToken()
        
    }, [])
    return (
        <Background>
            <View style={styles.container}>
                <Text style={styles.mainText}>Welcome to the game store</Text>
                <View>
                    <Image source={require("../assets/Icon/game2.png")} style={styles.image} />
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.buttonLogin} onPress={() => navigation.navigate('LoginScreen')}>
                        <Text style={styles.buttonText1}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonRegisterScreen} onPress={() => navigation.navigate('RegisterScreen')}>
                        <Text style={styles.buttonText2}>Signup</Text>
                    </TouchableOpacity>
                </View>


            </View>

        </Background>

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: "center",
        padding: 40
    },
    mainText: {
        fontSize: 40,
        color: "#fff",
        fontWeight: '500'
    },
    buttons: {

        alignItems: 'center',
        paddingTop: 50


    },
    buttonLogin: {
        marginBottom: 15,

        borderColor: "#000",
        padding: 8,
        borderRadius: 100,
        backgroundColor: "#27bc32",
        width: 280,
        alignItems: "center"

    },
    buttonRegisterScreen: {


        borderColor: "#000",
        padding: 8,
        borderRadius: 100,
        backgroundColor: "#fff",
        width: 280,
        alignItems: "center"
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