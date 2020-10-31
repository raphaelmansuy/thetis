import { readFileSync, existsSync } from "fs"
import { Config } from "./model"
import { programName } from "./version"

export const readConfig = (): Config => {
  const fileName = `./${programName}.json`

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
