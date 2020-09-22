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
        initPoints();
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
    
    //At this point i said fuck it
    
    //declare object point
    let Point ={
        //acceleration, velocity, x, y
        a: 0,
        v: 0,
        x: 0,
        y: 0,
        isCollider : function(impulse,dt){
            //when called velocity for this point will increase by impulse *dt
            v += impulse * dt;
        }
    }

    function initPoints(pointsArray,space)
        {
            pointsArray = [];
            let pointsArrLength = 30;
            spaces = canvasWidth/pointsArrLength; //canvas width/ points array length
            for(let i = 0; i< pointsArrLength; i++)
            {
                let tempPoint = {x: 0, y :400};
                pointsArray[i] = (tempPoint);//0 for tem
                pointsArray[i].x = 0;
                pointsArray[i].y = 400;
            }
       }

    function StickWave(){
        //draw logic
        ctx.save();
        ctx.fillStyle = "cyan";
        for(let i = 0; i < pointsArray.length; i++)
        {
            ctx.fillRect(canvasWidth/2,canvasHeight/2,5,5);
           
        } 
        //  console.log(pointsArray.length);
        //ctx.fillRect(canvasWidth/2,canvasHeight/2,5,5);
        ctx.strokeRect(220,20,100,100);
        ctx.restore();
        
        let a = 100;
        let k = (2 * Math.PI /640); //divide by width
        let w = (2 * Math.PI/5);
        
        let ballm; //come back to this Nuha it's ball Mass need ball clas for this
        //set offsets
        let n = Math.floor(1.5 * ballm/spaces);
        for (let i =0 ; i < pointsArray.length; i++)
        {
            offsets[i] =  a * Math.cos(k*x - w * t); //t is a global time variable
            dy -= offsets;
        }
    }
 
 
 })();