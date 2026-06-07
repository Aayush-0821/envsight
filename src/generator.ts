import fs from "fs";
import path from "path";

export function generateEnvExample(
    envPath:string = ".env",
    force:boolean = false
){
    const fullPath = path.resolve(envPath);

    if(!fs.existsSync(fullPath)){
        throw new Error(
            ".env file not found"
        );
    }

    const outputPath = path.resolve(".env.example");

    if(fs.existsSync(outputPath) && !force){
        return {
            created:false,
            overwritten:false,
            file:".env.example"
        };
    }

    const envContent = fs.readFileSync(fullPath,"utf-8");

    const lines = envContent.split("\n");

    const exampleLines:string[] = [];

    lines.forEach((line)=>{
        const trimmed = line.trim();

        if(!trimmed || trimmed.startsWith('#')) return;

        const key = trimmed.split("=")[0];

        exampleLines.push(`${key}=`);
    });

    fs.writeFileSync(
        ".env.example",
        exampleLines.join("\n")
    );

    return{
        created:true,
        overwritten:fs.existsSync(outputPath),
        file:".env.example",
    }
}