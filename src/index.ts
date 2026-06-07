import { loadEnv } from "./envLoader.js";
import { EnvConfig } from "./types.js";
import { validateEnv, ValidationResult } from "./validator.js";
import { formatResult } from "./formatter.js";
import ora from "ora";

export { generateEnvExample } from "./generator.js";

export function checkEnv(config: EnvConfig): ValidationResult {
  loadEnv(config.enviroment);

  const spinner = ora({
 text:"Checking environment variables",
 spinner:"dots"
}).start();

  const result = validateEnv(config);

  spinner.stop();

  formatResult(result);

  return result;
}
