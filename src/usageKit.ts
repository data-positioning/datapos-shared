// Dependencies - Engine - Support
import type { Component, ComponentConfig } from './component';

// Dependencies - Usage Kit
export interface UsageKit extends Component {
    placeholder?: string;
}

// Dependencies - Usage Kit Config
export interface UsageKitConfig extends ComponentConfig {
    placeholder?: string;
}
