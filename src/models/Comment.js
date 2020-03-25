import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
    text:{
        type: String,
        required: "Text is Required"
    },
    createdAt:{
        type: Date,
        required:Date.now
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

const model = mongoose.model("Comment",CommentSchema);
export default model;