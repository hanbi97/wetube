import express from "express";
import routes from "../routes";
import {videoDetail, deleteVideo, getUpload, postUpload, getEditVideo, postEditVideo } from "../controllers/videoController";
import { uploadVideoMiddleware, onlyPrivate } from "../middlewares";

const videoRouter = express.Router();

//videoRouter.get(routes.videos,videos);
videoRouter.get(routes.upload,onlyPrivate,getUpload);
videoRouter.post(routes.upload,onlyPrivate,uploadVideoMiddleware, postUpload);

videoRouter.get(routes.editVideo(),onlyPrivate,getEditVideo);
videoRouter.post(routes.editVideo(),onlyPrivate,postEditVideo);

videoRouter.get(routes.videoDetail(),videoDetail);
videoRouter.get(routes.deleteVideo(),onlyPrivate,deleteVideo);

export default videoRouter;