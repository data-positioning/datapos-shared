/**
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 * @file datapos-engine-support/src/nodeConnector.ts
 * @license ISC
 */

// ...
import type { Connector } from './connector';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Node Connector
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface NodeConnectorConstructor {
    new (): NodeConnector;
}

export interface NodeConnector extends Connector {}
