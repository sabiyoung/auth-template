import mongoose from 'mongoose';
import '../../shared/models/comment.model.js';
const { Schema, model } = mongoose;
const commentSchema = new Schema({
    text: { type: String, require: true },
    tweetID: { type: mongoose.Types.ObjectId, ref: 'Tweet' },
    img: { type: String },
});
export const CommentModel = model('Comment', commentSchema);
//# sourceMappingURL=comment.schema.js.map