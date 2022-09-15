"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensure = void 0;
function ensure(value, name) {
    if (!value) {
        const msg = `Expecting value for ${name}`;
        console.log(msg);
        throw msg;
    }
}
exports.ensure = ensure;
