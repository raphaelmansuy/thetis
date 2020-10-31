import { ensureDirSync } from "fs-extra"
import { readFileSync, writeFileSync, existsSync } from "fs"
import { Template } from "./model"
import { ask } from "./dialog"

export const generateTemplate = (
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
  const fileResultPath = `${targetDir}${targetFile}`

  if (existsSync(fileResultPath)) {
    const anwser = ask(
      `The file ${fileResultPath} is not empty do you want to overwrite it  [Y/y] ? :`
    )
    if (anwser.toUpperCase() !== "Y") return
  }

  writeFileSync(fileResultPath, fileResult)

  console.log(`File ${fileResultPath} generated successfully`)
}
