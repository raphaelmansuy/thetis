#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const printHelp_1 = require("./printHelp");
const dialog_1 = require("./dialog");
const generation_1 = require("./generation");
const config_1 = require("./config");
const generateConfigFile_1 = require("./generateConfigFile");
const generateTemplates_1 = require("./generateTemplates");
const executeCommand = (command) => {
    console.log(`Execute command ${command.name}`);
    const mapValues = dialog_1.getArgValues(command);
    command.templates.map((template) => {
        generation_1.generateTemplate(template, mapValues);
    });
    return mapValues;
};
const analyzeCommand = (args) => {
    const [command, commandArg] = args;
    let config;
    try {
        config = config_1.readConfig();
    }
    catch (error) {
        console.log("Config file not found");
    }
    if (!command) {
        printHelp_1.printHelp(config);
        return;
    }
    if (command.toUpperCase() === "INIT") {
        generateConfigFile_1.generateConfigFile();
        generateTemplates_1.generateTemplates();
        return;
    }
    if (!config) {
        printHelp_1.printHelp();
        return;
    }
    if (command.toUpperCase() === "LIST") {
        printHelp_1.printHelp(config);
        return;
    }
    if (command.toUpperCase() === "GEN") {
        if (!commandArg) {
            console.log("commandName is missing");
            printHelp_1.printHelpGenCommand(config);
            return;
        }
        const foundCommand = config.commands.find((c) => c.name.toUpperCase() === commandArg.toUpperCase());
        if (foundCommand) {
            executeCommand(foundCommand);
        }
        else {
            printHelp_1.printHelpGenCommand(config);
        }
    }
};
function start() {
    try {
        // Get args
        const [, , ...args] = process.argv;
        analyzeCommand(args);
    }
    catch (error) {
        console.error(error);
    }
}
start();
