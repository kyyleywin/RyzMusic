let playlist=[]
let current=0

async function searchMusic(){

let q=document.getElementById("search").value

let res=await fetch(`https://ytmusic-api.vercel.app/search?q=${q}`)

let data=await res.json()

let results=document.getElementById("results")

results.innerHTML=""

playlist=data.data

data.data.forEach((song,i)=>{

results.innerHTML+=`
<div class="song">
<img src="${song.thumbnail}">
<div>
${song.title}<br>
${song.artist}
</div>

<button onclick="playSong(${i})">Play</button>
</div>
`

})

}

function playSong(i){

current=i

let song=playlist[i]

document.getElementById("songTitle").innerText=song.title

document.getElementById("cover").src=song.thumbnail

let player=document.getElementById("player")

player.src=`https://youtube.com/watch?v=${song.videoId}`

player.play()

}

function nextSong(){

current++

playSong(current)

}

function prevSong(){

current--

playSong(current)

}

function togglePlay(){

let player=document.getElementById("player")

if(player.paused){

player.play()

}else{

player.pause()

}

}