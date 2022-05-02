import { global } from "./global.js"

let song;
let queuedSong;

let talkSFXarray = new Array()

// TODO: maybe wrap al lthis up in a class instead of just having a heap of export functions

export function loadSong(songName) {
	queuedSong = loadSound("resources/sound/music/" + songName + ".mp3");
}

export function loadSFX(sfxName) {
	// "resources/sound/sfx/"
}

function checkFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();
     
    if (xhr.status == "404") {
        return false;
    } else {
        return true;
    }
}

export function loadTalkSFX(characterName) {
	
	if (talkSFXarray.length) {
		talkSFXarray = new Array()
	}

	let i = 0

	while (checkFileExist("resources/sound/sfx/" + characterName + "/talk" + i + ".wav")) {
		let sound = loadSound("resources/sound/sfx/" + characterName + "/talk" + i + ".wav"/*,  sfx => {talkSFXarray.push(sfx); return talkSFXarray}*/)
		talkSFXarray.push(sound)
		i++
	}

	// let i=0

	// while (loadSound("resources/sound/sfx/" + characterName + "/talk" + i + ".wav") != null) {
	// 	talkSFXarray.push(loadSound("resources/sound/sfx/" + characterName + "/talk" + i + ".wav"))
	// 	i++
	// }
	
	console.log(talkSFXarray.length + " SFX files imported")
}

export function playTalkSFX() {
	let index = getRandomInteger(0, talkSFXarray.length)

	if (talkSFXarray[index].isLoaded()) {
		let noise = talkSFXarray[index].play(0, 1, global.sfxVolume * global.masterVolume);
		//noise.setVolume(global.sfxVolume * global.masterVolume)
	}
}


export function playSong() {
	if (!queuedSong.isLoaded())
	{
		setTimeout(playSong, 500); // try again in half a second
		return
	}

	// if (typeof(song) != "undefined") {
	// 	if (song.isLoaded()) {
	// 		if (song.isPlaying()) {
	// 			song.stop()
	// 		}
	// 	}
	// }

	song = queuedSong;
	
	song.loop();
	updateSongVolume();
}

// may need to be called when volume updated from main menu
export function updateSongVolume() {
	song.setVolume( global.songVolume * global.masterVolume );
}


export function pauseMusic() {
  if (song.isPlaying()) {
    song.pause(); // .play() will resume from .pause() position
  } else {
    song.play();
  }
}