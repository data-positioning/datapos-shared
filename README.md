# Data Positioning Engine Support

Includes TypeScript declarations used by the Data Positioning engine, as well as utilities that provide assistance when utilizing the engine.

## Component Configuration Declarations

The following diagram illustrates the component configuration class hierarchy, showcasing the relationships and inheritance structure between different **Component Configuration** classes.

```mermaid
classDiagram
    direction LR

    class ComponentConfig {
        <<interface>>
        id : string
        label : string
        description : string
        firstCreatedAt : FirebaseTimestamp
        lastUpdatedAt : FirebaseTimestamp
        logo? : string
        status : ComponentStatus
        typeId : ComponentTypeId
    }

    ComponentConfig <|-- ConnectorConfig
    ConnectorConfig <|-- DataConnectorConfig
    ConnectorConfig <|-- NodeConnectorConfig
    ComponentConfig <|-- ConnectionConfig
    ComponentConfig <|-- ContextModelConfig
    ComponentConfig <|-- DimensionConfig
    ComponentConfig <|-- EntityConfig
    ComponentConfig <|-- EventQueryConfig
    ComponentConfig <|-- SourceViewConfig
    ComponentConfig <|-- UsageKitConfig
    ComponentConfig <|-- ViewTemplateConfig
```

```mermaid
classDiagram
    direction TB

    class ComponentStatus {
        <<type>>
        alpha
        beta
        generalAvailability
        preAlpha
        proposed
        releaseCandidate
        unavailable
        underReview
    }

    class ComponentTypeId {
        <<enumeration>>
        Connection
        Connector **
        ContextModel
        DataConnector **
        Dimension
        Entity
        EventQuery
        NodeConnector **
        SourceView
        ViewTemplate
        UsageKit
    }
```

## Component Instance Declarations

The following diagram illustrates the component class hierarchy, showcasing the relationships and inheritance structure between different **Component** classes.

```mermaid
classDiagram
    direction LR

    class Component {
        <<interface>>
        config : ComponentConfig
    }

    class Connection {
        <<interface>>
        config : ConnectionConfig
    }

    class Connector {
        <<interface>>
        config : ConnectorConfig
    }

    class ContextModel {
        <<interface>>
        config : ContextModelConfig
    }

    class Dimension {
        <<interface>>
        config : DimensionConfig
    }

    class Entity {
        <<interface>>
        config : EntityConfig
    }

    class EventQuery {
        <<interface>>
        config : EventQueryConfig;
    }

    class SourceView {
        <<interface>>
        config : SourceViewConfig
    }

    class UsageKit {
        <<interface>>
        config : UsageKitConfig
    }

    class ViewTemplate {
        <<interface>>
        config : ViewTemplateConfig
    }

    Component <|-- Connection
    Component <|-- Connector
    Connector <|-- DataConnector
    Connector <|-- NodeConnector
    Component <|-- ContextModel
    Component <|-- Dimension
    Component <|-- Entity
    Component <|-- EventQuery
    Component <|-- SourceView
    Component <|-- UsageKit
    Component <|-- ViewTemplate
```

## Connector Configuration Declarations

The following diagram illustrates the connector class hierarchies, showcasing the relationships and inheritance structure between different **Connector Configuration** classes and detailing referenced enumeration types.

```mermaid
classDiagram
    direction LR


    class ConnectorConfig {
        <<interface>>
        category : ConnectorCategory
        implementations : ConnectorImplementation[]
        logo : string
        reference : string
        usageId : ConnectorUsageId
        version : string
    }

    class ConnectorImplementation {
        <<interface>>
        activeConnectionCount : number
        canDescribe : boolean
        id : string
        authMethodId : ConnectorAuthMethodId
        label : string
        maxConnectionCount : number
        params : Record~string~[]
    }

    ConnectorConfig "1" --> "*" ConnectorImplementation
```

```mermaid
classDiagram
    direction TB

    class ConnectorAuthMethodId {
        <<enumeration>>
        APIKey
        Disabled
        OAuth2
        None
    }

    class ConnectorCategory {
        <<type>>
        application
        curatedDataset
        database
        fileStore
    }

    class ConnectorUsageId {
        <<enumeration>>
        Bidirectional
        Destination
        Node
        Source
        None
    }
```

## Data Connector Instance Declarations

