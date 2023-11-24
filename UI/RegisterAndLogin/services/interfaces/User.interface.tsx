export interface RegisterData {
    username: string,
    name: string,
    email: string,
    password: string,
    note: string,
    gender: string,
    dateOfBirth: string,
    address: string,
    phone: string,
}
export interface UpdateRegister {
    username: string,
    password: string,
    newPassword: string,
    name: string,
    email: string,
    note: string,
    gender: string,
    dateOfBirth: string,
    address: string,
    phone: string,
}
export interface LoginData {
    username: string
    password: string
}
export interface LoginDataToken {
    username: string
    email: string
    note: string
    image: string
    password: string
}
export interface GameManager {
    username: string,
    nameGame: string,
    isBuy: boolean,
    isInstall: boolean
}
export interface ImageUri {
    namePath: string,
    imageUri: string
}
export interface BankAccount {
    account: string,
    accountNumber: string,
    nameBank: string
}
