import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRScannerScreen = () => {
    const qrData = {
        title: 'Nội dung của mã QR',
        buttonText: 'Nhấn Để Xác Nhận'
    };

    const handleButtonPress = () => {
        // Xử lý sự kiện khi nút được nhấn
        alert('Đã xác nhận!');
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <QRCode value={JSON.stringify(qrData)} size={200} />
            <TouchableOpacity onPress={handleButtonPress} style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 18, color: 'blue' }}>{qrData.buttonText}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default QRScannerScreen;
