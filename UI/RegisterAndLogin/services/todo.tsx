
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { BankAccount, GameManager, LoginData, LoginDataToken, RegisterData, UpdateLogin, UpdateRegister } from "./interfaces/User.interface";

export const BASE_URL_REGISTER = 'http://10.147.17.52:5026/Register/'
export const BASE_URL_LOGIN = 'http://10.147.17.52:5026/Login/'
export const BASE_URL_Image = 'http://10.147.17.52:5026/ImageIcon/'
export const BASE_URL_GameManager = "http://10.147.17.52:5026/GameManager/"
export const BASE_URL_BankAccount = "http://10.147.17.52:5026/BankAccount/"


export const registerApi = ({ username, name, email, password, note, gender, dateOfBirth, address, phone }: RegisterData) => {
    return axios({
        method: "POST",
        url: BASE_URL_REGISTER.concat('createRegister'),
        data: {
            username,
            name,
            email,
            password,
            note,
            gender,
            dateOfBirth,
            address,
            phone,
        }
    })
}

export const loginApi = ({ username, password }: LoginData) => {
    return axios({
        method: "POST",
        url: BASE_URL_LOGIN.concat("createLogin"),
        data: {
            username,
            password
        }
    })
}
export const CreateGameManager = ({ username, nameGame, isBuy, isInstall }: GameManager) => {
    return axios({
        method: "POST",
        url: BASE_URL_GameManager.concat("create"),
        data: {
            username,
            nameGame,
            isBuy,
            isInstall
        }
    })
}
export const postImageAva = (imageUri: string, nameImageUri: string, username: string) => {
    let formData: any = new FormData();
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
// đăng lý stk
export const CreateBankAccount = ({ account, accountNumber, nameBank }: BankAccount) => {
    return axios({
        method: "POST",
        url: BASE_URL_BankAccount.concat('createBankAccount'),
        data: {
            account,
            accountNumber,
            nameBank

        }
    })
}

// API Put
export const UpdateRegisterApi = ({ username, name, email, password, newPassword, note, gender, dateOfBirth, address, phone }: UpdateRegister) => {
    return axios({
        method: "put",
        url: BASE_URL_REGISTER.concat("updateRegister/").concat(username),

        data: {
            username,
            password,
            newPassword,
            name,
            email,
            note,
            gender,
            dateOfBirth,
            address,
            phone

        }
    })
}
export const UpdateGameManager = ({ username, nameGame, isBuy, isInstall }: GameManager) => {
    return axios({
        method: "put",
        url: BASE_URL_GameManager.concat("update"),

        data: {
            username,
            nameGame,
            isBuy,
            isInstall

        }
    })
}

export const UpdateBankAccount = ({ account, accountNumber, nameBank }: BankAccount) => {
    return axios({
        method: "put",
        url: BASE_URL_BankAccount.concat('updateBankAccount'),
        data: {
            account,
            accountNumber,
            nameBank

        }
    })
}
export const UpdateStateLogin = ({ username, password, checkOnline }: UpdateLogin) => {
    return axios({
        method: "put",
        url: BASE_URL_LOGIN.concat('updateLogin'),
        data: {
            username,
            password,
            checkOnline

        }
    })
}


// API Get

export const GetStateAccount = (username: string) => {

    return axios({
        method: "GET",
        url: BASE_URL_LOGIN.concat("getStateAccount/").concat(username)

    })

}
export const GetAccountByUser = (username: string) => {

    return axios({
        method: "GET",
        url: BASE_URL_BankAccount.concat("getAccountByUser/").concat(username)

    })

}
export const GetAllBankAccount = () => {

    return axios({
        method: "GET",
        url: BASE_URL_BankAccount.concat("getAll/")

    })

}

export const getByUser = (user: string) => {
    return axios({
        method: "GET",
        url: BASE_URL_REGISTER.concat("getByUser/").concat(user),
    })
}
export const getAllAccount = () => {
    return axios({
        method: "GET",
        url: BASE_URL_REGISTER.concat("getAll"),
    })
}
export const getGameManager = (user: string) => {
    return axios({
        method: "GET",
        url: BASE_URL_GameManager.concat("getByUser/").concat(user),
    })
}
export const getImageIcon = (username: string) => {

    return axios({
        method: "GET",
        url: BASE_URL_Image.concat("GetImageByUser/").concat(username)

    })

}

// API Delete
export const deleteUsers = (user: string) => {
    return axios({
        method: "delete",
        url: BASE_URL_LOGIN.concat("delete/").concat(user),
    })
}
export const DeleteAccount = (user: string) => {
    return axios({
        method: "delete",
        url: BASE_URL_REGISTER.concat("delete/").concat(user),
    })
}

export const deleteImage = (user: string, imageName: string) => {
    return axios({
        method: "delete",
        url: BASE_URL_Image.concat("deleteImage/").concat(user).concat("/").concat(imageName),
    })
}

export const DeleteBankAccount = (username: string) => {
    return axios({
        method: "delete",
        url: BASE_URL_BankAccount.concat("deleteBankAccount/").concat(username),
    })
}
//Token
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