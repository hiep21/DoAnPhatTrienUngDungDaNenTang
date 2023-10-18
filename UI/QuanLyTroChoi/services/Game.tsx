import axios from 'axios'
import { CreateGame, LoginData, LoginDataToken } from "./interfaces/GameService";
import * as SecureStore from 'expo-secure-store';
const BASE_URL = 'http://26.115.177.223:5221/InfoFile/'

const BASE_URL_APK_FILE = 'http://26.115.177.223:5221/ApkFiles/'

export const BASE_URL_Image = 'http://26.115.177.223:5221/ImageFile/'

export const createGame = ({ tenTroChoi, moTaTroChoi, doTuoi, theLoai, gia, nhaCungCap, gioiThieuTroChoi, kichCoFile, trangThai }: CreateGame) => {
    return axios({
        method: "POST",
        url: BASE_URL.concat("createInfoFile"),
        data: {
            tenTroChoi,
            moTaTroChoi,
            doTuoi,
            theLoai,
            gia,
            nhaCungCap,
            gioiThieuTroChoi,
            kichCoFile,
            trangThai
        }
    })
}


export const getByName = () => {
    return axios({
        method: "GET",
        url: BASE_URL.concat("getInfoFile")
    })
}
export const getById = (id: string) => {

    return axios({
        method: "GET",
        url: BASE_URL.concat("getInfoFileById/").concat(id)

    })

}
export const getImage = (filename: string, imageName: string) => {

    return axios({
        method: "GET",
        url: "http://26.115.177.223:5221/ImageFile/getImage/".concat(filename).concat("/").concat(imageName)

    })

}

export const deleteApi = (tenTroChoi: string) => {
    return axios({
        method: "DELETE",
        url: BASE_URL.concat("deleteInfoFile/").concat(tenTroChoi)
    })
}

export const postFileApk = (documentUri: string, nameDocumentUri: string) => {
    let formData = new FormData();
    formData.append('apkFile', {
        uri: documentUri,
        type: 'application/vnd.android.package-archive',
        name: nameDocumentUri,
    });
    return axios({
        method: "POST",
        url: BASE_URL_APK_FILE.concat("addFile"),
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: formData

    })
}
export const postImage = (imageUri: string, nameImageUri: string, nameGame: string) => {
    let formData = new FormData();
    formData.append('imageFile', {
        uri: imageUri,
        type: 'image/jpeg', // Hoặc 'image/png', tùy thuộc vào loại hình ảnh bạn chọn
        name: nameImageUri, // Tên tệp hình ảnh khi gửi lên server
    });
    return axios({
        method: "POST",
        url: BASE_URL_Image.concat("addimage/").concat(nameGame),
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: formData

    })
}
export const deleteApkFile = (tenTroChoi: string) => {
    return axios({
        method: "DELETE",
        url: BASE_URL_APK_FILE.concat("deleteApkFile/").concat(tenTroChoi)
    })
}
export const deleteImage = (tenTroChoi: string, tenHinhAnh: string) => {
    return axios({
        method: "DELETE",
        url: BASE_URL_Image.concat("deleteImage/").concat(tenTroChoi).concat("/").concat(tenHinhAnh)
    })
}
export const deleteFolder = (tenTroChoi: string) => {
    return axios({
        method: "DELETE",
        url: BASE_URL_APK_FILE.concat("deleteFolderFile/").concat(tenTroChoi)
    })
}

//Đăng kí cho nhà sản xuất
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
export const registerApi = ({ user, name, email, password, note, visa, address, phone, image }: RegisterData) => {
    return axios({
        method: "POST",
        url: 'http://26.115.177.223:5133/Register/createRegister',
        data: {
            user,
            name,
            email,
            password,
            note,
            address,
            phone,
            image,
            visa,

        }
    })
}
