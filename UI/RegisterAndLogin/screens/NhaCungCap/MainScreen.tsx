import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, FlatList, Animated } from 'react-native';
import { getByUser } from '../../services/todo';
import { RegisterData } from '../../services/interfaces/User.interface';
import Background from '../Users/Background';


const MainScreenNCC = ({ navigation }) => {
    const user = navigation.getParam("user")
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [userNCC, setUserNCC] = useState<RegisterData>()


    const loadTasks = async () => {
        setRefreshing(true)
        try {
            const response = await getByUser(user)
            setUserNCC(response.data[0])
        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage)
        }
        setRefreshing(false)
    }

    useEffect(() => {
        loadTasks();
    }, [user])



    return (
        <Background>
            <TouchableOpacity onPress={() => { navigation.navigate("ManagerGameNCC", { user: user, nameNCC:userNCC?.name }) }}>
                <View style={styles.container}>

                    <Text style={[{ fontSize: 20, fontWeight: "900", backgroundColor: "rgba(255, 255, 255, 0.7)", padding: 10, color: "green" }]}>
                        Chào mừng {userNCC?.name.split(" ")[userNCC.name.split(" ").length - 1].toLowerCase()} quay trở lại
                    </Text>

                </View>
            </TouchableOpacity>
        </Background>


    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        width: 300,
        height: 500,
        margin: 30,
    }
});


export default MainScreenNCC;