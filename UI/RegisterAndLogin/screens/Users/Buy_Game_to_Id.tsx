import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Button, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { InfoGame } from '../../services/interfaces/GameService';
import { deleteApi, getById, getByName } from '../../services/Game';
import BottomSheet from "./BottomSheet";
import { CreateGameManager } from '../../services/todo';
import { GameManager } from '../../services/interfaces/User.interface';

const Buy_Game_to_Id = ({ navigation }) => {

    const gameId = navigation.getParam("gameId")
    const username = navigation.getParam("user")
    const [game, setGame] = useState<InfoGame>()
    const [checks, setChecks] = useState<boolean>(false)
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [create, setCreate] = useState<GameManager>({
        username:"",
        nameGame:"",
        isBuy:false,
        isInstall:false
    });
    const getGameById = async () => {
        try {
            const { data } = await getById(gameId)
            // console.log(data)
            setGame(data[0])

        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage)
        }
    }

    const handleAmountSelection = (amount) => {
        setSelectedAmount(amount);
        console.log(selectedAmount)
    };
    const buyGame = async ()=>{
        setChecks(false)
        await setCreate({
            username:username,
            nameGame:game?.tenTroChoi,
            isBuy:true,
            isInstall:false
        })
        console.log(create)
        try {
            
            await CreateGameManager(create)
            alert("Mua thành công")
            navigation.navigate('ManagerGameUser',{user :username})
        } catch (error) {
            console.log(error.response.data)
           alert("Quét mã không thành công xin vui lòng thử lại")
        }
      
    }

    useEffect(() => {
        getGameById()
    }, [gameId,username])
    
    return (
        <View style={styles.container}>
            <View style={styles.body}>
              {!checks ? (
                <View>
                    <Text style={{
                    textAlign: 'left',
                    padding: 30,
                    borderBottomWidth: 1,
                    fontSize: 17,
                    paddingTop: 60

                    }}>Chi tiết giao dịch</Text>
                    <View style={styles.describeGame}>
                        <Text>Sản phẩm được chọn</Text>
                        <Text>{game?.tenTroChoi}</Text>
                    </View>
                    <Text style={{borderBottomWidth: 1,}}/>
                    <View style={styles.describeGame}>
                        <Text>Giá tiền</Text>
                        <Text>{game?.gia} $</Text>
                    </View>
                    <Text style={{borderBottomWidth: 1}}/>
                    <View style={styles.describeGame}>
                        <Text>Phương thức thanh toán</Text>
                        <Text>QR Pay</Text>
                    </View>
                    <Text style={{borderBottomWidth: 1,}}/>
                </View>
              ):(
                <View>
                    <Text style={{
                    textAlign: 'center',
                    
                    
                    fontSize: 17,
                    paddingTop: 10

                    }}>Quét mã QR dưới đây bằng ứng dụng Internet Banking để thanh toán</Text>
                    <View style={styles.image}>
                        <Image style={{ width: 160, height: 160,borderRadius:15 }} source={require('../../assets/Icon/2.png')} />
                    </View>
                    <View style={styles.image}>
                        <Text>Lưu ý: Mã QR sẽ hết hạn trong 24 giờ </Text>
                    </View>
                    <View style={styles.image}>
                        <Text>Sau khi thanh toán nhấp vào nút bên dưới </Text>
                    </View>
                    
                </View>
              )}
                
            </View>
            <View style={styles.end}>
            {!checks? ( 
                <TouchableOpacity
                    style={{
                        height: 45,
                        backgroundColor:  "#FF6C6C", // Vô hiệu hóa nút khi selectedAmount là null
                        marginTop: 20,
                        justifyContent: 'center',
                        borderRadius: 5,
                    }}onPress={()=>{setChecks(true)}}>
                    <Text style={{ textAlign: 'center' }}>
                        Xử lý thanh toán
                    </Text>
                </TouchableOpacity>
                ):( 
                <TouchableOpacity style={{
                    height: 45,
                    
                    backgroundColor: "#FF6C6C",
                    marginTop: 20,
                    justifyContent: 'center',
                    borderRadius: 5,
                
                }} onPress={()=>{buyGame()}}>
                    
                    <Text style={{ textAlign: 'center' }}>Tôi đã hoàn tất thanh toán trên app</Text>
                </TouchableOpacity>
            )}
            </View>
        </View>


    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop:20,
        width: "100%",
        
    },
    head: {
        
        height: 70,
        justifyContent:'center',
        flexDirection: 'row',
        paddingTop: 20,
        //backgroundColor: "#FF6C6C",

    },
    head1: {
        
        height: 60,
        justifyContent:'center',
        flexDirection: 'row',
        paddingTop: 10,
        //backgroundColor: "blue",
    },
    search: {
        width: 80,
        height: 30,
        backgroundColor: "#bbb",
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 20,
        marginLeft: "5%",

    },
    search1: {
        width: 80,
        height: 30,
        backgroundColor: "#7FFF00",
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 20,
        marginLeft: "5%",

    },
    user: {
        flexDirection: 'row',
        marginLeft: "20%",
        
    },
    body: {
        //backgroundColor: "#7FFF00",
        justifyContent:'center',

    },
    describeGame: {

        height: 17,
        //alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 17,
        marginHorizontal: 20,
        
    },
    itemInfo: {

        width: 70,
        height: 40,
        alignItems: 'center'

    },
    end: {
        
        marginHorizontal:15,

    },
    image:{
        justifyContent:'center',
        alignItems:'center',
        paddingTop: 10
    }


})

export default Buy_Game_to_Id;