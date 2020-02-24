import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/wetube",
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