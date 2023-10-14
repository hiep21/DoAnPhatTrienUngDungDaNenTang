import React, { useState } from 'react';
import { Button, View, Text, TouchableOpacity, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import { postImage } from '../services/Game';

const Test = () => {
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
        copyToCacheDirectory: false, // Tránh sao chép tệp vào thư mục bộ nhớ cache của ứng dụng
      });
      setImage(result);
    } catch (error) {
      console.error('Lỗi khi chọn hình ảnh:', error);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      console.error('Chưa chọn hình ảnh.');
      return;
    }

    try {
      const response = await postImage(image.assets[0].uri, image.assets[0].name, "game1")

      console.log('Upload success:', response.data);
    } catch (error) {
      console.error('Upload failed:', error.response.data);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      <Button title="Tải Lên Ảnh" onPress={uploadImage} />
    </View>
  );
};

export default Test;
