
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { LoginData, RegisterData } from "./interfaces/User.interface";

const BASE_URL = 'https://64f767c49d77540849538bb1.mockapi.io/todo/'


export const registerApi = ({ user, name, email, password, note, gender, dateOfBirth, address, phone, image }: RegisterData) => {
    return axios({
        method: "POST",
        url: 'http://26.115.177.223:5133/Register/createRegister',
        data: {
            user,
            name,
            email,
            password,
            note,
            gender,
            dateOfBirth,
            address,
            phone,
            image

        }
    })
}

export const loginApi = ({ user, password }: LoginData) => {
    return axios({
        method: "POST",
        url: "http://26.115.177.223:5133/Login/createLogin",
        data: {
            user,
            password
        }
    })
}
export const getUsers = ({ user, password }: RegisterData) => {
    return axios({
        method: "GET",
        url: BASE_URL.concat("/Game"), // Điều này giả sử rằng bạn có một API endpoint /users để lấy danh sách tài khoản đã đăng ký
        data: {
            user,
            password
        }
    })
}
export const saveTokenToDevice = async (tokenToSave: LoginData) => {
    try {
        // Chuyển đổi tokenToSave thành chuỗi bằng JSON.stringify nếu nó không phải là chuỗi
        const tokenAsString = typeof tokenToSave === 'string' ? tokenToSave : JSON.stringify(tokenToSave);
        await SecureStore.setItemAsync('accessToken', tokenAsString);
        return true;
    } catch (error) {
        console.log("Lỗi khi lưu token truy cập", error);
    }
    return false;
}

export const getAccessToken = async () => {
    try {
        const accessToken = await SecureStore.getItemAsync('accessToken')
        if (accessToken) {
            return accessToken
        }
    } catch (error) {
        console.log("Loi khi lay token", error)
    }
    return false
}

export const configAxiosWithAccessToken = (token: string) => {
    axios.interceptors.request.use(async (config) => {
        // Add the token to the headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
        (error) => {
            return Promise.reject(error);
        }
    );
}