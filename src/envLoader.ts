import fs from "fs";
import path from "path";
import dotenv from "dotenv";

export function loadEnv(
    enviroment?:string
){
    const files = [
        ".env",
        enviroment
        ?`.env.${enviroment}`
        :null,

        ".env.local"
    ].filter(Boolean) as string[];

    let loaded = false;

    files.forEach((file)=>{
        const filePath = path.resolve(file);

        if(fs.existsSync(filePath)){
            dotenv.config({
                path:filePath,
                override:false,
                quiet:true,
            });
            loaded = true;
        }
    });

    return loaded;
}