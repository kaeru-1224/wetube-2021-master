import moongose from "mongoose";
//mongodb://127.0.0.1:27017

moongose.connect(`mongodb://127.0.0.1:27017/new`);

const db = moongose.connection;
const handleOpen = () => console.log("Connect to DBð");
const handleError = (error) => {
  console.log("DB error", error);
};

//on:ì¬ë¬ë²ê°ë¥
db.on("error", handleError);
//once:íë²ë§
db.once("open", handleOpen);

db.dropDatabase();
