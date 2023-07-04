// Dependencies - Engine - Support
import type { Component, ComponentConfig } from './component';

// Declarations - Event Query
export interface EventQuery extends Component {
    placeholder?: string;
}

// Declarations - Event Query - Config
export interface EventQueryConfig extends ComponentConfig {
    placeholder?: string;
}
