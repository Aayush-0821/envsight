# 🛡 env-strict

A lightweight environment variable validator CLI for Node.js projects.

Prevent runtime crashes caused by missing environment variables by validating your configuration before running your application or deploying.

## Features

- Validate required environment variables
- Detect missing environment variables
- Support optional environment variables
- Generate `.env.example` automatically
- Safe overwrite using `--force`
- CLI support
- JSON output mode
- Config file support
- GitHub Actions support

## Installation

Install globally:

```
npm install -g env-strict
```

Install Locally:

```
npm install env-strict
```

Use directly with npx:

```
npx env-strict
```

## Setup

Create a configuration file in your project root:

```
env-strict.config.js
```

Example:

```
export default {

    required: [
        "DATABASE_URL",
        "JWT_SECRET"
    ],

    optional: [
        "PORT",
        "REDIS_URL"
    ]
}
```

Your project Structure:

```
my-project/
├── src/
├── .env
├── env-strict.config.js
├── package.json
└── node_modules/
```

Example .env:

```
DATABASE_URL=my_database_url
JWT_SECRET=my_secret
PORT=5000
```

## Usage

- _Check Environment Variables_ \
  Run:

```
env-strict check
```

Example Output:

```
🛡 env-strict

Checking environment...

✔ DATABASE_URL
✔ JWT_SECRET

✔ Environment validation passed
```

- _Generate .env.example_ \
  Generate a template file from your .env:

```
env-strict init
```

Example: \
Before:

```
DATABASE_URL=my_database
JWT_SECRET=my_secret
```

After:

```
DATABASE_URL=
JWT_SECRET=
```

- Force Regenerate \
  If .env.example already exists:

```
env-strict init
```

will not _overwrite_ it.

To _OverWrite_ :

```
env-strict init --force
```

Output:

```
✔ .env.example regenerated
```

- _JSON_ Output \
  Useful for CI/CD pipelines

```
env-strict check --json
```

Example :

```
{
  "success": true,
  "missing": [],
  "present": [
    "DATABASE_URL",
    "JWT_SECRET"
  ]
}
```

## Github Actions

Create:

_.github/workflows/env-check.yml_

Add :

```
name: Environment Check


on:

  push:

  pull_request:


jobs:

  check-env:

    runs-on: ubuntu-latest


    steps:

      - name: Checkout repository
        uses: actions/checkout@v4


      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22


      - name: Install dependencies
        run: npm install


      - name: Validate environment
        run: npx env-strict check
```

_Now every push and pull request validates your environment automatically._

## Commands

| Command                   | Description                    |
| ------------------------- | ------------------------------ |
| `env-strict check`        | Validate environment variables |
| `env-strict check --json` | Output JSON result             |
| `env-strict init`         | Generate .env.example          |
| `env-strict init --force` | Regenerate .env.example        |

## Development

Clone Repository :

```
git clone https://github.com/Aayush-0821/env-strict.git
```

Install Dependencies:

```
npm install
```

Build:

```
npm run build
```

Run Tests:

```
npm test
```

## License

MIT License
