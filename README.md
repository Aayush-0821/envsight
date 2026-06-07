# 🛡 envsight

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
npm install -g envsight
```

Install Locally:

```
npm install envsight
```

Use directly with npx:

```
npx envsight
```

## Setup

Create a configuration file in your project root:

```
envsight.config.js
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
├── envsight.config.js
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
envsight check
```

Example Output:

```
🛡 envsight

Checking environment...

✔ DATABASE_URL
✔ JWT_SECRET

✔ Environment validation passed
```

- _Generate .env.example_ \
  Generate a template file from your .env:

```
envsight init
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
envsight init
```

will not _overwrite_ it.

To _OverWrite_ :

```
envsight init --force
```

Output:

```
✔ .env.example regenerated
```

- _JSON_ Output \
  Useful for CI/CD pipelines

```
envsight check --json
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
        run: npx envsight check
```

_Now every push and pull request validates your environment automatically._

## Commands

| Command                 | Description                    |
| ----------------------- | ------------------------------ |
| `envsight check`        | Validate environment variables |
| `envsight check --json` | Output JSON result             |
| `envsight init`         | Generate .env.example          |
| `envsight init --force` | Regenerate .env.example        |

## Development

Clone Repository :

```
git clone https://github.com/Aayush-0821/envsight.git
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
