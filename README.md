# Data Positioning Engine Support

Includes TypeScript declarations used by the Data Positioning engine, as well as utilities that provide assistance when utilizing the engine.

## Component Configuration Classes

The following diagram details the component configuration class hierarchy, showcasing the relationships and inheritance structure between different **Component Configuration** classes.

```mermaid
classDiagram
    direction LR

    class ComponentConfig {
        <<interface>>
        id :  string
        label? :  string
        firstCreatedAt :  FirebaseTimestamp
        lastUpdatedAt :  FirebaseTimestamp
        logo? :  string
        statusId :  ComponentStatusId
        typeId :  ComponentTypeId
    }

    class ConnectionConfig {
        <<interface>>
    }

    class ConnectorConfig {
        <<interface>>
    }

    class EventQueryConfig {
        <<interface>>
    }

    class SourceViewConfig {
        <<interface>>
    }

    ComponentConfig <|-- ConnectionConfig
    ComponentConfig <|-- ConnectorConfig
    ComponentConfig <|-- EventQueryConfig
    ComponentConfig <|-- SourceViewConfig
```

```mermaid
classDiagram
    direction TB

    class ComponentTypeId {
        <<enumeration>>
        Connection
        ContextModel
        DataConnector
        NodeConnector
        ResultTemplate
        UsageKit
    }

    class ComponentStatusId {
        <<enumeration>>
        Proposed
        UnderReview
        PreAlpha
        Alpha
        Beta
        ReleaseCandidate
        GeneralAvailability
        Unavailable
    }
```

## Component Classes

The following diagram details the component class hierarchy, showcasing the relationships and inheritance structure between different **Component** classes.

```mermaid
classDiagram
    direction LR

    class Component {
        <<interface>>
        id : string
    }

    class Connection {
        <<interface>>
    }

    class Connector {
        <<interface>>
    }

    class DataConnector {
        <<interface>>
    }

    class NodeConnector {
        <<interface>>
   }

    class EventQuery {
        <<interface>>
    }

    class SourceView {
        <<interface>>
    }

    Component <|-- Connection
    Component <|-- Connector
    Connector <|-- DataConnector
    Connector <|-- NodeConnector
    Component <|-- EventQuery
    Component <|-- SourceView
```

## Connector Classes

The following diagram details the connector class hierarchies, showcasing the relationships and inheritance structure between different **Connector Configuration** and **Connector** classes.

```mermaid
classDiagram
    direction LR

    class ComponentConfig {
        <<interface>>
    }

    ComponentConfig <|-- ConnectorConfig

    class ConnectorConfig {
        <<interface>>
        categoryId :  string
        description :  string
        label :  string
        reference :  string
        version :  string
        implementations :  Implementation[]
        logo :  string
        usageId :  ConnectorUsageId
    }

    class Component {
        <<interface>>
    }

    Component <|-- Connector

    class Connector {
        <<interface>>
        version : string
    }

    Connector <|-- DataConnector
    Connector <|-- NodeConnector

    class DataConnector {
        <<interface>>
        abortController? :  AbortController
        readonly connectionItem :  ConnectionItem
        abort?() void
        authenticate?() Window
        describe?() Promise~ConnectionDescription~
        getCreateInterface?() DataConnectorCreateInterface
        getPreviewInterface?() DataConnectorPreviewInterface
        getReadInterface?() DataConnectorReadInterface
        getWriteInterface?() DataConnectorWriteInterface
        retrieveEntries?() Promise~ConnectionEntriesPage~
    }

    class NodeConnector {
        <<interface>>
        deleteNodeItem() Promise~void~
        getNodeItem() Promise~NodeItem~
        listNodeItems() Promise~NodeItem[]~
        upsertNodeItem() Promise~NodeItem~
        getNodeItemProperties() Promise~NodeItemProperties~
        upsertNodeItemProperties() Promise~NodeItemProperties~
        clearNodeItemData() Promise~void~
        countNodeItemData() Promise~number~
        determineNodeItemData() Promise~unknown~
        insertNodeItemData() Promise~void~
        retrieveNodeItemData() Promise~NodeDataPageResults~
   }
```

## Connection Entry Classes

The following diagram illustrates the connection entry class hierarchy, showcasing the relationships and inheritance structure between different **Connection Entry** classes and detailing referenced enumeration types.

