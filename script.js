const wrapper = document.querySelector(".wrapper");
const playPauseBtn = document.querySelector(".play-pause i");
const audio = document.querySelector("#main-audio");

const progressArea = document.querySelector(".progress-area");
const progressBar = document.querySelector(".progress-bar");
const currentTimeEl = document.querySelector(".current");
const durationEl = document.querySelector(".duration");

const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const repeatBtn = document.querySelector("#repeat");

const songImg = document.querySelector(".song-img");
const songName = document.querySelector(".name");
const songArtist = document.querySelector(".artist");

const musicList = document.querySelector(".music-list");
const queueBtn = document.querySelector("#queue");
const closeBtn = document.querySelector("#close");

/* SONG LIST */
const songs = [
    { name: "Hilesa Hilesa", artist: "DSP", src: "music/song1.mp3", img: "images/song1.jpg" },
    { name: "Mallika Gandha", artist: "Sid Sriram", src: "music/song2.mp3", img: "images/song2.jpg" },
    { name: "Yeedhe", artist: "Rambabu", src: "music/song3.mp3", img: "images/song3.jpg" },
    { name: "Prema Velluva", artist: "SidSriram", src: "music/song4.mp3", img: "images/song4.jpg" },
    { name: "Sasirekha", artist: "Bheems Ceciroleo", src: "music/song5.mp3", img: "images/song5.jpg" },
    { name: "Godari Gattu", artist: "Ramana Gogula, Madhu Priya", src: "music/song6.mp3", img: "images/song6.jpg" },
    { name: "Uppenantha", artist: "K.K", src: "music/song7.mp3", img: "images/song7.jpg" },
    { name: "Crazy Feeling", artist: "Prudhvi Chandra", src: "music/song8.mp3", img: "images/song8.jpg" },
    { name: "Love", artist: "LV Revanth, Sahithi", src: "music/song9.mp3", img: "images/song9.jpg" },
    { name: "Inthandham", artist: "SPB Charan", src: "music/song10.mp3", img: "images/song10.jpg" },
    { name: "Inkem Inkem Inkem Kaavale", artist: "Sid Sriram", src: "music/song11.mp3", img: "images/song11.jpg" },
    { name: "Niluvadhamu Ninu Epudaina", artist: "Karthik, Sumangali", src: "music/song12.mp3", img: "images/song12.jpg" }
];

let songIndex = 0;

/* LOAD SONG */
function loadSong(index) {
    audio.src = songs[index].src;
    songImg.src = songs[index].img;
    songName.innerText = songs[index].name;
    songArtist.innerText = songs[index].artist;


    audio.load();
}

/* PLAY */
function playMusic() {
    wrapper.classList.add("playing"); // IMPORTANT for image rotation
    playPauseBtn.innerText = "pause";
    audio.play();
}

/* PAUSE */
function pauseMusic() {
    wrapper.classList.remove("playing");
    playPauseBtn.innerText = "play_arrow";
    audio.pause();
}

/* PLAY / PAUSE BUTTON */
playPauseBtn.addEventListener("click", () => {
    audio.paused ? playMusic() : pauseMusic();
});

/* NEXT SONG */
nextBtn.addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    playMusic();
});

/* PREVIOUS SONG */
prevBtn.addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    playMusic();
});

/* UPDATE PROGRESS BAR */
audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;

    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + "%";

    let curMin = Math.floor(audio.currentTime / 60);
    let curSec = Math.floor(audio.currentTime % 60);
    if (curSec < 10) curSec = "0" + curSec;
    currentTimeEl.innerText = `${curMin}:${curSec}`;

    let durMin = Math.floor(audio.duration / 60);
    let durSec = Math.floor(audio.duration % 60);
    if (durSec < 10) durSec = "0" + durSec;
    durationEl.innerText = `${durMin}:${durSec}`;
});

/* SEEK USING PROGRESS BAR */
progressArea.addEventListener("click", (e) => {
    if (!audio.duration) return;

    const width = progressArea.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
});

/* 🔁 REPEAT BUTTON - RESTART SONG AND KEEP ROTATION */
repeatBtn.addEventListener("click", () => {
    audio.currentTime = 0;
    playMusic(); // ensures image rotates
});

/* WHEN SONG ENDS → AUTO NEXT */
audio.addEventListener("ended", () => {
    nextBtn.click();
});

/* SHOW SONG LIST */
queueBtn.addEventListener("click", () => {
    musicList.classList.add("show");
});

/* HIDE SONG LIST */
closeBtn.addEventListener("click", () => {
    musicList.classList.remove("show");
});

/* MINIMIZE PLAYER */
const expandBtn = document.getElementById("expandBtn");
if (expandBtn) {
    expandBtn.addEventListener("click", () => {
        wrapper.classList.toggle("minimize");
    });
}

/* CLICK SONG FROM LIST */
document.querySelectorAll(".music-list li").forEach((li, index) => {
    li.addEventListener("click", () => {
        songIndex = index;
        loadSong(songIndex);
        playMusic();
        musicList.classList.remove("show");
    });
});

/* VOLUME CONTROL WITH ICON CHANGE */

const volumeSlider = document.getElementById("volumeSlider");
const volumeIcon = document.getElementById("volumeIcon");

if (volumeSlider) {
    volumeSlider.addEventListener("input", () => {

        audio.volume = volumeSlider.value;

        if (audio.volume == 0) {
            volumeIcon.innerText = "volume_off";
        } else if (audio.volume < 0.5) {
            volumeIcon.innerText = "volume_down";
        } else {
            volumeIcon.innerText = "volume_up";
        }

    });
}

/* CLICK ICON TO MUTE */

volumeIcon.addEventListener("click", () => {

    if (audio.volume > 0) {
        audio.volume = 0;
        volumeSlider.value = 0;
        volumeIcon.innerText = "volume_off";
    } else {
        audio.volume = 1;
        volumeSlider.value = 1;
        volumeIcon.innerText = "volume_up";
    }

});

const menuBtn = document.getElementById("menuBtn");
const menuBox = document.querySelector(".menu-box");

menuBtn.addEventListener("click", () => {
    menuBox.classList.toggle("show");
});

/* MENU BUTTONS */

const homeBtn = document.getElementById("homeBtn");
const muteBtn = document.getElementById("muteBtn");

/* HOME → OPEN PLAYLIST */

if (homeBtn) {
    homeBtn.addEventListener("click", () => {
        musicList.classList.add("show");
    });
}

/* VOLUME → MUTE / UNMUTE */

if (muteBtn) {
    muteBtn.addEventListener("click", () => {

        if (audio.volume > 0) {
            audio.volume = 0;
            muteBtn.innerText = "🔇 Mute";
        } else {
            audio.volume = 1;
            muteBtn.innerText = "🔊 Volume";
        }

    });
}

/* INITIAL LOAD */
loadSong(songIndex);