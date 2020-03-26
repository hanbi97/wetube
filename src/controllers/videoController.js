import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

export const home = async(req,res) => {
    try{
        const videos = await Video.find({}).sort({_id:-1}); //wait for finding video in model
        res.render("home",{videos});
    }catch(error){
        console.log(error);
        res.render("home",{pageTitle:"Home",videos:[]});
    }
};

export const search = async(req,res) => {
    const {
        query:{term : searchingBy}
    } =req;
    let videos=[];
    try{
        videos=await Video.find({title:{$regex: searchingBy,$options:"i" }}); //i:insensitive
    }catch(error){
        console.log(error);
    }
    res.render("search", {pageTitle: "Search", searchingBy: searchingBy, videos});
}

export const getUpload = (req,res) => {
    res.render("upload");
}

export const postUpload = async(req,res) => {
    const{ 
        body:{title, description},
        file: {location}
     }=req;
     try{
     const newVideo = await Video.create({
         fileUrl: location,
         title,
         description,
         creator: req.user.id
     });
     req.user.videos.push(newVideo.id);
     req.user.save();
    res.redirect(routes.videoDetail(newVideo.id));
     }catch(error){
         console.log(error);
         res.redirect(routes.home);
     }
};

export const videoDetail = async(req,res) => {
    const{
        params:{id}
    }=req;
    try{
    const video=await Video.findById(id).populate("creator").populate("comments");
    res.render("videoDetail",{pageTitle:video.title,video});
    }catch(error){
        console.log(error);
        res.redirect(routes.home);
    }
    
};

export const getEditVideo = async(req,res) => {
    const{
        params:{id}
    }=req;
    try{
        const video=await Video.findById(id);
        if(video.creator !== req.user.id){
            //can't edit video
            throw Error();
        }else{
            res.render("editVideo",{pageTitle: `Edit ${video.title}`,video});
        }
    }catch(error){
        console.log(error);
        res.redirect(routes.home);
    }
    
}
export const postEditVideo = async(req,res) =>{
    const{
        params:{id},
        body:{title,description}
    }=req;
    try{
       await Video.findOneAndUpdate({_id: id},{title,description}); 
       res.redirect(routes.videoDetail(id));
    }catch(error){
        res.redirect(routes.home);
    }
    res.render("editVideo");
}
export const deleteVideo = async(req,res) => {
    const{
        params:{id}
    }=req;
    try{
        const video=await Video.findById(id);
        if(video.creator !== req.user.id){
            //can't delete video
            throw Error();
        }else{
            await Video.findOneAndRemove({_id: id});
        }
    }catch(error){
        console.log(error);
    }
    res.redirect(routes.home);
}

export const postRegisterView = async(req,res)=>{
    //find the video and add view(change the db)
    const{
        params:{id}
    }=req;
    try{
        const video = await Video.findById(id);
        video.views +=1;
        video.save();
        res.status(200);
    }catch(error){
        console.log(error);
        res.status(400);
    }finally{
        res.end();
    }
}


export const postAddComment = async(req,res)=>{
    const{
        params:{id},
        body:{comment},
        user
    }=req;
    try{
        const video = await Video.findById(id);
        const newComment = await Comment.create({
            text:comment,
            creator:user.id,
            createdAt: Date.now()
        });
        video.comments.push(newComment.id);
        video.save();
    }catch(error){
        console.log(error);
        res.status(400);
    }finally{
        res.end();
    }
}