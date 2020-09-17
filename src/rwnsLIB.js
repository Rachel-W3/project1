"use strict";

(function(){
    // This will temporarily act as the fluid layer of the sandbox
    function drawSineWave(){

    }

    function spawnRock(e, ctx, radius, mass, color='red'){
        let mouseX = e.clientX;
        let mouseY = e.clientY;
        console.log(mouseX,mouseY);

        ctx.beginPath();
        // Circles are not centered with the mouse for some reason...will fix in the future
        ctx.arc(mouseX, mouseY, radius, 0, 2*Math.PI, false);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    }

    // Handles the physics of rocks and fluids (latter will be implemented later on)
    function doPhysics(){
        
    }

    window["rwnsLIB"] = {
        drawSineWave,
        spawnRock
	};
})();