"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printHelpGenCommand = exports.printHelp = exports.printHelpCommand = void 0;
const version_1 = require("./version");
exports.printHelpCommand = (cmd) => {
    var _a;
    const helpCommand = `
  Command : ${cmd.name}
  Description: ${(_a = cmd.description) !== null && _a !== void 0 ? _a : ""}

  Example usage: > ${version_1.programName} gen ${cmd.name}

  `;
    console.log(helpCommand);
};
exports.printHelp = (config) => {
    const help = `

  --------------------------------------------
  ${version_1.programName} ${version_1.version}
  --------------------------------------------

  Commands:
  --------- 
  - init : initialize a new ${version_1.programName}.json config file and a templates directory 
  - list : list all avaiable commands
  - gen  : generate files based on a command name

  Examples:
  ---------

  > ${version_1.programName} list
  > ${version_1.programName} gen <commandName>
  > ${version_1.programName} init

 `;
    console.log(help);
    if (config)
        printHelpCommands(config.commands);
};
const printHelpCommands = (commands) => {
    commands.map((cmd) => {
        exports.printHelpCommand(cmd);
    });
};
exports.printHelpGenCommand = (config) => {
    console.log(`
      
  Usage:
  ------

  > ${version_1.programName} gen <commandName>

  Availables commands:
  --------------------

  `);
    printHelpCommands(config.commands);
};
