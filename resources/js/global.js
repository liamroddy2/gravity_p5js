class Global
{
	constructor()
	{
		// RESOLUTION AND SCALING
		this.gameScale = 0.356;//0.356; // 0.5 = 1080p; 1 = UHD 4K; 0.3ish = 768p
		// let longestDimension = Math.max(screen.width, screen.height)
		// if (longestDimension > 1920) {
		// 	this.gameScale = 1; // switch to 4k mode
		// }
		// else if (longestDimension < 1920) {
		// 	this.gameScale = 0.356; // idk tbh
		// }
		this.orientation = "landscape"
		// 16:9 ratio
		this.gameWidth = 3840 * this.gameScale;
		this.gameHeight = 2160 * this.gameScale;
		if (screen.height > screen.width) { 
			this.orientation = "portrait"
			// 9:16 ratio
			this.gameWidth = 2160 * this.gameScale;
			this.gameHeight = 3840 * this.gameScale;
		}
		
		// SPEED
		this.frameRate = 60;
		this.gameSpeed = 60/this.frameRate;

		// AUDIO 
		this.songVolume = 0.5 // range 0 - 1
		this.sfxVolume = 0.5
		this.masterVolume = 1

		// FONTS
		this.textboxFont

		// GAME STATE
		this.state = {RUNNING:1, PAUSED:2}
		this.gameState = this.state.RUNNING
		// if (this.state.RUNNING == this.gameState)
		// 	console.log("GOOBAGOO ")
	}

	loadFont()
	{

		//this.textboxFont = loadFont('resources/fonts/GloriaHallelujah-Regular.ttf');
		this.textboxFont = loadFont('resources/fonts/IndieFlower-Regular.ttf');
		//this.textboxFont = loadFont('resources/fonts/NanumPenScript-Regular.ttf');
		this.textboxFont = loadFont('resources/fonts/Pangolin-Regular.ttf');

		
		this.textboxFont = loadFont('resources/fonts/Delius-Regular.ttf');
		this.textboxFont = loadFont('resources/fonts/Itim-Regular.ttf');
		this.textboxFont = loadFont('resources/fonts/ShortStack-Regular.ttf');
		//	this.textboxFont = loadFont('resources/fonts/Chilanka-Regular.ttf');
		//this.textboxFont = loadFont('resources/fonts/Montserrat-Regular.ttf');
		//this.textboxFont = loadFont('resources/fonts/Quicksand-Regular.ttf');

		this.textboxFont = loadFont('resources/fonts/BadComic-Regular.ttf');
		this.textboxFont = loadFont('resources/fonts/FuturaHandwritten.ttf');
		//this.textboxFont = loadFont('resources/fonts/.ttf');
		//this.textboxFont = loadFont('resources/fonts/.ttf');
		//this.textboxFont = loadFont('resources/fonts/.ttf');
		//this.textboxFont = loadFont('resources/fonts/.ttf');
		//this.textboxFont = loadFont('resources/fonts/.ttf');
		//this.textboxFont = loadFont('resources/fonts/.ttf');

		//this.textboxFont = loadFont('resources/fonts/Schoolbell-Regular.ttf');
		//this.textboxFont = loadFont('resources/fonts/Mali-Regular.ttf');
		//this.textboxFont = loadFont('resources/fonts/Gaegu-Regular.ttf');
	}
}

export let global = new Global();
