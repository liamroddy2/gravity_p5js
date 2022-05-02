import { global } from "./global.js"
import { AsteroidManager } from "./asteroid.js"
import { physicsEngine } from "./physics.js" 

let devMode = true;

window.preload = function() {
	//loadSong("AcidJazz")
	global.loadFont();
}


let asteroidManager;

window.setup = function ()
{
  createCanvas(global.gameWidth, global.gameHeight);
  frameRate(global.frameRate);

  asteroidManager = new AsteroidManager(10);
  
  //playSong();

}


window.draw = function () {
  	//drawBackground();

	background("black");
    
	physicsEngine.update();
	//physicsEngine.draw(); // TODO - should it draw!

    asteroidManager.update();
    asteroidManager.draw();


	handleInput();

	if (devMode)
		{
			fill(20);
			textSize(30);
			textAlign(LEFT, TOP)
			rect(10,10,300,70);
			fill(100);
			text("FPS " + Math.round(frameRate()), 10, 10);
		}
}





let mouseDownLastFrame = false;

function handleInput()
{
	if (mouseIsPressed === true) {
		asteroidManager.handleMouseDown();
		mouseDownLastFrame = true;
	  }
	else
	{
		if (mouseDownLastFrame)
		{
			asteroidManager.handleMouseUp();
		}
		mouseDownLastFrame = false;
	}
}

// INPUT

// window.mousePressed = function () {
// 	asteroidManager.addNewAsteroid(50, mouseX, mouseY);
// 	asteroidManager.handleMouse
// 	return false;
// }
