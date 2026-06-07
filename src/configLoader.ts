import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

export async function loadConfig() {
  const jsConfig = path.resolve("env-strict.config.js");

  const tsConfig = path.resolve("env-strict.config.ts");

  let configPath: string | null = null;

  if (fs.existsSync(jsConfig)) {
    configPath = jsConfig;
  } else if (fs.existsSync(tsConfig)) {
    configPath = tsConfig;
  }

  if (!configPath) {
    throw new Error(
      `
env-strict.config.js not found

Create one in your project root.
`,
    );
  }

  // block TS in production node

  if (configPath.endsWith(".ts") && !process.execArgv.includes("tsx")) {
    throw new Error(
      `
TypeScript config detected.

Rename:

env-strict.config.ts

to:

env-strict.config.js
`,
    );
  }

  const config = await import(pathToFileURL(configPath).href);

  return config.default;
}
