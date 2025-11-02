// Dependencies - Framework
import type { ComponentConfig } from '@/component';

// Interfaces/Types - Dimension Configuration
export interface DimensionConfig extends ComponentConfig {
    placeholder?: string;
}
export type DimensionLocalisedConfig = Omit<DimensionConfig, 'label' | 'description'> & { label: string; description: string };
