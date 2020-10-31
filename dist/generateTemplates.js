"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTemplates = exports.sourceTemplateDir = exports.destinationTemplateDir = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const dialog_1 = require("./dialog");
exports.destinationTemplateDir = "./templates";
exports.sourceTemplateDir = `${__dirname}/../init_templates/templates`;
const copyFolderSync = (from, to) => {
    if (!fs_1.existsSync(to)) {
        fs_1.mkdirSync(to);
    }
    fs_1.readdirSync(from).forEach((element) => {
        if (fs_1.lstatSync(path_1.default.join(from, element)).isFile()) {
            fs_1.copyFileSync(path_1.default.join(from, element), path_1.default.join(to, element));
        }
        else {
            copyFolderSync(path_1.default.join(from, element), path_1.default.join(to, element));
        }
    });
};
exports.generateTemplates = () => {
    if (fs_1.existsSync(exports.destinationTemplateDir)) {
        const anwser = dialog_1.ask(`The directory ${exports.destinationTemplateDir} exists do you want to overwrite it  [Y/y] ? :`);
        if (anwser.toUpperCase() !== "Y")
            return;
    }
    copyFolderSync(exports.sourceTemplateDir, exports.destinationTemplateDir);
    console.log(`Template directory ${exports.destinationTemplateDir} created with success`);
};
