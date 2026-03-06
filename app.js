let playlist=[]
let index=0
let audio=document.getElementById("audio")

async function searchMusic(){

let q=document.getElementById("search").value

if(q.length<2) return

let res=await fetch(`https://ytmusic-api.vercel.app/search?q=${q}`)

let data=await res.json()

playlist=data.data

let results=document.getElementById("results")

results.innerHTML=""

data.data.forEach((song,i)=>{

results.innerHTML+=`

<div class="song" onclick="play(${i})">

<img src="${song.thumbnail}">

<div>

<div>${song.title}</div>
<div>${song.artist}</div>

</div>

</div>

`

})

}

function play(i){

index=i

let song=playlist[i]

document.getElementById("title").innerText=song.title
document.getElementById("artist").innerText=song.artist
document.getElementById("cover").src=song.thumbnail

audio.src=`https://youtube.com/watch?v=${song.videoId}`

audio.play()

}

function next(){

index++

if(index>=playlist.length) index=0

play(index)

}

function prev(){

index--

if(index<0) index=playlist.length-1

play(index)

}

function toggle(){

if(audio.paused){

audio.play()

}else{

audio.pause()

}

}

audio.onended=()=>{

next()

}
