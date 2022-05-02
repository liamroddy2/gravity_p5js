import { global } from "./global.js"

// Constants
const Y_AXIS = 1;
const X_AXIS = 2;
let b1, b2, b3, b4, c1, c2;



let hue1 = 0
let hue2 = 120 // 60 for simple vert and hor split
let hue3 = 240
let hue4 = 360

let hueShiftPerFrame = 0.3

let sat = 40
let bright = 95

let doInterpolation = true;
let interpolateThisFrame = false;

export function setupBackground()
{
	colorMode(HSB)
  
  // Define colors
  b1 = color(hue1, sat, bright);
  b2 = color(hue2, sat, bright);
  //c1 = color(204, 102, 0);
  //c2 = color(0, 102, 153);
}

export function drawBackground()
{
	colorMode(HSB)
  // Update colors
    hue1 = incrementHue(hue1)
   hue2 = incrementHue(hue2)
   hue3 = incrementHue(hue3)
   hue4 = incrementHue(hue4)
    
  b1 = color(hue1, sat, bright);
  b2 = color(hue2, sat, bright);
  b3 = color(hue3, sat, bright);
  b4 = color(hue4, sat, bright);
  
  	interpolateThisFrame = !interpolateThisFrame;
    
    //horizontal split
    setGradient(0, 0, width / 2, height, b1, b2, X_AXIS);
  setGradient(width / 2, 0, width / 2, height, b2, b1, X_AXIS);
  
    // vertical split
//    setGradient(0, 0, width, height/2, b1, b2, Y_AXIS);
//  setGradient(0, height/2, width, height/2, b2, b1, Y_AXIS);
    
    // vert rainbow
//    setGradient(0, 0, width, height/2, b1, b2, Y_AXIS);
//  setGradient(0, height/2, width, height/2, b2, b3, Y_AXIS);
    
    // quad vert split - demi rainbow (i.e. only ranges 180 hue, not 360, so big leap from b4 to b1 at bottom)
    // kinda dumb, can just do with above vert split, and b1 and b2 
//    setGradient(0, 0, width, height/4, b1, b2, Y_AXIS);
//  setGradient(0, height/4, width, height/4, b2, b3, Y_AXIS);
//    setGradient(0, height/2, width, height/4, b3, b4, Y_AXIS);
//  setGradient(0, 3*(height/4), width, height/4, b4, b1, Y_AXIS);
    
    // split effect, interesting
//  setGradient(0, 0, width / 2, height, b1, b2, Y_AXIS);
//  setGradient(width / 2, 0, width / 2, height, b2, b1, Y_AXIS);
}

function incrementHue(hue) {
    hue += hueShiftPerFrame  * global.gameSpeed
    if (hue >= 360)
      {
        hue -= 360
      }
    return hue
}

function setGradient(x, y, w, h, c1, c2, axis) {
	colorMode(RGB)
	noFill();

	let skipAmount = pixelDensity()
  
	if (axis === Y_AXIS) {
	  // Top to bottom gradient
	  for (let i = y; i <= y + h; i++) {
		let inter = map(i, y, y + h, 0, 1);
		let c = lerpColor(c1, c2, inter);
		stroke(c);
		line(x, i, x + w, i);
	  }
	} else if (axis === X_AXIS) {
	  // Left to right gradient
	  if (doInterpolation)
	  {
		// unclear what, if any, performance gain we get here.
		let alt = interpolateThisFrame ? 1 : 0;

		for (let i = x + alt; i <= x + w; i+=2) {
			let inter = map(i, x, x + w, 0, 1);    
			let c = lerpColor(c1, c2, inter);
			stroke(c);
			line(i, y, i, y + h);
		}
	  }
	  else
	  {
		for (let i = x; i <= x + w; i++) {
			let inter = map(i, x, x + w, 0, 1);    
			let c = lerpColor(c1, c2, inter);
			stroke(c);
			line(i, y, i, y + h);
		}
	}
	}
  }