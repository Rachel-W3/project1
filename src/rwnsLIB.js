//prev rock stuff

(function(){
    let rocks = [];
    let particleArray = [];

    const waveParams = Object.seal({
        "amount" : 200,
        "gap" : 5,
        "rectWidth" : 10,
        "height" : 60,
        "span" : Math.PI * 3,
        "color" : "hsl(hue, 75%, 50%)"
    });

    function spawnRock(e, ctx, rect, radius, mass, color='red'){
        rocks.push(new Rock(e.clientX-rect.left, e.clientY-rect.top, radius, mass));
    }

    function updateRock(ctx){
        // Delete inactive rocks
        rocks = rocks.filter(r => r.isActive);

        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,canvasWidth,canvasHeight);
        for(let i=0; i<rocks.length; i++){
            ctx.save();
            ctx.beginPath();
            ctx.arc(rocks[i].xPos, rocks[i].yPos, rocks[i].radius, 0, 2*Math.PI, false);
            ctx.closePath();
            ctx.fillStyle = rocks[i].color;
            ctx.fill();
            ctx.restore();
            rocks[i].drop();
        }
    }
    
    function setupParticleArray(){
        for(let i=0; i<waveParams.amount; i++) {
            particleArray.push(new FluidParticle(waveParams.span/waveParams.amount*i, 
                                                (waveParams.rectWidth+waveParams.gap)*i,
                                                 waveParams.color));
        }
    }

    function animateWaves(ctx){
		particleArray.forEach(p=>{
            p.angle+= Math.PI/180*4;
            ctx.beginPath();
			ctx.rect(p.xPos, Math.sin(p.angle)*waveParams.height+canvasHeight/3*2, waveParams.rectWidth, canvasHeight);
			ctx.closePath();
			ctx.fillStyle=p.color.replace("hue", p.angle*30);
			ctx.fill();
		})
    }
    
    window["rwnsLIB"] = {
        spawnRock,
        updateRock,
        setupParticleArray,
        animateWaves
	};
})();