import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, FlatList, AppState } from 'react-native';
import Carousel from './Carousel';
import { ImageGameUri, InfoGame } from '../../services/interfaces/GameService';
import { BASE_URL_Image_Icon, GetUserBuyGame, getByName, getImageIconGame } from '../../services/Game';
import BottomSheet from "./BottomSheet";
import { BASE_URL_Image, UpdateStateLogin, getByUser, getGameManager, getImageIcon } from '../../services/todo';
import { getItemAsync } from 'expo-secure-store';
import * as FileSystem from 'expo-file-system';

interface RankGame {
    position: number
    game: InfoGame
    numberUser: number
}
interface NewRelease {
    game: InfoGame
    timeUpGame: Date
}
const MainScreen = ({ navigation }: any) => {
    const bottomSheetRef = useRef<any>(null);

    const showBottomSheetPanel = () => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.showPanel();
        }
    };
    const lsImageUri = navigation.getParam("listImageUri")
    const username = navigation.getParam("username")
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [listGame, setListGame] = useState<InfoGame[]>([])
    const [reListGame, setReListGame] = useState<InfoGame[]>([])
    const [listGameFree, setListGameFree] = useState<InfoGame[]>([])
    const [image, setImage] = useState<string>()
    const [imageUri, setImageUri] = useState<string>();
    const [listRank, setListRank] = useState<RankGame[]>([])
    const [listNewRelease, setListNewRelease] = useState<NewRelease[]>([])
    let ListGame: InfoGame[] = []
    const loadTasks = async () => {
        setRefreshing(true)
        //console.log(lsImageUri)
        try {
            const { data } = await getByName()
            setListGame(data)
            setReListGame(data)
            sortRankGame(data)
            const response = await getImageIcon(username)
            const name = response.data[0].imageName
            // console.log(response.data)

            fetchImage(name)
            ListGame = data
            getListIconGame(data)
            sortNewRelease(data)

        } catch (err: any) {
            const errorMessage = err.response
            alert(errorMessage.data)
        }
        setRefreshing(false)
    }
    const sortNewRelease = async (lsGame: any) => {
        // console.log(lsGame[0].timeUpGame.split("T")[0])
        let lsGameRelease: NewRelease[] = []
        for (let i = 0; i < lsGame.length; i++) {
            let gameRelease: NewRelease
            gameRelease = {
                game: lsGame[i],
                timeUpGame: new Date(lsGame[i].timeUpGame.split("T")[0])

            }
            lsGameRelease.push(gameRelease)
        }
        lsGameRelease.sort((a, b) => b.timeUpGame.getTime() - a.timeUpGame.getTime());
        setListNewRelease(lsGameRelease)
        // console.log(lsGameRelease[0].timeUpGame.toISOString().split("T")[0])
    }
    const sortRankGame = async (lsGame: any) => {
        let lsRankClone: RankGame[] = []
        for (let i = 0; i < lsGame.length; i++) {
            let RankClone: RankGame
            try {
                const response = await GetUserBuyGame(lsGame[i].tenTroChoi)
                // console.log(response.data)
                RankClone = {
                    game: lsGame[i],
                    numberUser: response.data.length,
                    position: 0
                }
                lsRankClone.push(RankClone)

            } catch (error: any) {
                console.log(error.response.data)
            }
        }
        lsRankClone.sort((a, b) => b.numberUser - a.numberUser);
        for (let i = 0; i < lsRankClone.length; i++) {
            lsRankClone[i].position = i + 1;
        }
        setListRank(lsRankClone)
    }
    const getListIconGame = async (data: any) => {
        let lsGameFree: InfoGame[] = []
        for (let i = 0; i < ListGame.length; i++) {
            if (data[i].gia == 0) {
                lsGameFree.push(data[i])
            }
            const response = await getImageIconGame(ListGame[i].tenTroChoi)
            const ImageName = response.data[0].imageName

            await fetchImageGame(ListGame[i].tenTroChoi, ImageName, data[i].id)
        }

        setListGameFree(lsGameFree)
        setListImageUri(checklist)
    }
    const fetchImage = async (imageName: string) => {

        const url = BASE_URL_Image.concat("getImage/").concat(username).concat("/").concat(imageName);
        try {
            const response = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + imageName);
            setImageUri(response.uri);
        } catch (error: any) {
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

        } catch (error: any) {
            console.error('Error fetching image:', error.response.data);
        }
    };
    const loadimage = async () => {
        let getUser: any
        getUser = await getItemAsync('accessToken');
        const tokenObject = JSON.parse(getUser);
        const username = tokenObject.username;
        try {
            setRefreshing(true)
            const getImage = await getByUser(username);

            setImage(getImage.data[0].image)


        } catch (err: any) {
            const errorMessage = err.response
            alert(errorMessage.data)
        }
        setRefreshing(false)
    }
    const updateState = async (result: boolean) => {

        try {
            await UpdateStateLogin({
                username: username,
                password: "......",
                checkOnline: result
            })
            console.log("Success")
        } catch (error: any) {
            console.log(error.response.data)
        }
    }
    const handleAppStateChange = (AppState: any) => {
        if (AppState === 'background' || AppState === 'inactive') {
            updateState(false)
        }
        else {
            updateState(true)
        }
    };
    useEffect(() => {
        updateState(true)
        loadimage()
        loadTasks()
        AppState.addEventListener('change', handleAppStateChange);
    }, [username, lsImageUri])


    const [checks, setChecks] = useState<boolean>(false)

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



    const CheckBuyAndInstall = async (name: string, item: InfoGame, imageGameUri: any) => {

        try {

            const { data } = await getGameManager(username);
            const GameCheck = []
            for (let index = 0; index < data.length; index++) {
                if (data[index].nameGame == name) {
                    GameCheck.push(data[index])
                }
            }
            if (GameCheck.length == 0) {
                navigation.navigate("InfoGame_dont_Install", { gameId: item.id, username, imageGameUri })
            }
            else {
                navigation.navigate("InfoGameScreen", { gameId: item.id, gameManager: GameCheck[0], installGame: GameCheck[0].isInstall, imageGameUri, username })
            }


        } catch (error: any) {
            if (error.response.data == "Tài khoản " + username + " chưa mua với tải game") {

                navigation.navigate("InfoGame_dont_Install", { gameId: item.id, username, imageGameUri })

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
                        <Text style={{ fontWeight: '600', fontSize: 12 }}>{item.tenTroChoi}</Text>
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
    const renderRank = ({ item }: { item: RankGame }) => {
        return (
            <TouchableOpacity onPress={() => { CheckBuyAndInstall(item.game.tenTroChoi, item.game, listImageUri.find(f => f.nameFile == item.game.tenTroChoi)?.imageUri) }}>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: "5%",
                    marginVertical: 10,
                    alignItems: "center"
                }}>
                    <Text style={{ fontWeight: "700", marginRight: 10 }}>#{item.position}</Text>
                    <Image style={{ width: 50, height: 50, borderRadius: 5 }} source={{ uri: listImageUri.find(f => f.nameFile == item.game.tenTroChoi)?.imageUri }

                    } />
                    <View style={{
                        marginLeft: 15,
                        width: "35%"
                    }}>
                        <Text style={{ fontWeight: '600', fontSize: 12 }}>{item.game.tenTroChoi}</Text>

                    </View>
                    <Text style={{ fontWeight: "700", marginRight: 10 }}>Số lượng người mua: {item.numberUser}</Text>
                </View>
            </TouchableOpacity >

        )
    }
    const renderNewRelease = ({ item }: { item: NewRelease }) => {
        return (
            <TouchableOpacity onPress={() => { CheckBuyAndInstall(item.game.tenTroChoi, item.game, listImageUri.find(f => f.nameFile == item.game.tenTroChoi)?.imageUri) }}>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: "5%",
                    marginVertical: 10,
                    alignItems: "center"
                }}>
                    
                    <Image style={{ width: 50, height: 50, borderRadius: 5 }} source={{ uri: listImageUri.find(f => f.nameFile == item.game.tenTroChoi)?.imageUri }

                    } />
                    <View style={{
                        marginLeft: 15,
                        width: "35%"
                    }}>
                        <Text style={{ fontWeight: '600', fontSize: 12 }}>{item.game.tenTroChoi}</Text>

                    </View>
                    <Text style={{ fontWeight: "700", marginRight: 10 }}>Phát hành: {item.timeUpGame.toISOString().split("T")[0]}</Text>
                </View>
            </TouchableOpacity >

        )
    }
    const scrollToItem = (index: number) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
                x: index * 55, // Thay ITEM_WIDTH bằng chiều rộng của mỗi mục trong ScrollView
                animated: true,
            });
        }
    };
    const scrollViewRef = useRef<any>(null);
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
                    paddingLeft: 4,
                    borderBottomWidth: 1
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
                            <Text style={styles.textScroll}>Mới phát hành</Text>
                        ) : (
                            <Text style={[styles.textScroll, { color: "#45A0D2" }]}>Mới phát hành</Text>
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
                            height: "51%"
                        }}>
                            <Carousel listImageUri={listImageUri} username={username} navigation={navigation} />
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
            case 2:
                return (
                    <View style={{
                        // backgroundColor: "red",
                        width: "100%",
                        height: "95%"
                    }}>
                        <View style={{
                            height: "95%"
                        }}>

                            <FlatList
                                data={listRank}
                                renderItem={(list) => renderRank(list)}
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
                )
            case 3:
                return (
                    <View style={{
                        // backgroundColor: "blue",
                        width: "100%",
                        height: "95%"
                    }}>
                        <View style={{
                            height: "95%"
                        }}>

                            <FlatList
                                data={listNewRelease}
                                renderItem={(list) => renderNewRelease(list)}
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
                )
            case 4:
                return (
                    <View style={{
                        // backgroundColor: "green",
                        width: "100%",
                        height: "95%"
                    }}>
                        <View style={{
                            height: "95%"
                        }}>

                            <FlatList
                                data={listGameFree}
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
                )
            case 5:
                return (
                    <View style={{
                        width: "100%",
                        height: "96%",
                        paddingTop: "10%"
                    }}>
                        <TouchableOpacity style={styles.TypeBtn}>
                            <Text style={styles.TextTypeBtn}>Câu đố</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.TypeBtn}>
                            <Text style={styles.TextTypeBtn}>Chiến thuật</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.TypeBtn}>
                            <Text style={styles.TextTypeBtn}>Trí tuệ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.TypeBtn}>
                            <Text style={styles.TextTypeBtn}>Hành động</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.TypeBtn}>
                            <Text style={styles.TextTypeBtn}>Giáo dục</Text>
                        </TouchableOpacity>

                    </View>
                )
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.head}>
                <View style={{
                    flexDirection: "row",
                    width: "70%"
                }}>
                    <TouchableOpacity onPress={() => { navigation.navigate("MainScreenUser", { username, lsImageUri }) }}>
                        <Image style={{ height: 40, width: 40, marginRight: 10 }} source={require("../../assets/Icon/Logo.png")} />
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
                    <TouchableOpacity style={{ marginRight: 10, justifyContent: "center" }} onPress={() => { setChecks(false) }}>
                        <Text>Back</Text>
                    </TouchableOpacity>
                ) : (
                    <View></View>
                )}
                <View style={styles.user}>

                    <TouchableOpacity style={{ paddingRight: 10, paddingTop: 7 }} onPress={() => {
                        navigation.navigate("List_NotificationScreen", { username });
                    }}>

                        <Image style={{ width: 20, height: 20, }} source={require("../../assets/Icon/bell-jar-1096279_1280.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={showBottomSheetPanel} style={{ paddingRight: 10, paddingTop: 5 }}>
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
                <BottomSheet ref={bottomSheetRef} navigation={navigation} />
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

    },
    search: {
        width: "65%",
        height: "80%",
        backgroundColor: "#bbb",
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderRadius: 20,
    },
    head: {

        width: "100%",
        height: 40,
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
        height: 34,
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
    TypeBtn: {
        backgroundColor: "#45A0D2",
        width: "50%",
        height: "5%",
        marginTop: 20,
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 10,

    },
    TextTypeBtn: {
        textAlign: "center",
        color: "white",
        fontWeight: "700"
    }
})

export default MainScreen;