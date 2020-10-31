import { readFileSync, writeFileSync, existsSync } from "fs"
import { ask } from "./dialog"
import { programName } from "./version"

export const readFileTemplateConfig = () => {
  const fileName = `${__dirname}/../init_templates/${programName}.json`

  if (!existsSync(fileName)) {
    throw new Error(`File config init template ${fileName} not found`)
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
