import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';

const DownloadApkComponent = () => {
  const [error, setError] = useState(null);
    const fileName = "game1.apk";
  const downloadApk = async () => {
    const apkUrl = 'http://26.115.177.223:5221/ApkFiles/getFile/'.concat(fileName); // Thay thế bằng URL của tệp APK bạn muốn tải về

    try {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      if (status === 'granted') {
        const downloadResumable = FileSystem.createDownloadResumable(
          apkUrl,
          FileSystem.documentDirectory + fileName
        );

        const { uri } = await downloadResumable.downloadAsync();
        await MediaLibrary.createAssetAsync(uri);
        
        setError(null); // Xóa lỗi nếu có
        console.log('APK downloaded successfully:', uri);
      } else {
        setError('Permission denied. Please allow access to Media Library.');
      }
    } catch (error) {
      console.error('Error downloading APK:', error);
      setError('Error downloading APK');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={downloadApk}>
        <Text>Download APK</Text>
      </TouchableOpacity>
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

export default DownloadApkComponent;
