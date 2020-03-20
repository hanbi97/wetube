const videoContainer =document.getElementById('jsVideoPlayer');
const videoPlayer =document.querySelector('#jsVideoPlayer video');
const playBtn =document.querySelector('#jsPlayButton');
const volumeBtn = document.querySelector('#jsVolumeButton');
const fullBtn = document.querySelector("#jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");

const registerView =() =>{
   const videoId = window.location.href.split("/videos/")[1];

   fetch(`/api/${videoId}/view`,{
       method:"POST"
   });
}

const formatDate = seconds =>{
    const secondsNum = parseInt(seconds,10);
    let hours =Math.floor(secondsNum/3600);
    let minutes = Math.floor((secondsNum-hours*3600)/60);
    let totalSeconds = secondsNum-hours*3600-minutes*60;

    if(hours<10){
        hours=`0${hours}`;
    }
    if(minutes<10){
        minutes=`0${minutes}`;
    }
    if(seconds<10){
        totalSeconds=`0${totalSeconds}`;
    }

    return `${hours}:${minutes}:${totalSeconds}`;
};

function handleplayVideo(){
    if(videoPlayer.paused){
        videoPlayer.play();
        playBtn.innerHTML='<i class="fas fa-pause"></i>';
    }else{
        videoPlayer.pause();
        playBtn.innerHTML='<i class="fas fa-play"></i>';
    }
}

function handleMute(){
    if(videoPlayer.muted){
        videoPlayer.muted=false;
        volumeBtn.innerHTML='<i class="fas fa-volume-up"></i>';
        volumeRange.value= videoPlayer.volume;
    }else{
        videoPlayer.muted=true;
        volumeBtn.innerHTML='<i class="fas fa-volume-mute"></i>';
        volumeRange.value=0;
    }
}

function goFullScreen(){
    //customize event listener
    if(videoContainer.requestFullscreen){
        videoContainer.requestFullscreen();
    }else if(videoContainer.msRequestFullscreen){
        videoContainer.msRequestFullscreen();
    }
    fullBtn.innerHTML='<i class="fas fa-compress"></i>';
    fullBtn.removeEventListener("click",goFullScreen);
}

function exitFullScreen(){
    fullBtn.innerHTML='<i class="fas fa-expand"></i>';
    fullBtn.addEventListener("click",goFullScreen);
    document.exitFullscreen();
}

function getCurrentTime(){
    currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
}

function setTotalTime(){
    const totalTimeString = formatDate(videoPlayer.duration);
    totalTime.innerHTML=totalTimeString;
    setInterval(getCurrentTime,1000);
}

function handleEnded(){
    registerView();
    videoPlayer.currentTime=0;
    playBtn.innerHTML='<i class="fas fa-play"></i>';
}

function handleDrag(){
    const{
        target:{value}
    }=event;
    videoPlayer.volume=value;
    if(value>=0.7){
        volumeBtn.innerHTML='<i class="fas fa-volume-up"></i>';
    }else if(value>=0.2 && value<0.6){
        volumeBtn.innerHTML='<i class="fas fa-volume-down"></i>';
    }else{
        volumeBtn.innerHTML='<i class="fas fa-volume-off"></i>';
    }
}

function init(){//check the user is in here
    videoPlayer.volume=0.5;
    playBtn.addEventListener("click",handleplayVideo);
    volumeBtn.addEventListener("click",handleMute);
    fullBtn.addEventListener("click",goFullScreen);
    fullBtn.addEventListener("click",exitFullScreen);
    videoPlayer.addEventListener("loadedmetadata",setTotalTime);
    videoPlayer.addEventListener("ended",handleEnded);
    volumeRange.addEventListener("input",handleDrag);
}

if(videoContainer){
    init();
}