'use strict';

console.log('Let\'s Message!');

//user types, presses send, get message from field send message to server, get the messages list from the server  and the messages appears on the page


var showMessagesOnDOM = function showMessagesOnDOM(messages) {
	var messagesUL = document.querySelector('ul.messages');

	messagesUL.innerHTML = '';
	// while(messagesUL.children.length){
	// 	messagesUL.removeChild(messagesUL.children[0])
	// }]\

	console.log("messages", messages);
	messages.forEach(function (message) {
		var newLi = document.createElement('li');

		var userName = document.createElement('p');
		userName.innerText = "User: " + message.username;
		userName.style.fontSize = '14px';
		userName.style.color = 'blue';

		var newMessage = document.createElement('p');
		newMessage.innerText = message.text;

		var messageTime = document.createElement('p');
		messageTime.innerText = moment(message.timestamp).format("MMM Do hh:mm:ss a");
		// moment().format('MMMM Do YYYY, h:mm:ss a');
		messageTime.style.color = '#a5c4f2';
		messageTime.style.fontSize = '14px';

		messagesUL.appendChild(newLi);
		newLi.appendChild(userName);
		newLi.appendChild(newMessage);
		newLi.appendChild(messageTime);
	});
};

var sendMessage = function sendMessage() {
	var field = document.querySelector('input[name="new-message"]');
	if (field.value) {
		// console.log("send to server", field.value)
		axios.post('http://localhost:1337/message', {
			text: field.value
		}).then(function (response) {
			console.log("yay");
			field.value = '';
			//clears out field and only works on successful submission
			// console.log("server responded", response.data)
			showMessagesOnDOM(response.data);
		}).catch(function (error) {
			console.log(error);
		});
	}
};

//updates all messages when the page loads
window.onload = function () {
	axios.get('http://localhost:1337/message').then(function (response) {
		setInterval(showMessagesOnDOM(response.data), 3000);
		// ^ that is updating the messages every 3 secs
	}).catch(function (error) {
		console.log(error);
	});
};

document.querySelector(".sendBtn").addEventListener('click', sendMessage);
//# sourceMappingURL=main.js.map
