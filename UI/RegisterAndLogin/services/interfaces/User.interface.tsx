export interface RegisterData {
    user: string,
    name: string,
    email: string,
    password: string,
    note: string,
    gender: string,
    dateOfBirth: string,
    address: string,
    phone: string,
    image: string
}
export interface UpdateRegister {
    user: string,
    password: string,
    newPassword: string,
    name: string,
    email: string,
    note: string,
    gender: string,
    dateOfBirth: string,
    address: string,
    phone: string,
    image: string
}
export interface LoginData {
    user: string
    password: string
}
export interface LoginDataToken {
    user: string
    email: string
    password: string
}