The following diagram illustrates the connector class hierarchies, showcasing the relationships and inheritance structure between different **Data Connector** classes and detailing referenced enumeration types.

```mermaid
classDiagram
    direction LR

    class DataConnectorConstructor {
        <<interface>>
        connectionConfig : ConnectionConfig
    }

    class DataConnector {
        <<interface>>
        abortController? :  AbortController
        abort?() void
        authenticate?() Window
        describe?() Promise~ConnectionDescription~
        getCreateInterface?() DataConnectorCreateInterface
        getPreviewInterface?() DataConnectorPreviewInterface
        getReadInterface?() DataConnectorReadInterface
        getWriteInterface?() DataConnectorWriteInterface
        retrieveEntries?() Promise~ConnectionEntriesPage~
    }

    DataConnector .. ConnectionDescription
    DataConnector .. DataConnectorCreateInterface
    DataConnectorCreateInterface "1" --> "1" DataConnectorCreateInterfaceSettings
    DataConnector .. DataConnectorPreviewInterface
    DataConnectorPreviewInterface "1" --> "1" DataConnectorPreviewInterfaceSettings
    DataConnector .. DataConnectorReadInterface
    DataConnectorReadInterface "1" --> "1" DataConnectorReadInterfaceSettings
    DataConnector .. DataConnectorWriteInterface
    DataConnectorWriteInterface "1" --> "1" DataConnectorWriteInterfaceSettings
    DataConnector "1" --> "*" ConnectionEntriesPage
```

## Node Connector Instance Declarations

The following diagram illustrates the connector class hierarchies, showcasing the relationships and inheritance structure between different **Node Connector** classes and detailing referenced enumeration types.

```mermaid
classDiagram
    direction LR

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
        retrieveNodeItemData() Promise~NodeItemDataPage~
    }

    class NodeItem {
        <<interface>>
    }

    class NodeItemProperties {
        <<interface>>
    }

    class NodeItemDataPage {
        <<interface>>}

    NodeConnector .. NodeItem
    NodeConnector .. NodeItemProperties
    NodeConnector .. NodeItemDataPage
```

```mermaid
classDiagram
    direction TB

    class NodeQuery {
        <<interface>>
    }

    class NodeQuerySelect {
        <<interface>>
    }

    class NodeQueryColumn {
        <<interface>>
    }

    class NodeQueryExpression {
        <<interface>>
    }

    class NodeQueryExpressionItem {
        <<interface>>
    }

    class NodeQueryExpressionValue {
        <<interface>>
    }

    NodeQuery "1" --> "1" NodeQuerySelect
    NodeQuerySelect "1" --> "*" NodeQueryColumn
    NodeQueryColumn "1" --> "1" NodeQueryExpression
    NodeQueryExpression "1" --> "*" NodeQueryExpressionItem
```

```mermaid
classDiagram
    direction TB

    class NodeDataTypeId {
        <<enumeration>>
        Data
        Events
        Facts
    }

    class NodeItemTypeId {
        <<enumeration>>
        Dimension
        Entity
        EventQuery
        SourceView
        Workbook
    }
```

## Connection Declarations

The following diagram illustrates the connection class hierarchy, showcasing the relationships and inheritance structure between different **Connection** classes and detailing referenced enumeration types.

```mermaid
classDiagram
    direction LR

    class ConnectionConfig {
        <<interface>>
        authorization? : Record~ConnectionAuthorization~
        connectorId: string
        connectorConfig: ConnectorConfig
        implementation: ConnectorImplementation
        implementationId? : string
        notation? : string
        verifiedAt? : FirebaseTimestamp
    }

    class ConnectionAuthorisation {
        <<interface>>
        access_token : string
        account_id : string
        expires_at : number
        expires_in : number
        refresh_token : string
        scope : string
        token_type : string
        uid : string
    }

    ConnectionConfig "1" --> "*" ConnectionAuthorisation

    class Connection {
        <<interface>>
    }

    class ConnectionDescription {
        <<interface>>
    }

    class FileType {
        <<interface>>
    }

    class ObjectType {
        <<interface>>
    }

    class Field {
        <<interface>>
    }

    class DataType {
        <<interface>>
    }

    ConnectionDescription "1" --> "*" FileType
    FileType "1" --> "*" Field
    ConnectionDescription "1" --> "*" ObjectType
    ObjectType "1" --> "*" Field
```

