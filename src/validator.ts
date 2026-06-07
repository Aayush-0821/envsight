import { EnvConfig } from "./types.js";

export interface ValidationResult{
    success:boolean;
    missing:string[];
    present:string[];
    optionalMissing:string[];
    total:number;
    passed:number;
    failed:number;
    optional:number;
}

export function validateEnv(config:EnvConfig):ValidationResult{

    const missing:string[] = [];
    const present:string[] = [];
    const optionalMissing:string[] = [];

    config.required.forEach((key)=>{
        if(process.env[key] !== undefined && process.env[key] !== "" ){
            present.push(key);
        }
        else{
            missing.push(key);
        }
    });

    config.optional?.forEach((key)=>{
        if(process.env[key] !== undefined && process.env[key] !== "" ){
            optionalMissing.push(key);
        }
    });

    const optionalCount = config.optional?.length ?? 0;

    const total = config.required.length + optionalCount;

    const passed = present.length + optionalMissing.length === 0?present.length+optionalCount:present.length;

    return {
        success : missing.length === 0,
        missing,
        present,
        optionalMissing,
        total,
        passed,
        failed: missing.length,
        optional:optionalCount,
    };
}