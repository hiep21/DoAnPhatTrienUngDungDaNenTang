import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Background from './Background';

const MainScreen = ({ navigation }) => {

    return (
        <Background>
            <View style={styles.container}>
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

})

export default MainScreen;