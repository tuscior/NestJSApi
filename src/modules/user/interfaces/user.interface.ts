import { Cart } from "../../cart/interfaces/cart.interface";

export interface User {
    username: String;
    firstname?: String;
    surename?: String;
    password: String;
    description?: String;
    cart?: any;
    id: String;
}

export interface DeleteRO {
    ok: string,
    count: number,
}

export interface IGetUserAuthInfoRequest extends Request {
    user: any // or any other type
}