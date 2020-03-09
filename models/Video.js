//we will save a video's link(not byte file)
import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    fileUrl: {
        type: String,
        required: "File URL is required"//url 값 없는 비디오 생성하면 이게 나옴
    },
    title:{
        type:String,
        required: "Title is required"
    },
    description:String,
    views:{
        type:Number,
        default: 0
    },
    createdAt:{
        type:Date,
        default: Date.now //function
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]
})

const model = mongoose.model("Video",VideoSchema);

export default model;