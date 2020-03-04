import routes from "../routes";
import Video from "../models/Video";

export const home = async(req,res) => {
    try{
        const videos = await Video.find({}); //wait for finding video in model
        res.render("home",{videos});
    }catch(error){
        console.log(error);
        res.render("home",{videos:[]});
    }
};

export const search = (req,res) => {
    const {
        query:{term : searchingBy}
    } =req;
    // const searchingBy = req.query.term;
    res.render("search", {pageTitle: "Search", searchingBy: searchingBy, videos});
}

export const getUpload = (req,res) => {
    res.render("upload");
}

export const postUpload = async(req,res) => {
    const{ 
        body:{title, description},
        file: {path}
     }=req;
   
     const newVideo = await Video.create({
         fileUrl: path,
         title,
         description
     });
     console.log(newVideo);
    res.redirect(routes.videoDetail(newVideo.id));
    //to do: upload and save video
};

export const videoDetail = (req,res) => res.render("videoDetail");

export const editVideo = (req,res) => res.render("editVideo");

export const deleteVideo = (req,res) => res.render("deleteVideo");
