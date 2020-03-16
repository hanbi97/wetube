import routes from "../routes";
import User from "../models/User";
import passport from "passport";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  //get join information
  const {
    body: { name, email, password, password2 }
  } = req;
  //check the password == password2
  if (password != password2) {
    res.status(400);
    res.render("join");
  } else {
    try {
      const user = await User({
        name,
        email
      }); //create: create user + save in db
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};

export const postLogin = passport.authenticate('local',{
    failureRedirect:routes.login,
    successRedirect: routes.home
});

export const githubLogin = passport.authenticate('github');

export const postGithubLogin=(req,res)=>{
  res.redirect(routes.home);
};

export const githubLoginCallback= async(_, __, profile, cb)=> { //this _ name means that this variable is not used
  const{_json:{id,avatar_url:avatarUrl,name,email}}=profile; //get the profile info and make a user
  try{
    const user = await User.findOne({email});
    if(user){
      //if a user is joined with an email+password and clicked login with github 
      //i find the user email matches with github and update some info of the user
      user.githubId = id;
      user.save();
      return cb(null,user);
    }else{
      //make new user with github info
      const newUser = await User.create({
        email,
        name,
        githubId:id,
        avatarUrl
      });
      return cb(null,newUser);
    }
  }catch(error){
    return cb(error);
  }

};

export const facebookLogin=passport.authenticate('facebook');

export const postFacebookLogin=(req,res)=>{
  res.redirect(routes.home);
};

export const facebookLoginCallback=async(_,__,profile,cb)=>{
  const{_json:{id,name,email}}=profile;
  try{
    const user = await User.findOne({email});
    if(user){
      user.facebookId = id;
      user.save();
      return cb(null,user);
    }else{
      //make new user with github info
      const newUser = await User.create({
        email,
        name,
        facebookId:id,
        //facebook use graph API for profile photo
        avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
      });
      return cb(null,newUser);
    }
  }catch(error){
    return cb(error);
  }
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getMe =(req,res)=>{
  res.render("userDetail", { pageTitle: "userDetail", user:req.user});
  //passport can put the user in the session
};

export const userDetail =async (req, res) => {
  const{
    params:{id}
  }=req;
  try{
    const user = await User.findById(id);
    res.render("userDetail",{pageTitle:"userDetail",user});
  }catch(error){
    console.log(error);
    res.redirect(routes.home);
  }
  res.render("userDetail", { pageTitle: "userDetail" });
};

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "editProfile" });

export const postEditProfile =async(req,res)=>{
  const{
    body:{name,email},
    file
  }=req;
  try{
    await User.findByIdAndUpdate(req.user.id,{
      name,
      email,
      avatarUrl:file?file.path : req.user.avatarUrl
    });
    res.redirect(routes.me);
  }catch(error){
    console.log(error);
    res.render("editProfile",{pateTitle:"Edit Profile"});
  }
};

export const chagnePassword = (req, res) =>res.render("changePassword", { pageTitle: "changePassword" });
