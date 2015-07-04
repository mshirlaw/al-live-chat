#al-live-chat
##mshirlaw

###Background
A simple chat application written using NodeJS and Socket.io. It is designed to act as a real time chat so employees can message each other instantly.

###Features
1. A user can enter a username before joining the chat. All usernames are unique. A user may also enter as a guest, in which case a random username will be generated.
2. A user can select from a list of online users to send a new private message either by clicking on the relevant username or by typing @username before the message.  
3. If the user logs in using an email address with a gravatar attached, the user's gravatar will be displayed at the top of the application.
4. The application leverages the ​Notification API​ for browsers that support it. A desktop notification is displayed when a user comes online, goes offline or receives a private message.

###Build/Run

1. Download .zip from [github](http://github.com/mshirlaw/al-live-chat/)
2. Navigate to the "al-live-chat" directory
```
cd al-live-chat
```
3. Install project dependencies
```
npm install
```
4. Start the server
```
node server
```

###Testing

1. Navigate to the "al-live-chat" directory
```
cd al-live-chat
```
2. Use grunt to run unit tests
```
grunt
```


