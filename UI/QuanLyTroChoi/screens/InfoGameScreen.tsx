import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';

const InfoGameScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <View style={styles.search}>
                    <Image style={{ width: 20, height: 20, marginTop: 7 }} source={require("../assets/favicon.png")} />
                    <TextInput placeholder='Tìm kiếm trò chơi' />
                    <TouchableOpacity>
                        <Image style={{ width: 20, height: 20, marginTop: 7 }} source={require("../assets/favicon.png")} />
                    </TouchableOpacity>
                </View>
                <View style={styles.user}>
                    <TouchableOpacity style={{ paddingRight: 10, paddingTop: 5 }}>
                        <Image style={{ width: 30, height: 30, }} source={require("../assets/favicon.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingRight: 10, paddingTop: 5 }}>
                        <Image style={{ width: 30, height: 30, }} source={require("../assets/favicon.png")} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.title}>
                <Text style={styles.underlined}> Danh sách trò chơi</Text>
            </View>
            <View style={styles.group7}>
                <Image style={styles._1} source={{ uri: /* dummy image */ 'https://dummyimage.com/50x50/000/fff.jpg' }} />
                <View style={styles.titleGame}>
                    <Text style={styles.buildAQueen}>
                        {`Build A Queen`}
                    </Text>
                    <Text style={styles.thongthuong}>
                        {`Thông thường`}
                    </Text>
                    <Text style={styles.trangthai}>
                        {`Trạng thái: Đã phê duyệt`}
                    </Text>
                </View>
            </View>

        </View>

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding:20,
        justifyContent:'flex-start',
        width:"90%",
        marginHorizontal: 25
        
    },
    search: {
        width: 200,
        height: 35,
        backgroundColor: "#bbb",
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderRadius: 20,

    },
    head: {
        
        width: "120%",
        height: 40,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    user: {
        flexDirection: 'row',
    },
    danhsachtrochoi: {
        fontSize: 15,
        fontWeight: "500",
        marginLeft:20,
        paddingTop:20
        
    },
    title:{
        justifyContent:'flex-start',
        width:"100%",
        marginRight: 100
    },
    underlined:{
        borderBottomWidth: 1,
        borderBottomColor: "000",
        width:420,
        fontSize: 15,
        fontWeight: "500",
        paddingLeft: 30,
        paddingTop:20,
        
        
    },
    group7: {
        paddingTop: 20,
        flexDirection: 'row',  
        justifyContent:'flex-start',
        width:"80%",
        alignItems:'center',

        
        
    },
    _1: {
        width:50,
        height:50,
        borderRadius: 10,
        
        
    },
    buildAQueen: {
        fontFamily: "Inter",
        fontSize: 12,
        fontWeight: "400",
        
    },
    thongthuong: {
        
        fontFamily: "Inter",
        fontSize: 10,
        fontWeight: "400",
        
    },
    trangthai: {
        fontFamily: "Inter",
        fontSize: 10,
        fontWeight: "400",
    },
    thongtin:{

    },
    titleGame:{

    }

})

export default InfoGameScreen;