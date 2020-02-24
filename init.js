import app from "./app"; //default로 export시 이렇게 가능
import "./db";

const PORT = 3000;

const handleListening =()=>console.log(`Listening on: http://localhost:${PORT}`);

app.listen(PORT,handleListening);