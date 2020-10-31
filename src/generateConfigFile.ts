import { readFileSync, writeFileSync, existsSync } from "fs"
import { ask } from "./dialog"
import { programName } from "./version"
import {findFirstExisting} from "./utils"


export const readFileTemplateConfig = () => {

  const fileNames = [`${__dirname}/../init_templates/${programName}.json`,`${__dirname}/init_templates/${programName}.json`]
  const fileName = findFirstExisting(fileNames)

  if (!fileName) {
    const error = fileNames.reduce((errorMsg,fileName) => (`${errorMsg}\n\File config init template ${fileName} not found`))
    throw new Error(error)
  }

  const configFile = readFileSync(fileName, {
    encoding: "utf8",
    flag: "r"
  })

  return configFile
}

export const generateConfigFile = () => {
  const templateConfigFile = readFileTemplateConfig()

  const targetFile = `./${programName}.json`

  if (existsSync(targetFile)) {
    const anwser = ask(
      `The file ${targetFile} exists: do you want to overwrite it  [Y/y] ? :`
    )
    if (anwser.toUpperCase() !== "Y") return
  }
  writeFileSync(targetFile, templateConfigFile)

  console.log(`Configuration file ${targetFile} generated`)
}
