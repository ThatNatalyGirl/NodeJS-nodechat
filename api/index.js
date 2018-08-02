const colors = require('colors')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: true}))

console.log('running index.js'.green)



let messages = []

// app.get('/', (req, res) => res.send('Hello World!'))
app.get('/', function(req, res){
	res.send('go to /message')
})	


app.get('/message', function(req, res){
	console.log(req.body.text)
	res.send(messages)
})

//get me all the messages since the last timestamp
app.get('/message/since/:timestamp', function(req, res){
	let lastMessageSinceUpdate = req.params.timestamp;

	let recentMessages = messages.filter(function(message){
		// if(message.timestamp > lastMessageSinceUpdate){
		// 	return true;
		// } else{
		// 	return false;
		// }
		return message.timestamp > lastMessageSinceUpdate
	})
	
	res.send(recentMessages)
})

app.delete('/message/:index', function(req, res){
	console.log("delete message index" + req.params.index)
	messages.splice(req.params.index, 1)
	res.send()
})

app.post('/message', function(req, res){
	console.log(req.body.text)

	let newMessage = {
		text: req.body.text,
		username: req.body.username,
		timestamp: new Date().getTime()
	}

	messages.push(newMessage)

	res.send([newMessage])
})	

// app.listen(1234, () => console.log('Example app listening on port 3000!'))
app.listen(1337, function(){
	console.log('Example app listening on port 1337!')
}) 




// app.post('/tag', function(req, res){
// 	//req.body.tag is using the body parser going through the giant req and then finding the tag property
// 	res.send('How you add tags')
// 	//this is looking into the req and since we sent it in the main js we're just pulling it out by finding it's name
// 	console.log(req.body.color)
// 	console.log(req.body.tag)
// 	var tagInfo = {
// 		word: req.body.tag,
// 		color: req.body.color
// 	}
// 	tags.push(tagInfo);
// })

// app.get('/tag', function(req, res) {
// 	res.send(tags)
// 	//it's encoding it in json for us.
// 	//this is sending the tags array so that we can see it on our localhost:####/tag
// })



