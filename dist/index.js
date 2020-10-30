#!usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
const fs_extra_1 = require("fs-extra");
const fs_1 = require("fs");
const version = "1.0";
// Get args
const [, , ...args] = process.argv;
const help = `
  thetis ${version}

  Commands: 

`;
function ask(questionText) {
    return readline_sync_1.default.question(questionText);
}
const listCommands = (config) => {
    console.log(help);
    config.commands.map((command) => {
        console.log(`- ${command.name}`);
    });
    console.log("\n\n");
};
const getArgValues = (command) => {
    const mapArgValues = new Map();
    command.args.map((arg) => {
        const answer = ask(`Enter value of ${arg}:`);
        console.log(`answer: ${answer}`);
        mapArgValues.set(arg, answer);
    });
    return mapArgValues;
};
const generateTemplate = (template, mapValues) => {
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
    const fileResultPath = `${targetDir}/${targetFile}`;
    fs_1.writeFileSync(fileResultPath, fileResult);
};
const executeCommand = (command) => {
    console.log(`Execute command ${command.name}`);
    const mapValues = getArgValues(command);
    command.templates.map((template) => {
        generateTemplate(template, mapValues);
    });
    return mapValues;
};
const readConfig = () => {
    const fileName = "./thetis.json";
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
const analyzeCommand = (args) => {
    const [command] = args;
    const config = readConfig();
    if (!command) {
        listCommands(config);
        return;
    }
    if (command.toUpperCase() === "list") {
        listCommands(config);
        return;
    }
    const foundCommand = config.commands.find((c) => c.name.toUpperCase() === command.toUpperCase());
    if (foundCommand) {
        executeCommand(foundCommand);
    }
    else {
        listCommands(config);
    }
};
function start() {
    try {
        analyzeCommand(args);
    }
    catch (error) {
        console.error(error);
    }
}
start();
