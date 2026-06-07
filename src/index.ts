import { loadEnv } from "./envLoader.js";
import { EnvConfig } from "./types.js";
import { validateEnv, ValidationResult } from "./validator.js";
import { formatResult } from "./formatter.js";
import ora from "ora";

export { generateEnvExample } from "./generator.js";

export function checkEnv(config: EnvConfig,showOutput = true): ValidationResult {
  loadEnv(config.environment);

  const spinner = showOutput?ora({
    text: "Checking environment variables",
    spinner: "dots",
  }).start():null;

  const result = validateEnv(config);

  spinner?.stop();

  if(showOutput) formatResult(result);

  return result;
}
