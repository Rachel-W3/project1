//prev rock stuff

(function(){
    let rocks = [];
    let particleArray = [];
     
    //controls for oninput use
    let lineSlider = document.querySelector("#myLineGapSlider");
   // let rectSizeSlider = document.querySelector("#myRectWidthSlider");
    let waveInSlider = document.querySelector("#myHeightSlider");
    //let waveNumSlider = document.querySelector("#myWaveSpanSlider");
    let oscSlider = document.querySelector("#myOscSlider");
    let waveParams = Object.seal({
        "amount" : 124,
        "gap" : 5,//3-`10
        "rectWidth" : 10,//10-20
        "height" : 15,//wave intensity 15 - 50
        "span" : Math.PI * 6, //number of waves 6 - 15
        "color" : "hsl(hue, 75%, 50%)",
        "oSpeed" : 5, // oscillation speed
        "b" : 0.01// dampening constant
    });
    
    function spawnRock(e, ctx, rect, radius, mass, color='red'){
        rocks.push(new Rock(e.clientX-rect.left, e.clientY-rect.top, radius, mass));
    }

    function updateRock(ctx){
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,canvasWidth,canvasHeight);
         
         waveInSlider.oninput = function(e){
            waveParams.height = waveInSlider.value;
        }
         oscSlider.oninput = function(e){
            waveParams.oSpeed = oscSlider.value;
        }
        
        
        for(let i=0; i<rocks.length; i++){
            checkCollision(rocks[i],ctx);
            ctx.save();
            ctx.beginPath();
            ctx.arc(rocks[i].xPos, rocks[i].yPos, rocks[i].radius, 0, 2*Math.PI, false);
            ctx.closePath();
            ctx.fillStyle = rocks[i].color;
            ctx.fill();
            ctx.restore();
            rocks[i].drop();
        }
        // Delete inactive rocks
        rocks = rocks.filter(r => r.isActive);
    }
    
    function setupParticleArray(){
        for(let i=0; i<waveParams.amount; i++) {
            particleArray.push(new FluidParticle(waveParams.span/waveParams.amount*i, 
                                                (waveParams.rectWidth+waveParams.gap)*i,
                                                 waveParams.height,
                                                 waveParams.color));
        }
    }

    function updateWaves(){
        for(let i=1; i < particleArray.length-1; i++){
            particleArray[i].acceleration = calculateParticleAcceleration(i);
        }
        particleArray[0].velocity = 0;
        particleArray[particleArray.length-1].velocity = 0;
    }

    function animateWaves(ctx){
		particleArray.forEach(p=>{
            p.updateParticle();
            p.angle+= Math.PI/180*4;
            ctx.beginPath();
			ctx.rect(p.xPos, p.yPos+Math.sin(p.angle)*waveParams.height+2*canvasHeight/3, waveParams.rectWidth, canvasHeight);
			ctx.closePath();
			//ctx.fillStyle=p.color.replace("hue", p.angle*30);
            

            if ( document.querySelector('#colorStyle').value == "Rainbow")
            {
               ctx.fillStyle=p.color.replace("hue", p.angle*30);
    
            }
            else if ( document.querySelector('#colorStyle').value == "Blue")
            {
               ctx.fillStyle=("hsl(250, 75%, 50%)");
                ctx.fillStyle=waveParams.color.replace();
            }
            else if ( document.querySelector('#colorStyle').value == "Red")
            {
               ctx.fillStyle=("hsl(15, 75%, 50%)");
                ctx.fillStyle=waveParams.color.replace();
            }
            else if ( document.querySelector('#colorStyle').value == "Yellow")
            {
               ctx.fillStyle=("hsl(40, 75%, 50%)");
                ctx.fillStyle=waveParams.color.replace();
            }
            else if ( document.querySelector('#colorStyle').value == "Green")
            {
               ctx.fillStyle=("hsl(100, 75%, 50%)");
                ctx.fillStyle=waveParams.color.replace();
            }
            ctx.fill();
            
        
            
        //use lines to draw sea mist    
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.globalAlpha= 1/2;
        ctx.moveTo(p.xPos,canvasHeight,)
        ctx.lineTo(p.xPos,Math.sin(p.angle)*waveParams.height+2*canvasHeight/3 + 160);
        ctx.lineWidth = 16;
        ctx.stroke();
        ctx.restore();
		})
    }

    // Calculates the acceleration for particle at index i
    function calculateParticleAcceleration(i){
        let y_left = particleArray[i-1].yPos;
        let y_center = particleArray[i].yPos;
        let y_right = particleArray[i+1].yPos;

        let v_center = particleArray[i].velocity;

        // dx = space between leftmost and rightmost particle
        let dx = 0.5 * Math.abs(particleArray[i+1].xPos - particleArray[i-1].xPos);
        // acceleration = second derivative of position
        let d2y = (y_left - 2 * y_center + y_right) / (2 * dx);
        let a_elastic = Math.pow(waveParams.oSpeed, 2) * d2y;
        let a_drag = -waveParams.b * v_center;
        return a_elastic + a_drag;
    }

    function checkCollision(rock,ctx){
        // number of overlapping particles
        let numOverlap = Math.floor(1.5 * rock.radius / waveParams.gap);

        // Particle that the ball is directly over
        let waveWidth = (waveParams.gap + waveParams.rectWidth) * waveParams.amount;
        let index = Math.floor((rock.xPos / waveWidth) * particleArray.length);
        if(index > particleArray.length - 1 || index < 0) return;
        let particleCollided = particleArray[index];
        
        let dy = (particleCollided.yPos + Math.sin(particleCollided.angle)*particleCollided.yPos+canvasHeight/3*2) - rock.yPos;
        if(dy+30 <= rock.radius) //had to add an offset so it doesn't disappear right before the collision
        {
           

            // Calculate how much impulse (i.e. "collision force") to deliver to the point
            // -- Just the momentum of the ball for simplicity
            let impulse = rock.mass * rock.velocity;
            particleCollided.onImpact(impulse);
            
            // To make it smoother and actually look the way we want... 
            // we'll also have the ball collide with the points around it, but to a lesser degree
            for(let i = -numOverlap; i <= numOverlap; i++)
            {
                // Make sure we don't double count the middle point
                if(i != 0)
                {
                    let other_index = index + i;
                    
                    // Don't go out of bounds
                    if(other_index >= 0 && other_index <= particleArray.length - 1)
                    {
                        // Linearly decrease the impulse for the adjacent points
                        // -- Points close to the center of impact will have a higher impulse
                        // -- Points further away from the center will have a lower impulse (since they weren't hit as directly)
                        let other_impulse = map_range(Math.abs(i), 0, numOverlap, impulse, 0);
                        
                        particleArray[other_index].onImpact(other_impulse);
                    }
                }
            }
            rock.isActive = false; // this rock will later be deleted from the list
            return true;
        }
        return false;
    }

    // Substitute for map() in processing
    function map_range(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }
    
    
    window["rwnsLIB"] = {
        updateWaves,
        spawnRock,
        updateRock,
        setupParticleArray,
        animateWaves
	};
})();