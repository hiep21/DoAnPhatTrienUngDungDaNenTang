import React, { useState ,useEffect} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { InfoGame } from '../services/interfaces/GameService';
import { getByName } from '../services/Game';
const InfoGameScreen = ({ navigation }) => {

    const gameInfo = navigation.getParam("items")
    
    const [game, setGame] = useState<InfoGame>(gameInfo)

    // const getGameById = async() => {
    //     try {
    //         const { data } = await getById(gameId)
    //         console.log(data)
    //         setGame(data)
    //     } catch (err) {
    //         const errorMessage = err.response
    //         alert(errorMessage)
    //     }
    // }
    const nameGame = gameInfo.tenTroChoi
    console.log(nameGame)
    const deleteGame = async() =>{
        try{
            const {data} = await deleteGame(nameGame)
            setGame(data)
            navigation.navigate("ManagerGameScreen")
        } catch(err){
            const errorMessage = err.response
            alert(errorMessage)
        }
    }
    useEffect(() => {}, [ gameInfo ])
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
                <Text style={styles.underlined}> Danh sách trò chơi </Text>
            </View>
            <View style={styles.head1}>
                <View style={styles.group8}>
                    <Image style={styles._1} source={{ uri:'https://dummyimage.com/50x50/000/fff.jpg' }} />
                    <View style={styles.titleGame}>
                        <Text style={styles.buildAQueen}>
                            {game?.tenTroChoi}
                        </Text>
                        <Text style={styles.thongthuong1}>
                            {game?.moTaTroChoi}
                        </Text>
                        <Text style={styles.trangthai}>
                            Trang thái: {game?.trangThai}
                        </Text>
                        
                    </View>
                    
                </View>
                
                <View style={styles.btnGame}>
                    <TouchableOpacity style={styles.button1}>
                        <Text >Cập nhật</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} onPress={deleteGame}>
                        <Text> Gỡ khỏi kệ </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.underlined1}/>
            <View style={styles.head2}>
                <View style={styles.group7}>
                    
                    <View style={styles.thongtin}>
                        <Text style={styles.buildAQueen}>Giá cho thuê </Text>
                        <Text style={styles.thongthuong}>
                           
                        </Text>
                        <Text style={styles.thongthuong}>
                            {game?.gia} đ
                        </Text>
                        
                    </View>
                    
                </View>
                <Text style={styles.underlined2}/>
                <View style={styles.group7}>
                    
                    <View style={styles.thongtin}>
                        <Text style={styles.buildAQueen}>
                            Tuổi
                        </Text>
                        <Text style={styles.thongthuong}>
                            {game?.doTuoi}+
                        </Text>
                        <Text style={styles.thongthuong}>
                            Tuổi
                        </Text>
                        
                    </View>
                    
                </View>
                <Text style={styles.underlined2}/>
                <View style={styles.group7}>
                    
                    <View style={styles.thongtin}>
                        <Text style={styles.buildAQueen}>
                            Thể loại
                        </Text>
                        <Text style={styles.thongthuong}>
                            
                        </Text>
                        <Text style={styles.thongthuong}>
                            {game?.theLoai}
                        </Text>
                        
                    </View>
                    
                </View>
                <Text style={styles.underlined2}/>
                <View style={styles.group7}>
                    
                    <View style={styles.thongtin}>
                        <Text style={styles.buildAQueen}>
                            kích cỡ
                        </Text>
                        <Text style={styles.thongthuong}>
                            {game?.kichCoFile}
                        </Text>
                        <Text style={styles.thongthuong}>
                           MB
                        </Text>
                        
                    </View>
                    
                </View>
                
                
            </View>
            <Text style={styles.underlined1}/>
            <View style={styles.thongtinchitiet}>
                <Text style={styles.txtthongtinchitiet}>
                    {game?.moTaTroChoi}
                </Text>
                <Text style={styles.txtthongtinchitiet}>
                    {game?.gioiThieuTroChoi}
                </Text>
                
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
        borderBottomColor: "#000",
        width:420,
        fontSize: 15,
        fontWeight: "500",
        paddingLeft: 30,
        paddingTop:10,
        
        
    },
    underlined1:{
        borderBottomWidth: 2,
        borderBottomColor: "#D9D9D9",
        width:420,
        fontSize: 15,
        fontWeight: "500",
        paddingLeft: 30,
    },
    underlined2:{
        borderRightWidth: 2,
        borderRightColor: "#5555",
        height:30,
        marginTop:20,
        
    },
    group7: {
        paddingTop:10,
        flexDirection: 'row',  
        alignItems:'center',
        

    },
    group8: {
        paddingTop: 20,
        flexDirection: 'row',  
        alignItems:'center',
        

    },
    _1: {
        width:50,
        height:50,
        borderRadius: 10,
        
    },
    buildAQueen: {
        fontSize: 14,
        fontWeight: "400",
        
    },
    thongthuong: {
        
        
        fontSize: 13,
        fontWeight: "400",
        
    },
    thongthuong1: {
        
        
        fontSize: 10,
        fontWeight: "400",
        
    },
    trangthai: {
        
        fontSize: 10,
        fontWeight: "400",
    },
    thongtin:{
        justifyContent:'center',
        width:80,
        alignItems:'center',
        
        
    },
    thongtinchitiet:{
        justifyContent:'center',
        width:300,
        
    },
    txtthongtinchitiet:{
        paddingTop:10,

    },
    titleGame:{
        paddingLeft:5,
        width:100
        
    },
    btnGame:{
        alignItems:'center',
        paddingTop:5,
        
    },
    button1: {
        
        backgroundColor: "#6C9EFF",
        marginBottom: 5,
        width: 80,
        alignItems: "center",
        borderRadius:5,
        padding:2
    },
    button2: {
        borderRadius:5,
        backgroundColor: "#FF6C6C",
        marginBottom: 5,
        width: 80,
        alignItems: "center",
        padding:2,
        
    },
    head1: {
        width: "100%",
        height: 60,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop:10,
        
    },
    head2: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems:'center',
    },
    head3: {
        justifyContent: 'space-between',
        alignItems:'center',
    },


})

export default InfoGameScreen;