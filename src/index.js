"use strict";

(function(){
    let canvas;
    let ctx;
    const canvasWidth = 640, canvasHeight = 480;

    window.onload = init;
	
	function init(){
        console.log("page loaded!");

        canvas = document.querySelector('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
			
        ctx = canvas.getContext('2d');
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        setupUI();
    }
    
    function setupUI(){
        canvas.onclick = function(e){rwnsLIB.spawnRock(e, ctx, 20, 0)};
    }
})();