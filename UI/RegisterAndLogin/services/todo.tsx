
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const BASE_URL = 'https://64f767c49d77540849538bb1.mockapi.io/todo/'
export interface RegisterData {
    user: string,
    email: string,
    password: string,
    note: string,
    gender: string,
    dateOfBirth: string
        
}

export interface LoginData {
    user: string
    password: string
    
}
export const registerApi = ({ user, email, password, note, gender, dateOfBirth }: RegisterData) => {
    return axios({
        method: "POST",
        url: 'http://192.168.1.12:5133/Register/createRegister',
        data: {
            user,
            email,
            password,
            note,
            gender,
            dateOfBirth
            
        }
    })
}

export const loginApi = ({ user, password }: LoginData) => {
    return axios({
        method: "POST",
        url: BASE_URL.concat("/Login"),
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
export const saveTokenToDevice = async (tokenToSave: string) => {
    try {
        await SecureStore.setItemAsync('accessToken', tokenToSave)
        return true
    } catch(error) {
        console.log("Loi khi luu access token", error)
    }
    return false
}

export const getAccessToken = async() => {
    try {
        const accessToken = await SecureStore.getItemAsync('accessToken')
        if(accessToken) {
            return accessToken
        }
    } catch(error) {
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