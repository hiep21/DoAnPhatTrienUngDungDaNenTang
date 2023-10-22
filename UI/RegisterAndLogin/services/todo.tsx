
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { LoginData, LoginDataToken, RegisterData, UpdateRegister } from "./interfaces/User.interface";

const BASE_URL_REGISTER = 'http://26.115.177.223:5133/Register/'
const BASE_URL_LOGIN = 'http://26.115.177.223:5133/Login/'
export const BASE_URL_Image = 'http://26.115.177.223:5133/ImageIcon/'

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
export const UpdateRegisterApi = (username: string, { user, name, email, password, newPassword, note, gender, dateOfBirth, address, phone, image }: UpdateRegister) => {
    return axios({
        method: "put",
        url: BASE_URL_REGISTER.concat("updateRegister/").concat(username),

        data: {
            user,
            password,
            newPassword,
            name,
            email,
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
export const getByUser = (user: string) => {
    return axios({
        method: "GET",
        url: BASE_URL_REGISTER.concat("getByUser/").concat(user),
    })
}
export const deleteUsers = (user: string) => {
    return axios({
        method: "delete",
        url: BASE_URL_LOGIN.concat("delete/").concat(user),
    })
}


export const saveTokenToDevice = async (tokenToSave: LoginDataToken) => {
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
export const postImageAva = (imageUri: string, nameImageUri: string, username: string) => {
    let formData = new FormData();
    formData.append('imageFile', {
        uri: imageUri,
        type: 'image/jpeg', // Hoặc 'image/png', tùy thuộc vào loại hình ảnh bạn chọn
        name: nameImageUri, // Tên tệp hình ảnh khi gửi lên server
    });
    return axios({
        method: "POST",
        url: BASE_URL_Image.concat("addimage/").concat(username),
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: formData

    })
}
export const getImageIcon = (username: string) => {

    return axios({
        method: "GET",
        url: BASE_URL_Image.concat("GetImageByUser/").concat(username)

    })

}
export const deleteImage = (user: string, imageName: string) => {
    return axios({
        method: "delete",
        url: BASE_URL_Image.concat("deleteImage/").concat(user).concat("/").concat(imageName.replace(".png", "")),
    })
}
