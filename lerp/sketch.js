


function setup() {
  createCanvas(800, 800);
	
	start = 50
	end = 350
	//change = end-start
	duration = 100
	
	pos = 0
	time = 0
	
  
}

function draw() {
  background(100);
  
  time ++
	
//	if (pos < end)
//		{
//			//pos = easeInOutCubic(time, start, change, duration)
//		}
	
	
	pos = easeInOutElastic(time, start, end, duration)
		

  
  ellipse(pos, 50, 50, 50)
	
	
	scale = easeOutElastic(time, 0, 50, 75)
	//scale = easeInOutExpo(time, 0, 50, 50)
	
	// reset anims
	if (time > 120)
		{
			time = 0
		}
	
	
	ellipse(width-100, height-100, scale, scale)
}

// EASING FUNCTIONS START

// from https://spicyyoghurt.com/tools/easing-functions
s = undefined // for "back" funcs
// probably wrong, cause those ones seem broken


// to prevent weird issues for when time goes over duration,
// maybe use a wrapper function
// so instead  of easeInOutQuad(arg0, arg1)
// it'd be ease(easeInOutQuad, arg0, arg1)
/*
function ease(func, arg0, arg1 etc) {
	if (time < duration)
		return func(arg0, arg1 etc)
	else return c
}
*/



//t = time, b = beginning value, c = change in value, d = duration
function easeLinear (t, b, c, d) {
    return c * t / d + b;
}

function easeInOutQuad (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
}

function easeInQuad (t, b, c, d) {
    return c * (t /= d) * t + b;
}

function easeOutQuad (t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
}

function easeInOutQuad (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
}

function easeInSine (t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
}


function easeOutSine (t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
}

function easeInOutSine (t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
}

function easeInExpo (t, b, c, d) {
    return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
}

function easeOutExpo (t, b, c, d) {
    return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
}

function easeInOutExpo (t, b, c, d) {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
}

function easeInCirc (t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
}

function easeOutCirc (t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
}

function easeInOutCirc (t, b, c, d) {
    if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
}

function easeInCubic (t, b, c, d) {
    return c * (t /= d) * t * t + b;
}

function easeOutCubic (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
}

function easeInOutCubic (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
}

function easeInQuart (t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
}

function easeOutQuart (t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}

function easeInOutQuart (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
}

function easeInQuint (t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
}

function easeOutQuint (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
}

function easeInOutQuint (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
}

function easeInElastic (t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d) == 1) return b + c;
    if (!p) p = d * .3;
    if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
    }
    else var s = p / (2 * Math.PI) * Math.asin(c / a);
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
}

function easeOutElastic (t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d) == 1) return b + c;
    if (!p) p = d * .3;
    if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
    }
    else var s = p / (2 * Math.PI) * Math.asin(c / a);
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
}

function easeInOutElastic (t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d / 2) == 2) return b + c;
    if (!p) p = d * (.3 * 1.5);
    if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
    }
    else var s = p / (2 * Math.PI) * Math.asin(c / a);
    if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
}

function easeInBack (t, b, c, d) {
    if (s == undefined) s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
}

function easeOutBack (t, b, c, d) {
    if (s == undefined) s = 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
}

function easeInOutBack (t, b, c, d) {
    if (s == undefined) s = 1.70158;
    if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
    return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
}

// EASING FUNCTIONS END














//function setup() {
//  createCanvas(400, 400);
//  
//  start = 50
//  end = 350
//  
//  distance = end-start
//  half = distance/2
//  
//  accel = 1.01
//  decel = false
//  velocity = 0
//  
//  pos = start
//}
//
//function draw() {
//  background(220);
//  
//  if (decel)
//    {
//      (velocity -= accel)
//    }
//  else
//    {
//      if (pos < half)
//        velocity += accel
//      else
//        decel = true
//    }
//  
//  pos += velocity
//  
//  ellipse(pos, 50, 50, 50)
//}






//
//function setup() {
//  createCanvas(400, 400);
//  
//  start = 50
//  end = 350
//  
//  distance = end-start
//  half = distance/2
//  
//  accel = 1.01
//  decel = false
//  velocity = 0
//  
//  pos = start
//}
//
//function draw() {
//  background(220);
//  
//  if (pos < end)
//{  
//  if (decel)
//    {
//      (velocity -= accel)
//    }
//  else
//    {
//      if (pos < half)
//        velocity += accel
//      else
//        decel = true
//    }
//}
//  
//  pos += velocity
//  
//  ellipse(pos, 50, 50, 50)
//}










//function setup() {
//  createCanvas(400, 400);
//  
//  start = 50
//  end = 350
//  
//  distance = end-start
//  half = distance/2
//  
//  accel = 1.001
//  decel = false
//  velocity = 0
//  
//  pos = start+0.0001
//}
//
//function draw() {
//  background(220);
//  
//  velocity = 0
//	
//  if (pos < half) {
//	  velocity = (pos - start)*accel
//	  pos += velocity
//  }
//	else {
//	  velocity = (end-pos)*accel
//	  pos += velocity
//  }
//        
//  
//  pos += velocity
//  
//  ellipse(pos, 50, 50, 50)
//}
//
//
//



