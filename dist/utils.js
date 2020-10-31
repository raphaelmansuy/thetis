"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFirstExisting = exports.copyFolderSync = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
exports.copyFolderSync = (from, to) => {
    if (!fs_1.existsSync(to)) {
        fs_1.mkdirSync(to);
    }
    fs_1.readdirSync(from).forEach((element) => {
        if (fs_1.lstatSync(path_1.default.join(from, element)).isFile()) {
            fs_1.copyFileSync(path_1.default.join(from, element), path_1.default.join(to, element));
        }
        else {
            exports.copyFolderSync(path_1.default.join(from, element), path_1.default.join(to, element));
        }
    });
};
exports.findFirstExisting = (filePaths) => {
    const resultFile = filePaths.find((filePath) => fs_1.existsSync(filePath));
    return resultFile;
};
