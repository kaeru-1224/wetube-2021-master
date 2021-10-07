import express from"express";
import {watch, getEdit,postEdit, getUpload,postUpload,deleteVideo} from "../controllers/videoControllers";
import {videoFiles} from"../middleware"
const videoRouter=express.Router();
//정규식을 이용해서 id의 형태를 지정해서  id인지 아니면 다른 문자인지를 필터링해줄 수 있음 
//정규식: 문자열로부터 특정 정보를 추출해내는 방법 
//(\d+):숫자만 가능하도록 진행 가능 

videoRouter.route("/upload").get(getUpload).post(videoFiles.single("video"),postUpload);
videoRouter.get("/:id([0-9a-f]{24})",watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo)







export default videoRouter;