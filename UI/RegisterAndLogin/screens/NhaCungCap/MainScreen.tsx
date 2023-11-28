import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, FlatList, Animated, AppState } from 'react-native';
import { UpdateStateLogin, getByUser } from '../../services/todo';
import { RegisterData } from '../../services/interfaces/User.interface';


const MainScreenNCC = ({ navigation }: { navigation: any }) => {
    const username = navigation.getParam("username")
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [accountNCC, setAccountNCC] = useState<RegisterData>()


    const loadTasks = async () => {
        setRefreshing(true)
        try {
            const response = await getByUser(username)
            setAccountNCC(response.data[0])
        } catch (err: any) {
            const errorMessage = err.response
            alert(errorMessage)
        }
        setRefreshing(false)
    }
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
        if (AppState === 'background' || AppState === 'inactive') {
            updateState(false)
        }
        else {
            updateState(true)
        }
    };
    useEffect(() => {
        updateState(true)
        AppState.addEventListener('change', handleAppStateChange);
        loadTasks();
    }, [username])



    return (
        <View style={styles.container}>
            <Image style={{
                width: "100%",
                height: "100%",
                position: "absolute"
            }} source={require("../../assets/Icon/BG.jpg")} />
            <TouchableOpacity onPress={() => { navigation.navigate("ManagerGameNCC", { username: username, nameNCC: accountNCC?.name }) }}>
                <View style={styles.container}>

                    <Text style={[{ fontSize: 20, fontWeight: "900", backgroundColor: "rgba(255, 255, 255, 0.7)", padding: 10, color: "green", borderRadius: 10 }]}>
                        Chào mừng {accountNCC?.name.split(" ")[accountNCC.name.split(" ").length - 1].toLowerCase()} quay trở lại
                    </Text>

                </View>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        width: "100%",
        height: "100%",
    }
});


export default MainScreenNCC;