"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTemplate = void 0;
const fs_extra_1 = require("fs-extra");
const fs_1 = require("fs");
const dialog_1 = require("./dialog");
exports.generateTemplate = (template, mapValues) => {
    const templateContent = fs_1.readFileSync(template.templateFile, {
        encoding: "utf8",
        flag: "r"
    });
    let fileResult = templateContent;
    let targetFile = template.targetFile;
    let targetDir = template.targetDir;
    for (const variableName of mapValues.keys()) {
        const variableValue = mapValues.get(variableName);
        const variableNameToReplace = `%${variableName}%`;
        if (variableValue) {
            fileResult = fileResult.split(variableNameToReplace).join(variableValue);
            targetDir = targetDir.split(variableNameToReplace).join(variableValue);
            targetFile = targetFile.split(variableNameToReplace).join(variableValue);
        }
    }
    console.log(`Generate template ${targetFile} to directory ${targetDir}`);
    fs_extra_1.ensureDirSync(targetDir);
    const fileResultPath = `${targetDir}${targetFile}`;
    if (fs_1.existsSync(fileResultPath)) {
        const anwser = dialog_1.ask(`The file ${fileResultPath} is not empty do you want to overwrite it  [Y/y] ? :`);
        if (anwser.toUpperCase() !== "Y")
            return;
    }
    fs_1.writeFileSync(fileResultPath, fileResult);
    console.log(`File ${fileResultPath} generated successfully`);
};
