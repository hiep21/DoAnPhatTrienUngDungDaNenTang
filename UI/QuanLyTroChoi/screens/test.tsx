import React, { useEffect, useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { BASE_URL_Image } from '../services/Game';

const test = () => {
  const [filename, setFilename] = useState('game1.apk');
  const [imageName, setImageName] = useState('8.png');
  const [imageUri, setImageUri] = useState(null);
  const [error, setError] = useState(null);

  const fetchImage = async () => {
    
    const url = BASE_URL_Image.concat('getImage/').concat(filename).concat('/').concat(imageName);

    try {
      const response = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + imageName);
      setImageUri(response.uri);
    } catch (error) {
      console.error('Error fetching image:', error);
      setError('Error fetching image');
    }
   
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Enter filename"
        onChangeText={(text) => setFilename(text)}
        value={filename}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Enter image name"
        onChangeText={(text) => setImageName(text)}
        value={imageName}
      />
      <TouchableOpacity onPress={fetchImage}>
        <Text>Load Image</Text>
      </TouchableOpacity>
      {error ? <Text>{error}</Text> : null}
      {imageUri ? <Image source={{ uri: imageUri, width: 200, height: 200 }} /> : null}
    </View>
  );
};


export default test;
