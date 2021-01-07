#!/usr/bin/env node

import { printHelp, printHelpGenCommand } from "./printHelp"
import { getArgValues } from "./dialog"
import { Command } from "./model"
import { generateTemplate } from "./generation"
import { readConfig } from "./config"
import { generateConfigFile } from "./generateConfigFile"
import { generateTemplates } from "./generateTemplates"

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

  let config

  try {
    config = readConfig()
  } catch (error) {
    console.log("Config file not found")
  }

  if (!command) {
    printHelp(config)
    return
  }

  if (command.toUpperCase() === "INIT") {
    generateConfigFile()
    generateTemplates()
    return
  }

  if (!config) {
    printHelp()
    return
  }

  if (command.toUpperCase() === "LIST") {
    printHelp(config)
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
