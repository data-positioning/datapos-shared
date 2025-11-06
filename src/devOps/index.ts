/**
 * Build connector configuration.
 */

// Dependencies - Vendor.
import { promises as fs } from 'fs';

// Dependencies - Framework.
import type { ConnectorModuleConfig } from '@/module';

// Operations - Build connector configuration.
export async function buildConnectorConfig() {
    try {
        const configJSON = (await JSON.parse(await fs.readFile('config.json', 'utf8'))) as ConnectorModuleConfig;
        const packageJSON = await JSON.parse(await fs.readFile('package.json', 'utf8'));
        await fs.writeFile('configNEW.json', JSON.stringify({ ...configJSON, id: packageJSON.name, version: packageJSON.version }, undefined, 4));
    } catch (error) {
        console.warn('Error building connector configuration.', error);
    }
}
