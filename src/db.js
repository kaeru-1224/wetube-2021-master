import moongose from "mongoose" 
//mongodb://127.0.0.1:27017

moongose.connect(`mongodb://127.0.0.1:27017/new`);

const db =moongose.connection;
const handleOpen=()=>console.log("Connect to DB💚");
const handleError=(error)=>{console.log("DB error",error);};

//on:여러번가능
db.on("error",handleError)
//once:한번만
db.once("open",handleOpen)


