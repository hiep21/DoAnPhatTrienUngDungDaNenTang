export interface CreateGame {
    tenTroChoi: string,
    moTaTroChoi: string,
    doTuoi: number,
    theLoai: string,
    gia: number,
    nhaCungCap: string,
    gioiThieuTroChoi: string,
    kichCoFile: number,
    trangThai: string
}
export interface InfoGame {
    id: string,
    tenTroChoi: string,
    moTaTroChoi: string,
    trangThai: string,
    doTuoi: number,
    theLoai: string,
    kichCoFile: number,
    gia: number,
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
    id: string,
    nameFile: string,
    imageUri: string
}