#!/bin/sh -
":" /*-
test1=$(nodejs --version 2>&1) && exec nodejs "$0" "$@"
test2=$(node --version 2>&1) && exec node "$0" "$@"
exec printf '%s\n' "$test1" "$test2" 1>&2
*/

import { printHelp, printHelpGenCommand } from "./printHelp"
import { getArgValues } from "./dialog"
import { Command } from "./model"
import { generateTemplate } from "./generation"
import { readConfig } from "./config"
import { generateConfigFile } from "./generateConfigFile"

const executeCommand = (command: Command) => {
  console.log(`Execute command ${command.name}`)

  const mapValues = getArgValues(command)

  command.templates.map((template) => {
    generateTemplate(template, mapValues)
  })

  return mapValues
}

const analyzeCommand = (args: string[]) => {
  const [command, commandArg] = args

  const config = readConfig()

  if (!command) {
    printHelp(config)
    return
  }

  if (command.toUpperCase() === "LIST") {
    printHelp(config)
    return
  }

  if (command.toUpperCase() === "INIT") {
    generateConfigFile()
    return
  }

  if (command.toUpperCase() === "GEN") {
    if (!commandArg) {
      console.log("commandName is missing")
      printHelpGenCommand(config)
      return
    }

    const foundCommand = config.commands.find(
      (c) => c.name.toUpperCase() === commandArg.toUpperCase()
    )

    if (foundCommand) {
      executeCommand(foundCommand)
    } else {
      printHelpGenCommand(config)
    }
  }
}

function start() {
  try {
    // Get args
    const [, , ...args] = process.argv
    analyzeCommand(args)
  } catch (error) {
    console.error(error)
  }
}

start()
