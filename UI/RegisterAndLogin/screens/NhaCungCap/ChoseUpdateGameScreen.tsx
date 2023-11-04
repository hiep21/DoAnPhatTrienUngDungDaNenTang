import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getById } from '../../services/Game';
import { InfoGame } from '../../services/interfaces/GameService';

const ChoseUpdateGameScreen = ({ navigation }) => {
    const user = navigation.getParam("user")
    const gameId = navigation.getParam("gameId")
    const imageUri = navigation.getParam("imageUri")
    const [game, setGame] = useState<InfoGame>()

    const getGameById = async () => {
        try {
            const { data } = await getById(gameId)
            // console.log(data)
            setGame(data[0])
        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage)
        }
    }



    useEffect(() => {
        getGameById()
    }, [gameId, imageUri, user])

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: imageUri }}
                style={styles.backgroundImage}
            />
            <View style={styles.overlay}>
                <TouchableOpacity style={styles.button}
                    onPress={() => { navigation.navigate("UpdateGameNCC", { textChange: "0", gameId, imageUri, user }) }}
                >
                    <Text style={styles.buttonText}>Cập nhật Icon</Text>
                </TouchableOpacity >
                <TouchableOpacity style={styles.button}
                    onPress={() => { navigation.navigate("UpdateGameNCC", { textChange: "1", gameId, imageUri, user }) }}
                >
                    <Text style={styles.buttonText}>Thêm hình ảnh cho trò chơi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                    onPress={() => { navigation.navigate("UpdateGameNCC", { textChange: "2", gameId, imageUri, user, tenGame: game?.tenTroChoi }) }}
                >
                    <Text style={styles.buttonText}>Ảnh trò chơi đã tải lên  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                    onPress={() => { navigation.navigate("UpdateGameNCC", { textChange: "3", gameId, imageUri, user }) }}
                >
                    <Text style={styles.buttonText}>Cập nhật file</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                    onPress={() => { navigation.navigate("UpdateGameNCC", { textChange: "3", gameId, imageUri, user }) }}
                >
                    <Text style={styles.buttonText}>Cập nhật thông tin trò chơi</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        width: '80%',
        height: '70%',
    },
    overlay: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust opacity as needed
        width: '80%',
        height: '70%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    button: {
        backgroundColor: 'red',
        width: '90%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: '900',
        fontSize: 20
    },
});
export default ChoseUpdateGameScreen;