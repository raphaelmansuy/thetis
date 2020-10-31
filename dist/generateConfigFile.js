"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateConfigFile = exports.readFileTemplateConfig = void 0;
const fs_1 = require("fs");
const dialog_1 = require("./dialog");
const version_1 = require("./version");
exports.readFileTemplateConfig = () => {
    const fileName = `${__dirname}/../init_templates/${version_1.programName}.json`;
    if (!fs_1.existsSync(fileName)) {
        throw new Error(`File config init template ${fileName} not found`);
    }
    const configFile = fs_1.readFileSync(fileName, {
        encoding: "utf8",
        flag: "r"
    });
    return configFile;
};
exports.generateConfigFile = () => {
    const templateConfigFile = exports.readFileTemplateConfig();
    const targetFile = `./${version_1.programName}.json`;
    if (fs_1.existsSync(targetFile)) {
        const anwser = dialog_1.ask(`The file ${targetFile} exists: do you want to overwrite it  [Y/y] ? :`);
        if (anwser.toUpperCase() !== "Y")
            return;
    }
    fs_1.writeFileSync(targetFile, templateConfigFile);
    console.log(`Configuration file ${targetFile} generated`);
};
