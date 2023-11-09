export interface CreateGame {
    tenTroChoi: string,
    moTaTroChoi: string,
    doTuoi: string,
    theLoai: string,
    gia: string,
    nhaCungCap: string,
    gioiThieuTroChoi: string,
    kichCoFile: string,
    trangThai: string
}
export interface InfoGame {
    tenTroChoi: string,
    moTaTroChoi: string,
    trangThai: string,
    doTuoi: string,
    theLoai: string,
    kichCoFile: string,
    gia: string,
    nhaCungCap: string,
    gioiThieuTroChoi: string,
}
export interface NotificationInterface {
    nameGame: string,
    forAccount: string,
    result: Boolean,
    reason: string
}
export interface ImageGameUri {
    id:string,
    nameFile:string,
    imageUri: string
}