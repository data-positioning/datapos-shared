// Dependencies - Framework
import type { Component, ComponentConfig } from '../component';

// Interfaces/Types - Presentation
export interface Presentation extends Component {
    placeholder?: string;
}

// Interfaces/Types - Presentation Configuration
export interface PresentationConfig extends ComponentConfig {
    placeholder?: string;
}
