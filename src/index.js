"use strict";

const canvasWidth = window.innerWidth * (4/6), canvasHeight = window.innerHeight - 210;
//const canvasWidth = 10, canvasHeight = 10;

(function(){
    let canvas;
    let ctx;

    //all controls
    let rect;
    let slider;
    let sizeOutput;
    let gSlider;
    let gOutput;
    let lineSlider;
    let lineOutput;
    let rectSizeSlider;
    let rectSizeOutput;
    let waveInSlider;
    let waveInOutput;
    let waveNumSlider;
    let waveNumOutput;
    
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
        lineSlider = document.querySelector("#myLineGap");
        lineOutput = document.querySelector("#lineGap");
        rectSizeSlider = document.querySelector("#myRectangleWidth");
        rectSizeOutput = document.querySelector("#rectangleWidth");
        waveInSlider = document.querySelector("#myHeight");
        waveInOutput = document.querySelector("#rectangleHeight");
        waveNumSlider = document.querySelector("#mySpan");
        waveNumOutput  = document.querySelector("#Span");
        //init wave
        // pointsArray = [];
        rwnsLIB.setupParticleArray();
        setupUI();
       
        update();
    }

    function update(){
        requestAnimationFrame(update);

        rwnsLIB.updateRock(ctx);
        rwnsLIB.updateWaves();
        rwnsLIB.animateWaves(ctx);
    }

    function setupUI(){
        canvas.onclick = function(e){rwnsLIB.spawnRock(e, ctx, rect, slider.value, 1.0)};
        slider.oninput = function(e){
            sizeOutput.innerHTML = "Size: " + slider.value;
        }
        gSlider.oninput = function(e){
            gOutput.innerHTML = "Gravity: " + gSlider.value;
        }
        lineSlider.oninput = function(e){
            lineOutput.innerHTML = "Size of Line Gap: " + lineSlider.value;
        }
        rectSizeSlider.oninput = function(e){
            rectSizeOutput.innerHTML = "Size of Rectangles " + rectSizeSlider.value;
           
        }
        waveInSlider.oninput = function(e){
            waveInOutput.innerHTML = "Wave Intensity: " + waveInSlider.value;
        }
        waveNumSlider.oninput = function(e){
            waveNumOutput.innerHTML = "Number of Waves: " + waveNumSlider.value;
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