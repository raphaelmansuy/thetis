import reader from "readline-sync"
import { Command } from "./model"

export function ask(questionText: string) {
  return reader.question(questionText)
}

export const getArgValues = (command: Command) => {
  const mapArgValues = new Map<string, string>()

  command.args.map((arg) => {
    const answer = ask(`Enter value of ${arg}: `)
    console.log(`answer: ${answer}`)
    mapArgValues.set(arg, answer)
  })

  return mapArgValues
}
