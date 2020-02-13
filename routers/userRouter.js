import express from "express";
import routes from "../routes";
import { users, userDetail, editProfile, chagnePassword } from "../controllers/userController";

const userRouter = express.Router();

//userRouter.get(routes.users,users);
userRouter.get(routes.editProfile,editProfile);
userRouter.get(routes.changePassword,chagnePassword);
userRouter.get(routes.userDetail,userDetail);

export default userRouter;

