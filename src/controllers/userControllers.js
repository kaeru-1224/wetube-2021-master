import User from"../models/User"
import bcrypt from "bcrypt"



//유저생성
export const getJoin=(req,res)=> {

    res.render("Join",{pageTitle:"Join"});
}
export const postJoin= async (req,res)=> {
    const {email,username,password,password2,name,location} =req.body;
    const exists= await User.exists({ $or:[{username},{email}]})
    if(password !==password2){
        return res.status(404).render("Join",{pageTitle,errorMessage:"Password confirmation does not match"});

    }
    const pageTitle="Join"
    if(exists){
        return res.status(404).render("Join",{pageTitle,errorMessage:"This username/email is already taken"});
    }

    /*const emailExists= await User.exists({email})
    if(usernameExists){
        return res.render("Join",{pageTitle,errorMessage:"This user name is already taken"});}
    if(emailExists){ return res.render("Join",{pageTitle,errorMessage:"This email is already taken"});}*/

    await User.create({
        email,
        username,
        password,
        password2,
        name,
        location
        
    })

    res.redirect("/login")
}



//로그인
export const getLogin =(req,res)=>{res.render("login",{pageTitle:"Login"});}

//로켓펀치

export const postLogin =async (req,res)=> {
    const {username,password}=req.body;
    const user = await User.findOne({username})
    const pageTitle="Login"
    if(!user){
        return res.status(400).render("login",{pageTitle,errorMessage:"An account with this username dosent exist"})
    }
        //계정있는지

    //비밀번호 일치하는지확인
    // 해싱된 값을 알고있으므로, 입력 받은 값을 다시 해싱해서 그 값과 비교를 해주면됨 
    

    const ok = await  bcrypt.compare(password,user.password);
    if(!ok){  return res.status(400).render("login",{pageTitle,errorMessage:"Wrong password"})}
    req.session.loggedIn= true; 
    req.session.user=user
    return res.redirect("/");}


//유저수정 
//1. 유저 창 보여주기 
export const getEdit=(req,res)=> {return res.render("profile"),{pageTitle:"Edit Profile"}}
//2. 유저 정보 수정하기
export const postEdit = async (req,res)=> {
    const {
        session: { 
                    user:{_id,avatarUrl},}
                    ,body:{name,email,username,location},file }=req; 
    const updateUser=await User.findByIdAndUpdate(_id,{
        avatarUrl: file ? file.path : avatarUrl,
        name,email,username,location},{new: true});
    req.session.user=updateUser;
    return res.redirect("/user/edit")}

/*
브라우저
req
미들웨어를 통과
res.locals.loggedIn=Boolean(req.session.loggedIn)
res.locals.siteName= "Wetube"
res.locals.loggedInUser=req.session.user;

res


단계
각 단계에서 어떤 문제가 생길까?
req
    - 서버가 죽었다
    - 주소가 틀렸다
        - URL 주소 구성
        - http://   localhost   :4001 /user 경로   method POST, GET 
    - 
*/

export const deleteUser =(req,res)=>res.send("delete user");

export const see =(req,res)=>res.send("see");
export const logout= (req,res)=>res.send("logout")

// sudo apt-get install net-tools
