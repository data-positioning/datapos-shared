/**
 * Development utilities.
 */

// Dependencies - Vendor.
import chalk from 'chalk';
import { promises as fs } from 'fs';
import type { PackageJson } from 'type-fest';

// Dependencies - Framework.
import { CONNECTOR_DESTINATION_OPERATIONS, CONNECTOR_SOURCE_OPERATIONS } from '@/module';
import type { ConnectorModuleConfig, ConnectorModuleOperation, ConnectorModuleUsageId } from '@/module';
import type { ContextModuleConfig, ContextModuleOperation } from '@/module';
import type { InformerModuleConfig, InformerModuleOperation } from '@/module';
import type { PresenterModuleConfig, PresenterModuleOperation } from '@/module';

// Utilities - Build connector configuration.
export async function buildConnectorConfig() {
    try {
        console.log('🚀 Building connector configuration...');
        const packageJSON = (await JSON.parse(await fs.readFile('package.json', 'utf8'))) as PackageJson;
        const configJSON = (await JSON.parse(await fs.readFile('config.json', 'utf8'))) as ConnectorModuleConfig;
        const indexCode = await fs.readFile('src/index.ts', 'utf8');

        let destinationOperations = false;
        let sourceOperations = false;
        const regex = /^\s{4}(?:async\s+)?(private\s+)?(?:public\s+|protected\s+)?([A-Za-z_]\w*)\s*\(/gm;
        const operations = [...indexCode.matchAll(regex)]
            .filter((m) => !m[1] && m[2] !== 'constructor') // m[1] is 'private ' if present.
            .map((m) => {
                const operation = m[2] as ConnectorModuleOperation;
                destinationOperations = destinationOperations || CONNECTOR_DESTINATION_OPERATIONS.includes(operation);
                sourceOperations = sourceOperations || CONNECTOR_SOURCE_OPERATIONS.includes(operation);
                return operation;
            });
        if (operations.length > 0) console.log(`ℹ️ Implements ${operations.length} operations.`);
        else console.log('⚠️ Implements no operations.');
        const usageId: ConnectorModuleUsageId | null =
            sourceOperations && destinationOperations ? 'bidirectional' : sourceOperations ? 'source' : destinationOperations ? 'destination' : null;
        if (usageId) console.log(`ℹ️ Supports ${usageId} usage.`);
        else console.log('⚠️ No usage identified.');

        if (packageJSON.name) configJSON.id = packageJSON.name;
        configJSON.operations = operations;
        configJSON.usageId = usageId;
        if (packageJSON.version) configJSON.version = packageJSON.version;

        await fs.writeFile('config.json', JSON.stringify(configJSON, undefined, 4), 'utf8');
        console.log('✅ Connector configuration built.');
        console.log(chalk.blue.bold('ℹ️ '), chalk.blue('Info: Process started.'));
        console.log(chalk.yellow.bold('⚠️ '), chalk.yellow('Warning: Low disk space.'));
        console.log(chalk.red.bold('❌ '), chalk.red('Error: Connection failed.'));
        console.log(chalk.green.bold('✅ '), chalk.green('Success: Operation complete.'));
    } catch (error) {
        console.warn('❌ Error building connector configuration.', error);
    }
}

// Utilities - Build context configuration.
export async function buildContextConfig() {
    try {
        console.log('🚀 Building context configuration...');
        const packageJSON = (await JSON.parse(await fs.readFile('package.json', 'utf8'))) as PackageJson;
        const configJSON = (await JSON.parse(await fs.readFile('config.json', 'utf8'))) as ContextModuleConfig;
        const indexCode = await fs.readFile('src/index.ts', 'utf8');

        const regex = /^\s{4}(?:async\s+)?(private\s+)?(?:public\s+|protected\s+)?([A-Za-z_]\w*)\s*\(/gm;
        const operations = [...indexCode.matchAll(regex)]
            .filter((m) => !m[1] && m[2] !== 'constructor') // m[1] is 'private ' if present.
            .map((m) => m[2]) as ContextModuleOperation[];

        if (packageJSON.name) configJSON.id = packageJSON.name;
        configJSON.operations = operations;
        if (packageJSON.version) configJSON.version = packageJSON.version;

        await fs.writeFile('config.json', JSON.stringify(configJSON, undefined, 4), 'utf8');
    } catch (error) {
        console.warn('❌ Error building context configuration.', error);
    }
}

// Utilities - Build informer configuration.
export async function buildInformerConfig() {
    try {
        console.log('🚀 Building informer configuration...');
        const packageJSON = (await JSON.parse(await fs.readFile('package.json', 'utf8'))) as PackageJson;
        const configJSON = (await JSON.parse(await fs.readFile('config.json', 'utf8'))) as InformerModuleConfig;
        const indexCode = await fs.readFile('src/index.ts', 'utf8');

        const regex = /^\s{4}(?:async\s+)?(private\s+)?(?:public\s+|protected\s+)?([A-Za-z_]\w*)\s*\(/gm;
        const operations = [...indexCode.matchAll(regex)]
            .filter((m) => !m[1] && m[2] !== 'constructor') // m[1] is 'private ' if present.
            .map((m) => m[2]) as InformerModuleOperation[];

        if (packageJSON.name) configJSON.id = packageJSON.name;
        configJSON.operations = operations;
        if (packageJSON.version) configJSON.version = packageJSON.version;

        await fs.writeFile('config.json', JSON.stringify(configJSON, undefined, 4), 'utf8');
    } catch (error) {
        console.warn('❌ Error building informer configuration.', error);
    }
}

// Utilities - Build presenter configuration.
export async function buildPresenterConfig() {
    try {
        console.log('🚀 Building presenter configuration...');
        const packageJSON = (await JSON.parse(await fs.readFile('package.json', 'utf8'))) as PackageJson;
        const configJSON = (await JSON.parse(await fs.readFile('config.json', 'utf8'))) as PresenterModuleConfig;
        const indexCode = await fs.readFile('src/index.ts', 'utf8');

        const regex = /^\s{4}(?:async\s+)?(private\s+)?(?:public\s+|protected\s+)?([A-Za-z_]\w*)\s*\(/gm;
        const operations = [...indexCode.matchAll(regex)]
            .filter((m) => !m[1] && m[2] !== 'constructor') // m[1] is 'private ' if present.
            .map((m) => m[2]) as PresenterModuleOperation[];

        if (packageJSON.name) configJSON.id = packageJSON.name;
        configJSON.operations = operations;
        if (packageJSON.version) configJSON.version = packageJSON.version;

        await fs.writeFile('config.json', JSON.stringify(configJSON, undefined, 4), 'utf8');
    } catch (error) {
        console.warn('❌ Error building context configuration.', error);
    }
}

// Utilities - Bump version.
export async function bumpVersion() {
    try {
        console.log('🚀 Bumping version...');
        const packageJSON = (await JSON.parse(await fs.readFile('package.json', 'utf8'))) as PackageJson;
        if (packageJSON.version) {
            const oldVersion = packageJSON.version;
            const versionSegments = packageJSON.version.split('.');
            packageJSON.version = `${versionSegments[0]}.${versionSegments[1]}.${Number(versionSegments[2]) + 1}`;
            await fs.writeFile('package.json', JSON.stringify(packageJSON, undefined, 4), 'utf8');
            console.log(`✅ Version bumped from ${oldVersion} to ${packageJSON.version}.`);
        } else {
            packageJSON.version = '0.0.001';
            await fs.writeFile('package.json', JSON.stringify(packageJSON, undefined, 4), 'utf8');
            console.log(`⚠️ Version initialised to ${packageJSON.version}.`);
        }
    } catch (error) {
        console.warn('❌ Error bumping package version.', error);
    }
}
