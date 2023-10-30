
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { BankAccount, GameManager, LoginData, LoginDataToken, RegisterData, UpdateRegister } from "./interfaces/User.interface";

const BASE_URL_REGISTER = 'http://26.115.177.223:5133/Register/'
const BASE_URL_LOGIN = 'http://26.115.177.223:5133/Login/'
export const BASE_URL_Image = 'http://26.115.177.223:5133/ImageIcon/'
const BASE_URL_GameManager = "http://26.115.177.223:5133/GameManager/"
const BASE_URL_BankAccount = "http://26.115.177.223:5133/BankAccount/"
export const registerApi = ({ user, name, email, password, note, gender, dateOfBirth, address, phone, image }: RegisterData) => {
    return axios({
        method: "POST",
        url: BASE_URL_REGISTER.concat('createRegister'),
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
export const loginApi = ({ user, password }: LoginData) => {
    return axios({
        method: "POST",
        url: BASE_URL_LOGIN.concat("createLogin"),
        data: {
            user,
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
// export const DeleteAva = (user: string) => {
//     return axios({
//         method: "delete",
//         url: BASE_URL_REGISTER.concat("delete/").concat(user),
//     })
// }
// http://26.115.177.223:5133/ImageIcon/deleteImage/

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
export const DeleteBankAccount = (username: string) => {
    return axios({
        method: "delete",
        url: BASE_URL_BankAccount.concat("deleteBankAccount/").concat(username),
    })
}