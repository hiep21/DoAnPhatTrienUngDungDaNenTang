import axios from 'axios'
import { CreateGame} from "./interfaces/GameService";

const BASE_URL = 'http://26.115.177.223:5221/InfoFile/'
const BASE_URL_BY_ID = 'http://26.115.177.223:5221/InfoFile/getInfoFileById/'
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
export const getById = (id:string) => {
    
    return axios({
        method: "GET",
        url: BASE_URL_BY_ID.concat(id)
        
    })
    
}

export const deleteApi = (tenTroChoi: string) => {
    return axios({
        method: "DELETE",
        url: BASE_URL.concat("deleteInfoFile?tenTroChoi=").concat(tenTroChoi)
    })
}

