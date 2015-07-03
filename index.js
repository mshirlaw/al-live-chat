var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

app.use(express.static("public"));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket){

    io.emit("user connected", "Chatbot: A new user connected");

    socket.on("disconnect", function(){
        io.emit("user disconnected", "Chatbot: A user disconnected");
    });

    socket.on("chat message", function(msg){
        io.emit("chat message", msg);
    });
});

server.listen(3000, function(){
    console.log("App listening at http://localhost:3000");
});