import * as mongoose from 'mongoose';
export interface User {
    _id?:{type: mongoose.Types.ObjectId}
    id?: string,
    tweet?: string,
    name: string,
    username: string,
    email: string,
    password?: string
}