//video model을 만들기위함 
//model?:어플리케이션의형태, 데이터의 형태를  moongose에게 말해주기위함(일종의 스키마)
import mongoose from "mongoose"

//데이터의 형식을 정의해줌 
const videoSchema = new mongoose.Schema({
    title:{type: String, required:true,trim:true},
    description:{type: String, required:true,trim:true}, 
    fileUrl:{type:String, required:true },
    //디폴트 앖을 주면서 매번 같은 값을 넣어주지 않도록함
    createdAt:{type:Date, required:true,default:Date.now},
    //array도 가능
    hashtags:[{type: String,trim:true}],
    meta:{
        views:{type:Number,default:0,required:true}, 
        rating:{type:Number,default:0,required:true},
    },
});

//{type: String} ==  Stirng 이것도 객체 그거였나? 

const Video=mongoose.model("Video",videoSchema);
export default Video;