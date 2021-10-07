import multer from "multer";

export const localMiddleware=(req,res,next)=>{

    res.locals.loggedIn=Boolean(req.session.loggedIn)
    res.locals.siteName= "Wetube"
    res.locals.loggedInUser=req.session.user;
    next();}

// 로그인된경우에는 원래 페이지로 아닌경우 홈페이지로 리다이렉트 진행 
 export const loginCheck= (req,res,next)=>{
    if(req.session.loggedIn){
        return next()
    } else {
        return res.redirect("/")
    }
}

//로그인 되어있는 경우 로그인페이지 들어가지 못하도록 
 export const publicOnly=(req,res,next)=>{
    if(!req.session.loggedIn){
        return next()
    } else { 
        return res.redirect("/")
    }
}

// 파일업로드 
export const uploadFiles=multer({ dest:"uploads/avatars/",limits:{fileSize:3000000,}})
export const videoFiles=multer({ dest:"uploads/videos/",limits:{fileSize:10000000,}})
