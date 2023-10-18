import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';
import { InfoGame } from '../../services/interfaces/GameService';
import { getByName } from '../../services/Game';


const ManagerGameUser = ({ navigation }) => {
    const users = navigation.getParam("user")
    const [check, setCheck] = useState<boolean>(false)
    const [listGameIsInstall, setListGameIsInstall] = useState<InfoGame[]>([])
    const [listGameHaveBuy, setListGameHaveBuy] = useState<InfoGame[]>([])
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const loadTasks = async () => {
        setRefreshing(true)
        try {
            const { data } = await getByName()
            // console.log(data)
            setListGameIsInstall(data)

        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage)
        }
        setRefreshing(false)
    }
    const daCaiDat = () => {
        setCheck(false)
    }
    const daMua = () => {
        setCheck(true)
    }
    const renderListGameInstall = ({ item }: { item: InfoGame }) => {
        return (
            <TouchableOpacity onPress={() => { }}>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: "5%",
                    marginTop: 20,
                }}>
                    <Image style={{ width: 50, height: 50, borderRadius: 5 }} source={require("../../assets/games/cod/cod_1.jpg")} />
                    <View style={{
                        marginLeft: 15,
                        width: "70%"
                    }}>
                        <Text style={{ fontWeight: '600', fontSize: 12 }}>{item.tenTroChoi.replace(".apk", "")}</Text>
                        <Text style={{ fontSize: 10, marginTop: 3 }}>Thể Loại: {item.theLoai}</Text>
                        <View style={{
                            flexDirection: 'row',
                            width: "100%",
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{ fontSize: 10 }}>Giá: {item.gia}</Text>
                            {/* <Text style={{ fontSize: 10, textAlign: 'right' }}>Trạng thái:{item.trangThai}</Text> */}
                        </View>

                    </View>

                </View>
            </TouchableOpacity >
        )
    }
    useEffect(() => {
        loadTasks()
    }, [users])
    return (
        <View style={styles.container}>
            
            <View style={{
                flexDirection: 'row',

                width: 250,
                height: 30,
                justifyContent: 'space-between',
                alignItems: 'center',


            }}>
                {!check ? (
                    <TouchableOpacity style={{
                        width: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 30,
                        backgroundColor: "#7FFF00",
                        borderRadius: 10
                    }} >
                        <Text>Đã cài đặt</Text>
                    </TouchableOpacity>
                ) : (<Text>
                    <TouchableOpacity style={{
                        width: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 30,
                        borderRadius: 10,
                        backgroundColor: "#eee"
                    }} onPress={daCaiDat}>
                        <Text>Đã cài đặt</Text>
                    </TouchableOpacity>
                </Text>)}

                {check ? (
                    <TouchableOpacity style={{
                        width: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 30,
                        borderRadius: 10,
                        backgroundColor: "#7FFF00"
                    }}>
                        <Text>Đã mua</Text>
                    </TouchableOpacity>
                ) : (<Text>
                    <TouchableOpacity style={{
                        width: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 30,
                        borderRadius: 10,
                        backgroundColor: "#eee"
                    }} onPress={daMua}>
                        <Text>Đã mua</Text>
                    </TouchableOpacity>
                </Text>)}
            </View>
            {!check ? (
                <View style={{
                    width: 300,
                    height: 450,
                    marginTop: 20,
                    marginHorizontal: 5
                }}>
                    <FlatList
                        data={listGameIsInstall}
                        renderItem={(list) => renderListGameInstall(list)}
                        onRefresh={loadTasks}
                        refreshing={refreshing}
                        style={{
                            marginTop: "5%",
                            borderWidth: 1,
                            width: "95%",
                            alignSelf: 'center',
                            borderRadius: 5,
                            borderColor: "#bbb",
                            height: "100%"
                        }}
                    />
                </View>
            ) : (
                <View style={{
                    width: 300,
                    height: 450,
                    marginTop: 20,
                    marginHorizontal: 5
                }}>
                    <Text style={{
                        marginTop: "5%",
                        borderWidth: 1,
                        width: "95%",
                        alignSelf: 'center',
                        borderRadius: 5,
                        borderColor: "#bbb",
                        height: 435
                    }}>
                        danh sách đã mua
                    </Text>
                </View>
            )}
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
        backgroundColor: "#fff"

    },

})

export default ManagerGameUser;