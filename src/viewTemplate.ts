// Dependencies - Engine
import type { Component, ComponentConfig } from './component';

// Declaration - View Template
export interface ViewTemplate extends Component {
    placeholder?: string;
}

// Declaration - View Template Config
export interface ViewTemplateConfig extends ComponentConfig {
    placeholder?: string;
}
