// Dependencies - Engine
import type { Component, ComponentConfig } from './component';

// Declarations - View Template
export interface ViewTemplate extends Component {
    placeholder?: string;
}

// Declarations - View Template Config
export interface ViewTemplateConfig extends ComponentConfig {
    placeholder?: string;
}
