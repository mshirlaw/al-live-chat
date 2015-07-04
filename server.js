// server.js
// Server code for the al-live-chat application.
// Creates a NodeJS sever responsible for pushing chat messages to clients
// Author: mshirlaw
//
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var md5 = require("js-md5");
var users = {};

// the directory from which static files will be served
app.use(express.static("public"));

// when a new user connects to the root directory, send the home page
app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

// fires when a new user connects
io.on("connection", function(socket){

    socket.on("new user", function(data, callback){

        // check if user name contains a space
        if(data.indexOf(" ") != -1){
            callback(false);
        }
        // check if the user already exists
        else if(data in users){
            callback(false);
        }
        // create an entry in users for the user and store the username and socket
        else{
            callback(true);
            socket.user = data.toLowerCase();
            users[socket.user] = socket;
            updateUsers();
            io.emit("user connected", "Chatbot: New user \""+ socket.user + "\" connected.");
            if(socket.user.indexOf("@") != -1){
                var url = "http://www.gravatar.com/avatar/"+md5(socket.user);
                socket.emit("display gravatar", url);
            }
        }
    });

    // fires when a user disconnects from the chat
    socket.on("disconnect", function(){
        if(!socket.user){
            return;
        }
        else {
            delete users[socket.user];
            io.emit("user disconnected", "Chatbot: User \"" + socket.user + "\" disconnected. Goodbye!");
            updateUsers();
        }
    });

    // fires when a new chat message is received from a client
    socket.on("chat message", function(msg){

        // check if the message is a private message
        var msgText = msg.trim();
        if(msgText[0] === "@"){
            space = msgText.indexOf(" ");
            if(space != -1){
                var privateUser = msgText.substring(1,space);
                var privateMessage = msgText.substring(space + 1);

                // send the message to the user indicated only
                if(privateUser in users){
                    users[privateUser].emit("chat message", {username: socket.user, msg: privateMessage, private: true});
                    users[privateUser].emit("notify private message", {username: socket.user, msg: privateMessage, private: true});
                    users[socket.user].emit("chat message", {username: socket.user, msg: privateMessage, private: true});
                }
            }
        }
        else{

            // send the chat message to all users
            io.sockets.emit("chat message", { username: socket.user, msg: msgText, private: false });
        }

    });

    // helper function to update the list of logged in users
    function updateUsers(){
        io.emit("current users", Object.keys(users));
    };

});

// listen for connectsion on port 3000
server.listen(3000, function(){
    console.log("al-live-chat listening at http://localhost:3000");
});