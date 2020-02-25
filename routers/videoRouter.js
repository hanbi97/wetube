import express from "express";
import routes from "../routes";
import {videoDetail, editVideo, deleteVideo, getUpload, postUpload } from "../controllers/videoController";
import { uploadVideoMiddleware } from "../middlewares";

const videoRouter = express.Router();

//videoRouter.get(routes.videos,videos);
videoRouter.get(routes.upload,getUpload);
videoRouter.post(routes.upload,uploadVideoMiddleware, postUpload);

videoRouter.get(routes.editVideo,editVideo);
videoRouter.get(routes.videoDetail(),videoDetail);
videoRouter.get(routes.deleteVideo,deleteVideo);

export default videoRouter;