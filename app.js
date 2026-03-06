let playlist = []
let currentIndex = 0

const audio = document.getElementById("audio")

// SEARCH MUSIC FROM YOUTUBE
async function searchMusic(){

let q = document.getElementById("search").value

if(q.length < 2) return

let url = `https://ytsearch.vercel.app/api/search?q=${q}`

try{

let res = await fetch(url)

let data = await res.json()

playlist = data

let results = document.getElementById("results")

results.innerHTML = ""

data.forEach((song,i)=>{

results.innerHTML += `

<div class="song" onclick="playSong(${i})">

<img src="${song.thumbnail}">

<div>

<div>${song.title}</div>
<div>${song.channel}</div>

</div>

</div>

`

})

}catch(e){

console.log("Search error",e)

}

}

// PLAY SONG
function playSong(i){

currentIndex = i

let song = playlist[i]

document.getElementById("title").innerText = song.title
document.getElementById("artist").innerText = song.channel
document.getElementById("cover").src = song.thumbnail

audio.src = `https://youtube.com/watch?v=${song.videoId}`

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
