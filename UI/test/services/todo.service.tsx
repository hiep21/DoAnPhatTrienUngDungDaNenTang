import axios from "axios"
import { Task } from "./interfaces/task.interface"

const BASE_URL = ''

export const listTaskApi = () => {
    return axios({
        method: "GET",
        url: "http://192.168.1.12:5133/Register/getByEmail"
    })
}

export const getTaskByIdApi = (id: string) => {
    return axios({
        method: "GET",
        url: BASE_URL.concat("/").concat(id)

    })
}


export const addTaskApi = ({ dateOfBirth, email, gender, note, password, user }: Task) => {
    return axios({
        method: "POST",
        url: "http://192.168.1.12:5133/Register/createRegister",
        data: {
            dateOfBirth,
            email,
            gender,
            note,
            password,
            user
        }
    })
}

export const updateTaskApi = ({ id, title, content, isDone }: Task) => {
    return axios({
        method: "PUT",
        url: BASE_URL.concat("/").concat(id),
        data: {
            title,
            content,
            isDone
        }
    })
}


export const deleteTaskApi = (id: string) => {
    return axios({
        method: "DELETE",
        url: BASE_URL.concat("/").concat(id)
    })
}