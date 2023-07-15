import type { Component, ComponentConfig } from './component';

export interface EventQuery extends Component {
    placeholder?: string;
}

// Config
export interface EventQueryConfig extends ComponentConfig {
    placeholder?: string;
}
