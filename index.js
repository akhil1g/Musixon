// var blindingg = new Audio("music/blindinglights.mp3");
// var b=document.getElementById("blinding");
// b.addEventListener('click',function()
// {
// 	blindingg.play();
// });
// document.addEventListener('key');



let nowPlaying = document.querySelector('.now-playing');
let trackArt = document.querySelector('.track-art');
let trackName = document.querySelector('.track-name');
let trackArtist = document.querySelector('.track-artist');

let playpauseBtn = document.querySelector('.playpause-track');
let nextBtn = document.querySelector('.next-track');
let prevBtn = document.querySelector('.prev-track');

let seekSlider = document.querySelector('.seek-slider');
let volumeSlider = document.querySelector('.volume-slider');
let currTime = document.querySelector('.current-time');
let totalDuration = document.querySelector('.total-duration');

let randomIcon = document.querySelector('.fa-random');
let currTrack = document.createElement('audio');

let index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;



const songData = [
    {
        img : 'images/faded.jpg',
        name : 'Faded',
        artist : 'Alan Walker',
        music : 'music/Faded.mp3'
    },
    {
        img : 'images/fallingdown.jpg',
        name : 'Falling Down',
        artist : 'Wid Cards',
        music : 'music/fallingdown.mp3'
    },
    {
        img : 'images/ratherbe.jpg',
        name : 'Rather Be',
        artist : 'Clean Bandit',
        music : 'music/Rather Be.mp3'
    },
    {   
        img : 'images/stay.jpg',
        name : 'Stay',
        artist : 'The Kid LAROI, Justin Bieber',
        music : 'music/stay.mp3'
    },
    {
        img : 'images/blindinglights.jpg',
        name: 'Blinding Lights',
        artist: 'The Weekend',
        music: 'music/blindinglights.mp3'
    }
    ,
    {
        img : 'images/jbpurpose.webp',
        name: 'Purpose',
        artist: 'Justin Bieber',
        music: 'music/loveurself.mp3'
    },
    {
        img : 'images/kesariya.jpg',
        name: 'Kesariya',
        artist: 'Arijit Singh',
        music: 'music/kesariya.mp3'
    },
    {
        img : 'images/eminem.jpg',
        name: 'Kill Shot',
        artist: 'Eminem',
        music: 'music/killshot.mp3'
    }
];


loadTrack(index);


function loadTrack(index){
    clearInterval(updateTimer);
    reset();

    currTrack.src = songData[index].music;
    currTrack.load();

    trackArt.style.backgroundImage = "url(" + songData[index].img + ")";
    trackName.textContent = songData[index].name;
    trackArtist.textContent = songData[index].artist;
    nowPlaying.textContent = "Playing Track " + (index + 1) + " of " + songData.length;

    updateTimer = setInterval(setUpdate, 1000);

    currTrack.addEventListener('ended', nextTrack);
}


function reset(){
    currTime.textContent = "00:00";
    totalDuration.textContent = "00:00";
    seekSlider.value = 0;
}


function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}


function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}


function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}


function repeatTrack(){
    let current_index = index;
    loadTrack(current_index);
    playTrack();
}


function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}


function playTrack(){
    currTrack.play();
    isPlaying = true;
    playpauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}


function pauseTrack(){
    currTrack.pause();
    isPlaying = false;
    playpauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}


function nextTrack(){
    if(index < songData.length - 1 && isRandom === false){
        index += 1;
    }else if(index < songData.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * songData.length);
        index = random_index;
    }else{
        index = 0;
    }
    loadTrack(index);
    playTrack();
}


function prevTrack(){
    if(index > 0){
        index -= 1;
    }else{
        index = songData.length -1;
    }
    loadTrack(index);
    playTrack();
}


function seekTo(){
    let seekto = currTrack.duration * (seekSlider.value / 100);
    currTrack.currentTime = seekto;
}


function setVolume(){
    currTrack.volume = volumeSlider.value / 100;
}


function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(currTrack.duration)){
        seekPosition = currTrack.currentTime * (100 / currTrack.duration);
        seekSlider.value = seekPosition;

        let currentMinutes = Math.floor(currTrack.currentTime / 60);
        let currentSeconds = Math.floor(currTrack.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(currTrack.duration / 60);
        let durationSeconds = Math.floor(currTrack.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        currTime.textContent = currentMinutes + ":" + currentSeconds;
        totalDuration.textContent = durationMinutes + ":" + durationSeconds;
    }
}