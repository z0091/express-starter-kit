# express-starter-kit

## Overview

## Requirements

- Mac OS X, Linux, or Windows
- [Node.js](https://nodejs.org/) v6.9 or newer
- `npm` v3.10 or newer (included with `Node.js`)

## Quick Start

#### 1. Install dependencies

Clone the repo, then `cd` to the destination directory and run:

```
npm i
```

This should install all project's dependencies from `package.json` for you. We're using `yarn` package manager because it has more deterministic algorithm than `npm`, so it guarantees that everyone has the exact same version of each dependency. Also, it's faster. Read more on [switching to yarn from npm](https://yarnpkg.com/lang/en/docs/migrating-from-npm/).

#### 2. Add configuration file

Create a `local.conf.json` file inside project's root folder, and copy the following:

```json
{
  "app": {
    "apiPrefix": "/api",
  },
  "server": {
    "apiPrefix": "",
  }
}
```

Please refer to the `config/default.conf.js` file for the full list of configuration options. Use your `local.conf.json` file to override any default option. This is powered by [nconf](https://github.com/indexzero/nconf).

#### 3. Start development server

```
npm start
```

This command starts a development server (at http://localhost:9987/ by default). The server is powered by `Express.js` and [webpack dev middleware](https://github.com/webpack/webpack-dev-middleware). It takes source files from `src/`, runs them through `Babel`, bundles and serves them. In development mode all compiled files are stored in RAM.

Please note, that Hot Module Replacement is disabled by default, but you might enable it by adding `"hotWebpack": true` line to your `local.conf.json` file or by starting your development server with the corresponding flag, like this:

```
npm start -- --hotWebpack
```

#### 4. Run tests and lint checks

First, ensure that your code passes lint checks:

```
npm run lint
```

This command is powered by `eslint`. We mostly rely on the [config used by aribnb](https://github.com/airbnb/javascript), but have a few minor changes (see our `.eslintrc` for that). Also, our tests and development tools use slightly different configurations as well, but mostly follow our root configuration.

Then, run unit tests with this command:

```
npm run test
```

Tests are powered by [Mocha](https://mochajs.org/) and [Karma](https://karma-runner.github.io/). All unit tests are expected to pass.

#### 5. Build

```
npm run build
```

This command will compile, bundle and minify project's files, and put them into `dist/` folder along with the static assets (fonts and images). The contents of the `dist/` folder are ready to be deployed to the production server.

## Directory layout

```
assets/       - static assets like images and fonts
src/          - application source files
test/         - unit tests
tools/        - everything related to development: server, configs, etc.
```

### Security vulnerabilities monitoring
##### Node security platform integration
`nsp check` (subtask of `grunt default`) task checks `npm-shrinkwrap.json` for known vulnerabilities.
If build fails because of `nsp check` fail then use link in logs to investigate the problem.
```
(+) 1 vulnerabilities found
┌───────────────┬───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│               │ Regular Expression Denial of Service                                                                                                                                      │
├───────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Name          │ ms                                                                                                                                                                        │
├───────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ CVSS          │ 5.3 (Medium)                                                                                                                                                              │
├───────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Installed     │ 0.1.0                                                                                                                                                                     │
├───────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Vulnerable    │ <=0.7.0                                                                                                                                                                   │
├───────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Patched       │ >0.7.0                                                                                                                                                                    │
├───────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Path          │ mongoose@4.0.6 > ms@0.1.0                                                                                                                              │
├───────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ More Info     │ https://nodesecurity.io/advisories/46                                                                                                                                     │
└───────────────┴───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```
In most trivial cases you will just need update dependency to new version which contains fix.
So you will see a link like in example above https://nodesecurity.io/advisories/46.
Follow it for details.
It says that you need to update mongoose to new version which contains fix.

If an issue can't be fixed quickly you can disable it by adding
exception in `.nsprc` file in project dir.
```
{
  "exceptions": ["https://nodesecurity.io/advisories/130"]
}
```
In that case create issue to remove exception and fix security issue.

##### Snyk integration
https://snyk.io/
Snyk tests is similar to nsp but it uses its own database and
it is better in finding issues in dependency tree.
If you see errors in logs follow instructions to fix issues.

If an issue can't be fixed quickly you can disable it by adding
exception in `.snyk` file in project dir.
Use snyk CLI to add ignore entry:
```snyk ignore --id=npm:tough-cookie:20160722 --reason="Issue is not severe. Update is not available yet"```
