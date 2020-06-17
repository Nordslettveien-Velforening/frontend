export type UserBase = {
    email: string,
    givenName: string,
    surname: string,
    mobile: string,
    houseNo: string
}

export type User = UserBase & {
    uid: string
}

export type UserSignup = UserBase & {
    password: string
}

export type LoginCredentials = {
    email: string,
    password: string
}

export type AuthProvider = {
    isLoggedIn: boolean,
    user: User | void,
    createUser: (userSignup: UserSignup) => Promise<User>,
    login: (c: LoginCredentials) => Promise<User | void>,
    logout: () => Promise<void>,
    isLoading: boolean
}
