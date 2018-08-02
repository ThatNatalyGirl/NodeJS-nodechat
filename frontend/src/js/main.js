console.log(`Let's Message!`);

//user types, presses send, get message from field send message to server, get the messages list from the server  and the messages appears on the page

let timesStampOfLatestMessages = 0

let showMessagesOnDOM = function(messages){
	let messagesUL = document.querySelector('ul.messages')

	// messagesUL.innerHTML = '';
	// while(messagesUL.children.length){
	// 	messagesUL.removeChild(messagesUL.children[0])
	// }]\

	console.log("messages", messages)
	messages.forEach(function(message, i){
		let newLi = document.createElement('li')
		
		let userName = document.createElement('p')
		userName.innerText =  "User: " + message.username
		userName.style.fontSize = '14px'
		userName.style.color = 'blue'

		let newMessage = document.createElement('p')
		newMessage.innerText = message.text

		let messageTime = document.createElement('p')
		messageTime.innerText = moment(message.timestamp).format("MMM Do hh:mm:ss a")
		// moment().format('MMMM Do YYYY, h:mm:ss a');
		messageTime.style.color = '#a5c4f2'
		messageTime.style.fontSize = '14px'

		let newDeleteButton = document.createElement('button')
		newDeleteButton.innerText = 'Delete'

		newDeleteButton.addEventListener("click", function(){
			axios
				.delete('http://localhost:1337/message/' + i)
				.then(function(response){
					// showMessagesOnDOM(response.data)
				})
				.catch(function (error) {
					console.log(error);
				});
		})

		messagesUL.appendChild(newLi)
		newLi.appendChild(userName)
		newLi.appendChild(newMessage)
		newLi.appendChild(messageTime)
		newLi.appendChild(newDeleteButton)
	})
}



// axios
// 	.delete('http://localhost:1337/message/0')
// 	.then(function(response){

// 	})
// 	.catch(function (error) {
// 		console.log(error);
// 	});



// let deleteLastMessage = function(){
// 	axios.get('http://localhost:1337/message')
// 	.then(function (response) {
// 		setInterval(showMessagesOnDOM(response.data), 3000)
// 		// ^ that is updating the messages every 3 secs
//   })
// 	axios.post('http://localhost:1337/message', {
// 		text: field.value,
// 		username: username.value,
// 	})

// 	.then(function (response) {
// 		console.log("yay");
// 		field.value = '';
// 		//clears out field and only works on successful submission
// 		// console.log("server responded", response.data)
// 		showMessagesOnDOM(response.data);
// 		//array.pop 
// 	})
// }



let sendMessage = function(){
	let field = document.querySelector('input[name="new-message"]');
	let username = document.querySelector('input[name="username"]');
	if (field.value){
		// console.log("send to server", field.value)
		axios.post('http://localhost:1337/message', {
			text: field.value,
			username: username.value,
		})
		.then(function (response) {
			console.log("yay");
			field.value = '';
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}

//updates all messages when the page loads
// window.onload = function(){
// 	axios.get('http://localhost:1337/message')
// 	.then(function (response) {
// 		setInterval(showMessagesOnDOM(response.data), 3000)
// 		// ^ that is updating the messages every 3 secs
//   })
//   .catch(function (error) {
// 	console.log(error);
//   });
// }
//this wouldn't work bc it only is repeating the messages that existed when the page loaded




let fetchMessages = function(){
	axios.get('http://localhost:1337/message/since/'  + timesStampOfLatestMessages)
	.then(function (response) {
		showMessagesOnDOM(response.data)

		if(response.data.length){
			timesStampOfLatestMessages = (response.data[response.data.length-1].timestamp)
		}
	})
	.catch(function (error) {
		console.log(error);
	});
}

fetchMessages()
setInterval(fetchMessages, 3000)


document.querySelector(".sendBtn").addEventListener('click', sendMessage);

// document.querySelector(".deleteBtn").addEventListener('click', deleteLastMessage);








