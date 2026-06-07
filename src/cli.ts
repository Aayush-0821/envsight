#!/usr/bin/env node

import { checkEnv } from "./index.js";
import { generateEnvExample } from "./generator.js";
import { loadConfig } from "./configLoader.js";

import chalk from "chalk";

const args = process.argv.slice(2);

const command = args[0];

const force = args.includes("--force");

const json = args.includes("--json");

if (args.includes("--version")) {
  console.log("1.0.0");
  process.exit(0);
}

function showHelp() {
  console.log(`

${chalk.bold.blue("🛡 envsight")}


${chalk.bold("Commands:")}


${chalk.cyan("envsight init")}
${chalk.gray("Generates .env.example")}


${chalk.cyan("envsight init --force")}
${chalk.gray("Overwrites .env.example")}


${chalk.cyan("envsight check")}
${chalk.gray("Validates environment")}


${chalk.cyan("envsight check --json")}
${chalk.gray("Generates JSON output")}

`);
}

function handleInit() {
  try {
    const result = generateEnvExample(".env", force);

    if (result.overwritten) {
      console.log(chalk.green("✔ .env.example regenerated"));

      return;
    }

    if (!result.created) {
      console.log(chalk.yellow("⚠ .env.example already exists"));

      console.log(chalk.gray("Use --force to overwrite"));

      return;
    }

    console.log(chalk.green("✔ .env.example created"));
  } catch (error: any) {
    console.log(chalk.red(`✖ ${error.message}`));

    process.exit(1);
  }
}

async function handleCheck() {
  try {
    const config = await loadConfig();

    const result = checkEnv(config, !json);

    if (json) {
      console.log(JSON.stringify(result, null, 2));
    } else if (result.success) {
      console.log(chalk.green("\n✔ Environment is valid"));
    }

    if (!result.success) {
      process.exit(1);
    }
  } catch (error: any) {
    if (json) {
      console.log(
        JSON.stringify(
          {
            success: false,
            message: error.message,
          },
          null,
          2,
        ),
      );
    } else {
      console.log(chalk.red(`\n✖ ${error.message}`));
    }

    process.exit(1);
  }
}

async function handleCommand() {
  switch (command) {
    case "init":
      handleInit();

      break;

    case "check":
      await handleCheck();

      break;

    default:
      showHelp();
  }
}

handleCommand();
