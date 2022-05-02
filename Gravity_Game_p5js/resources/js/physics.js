import { global } from "./global.js"

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;




class PhysicsEngine
{
    constructor()
    {
        // create a matter.js engine
        this.engine = Engine.create();
        // turn off gravity, because we're handling that ourselves
        this.engine.gravity.y = 0;
        this.engine.gravity.scale = 0;


        //this.TEST_CODE_REMOVE()
    }

    getBodies()
    {
        return Composite.allBodies(this.engine.world);
    }

    // TEST_CODE_REMOVE()
    // {
    //     for (let x=0; x < 1000; x+=210)
    //     {	
    //     for (let y=0; y < 1000; y+=210)
    //         {
    //             let circle = Bodies.circle(x, y, 100);
    //             if (y%2 == 0)
    //                 Composite.add(this.engine.world, circle, { isStatic: true });
    //             else
    //                 Composite.add(this.engine.world, circle);

    //         }
    //     }
    // }

    addNewCircleBody(x, y, mass, radius, fixed = false)
    {
        let circle = Bodies.circle(x, y, radius, {isStatic: fixed});
        circle.mass = mass;
        Composite.add(this.engine.world, circle);
        
        return circle;
    }

    update()
    {
        this.calculateGravityStep();
        Engine.update(this.engine, 1000 / global.gameSpeed);
    }

    calculateGravityStep()
    {
        let bodies = this.getBodies();
        
        for (let i = 0; i < bodies.length; i++)
        {
            
            // TODO - selected is part of asteroid, not this stuff
            // if (bodies[i].selected)
            // {
            //     //bodies[i].position = Matter.Vector.create(mousex, y)
            //     Matter.Body.setPosition(bodies[i], mouseX, mouseY)
            // }


            // appply gravity with regards to other bodies
            for (let j = 0; j < bodies.length; j++)
            {
                if (i != j)
                {
                    let body1 = bodies[i];
                    let body2 = bodies[j];


                    // OPTIMISATION: here we're caluclating the same force twice for both fullBodies. This doubles the number of calculations. Share these calcs, cut calc time in half
                    //r.AddForce(CalculateForce(body, otherBody));

                    // TODO - weird glitch, gravity seems stronger from left side of earth than right!?!?!
                    // same happens vertically - stronger grav from above than below
                    // also has nothing to do with earth, still happens when its removed!

                    //Matter.Body.applyForce(body1, body2.position, this.calculateGravitationalForce(body1, body2))
                    Matter.Body.applyForce(body1, body1.position, this.calculateGravitationalForce(body1, body2))
                }
            }
        }
    }

    calculateGravitationalForce(body1, body2)
    {      
        let G = 0.00005; // TODO

        let body1Position = Matter.Vector.clone(body1.position)
        let body2Position = Matter.Vector.clone(body2.position)

        //let distance = dist(body1.position.x, body1.position.y, body2.position.x, body2.position.y);
        // let distance = Matter.Vector.sub(body1.position, body2.position)
        // distance.x = abs(distance.x);
        // distance.y = abs(distance.y)
        let distance = Matter.Vector.magnitude(body1.position, body2.position);
        //distance = abs(distance); // is mag not always pos?
        

        // if (distance > 5f && fullBodies.Count > 5)
        // {
        //     return new Vector2(0f, 0f); // simplify for bigger calculations
        // }

        // is direction now irrelavnmt? position is used in matter's applyForce - maybe just for torque though
        let forceDirection = Matter.Vector.div( Matter.Vector.sub( body2Position, body1Position), distance);
        //let forceDirection = body2Position.sub(body1Position).div(distance);
        let forceStrength = ( (body2.mass * body1.mass) / Math.pow(distance, 2) );
        
        //forceStrength = forceStrength * (Math.Sign(body2.GetMass()) * Math.Sign(body1.GetMass())); // allow for negative mass (above power^2 cancels out negative) function can return zero, might cause nasty effects - zero mass means broken function
        // HERE IS WHERE THE ISSUE HITS WITH SUCKEES:
        //Vector2 force = new Vector2((forceDirection.x*(G * forceStrength)), (forceDirection.y*(G * forceStrength))); //=  (G * forceStrength) * forceDirection;
        let force = Matter.Vector.create((forceDirection.x*(G * forceStrength)), (forceDirection.y*(G * forceStrength))); //=  (G * forceStrength) * forceDirection;

        return force;
    }

    // TODO -should draw? nah
    // draw()
    // {
    //     let bodies = Composite.allBodies(this.engine.world);

    //     for (let i = 0; i < bodies.length; i ++)
    //     {
    //         fill("green")
    //         //circle(bodies[i].vertices[0].x, bodies[i].vertices[0].y, 50);
    //         circle(bodies[i].position.x, bodies[i].position.y, 200);
    //     }
    // }
}


export let physicsEngine = new PhysicsEngine()


// class Body
// {
//     constructor(x, y, mass, radius, engine)
//     {
//         let circle = Bodies.circle(x, y, radius);
//         circle.mass = mass;
//         Composite.add(engine.world, circle);
//     }

//     addVelocity(directionVector)
//     {

//     }

//     setVelocity(directionVector)
//     {

//     }

//     addForce()
//     {

//     }
// }