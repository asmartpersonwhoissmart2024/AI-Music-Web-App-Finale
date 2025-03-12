Hand_Pan_Music="";
Die_With_A_Smile="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_Hand_Pan = "";
song_Die_With_A_Smile = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    Hand_Pan_Music = loadSound("music2.mp3");
    Die_With_A_Smile = loadSound("Lady Gaga, Bruno Mars - Die With A Smile (Official Music Video).mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    song_Hand_Pan = Hand_Pan_Music.isPlaying();
    console.log(song_Hand_Pan);

    song_Die_With_A_Smile = Die_With_A_Smile.isPlaying();
    console.log(song_Die_With_A_Smile);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        Die_With_A_Smile.stop();
        if(song_Hand_Pan == false){
            Hand_Pan_Music.play();
        }
        else{
            console.log("Song Name: Hand Pan Music");
            document.getElementById("song_id").innerHTML = "Song Name: Hand Pan Music";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        Hand_Pan_Music.stop();
        if(song_Die_With_A_Smile == false){
            Die_With_A_Smile.play();
        }
        else{
            console.log("Song Name: Die With A Smile Song");
            document.getElementById("song_id").innerHTML = "Song Name: Die With A Smile Song";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}