"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readConfig = void 0;
const fs_1 = require("fs");
const version_1 = require("./version");
exports.readConfig = () => {
    const fileName = `./${version_1.programName}.json`;
    if (!fs_1.existsSync(fileName)) {
        throw new Error(`File ${fileName} not found`);
    }
    const configFile = fs_1.readFileSync(fileName, {
        encoding: "utf8",
        flag: "r"
    });
    const config = JSON.parse(configFile);
    return config;
};
