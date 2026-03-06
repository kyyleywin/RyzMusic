let playlist = []
let currentIndex = 0

let audio = document.getElementById("audio")

// LOAD TRENDING SONGS DI HALAMAN UTAMA
async function loadHome(){

try{

let res = await fetch("https://yt-music-api.herokuapp.com/api/yt/trending")

let data = await res.json()

playlist = data

let trending = document.getElementById("trending")

trending.innerHTML = ""

data.forEach((song,i)=>{

trending.innerHTML += `

<div class="card" onclick="playSong(${i})">

<img src="${song.thumbnail}">

<p>${song.name}</p>

</div>
`

})

}catch(err){

console.log("Error load trending:",err)

}

}

// SEARCH MUSIC
async function searchMusic(){

let q = document.getElementById("search").value

if(q.length < 2) return

try{

let res = await fetch(`https://yt-music-api.herokuapp.com/api/yt/search/${q}`)

let data = await res.json()

playlist = data

let results = document.getElementById("results")

results.innerHTML = ""

data.forEach((song,i)=>{

results.innerHTML += `

<div class="song" onclick="playSong(${i})">

<img src="${song.thumbnail}">

<div>

<div>${song.name}</div>
<div>${song.artist}</div>

</div>

</div>

`

})

}catch(err){

console.log("Search error:",err)

}

}

// PLAY SONG
function playSong(i){

currentIndex = i

let song = playlist[i]

document.getElementById("title").innerText = song.name
document.getElementById("artist").innerText = song.artist
document.getElementById("cover").src = song.thumbnail

audio.src = song.url

audio.play()

}

// NEXT SONG
function next(){

currentIndex++

if(currentIndex >= playlist.length){

currentIndex = 0

}

playSong(currentIndex)

}

// PREVIOUS SONG
function prev(){

currentIndex--

if(currentIndex < 0){

currentIndex = playlist.length - 1

}

playSong(currentIndex)

}

// PLAY / PAUSE
function toggle(){

if(audio.paused){

audio.play()

}else{

audio.pause()

}

}

// AUTO NEXT SONG
audio.addEventListener("ended",()=>{

next()

})

// LOAD TRENDING SAAT APP DIBUKA
loadHome()
