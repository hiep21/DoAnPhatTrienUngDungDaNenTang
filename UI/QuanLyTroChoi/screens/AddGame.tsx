import React, { useEffect, useState } from 'react';

import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { InfoGame } from '../services/interfaces/GameService';
import { getByName } from '../services/Game';

const AddGame = ({ navigation }) => {

    return (
        <View style={styles.container}>

        </View>

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"

    },

});

export default AddGame;