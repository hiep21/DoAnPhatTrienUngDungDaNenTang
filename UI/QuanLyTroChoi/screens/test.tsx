import React from 'react';
import { View, Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const test = () => {
  const handlePickDocument = () => {
    const options = {
      title: 'Select Document',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled document picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log('URI: ', response.uri);
        console.log('Type: ', response.type);
        console.log('File Name: ', response.fileName);
        console.log('File Size: ', response.fileSize);
      }
    });
  };

  return (
    <View>
      <Button title="Pick Document" onPress={handlePickDocument} />
    </View>
  );
};

export default test;
