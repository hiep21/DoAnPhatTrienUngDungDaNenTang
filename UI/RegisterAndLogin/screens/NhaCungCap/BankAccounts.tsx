import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator, Modal, ScrollView } from 'react-native';
import { useState, useEffect, useCallback } from 'react';

import { loginApi, configAxiosWithAccessToken, saveTokenToDevice, getAccessToken } from "../../services/todo";
import Background from '../Users/Background';
import { LoginData, BankAccount } from '../../services/interfaces/User.interface';
import { CreateBankAccount,GetAccountByUser,UpdateBankAccount } from '../../services/todo';



const BankAccounts = ({ navigation }) => {
    const [check ,setCheck] = useState<boolean>(false)
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

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedGender, setSelectedGender] = useState<string>("");
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const selectGender = (Name: string) => {
        setSelectedGender(Name);
        setNameBank({
            ...bank,
            nameBank: Name
        });
        toggleModal();
    };
    const bankImages = {
        'Agribank': require("../../assets/ImageBank/Agribank.png"),
        'ACB Bank': require("../../assets/ImageBank/ACB Bank.png"),
        'BIDV': require("../../assets/ImageBank/BIDV.png"),
        'Co-opbank': require("../../assets/ImageBank/Co-opbank.png"),
        'Eximbank': require("../../assets/ImageBank/Eximbank.png"),
        'LienVietPostBank': require("../../assets/ImageBank/LienVietPostBank.png"),
        'MBBank': require("../../assets/ImageBank/MBBank.png"),
        'NCB bank': require("../../assets/ImageBank/NCB bank.png"),
        'PVComBank': require("../../assets/ImageBank/PVComBank.png"),
        'SacomBank': require("../../assets/ImageBank/SacomBank.png"),
        'SCB Bank': require("../../assets/ImageBank/SCB Bank.png"),
        'SeABank': require("../../assets/ImageBank/SeABank.png"),
        'SHBBank': require("../../assets/ImageBank/SHBBank.png"),
        'TechcomBank': require("../../assets/ImageBank/TechcomBank.png"),
        'TPBank': require("../../assets/ImageBank/TPBank.png"),
        'VIB Bank': require("../../assets/ImageBank/VIB Bank.png"),
        'VietcomBank': require("../../assets/ImageBank/VietcomBank.png"),
        'VietinBank': require("../../assets/ImageBank/VietinBank.png"),
        'VPBank': require("../../assets/ImageBank/VPBank.png"),
    };

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
                        <TouchableOpacity onPress={toggleModal} style={styles.dropdownButton}>
                            <Text style={styles.selectedGenderText}>
                                {selectedGender ? selectedGender : 'Agribank'}
                            </Text>
                        </TouchableOpacity>

                        <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={toggleModal}>
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <ScrollView style={{
                                        width: "85%",
                                        height: "55%",
                                        marginLeft: 20,

                                        }}>
                                        <TouchableOpacity onPress={() => selectGender('Agribank')} style={styles.modalItem}>
                                            <Text>Agribank</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => selectGender('ACB Bank')} style={styles.modalItem}>
                                            <Text>ACB Bank</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => selectGender('BIDV')} style={styles.modalItem}>
                                            <Text>BIDV</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => selectGender('Co-opbank')} style={styles.modalItem}>
                                            <Text>Co-opBank</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => selectGender('Eximbank')} style={styles.modalItem}>
                                            <Text>Eximbank</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => selectGender('LienVietPostBank')} style={styles.modalItem}>
                                            <Text>LienVietPostBank</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => selectGender('MBBank')} style={styles.modalItem}>
                                            <Text>MBBank</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => selectGender('NCB Bank')} style={styles.modalItem}>
                                            <Text>NCB Bank</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => selectGender('PVComBank')} style={styles.modalItem}>
                                            <Text>PVComBank</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => selectGender('SacomBank')} style={styles.modalItem}>
                                            <Text>SacomBank</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => selectGender('SCB Bank')} style={styles.modalItem}>
                                            <Text>SCB Bank</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => selectGender('SeABank')} style={styles.modalItem}>
                                            <Text>SeABank</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => selectGender('SHBBank')} style={styles.modalItem}>
                                            <Text>SHBBank</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => selectGender('TechcomBank')} style={styles.modalItem}>
                                            <Text>TechcomBank</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => selectGender('TPBank')} style={styles.modalItem}>
                                            <Text>TPBank</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => selectGender('VIB Bank')} style={styles.modalItem}>
                                            <Text>VIB Bank</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => selectGender('VietcomBank')} style={styles.modalItem}>
                                            <Text>VietcomBank</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => selectGender('VietinBank')} style={styles.modalItem}>
                                            <Text>VietinBank</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => selectGender('VPBank')} style={styles.modalItem}>
                                            <Text>VPBank</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                                            <Text>Close</Text>
                                        </TouchableOpacity>
                                    </ScrollView>
                                </View>
                            </View>
                        </Modal>

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
                        <Image
                            source={selectedGender ? bankImages[selectedGender] : require("../../assets/ImageBank/Agribank.png")}
                            style={styles.image}
                            />
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
    },
    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.25,
        borderColor: '#777',
        padding: 6,
        borderRadius: 100,
        justifyContent: 'space-between',
        backgroundColor: "#5555",


    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    selectedGenderText: {
        flex: 1,
        marginLeft: 10
    },

})
export default BankAccounts
