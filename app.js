import express from "express"; //import express
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRouter"; //default로 export 안해서 이렇게 함
import videoRouter from "./routers/videoRouter"; //default로 export 안해서 이렇게 함
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
const app = express(); // make an express application

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("dev"));

app.use(routes.home,globalRouter);
app.use(routes.users,userRouter); 
app.use(routes.videos,videoRouter); 

export default app;
