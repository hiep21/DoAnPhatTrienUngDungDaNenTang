import axios from "axios";
import { CreateGame} from "./interfaces/GameService";

const BASE_URL = 'http://192.168.1.244:5221/InfoFile/'
export const createGame = ({ tenTroChoi, moTaTroChoi, doTuoi, theLoai, gia, nhaCungCap, gioiThieuTroChoi }: CreateGame) => {
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
            gioiThieuTroChoi
        }
    })
}


export const getByName = () => {
    return axios({
        method: "GET",
        url: BASE_URL.concat("getInfoFile")
    })
}


export const deleteApi = (tenTroChoi: string) => {
    return axios({
        method: "DELETE",
        url: BASE_URL.concat("deleteInfoFile?tenTroChoi=").concat(tenTroChoi)
    })
}

