// ES6 class which can be used to represent a User Object
// Must be transpiled to ES5 using Babel
// Use grunt-babel to transpile
// $ cd al-live-chat
// $ grunt

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Users = (function () {
    function Users(name, socket) {
        _classCallCheck(this, Users);

        this.username = name;
        this.socket = socket;
    }

    _createClass(Users, [{
        key: "setUsername",
        value: function setUsername(name) {
            this.username = name;
        }
    }, {
        key: "getUsername",
        value: function getUsername() {
            return this.username;
        }
    }, {
        key: "setSocket",
        value: function setSocket(socket) {
            this.socket = socket;
        }
    }, {
        key: "getSocket",
        value: function getSocket() {
            return this.socket;
        }
    }]);

    return Users;
})();
//# sourceMappingURL=es5.js.map
