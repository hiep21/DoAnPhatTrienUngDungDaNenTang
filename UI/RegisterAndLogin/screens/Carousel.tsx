import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";

const Carousel = ({ navigation }) => {
    this.state = {
        images: [
          // "https://source.unsplash.com/1024x768/?nature",
          // "https://source.unsplash.com/1024x768/?water",
          // "https://source.unsplash.com/1024x768/?girl",
          // "https://source.unsplash.com/1024x768/?tree",
          require('../assets/games/assassins_creed/assassins_creed_1.jpg'),
          require('../assets/games/assassins_creed/assassins_creed_2.jpg'),
          require('../assets/games/assassins_creed/assassins_creed_3.jpg'),
          require('../assets/games/assassins_creed/assassins_creed_4.jpg'),
          
          require('../assets/games/cod/cod_1.jpg'),
          require('../assets/games/cod/cod_2.jpg'),
          require('../assets/games/cod/cod_3.jpg'),
          

          require('../assets/games/dirt_5/dirt_1.jpg'),
          require('../assets/games/dirt_5/dirt_2.jpg'),
          require('../assets/games/dirt_5/dirt_3.jpg'),

          require('../assets/games/fifa_21/fifa_1.jpg'),
          require('../assets/games/fifa_21/fifa_2.jpg'),
          require('../assets/games/fifa_21/fifa_3.jpg'),

          require('../assets/games/nba/nba_1.jpg'),
          require('../assets/games/nba/nba_2.jpg'),
          require('../assets/games/nba/nba_3.jpg'),

          require('../assets/games/spider_man/spider_man_1.jpg'),
          require('../assets/games/spider_man/spider_man_2.jpg'),
          require('../assets/games/spider_man/spider_man_5.jpg'),
          
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
        width: '95%',
        height: '100%',
        justifyContent: 'flex-start',
        marginHorizontal:10
        
    }
  });

export default Carousel;