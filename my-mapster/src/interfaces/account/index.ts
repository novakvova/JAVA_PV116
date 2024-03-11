import {Status} from "../../utils/enums";

export interface ILogin {
    email: string,
    password: string,
}

export interface IUser{
    name: string,
    email: string,
    image: string,
}
export interface IAccountState {
    user: IUser | null,
    token: string | null,
    isLogin: boolean,
    status: Status;
}