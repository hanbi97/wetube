import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import User from "./models/User";
import { githubLoginCallback, facebookLoginCallback } from "./controllers/userController";
import routes from "./routes";
import dotenv from "dotenv";
dotenv.config();

//user strategy(way for logging in)
passport.use(User.createStrategy()); //creates a configured passport-local LocalStrategy

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:3000${routes.githubcallback}`
    },
    githubLoginCallback
  )
);

passport.use(
    new FacebookStrategy(
    {
        clientID: process.env.FB_ID,
        clientSecret: process.env.FB_SECRET,
        callbackURL: `https://1cdf0d4d.ngrok.io${routes.facebookcallback}`,
        profileFields:['id','displayName','photos','email'],
        scope:['public_profile','email']
    },
      facebookLoginCallback
    )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
