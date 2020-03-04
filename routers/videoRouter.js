import express from "express";
import routes from "../routes";
import {videoDetail, deleteVideo, getUpload, postUpload, getEditVideo, postEditVideo } from "../controllers/videoController";
import { uploadVideoMiddleware } from "../middlewares";

const videoRouter = express.Router();

//videoRouter.get(routes.videos,videos);
videoRouter.get(routes.upload,getUpload);
videoRouter.post(routes.upload,uploadVideoMiddleware, postUpload);

videoRouter.get(routes.editVideo(),getEditVideo);
videoRouter.post(routes.editVideo(),postEditVideo);

videoRouter.get(routes.videoDetail(),videoDetail);
videoRouter.get(routes.deleteVideo(),deleteVideo);

export default videoRouter;