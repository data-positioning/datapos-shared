import type { Component, ComponentConfig } from './component';

export interface UsageKit extends Component {
    placeholder?: string;
}

// Config
export interface UsageKitConfig extends ComponentConfig {
    placeholder?: string;
}
