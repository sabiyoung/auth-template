import mongoose from 'mongoose';
import { Tweet } from '../../shared/models/tweet.model.js';

const {Schema, model} = mongoose;

const tweetSchema = new Schema<Tweet>({
    text: {type: String, require: true},
   img: {type: String, require: true},
   user: {type: mongoose.Types.ObjectId, ref: 'User'}
})

export const TweetModel = model<Tweet>('Tweet', tweetSchema)