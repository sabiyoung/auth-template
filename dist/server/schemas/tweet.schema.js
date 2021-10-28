import mongoose from 'mongoose';
import '../../shared/models/tweet.model.js';
const { Schema, model } = mongoose;
const tweetSchema = new Schema({
    text: { type: String, require: true },
    img: { type: String, require: true },
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    likes: { type: Number, default: 0, require: true },
    disLikes: { type: Number, default: 0, require: true },
});
export const TweetModel = model('Tweet', tweetSchema);
//# sourceMappingURL=tweet.schema.js.map