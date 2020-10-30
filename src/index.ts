#!/bin/sh -
':' /*-
test1=$(nodejs --version 2>&1) && exec nodejs "$0" "$@"
test2=$(node --version 2>&1) && exec node "$0" "$@"
exec printf '%s\n' "$test1" "$test2" 1>&2
*/


import reader from "readline-sync"
import { ensureDirSync } from "fs-extra"
import { readFileSync, writeFileSync, existsSync } from "fs"
import { Config, Command, Template } from "./model"

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

const readConfig = (): Config => {
  const fileName = "./thetis.json"

  if (!existsSync(fileName)) {
    throw new Error(`File ${fileName} not found`)
  }

  const configFile = readFileSync(fileName, {
    encoding: "utf8",
    flag: "r"
  })

  const config: Config = JSON.parse(configFile)
  return config
}

const analyzeCommand = (args: string[]) => {
  const [command] = args

  const config = readConfig()

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
  try {
    analyzeCommand(args)
  } catch (error) {
    console.error(error)
  }
}

start()
