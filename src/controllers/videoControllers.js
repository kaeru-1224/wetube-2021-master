import Video from"../models/Video"




export const home= async (req,res)=> {
    const videos= await  Video.find({}).sort({createdAt:"desc"})
    return res.render("home",{pageTitle: "Home",videos})};

export const watch = async (req,res)=>{ 
    const {id} =req.params;
    //비디오 객체를 받아줌,그리고 여기서 우리는 video 객체를 보내주어야하므로   findby~가 더 정확함
    const video = await Video.findById(id)
    if(video===null){
        return res.status(404).render("404",{pageTitle:"Video not found"})}
        return res.render("watch",{pageTitle:`${video.title}`, video})}
//search 
//params? query? 차이가 뭐지? 

export const search =async (req,res)=>{
    const {keyword}= req.query
    let videos =[];
    if(keyword){
                videos = await Video.find ({title:{$regex:new RegExp(keyword,"i")}})} 
                return res.render("search",{videos,pageTitle:`Search`})
    }


export const getEdit = async(req,res)=>{
    const {id} =req.params;
     //비디오 객체를 받아줌,그리고 여기서 우리는 video 객체를 보내주어야하므로   findby~가 더 정확함
     const video = await Video.findById(id)
    if(video===null){
        return res.render("404",{pageTitle:"Video not found"})}
    return res.render("edit",{pageTitle:`Edit ${video.title}`,video})}

export const postEdit=async(req,res)=>{
    //id로 검색하기위해 받아온 것 
    const {id} =req.params;
    //post로 받아오는 값들
    const{ title, description,hashtags}=req.body;
    //id가있는경우 참 아니면 거짓을 리턴해줌
    const video = await Video.exists({_id:id});
    if(video===null){
        return res.render("404",{pageTitle:"Video not found"})}
    /*새로운 값들을 기본 값에 업데이트해줌 
      video.title= title;
    video.description=description;
    video.hashtags=hashtags.split(",").map(word=>word.startsWith(`#`) ? word :`#${word}`);
    */
   await Video.findByIdAndUpdate(id,{ title, description,hashtags:hashtags.split(",").map(word=>word.startsWith(`#`) ? word :`#${word}`)})
    await video.save();
    return res.redirect(`/video/${id}`)
}

export const getUpload=(req,res)=>{
    return res.render("upload",{pageTitle:`Upload Video`})
};

export const postUpload = async (req,res)=>{
    const file= req.file
    const{title,description,hashtags}=req.body;
try{ 
    await  Video.create({
    title,
    description,
    fileUrl:file.path,
    hashtags: hashtags.split(",").map(word=>`#${word}`),});
    return res.redirect("/")}
//에러를 받아서 메세지로 사용자에게 보여줌
    catch(error){
        console.log(error);
        return res.status(404).render("upload",{pageTitle:`Upload Video`,errorMessage:error._message,})}

  
};



export const deleteVideo =  async(req,res)=>{
        const {id} =req.params 
        await Video.findByIdAndDelete(id)
        return res.redirect("/")}
    