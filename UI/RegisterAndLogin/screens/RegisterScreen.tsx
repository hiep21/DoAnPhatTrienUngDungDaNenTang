
import React, { useState, Component } from "react"
import { View, StyleSheet, Text, TextInput ,TouchableOpacity, Alert, Modal,} from "react-native"
import { registerApi } from "../services/todo"
import { validateEmail } from "../Utils/validate"
import Background from "./Background"
import { ErrorMessage, Formik } from "formik"
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    user: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    
    dateOfBirth: Yup.string().required("Date of Birth is required"),
    gender: Yup.string().required("Gender is required"),
    
    
    });

const RegisterScreen = ({ navigation }) => {


const [ user, setUser ] = useState<string>("")
const [ email, setEmail ] = useState<string>("")
const [ password, setPassword ] = useState<string>("")
const [ rePassword, setRePassword ] = useState<string>("")
const [isLoading, setIsLoading] = useState<boolean>(false)
const [dateOfBirth, setDateOfBirth] = useState<string>();
const [isModalVisible, setIsModalVisible] = useState(false);
const [selectedGender, setSelectedGender] = useState(null);

const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
};

const selectGender = (Gender) => {
    setSelectedGender(Gender);
    toggleModal();
};



const register = async() => {
    
    if(password != rePassword) {
        return alert("Mật khẩu không khớp")
    }

    //Validate email
   if(!validateEmail(email)) {
    return alert("Email không hợp lệ")
   }

    try {
        const registerResponse = await registerApi({ 
            user,
            email,
            password,
            dateOfBirth,
            gender
        });
        navigation.navigate('LoginScreen')
        const { data } = registerResponse
        
    } catch(err) {
        alert(err.response.data.message)
    }
    if(!isLoading) {
        setIsLoading(true)
        try {
            const registerResponse = await registerApi({ 
                user,
                email,
                password,
                dateOfBirth,
                gender
            });
            navigation.navigate('LoginScreen')
            const { data } = registerResponse
            
        } catch(err) {
            alert(err.response.data.message)
        }
        setIsLoading(false)
    }
   

}

return (
    
    <Background>
        <View style={styles.container}>
            <Text style={styles.mainText}>Register</Text>
            <Formik initialValues={{
                user: "",
                password: "",
                confirmPassword: "",
                email: "",
                dateOfBirth: "",
                gender: "", 
            }}
            validationSchema={validationSchema}
            onSubmit={register}
            >
            {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <View style={styles.mainContainer}>
                <View style={styles.content}>
                    <Text style={styles.label}>User</Text>
                    <TextInput value={user} onChangeText={(value) => {
                        setUser(value), handleChange("user")
                    }}  style={styles.input} onBlur={handleBlur("user")}/>
                    <ErrorMessage component={Text} name="user" style={styles.errorText}/>
                    <Text style={styles.label} >Email</Text>
                    <TextInput value={email} onChangeText={(value) => {
                        setEmail(value), handleChange("email")
                    }} onBlur={handleBlur("email")} style={styles.input} placeholder = "...@gmail.com"/>
                    <ErrorMessage component={Text} name="email" style={styles.errorText} />
                    <Text style={styles.label}>Date of birth</Text>
                    <TextInput
                        value={dateOfBirth}
                        onChangeText={(value) => {
                            setDateOfBirth(value); handleChange("dateOfBirth")
                        }}
                        style={styles.input}
                        onBlur={handleBlur("dateOfBirth")}
                        placeholder="DD/MM/YYYY"/>
                        <ErrorMessage component={Text} name="dateOfBirth" style={styles.errorText} />
                    <Text style={styles.label}>Gender</Text>
                
                    <TouchableOpacity onPress={toggleModal} style={styles.dropdownButton}>
                        <Text style={styles.selectedGenderText}> 
                            {selectedGender ? selectedGender : 'Select Gender'} 
                        </Text>
                    </TouchableOpacity>

                    <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={toggleModal}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <TouchableOpacity onPress={() => selectGender('Male')} style={styles.modalItem}>
                                    <Text>Male</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => selectGender('Female')} style={styles.modalItem}>
                                    <Text>Female</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => selectGender('Other')} style={styles.modalItem}>
                                    <Text>Other</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                                    <Text>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <ErrorMessage component={Text} name="gender" style={styles.errorText} />

                    <Text style={styles.label} >Password</Text>
                    <TextInput value={password} onChangeText={(value) => {
                        setPassword(value), handleChange("password")
                    }} onBlur={handleBlur("password")}  style={styles.input} secureTextEntry/>
                    <ErrorMessage component={Text} name="password" style={styles.errorText} />
                    <Text style={styles.label}>Enter the password</Text>
                    <TextInput value={rePassword} onBlur={handleBlur("confirmPassword")} onChangeText={(value) => {
                        setRePassword(value), handleChange("confirmPassword")
                    }}   style={styles.input} secureTextEntry/>
                    <ErrorMessage component={Text} name="confirmPassword" style={styles.errorText} />
                

                
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.buttonSignup} disabled={isSubmitting} onPress={register}>
                            <Text style= {styles.textbtn}>Signup</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contenLogin}>
                        <Text style={styles.text}>Already have an account?</Text>
                        <TouchableOpacity style={styles.buttonLogin} onPress={() => navigation.navigate('LoginScreen')}>
                            <Text style= {styles.textLogin}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                )}
            </Formik>

        </View>
    </Background>
    
)
}
const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10


    },
    mainText: {
        
        fontSize: 30,
        fontWeight: "900",
        color:"#fff"
    },
    content: {
        alignItems: "flex-start",
        
        width: "80%",
        
    },
    mainContainer:{
        marginVertical:10,
        backgroundColor:"#fff",
        height:700,
        width:390,
        borderTopLeftRadius:130,
        paddingTop: 35,
        alignItems: "center"
    },
    input: {
        borderWidth: 1,
        borderColor: "#bbb",
        paddingVertical: 2,
        paddingHorizontal: 10,
        borderRadius: 100,
        width: "100%",
        backgroundColor:"#5555"
    },
    label: {
        marginVertical: 1,
        fontWeight:"600",
        color:'#17741d',
        fontSize: 16
    },
    buttons: {
        alignItems:"center",
        width: 320,
        marginTop: 20
    },
    buttonSignup: {
        borderWidth: 1,
        borderColor: "#177413",
        padding: 5,
        borderRadius: 100,
        backgroundColor: "#27bc32",
        width: "85%",
        alignItems: "center"
    },
    textbtn:{
        fontWeight: "bold",
        color: '#fff',
        fontSize: 18
        

    },
    buttonLogin: {
        alignItems: "center"
    },
    textLogin:{
        fontWeight: "bold",
        color: '#177413',
    },
    contenLogin:{
        flexDirection: "row",
        justifyContent: "space-between",
    },
    text:{
        fontWeight:"500",
        color:'#222'
    },

    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#bbb',
        padding: 7,
        borderRadius: 100,
        justifyContent: 'space-between',
        backgroundColor: "#5555"
    },
    selectedGenderText: {
        flex: 1,
        color: "#777"
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
    errorText: {
        color: "red",
        fontSize: 14,
    },
})
export default RegisterScreen