//서버 작동파일
import regeneratorRuntime from "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";

import app from "./server";

const port = 4001;
const handelListenig = () =>
  console.log(`✨ Server listenting on port http://localhost:${port} 💚`);
app.listen(port, handelListenig);