```mermaid
classDiagram
    direction LR

    class ConnectionEntry {
        <<interface>>
        childEntryCount? :  number
        folderPath? :  string
        encodingId? :  string
        extension? :  string
        handle? :  DPAFileSystemFileHandle
        id? :  string
        label? :  string
        lastModifiedAt? :  number
        mimeType? :  string
        name? :  string
        params? :  Record~unknown~
        paramsString? :  string
        referenceId? :  string
        size? :  number
        typeId? :  ConnectionEntryTypeId
    }

    ConnectionEntryPreview "1" --> "*" ParsedValue
    ConnectionEntryPreview "1" --> "*" PreviewField

    class ConnectionEntryPreview {
        <<interface>>
        data :  ParsedValue[][] | Uint8Array
        fields :  PreviewField[]
        typeId :  ConnectionEntryPreviewTypeId
    }

    class ParsedValue {
        <<type>>
        boolean
        number
        string
        null
    }

    PreviewField "1" --> "*" PreviewValue

    class PreviewField {
        <<interface>>
        dataTypeId? :  DataTypeId
        id? :  string
        label? :  string
        previewValues? :  PreviewValue[]
    }

    class PreviewValue {
        <<interface>>
        id :  string
        label :  string
    }
```

```mermaid
classDiagram
    direction TB

    class ConnectionEntryPreviewTypeId {
        <<enumeration>>
        JSON
        Table
        Uint8Array
    }

    class ConnectionEntryTypeId {
        <<enumeration>>
        File
        Folder
    }
```

```mermaid
classDiagram
    direction TB

    class DataFormatId {
        <<enumeration>>
        DelimitedText
        EntityEvent
        JSON
        SPSS
        Table
        XLS
        XLSX
        XML
    }

    class DataTypeId {
        <<enumeration>>
        Binary
        Boolean
        Date
        DateTime
        DateTimeOffset
        DecimalNumber
        Object
        String
        Time
        Unknown
        WholeNumber
    }

    class ValueDelimiterId {
        <<enumeration>>
        Colon
        Comma
        ExclamationMark
        Other
        RecordSeparator
        Semicolon,
        Space
        Tab
        Underscore
        UnitSeparator
        VerticalBar
    }
```

## Entity Event Class

...

```mermaid
classDiagram
    direction LR

    class Component {
        <<interface>>
    }

    Component <|-- EventQuery

    class EventQuery {
        <<interface>>
    }
```

## Source View Class

...

```mermaid
classDiagram
    direction TB

    class Component {
        <<interface>>
    }

    class SourceView {
        <<interface>>
        properties : SourceViewProperties
        preview : SourceViewPreview
        contentAudit : SourceViewContentAudit
        relationshipsAudit : SourceViewRelationshipsAudit
    }

    Component <|-- SourceView

    class SourceViewProperties {
        <<interface>>
        connectionId? : string
        folderPath? : string
        fileExtension? : string
        fileHandle? : DPAFileSystemFileHandle
        fileId? : string
        fileName? : string
        preview? : SourceViewPreview
        contentAudit? : SourceViewContentAudit
        relationshipsAudit? : SourceViewRelationshipsAudit
    }

    class SourceViewPreview {
        <<interface>>
        asAt : number
        commentPrefixId? : string
        dataFormatId : DataFormatId
        fields? : PreviewField[]
        encodingConfidenceLevel? : number
        encodingId? : string
        hasHeaderLine? : boolean
        lineDelimiterId? : string
        linesToSkipBeforeHeader? : number
        linesToSkipAfterHeader? : number
        linesToSkipAtEndOfFile? : number
        previewSize : number
        quoteEscapeCharacterId? : string
        quoteMarkId? : string
        records? : ParsedValue[][]
        skipEmptyLines? : boolean
        skipLinesWithEmptyValues? : boolean
        skipLinesWithErrors? : boolean
        text? : string
        totalSize? : number
        valueDelimiterId? : ValueDelimiterId
        valueTrimMethodId? : string
    }

    SourceView "1" --> "*" SourceViewProperties

    SourceViewProperties "1" --> "*" SourceViewPreview

    SourceViewProperties "1" --> "*" SourceViewContentAudit

    class SourceViewContentAudit {
        <<interface>>
        asAt : number
        fields : SourceViewContentAuditField[]
        lineCount : number
    }

    SourceViewContentAudit "1" --> "*" SourceViewContentAuditField

    class PreviewField {
        <<interface>>
    }

    PreviewField <|-- SourceViewContentAuditField

    %%SourceViewPreview "1" --> "*" PreviewField

    class SourceViewContentAuditField {
        <<interface>>
        dataTypeId? : DataTypeId
        id? : string
        invalidValueCount : number
        missingValueCount : number
        uniqueValueCount : number
        validValueCount : number
        values : Record~number~
    }

    SourceViewProperties "1" --> "*" SourceViewRelationshipsAudit

    class SourceViewRelationshipsAudit {
        <<interface>>
    }
```
