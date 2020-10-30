import { Config } from "./model"

export const config: Config = {
  commands: [
    {
      name: "reactc",
      args: ["ComponentName"],
      templates: [
        {
          targetDir: "./components/%ComponentName%/",
          targetFile: "index.tsx",
          templateFile: "./templates/reactc/reactComponent.txt"
        },
        {
          targetDir: "./components/%ComponentName%/",
          targetFile: "Style.ts",
          templateFile: "./templates/reactc/Style.txt"
        },
        {
          targetDir: "./stories/components/",
          targetFile: "%ComponentName%.stories.tsx",
          templateFile: "./templates/reactc/Stories.txt"
        }
      ]
    }
  ]
}