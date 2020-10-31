"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTemplates = exports.destinationTemplateDir = void 0;
const fs_1 = require("fs");
const utils_1 = require("./utils");
const dialog_1 = require("./dialog");
exports.destinationTemplateDir = "./templates";
const sourceTemplateDirs = [
    `${__dirname}/../init_templates/templates`,
    `${__dirname}/init_templates/templates`
];
exports.generateTemplates = () => {
    const sourceTemplateDir = utils_1.findFirstExisting(sourceTemplateDirs);
    if (!sourceTemplateDir) {
        const error = sourceTemplateDirs.reduce((errorMsg, directory) => `${errorMsg}\n\Directory ${directory} not found`);
        throw new Error(error);
    }
    if (fs_1.existsSync(exports.destinationTemplateDir)) {
        const anwser = dialog_1.ask(`The directory ${exports.destinationTemplateDir} exists do you want to overwrite it  [Y/y] ? :`);
        if (anwser.toUpperCase() !== "Y")
            return;
    }
    utils_1.copyFolderSync(sourceTemplateDir, exports.destinationTemplateDir);
    console.log(`Template directory ${exports.destinationTemplateDir} created with success`);
};
