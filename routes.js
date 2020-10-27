// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// Users
const USERS = "/users";
const USER_DETAIL = "/:id";
//-> /users/1
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

// Videos
const VIDEOS ="/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO ="/:id/edit";
const DELETE_VIDEO ="/:id/delete";
const ME ="/me";

//Github
const GITHUB="/auth/github";
const GITHUB_CALLBACK="/auth/github/callback";

//Facebook
const FACEBOOK ="/auth/facebook";
const FACEBOOK_CALLBACK ="/auth/facebook/callback";

//API
const API = "/api";
const REGISTER_VIEW = "/:id/view";
const ADD_COMMENT = "/:id/comment";

//object to export
const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    search: SEARCH,
    users: USERS,
    userDetail: (id)=>{
        if(id){
            return `/users/${id}`;
        }
        else{
            return USER_DETAIL;
        }
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    videos: VIDEOS,
    upload: UPLOAD,
    videoDetail:(id)=>{
        if(id){
            return `/videos/${id}`;
        }
        else{
            return VIDEO_DETAIL;
        }
    },
    editVideo: id=>{
        if(id){
            return `/videos/${id}/edit`;
        }else{
            return EDIT_VIDEO;
        }
    },
    deleteVideo: id=>{
        if(id){
            return `/videos/${id}/delete`;
        }else{
            return DELETE_VIDEO
        }
    },
    github:GITHUB,
    githubCallback:GITHUB_CALLBACK,
    me:ME,
    facebook:FACEBOOK,
    facebookcallback:FACEBOOK_CALLBACK,
    api:API,
    registerView:REGISTER_VIEW,
    addComment: ADD_COMMENT
};

export default routes;