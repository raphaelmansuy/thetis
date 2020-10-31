import { Command } from "./model";
export declare function ask(questionText: string): string;
export declare const getArgValues: (command: Command) => Map<string, string>;
