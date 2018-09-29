var socket = io.connect('http://nodejs-mongo-persistent-test-project-2-uniek.a3c1.starter-us-west-1.openshiftapps.com:8000')

setcolor(Math.floor(Math.random()*360));

function enterroom() {
	var roomnameinput = document.getElementById('roomnameinput');
	socket.emit('roomJoinReq', roomnameinput.value);
}

function setcolor(hue) {
	socket.color = hue;
	socket.emit('setColor', socket.color);
}
