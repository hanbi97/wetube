import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
{
  useNewUrlParser: true,
  useFindAndModify: false
}
);

const handleSuccess=()=>{console.log("connected")};
const handleError=error=>{console.log(`error on db connection: ${error}`)};
const db = mongoose.connection;
db.once("open",handleSuccess);
db.on("error",handleError);