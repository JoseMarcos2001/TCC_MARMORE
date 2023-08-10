window.onload = function(){
	// creating a new element as canvas
	var canvas = document.createElement('canvas');
	var body = document.getElementsByTagName("body")[0];
	var ctx = canvas.getContext('2d');
	var linesArray = [];

	// default values for settings
	currentSize = 5;
	var currentcolor = "black";
	var currentBg = "white"

	//mousedown should be false in the begining
	var isMouseDown = false;


	// Create the canvas onload
	createCanvas();

	function createCanvas() {
		canvas.id = "canvas";
		canvas.width = 400;
		canvas.height = 400;

		canvas.style.zIndex = 8;
		canvas.style.position = "absolute";
		canvas.style.border = "1px solid";

		ctx.fillStyle = currentBg;
		ctx.fillRect(0,0,canvas.width,canvas.height);
		body.appendChild(canvas);

	}

	// Event handlers for drawing

	canvas.addEventListener('mousedown',function(){mousedown(canvas,event)});
	canvas.addEventListener('mousemove',function(){mousemove(canvas,event)});
	canvas.addEventListener('mouseup',mouseup);

	//get current position of mouse
	function getMousePosition(canvas,evt){
			var rect = canvas.getBoundingClientRect();
			return{
				x: evt.clientX - rect.left,
				y: evt.clientY - rect.top
			}
	}

	//when mouse is clicked down
	function mousedown(canvas,evt){
		var mousePos = getMousePosition(canvas,evt);
		isMouseDown = true;
		var currentPosition = getMousePosition(canvas,evt);
		ctx.moveTo(currentPosition.x,currentPosition.y)
		ctx.beginPath();
		ctx.lineWidth = currentSize;
		ctx.lineCap = "round";
		ctx.strokeStyle = currentcolor
	}

	function mousemove(canvas,evt){
		// Check wether the mouse is moving when and only if after mouse down 
		if(isMouseDown){
			var currentPosition = getMousePosition(canvas,evt);
			ctx.lineTo(currentPosition.x,currentPosition.y)
			ctx.stroke();
			store(currentPosition.x,currentPosition.y,currentSize,currentcolor)

		}
	}

	// to store the lines position as linesarray
	function store(x,y,s,c){
			var line = {
				"x":x,
				"y":y,
				"size":s,
				"color":c
			}
			linesArray.push(line);
	}

	//function for mouse up scenarios
	function mouseup(){
		isMouseDown = false;
		store()
	}


	//Sidebar buttons event handlers

	//color picker event handler
	document.getElementById('colorpicker').addEventListener('change',function(){
		currentcolor = this.value;
	});

	//background color picker event handler
	document.getElementById('bgcolorpicker').addEventListener('change',function(){
		ctx.fillStyle = this.value;
		ctx.fillRect(0,0,canvas.width,canvas.height);
		//after chnaging backgroud color we have to redraw the previous art on top
		redraw(linesArray);
		currentBg = ctx.fillStyle;
	})

	// Redraw the previous drawn drawing into the canvas
	function redraw(linesA){
		for(var i = 1; i<linesA.length; i++){
			ctx.beginPath();
			ctx.moveTo(linesA[i-1].x,linesA[i-1].y);
			ctx.lineWidth = linesA[i].size;
			ctx.lineCap = "round";
			ctx.strokeStyle = linesA[i].color;
			ctx.lineTo(linesA[i].x,linesA[i].y)
			ctx.stroke();
			}
	}

	//Tools buttons

	//Eraser event handler
	document.getElementById('eraser').addEventListener('click',eraser);

	//choose a eraser
	function eraser(){
		currentcolor = ctx.fillStyle;
	}

	//Clear event handler
	document.getElementById('clear').addEventListener('click',clear);

	//choose to clear the linesarray and create canvas again
	function clear(){
		 createCanvas();
		 linesArray = [];
	}


	//pencil drawing thickness event handler
	document.getElementById('controlSize').addEventListener('click',function(){
		currentSize = this.value;
		document.getElementById("showSize").innerHTML = this.value;
	});

	//canvas size changing event handlers
	document.getElementById('canvasUpdate').addEventListener('click',function(){
		createCanvas();
		redraw(linesArray);
	});

	// Storage buttons

	//pencil drawing save event handler
	document.getElementById('save').addEventListener('click',save);

	// saving function to store in local storage
	function save(){
		localStorage.removeItem("savedCanvas");
		localStorage.setItem("savedCanvas",JSON.stringify(linesArray));
		console.log("saved");
	}

	//pencil drawing save event handler
	document.getElementById('load').addEventListener('click',load);

	// saving function to store in local storage
	function load(){
		if(localStorage.getItem("savedCanvas")!=null){
			linesArray = JSON.parse(localStorage.savedCanvas);
			var lines = JSON.parse(localStorage.getItem("savedCanvas"));
			//calling the redraw method using lines by local storage
			redraw(lines);
			console.log("loaded");
		}else{
			console.log("No image in memory");
		}
	}

	//clear cache drawing event handler
	document.getElementById('clearCache').addEventListener('click',clearCache);

	// saving function to store in local storage
	function clearCache(){
		if(localStorage.getItem("savedCanvas")!=null){
			localStorage.removeItem("savedCanvas");
			linesArray = [];
			console.log("loaded");
		}else{
			console.log("No image in memory");
		}
	}

	//Downloading function as image

	//clear cache drawing event handler
	document.getElementById('saveToImage').addEventListener('click',function(){
		downloadCanvas(this,'canvas','infinitymatedrawing.png')
	},false);

	// saving function to store in local storage
	function downloadCanvas(link,canvas,filename){
		link.href = document.getElementById(canvas).toDataURL();
		link.download = filename;
	}

	//Set up touch events for mobile,tab, etc.

	canvas.addEventListener('touchstart',function(e){
		mousePos = getMousePosition(canvas,e)
		var touch = e.touches[0];
		var mouseEvent =  new MouseEvent("mousedown",{
			clientX:touch.clientX,
			clientY:touch.clientY
		});
		canvas.dispatchEvent(mouseEvent)
	},false);
	

	canvas.addEventListener('touchend',function(e){
		var mouseEvent =  new MouseEvent("mouseup",{});
		canvas.dispatchEvent(mouseEvent)
	},false);

	canvas.addEventListener('touchmove',function(e){
		var touch = e.touches[0];
		var mouseEvent =  new MouseEvent("mousemove",{
			clientX:touch.clientX,
			clientY:touch.clientY
		});
		canvas.dispatchEvent(mouseEvent)
	},false);


	//prevent scrolling when touching the canvas

	canvas.addEventListener('touchstart',function(e){
		if(e.target===canvas){
			e.preventDefault();
		}
	},{passive:false});

	canvas.addEventListener('touchend',function(e){
		if(e.target===canvas){
			e.preventDefault();
		}
	},{passive:false});

	canvas.addEventListener('touchmove',function(e){
		if(e.target===canvas){
			e.preventDefault();
		}
	},{passive:false});




}