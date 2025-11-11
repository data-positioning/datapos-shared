// Dependencies - Framework
import type { ComponentConfig } from '@/component';

// Types/Interfaces - Event Query Configuration
export interface EventQueryConfig extends ComponentConfig {
    placeholder?: string;
}
export type EventQueryLocalisedConfig = Omit<EventQueryConfig, 'label' | 'description'> & { label: string; description: string };
