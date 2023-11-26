import React, { useState, useEffect, useRef } from 'react';
import { View, Image, ScrollView, Dimensions, Animated, TouchableOpacity } from 'react-native';

import { getGameManager } from '../../services/todo';
import { string } from 'yup';
const { width, height } = Dimensions.get('window');

// const images = [
//   require('../../assets/games/spider_man/spider_man_1.jpg'),
//   require('../../assets/games/spider_man/spider_man_2.jpg'),
//   require('../../assets/games/spider_man/spider_man_3.jpg'),

//   require('../../assets/games/assassins_creed/assassins_creed_1.jpg'),
//   require('../../assets/games/assassins_creed/assassins_creed_2.jpg'),
//   require('../../assets/games/assassins_creed/assassins_creed_4.jpg'),

//   require('../../assets/games/cod/cod_1.jpg'),
//   require('../../assets/games/cod/cod_2.jpg'),
//   require('../../assets/games/cod/cod_3.jpg'),

// ];


const imageAspectRatio = 1920 / 1080;

export default function Carousel({ listImageUri, username, navigation }: { listImageUri: any, username: any, navigation: any }) {
  const containerHeight = width / imageAspectRatio;
  const scrollX = new Animated.Value(0);
  const scrollViewRef = useRef();

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (Math.floor(scrollX._value / width) + 1) % listImageUri.length;
      scrollViewRef.current.scrollTo({ x: nextIndex * width, animated: true });
    }, 3000); // Chuyển ảnh sau mỗi 3 giây.

    return () => {
      clearInterval(timer);
    };
  }, [scrollX, listImageUri, username]);

  const CheckBuyAndInstall = async (id: string, nameFile: string, imageUri: string) => {
    try {
      const { data } = await getGameManager(username);
      const GameCheck = [];

      for (let index = 0; index < data.length; index++) {
        if (data[index].nameGame == nameFile) {
          GameCheck.push(data[index]);
        }
      }

      if (GameCheck.length == 0) {
        navigation.navigate("InfoGame_dont_Install", { gameId: id, username, imageGameUri: imageUri });
      } else {
        navigation.navigate("InfoGameScreen", { gameId: id, gameManager: GameCheck[0], installGame: GameCheck[0].isInstall, imageGameUri: imageUri });
      }
    } catch (error: any) {
      if (error.response.data == "Tài khoản " + username + " chưa mua với tải game") {
        navigation.navigate("InfoGame_dont_Install", { gameId: id, username, imageGameUri: imageUri });
      } else {
        console.log(error.response.data);
      }
    };
  }
  // const CheckBuyAndInstall = async ()=> {

  //   navigation.navigate("InfoGame_dont_Install")
  // }
  const position = Animated.divide(scrollX, width);

  return (
    <View style={{
      flex: 1,
      marginTop: 30
    }}>
      <View style={{ width, height: containerHeight }}>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}

          scrollEventThrottle={16}
          ref={scrollViewRef}
        >
          {listImageUri.map((image, i) => {
            return (
              <TouchableOpacity key={i} onPress={() => CheckBuyAndInstall(image.id, image.nameFile, image.imageUri)} style={{ width, height: containerHeight }}>
                <Image
                  style={{ flex: 1, width: undefined, height: undefined, borderRadius: 15, marginHorizontal: 10 }}
                  source={{ uri: image.imageUri }}
                  resizeMode="contain" // Để không cắt ảnh
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {listImageUri.map((_, i) => {
          let opacity = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp'
          });
          return (
            <Animated.View
              key={i}
              style={{ marginTop: 10, opacity, height: 10, width: 10, backgroundColor: '#595959', marginHorizontal: 8, borderRadius: 5 }}
            />
          );
        })}
      </View>
    </View>
  );
}
