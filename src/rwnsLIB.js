"use strict";

(function(){
    let rocks = [];
    let rockCount = 0;

    let particleArray = [];

    const waveParams = Object.seal({
        "amount" : 200,
        "distance" : 5,
        "radius" : 10,
        "amplitude" : 60,
        "length" : Math.PI * 2.25
    });
    
    const physicsParams = Object.seal({
        "maxVelocity" : 20,
        "acceleration" : 0.5
    });

    function spawnRock(e, ctx, rect, radius, mass, color='red'){
        rockCount++;
        rocks[rockCount-1] = {x : e.clientX-rect.left,
                              y : e.clientY-rect.top,
                              radius : radius,
                              mass : 0,
                              color : color,
                              velocity : 0
                            };
        
    }

    function drawRock(ctx){
        for(let i=0;i<rockCount;i++){
            ctx.save();
            ctx.beginPath();
            // Circles are not centered with the mouse for some reason...will fix in the future
            ctx.arc(rocks[i].x, rocks[i].y, rocks[i].radius, 0, 2*Math.PI, false);
            ctx.closePath();
            ctx.fillStyle = rocks[i].color;
            ctx.fill();
            ctx.restore();
        }
        dropRocks();
    }

    // Handles the physics of rocks and fluids (latter will be implemented later on)
    function dropRocks(){
        for(let i=0;i<rockCount;i++){
            rocks[i].velocity += physicsParams.acceleration * (document.querySelector("#myGravity").value);
            if (rocks[i].velocity > physicsParams.maxVelocity) rocks[i].velocity = physicsParams.maxVelocity;
            rocks[i].y += rocks[i].velocity;
        }
    }
    
    
    window["rwnsLIB"] = {
        spawnRock,
        drawRock
	};
})();