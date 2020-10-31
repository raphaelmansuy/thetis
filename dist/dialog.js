"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArgValues = exports.ask = void 0;
const readline_sync_1 = __importDefault(require("readline-sync"));
function ask(questionText) {
    return readline_sync_1.default.question(questionText);
}
exports.ask = ask;
exports.getArgValues = (command) => {
    const mapArgValues = new Map();
    command.args.map((arg) => {
        const answer = ask(`Enter value of ${arg}: `);
        console.log(`answer: ${answer}`);
        mapArgValues.set(arg, answer);
    });
    return mapArgValues;
};
