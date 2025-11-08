# Data Positioning Shared Library

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

### Modules

The Data Positioning solution consists of the following modules. All modules, except `App`, extend the base type `Module`.

| Type      | Dynamic | Notes                                                           |
| --------- | :-----: | --------------------------------------------------------------- |
| App       |         | Implements the Data Positioning web application.                |
| Engine    |   ✔    | Implements the data positioning engine.                         |
| Connector |   ✔    | Implements a connector which supports one or more connections.  |
| Context   |   ✔    | Implements a context which defines one or more models.          |
| Informer  |   ✔    | Implements an informer which renders one or more documents.     |
| Presenter |   ✔    | Implements a presenter which renders one or more presentations. |

The modules implement the following components. All components extend the base type `Component`.

| Module Type | Component Type                    |
| ----------- | --------------------------------- |
| Connector   | connector                         |
|             | connectorConnection               |
| Context     | context                           |
|             | contextModelGroup                 |
|             | contextModel                      |
|             | contextModelDimensionGroup        |
|             | contextModelDimension             |
|             | contextModelDimensionHierarchy    |
|             | contextModelEntityGroup           |
|             | contextModelEntity                |
|             | contextModelEntityDataItem        |
|             | contextModelEntityEvent           |
|             | contextModelEntityPrimaryMeasure  |
|             | contextModelSecondaryMeasureGroup |
|             | contextModelSecondaryMeasure      |
|             | dataView                          |
|             | dimension                         |
|             | eventQuery                        |
| Presenter   | presenter                         |
|             | presenterPresentation             |
| Informer    | informer                          |
|             | informerDocument                  |

### Base Components

| Item                                  | Notes                                                        |
| ------------------------------------- | ------------------------------------------------------------ |
| [Component Types](./src/component.ts) | The Component type serves as a base type for all components. |
| ComponentRef                          |                                                              |
| ComponentStatus                       |                                                              |
| ComponentStatusId                     |                                                              |
| ComponentTypeId                       |                                                              |
| StatusColorId                         |                                                              |

### Engine Module Components

| Item | Notes |
| ---- | ----- |
|      |       |

### Connector Module Components

| Item                                    | Notes                                                             |
| --------------------------------------- | ----------------------------------------------------------------- |
| [Connector Types](./src/connector.ts)   | Connector types. The Connector type extends the Component type.   |
| [Connection Types](./src/connection.ts) | Connection types. The Connection type extends the Component type. |

### Context Module Components

| Item                                        | Notes                                                                 |
| ------------------------------------------- | --------------------------------------------------------------------- |
| [Context Types](./src/context.ts)           | Context types. The Context type extends the Component type.           |
| [Data View Types](./src/dataView.ts)        | DataView types. The DataView type extends the Component type.         |
| [Dimension Types](./src/dimension.ts)       | Dimension types. The Dimension type extends the Component type.       |
| [Engine Types](./src/dimension.ts)          | Engine types.                                                         |
| [Event Query Types](./src/eventQuery.ts)    | Event Query types. The Event Query type extends the Component type.   |
| [Presenter Types](./src/presenter.ts)       | Presenter types. The Presenter type extends the Component type.       |
| [Presentation Types](./src/presentation.ts) | Presentation types. The Presentation type extends the Component type. |
| [Informer Types](./src/informer.ts)         | Informer types. The Informer type extends the Component type.         |
| [Recipe Types](./src/recipe.ts)             | Recipe types. The Recipe type extends the Component type.             |

### Informer Module Components

| Item | Notes |
| ---- | ----- |
|      |       |

### Presenter Module Components

| Item | Notes |
| ---- | ----- |
|      |       |

## Usage

Import the library in your TypeScript project:

```ts
import { type ConnectorConfig, getComponentStatus } from '@datapos/datapos-shared';

// Example type usage.
let connectorConfig: ConnectorConfig;

// Example function usage.
getComponentStatus('alpha');
```

## Repository Common Management Commands

The table below lists the repository management commands available in this project.
For detailed implementation, see the `scripts` section in the `package.json` file.

| Name               | Key Code         | Notes                                                                                                      |
| ------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| audit              | alt+ctrl+shift+a | Audit the project's dependencies for known security vulnerabilities.                                       |
| build              | alt+ctrl+shift+b | Build the package using Vite.                                                                              |
| bump:version       | alt+ctrl+shift+v | Increment patch version number.                                                                            |
| check              | alt+ctrl+shift+c | List outdated dependencies and run retire scanner.                                                         |
| document           | alt+ctrl+shift+d | Identify licenses of the project's production and peer dependencies. See [LICENSES.json](./LICENSES.json). |
| format             | alt+ctrl+shift+f | Enforce formatting style rules.                                                                            |
| lint               | alt+ctrl+shift+l | Check the code for errors and enforce coding style rules.                                                  |
| publish:toNPM      | alt+ctrl+shift+p | Publish the package to npm.                                                                                |
| release            | alt+ctrl+shift+r | Bump version, synchronise local repository with the main GitHub repository, build and publish to npm.      |
| send:deployNotice  | alt+ctrl+shift+n | ❌ Not implemented.                                                                                        |
| sync:withGitHub    | alt+ctrl+shift+s | Bump version and synchronise local repository with the main GitHub repository.                             |
| test               | alt+ctrl+shift+t | ❌ Not implemented.                                                                                        |
| update:dataPosDeps | alt+ctrl+shift+l | Install the latest version of all Data Positioning dependencies.                                           |

## Compliance

The following badge reflects FOSSA's assessment of this repository's open-source license compliance.

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fdata-positioning%2Fdatapos-shared.svg?type=large&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2Fdata-positioning%2Fdatapos-shared?ref=badge_large&issueType=license)

## License

[MIT](./LICENSE) © 2026 Data Positioning Pty Ltd
