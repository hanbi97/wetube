import routes from "../routes";

export const getJoin =(req,res)=>{
    res.render("join",{pageTitle:"Join"});
};

export const postJoin =(req,res)=>{
    //get join information
    const{
        body: {name, email, password, password2}
    }=req;
    //check the password == password2
    if(password!=password2){
        res.status(400);
    }
    else{
        //to do: register user, user login
        res.redirect(routes.home);
    }
    res.render("join");
};

export const getLogin=(req,res)=>{
    res.render("login",{pageTitle:"Login"});
}
export const postLogin=(req,res)=>{
    //to do: check users's password in database
    res.redirect(routes.home);
};

export const logout=(req,res)=>{
    //to do: process logout
    res.redirect(routes.home);
}
export const userDetail = (req,res)=>res.render("userDetail",{pageTitle:"userDetail"});
export const editProfile = (req,res)=>res.render("editProfile",{pageTitle:"editProfile"});
export const chagnePassword = (req,res)=>res.render("changePassword",{pageTitle:"changePassword"});