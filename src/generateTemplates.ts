import path from "path"
import { existsSync, mkdirSync, copyFileSync, readdirSync, lstatSync } from "fs"
import { ask } from "./dialog"

export const destinationTemplateDir = "./templates"
export const sourceTemplateDir = `${__dirname}/../init_templates/templates`

const copyFolderSync = (from: string, to: string) => {
  if (!existsSync(to)) {
    mkdirSync(to)
  }
  readdirSync(from).forEach((element) => {
    if (lstatSync(path.join(from, element)).isFile()) {
      copyFileSync(path.join(from, element), path.join(to, element))
    } else {
      copyFolderSync(path.join(from, element), path.join(to, element))
    }
  })
}

export const generateTemplates = () => {
  if (existsSync(destinationTemplateDir)) {
    const anwser = ask(
      `The directory ${destinationTemplateDir} exists do you want to overwrite it  [Y/y] ? :`
    )
    if (anwser.toUpperCase() !== "Y") return
  }

  copyFolderSync(sourceTemplateDir, destinationTemplateDir)

  console.log(`Template directory ${destinationTemplateDir} created with success`)
}
