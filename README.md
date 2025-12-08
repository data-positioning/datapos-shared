# Data Positioning Shared Library

<span><!-- OWASP_BADGES_START -->[![OWASP](https://img.shields.io/badge/OWASP-passed-4CAF50)](https://data-positioning.github.io/datapos-shared/dependency-check-reports/dependency-check-report.html)<!-- OWASP_BADGES_END --></span>
[![npm version](https://img.shields.io/npm/v/@datapos/datapos-shared.svg)](https://www.npmjs.com/package/@datapos/datapos-shared)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

A TypeScript library containing common declarations and utilities used across other Data Positioning repositories.

## Requirements

Ensure your environment meets the following prerequisites before using this library:

- **Node.js** version `>=22.0.0`,
- **npm** version `>=11.0.0`,
- A Unix-like shell (for command shortcuts, e.g., `bash`, `zsh`, or Git Bash on Windows),
- Access to the [npm registry](https://www.npmjs.com/) and [GitHub](https://github.com/) for publishing and syncing.

## Installation

Install as a production dependency:

```bash
npm install @datapos/datapos-shared
```

Create `.npmrc` with access token. Access token needs to disable 2FA and allow all access.

```ini
registry=https://registry.npmjs.org/
//registry.npmjs.org/:_authToken=<ACCESS TOKEN>
```

## Declarations

This package provides constants, errors, types/interfaces and utilities used by Data Positioning modules.

### Modules

The Data Positioning solution consists of the following modules. All modules, except `App`, extend the base type `Module`.

| Type      | Dynamic | Notes                                                           |
| --------- | :-----: | --------------------------------------------------------------- |
| App       |         | Implements the data positioning web application.                |
| Engine    |    ✔    | Implements the data positioning engine.                         |
| Connector |    ✔    | Implements a connector which handles one or more connections.   |
| Context   |    ✔    | Implements a context which defines one or more models.          |
| Presenter |    ✔    | Implements a presenter which renders one or more presentations. |
| Tool      |    ✔    | Implements...                                                   |

### Components

Each module implements a set of components. All module component types extend the base component types.

| Types                           | Notes                                                        |
| ------------------------------- | ------------------------------------------------------------ |
| [Component](./src/component.ts) | The Component type serves as a base type for all components. |
| ComponentRef                    |                                                              |
| ComponentStatus                 |                                                              |
| ComponentStatusId               |                                                              |
| ComponentTypeId                 |                                                              |
| StatusColorId                   |                                                              |

#### Connector Module Components

| Item                                    | Notes                                                             |
| --------------------------------------- | ----------------------------------------------------------------- |
| [Connector Types](./src/connector.ts)   | Connector types. The Connector type extends the Component type.   |
| [Connection Types](./src/connection.ts) | Connection types. The Connection type extends the Component type. |

#### Context Module Components

| Item                                     | Notes                                                               |
| ---------------------------------------- | ------------------------------------------------------------------- |
| [Context Types](./src/context.ts)        | Context types. The Context type extends the Component type.         |
| [Data View Types](./src/dataView.ts)     | DataView types. The DataView type extends the Component type.       |
| [Dimension Types](./src/dimension.ts)    | Dimension types. The Dimension type extends the Component type.     |
| [Engine Types](./src/dimension.ts)       | Engine types.                                                       |
| [Event Query Types](./src/eventQuery.ts) | Event Query types. The Event Query type extends the Component type. |

#### Engine Module Components

| Item                               | Notes         |
| ---------------------------------- | ------------- |
| [Engine Types](./src/dimension.ts) | Engine types. |

#### Presenter Module Components

| Item                                        | Notes                                                                 |
| ------------------------------------------- | --------------------------------------------------------------------- |
| [Presenter Types](./src/presenter.ts)       | Presenter types. The Presenter type extends the Component type.       |
| [Presentation Types](./src/presentation.ts) | Presentation types. The Presentation type extends the Component type. |

### Composables

### Constants

### Errors

### Utilities

## Usage

Import the library in your TypeScript project:

```ts
import { type ConnectorConfig, getComponentStatus } from '@datapos/datapos-shared';

// Example type usage.
let connectorConfig: ConnectorConfig;

// Example function usage.
getComponentStatus('alpha');
```

## Reports & Compliance

### Dependency Check Report

The OWASP Dependency Check Report identifies known vulnerabilities in project dependencies. It is generated automatically on each release using the npm package [owasp-dependency-check](https://dependency-check.github.io/DependencyCheck/index.html). We also rely on GitHub Dependabot to continuously check for vulnerabilities across all dependencies.

[View the OWASP Dependency Check Report](https://data-positioning.github.io/datapos-shared/dependency-check-report.html)

### Dependency Licenses

The following table lists top-level production and peer dependencies. All these dependencies (including transitive ones) have been recursively verified to use Apache-2.0, BSD-2-Clause, CC0-1.0, or MIT—commercially friendly licenses with minimal restrictions. Developers cloning this repository should independently verify dev and optional dependencies; users of the uploaded library are covered by these checks. We do not include unlicensed dependencies. Used to support development activity and not released as part of the production release. Check if you clone. We use the `npm` packages [license-report](https://www.npmjs.com/package/license-report), [license-report-check](https://www.npmjs.com/package/license-report-check) and [license-report-recursive](https://www.npmjs.com/package/license-report-recursive) to identify dependency licenses.

<!-- DEPENDENCY_LICENSES_START -->
| Name      | Type | Installed | Latest | Latest Modified          |
| :-------- | :--: | :-------: | :----: | :----------------------- |
| csv-parse | MIT  |   6.1.0   | 6.1.0  | 2025-07-16T18:42:21.126Z |
| date-fns  | MIT  |   4.1.0   | 4.1.0  | 2025-08-03T13:10:27.925Z |
| nanoid    | MIT  |   5.1.6   | 5.1.6  | 2025-09-22T09:45:52.899Z |
<!-- DEPENDENCY_LICENSES_END -->

**Installed dependencies are kept up-to-date with latest releases.**

### Bundle Analysis Report

The Bundle Analysis Report provides a detailed breakdown of the bundle's composition and module sizes, helping to identify which modules contribute most to the final build. It is generated automatically on each release using the npm package `rollup-plugin-visualizer`.

[View the Bundle Analysis Report](https://data-positioning.github.io/datapos-shared/stats.html)

## Repository Common Management Commands

The table below lists the repository management commands available in this project.
For detailed implementation, see the `scripts` section in the `package.json` file.

| Name               | Key Code         | Notes                                                                                                                                           |
| ------------------ | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| audit              | alt+ctrl+shift+a | Audit the project's dependencies for known security vulnerabilities.                                                                            |
| build              | alt+ctrl+shift+b | Build the package using Vite. Output to '/dist' directory.                                                                                      |
| bump:version       | alt+ctrl+shift+v | Increment patch version number by 1.                                                                                                            |
| check              | alt+ctrl+shift+c | Identify outdated dependencies using npm `outdated` and `npm-check-updates` with option to install latest versions. Also runs `retire` scanner. |
| document           | alt+ctrl+shift+d | Identify licenses of the project's production and peer dependencies. See [LICENSES.json](./LICENSES.json).                                      |
| format             | alt+ctrl+shift+f | Use `prettier`to enforce formatting style rules.                                                                                                |
| lint               | alt+ctrl+shift+l | Use `eslint`to check the code for potential errors and enforces coding style rules.                                                             |
| publish:toNPM      | alt+ctrl+shift+p | Publish the package to npm.                                                                                                                     |
| release            | alt+ctrl+shift+r | Bump version, build library, synchronise with `GitHub` and publish to `npm`.                                                                    |
| send:deployNotice  | alt+ctrl+shift+n | ❌ Not implemented.                                                                                                                             |
| sync:withGitHub    | alt+ctrl+shift+s | Synchronise local repository with the main GitHub repository.                                                                                   |
| test               | alt+ctrl+shift+t | ❌ Not implemented.                                                                                                                             |
| update:dataPosDeps | alt+ctrl+shift+u | Install the latest version of all Data Positioning dependencies.                                                                                |

## Compliance

The following badge reflects FOSSA's assessment of this repository's open-source license compliance.

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fdata-positioning%2Fdatapos-shared.svg?type=large&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2Fdata-positioning%2Fdatapos-shared?ref=badge_large&issueType=license)

## License

[MIT](./LICENSE) © 2026 Data Positioning Pty Ltd
