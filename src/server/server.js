const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let activeUsers = [];
let usersMessages = [];

io.on('connection', (socket) => {

	socket.on('userIn', nickName => {
		let validation = true;

		activeUsers.forEach((user, id) => {
			if (user !== activeUsers[id]) validation = false;
		});

		if (validation === true) activeUsers.push(nickName);
	});

	socket.on('userOut', currentUser => {
		activeUsers = activeUsers.filter(user => user !== currentUser);
	});

	socket.on('userUpdate', () => {
		socket.broadcast.emit('userUpdate', activeUsers);
		socket.emit('userUpdate', activeUsers);
	});

	socket.on('addMessage', message => {
		usersMessages.push(message);
	});

	socket.on('returnMessage', () => {
		socket.emit('returnMessage', usersMessages);
		socket.broadcast.emit('returnMessage', usersMessages);
	});

	socket.on('userValidation', nickName => {
		let validation = true;

		activeUsers.forEach((user, id) => {
			if (user === nickName) validation = false;
		});

		socket.emit('userValidation', validation);
	});

	socket.on('disconnect', () => {
		// console.log('User disconnect: ', socket.id);
	});
});

http.listen(8081, () => {
	console.log('listening on: 8081');
});