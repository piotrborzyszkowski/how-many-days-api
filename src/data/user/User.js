"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, authenticationId, email) {
        this.id = id;
        this.authenticationId = authenticationId;
        this.email = email;
    }
}
exports.User = User;
