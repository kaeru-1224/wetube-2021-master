
import express from "express";
import "./models/Video"
import {localMiddleware } from"./middleware";
import morgan from "morgan";
import session from "express-session";
import videoRouter from "./routers/videoRouters";
import userRouter from"./routers/userRouters";
import rootRouter from "./routers/rootRouter";


const app= express();
const logger=morgan("dev");

app.use(logger);
/*✔middlewares? 
결론적으로는 middlewares==controller인데 handle과의 차이는  next()의 유무 
handle은  response로 받아주고 끝나는데,middlewares는  request와  response사이에서 
도움을주므로
👉middleware는 request와 response 사이에서 역할을해준다 
👉middleware는 req와  res에 next() function을통해 접근이 가능하다 
*/


//2. get request
//1)누군가가 /(=root page)로 get request를 보내게되는경우 콜백 함수가 작동됨
//브라우저가  get request를 보내고 있어서,  getrequest에 우리가 반응할때까지 로딩되는것
//🤔계속 로딩되는 이유가 이게맞나? 
//request를 받을경우 우리는 response를 return해줘야함
//그런데 여기서 우리는 res.end()를 return해주면서  request를 종료시켜줌





//server:24시간 내내 온라인이된 컴퓨터로  request(= 사용자의 움직임을)를 듣고있음

//listen: 서버 가 시작될때 listen내의 콜백함수가 작동함
//port번호,콜백함수

app.set("view engine","pug")
app.set("views",process.cwd()+"/src/views")

//웹사이트에 들어온 사람들을 기억: 세션이 id를통해 브라우저를 기억하도록 도와주므로, 세션에 정보를 넣을 수 있음
// 서버가 브라우저에게 서버 아이디를 줌
app.use(session({
    secret:"Hello!",
    resave:true,
    saveUninitialized:true}))
app.use(express.urlencoded({extended:true}));

app.use((req,res,next)=> {
    req.sessionStore.all((error,sessions)=>{console.log(sessions); next()})
})

app.use(localMiddleware)
//express.static()폴더를 노출시켜줌: 폴더 내의 파일을 볼수잇게 해줌(어떻게?)
app.use("/uploads",express.static("uploads"))
// 폴더를 노출시켜주고 경로를 지정해줌 
app.use("/static",express.static("assets"))
app.use("/",rootRouter)
app.use("/user",userRouter)
app.use("/video",videoRouter)
console.log(process.cwd());
export default app;