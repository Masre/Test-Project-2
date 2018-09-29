var body = document.body;

var chatbox = document.createElement('div');
chatbox.id = 'chatbox';

var messages = document.createElement('div');
messages.id = 'messages';

var textfield = document.createElement('textarea');
textfield.id = 'textfield';
textfield.placeholder = 'Type your message here';
textfield.addEventListener('keyup', textfieldKeyUpEvent);

var sendbutton = document.createElement('button');
sendbutton.id = 'sendbutton';
sendbutton.onclick = send;
sendbutton.innerText = 'Send';

body.onload = function() {
	chatbox.appendChild(messages);
	chatbox.appendChild(textfield);
	chatbox.appendChild(sendbutton);
	body.appendChild(chatbox);
}


function send() {
	socket.emit('chatmessage', textfield.value);
	textfield.value = '';
}

socket.on('chatmessage', function (data) {
	var usernameSpan = document.createElement('span');
	usernameSpan.className = 'username'
	usernameSpan.innerText = data.user;
	usernameSpan.innerHTML += ':&nbsp;'; 
	usernameSpan.style.color = 'hsl(' + data.color + ', 100%,50%)';

	var messageSpan = document.createElement('span');
	messageSpan.innerText = data.message;
	var message = document.createElement('div');
	message.className = 'message';

	message.appendChild(usernameSpan);
	message.appendChild(messageSpan);
	messages.appendChild(message);
	messages.scrollTop = messages.scrollHeight;
});

function textfieldKeyUpEvent(event){
	if (event.keyCode == 13) {
		var content = this.value;  
		var caret = getCaret(this);          
		if(event.shiftKey){
			this.value = content.substring(0, caret - 1) + "\n" + content.substring(caret, content.length);
			event.stopPropagation();
		} else {
			this.value = content.substring(0, caret - 1) + content.substring(caret, content.length);
			sendbutton.click();
		}
	}
}

function getCaret(el) { 
	if (el.selectionStart) { 
		return el.selectionStart; 
	} else if (document.selection) { 
		el.focus();
		var r = document.selection.createRange(); 
		if (r == null) { 
			return 0;
		}
		var re = el.createTextRange(), rc = re.duplicate();
		re.moveToBookmark(r.getBookmark());
		rc.setEndPoint('EndToStart', re);
		return rc.text.length;
	}  
	return 0; 
}