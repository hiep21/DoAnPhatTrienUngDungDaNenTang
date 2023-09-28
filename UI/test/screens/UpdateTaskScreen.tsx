import { useState } from "react"
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native"
import { registerApi } from "../services/authentication"
import { validateEmail } from "../utils/validate"
import { Task } from "../services/interfaces/task.interface"
import { addTaskApi, updateTaskApi } from "../services/todo.service"

const UpdateTaskScreen = ({ navigation }) => { 


    const [task, setTask] = useState<Task>(navigation.getParam("task"))

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const addTaskAction = async() => {
        if(!isLoading) {
            setIsLoading(true)
            try {
                const { data } = await updateTaskApi(task)
                navigation.navigate("TasksScreen")
            } catch(err) {
                const errorMessage = err.response
            }
            setIsLoading(false)
        }
    }

    return (<View style={styles.container}>
        <Text style={styles.mainText}>Thêm mới công việc</Text>
        <View style={styles.content}>
            <Text style={styles.label}>Tên công việc</Text>
            <TextInput onChangeText={(value) => {
                setTask({
                    ...task,
                    title: value
                })
            }} value={task?.title} style={styles.input} />
            <Text style={styles.label}>Nội dung công việc</Text>
            <TextInput value={task?.content} onChangeText={(value) => {
                setTask({
                    ...task,
                    content: value
                })
            }}  numberOfLines={10} style={styles.input} />
        </View>
        <View style={styles.buttons}>
            <TouchableOpacity onPress={addTaskAction} style={styles.button} >
                {isLoading && <ActivityIndicator />}
                {!isLoading && <Text>Cập nhật công việc</Text>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text>Nhập lại</Text>
            </TouchableOpacity>
        </View>
    </View>)
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        padding: 20
    },
    mainText: {
        marginTop: 20,
        fontSize: 25,
        fontWeight: "900"
    },
    content: {
        alignItems: "flex-start",
        width: "100%"
    },
    input: {
        borderWidth: 1,
        borderColor: "#bbb",
        padding: 5,
        borderRadius: 5,
        width: "100%"
    },
    label: {
        marginVertical: 10
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 20
    },
    button: {
        borderWidth: 1,
        borderColor: "#000",
        padding: 15,
        borderRadius: 5,
        backgroundColor: "pink",
        width: "45%",
        alignItems: "center"
    }
})
export default UpdateTaskScreen