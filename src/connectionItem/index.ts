// Interfaces/Types - Connection Item Configuration
export interface ConnectionItemConfig {
    childCount?: number;
    extension?: string;
    folderPath: string;
    handle?: DPAFileSystemFileHandle;
    id?: string;
    label: string;
    lastModifiedAt?: number;
    mimeType?: string;
    name: string;
    size?: number;
    typeId: 'folder' | 'object';
}

// Interfaces/Types - DPA File System File Handle
interface DPAFileSystemFileHandle {
    readonly kind: 'file';
    getFile(): Promise<File>;
}
