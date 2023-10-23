import React, { useEffect, useState } from 'react';

import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { getByName } from '../../services/Game';
import { InfoGame } from '../../services/interfaces/GameService';
import { BASE_URL_Image, getAllAccount, getByUser, getImageIcon } from '../../services/todo';
import { ImageUri, RegisterData } from '../../services/interfaces/User.interface';
import BottomSheet from '../Users/BottomSheet';
import * as FileSystem from 'expo-file-system';

const ListAccountScreen = ({ navigation }) => {
    const user = navigation.getParam("user")

    const [refreshing, setRefreshing] = useState<boolean>(false)

    const [listAccount, setListAccount] = useState<RegisterData[]>([])
    const loadTasks = async () => {
        setRefreshing(true)
        try {
            const { data } = await getAllAccount()
            // console.log(data)
            setListAccount(data)
            const response = await getImageIcon("po123lop456")
            const name = response.data[0].imageName

            fetchImage("po123lop456", name)

            for (let i = 0; i < listAccount.length; i++) {
                const response = await getImageIcon(listAccount[i].user)
                const ImageName = response.data[0].imageName
                await fetchImage(listAccount[i].user, ImageName)

            }
            setListImageUri(checklist)
        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage)
        }
        setRefreshing(false)
    }
    const [listImageUri, setListImageUri] = useState<ImageUri[]>([])
    const [imageAdminUri, setImageAdminUri] = useState<string>();
    let checklist: ImageUri[] = [];
    const fetchImage = async (username: string, imageName: string) => {

        let check: ImageUri = {
            username: "",
            imageUri: ""
        };

        if (username == user) {
            const url = BASE_URL_Image.concat("getImage/").concat(username).concat("/").concat(imageName.replace(".png", ""));

            try {
                const response = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + imageName.replace(".png", ""));
                setImageAdminUri(response.uri);

            } catch (error) {
                console.error('Error fetching image:', error.response.data);

            }
        }
        else {
            const url = BASE_URL_Image.concat("getImage/").concat(username).concat("/").concat(imageName.replace(".png", ""));

            try {
                const response = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + imageName.replace(".png", ""));
                check.username = username
                check.imageUri = response.uri
                checklist.push(check)

            } catch (error) {
                console.error('Error fetching image:', error.response.data);

            }
        }

    };
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const handleSearch = () => {
        const filteredTasks = listAccount.filter((item) =>
            item.user.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.name.toLowerCase().includes(searchKeyword.toLowerCase())
        );

        if (filteredTasks != null) {

            setListAccount(filteredTasks);

        }

    }
    useEffect(() => {

        loadTasks()
    }, [user])
    const goToDetail = (item: RegisterData) => {
        navigation.navigate("InfoGameNCC", {})
    }

    const renderTask = ({ item }: { item: RegisterData }) => {
        return (
            <TouchableOpacity onPress={() => { goToDetail(item) }} >
                {item.user != user ? (
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: "5%",
                        marginTop: 20
                    }}>
                        <Image style={{ width: 50, height: 50, marginTop: 7 }} source={{ uri: listImageUri.find(f => f.username == item.user)?.imageUri }} />
                        <View style={{
                            marginLeft: 15,
                            width: "70%"
                        }}>
                            <Text style={{ fontWeight: '600', fontSize: 12 }}>{item.name}</Text>
                            <Text style={{ fontSize: 10, marginTop: 10 }}>Email: {item.email}</Text>
                            <View style={{
                                flexDirection: 'row',
                                width: "100%",
                                justifyContent: 'space-between'
                            }}>
                                <Text style={{ fontSize: 10 }}>Quyền: {item.note}</Text>

                            </View>
                        </View>
                    </View>
                ) : (
                    <View></View>
                )}

            </TouchableOpacity >

        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <View style={styles.search}>
                    <Image style={{ width: 20, height: 20, marginTop: 7 }} source={require("../../assets/Icon/search.png")} />
                    <TextInput placeholder='Tìm kiếm trò chơi' value={searchKeyword}
                        onChangeText={(text) => setSearchKeyword(text)} />
                    <TouchableOpacity onPress={() => { handleSearch() }}>
                        <Image style={{ width: 20, height: 20, marginTop: 7 }} source={require("../../assets/Icon/search.png")} />
                    </TouchableOpacity>
                </View>

                <View style={styles.user}>
                    <TouchableOpacity style={{ paddingRight: 10, paddingTop: 5 }}>
                        <Image style={{ width: 30, height: 30, }} source={require("../../assets/Icon/1.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.bottomSheet.showPanel()} style={{ paddingRight: 10, paddingTop: 5 }}>
                        <Image style={{ width: 30, height: 30, }} source={{ uri: imageAdminUri }} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.body}>
                <Text style={{
                    textAlign: 'left',
                    paddingLeft: 30,
                    borderBottomWidth: 1.5,
                    fontSize: 17,
                    fontWeight: '600',

                }}>Danh sách tài khoản</Text>
                <FlatList
                    data={listAccount}
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
            <View style={styles.end}>
                <TouchableOpacity onPress={() => { navigation.navigate("AddGameNCC", { nameNCC: userNCC?.user }) }} style={{
                    backgroundColor: "#DFEEF6",
                    width: "90%",
                    height: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                }}>
                    <Text style={{ fontWeight: '700', fontSize: 20 }}>+</Text>
                </TouchableOpacity>
            </View>
            <BottomSheet ref={ref => (this.bottomSheet = ref)} navigation={navigation} />
        </View>

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"

    },
    head: {

        width: "80%",
        height: 40,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 10
    },
    search: {
        width: 200,
        height: 35,
        backgroundColor: "#bbb",
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderRadius: 20,
        marginLeft: "5%"

    },
    user: {
        flexDirection: 'row',
        marginLeft: "20%"
    },
    body: {
        backgroundColor: "white",
        width: "100%",
        height: "80%",
        marginTop: 20,

    },
    end: {
        width: "100%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ListAccountScreen;