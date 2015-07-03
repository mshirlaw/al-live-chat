//
$(function(){

    var socket = io();

    $("#usernameForm").submit(function(event){
        event.preventDefault();
        if(window.Notification){
            Notification.requestPermission(function(permission){
                console.log(permission);
            });
        }
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
        if(Notification.permission === "granted"){
            var notify = new Notification(msg, {
                icon: "img/logo.jpg"
            });
        }
        $("#messages").append($("<p class='chatbot'>").text(msg));
        $("#messages").scrollTop($("#messages")[0].scrollHeight);
    });

    socket.on("user disconnected", function(msg){
        if(Notification.permission === "granted"){
            var notify = new Notification(msg, {
                icon: "img/logo.jpg"
            });
        }
        $("#messages").append($("<p class='chatbot'>").text(msg));
        $("#messages").scrollTop($("#messages")[0].scrollHeight);
    });

    socket.on("chat message", function(msg){
        if(msg.private){
            if(Notification.permission === "granted"){
                var notify = new Notification("Private message: ", {
                    body: "@" + msg.username + " " + msg.msg,
                    icon: "img/logo.jpg"
                });
            }
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
            $("#currentUsers p").click(function(){
                var name = $(this).text();
                $("input:text").val("@" + name + " ");
            });
        }
    });

    socket.on("display gravatar", function(url){
        $("#gravatarImage").html("<img style=\"width:7%; padding:0px; margin:0px\"src=\""+url+"\""+">");
    });

});
