"use strict";

(function(){
    let canvas;
    let ctx;
    let rect;
    let slider;
    let sizeOutput;
    let gSlider;
    let gOutput;
    let x = 0, y= 0;
    let counter = 0;
    const fps = 100;
    const canvasWidth = 640, canvasHeight = 480;

    window.onload = init;
	
	function init(){
        console.log("page loaded!");

        canvas = document.querySelector('canvas');
        rect = canvas.getBoundingClientRect();
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
			
        ctx = canvas.getContext('2d');
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        
        slider = document.querySelector("#myrange");
        sizeOutput = document.querySelector("#sizeOutput");
        gSlider = document.querySelector("#myGravity");
        gOutput = document.querySelector("#gravityOutput");
        setupUI();
        //loop();
        update();
    }

    function update(){
        requestAnimationFrame(update);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        rwnsLIB.drawRock(ctx);    
    }
    
//    function loop(){
//        
//       setTimeout(loop,1000/12);
//       //clear screen
//       ctx.save()
//       ctx.fillStyle = "black";
//       ctx.globalAlpha = 1/fps;
//       ctx.fillRect(0,0, canvasWidth, canvasHeight);
//       ctx.restore();
//       
//       x+= 10;
//       counter += .3;//arbitray number that worked well       
//       y = canvasHeight/2 + Math.cos(counter) * 5;
//       drawCircle(ctx,x + 10,y + 10,2,"dodgerblue");
//       
//       if (x >= canvasWidth)
//           x = 0;
//        
//       // update();
//    }

    function setupUI(){
        canvas.onclick = function(e){rwnsLIB.spawnRock(e, ctx, rect, slider.value, 0)};
        slider.oninput = function(e){
            sizeOutput.innerHTML = "Size: " + slider.value;
        }
        gSlider.oninput = function(e){
            gOutput.innerHTML = "Gravity: " + gSlider.value;
        }
    }
    
    // helpers functions 
    //degree to radians
	function dtr(degrees){
		return degrees * (Math.PI/180);
	}
    //draw circle easier
	function drawCircle(ctx,x,y,radius,color){
		ctx.save();
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(x,y,radius,0,Math.PI * 2);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}
})();