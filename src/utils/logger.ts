import chalk from "chalk";

export function logSuccess(message:string){
    console.log(
        chalk.green(`✔ ${message}`)
    );
}

export function logError(message:string){
    console.log(
        chalk.red(`✖ ${message}`)
    );
}

export function logWarning(message:string){
    console.log(
        chalk.yellow(`⚠ ${message}`)
    );
}