var socket = io.connect('0.0.0.0:2500')

setcolor(Math.floor(Math.random()*360));

function enterroom() {
	var roomnameinput = document.getElementById('roomnameinput');
	socket.emit('roomJoinReq', roomnameinput.value);
}

function setcolor(hue) {
	socket.color = hue;
	socket.emit('setColor', socket.color);
}
