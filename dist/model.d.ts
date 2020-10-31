export declare type Template = {
    readonly targetDir: string;
    readonly targetFile: string;
    readonly templateFile: string;
};
export declare type Command = {
    readonly name: string;
    readonly description?: string;
    readonly args: ReadonlyArray<string>;
    readonly templates: ReadonlyArray<Template>;
};
export declare type Config = {
    readonly commands: ReadonlyArray<Command>;
};
