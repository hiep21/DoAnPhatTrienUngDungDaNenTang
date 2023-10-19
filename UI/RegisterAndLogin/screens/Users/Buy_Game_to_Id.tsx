import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Button, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { InfoGame } from '../../services/interfaces/GameService';
import { deleteApi, getById, getByName } from '../../services/Game';
import BottomSheet from "./BottomSheet";

const Buy_Game_to_Id = ({ navigation }) => {

    const gameId = navigation.getParam("gameId")
    const tenTroChoi = navigation.getParam("tenTroChoi")
    const [game, setGame] = useState<InfoGame>()
    const [checks, setChecks] = useState<boolean>(false)
    const [selectedAmount, setSelectedAmount] = useState(null);

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
    // const gia10$ = () => {
    //     setChecks(false)
    // }
    // const gia20$ = () => {
    //     setChecks(true)
        
    // }
    
    // const gia30$ = () => {
    //     setChecks(true)
    // }
    // const gia40$ = () => {
    //     setChecks(true)
    // }
    // const gia50$ = () => {
    //     setChecks(true)
    // }
    // const gia60$ = () => {
    //     setChecks(true)
    // }
    const handleAmountSelection = (amount) => {
        setSelectedAmount(amount);
        console.log(selectedAmount)
    };


    useEffect(() => {
        getGameById()
    }, [gameId, tenTroChoi])
    
    return (
        <View style={styles.container}>
            <Text style={{
                    textAlign: 'left',
                    paddingLeft: 30,
                    borderBottomWidth: 1.5,
                    fontSize: 17,
                    

                }}>Chọn mệnh giá tạo mã QR để thanh toán</Text>
            <View style={styles.head}>
                <TouchableOpacity
                    style={[
                        styles.search,
                        selectedAmount === 10 && styles.search1,
                    ]}
                    onPress={() => handleAmountSelection(10)}
                >
                    <Text>10$</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.search,
                        selectedAmount === 20 && styles.search1,
                    ]}
                    onPress={() => handleAmountSelection(20)}
                >
                    <Text>20$</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.search,
                        selectedAmount === 30 && styles.search1,
                    ]}
                    onPress={() => handleAmountSelection(30)}
                >
                    <Text>30$</Text>
                </TouchableOpacity>
                
            </View>
            <View style={styles.head1}>
                <TouchableOpacity
                    style={[
                        styles.search,
                        selectedAmount === 40 && styles.search1,
                    ]}
                    onPress={() => handleAmountSelection(40)}
                >
                    <Text>40$</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.search,
                        selectedAmount === 50 && styles.search1,
                    ]}
                    onPress={() => handleAmountSelection(50)}
                >
                    <Text>50$</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.search,
                        selectedAmount === 60 && styles.search1,
                    ]}
                    onPress={() => handleAmountSelection(60)}
                >
                    <Text>60$</Text>
                </TouchableOpacity>
                
            </View>
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
                        <Text>{selectedAmount} $</Text>
                    </View>
                    <Text style={{borderBottomWidth: 1,}}/>
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
                        backgroundColor: selectedAmount ? "#FF6C6C" : "#ccc", // Vô hiệu hóa nút khi selectedAmount là null
                        marginTop: 20,
                        justifyContent: 'center',
                        borderRadius: 5,
                    }}
                    onPress={() => {
                        if (selectedAmount) {
                            // Xử lý logic thanh toán
                            setChecks(true);
                        } else {
                            // Hiển thị thông báo hoặc xử lý trường hợp khi không có mệnh giá nào được chọn
                            alert('Vui lòng chọn một mệnh giá để tiếp tục.');
                        }
                    }}>
                    <Text style={{ textAlign: 'center' }}>
                        {selectedAmount ? "Xử lý thanh toán" : "Chọn một mệnh giá"}
                    </Text>
                </TouchableOpacity>
                ):( 
                <TouchableOpacity style={{
                    height: 45,
                    
                    backgroundColor: "#FF6C6C",
                    marginTop: 20,
                    justifyContent: 'center',
                    borderRadius: 5,
                
                }} onPress={()=>{setChecks(false); navigation.navigate('ManagerGameUser')}}>
                    
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