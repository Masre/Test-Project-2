var cnv;

function setup() {
	cnv = createCanvas(500, 500);
	//cnv.elt.style.display = 'inline-block';
	background(51);

	socket.on('mouse', newDrawing)
}

function newDrawing(data) {
	colorMode(HSB);
	noStroke();
	fill(data.c, 100, 100);
	ellipse(data.x, data.y, 36, 36);
}

function mouseDragged() {
	//console.log("Sending: " + mouseX + ", " + mouseY)

	var data = {
		x: mouseX,
		y: mouseY,
		c: socket.color,
	}
	socket.emit('mouse', data)
	colorMode(HSB, 360, 100, 100);
	noStroke();
	fill(socket.color, 100, 100);
	ellipse(mouseX, mouseY, 36, 36);
}

function draw() {
}
