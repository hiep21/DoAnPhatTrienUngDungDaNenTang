import axios from 'axios'
import { BuyGameForAccount, CreateGame, NotificationInterface } from "./interfaces/GameService";

export const BASE_URL = 'http://10.147.17.52:5221/InfoFile/'

export const BASE_URL_APK_FILE = 'http://10.147.17.52:5221/FileGame/'

export const BASE_URL_Image = 'http://10.147.17.52:5221/ImageFile/'

export const BASE_URL_Image_Icon = "http://10.147.17.52:5221/ImageIcon/"

export const BASE_URL_Notification = "http://10.147.17.52:5221/Notification/"

export const BASE_URL_UserBuyGame = "http://10.147.17.52:5221/UserBuyGame/"

// API Post
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

export const postFileApk = (documentUri: string, nameDocumentUri: string) => {
    let formData: any = new FormData();
    formData.append('fileGame', {
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
export const updateFileApk = (documentUri: string, nameDocumentUri: any) => {
    let formData: any = new FormData();
    formData.append('fileGame', {
        uri: documentUri,
        type: 'application/vnd.android.package-archive',
        name: nameDocumentUri,
    });
    return axios({
        method: "POST",
        url: BASE_URL_APK_FILE.concat("updateFile"),
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: formData
    })
}

export const postImage = (imageUri: string, nameImageUri: string, nameGame: any) => {
    let formData: any = new FormData();
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
export const postImageIcon = (imageUri: string, nameImageUri: string, nameGame: any) => {
    let formData: any = new FormData();
    formData.append('imageFile', {
        uri: imageUri,
        type: 'image/jpeg', // Hoặc 'image/png', tùy thuộc vào loại hình ảnh bạn chọn
        name: nameImageUri, // Tên tệp hình ảnh khi gửi lên server
    });
    return axios({
        method: "POST",
        url: BASE_URL_Image_Icon.concat("addImageIcon/").concat(nameGame),
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: formData

    })
}
export const CreateNotification = ({ nameGame, forAccount, result, reason }: NotificationInterface) => {
    return axios({
        method: "POST",
        url: BASE_URL_Notification.concat('createNotification'),
        data: {
            nameGame,
            forAccount,
            result,
            reason
        }
    })
}
export const CreateUserBuyGame = ({ nameGame, forAccount, cost }: BuyGameForAccount) => {
    return axios({
        method: "POST",
        url: BASE_URL_UserBuyGame.concat('createUserBuyGame'),
        data: {
            nameGame,
            forAccount,
            cost
        }
    })
}

// API Put
export const UpdateGame = ({ tenTroChoi, moTaTroChoi, doTuoi, theLoai, gia, nhaCungCap, gioiThieuTroChoi, kichCoFile, trangThai }: CreateGame) => {
    return axios({
        method: "put",
        url: BASE_URL.concat("updateInfoFile"),
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

// API Get
export const getByName = () => {
    return axios({
        method: "GET",
        url: BASE_URL.concat("getInfoFile")
    })
}
export const getInfoFileNCC = (username: string) => {
    return axios({
        method: "GET",
        url: BASE_URL.concat("getInfoFileNCC/").concat(username)
    })
}
export const getInfoFileAdmin = () => {
    return axios({
        method: "GET",
        url: BASE_URL.concat("getInfoFileAdmin")
    })
}
export const getById = (id: string) => {

    return axios({
        method: "GET",
        url: BASE_URL.concat("getInfoFileById/").concat(id)

    })

}

export const getAllImage = () => {

    return axios({
        method: "GET",
        url: BASE_URL_Image.concat("getAllImage/")

    })

}
export const getImageGame = (filename: string) => {

    return axios({
        method: "GET",
        url: BASE_URL_Image.concat("getImageName/").concat(filename)

    })

}
export const getImageIconGame = (fileName: string) => {

    return axios({
        method: "GET",
        url: BASE_URL_Image_Icon.concat("getImageName/").concat(fileName)

    })

}
export const GetNotification = (forAccount: string) => {
    return axios({
        method: "GET",
        url: BASE_URL_Notification.concat("getNotification/").concat(forAccount)

    })

}
export const GetUserBuyGame = (nameGame: string) => {
    return axios({
        method: "GET",
        url: BASE_URL_UserBuyGame.concat("getUserBuyGame/").concat(nameGame)
    })

}
export const GetUserBuyGameByDayAndMonth = (month: string, year: string) => {
    return axios({
        method: "GET",
        url: BASE_URL_UserBuyGame.concat("getUserBuyGameByDayAndMonth/").concat(month).concat("/").concat(year)
    })

}
export const GetGameByDayAndMonth = (month: string, year: string) => {
    return axios({
        method: "GET",
        url: BASE_URL_APK_FILE.concat("getGameByDayAndMonth/").concat(month).concat("/").concat(year)
    })

}
//API Delete
export const deleteApi = (tenTroChoi: string) => {
    return axios({
        method: "DELETE",
        url: BASE_URL.concat("deleteInfoFile/").concat(tenTroChoi)
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
export const deleteImageIcon = (tenTroChoi: any, tenHinhAnh: any) => {
    return axios({
        method: "DELETE",
        url: BASE_URL_Image_Icon.concat("deleteImage/").concat(tenTroChoi).concat("/").concat(tenHinhAnh)
    })
}
export const deleteFolder = (tenTroChoi: any) => {
    return axios({
        method: "DELETE",
        url: BASE_URL_APK_FILE.concat("deleteFolderFile/").concat(tenTroChoi)
    })
}


export const DeleteNotification = (nameGame: string) => {
    return axios({
        method: "delete",
        url: BASE_URL_Notification.concat("deleteNotification/").concat(nameGame),
    })
}