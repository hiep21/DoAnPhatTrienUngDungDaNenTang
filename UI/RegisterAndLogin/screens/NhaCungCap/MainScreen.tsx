import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';


const MainScreenNCC = ({ navigation }) => {
    const user = navigation.getParam("user")
    const [refreshing, setRefreshing] = useState<boolean>(false)

    useEffect(() => {

    }, [user])
    const goToDetail = (item: InfoGame) => {
        navigation.navigate("InfoGameScreen", { gameId: item.id })
    }



    return (
        <View style={styles.container}>


        </View>


    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        justifyContent: 'flex-start',
        width: "100%",

        backgroundColor: "#fff"

    }

})

export default MainScreenNCC;