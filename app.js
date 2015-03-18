'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var tradeMessageController = require('./controllers/tradeMessageController');

var port = process.env.PORT || 3000;

/**
 *  Server listen on port 3000
 */
server.listen(port, function(){
	console.log('Server is runnung on port %d', port);
});

/**
 *  Server static assets out of the 'public' directory
 */
app.use(express.static('public'));

/**
 *  Send the 'public/index.html' to the browser
 */
 app.get('/', function(req,res){
	res.sendFile('./public/index.html ');
});

/**
 *  When a new client is connected, send the tradeMessages per country from publisher server
 */
io.sockets.on('connection', function(socket){
	tradeMessageController.getTradeMessagesGroupByCountry(function(err, tradeMessages){
		if (err) { console.log(err); }
		socket.emit('tradeMessage',tradeMessages.data);
	});
});


