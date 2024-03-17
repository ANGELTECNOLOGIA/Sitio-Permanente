var nombre = prompt("¿Cuál es tu nombre?");
alert("Hola " + nombre + ". En este sitio encontrarás contenido relacionado a varias de las cosas que me gustan, como la formula 1, entre otras cosas más, descubrelo por ti mismo :)");

const audio = document.querySelector("audio");
const title = document.querySelector("h1");
const author = document.querySelector("h2")
const prev = document.getElementById("prev");
const play = document.getElementById("play");
const next = document.getElementById("next");
const current_time = document.getElementById("current_time");
const current_audio = document.getElementById("current_audio");
const progressContainer = document.querySelector(".progress_container");
const progress = document.getElementById("progress");
const back10 = document.getElementById("back10");
const plus10 = document.getElementById("plus10");

const songs = ["How You Get The Girl", "Skapate", "Sobreviviste", "One Spark", "Sunburn Surrender", "Desvelo", "Somebody's Watching Me", "Todo o Nada", "La Intención"];
const authors = ["Taylor Swift", "Los de Abajo ft. Julieta Venegas, Dr.Shenka, Edw Dub", "Morat", "TWICE", "Capital Cities", "C-Kan, Raymix", "Rockwell, Michael Jackson", "Lunay, Anitta", "Christian Nodal, Peso Pluma"];

let audioIndex = 0;

loadAudio(songs[audioIndex])

function loadAudio(song) {

    title.textContent = song;
    author.textContent = authors[audioIndex];
    audio.src = `audio/${song}.mp3`; 

    audio.addEventListener("loadedmetadata", () => {
        timeSong(audio.duration, current_audio)
    })

}

function playSong() {
    play.classList.add("play");

    const icon = play.querySelector("i.fas");

    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");

    audio.play();
}

function pauseSong() {
    play.classList.remove("play");

    const icon = play.querySelector("i.fas");

    icon.classList.add("fa-play");
    icon.classList.remove("fa-pause");

    audio.pause();
}

function updateBarProgress(e) {
    const { duration, currentTime  } = e.srcElement;

    const progressPercent = (currentTime / duration) * 100;

    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickPosition = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickPosition / width) * duration;
}

function timeSong(audio, element) {

    const totalSeconds = Math.round(audio);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    element.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`
}

function prevSong() {
    audioIndex--
    if (audioIndex < 0) {
        audioIndex = songs.length - 1;
    }
    loadAudio(songs[audioIndex]);
    playSong();
}

function nextSong() {
    audioIndex++
    if (audioIndex > songs.length - 1) {
        audioIndex = 0;
    }
    loadAudio(songs[audioIndex]);
    playSong();
}

play.addEventListener("click", () => {
    const isPlaying = play.classList.contains("play")

    if (!isPlaying) {
        playSong();
    } else {
        pauseSong();
    }
})

audio.addEventListener("timeupdate", (e) => {
    updateBarProgress(e)
    timeSong(audio.currentTime, current_time)
});
progressContainer.addEventListener("click", setProgress);
prev.addEventListener("click", prevSong);
next.addEventListener("click", nextSong);

plus10.addEventListener('click', ()=>{
    audio.currentTime +=10;
})

back10.addEventListener('click', ()=>{
    audio.currentTime -=10;
})
