import React from 'react';
import {View, ImageBackground, Image} from 'react-native';

const Background = ({ children }) => {
  return (
    <View>
      <ImageBackground source={require('../assets/BG.jpg')} style={{ height: '100%' }} />
      <View style={{ position: "absolute" }}>
        {children}
      </View>
    </View>
  );
}

export default Background;