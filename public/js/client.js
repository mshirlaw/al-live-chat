//
$(function(){

    var socket = io();
    $("#right-col").height($("#left-col").height());

    $("#usernameForm").submit(function(event){
        event.preventDefault();
        socket.emit("new user", $("#usernameInput").val(), function(validName){
            if(validName){
                $("#usernameContent").hide();
                $("#errorContent").hide();
                $("#chatContent").show();
            }
            else{
                $("#errorContent").show();
            }
        });
        $("#usernameInput").val("");
    });

    $("#guestButton").click(function(){
        event.preventDefault();
        var number = new Date().getTime().toString();
        number = number.substring(7);
        socket.emit("new user", "user"+ number, function(){
            $("#usernameContent").hide();
            $("#errorContent").hide();
            $("#chatContent").show();
        });
    });

    $("#chatForm").submit(function(){
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
        if(msg.private){
            $("#messages").append($("<p class='private'>").html("<b>"+msg.username + " (private) :</b> " + msg.msg));
            $("#messages").scrollTop($("#messages")[0].scrollHeight);
        }
        else{
            $("#messages").append($("<p>").html("<b>"+msg.username + " :</b> " + msg.msg));
            $("#messages").scrollTop($("#messages")[0].scrollHeight);
        }
    });

    socket.on("current users", function(users){
        $("#currentUsers").html("");
        for(var i = 0; i<users.length; i++){
            $("#currentUsers").append($("<p>").text(users[i]));
        }
    });

});
