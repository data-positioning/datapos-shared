# Datapos - Share - Core

A TypeScript library of core declarations and utilities shared between Datapos applications and plugin components.

...

## Installation

```
npm install --save-dev @datapos-share-core
```

## Component Configuration Declarations

The following diagram illustrates the component configuration class hierarchy, showcasing the relationships and inheritance structure between different **Component Configuration** classes.

## Component Instance Declarations

The following diagram illustrates the component class hierarchy, showcasing the relationships and inheritance structure between different **Component** classes.

## Connector Configuration Declarations

The following diagram illustrates the connector class hierarchies, showcasing the relationships and inheritance structure between different **Connector Configuration** classes and detailing referenced enumeration types.

## Data Connector Instance Declarations

The following diagram illustrates the connector class hierarchies, showcasing the relationships and inheritance structure between different **Data Connector** classes and detailing referenced enumeration types.

## Node Connector Instance Declarations

The following diagram illustrates the connector class hierarchies, showcasing the relationships and inheritance structure between different **Node Connector** classes and detailing referenced enumeration types.

## Connection Declarations

The following diagram illustrates the connection class hierarchy, showcasing the relationships and inheritance structure between different **Connection** classes and detailing referenced enumeration types.

## Connection Entry Declarations

The following diagram illustrates the connection entry class hierarchy, showcasing the relationships and inheritance structure between different **Connection Entry** classes and detailing referenced enumeration types.

## Context Model Declarations

...

## Dimension Declarations

...

## Entity Declarations

...

## Event Query Declarations

...

## Source View Declarations

...

## Usage Kit Declarations

...

## View Template Declarations

...

## Other Declarations

...

## Utilities

### Conversion

-   convertODataTypeToDataType

### Extraction

-   extractDirectoryPathFromEntryPath
-   extractExtensionFromEntryPath
-   extractLastFolderNameFromFolderPath

### Formatting

-   formatNumberAsDecimalNumber
-   formatNumberAsStorageSize
-   formatNumberAsWholeNumber

### Lookup

-   lookupMimeTypeForFileExtension

### Security

-   establishVendorAccessToken

## Repository Management Commands

The following list details the repository management commands implementation by this project. For more details, please refer to the scripts section of the 'package.json' file in this project.

| Name               | Key Code         | Notes                                                                                                                                                                                                       |
| ------------------ | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| audit              | alt+ctrl+shift+a | Audit the project's dependencies for known security vulnerabilities.                                                                                                                                        |
| build              | alt+ctrl+shift+b | Build the package using Vite build.                                                                                                                                                                         |
| check              | alt+ctrl+shift+c | List the dependencies in the project that are outdated.                                                                                                                                                     |
| document           | alt+ctrl+shift+d | Identify the licenses of the project's dependencies.                                                                                                                                                        |
| format             | alt+ctrl+shift+f | NOT implemented.                                                                                                                                                                                            |
| lint               | alt+ctrl+shift+l | Check the code for potential errors and enforces coding styles.                                                                                                                                             |
| publishToNPM       | alt+ctrl+shift+n | Publishes the package to the [npm](https://www.npmjs.com/) registry. This action will publish the last synchronised version. Use the command line command 'npm publish' when publishing for the first time. |
| release            | alt+ctrl+shift+r | Synchronise the local repository with the main GitHub repository and publish the package to the [npm](https://www.npmjs.com/) registry.                                                                     |
| syncWithGitHub     | alt+ctrl+shift+s | Synchronise the local repository with the main GitHub repository.                                                                                                                                           |
| test               | alt+ctrl+shift+l | NOT implemented.                                                                                                                                                                                            |
| updateDependencies | alt+ctrl+shift+l | Install the latest version of outdated Data Position package dependencies.                                                                                                                                  |
