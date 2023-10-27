import React, { useState, useEffect, useRef } from 'react';
import { View, Image, ScrollView, Dimensions, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

const images = [
  require('../../assets/games/spider_man/spider_man_1.jpg'),
  require('../../assets/games/spider_man/spider_man_2.jpg'),
  require('../../assets/games/spider_man/spider_man_3.jpg'),

  require('../../assets/games/assassins_creed/assassins_creed_1.jpg'),
  require('../../assets/games/assassins_creed/assassins_creed_2.jpg'),
  require('../../assets/games/assassins_creed/assassins_creed_4.jpg'),

  require('../../assets/games/cod/cod_1.jpg'),
  require('../../assets/games/cod/cod_2.jpg'),
  require('../../assets/games/cod/cod_3.jpg'),

];


const imageAspectRatio = 1920 / 1080;

export default function Carousel() {
  const containerHeight = width / imageAspectRatio;
  const scrollX = new Animated.Value(0);
  const scrollViewRef = useRef();

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (Math.floor(scrollX._value / width) + 1) % images.length;
      scrollViewRef.current.scrollTo({ x: nextIndex * width, animated: true });
    }, 3000); // Chuyển ảnh sau mỗi 3 giây.

    return () => {
      clearInterval(timer);
    };
  }, [scrollX]);

  const position = Animated.divide(scrollX, width);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ width, height: containerHeight }}>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }])}
          scrollEventThrottle={16}
          ref={scrollViewRef}
        >
          {images.map((source, i) => {
            return (
              <View key={i} style={{ width, height: containerHeight }}>
                <Image
                  style={{ flex: 1, width: undefined, height: undefined, borderRadius: 15, marginHorizontal: 10 }}
                  source={source}
                  resizeMode="contain" // Để không cắt ảnh
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={{ flexDirection: 'row' }}>
        {images.map((_, i) => {
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
