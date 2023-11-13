import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';
import Carousel from './Carousel';
import { ImageGameUri, InfoGame } from '../../services/interfaces/GameService';
import { BASE_URL_Image_Icon, getByName, getImageIconGame } from '../../services/Game';
import BottomSheet from "./BottomSheet";
import { BASE_URL_Image, getByUser, getGameManager, getImageIcon } from '../../services/todo';
import { getItemAsync } from 'expo-secure-store';
import * as FileSystem from 'expo-file-system';


const MainScreen = ({ navigation }) => {
    const lsImageUri = navigation.getParam("listImageUri")
    const user = navigation.getParam("user")
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [listGame, setListGame] = useState<InfoGame[]>([])
    const [reListGame, setReListGame] = useState<InfoGame[]>([])
    const [image, setImage] = useState<string>()
    const [imageUri, setImageUri] = useState<string>();
    let ListGame: InfoGame[] = []
    const loadTasks = async () => {
        setRefreshing(true)
        //console.log(lsImageUri)
        try {
            const { data } = await getByName()
            //console.log(data)
            setListGame(data)
            setReListGame(data)
            const response = await getImageIcon(user)
            const name = response.data[0].imageName
            // console.log(response.data)
            fetchImage(name)
            ListGame = data
            for (let i = 0; i < ListGame.length; i++) {
                const response = await getImageIconGame(ListGame[i].tenTroChoi)
                const ImageName = response.data[0].imageName
                // console.log(data[i].id)
                await fetchImageGame(ListGame[i].tenTroChoi, ImageName, data[i].id)
            }

            setListImageUri(checklist)

        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage)
        }
        setRefreshing(false)
    }
    const fetchImage = async (imageName: string) => {

        const url = BASE_URL_Image.concat("getImage/").concat(user).concat("/").concat(imageName.replace(".png", ""));
        try {
            const response = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + imageName.replace(".png", ""));
            setImageUri(response.uri);

        } catch (error) {
            console.error('Error fetching image:', error.response.data);

        }

    };
    const [listImageUri, setListImageUri] = useState<ImageGameUri[]>([])
    let checklist: ImageGameUri[] = [];
    const fetchImageGame = async (nameFile: string, imageName: string, id: string) => {

        let check: ImageGameUri = {
            id: "",
            nameFile: "",
            imageUri: ""
        };


        const url = BASE_URL_Image_Icon.concat("getImage/").concat(nameFile).concat("/").concat(imageName);

        try {
            const response = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + imageName);
            check.id = id
            check.nameFile = nameFile
            check.imageUri = response.uri
            checklist.push(check)

        } catch (error) {
            console.error('Error fetching image:', error.response.data);
        }
    };
    const loadimage = async () => {
        const getUser = await getItemAsync('accessToken');
        const tokenObject = JSON.parse(getUser);
        const userName = tokenObject.user;
        try {
            setRefreshing(true)
            const getImage = await getByUser(userName);

            setImage(getImage.data[0].image)


        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage.data)
        }
        setRefreshing(false)
    }

    useEffect(() => {

        loadimage()
        loadTasks()
    }, [user, lsImageUri])


    const [checks, setChecks] = useState<boolean>(false)
    const [searchResults, setSearchResults] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    let relist: InfoGame[] = reListGame
    const handleSearch = () => {
        const filteredTasks = reListGame.filter((item) =>
            item.theLoai.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.tenTroChoi.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.nhaCungCap.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        if (filteredTasks != null && filteredTasks.length != 0) {
            setListGame(filteredTasks);
        }
        else {

            setListGame(relist);

        }

        // console.log(filteredTasks.length)
        // Đây là nơi bạn triển khai logic tìm kiếm, ví dụ:

        setChecks(true); // Hiển thị FlatList khi có kết quả tìm kiếm
    };


    const CheckBuyAndInstall = async (name: string, item: InfoGame, imageGameUri: string) => {
        try {

            const { data } = await getGameManager(user);
            // console.log(data)
            const GameCheck = []
            for (let index = 0; index < data.length; index++) {
                if (data[index].nameGame == name) {
                    GameCheck.push(data[index])
                }
            }
            if (GameCheck.length == 0) {
                navigation.navigate("InfoGame_dont_Install", { gameId: item.id, user, imageGameUri })
            }
            else {
                navigation.navigate("InfoGameScreen", { gameId: item.id, gameManager: GameCheck[0], installGame: GameCheck[0].isInstall, imageGameUri })
            }


        } catch (error) {
            if (error.response.data == "Tài khoản " + user + " chưa mua với tải game") {

                navigation.navigate("InfoGame_dont_Install", { gameId: item.id, user, imageGameUri })

            }
            else {
                console.log(error.response.data)
            }



        }
    }

    const renderTask = ({ item }: { item: InfoGame }) => {
        return (
            <TouchableOpacity onPress={() => { CheckBuyAndInstall(item.tenTroChoi, item, listImageUri.find(f => f.nameFile == item.tenTroChoi)?.imageUri) }}>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: "5%",
                    marginVertical: 10,

                }}>
                    <Image style={{ width: 50, height: 50, borderRadius: 5 }} source={{ uri: listImageUri.find(f => f.nameFile == item.tenTroChoi)?.imageUri }

                    } />
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
    const scrollToItem = (index: number) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
                x: index * 50, // Thay ITEM_WIDTH bằng chiều rộng của mỗi mục trong ScrollView
                animated: true,
            });
        }
    };
    const scrollViewRef = useRef(null);
    const [choseTitle, setChoseTitle] = useState<number>(1)
    const choseScrollView = () => {
        return (
            <ScrollView
                ref={scrollViewRef}
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{
                    paddingTop: 4,
                    paddingLeft: 4
                }}>
                <View style={{
                    marginHorizontal: 10
                }}>
                    <TouchableOpacity style={{
                        height: 25,
                        marginRight: 10,
                        borderRadius: 10,
                    }} onPress={() => { setChoseTitle(1); scrollToItem(0); }}>
                        {choseTitle != 1 ? (
                            <Text style={styles.textScroll}>Cho bạn</Text>
                        ) : (
                            <Text style={[styles.textScroll, { color: "#45A0D2" }]}>Cho bạn</Text>
                        )}
                    </TouchableOpacity>
                    {choseTitle != 1 ? (
                        <View ></View>
                    ) : (
                        <View style={[styles.hightLine, { borderColor: "#45A0D2" }]}></View>
                    )}

                </View>
                <View style={{
                    marginHorizontal: 10
                }}>
                    <TouchableOpacity style={{
                        height: 25,
                        marginRight: 10,
                        borderRadius: 10,
                    }} onPress={() => { setChoseTitle(2); scrollToItem(1); }}>
                        {choseTitle != 2 ? (
                            <Text style={styles.textScroll}>Bảng xếp hạng</Text>
                        ) : (
                            <Text style={[styles.textScroll, { color: "#45A0D2" }]}>Bảng xếp hạng</Text>
                        )}
                    </TouchableOpacity>
                    {choseTitle != 2 ? (
                        <View ></View>
                    ) : (
                        <View style={[styles.hightLine, { borderColor: "#45A0D2" }]}></View>
                    )}
                </View>
                <View style={{
                    marginHorizontal: 10
                }}>
                    <TouchableOpacity style={{
                        height: 25,
                        marginRight: 10,
                        borderRadius: 10,
                    }} onPress={() => { setChoseTitle(3); scrollToItem(2); }}>
                        {choseTitle != 3 ? (
                            <Text style={styles.textScroll}>Theo xu hướng</Text>
                        ) : (
                            <Text style={[styles.textScroll, { color: "#45A0D2" }]}>Theo xu hướng</Text>
                        )}
                    </TouchableOpacity>
                    {choseTitle != 3 ? (
                        <View ></View>
                    ) : (
                        <View style={[styles.hightLine, { borderColor: "#45A0D2" }]}></View>
                    )}
                </View>
                <View style={{
                    marginHorizontal: 10
                }}>
                    <TouchableOpacity style={{
                        height: 25,
                        marginRight: 10,
                        borderRadius: 10,
                    }} onPress={() => { setChoseTitle(4); scrollToItem(3); }}>
                        {choseTitle != 4 ? (
                            <Text style={styles.textScroll}>Miễn phí</Text>
                        ) : (
                            <Text style={[styles.textScroll, { color: "#45A0D2" }]}>Miễn phí</Text>
                        )}
                    </TouchableOpacity>
                    {choseTitle != 4 ? (
                        <View ></View>
                    ) : (
                        <View style={[styles.hightLine, { borderColor: "#45A0D2" }]}></View>
                    )}
                </View>
                <View style={{
                    marginHorizontal: 10
                }}>
                    <TouchableOpacity style={{
                        height: 25,
                        marginRight: 10,
                        borderRadius: 10,
                    }} onPress={() => { setChoseTitle(5); scrollToItem(4); }}>
                        {choseTitle != 5 ? (
                            <Text style={styles.textScroll}>Loại</Text>
                        ) : (
                            <Text style={[styles.textScroll, { color: "#45A0D2" }]}>Loại</Text>
                        )}
                    </TouchableOpacity>
                    {choseTitle != 5 ? (
                        <View ></View>
                    ) : (
                        <View style={[styles.hightLine, { borderColor: "#45A0D2" }]}></View>
                    )}
                </View>

            </ScrollView>

        )
    }

    const viewChose = () => {
        switch (choseTitle) {
            case 1:
                return (
                    <View style={{
                        width: "100%",
                        height: "95%"
                    }}>
                        <View style={{
                            width: "100%",
                            height: "50%"
                        }}>
                            <Carousel listImageUri={listImageUri} user={user} navigation={navigation} />
                        </View>
                        <View style={styles.body}>

                            <View style={{
                                height: "47%"
                            }}>

                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: '600',
                                    paddingLeft: 30
                                }}>Được đề xuất cho bạn</Text>
                                <View style={{
                                    borderBottomWidth: 1.5,
                                }}></View>
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
                                        borderColor: "#bbb",
                                        height: "10%"
                                    }}
                                />
                            </View>


                        </View>
                    </View>
                )
                break;
            case 2:
                return (
                    <View style={{
                        backgroundColor: "red",
                        width: "100%",
                        height: "95%"
                    }}></View>
                )
                break;
            case 3:
                return (
                    <View style={{
                        backgroundColor: "blue",
                        width: "100%",
                        height: "95%"
                    }}></View>
                )
                break;
            case 4:
                return (
                    <View style={{
                        backgroundColor: "green",
                        width: "100%",
                        height: "95%"
                    }}></View>
                )
                break;
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.head}>
                <View style={{
                    flexDirection: "row"
                }}>
                    <TouchableOpacity onPress={() => { navigation.navigate("MainScreenUser", { user, lsImageUri }) }}>
                        <Image style={{ height: 40, width: 40, marginRight: 10 }} source={require("../../assets/Icon/royale_3959283.png")} />
                    </TouchableOpacity>
                    <View style={styles.search}>

                        <Image style={{ width: 20, height: 20, marginTop: 7 }} source={require("../../assets/Icon/search.png")} />
                        <TextInput placeholder='Tìm kiếm trò chơi'
                            value={searchKeyword}
                            onChangeText={(text) => setSearchKeyword(text)}
                            onFocus={() => setChecks(true)}
                        />
                        <TouchableOpacity style={{

                            paddingTop: 5
                        }} onPress={() => { handleSearch() }}>
                            <Image style={{ width: 20, height: 10, marginTop: 7, }} source={require("../../assets/Icon/paper-1349664_1280.png")} />
                        </TouchableOpacity>
                    </View>
                </View>
                {checks ? (
                    <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => { setChecks(false) }}>
                        <Text>Back</Text>
                    </TouchableOpacity>
                ) : (
                    <View></View>
                )}
                <View style={styles.user}>
                    <TouchableOpacity style={{ paddingRight: 10, paddingTop: 7 }} onPress={() => {
                        navigation.navigate("List_NotificationScreen", { user });
                    }}>

                        <Image style={{ width: 20, height: 20, }} source={require("../../assets/Icon/bell-jar-1096279_1280.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.bottomSheet.showPanel()} style={{ paddingRight: 10, paddingTop: 5 }}>
                        {imageUri ? (
                            <Image style={{ width: 30, height: 30, }} source={{
                                uri: imageUri
                            }} />
                        ) : (
                            <Image style={{ width: 30, height: 30, }} source={require("../../assets/favicon.png")} />
                        )}

                    </TouchableOpacity>

                </View>

            </View>
            <View style={styles.body}>
                <View style={styles.scrollView}>
                    {choseScrollView()}
                </View>
                <View style={{
                    borderTopWidth: 1.5,
                }}></View>
                {!checks ? (
                    <View >
                        {viewChose()}
                    </View>
                ) : (
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
                            borderColor: "#bbb",
                            height: 100
                        }}
                    />
                )}
                <BottomSheet ref={ref => (this.bottomSheet = ref)} navigation={navigation} />
            </View>

        </View>


    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'flex-start',
        width: "100%",
        height: "95%",
        backgroundColor: "#fff",
        paddingTop: "2%"

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
        height: "8%",
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    user: {
        flexDirection: 'row',
    },
    bottom: {
        backgroundColor: "#fff",
        paddingVertical: 10
    },
    body: {
        backgroundColor: "#fff",
        paddingVertical: 10,
        width: "100%",
        height: "100%",
    },
    scrollView: {
        height: "4.8%",
        width: "100%"
    },
    textScroll: {
        fontSize: 17,
        fontWeight: '600',
        paddingHorizontal: 3
    },
    hightLine: {
        height: 30,
        borderTopWidth: 5,
        marginRight: 10,
        borderRadius: 10,
    },
})

export default MainScreen;