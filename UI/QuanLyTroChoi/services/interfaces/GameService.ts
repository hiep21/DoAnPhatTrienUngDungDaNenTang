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
export interface LoginDataToken {
    user: string
    email:string
    password: string
}
export interface LoginData {
    user: string
    password: string
}
export interface RegisterData {
    user: string,
    name: string,
    email: string,
    password: string,
    note: string,
    address: string,
    phone: string,
    image: string,
    visa: string

}