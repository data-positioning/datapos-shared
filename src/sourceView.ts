/**
 * @file datapos-engine-support/src/sourceView.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// Dependencies - Engine
import type { Component } from './component';
import type { DPAFileSystemFileHandle } from '.';
import type { DataFormatId, DataUsageTypeId, ParsedValue, PreviewField, ValueDelimiterId } from './connectionEntry';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Source View
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface SourceView extends Component {
    properties: SourceViewProperties;
    preview: SourceViewPreview;
    contentAudit: SourceViewContentAudit;
    relationshipsAudit: SourceViewRelationshipsAudit;
}

export interface SourceViewProperties {
    connectionId?: string;
    folderPath?: string;
    fileExtension?: string;
    fileHandle?: DPAFileSystemFileHandle;
    fileId?: string;
    fileName?: string;
    preview?: SourceViewPreview;
    contentAudit?: SourceViewContentAudit;
    relationshipsAudit?: SourceViewRelationshipsAudit;
}

export interface SourceViewPreview {
    asAt: number;
    commentPrefixId?: string;
    dataFormatId: DataFormatId;
    fields?: PreviewField[];
    encodingConfidenceLevel?: number;
    encodingId?: string;
    hasHeaderLine?: boolean;
    lineDelimiterId?: string;
    linesToSkipBeforeHeader?: number;
    linesToSkipAfterHeader?: number;
    linesToSkipAtEndOfFile?: number;
    previewSize: number;
    quoteEscapeCharacterId?: string;
    quoteMarkId?: string;
    records?: ParsedValue[][];
    skipEmptyLines?: boolean;
    skipLinesWithEmptyValues?: boolean;
    skipLinesWithErrors?: boolean;
    text?: string;
    totalSize?: number;
    valueDelimiterId?: ValueDelimiterId;
    valueTrimMethodId?: string;
}

interface SourceViewContentAudit {
    asAt: number;
    fields: SourceViewContentAuditField[];
    lineCount: number;
}

interface SourceViewContentAuditField extends PreviewField {
    dataUsageTypeId?: DataUsageTypeId;
    id?: string;
    invalidValueCount: number;
    missingValueCount: number;
    uniqueValueCount: number;
    validValueCount: number;
    values: Record<string, number>;
}

interface SourceViewRelationshipsAudit {
    placeholder?: string;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Source View - Enumerations
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
