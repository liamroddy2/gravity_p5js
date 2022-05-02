import { global } from "./global.js"

// maybe should split into Sprite and CharacterSprite classes
// constant stretch and squash isn't needed for UI elements
// CharacterSprite can basically be a barely modified wrapper,
// but just sets those vars like squashChange, which will default to zero in Sprite
// and then it wouldn't even need a custom drawing thing
// but a custom draw func would be more performant :/
export class Sprite
{
	constructor(spriteName, spriteName2) {
		// can attach prefix ("/sprites/lo_rez/" maybe) for lower res sprites here too
		this.image = loadImage('./resources/sprites/' + spriteName + '.png', loadedImage => { this.setVariables(loadedImage);  });		
		//if not null check
		this.image2 = loadImage('./resources/sprites/' + spriteName2 + '.png');		

		this.spriteScale = global.gameScale; // not great solution, shoudlr eally think baout best way to implememnt
		// 4k assets exclusively may not be so bad on low end devices.

		// initialise instance vars in case draw gets called before the image is fully loaded
		this.x = 0;
		this.y = 0;
		this.bottomMargin = 0;
		this.squashChange = 0;
		this.currentSquash = 0;
		this.maxSquashDifference = 0;
		this.maxHeightDifference = 0;

		// for animation
		
		this.minAnimationLength = 11 * global.gameSpeed
		this.maxAnimationLength = 15 * global.gameSpeed
		this.animationLength = this.maxAnimationLength
		this.animationTimer = 0
	}

	setVariables(loadedImage)
	{
		// callback executed on image load
		this.scaledHeight = loadedImage.height * this.spriteScale;

		this.x = ( (loadedImage.width)/2 ) * this.spriteScale;
		this.bottomMargin = height * 0.04 // safety margin hidden offscreen at bottom of sprite
		this.y =  height - this.scaledHeight + this.bottomMargin;

		this.squashChange = 0.1
		this.currentSquash = 0;
		this.maxSquashDifference = 0.01 
		this.maxHeightDifference = 5;
	}

	draw()
	{
		this.currentSquash += this.squashChange

		let squashSine = Math.sin(this.currentSquash)
		let heightSine = 1//map(squashSine, -1, 1, -this.maxHeightDifference, this.maxHeightDifference) * global.gameScale
		squashSine = 1//map(squashSine, -1, 1, 1-this.maxSquashDifference, 1+this.maxSquashDifference)
	
		let currentAnimationFrame;

		this.animationTimer++
		if (this.animationTimer < this.animationLength)
		{
			currentAnimationFrame = this.image
		}
		else {
			currentAnimationFrame = this.image2
			if (this.animationTimer > (this.animationLength*2)) {
				this.animationTimer = 0

				this.animationLength = getRandomInteger(this.minAnimationLength, this.maxAnimationLength)
			}
		}

		

		image(currentAnimationFrame, (width/2) - this.x, this.y + heightSine,
			this.image.width * this.spriteScale, this.image.height * this.spriteScale * squashSine);
	}
}