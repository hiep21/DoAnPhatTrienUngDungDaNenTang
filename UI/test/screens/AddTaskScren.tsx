import { useState } from "react"
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native"
import { registerApi } from "../services/authentication"
import { validateEmail } from "../utils/validate"
import { Task } from "../services/interfaces/task.interface"
import { addTaskApi } from "../services/todo.service"
import { ErrorMessage, Formik } from "formik"
import * as Yup from 'yup'
import Background from "./Background"
const validationSchema = Yup.object().shape({
    user: Yup.string()
        .min(2,'To Short!')
        .max(20,'To Long!')
        .required("Username is required"),
    password: Yup.string().min(8).required("Password is required")
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
    email: Yup.string().email("Invalid email").required("Email is required"),
    dateOfBirth: Yup.string().required("Date of Birth is required").matches(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/\d{4}$/),
    rePassword: Yup.string().min(8).oneOf([Yup.ref('password')]).required("Confirm password is required"),
    
    
    });
const AddTaskScreen = ({ navigation }) => {


    const [task, setTask] = useState<Task>()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const addTaskAction = async () => {
        if (!isLoading) {
            setIsLoading(true)
            try {
                const { data } = await addTaskApi(task)
                navigation.navigate("TasksScreen")
            } catch (err) {
                const errorMessage = err.response
            }
            setIsLoading(false)
        }
    }

    return (
    <Background>
        <View style={styles.container}>
            <Text style={styles.mainText}>Register</Text>
            <Formik initialValues={{
                user: '',
                password: '',
                rePassword: '',
                email: '',
                dateOfBirth: '',
                gender: '', 
            }} validationSchema={validationSchema} onSubmit={AddTaskScreen}>
                {({ values,touched, handleChange, isValid, handleSubmit, isSubmitting,errors, setFieldTouched }) => (
                    <View style={styles.mainContainer}>
                    <View style={styles.content}>
                        <Text style={styles.label}>User</Text>
                        <TextInput onChangeText={(value) => {
                            setTask({
                                ...task,
                                user: value
                            })
                        }} value={task?.user} style={styles.input} />
                        
    
                        <Text style={styles.label}>Email</Text>
                        <TextInput value={task?.email} onChangeText={(value) => {
                            setTask({
                                ...task,
                                email: value
                            })
                        }} style={styles.input} />
                        <Text style={styles.label}>password</Text>
                        <TextInput value={task?.password} onChangeText={(value) => {
                            setTask({
                                ...task,
                                password: value
                            })
                        }} style={styles.input} />
                        <Text style={styles.label}>Note</Text>
                        <TextInput value={task?.note} onChangeText={(value) => {
                            setTask({
                                ...task,
                                note: value
                            })
                        }} style={styles.input} />
                        <Text style={styles.label}>Gender</Text>
                        <TextInput value={task?.gender} onChangeText={(value) => {
                            setTask({
                                ...task,
                                gender: value
                            })
                        }} style={styles.input} />
                        <Text style={styles.label}>DateOfBirth</Text>
                        <TextInput value={task?.dateOfBirth} onChangeText={(value) => {
                            setTask({
                                ...task,
                                dateOfBirth: value
                            })
                        }} style={styles.input} />
    
                        </View>
                        <View style={styles.buttons}>
                        <TouchableOpacity onPress={addTaskAction} style={styles.button} >
                            {isLoading && <ActivityIndicator />}
                            {!isLoading && <Text>Thêm công việc</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text>Nhập lại</Text>
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
export default AddTaskScreen