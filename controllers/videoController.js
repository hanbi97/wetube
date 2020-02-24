import routes from "../routes";
export const home = (req,res) => {
    res.render("home",{videos:videos});
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

export const postUpload = (req,res) => {
    const{
        body:{file,title,description}
    }=req;
    res.redirect(routes.videoDetail(12334));
    //to do: upload and save video
};

export const videoDetail = (req,res) => res.render("videoDetail");

export const editVideo = (req,res) => res.render("editVideo");

export const deleteVideo = (req,res) => res.render("deleteVideo");
