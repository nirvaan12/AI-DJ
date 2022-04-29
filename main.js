song="";

function preload(){
    song= loadSound("music.mp3");
}
scoreLeftWrist=0;
rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0
function setup(){
    canvas= createCanvas(600,500);
    canvas.center();

    video=createVideo(VIDEO);
    video.hide();

    posenet= ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("Model is initialized");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
 
      scoreLeftWrist=results[0].pose.keypoints[9].score;

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX = "+rightWristX+" rightWristY = "+rightWristY);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX = "+leftWristX+" leftWristY = "+leftWristY);
    }
}



function draw(){
    image(video,0,0,600,500);
    fill("blue");
    stroke("black");
   
    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        inNumberLeftWrist=Number(leftWristY);
        removeDecimal= floor(inNumberLeftWrist);
        volume= removeDecimal/500;
        document.getElementById("volume").innerHTML="Volume =  "+volume;
        song.setVolume(volume);
    }
}

function playSound(){
    song.play();
    song.rate(1);
    song.setVolume(1);
}