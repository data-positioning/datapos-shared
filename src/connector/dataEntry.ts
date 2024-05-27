// Interfaces/Types - Data Entry Configuration
export interface DataEntryConfig {
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

// Interfaces/Types - DPA File System Handle
interface DPAFileSystemFileHandle {
    readonly kind: 'file';
    getFile(): Promise<File>;
}
