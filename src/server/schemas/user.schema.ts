import mongoose from 'mongoose';
import type { User } from '../../shared/models/user.model.js';
const {Schema, model} = mongoose

const userSchema = new Schema<User>({
    name: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
  friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
   following: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  
})

export const UserModel = model<User>('User',userSchema)

userSchema.virtual('followers', {
    ref: 'User',
    localField: '_id',
    foreignField: 'following',

});
