
var express  = require('express');
var app = express();
//var server = app.listen(8080);
//var serverio = app.listen(8000);

app.use(express.static('public'));

//var socket = require('socket.io');

//var io = socket(serverio);


var http = require('http').Server(app);
var io = require('socket.io').listen(http);

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip_address = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

http.listen(port, ip_address, function(){
  console.log( "Listening on " + ip_address + ", port " + port );
});



console.log("Server is running");

io.sockets.on('connection', newConnection);

function newConnection(socket) {
	console.log('new connection: ' + socket.id);

	socket.on('mouse', mouseMsg);

	function mouseMsg(data) {
		socket.broadcast.emit('mouse', data);
		//io.sockets.emit also sends to original client
		console.log(data)
	}

	socket.on('chatmessage', function(data) {
		io.sockets.emit('chatmessage', {user: socket.id.substring(12,20), message: data, color: socket.color});
		console.log(data)
	});

	socket.on('roomJoinReq', function(data) {
		io.sockets.emit('roomJoinAck', data);
		console.log(data)
	});

	socket.on('setColor', function(data) {
		socket.color = data;
		console.log(socket.id + ' set their hue to ' + data)
	});




}
