var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
users = [];
connections = [];
server.listen(3000);
app.get('/', function(req, resp){
    resp.sendFile(__dirname + '/index.html');
})

io.sockets.on('connection', function(socket){
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

    socket.on('disconnect', function(data){
        // NEW FEATURE: take the person off the Active Users list when they leave
        if(socket.username){
            users.splice(users.indexOf(socket.username), 1);
            updateUsernames();
        }
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length);
    });

    socket.on("Send Message", function (data) {
        console.log(data);
        // NEW FEATURE: the message now also carries the sender's name
        io.sockets.emit('New Message', {msg: data, user: socket.username});
    });

    // NEW FEATURE: a person joins the chat with a username
    socket.on('New User', function(data, callback){
        var name = String(data).trim();
        // refuse empty names and names that are already taken
        if(name === '' || users.indexOf(name) !== -1){
            callback(false);
            return;
        }
        callback(true);
        socket.username = name;
        users.push(socket.username);
        updateUsernames();
    });

    // NEW FEATURE: send the current list of users to everyone
    function updateUsernames(){
        io.sockets.emit('Get Users', users);
    }
});

console.log('Server is listening.');
