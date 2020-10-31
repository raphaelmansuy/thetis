import { Config, Command } from "./model"
import { version, programName } from "./version"

export const printHelpCommand = (cmd: Command) => {
  const helpCommand = `
  Command : ${cmd.name}
  Description: ${cmd.description ?? ""}

  Example usage: > ${programName} gen ${cmd.name}

  `

  console.log(helpCommand)
}

export const printHelp = (config: Config) => {
  const help = `

  --------------------------------------------
  ${programName} ${version}
  --------------------------------------------

  Commands:
  --------- 


  - init : initialize a new ${programName}.json config file a template directory 
  - list : list all avaiable commands name
  - gen  : generate files based on a command name

  Examples:
  ---------

  > ${programName} list

  > ${programName} gen <commandName>

  > ${programName} init

 `

  console.log(help)

  printHelpCommands(config.commands)
}

const printHelpCommands = (commands: ReadonlyArray<Command>) => {
  commands.map((cmd) => {
    printHelpCommand(cmd)
  })
}

export const printHelpGenCommand = (config: Config) => {
  console.log(`
      
  Usage:
  ----- 

  > ${programName} gen <commandName>

  Availables commands:
  --------------------

  `)

  printHelpCommands(config.commands)
}
