import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput,ScrollView ,FlatList} from 'react-native';
import Background from './Background';
import { SliderBox } from "react-native-image-slider-box";
import Carousel from './Carousel';
import { InfoGame } from '../services/interfaces/GameService';
import { getByName } from '../services/Game';
import BottomSheet from "./BottomSheet";

const MainScreen = ({ navigation }) => {
    
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [listGame, setListGame] = useState<InfoGame[]>([])

    const loadTasks = async () => {
        setRefreshing(true)
        try {
            const { data } = await getByName()
            // console.log(data)
            setListGame(data)

        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage)
        }
        setRefreshing(false)
    }

    useEffect(() => {
        loadTasks()
    }, [])
    const goToDetail = (item: InfoGame) => {
        navigation.navigate("InfoGameScreen", { gameId: item.id })
    }

    const renderTask = ({ item }: { item: InfoGame }) => {
        return (
            <TouchableOpacity onPress={() => { goToDetail(item) }}>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: "5%",
                    marginTop: 20,


                }}>
                    <Image style={{ width: 50, height: 50, borderRadius: 5 }} source={require("../assets/games/cod/cod_1.jpg")} />
                    <View style={{
                        marginLeft: 15,
                        width: "70%"
                    }}>
                        <Text style={{ fontWeight: '600', fontSize: 12 }}>{item.tenTroChoi.replace(".apk", "")}</Text>
                        <Text style={{ fontSize: 10, marginTop: 10 }}>Thể Loại: {item.theLoai}</Text>
                        <View style={{
                            flexDirection: 'row',
                            width: "100%",
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{ fontSize: 10 }}>Giá: {item.gia}</Text>
                            <Text style={{ fontSize: 10, textAlign: 'right' }}>Trạng thái:{item.trangThai}</Text>
                        </View>

                    </View>

                </View>
            </TouchableOpacity >

        )
    }



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
                    <TouchableOpacity onPress={() => this.bottomSheet.showPanel()} style={{ paddingRight: 10, paddingTop: 5 } }>
                        <Image style={{ width: 30, height: 30, }} source={require("../assets/favicon.png")} />
                        
                    </TouchableOpacity>
                    
                </View>
            </View>
            <View>
                
            </View>
            <Carousel/>
            

            <View style={styles.body}>
                <Text style={{
                    textAlign: 'left',
                    paddingLeft: 30,
                    borderBottomWidth: 1.5,
                    fontSize: 17,
                    fontWeight: '600',

                }}>Được đề xuất cho bạn</Text>
                <FlatList
                    data={listGame}
                    renderItem={(list) => renderTask(list)}
                    onRefresh={loadTasks}
                    refreshing={refreshing}
                    style={{
                        marginTop: "5%",
                        borderWidth: 1,
                        width: "95%",
                        alignSelf: 'center',
                        borderRadius: 5,
                        borderColor: "#bbb"
                    }}
                />
                
            </View>
            <BottomSheet ref={ref => (this.bottomSheet = ref)} />
        </View>
        

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        justifyContent: 'flex-start',
        width: "100%",
        
        backgroundColor:"#fff"

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

        width: "100%",
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
        marginLeft: 20,
        paddingTop: 20

    },
    title: {
        justifyContent: 'flex-start',
        width: "100%",
        marginRight: 100
    },
    underlined: {
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        width: 420,
        fontSize: 15,
        fontWeight: "500",
        paddingLeft: 30,
        paddingTop: 10,


    },
    image:{
        //borderRadius: 15,
        //width:'95%',
        //marginTop:15,
        padding:20
    },
    body: {
        backgroundColor: "white",
        width: 340,
        height: 250,
        marginTop: 20,
        marginHorizontal:5

    },

})

export default MainScreen;