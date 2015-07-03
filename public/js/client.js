$(function(){

    var socket = io();

    $("form").submit(function(){
        socket.emit("chat message", $("#messageInput").val());
        $("#messageInput").val("");
        return false;
    });

    socket.on("user connected", function(msg){
        $("#messages").append($("<p class='chatbot'>").text(msg));
        $("#messages").scrollTop($("#messages")[0].scrollHeight);
    });

    socket.on("user disconnected", function(msg){
        $("#messages").append($("<p class='chatbot'>").text(msg));
        $("#messages").scrollTop($("#messages")[0].scrollHeight);
    });

    socket.on("chat message", function(msg){
        $("#messages").append($("<p>").text(msg));
        $("#messages").scrollTop($("#messages")[0].scrollHeight);
    });

});
