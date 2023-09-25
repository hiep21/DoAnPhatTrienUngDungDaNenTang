import React, { useEffect, useState } from 'react';

import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
export interface testdataItem {
    item: string
    number: string
}
const ManagerGameScreen = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const testData = [
        {
            item: "hiep",
            number: "10"
        }
    ]

    const loadTasks = async () => {
        setRefreshing(true)
        try {
            console("thành công")
        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage)
        }
        setRefreshing(false)
    }

    useEffect(() => {
        loadTasks()
    }, [])

    const renderTask = ({ item }: { item: testdataItem }) => {
        return (
            <View>
                <Text>{item.item}</Text>
                <Text>{item.number}</Text>
            </View>

        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <View style={styles.search}>
                    <Image style={{ width: 20, height: 20, marginTop: 7 }} source={require("../assets/favicon.png")} />
                    <TextInput placeholder='Tìm kiếm trò chơi' />
                    <TouchableOpacity>
                        <Image style={{ width: 20, height: 20, marginTop: 7 }} source={require("../assets/favicon.png")} />
                    </TouchableOpacity>
                </View>

                <View style={styles.user}>
                    <TouchableOpacity style={{ paddingRight: 10, paddingTop: 5 }}>
                        <Image style={{ width: 30, height: 30, }} source={require("../assets/favicon.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingRight: 10, paddingTop: 5 }}>
                        <Image style={{ width: 30, height: 30, }} source={require("../assets/favicon.png")} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bođy}>
                <FlatList
                    data={testData}
                    renderItem={(list) => renderTask(list)}
                    onRefresh={loadTasks}
                    refreshing={refreshing}
                />
            </View>
            <View style={styles.end}></View>
        </View>

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 40,

    },
    head: {
        backgroundColor: "red",
        width: "120%",
        height: 40,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    search: {
        width: 200,
        height: 35,
        backgroundColor: "#bbb",
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderRadius: 20,

    },
    user: {
        flexDirection: 'row',
    },

});

export default ManagerGameScreen;