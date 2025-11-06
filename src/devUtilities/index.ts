/**
 * Development utilities.
 */

// Dependencies - Vendor.
import type { PackageJson } from 'type-fest';
import { promises as fs } from 'fs';

// Dependencies - Framework.
import {
    CONNECTOR_DESTINATION_OPERATIONS,
    CONNECTOR_SOURCE_OPERATIONS,
    type ConnectorModuleConfig,
    type ConnectorModuleOperation,
    type ConnectorModuleUsageId,
    type ContextModuleConfig,
    type ContextModuleOperation
} from '@/module';

// Utilities - Build connector configuration.
export async function buildConnectorConfig() {
    try {
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
        const usageId = sourceOperations && destinationOperations ? 'bidirectional' : sourceOperations ? 'source' : destinationOperations ? 'destination' : undefined;

        if (packageJSON.name) configJSON.id = packageJSON.name;
        configJSON.operations = operations;
        if (usageId) configJSON.usageId = usageId;
        if (packageJSON.version) configJSON.version = packageJSON.version;

        await fs.writeFile('config.json', JSON.stringify(configJSON, undefined, 4), 'utf8');
    } catch (error) {
        console.warn('Error building connector configuration.', error);
    }
}

// Utilities - Build context configuration.
export async function buildContextConfig() {
    try {
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
        console.warn('Error building connector configuration.', error);
    }
}
