#!usr/bin/env node

import reader from "readline-sync"
import { ensureDirSync } from "fs-extra"
import { readFileSync, writeFileSync } from "fs"
import { Config, Command, Template } from "./model"
import { config } from "./config"

const version = "1.0"

// Get args
const [, , ...args] = process.argv

type CommandType = "list" | "gen"

const help = `
  thetis ${version}

  Commands: 

`

function ask(questionText: string) {
  return reader.question(questionText)
}

const listCommands = (config: Config) => {
  console.log(help)
  config.commands.map((command) => {
    console.log(`- ${command.name}`)
  })
  console.log("\n\n")
}

const getArgValues = (command: Command) => {
  const mapArgValues = new Map<string, string>()

  command.args.map((arg) => {
    const answer = ask(`Enter value of ${arg}:`)
    console.log(`answer: ${answer}`)
    mapArgValues.set(arg, answer)
  })

  return mapArgValues
}

const generateTemplate = (
  template: Template,
  mapValues: Map<string, string>
) => {
  const templateContent = readFileSync(template.templateFile, {
    encoding: "utf8",
    flag: "r"
  })

  let fileResult = templateContent
  let targetFile = template.targetFile
  let targetDir = template.targetDir

  for (const variableName of mapValues.keys()) {
    const variableValue = mapValues.get(variableName)
    const variableNameToReplace = `%${variableName}%`
    if (variableValue) {
      fileResult = fileResult.split(variableNameToReplace).join(variableValue)
      targetDir = targetDir.split(variableNameToReplace).join(variableValue)
      targetFile = targetFile.split(variableNameToReplace).join(variableValue)
    }
  }

  console.log(`Generate template ${targetFile} to directory ${targetDir}`)

  ensureDirSync(targetDir)
  const fileResultPath = `${targetDir}/${targetFile}`
  writeFileSync(fileResultPath, fileResult)
}

const executeCommand = (command: Command) => {
  console.log(`Execute command ${command.name}`)

  const mapValues = getArgValues(command)

  command.templates.map((template) => {
    generateTemplate(template, mapValues)
  })

  return mapValues
}

const analyzeCommand = (args: string[]) => {
  const [command] = args

  if (!command) {
    listCommands(config)
    return
  }

  if (command.toUpperCase() === "list") {
    listCommands(config)
    return
  }

  const foundCommand = config.commands.find(
    (c) => c.name.toUpperCase() === command.toUpperCase()
  )

  if (foundCommand) {
    executeCommand(foundCommand)
  } else {
    listCommands(config)
  }
}

function start() {
  analyzeCommand(args)
}

start()