## Connection Entry Declarations

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

## Context Model Declarations

...

```mermaid
classDiagram
    direction LR

    class Component {
        <<interface>>
    }

    Component <|-- ContextModel

    class ContextModel {
        <<interface>>
    }
```

## Dimension Declarations

...

```mermaid
classDiagram
    direction LR

    class Component {
        <<interface>>
    }

    Component <|-- Dimension

    class Dimension {
        <<interface>>
    }
```

## Entity Declarations

...

```mermaid
classDiagram
    direction LR

    class Component {
        <<interface>>
    }

    Component <|-- Entity

    class Entity {
        <<interface>>
    }
```

## Event Query Declarations

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

## Source View Declarations

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

    %%class PreviewField {
    %%    <<interface>>
    %%}

    %%PreviewField <|-- SourceViewContentAuditField

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

## Usage Kit Declarations

...

```mermaid
classDiagram
    direction LR

    class Component {
        <<interface>>
    }

    Component <|-- UsageKit

    class UsageKit {
        <<interface>>
    }
```

## View Template Declarations

...

```mermaid
classDiagram
    direction LR

    class Component {
        <<interface>>
    }

    Component <|-- ViewTemplate

    class ViewTemplate {
        <<interface>>
    }
```

## Other Declarations

```mermaid
classDiagram
    direction TB

    class CallbackProperties {
        <<interface>>
    }

    class DataStorageTypeId {
        <<enumeration>>
        Binary
        Boolean
        Byte
        Date
        DateTime
        DateTimeOffset
        Decimal
        Double
        Int8
        Int16
        Int32
        Int64
        Object
        Single
        String
        Time
        Unknown
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

    class DPAFileSystemFileHandle {
        <<interface>>
    }
```

```mermaid
classDiagram
    direction TB

    class ErrorData {
            <<interface>>
        body : ErrorDataBody
        statusCode? : number
        statusText? : string
    }

    class ErrorDataBody {
            <<interface>>
        context? : string
        message : string
        stack? : string
    }

    class FirebaseTimestamp {
        <<interface>>
    }

    class Progress {
        <<interface>>
    }
```

## Utilities

### Conversion

-   convertODataTypeToDataType

### Extraction

-   extractDirectoryPathFromEntryPath
-   extractExtensionFromEntryPath
-   extractLastFolderNameFromFolderPath

### Formatting

-   formatNumberAsDecimalNumber
-   formatNumberAsStorageSize
-   formatNumberAsWholeNumber

### Lookup

-   lookupMimeTypeForFileExtension

### Security

-   establishVendorAccessToken

## Repository Management Commands

The following list details the common repository management commands implementation for this project. For more details, please refer to the [Grunt](https://gruntjs.com/) configuration file (gruntfile.js) in this project.

| Name        | Key Code         | Notes                                                                                                                                                                                                       |
| ----------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Audit       | alt+ctrl+shift+a | Audit the project's dependencies for known security vulnerabilities.                                                                                                                                        |
| Build       | alt+ctrl+shift+b | Build the package using Vite build.                                                                                                                                                                         |
| Check       | alt+ctrl+shift+c | List the dependencies in the project that are outdated.                                                                                                                                                     |
| Document    | alt+ctrl+shift+d | Identify the licenses of the project's dependencies.                                                                                                                                                        |
| Format      | alt+ctrl+shift+f | NOT implemented.                                                                                                                                                                                            |
| Lint        | alt+ctrl+shift+l | Check the code for potential errors and enforces coding styles.                                                                                                                                             |
| Migrate     | alt+ctrl+shift+l | Install the latest version of outdated dependencies.                                                                                                                                                        |
| Publish     | alt+ctrl+shift+n | Publishes the package to the [npm](https://www.npmjs.com/) registry. This action will publish the last synchronised version. Use the command line command 'npm publish' when publishing for the first time. |
| Release     | alt+ctrl+shift+r | Synchronise the local repository with the main GitHub repository and deploy the package to the Firebase hosting servers.                                                                                    |
| Synchronise | alt+ctrl+shift+s | Synchronise the local repository with the main GitHub repository.                                                                                                                                           |
| Test        | alt+ctrl+shift+l | NOT implemented.                                                                                                                                                                                            |
| Update      | alt+ctrl+shift+l | Install the latest version of outdated Data Position package dependencies.                                                                                                                                  |
