import app from "./app"; //default로 export시 이렇게 가능
import "./db";
import dotenv from "dotenv";
dotenv.config();
import Video from "./models/Video";
import Comment from "./models/Comment";

const PORT = process.env.PORT || 3000;

const handleListening =()=>console.log(`Listening on: http://localhost:${PORT}`);

app.listen(PORT,handleListening);