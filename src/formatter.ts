import { ValidationResult } from "./validator.js";
import { logError, logSuccess, logWarning } from "./utils/logger.js";
import boxen from "boxen";

export function formatResult(result: ValidationResult) {
  console.log("\n🛡 env-strict\n");

  console.log("Checking environment...\n");

  result.present.forEach((key) => {
    logSuccess(key);
  });

  result.missing.forEach((key) => {
    logError(key);
  });

  result.optionalMissing.forEach((key) => {
    logWarning(`${key} (optional)`);
  });

  console.log("\n---------------");

  console.log(`Total: ${result.total}`);

  console.log(`Passed: ${result.passed}`);

  console.log(`Failed: ${result.failed}`);

  console.log(`Optional: ${result.optional}`);

  console.log("");

  if (result.success) {
    console.log(
      boxen("Environment validation passed", {
        padding: 0.5,
        borderStyle: "round",
        borderColor: "green",
      }),
    );
  } else {
    console.log(
      boxen("Environment validation failed", {
        padding: 0.5,
        borderStyle: "round",
        borderColor: "redBright",
      }),
    );
  }
}
