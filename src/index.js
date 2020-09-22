"use strict";

const canvasWidth = 640, canvasHeight = 480;

(function(){
    let canvas;
    let ctx;

    let rect;
    let slider;
    let sizeOutput;
    let gSlider;
    let gOutput;

    const fps = 12;

    //draw wave variables
    let pointsArray;
    let s = 200; //speed of the wave
    let b = 0.25;
    let spaces = 1;
    let offsets; //this is the offset to make it look like a sinewave
    window.onload = init;
	
	function init(){
        console.log("page loaded!");

        canvas = document.querySelector('canvas');
        rect = canvas.getBoundingClientRect();
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
			
        ctx = canvas.getContext('2d');
        
        slider = document.querySelector("#myrange");
        sizeOutput = document.querySelector("#sizeOutput");
        gSlider = document.querySelector("#myGravity");
        gOutput = document.querySelector("#gravityOutput");
        
        //init wave
        // pointsArray = [];
        rwnsLIB.setupParticleArray();
        setupUI();
       
        update();
    }

    function update(){
        requestAnimationFrame(update);

        rwnsLIB.updateRock(ctx);
        rwnsLIB.animateWaves(ctx);
       
        //Wave logic
        //StickWave();
    }

    function setupUI(){
        canvas.onclick = function(e){rwnsLIB.spawnRock(e, ctx, rect, slider.value, 0)};
        slider.oninput = function(e){
            sizeOutput.innerHTML = "Size: " + slider.value;
        }
        gSlider.oninput = function(e){
            gOutput.innerHTML = "Gravity: " + gSlider.value;
        }
        
        //create wave of sticks
       
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