// ES6 class which can be used to represent a User Object
// Must be transpiled to ES5 using Babel
// Use grunt-babel to transpile
// $ cd al-live-chat
// $ grunt

class Users {

    constructor(name, socket) {
        this.username = name;
        this.socket = socket;
    }

    setUsername(name) {
        this.username = name;
    }

    getUsername(){
        return this.username;
    }

    setSocket(socket) {
        this.socket = socket;
    }

    getSocket(){
        return this.socket;
    }
}