import { global } from "./global.js"
import { physicsEngine } from "./physics.js" 


// TODO - move to own file
class Earth
{
    constructor(x, y, mass) {
        this.mass = mass;

        let scaleMultiplier = 25 * global.gameScale;
        this.collisionRadius = 100;
        this.drawingRadius = this.collisionRadius; // (this.getRadiusFromMass(this.mass) * scaleMultiplier) - collisionSafetyMargin;
        
        this.colour = "green";

        this.physicsBody = physicsEngine.addNewCircleBody(x, y, mass, this.collisionRadius, true)
    }

    draw()
    {
        noStroke();
        
        fill(this.colour);
        
        circle(this.physicsBody.position.x, this.physicsBody.position.y, this.drawingRadius*2);
    }
}

class Asteroid {
    constructor(x, y, mass) {
        this.mass = mass;

        //let collisionSafetyMargin = 0;
        let scaleMultiplier = 10 * global.gameScale;
        this.collisionRadius = (this.getRadiusFromMass(this.mass) * scaleMultiplier);
        this.drawingRadius = this.collisionRadius; // (this.getRadiusFromMass(this.mass) * scaleMultiplier) - collisionSafetyMargin;
        
        this.colour = "#cc0066";

        this.selected = false;
        
        //this.x = x;
        //this.y = y;

        //this.position = createVector(x, y);
        //this.previousPosition = this.position.copy();
        //this.velocity = createVector(0, 0);

        this.physicsBody = physicsEngine.addNewCircleBody(x, y, mass, this.collisionRadius)
    }

    getMass()
    {
        return this.mass;
    }

    /// TODO - move these two to physics manager
    applyVelocity(vector)
    {
        this.physicsBody.velocity.x += vector[0];
        this.physicsBody.velocity.y += vector[1];
        //this.physicsBody.position.add(this.velocity); // i assume engine will handle this itself?
    }

    applyForce(force)
    {
        //this.previousPosition = this.position.copy();
        
        // Newton's 2nd law - F = M * A
        let f = [force.x/this.mass, force.y/this.mass]// p5.Vector.div(force, this.mass);

        this.physicsBody.applyVelocity(f)
    }
    ///// END TODO

    setPosition(x, y)
    {
        this.setX(x);
        this.setY(y);
    }

    setX(x)
    {
        this.position.x = x;
    }

    setY(y)
    {
        this.position.y = y;
    }

    getCollisionRadius()
    {
        return this.collisionRadius;
    }

    update()
    {       
        //this.wrapIfOffscreen()
        if (this.selected)
        {
            Matter.Body.setPosition(this.physicsBody, Matter.Vector.create(mouseX, mouseY))
            Matter.Body.setVelocity(this.physicsBody, Matter.Vector.create(0, 0))
        }
    }

    wrapIfOffscreen()
    {
        let margin = this.drawingRadius + (100*global.gameScale);

        let x = this.physicsBody.position.x;
        let y = this.physicsBody.position.y;
        let w = global.gameWidth;
        let h = global.gameHeight;

        // horizontal wrap
        if (x < 0-margin)
        {
            this.physicsBody.position.x = w+margin;
        }
        else if (x > w+margin)
        {
            this.physicsBody.position.x = 0-margin;
        }

        // vertical wrap
        if (y < 0-margin)
        {
            this.physicsBody.position.y = h+margin;
        }
        else if (y-margin > h+margin)
        {
            this.physicsBody.position.y = 0-margin;
        }
    }

    draw()
    {
        noStroke();
        
        if (this.selected)
        {
            fill("#ffffff");
        }
        else
        {
            fill(this.colour);
        }
        
        circle(this.physicsBody.position.x, this.physicsBody.position.y, this.drawingRadius*2);
    }

    getRadiusFromMass(mass)
    {
        //based on pi r^2 (area of circle)
        // TODO - make use volume of sphere instead?
        return sqrt( mass/ Math.PI);
    }

}


export class AsteroidManager
{
    constructor(numberOfAsteroidsToCreate)
    {
        this.asteroidsArray = []

        if (numberOfAsteroidsToCreate > 0)
        {
            for (let i = 0; i < numberOfAsteroidsToCreate; i++)
            {
                // TODO - if no overlap! (circle collision check with each asteroid created so far!)
                let randomX = random(0, global.gameWidth);
                let randomY = random(0, global.gameHeight);
                let randomMass = random(150, 300);
                this.asteroidsArray.push(new Asteroid(randomX, randomY, randomMass));
            }
        }

        this.earth = new Earth(global.gameWidth/2, global.gameHeight/2, 5000)
    }

    handleMouseDown()
    {
        for (let i = 0; i < this.asteroidsArray.length; i++)
        {
            let asteroid = this.asteroidsArray[i];
            
            if (dist(mouseX, mouseY, asteroid.physicsBody.position.x, asteroid.physicsBody.position.y) < asteroid.drawingRadius)
            {
                asteroid.selected = true;
                // reset velocity
                asteroid.physicsBody.velocity.x = 0; 
                asteroid.physicsBody.velocity.y = 0; 
                
                break;

            }
           
        }
    }

    handleMouseUp()
    {
        for (let i = 0; i < this.asteroidsArray.length; i++)
        {
            if (this.asteroidsArray[i].selected)
            {
                this.asteroidsArray[i].selected = false;
                // apply velocity that is basically vector between previousPosition and current

                //let mouseVelocity = createVector(mouseX, mouseY).sub(createVector(pmouseX, pmouseY)) 
                //let mouseVelocity = createVector(mouseX, mouseY).sub(this.asteroidsArray[i].previousPosition)
                
                //let mouseVelocity = p5.Vector.sub(createVector(mouseX, mouseY), this.asteroidsArray[i].previousPosition)

                let distance = dist(pmouseX, pmouseY, mouseX, mouseY); 
                let mouseVelocity = p5.Vector.sub(createVector(mouseX, mouseY), createVector(pmouseX, pmouseY)).div(distance);

                //mouseVelocity.mult(5000 * global.gameSpeed)
                this.asteroidsArray[i].applyVelocity(mouseVelocity)
                break;
            }
        }
    }

    addNewAsteroid(x, y, mass)
    {
        this.asteroidsArray.push(new Asteroid(x, y, mass));
    }

    update()
    {       
        for (let i = 0; i < this.asteroidsArray.length; i++)
        {
            this.asteroidsArray[i].update();
        }
    }

    draw()
    {
        for (let i = 0; i < this.asteroidsArray.length; i++)
        {
            this.asteroidsArray[i].draw();
        }

        this.earth.draw();
    }
}