//

var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var users = {};

app.use(express.static("public"));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket){

    socket.on("new user", function(data, callback){

        if(data in users){
            callback(false);
        }
        else{
            callback(true);
            socket.user = data.toLowerCase();
            users[socket.user] = socket;
            updateUsers();
            io.emit("user connected", "Chatbot: New user \""+ socket.user + "\" connected.");
        }
    });

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

    socket.on("chat message", function(msg){
        var msgText = msg.trim();
        if(msgText[0] === "@"){
            space = msgText.indexOf(" ");
            if(space != -1){
                var privateUser = msgText.substring(1,space);
                var privateMessage = msgText.substring(space + 1);
                if(privateUser in users){
                    users[privateUser].emit("chat message", {username: socket.user, msg: privateMessage, private: true});
                    users[socket.user].emit("chat message", {username: socket.user, msg: privateMessage, private: true});
                }
            }
        }
        else{
            io.sockets.emit("chat message", { username: socket.user, msg: msgText, private: false });
        }

    });

    function updateUsers(){
        io.emit("current users", Object.keys(users));
    };

});

server.listen(3000, function(){
    console.log("App listening at http://localhost:3000");
});