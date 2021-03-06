import express from "express";
import {
  getEdit,
  postEdit,
  deleteUser,
  see,
  logout,
  startGithubLogin,
  callbackGithubLogin,
} from "../controllers/userControllers";

import { loginCheck, uploadFiles } from "../middleware";

const userRouter = express.Router();

userRouter.get("/logout", loginCheck, logout);
//all():http 어떤 method를 이용해도 all 내의 middleware을 이용해준다는 의미
userRouter
  .route("/edit")
  .all(loginCheck)
  .get(getEdit)
  .post(uploadFiles.single("avatar"), postEdit);
userRouter.get("/delete", deleteUser);
userRouter.get("/:id", see);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/callback", callbackGithubLogin);

export default userRouter;
