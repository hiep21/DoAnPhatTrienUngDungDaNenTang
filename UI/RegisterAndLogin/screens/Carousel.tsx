import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";

const Carousel = ({ navigation }) => {
    this.state = {
        images: [
          "https://source.unsplash.com/1024x768/?nature",
          "https://source.unsplash.com/1024x768/?water",
          "https://source.unsplash.com/1024x768/?girl",
          "https://source.unsplash.com/1024x768/?tree",
          require('../assets/games/assassins_creed/assassins_creed_1.jpg'),
        ]
      };
    return (
        <View style={styles.container}>
        <SliderBox
            images={this.state.images}
            onCurrentImagePressed={index =>
            console.warn(`image ${index} pressed`)
            }
            autoplay
            circleLoop
            style={styles.imageSlide}
        />
      </View>

    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    imageSlide:{
        borderRadius:15,
        width: '90%',
        height: '90%',
        justifyContent: 'flex-start',
        
    }
  });

export default Carousel;