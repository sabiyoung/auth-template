import { Tweet } from "./tweet.model.js";
import * as mongoose from 'mongoose';
export interface Comment{
    _id?: number;
    text: string;
    img?: string;
    tweet?: Tweet;
    tweetID?:{type: mongoose.Types.ObjectId}
   
}