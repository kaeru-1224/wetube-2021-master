//서버 작동파일 
import "./db"
import "./models/Video"
import"./models/User"
import app from "./server"

const port=4001;
const handelListenig=()=> console.log(`✨ Server listenting on port http://localhost:${port} 💚`);
app.listen( port, handelListenig);