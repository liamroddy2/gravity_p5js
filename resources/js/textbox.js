import { global } from "./global.js"
import { loadTalkSFX, playTalkSFX } from "./sound.js"

let font, fontSize, textColour
let boxWidth, boxHeight, boxMargin, boxY
let words = new Array();
let maxLines = 3
let lines = Array(maxLines).fill("");

let isTalking = false;
let talkInterval

let characterTypeRate = 1.2 // can be a fraction
let currentCharacter = 0

let textboxText, scriptCallback

export function setupTextbox() {
  font = global.textboxFont
  fontSize = 70 * global.gameScale;
  textColour = "white"

  boxWidth = width * 0.6;
  boxHeight = height * .2;
  boxMargin = boxHeight * 0.1;
  boxY = height * 0.77

  // Set text characteristics
  textFont(font);
  textSize(fontSize);
  textAlign(LEFT, TOP);

  //startDialogue();
}


// function startDialogue() {
	
// }

export function setTextboxText(text, callback) {
	textboxText = text 
	getLinesFromParagraph(textboxText) // so no need for this member variable so, right?
	scriptCallback = callback

	isTalking = true;

	loadTalkSFX("borgo")
	talkInterval = setInterval(makeTalkSound, 177);

	// initial setup
	continueDialogue()
}

export function continueDialogue() {
	if (!words.length) // we've ran out of dialogue
	{
		scriptCallback() // callback to script
	}
	else
	{
		splitWordsIntoLines()
		currentCharacter = 0
	}
}

function makeTalkSound() {
	playTalkSFX();
}

export function drawTextbox() {
  // Align the text to the right
  // and run drawWords() in the left third of the canvas

  colorMode(RGB)

  fill(color(0, 50, 100, 255))
  rect((width/2) - (boxWidth/2), boxY,
	boxWidth, boxHeight);

	fill(textColour)
	noStroke()

	textFont(font);
  	textSize(fontSize);

	// okay, so here we go:
	/*
	textWidth(str) gets us the width of str, obvs

	so lets take our chunk of dialogue and split it into chunks

	*/

	// giant lump of text


	
	let lineHeight = fontSize * 1.25 //fontSize * 1.1

	// draw lines

	currentCharacter += characterTypeRate * global.gameSpeed

	let displayText = ""


	
	// join up lines
	for (let i=0; i<maxLines; i++)
	{
		displayText += lines[i] + "\n"
	}

	if (isTalking) {
		currentCharacter += characterTypeRate * global.gameSpeed
	}

	let typewriterText = displayText.substring(0, Math.round(currentCharacter))

	textLeading(textLeading() * 1.25)
	text(typewriterText,	
		(width/2) - (boxWidth/2) + boxMargin, boxY + boxMargin
	)
	
	if (typewriterText.length >= displayText.length) {
		isTalking = false;
		clearInterval(talkInterval);
	}


	// text("Such weather we are having, yes? First the sky is wet, and then also the ground.\nOddness!",
		
	// (width/2) - (boxWidth/2) + boxMargin, boxY + boxMargin,
	// 	boxWidth - boxMargin, boxHeight - boxMargin
	// )
}

function splitWordsIntoLines() {
	// worked fine in draw step, but not here. May need to happen after setup?!
	
	textFont(font);
  textSize(fontSize);

  
	let _lines = Array(maxLines).fill("");
	
	let maxLineWidth = boxWidth - (boxMargin * 2)

	// precalc all this as well, with get words fun

	// transfer paragraph text to lines
	for (let i=0; i<maxLines; i++)
	{
		while (words[0]  &&  textWidth(_lines[i] + " " + words[0]) < maxLineWidth)
		{
			_lines[i] += " " + words[0]
			words.shift()
		}
	}

	lines = _lines
}

function getLinesFromParagraph(paragraph) {
	//let paragraph = "So let’s get started! And remember, don’t be scared! The “humans” you will meet in this simulator, although nearly indistinguishable from the real thing, are simply actors. And as everyone knows, actors aren’t really human! These actors are, however, equipped with cutting-edge prosthetics and costuming technology, and have spent years in training to fully understand and perfectly emulate human culture, making this simulation essentially identical to a real human interaction. Like with real conversations, you will be monitored closely and assigned a grade based on how well your answer selection lines up with the Human’s likes and dislikes. Now, good luck! Simulation: begin!"
	words = paragraph.split(" ")

}