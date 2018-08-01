console.log(`Let's Message!`);

//user types, presses send, get message from field send message to server, get the messages list from the server  and the messages appears on the page


let showMessagesOnDOM = function(messages){
	let messagesUL = document.querySelector('ul.messages')

	messagesUL.innerHTML = '';
	// while(messagesUL.children.length){
	// 	messagesUL.removeChild(messagesUL.children[0])
	// }]\

	console.log("messages", messages)
	messages.forEach(function(message){
		let newMessage = document.createElement('li')
		newMessage.innerText = message.text
		messagesUL.appendChild(newMessage)
	})
}

let sendMessage = function(){
	let field = document.querySelector('input[name="new-message"]');
	if (field.value){
		// console.log("send to server", field.value)
		axios.post('http://172.31.16.162:1337/message', {
			text: field.value,
		})
		.then(function (response) {
			console.log("yay");
			field.value = '';
			//clears out field and only works on successful submission
			console.log("server responded", response)
			showMessagesOnDOM(response.data)
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}

document.querySelector("button.send").addEventListener('click', sendMessage);
