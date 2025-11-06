/**
 * Development utilities.
 */

// Dependencies - Vendor.
import type { PackageJson } from 'type-fest';
import { promises as fs } from 'fs';

// Dependencies - Framework.
import type { ConnectorModuleConfig } from '@/module';

// Operations - Build connector configuration.
export async function buildConnectorConfig() {
    try {
        const packageJSON = (await JSON.parse(await fs.readFile('package.json', 'utf8'))) as PackageJson;
        const configJSON = (await JSON.parse(await fs.readFile('config.json', 'utf8'))) as ConnectorModuleConfig;
        const indexCode = await fs.readFile('src/index.ts', 'utf8');

        const regex = /^\s{4}(?:async\s+)?(private\s+)?(?:public\s+|protected\s+)?([A-Za-z_]\w*)\s*\(/gm;
        const interfaces = [...indexCode.matchAll(regex)]
            .filter((m) => !m[1] && m[2] !== 'constructor') // m[1] is 'private ' if present.
            .map((m) => m[2]);

        await fs.writeFile('configNEW.json', JSON.stringify({ ...configJSON, id: packageJSON.name, interfaces, version: packageJSON.version }, undefined, 4), 'utf8');
    } catch (error) {
        console.warn('Error building connector configuration.', error);
    }
}
