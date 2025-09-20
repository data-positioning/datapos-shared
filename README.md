# Data Positioning Shared Library

[![npm version](https://img.shields.io/npm/v/@datapos/datapos-shared.svg)](https://www.npmjs.com/package/@datapos/datapos-shared)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](#)

A TypeScript library containing common declarations and utilities used across other Data Positioning repositories.

## Installation

Install as a development (dev) dependency:

```bash
npm install --save-dev @datapos/datapos-shared
```

## Usage

Import the library in your TypeScript project:

```ts
import { type ConnectorConfig, getComponentStatus } from '@datapos/datapos-shared';

// Example type usage.
let connectorConfig: ConnectorConfig;

// Example function usage.
getComponentStatus('alpha');
```

## Repository Management Commands

The table below lists the repository management commands available in this project.
For detailed implementation, see the `scripts` section in `package.json`.

| Name               | Key Code         | Notes                                                                                                      |
| ------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| audit              | alt+ctrl+shift+a | Audit the project's dependencies for known security vulnerabilities.                                       |
| build              | alt+ctrl+shift+b | Build the package using Vite.                                                                              |
| check              | alt+ctrl+shift+c | List outdated dependencies.                                                                                |
| document           | alt+ctrl+shift+d | Identify licenses of the project's production and peer dependencies. See [LICENSES.json](./LICENSES.json). |
| format             | alt+ctrl+shift+f | Enforce formatting style rules.                                                                            |
| lint               | alt+ctrl+shift+l | Check the code for errors and enforce coding style rules.                                                  |
| release            | alt+ctrl+shift+r | Bump version, synchronise local repository with the main GitHub repository, build and publish to npm.      |
| syncWithGitHub     | alt+ctrl+shift+s | Bump version and synchronise local repository with the main GitHub repository.                             |
| test               | alt+ctrl+shift+t | NOT implemented.                                                                                           |
| updateDependencies | alt+ctrl+shift+u | Install the latest version of outdated Data Positioning packages.                                          |

## Compliance

This badge reflects FOSSA's assessment of this repository's open-source license compliance.

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fdata-positioning%2Fdatapos-shared.svg?type=large&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2Fdata-positioning%2Fdatapos-shared?ref=badge_large&issueType=license)

## License

[MIT](./LICENSE) © 2026 Data Positioning Pty Ltd
