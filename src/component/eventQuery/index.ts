// Dependencies - Framework
import type { ComponentConfig } from '@/component';

// Interfaces/Types - Event Query Configuration
export interface EventQueryConfig extends ComponentConfig {
    placeholder?: string;
}
export type EventQueryLocalisedConfig = Omit<EventQueryConfig, 'label' | 'description'> & { label: string; description: string };
