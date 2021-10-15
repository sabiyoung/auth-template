import mongoose from 'mongoose';
import { Comment } from '../../shared/models/comment.model.js';

const {Schema, model} = mongoose;

const commentSchema = new Schema<Comment>({
    text: {type: String, require: true},
   tweetID: {type: mongoose.Types.ObjectId, ref: 'Tweet'},
   img: {type: String},
})

export const CommentModel = model<Comment>('Comment', commentSchema);