"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateConfigFile = exports.readFileTemplateConfig = void 0;
const fs_1 = require("fs");
const dialog_1 = require("./dialog");
const version_1 = require("./version");
const utils_1 = require("./utils");
exports.readFileTemplateConfig = () => {
    const fileNames = [`${__dirname}/../init_templates/${version_1.programName}.json`, `${__dirname}/init_templates/${version_1.programName}.json`];
    const fileName = utils_1.findFirstExisting(fileNames);
    if (!fileName) {
        const error = fileNames.reduce((errorMsg, fileName) => (`${errorMsg}\n\File config init template ${fileName} not found`));
        throw new Error(error);
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
