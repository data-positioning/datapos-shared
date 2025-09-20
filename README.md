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

> ⚠️ This library is intended for TypeScript projects.

## Repository Management Commands

The table below lists the repository management commands available in this project.
For detailed implementation, see the `scripts` section in `package.json`.

| Name               | Key Code         | Notes                                                                                                                                                                   |
| ------------------ | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| audit              | alt+ctrl+shift+a | Audit the project's dependencies for known security vulnerabilities.                                                                                                    |
| build              | alt+ctrl+shift+b | Build the package using Vite.                                                                                                                                           |
| check              | alt+ctrl+shift+c | List outdated dependencies.                                                                                                                                             |
| document           | alt+ctrl+shift+d | Identify licenses of the project's production and peer dependencies.                                                                                                    |
| format             | alt+ctrl+shift+f | NOT implemented.                                                                                                                                                        |
| lint               | alt+ctrl+shift+l | Check the code for errors and enforce coding style rules.                                                                                                               |
| publishToNPM       | alt+ctrl+shift+n | Publishes the package to the [npm](https://www.npmjs.com/) registry. This action will publish the last synchronised version. For first-time publish, use `npm publish`. |
| release            | alt+ctrl+shift+r | Synchronise local repository with the main GitHub repository and publish to [npm](https://www.npmjs.com/).                                                              |
| syncWithGitHub     | alt+ctrl+shift+s | Synchronise local repository with the main GitHub repository.                                                                                                           |
| test               | alt+ctrl+shift+l | NOT implemented.                                                                                                                                                        |
| updateDependencies | alt+ctrl+shift+l | Install the latest version of outdated Data Positioning packages.                                                                                                       |
|                    |

## License

[MIT](./LICENSE) © 2026 Data Positioning Pty Ltd
