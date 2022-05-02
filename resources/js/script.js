import { global } from "./global.js"
import { setTextboxText } from "./textbox.js"

let script = Array()
let scriptPosition = 0;


function optionClicked(buttonId) {
	// use buttonId to identify which response to skip to
	scriptPosition += buttonId
	script[scriptPosition].execute();

	//destroy all option buttons
	let buttons = selectAll('.dialogueOption');
	for (let i=0; i <buttons.length; i++) {
		buttons[i].remove();
	}
}


export function startScript() {
	// run through script array and execute objects



	// test 
	dialogue("Hello, how are you?")
	options("Fine", "Awful")
		response("Great!")
		response("Sucks to hear.")
	dialogue("Anyway...")
	dialogue("What's your name?")
	options("Mary", "John", "Bleeboo")
		response("Mary is a nice name")
		response("John is an okay name")
		response("Bleeboo... is a name?")
	dialogue("My name is game.")



	scriptPosition = 0;
	nextScriptChunk()
}

function nextScriptChunk() {
	// if current (i.e. last) typeof == response, skip until not repsonse
	
	if (scriptPosition < script.length) {
		while (script[scriptPosition].isResponse == true) 
			scriptPosition++
		script[scriptPosition].execute();
	}

	scriptPosition++;
}

function dialogue(text) {
	let dialogue = new Dialogue(text)
	script.push(dialogue)
}

function response(text) {
	let response = new Dialogue(text, true)
	script.push(response)
}

function options() {
	// for(let i = 0; i < arguments.length; i++) { // arbitrary number of options
	// 	let options = new Options("hey", "wut", "blah")
	// }

	let options = new Options(arguments)
	script.push(options)
}

class Dialogue
{
	constructor(text)
	{
		this.text = text
		if (arguments.length > 1)
			this.isResponse = true;
		else
			this.isResponse = false;
	}

	execute()
	{
		setTextboxText(this.text, nextScriptChunk);
	}
}

class Options
{
	constructor(options) {
		this.options = options
	}

	execute()
	{
		let buttons = Array()

		// shouldn't actually create buttons in constructor. this should be when asked to execute by script
		for(let i = 0; i < this.options.length; i++) { // arbitrary number of options
			let button = new Button(this.options[i], i) 

			let gapBetweenButtons = global.gameHeight * 0.1;
			let buttonBlockHeight = this.options.length * gapBetweenButtons
			let buttonBlockTopY = (global.gameHeight/2) - (buttonBlockHeight/2)

			button.setY(buttonBlockTopY + (i * gapBetweenButtons)); // for now...

			buttons.push(button)
		}
	}
}

class Button
{
	constructor(text, buttonId) {
		this.text = text
		//this.buttonId = buttonId // don't need this i think
		this.button = createButton(this.text);
		this.button.class("dialogueOption")
		let clickAction = function() {
			optionClicked(buttonId);
		}
		this.button.mousePressed(clickAction)

		this.y = 0;
	}

	setY(y) {
		this.button.position(global.gameWidth/2, y);
	}

	

	//button.mousePressed(changeBG);
		// should onClick be callback to options with id?
		// or maybe should just run a file level function with its id
		// and that id is the responser to skip to
	
}



/*

dialogue("Hello, how are you?")
options("Fine", "Awful")
	response("Great!")
	response("Sucks to hear.")
dialogue("Anyway...")

above functions push objects to script array

options causes buttons to pop up
buttons are assigned IDs 0 - n
when button is clicked this is used to see what response to skip to
	(reponse can have failsafe, wrong number of response to options throws error)

response can also be expanded to throw flags, chnage scrore, or just have a generic ENUM,
	like GOOD and BAD for response quality

*/


// script is array, containing dialogue objects (paragraphs)
// AND question objects.

/*
Dialogue class
	contains
		text
*/

/*
Question class
	contains a number of options
		each option has:
			text
			resulting dialogue branch
*/