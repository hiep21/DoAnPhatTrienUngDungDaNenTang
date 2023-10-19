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
    const gia10$ = () => {
        setChecks(false)
    }
    const gia20$ = () => {
        setChecks(true)
        
    }
    
    const gia30$ = () => {
        setChecks(true)
    }
    const gia40$ = () => {
        setChecks(true)
    }
    const gia50$ = () => {
        setChecks(true)
    }
    const gia60$ = () => {
        setChecks(true)
    }


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
                {!checks ? (
                    <TouchableOpacity style={styles.search1} >
                        <Text>10$</Text>
                    </TouchableOpacity>
                ) : (<Text>
                        <TouchableOpacity style={styles.search}
                            onPress={gia10$}>
                            <Text>10$</Text>
                        </TouchableOpacity>
                    </Text>)}
                {!checks ? (
                    <TouchableOpacity style={styles.search} >
                        <Text>20$</Text>
                    </TouchableOpacity>
                ) : (<Text>
                    <TouchableOpacity style={styles.search1}
                        onPress={gia20$}>
                        <Text>20$</Text>
                    </TouchableOpacity>
                </Text>)}
                <TouchableOpacity style={styles.search}>
                    <Text style={{ alignItems:'center',justifyContent:'center' }}>30$</Text>
                </TouchableOpacity>
                
            </View>
            <View style={styles.head1}>
                <TouchableOpacity style={styles.search}>
                    <Text style={{ alignItems:'center',justifyContent:'center' }}>40$</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.search}>
                    <Text style={{ alignItems:'center',justifyContent:'center' }}>50$</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.search}>
                    <Text style={{ alignItems:'center',justifyContent:'center' }}>60$</Text>
                </TouchableOpacity>
                
            </View>
            <View style={styles.body}>
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
                    <Text>Phương thức thanh toán</Text>
                    <Text>QR Pay</Text>
                </View>
                <Text style={{borderBottomWidth: 1,}}/>
                
            </View>
            <View style={styles.end}>
                <TouchableOpacity style={{
                    height: 45,
                    width: "98%",
                    backgroundColor: "#FF6C6C",
                    marginTop: 80,
                    justifyContent: 'center',
                    borderRadius: 5,
                    
                }} >
                    <Text style={{ textAlign: 'center' }}>Xử lý thanh toán</Text>
                </TouchableOpacity>
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
        width: "100%",
        height: 40,
        justifyContent:'center',
        flexDirection: 'row',
        paddingTop: 30,

    },
    head1: {
        
        height: 40,
        justifyContent:'center',
        flexDirection: 'row',
        paddingTop: 30,

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
        marginLeft: "20%"
    },
    body: {
        backgroundColor: "white",
        width: "100%",
        height: "40%",
        marginTop: 20,
        justifyContent:'center',

    },
    describeGame: {

        height: 17,
        width: "85%",
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
        width: "95%",
        height: 260,
        marginHorizontal:15,

    }


})

export default Buy_Game_to_Id;