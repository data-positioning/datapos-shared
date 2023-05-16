# Data Positioning Engine Support

## Component Class Hierarchy

```mermaid
classDiagram
    direction TB

    Component <|-- Connection
    Component <|-- Connector
    Component <|-- EventQuery
    Component <|-- SourceView
    Connector <|-- DataConnector
    Connector <|-- NodeConnector

    class Component {
        <<interface>>
        id : string
    }

    class Connection {
        <<interface>>
    }

    class Connector {
        <<interface>>
        version : string
    }

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

    class EventQuery {
        <<interface>>
    }

    class SourceView {
        <<interface>>
        properties :  SourceViewProperties
        preview :  SourceViewPreview
        contentAudit :  SourceViewContentAudit
        relationshipsAudit :  SourceViewRelationshipsAudit
    }
```

## Component Configuration Class Hierarchy

```mermaid
classDiagram
    direction TB

    ComponentConfig <|-- PrimaryComponentConfig
    PrimaryComponentConfig <|-- ConnectorConfig
    PrimaryComponentConfig <|-- UsageKitConfig

    class ComponentConfig {
        <<interface>>
        id string
        label? string
        firstCreatedAt FirebaseTimestamp
        lastUpdatedAt FirebaseTimestamp
        logo? string
        statusId ComponentStatusId
        typeId ComponentTypeId
    }

    class PrimaryComponentConfig {
        <<interface>>
        categoryId string
        description string
        label string
        reference string
        version string
    }

    class ConnectorConfig {
        <<interface>>
        implementations Implementation[]
        logo string
        usageId ConnectorUsageId
    }

    class UsageKitConfig {
        <<interface>>
        placeholder? string;
    }
```

## Component Item Class Hierarchy

```mermaid
classDiagram
    direction TB

    ComponentItem <|-- ConnectionItem
    ComponentItem <|-- PluginItem
    PluginItem <|-- ConnectorItem

    class ConnectionItem {
        <<interface>>
        authorization? Record~ConnectionItemAuthorization~
        connectorItem ConnectorItem
        implementation ConnectorImplementation
        implementationId? string
        notation? string
        verifiedAt? FirebaseTimestamp
    }

    class ComponentItem {
        <<interface>>
        firstCreatedAt FirebaseTimestamp
        id string
        lastUpdatedAt FirebaseTimestamp
        summary? string
        typeId ComponentTypeId
    }

    class PluginItem {
        <<interface>>
        categoryLabel string
        label string
        reference string
        version string
    }

    class ConnectorItem {
        <<interface>>
        activeConnectionCount number
        canDescribe boolean
        categoryId string
        hasOnlyAuthImplementations boolean
        implementations ConnectorImplementation[]
        logo string
        logoWidth string
        maxConnectionCount number
        statusId string
        usageId ConnectorUsageId
    }
```

## Connection Entry Class Hierarchy

```mermaid
classDiagram
    direction RL

    class ConnectionEntry {
        <<interface>>
        childEntryCount? number
        folderPath? string
        encodingId? string
        extension? string
        handle? DPAFileSystemFileHandle
        id? string
        label? string
        lastModifiedAt? number
        mimeType? string
        name? string
        params? Record~unknown~
        paramsString? string
        referenceId? string
        size? number
        typeId? ConnectionEntryTypeId
    }

    class ConnectionEntryPreview {
        <<interface>>
        data ParsedValue[][] | Uint8Array
        fields PreviewField[]
        typeId ConnectionEntryPreviewTypeId
    }

    class ParsedValue {
        <<type>>
        boolean | number | string | null
    }

    class PreviewField {
        <<interface>>
        dataUsageTypeId? DataUsageTypeId
        id? string
        label? string
        previewValues? PreviewValue[]
    }

    class PreviewValue {
        <<interface>>
        id string
        label string
    }
```

## Connection Entry Enumerations

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

    class DataUsageTypeId {
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
