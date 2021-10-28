import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});
export const UserModel = model('User', userSchema);
userSchema.virtual('followers', {
    ref: 'User',
    localField: '_id',
    foreignField: 'following',
});
//# sourceMappingURL=user.schema.js.map