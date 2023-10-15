import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import { getByUser } from '../../services/todo';
import { RegisterData } from '../../services/interfaces/User.interface';

const ChangeInfo = ({ navigation }) => {
    const user = navigation.getParam("user")
    const [users, setUsers] = useState<RegisterData>();
    const loadTasks = async () => {
        // try {
        //     const { data } = await getByUser(user)

        //     setUsers(data[0])

        // } catch (err) {
        //     const errorMessage = err.response
        //     alert(errorMessage)
        // }

    }

    useEffect(() => {
        loadTasks()
    }, [user])
    return (

        <View style={styles.container}>
            <Text>test</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: '100%',

    },


})

export default ChangeInfo;