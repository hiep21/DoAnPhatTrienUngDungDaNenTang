import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

const Test = () => {
  const [documentUri, setDocumentUri] = useState(null);

  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Chấp nhận tất cả các loại tài liệu
      });
      console.log(result);
      if (result.type === 'success') {
        // Gửi tài liệu lên API nếu người dùng chọn tài liệu thành công
        
      } else {
        console.log('Chưa chọn tài liệu.');
      }
    } catch (error) {
      console.error('Lỗi khi chọn tài liệu:', error);
    }
  };




  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Chọn tài liệu" onPress={pickDocument} />
      {documentUri && <Text>Tài liệu đã chọn: {documentUri}</Text>}
    </View>
  );
};

export default Test;
