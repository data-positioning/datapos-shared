// Dependencies - Engine - Support
import type { Component, ComponentConfig } from './component';

// Declaration - Event Query
export interface EventQuery extends Component {
    placeholder?: string;
}

// Declaration - Event Query Config
export interface EventQueryConfig extends ComponentConfig {
    placeholder?: string;
}
