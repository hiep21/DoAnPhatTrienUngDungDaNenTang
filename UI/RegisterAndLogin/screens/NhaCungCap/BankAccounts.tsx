import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import { useState, useEffect, useCallback } from 'react';

import { loginApi, configAxiosWithAccessToken, saveTokenToDevice, getAccessToken } from "../../services/todo";
import Background from '../Users/Background';
import { LoginData, BankAccount } from '../../services/interfaces/User.interface';
import { CreateBankAccount,GetAccountByUser } from '../../services/todo';



const BankAccounts = ({ navigation }) => {
    const [banks, setBanks] = useState<BankAccount>()
    const [bank, setBank] = useState<BankAccount>({
        account: "",
        accountNumber: "",
        nameBank:""
    })

    const [account, setAccount] = useState<string>("")
    const [accountNumber, setAccountNumber] = useState<string>("")
    const [nameBank, setNameBank] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false);
    const [userVal, setUserVal] = useState(null);

    


    const UpBank = async () => {
        // if (!users.user || !users.password) {
        //     alert("Vui lòng điền đầy đủ thông tin đăng nhập.");
        //     return;
        // }

        if (!isLoading) {
            setIsLoading(true)
            try {

                const bankResponse = await CreateBankAccount({
                    account,
                    accountNumber,
                    nameBank
                })
                const message = bankResponse.data
                console.log(bankResponse.data.note);
                

                
                navigation.navigate("ManagerGameNCC")
                //Chuyển hướng sang màn home

            } catch (err) {
                alert(err.response.data)
                setUserVal(err.response.data.errors)

            }
            setIsLoading(false)

        }

    }
    const user = navigation.getParam("user")
    const loadTasks = async () => {
        try {

            const { data } = await GetAccountByUser(user)
            setBank(data[0])
           

        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage)
        }

    }
    useEffect(() => {
        loadTasks()
    }, [user])
    return (
        <Background>
            <View style={styles.container}>
                <Text style={styles.mainText}>Banking</Text>
                <View style={styles.mainContainer}>
                    <View style={styles.content}>

                        <Text style={styles.label}>Account</Text>
                        <TextInput value={bank.account} onChangeText={(value) => {
                            setBank({
                                ...bank,
                                account: value
                            }),

                                setAccount(value)
                        }} style={styles.input} placeholder={banks?.account} />
                        {userVal != null && !bank.account ? (
                            <View>
                                <Text style={styles.textError}>Vui lòng điền đầy đủ thông tin account.</Text>
                            </View>
                        ) : null}
                        <Text style={styles.label}>AccountNumber</Text>
                        <TextInput value={bank.accountNumber} onChangeText={(value) => {
                            setBank({
                                ...bank,
                                accountNumber: value
                            }),

                                setAccountNumber(value)
                        }} style={styles.input}  />
                        {userVal != null && !bank.accountNumber ? (
                            <View>
                                <Text style={styles.textError}>Vui lòng điền đầy đủ thông tin account.</Text>
                            </View>
                        ) : null}
                        <Text style={styles.label}>Name Bank</Text>
                        <TextInput value={bank.nameBank} onChangeText={(value) => {
                            setBank({
                                ...bank,
                                nameBank: value
                            }),

                                setNameBank(value)
                        }} style={styles.input}  />
                        {userVal != null && !bank.nameBank ? (
                            <View>
                                <Text style={styles.textError}>Vui lòng điền đầy đủ thông tin account.</Text>
                            </View>
                        ) : null}

                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.button} onPress={UpBank}>
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.textbtn}>Update</Text>
                            )}
                        </TouchableOpacity>
                        

                    </View>
                    <View>
                        <Image source={require("../../assets/Icon/hinh-anh-ngan-hang-thuong-mai-la-gi-2.jpg")} style={styles.image} />
                    </View>
                </View>

            </View>
        </Background>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",

    },
    mainContainer: {
        marginVertical: 10,
        backgroundColor: "#fff",
        height: 700,
        width: 390,
        borderTopLeftRadius: 130,
        paddingTop: 35,
        alignItems: "center"
    },
    mainText: {
        marginTop: 20,
        fontSize: 30,
        fontWeight: "900",
        color: '#fff'
    },
    content: {
        alignItems: "flex-start",
        width: "80%"
    },
    input: {
        borderWidth: 1,
        borderColor: "#bbb",
        padding: 5,
        borderRadius: 100,
        width: "100%",
        backgroundColor: "#5555"
    },
    label: {
        marginVertical: 5,
        fontWeight: "bold",
        color: '#17741d',
        fontSize: 16
    },
    buttons: {

        justifyContent: "space-between",
        width: 320,
        marginTop: 20,
        alignItems: "center",

    },
    button: {

        borderWidth: 1,
        borderColor: "#177413",
        padding: 8,
        borderRadius: 100,
        backgroundColor: "#27bc32",
        width: "80%",
        alignItems: "center"
    },
    textbtn: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 15
    },
    signup: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5

    },
    textSignup: {
        fontWeight: 'bold',
        color: '#17741d',


    },
    text: {
        fontWeight: "500",
        color: '#222'
    },
    image: {
        marginTop: 10,
        width: 300,
        height: 160
    },
    textError: {
        color: "red"
    }

})
export default BankAccounts
