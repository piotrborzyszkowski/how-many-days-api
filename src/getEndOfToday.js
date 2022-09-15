"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEndOfToday = void 0;
function getEndOfToday(dateClass) {
    const today = new dateClass();
    today.setHours(23, 59, 59, 999);
    return today;
}
exports.getEndOfToday = getEndOfToday;
