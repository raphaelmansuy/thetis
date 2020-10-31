import path from "path"
import { existsSync, mkdirSync, copyFileSync, readdirSync, lstatSync } from "fs"
import { copyFolderSync, findFirstExisting } from "./utils"
import { ask } from "./dialog"

export const destinationTemplateDir = "./templates"

const sourceTemplateDirs = [
  `${__dirname}/../init_templates/templates`,
  `${__dirname}/init_templates/templates`
]

export const generateTemplates = () => {
  const sourceTemplateDir = findFirstExisting(sourceTemplateDirs)

  if (!sourceTemplateDir) {
    const error = sourceTemplateDirs.reduce(
      (errorMsg, directory) => `${errorMsg}\n\Directory ${directory} not found`
    )
    throw new Error(error)
  }

  if (existsSync(destinationTemplateDir)) {
    const anwser = ask(
      `The directory ${destinationTemplateDir} exists do you want to overwrite it  [Y/y] ? :`
    )
    if (anwser.toUpperCase() !== "Y") return
  }

  copyFolderSync(sourceTemplateDir, destinationTemplateDir)

  console.log(
    `Template directory ${destinationTemplateDir} created with success`
  )
}
