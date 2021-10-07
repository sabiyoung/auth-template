import { User } from "./user.model.js";


export interface Tweet{
    _id?: any;
    user?: string | User,
    text: string,
    img?: string
}