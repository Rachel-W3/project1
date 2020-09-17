"use strict";

(function(){
    let rocks = [];
    let rockCount = 0;
    
    const physicsParams = Object.freeze({
        "acceleration" : 10,
    });

    // This will temporarily act as the fluid layer of the sandbox
    function drawSineWave(){

    }

    function spawnRock(e, ctx, rect, radius, mass, color='red'){
        rockCount++;
        rocks[rockCount-1] = {x : e.clientX-rect.left,
                              y : e.clientY-rect.top,
                              radius : radius,
                              mass : 0,
                              color : color,
                            };

        spawnRocks(ctx);
    }

    // Handles the physics of rocks and fluids (latter will be implemented later on)
    function spawnRocks(ctx){
        for(let i=0;i<rockCount;i++){
            ctx.beginPath();
            // Circles are not centered with the mouse for some reason...will fix in the future
            ctx.arc(rocks[i].x, rocks[i].y, rocks[i].radius, 0, 2*Math.PI, false);
            ctx.closePath();
            ctx.fillStyle = rocks[i].color;
            ctx.fill();

            dropRock(rocks[i]);
        }
    }

    function dropRock(rock){
        
    }

    window["rwnsLIB"] = {
        drawSineWave,
        spawnRock
	};
})();