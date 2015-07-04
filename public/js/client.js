// client.js
// Client code for the al-live-chat application.
// Specifies how the client will respond to messages broadcast / emitted from the server
// Author: mshirlaw
//
$(function(){

    var socket = io();

    // set the focus to the username input field
    $("#usernameInput").focus();

    // fires when the username form has been submitted
    $("#usernameForm").submit(function(event){
        event.preventDefault();

        // ask the user for permission to display desktop notifications
        if(window.Notification){
            Notification.requestPermission(function(permission){
                console.log(permission);
            });
        }

        // send a message to the server that a new user has connected
        // hide the username and error content and show the chat page
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

    // fires when the user chooses to log in as guest
    $("#guestButton").click(function(){
        event.preventDefault();

        // create a random username and hide the username and error content and show the chat page
        var number = new Date().getTime().toString();
        number = number.substring(7);
        socket.emit("new user", "user"+ number, function(){
            $("#usernameContent").hide();
            $("#errorContent").hide();
            $("#chatContent").show();
        });
    });

    // fires when the user submits a chat message by clicking send or hitting enter
    $("#chatForm").submit(function(){

        // send the chat message to the server
        socket.emit("chat message", $("#messageInput").val());
        $("#messageInput").val("");
        $("input:text").val("");
        return false;
    });

    // fires when a new user connects to the chat
    socket.on("user connected", function(msg){

        // show a desktop notification if we have permission
        if(Notification.permission === "granted"){
            var notify = new Notification(msg, {
                icon: "img/logo.jpg"
            });
        }

        // append a chatbot message to the chat window
        $("#messages").append($("<p class='chatbot'>").text(msg));
        $("#messages").scrollTop($("#messages")[0].scrollHeight);
    });

    // fires when a user disconnects from the chat
    socket.on("user disconnected", function(msg){

        // show a desktop notification if we have permission
        if(Notification.permission === "granted"){
            var notify = new Notification(msg, {
                icon: "img/logo.jpg"
            });
        }

        // append a chatbot message to the chat window
        $("#messages").append($("<p class='chatbot'>").text(msg));
        $("#messages").scrollTop($("#messages")[0].scrollHeight);
    });

    // fires when a chat message is received from the server
    socket.on("chat message", function(msg){

        // if the message is marked private, use custom formatting
        if(msg.private) {
            $("#messages").append($("<p class='private'>").html("<b>"+msg.username + " (private) :</b> " + msg.msg));
            $("#messages").scrollTop($("#messages")[0].scrollHeight);
        }
        // for a standard message, do not format
        else{
            $("#messages").append($("<p>").html("<b>"+msg.username + " :</b> " + msg.msg));
            $("#messages").scrollTop($("#messages")[0].scrollHeight);
        }
    });

    // fires when a private message is received from the server
    socket.on("notify private message", function(msg){

        // show a desktop notification if we have permission
        if(Notification.permission === "granted"){
            var notify = new Notification("Private message from " + "@" + msg.username, {
                body: msg.msg,
                icon: "img/logo.jpg"
            });
        }
    });

    // fires when the list of users has changed
    socket.on("current users", function(users){

        // update the list of online users
        $("#currentUsers").html("");
        for(var i = 0; i<users.length; i++){
            $("#currentUsers").append($("<p>").html("<a href=\"\">"+users[i]+"</a>"));
            $("#currentUsers p").click(function(e){
                e.preventDefault();
                var name = $(this).text();
                $("input:text").val("@" + name + " ");
                $("input:text").focus();
            });
        }
    });

    // fires when the user logs in with an email address, displays gravatar at top of window
    socket.on("display gravatar", function(url){
        $("#gravatarImage").html("<img style=\"width:7%; padding:0px; margin:0px\"src=\""+url+"\""+">");
    });

});
