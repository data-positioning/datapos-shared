const h = [
  { id: "alpha", color: "#d62728", label: { en: "alpha" } },
  { id: "beta", color: "#8c564b", label: { en: "beta" } },
  { id: "generalAvailability", label: { en: "" } },
  { id: "preAlpha", color: "#d62728", label: { en: "pre-alpha" } },
  { id: "proposed", color: "#666666", label: { en: "proposed" } },
  { id: "releaseCandidate", color: "#ff7f0e", label: { en: "release-candidate" } },
  { id: "unavailable", color: "#d62728", label: { en: "unavailable" } },
  { id: "underReview", color: "#666666", label: { en: "under-review" } }
], y = (e, t = "en") => {
  const r = h.find((n) => n.id === e);
  return r ? { ...r, label: r.label[t] || r.label.en || e } : { id: e, color: "#984ea3", label: e };
};
var x = /* @__PURE__ */ ((e) => (e.Connection = "connection", e.Context = "context", e.DataConnector = "dataConnector", e.EventQuery = "eventQuery", e.NodeConnector = "nodeConnector", e.SourceView = "sourceView", e.UsageKit = "usageKit", e))(x || {}), f = /* @__PURE__ */ ((e) => (e.APIKey = "apiKey", e.Disabled = "disabled", e.OAuth2 = "oAuth2", e.None = "none", e))(f || {}), b = /* @__PURE__ */ ((e) => (e.Bidirectional = "bidirectional", e.Destination = "destination", e.Node = "node", e.Source = "source", e.None = "none", e))(b || {}), a = /* @__PURE__ */ ((e) => (e.Binary = "binary", e.Boolean = "boolean", e.Byte = "byte", e.Date = "date", e.DateTime = "dateTime", e.DateTimeOffset = "dateTimeOffset", e.Decimal = "decimal", e.Double = "double", e.Int8 = "int8", e.Int16 = "int16", e.Int32 = "int32", e.Int64 = "int64", e.Object = "object", e.Single = "single", e.String = "string", e.Time = "time", e.Unknown = "unknown", e))(a || {}), s = /* @__PURE__ */ ((e) => (e[e.Boolean = 1] = "Boolean", e[e.DecimalNumber = 4] = "DecimalNumber", e[e.Moment = 2] = "Moment", e[e.String = 5] = "String", e[e.WholeNumber = 3] = "WholeNumber", e[e.Unknown = 0] = "Unknown", e))(s || {}), v = /* @__PURE__ */ ((e) => (e.Table = "table", e.Uint8Array = "uint8Array", e))(v || {}), p = /* @__PURE__ */ ((e) => (e.File = "file", e.Folder = "folder", e))(p || {}), E = /* @__PURE__ */ ((e) => (e.DelimitedText = "dtv", e.EntityEvent = "e/e", e.JSON = "json", e.SPSS = "spss", e.Table = "table", e.XLS = "xls", e.XLSX = "xlsx", e.XML = "xml", e))(E || {});
const g = [
  { id: "dtv", label: { en: "Delimited Text" } },
  { id: "e/e", label: { en: "Entity/Event" } },
  { id: "json", label: { en: "JSON" } },
  { id: "spss", label: { en: "SPSS" } },
  { id: "table", label: { en: "Table" } },
  { id: " xls", label: { en: "XLS" } },
  { id: " xlsx", label: { en: "XLSX" } },
  { id: " xml", label: { en: "XML" } }
], V = (e = "en") => {
  const t = [];
  for (const r of g)
    t.push({ ...r, label: r.label[e] || r.label.en || r.id });
  return t.sort((r, n) => r.label.localeCompare(n.label));
};
var S = /* @__PURE__ */ ((e) => (e.Colon = ":", e.Comma = ",", e.ExclamationMark = "!", e.Other = "", e.RecordSeparator = "0x1E", e.Semicolon = ";", e.Space = " ", e.Tab = "	", e.Underscore = "_", e.UnitSeparator = "0x1F", e.VerticalBar = "|", e))(S || {});
const C = [
  { id: ":", label: { en: "Colon" } },
  { id: ",", label: { en: "Comma" } },
  { id: "!", label: { en: "Exclamation Mark" } },
  { id: "", label: { en: "Other" } },
  { id: "0x1E", label: { en: "Record Separator" } },
  { id: ";", label: { en: "Semicolon" } },
  { id: " ", label: { en: "Space" } },
  { id: "	", label: { en: "Tab" } },
  { id: "_", label: { en: "Underscore" } },
  { id: "0x1F", label: { en: "Unit Separator" } },
  { id: "|", label: { en: "Vertical Bar" } }
], D = (e = "en") => {
  const t = [];
  for (const r of C)
    t.push({ ...r, label: r.label[e] || r.label.en || r.id });
  return t.sort((r, n) => r.label.localeCompare(n.label));
};
class N {
  dataUsageTypeId;
  label;
  constructor(t, r) {
    this.dataUsageTypeId = t, this.label = r;
  }
}
const T = 100;
class B extends N {
  doCountIndividualValidValues;
  doCountPatterns;
  invalidValueCount;
  invalidValues;
  isRequired;
  isUnique;
  maxDecimals;
  maxSize;
  maxValue;
  minDecimals;
  minSize;
  minValue;
  patterns;
  validValueCount;
  validValues;
  voidValueCount;
  constructor(t, r) {
    switch (super(t, r), this.invalidValueCount = 0, this.invalidValues = [], this.isRequired = !1, this.isUnique = !1, this.maxDecimals = 0, this.maxSize = 0, this.maxValue = void 0, this.minDecimals = 0, this.minSize = 0, this.minValue = void 0, this.patterns = {}, this.validValueCount = 0, this.validValues = {}, this.voidValueCount = 0, this.doCountIndividualValidValues = this.dataUsageTypeId === s.Boolean || this.dataUsageTypeId === s.String || this.dataUsageTypeId === s.WholeNumber, this.doCountPatterns = !0, this.dataUsageTypeId) {
      case s.String:
        this.maxValue = "", this.minValue = "";
        break;
    }
  }
  addInvalidValue(t, r) {
    return this.invalidValues.length < T && this.invalidValues.push({ recordNumber: r, value: t }), this.invalidValueCount++, t;
  }
  addValidValue(t, r, n, i) {
    switch (this.dataUsageTypeId) {
      case s.String: {
        r = t;
        const o = t.length;
        this.maxSize ? (o < this.minSize ? this.minSize = o : o > this.maxSize && (this.maxSize = o), !this.minValue || t < this.minValue ? this.minValue = t : (!this.maxValue || t > this.maxValue) && (this.maxValue = t)) : (this.maxSize = o, this.minSize = o, this.maxValue = t, this.minValue = t);
        break;
      }
    }
    if (this.doCountPatterns) {
      const o = this.dataUsageTypeId === s.DecimalNumber || this.dataUsageTypeId == s.WholeNumber ? this.determineNumericPattern(t) : this.determineTextPattern(t);
      this.patterns[o] = (this.patterns[o] || 0) + 1;
    }
    return this.doCountIndividualValidValues && (this.validValues[String(r)] = (this.validValues[String(r)] || 0) + 1), this.validValueCount++, r;
  }
  addVoidValue() {
    return this.voidValueCount++, null;
  }
  finalise() {
    this.doCountIndividualValidValues && (this.isUnique = this.validValueCount > 0 && this.validValueCount === Object.keys(this.validValues).length), this.voidValueCount === 0 && (this.isRequired = !0);
  }
  determineNumericPattern(t) {
    let r = "";
    for (let n = 0; n < t.length; n++) {
      const i = t.charAt(n);
      i >= "0" && i <= "9" ? r += "9" : r += i;
    }
    return r;
  }
  determineTextPattern(t) {
    let r = "";
    for (let n = 0; n < t.length; n++) {
      const i = t.charAt(n);
      i >= "0" && i <= "9" ? r += "9" : i >= "a" && i <= "z" ? r += "a" : i >= "A" && i <= "Z" ? r += "A" : r += i;
    }
    return r;
  }
}
class w extends Error {
  constructor(t) {
    super(t), this.name = "AbortError";
  }
}
class c extends Error {
  context;
  constructor(t, r) {
    super(t), this.name = "ContextError", this.context = r;
  }
}
class A extends c {
  constructor(t, r, n) {
    super(t, r), this.name = "BackendContextError", this.cause = n;
  }
}
class O extends c {
  constructor(t, r, n) {
    super(t, r), this.name = "ConnectorContextError", this.cause = n;
  }
}
class k extends c {
  constructor(t, r, n) {
    super(t, r), this.name = "EngineContextError", this.cause = n;
  }
}
class I extends c {
  constructor(t, r, n) {
    super(t, r), this.name = "FrontendContextError", this.cause = n;
  }
}
class $ extends Error {
  originalName;
  constructor(t, r) {
    super(t), this.name = "CoreError", this.originalName = r;
  }
}
class z extends Error {
  bodyText;
  status;
  statusText;
  constructor(t, r, n) {
    super("Failed to return fetch response."), this.name = "FetchResponseError", this.status = t, this.statusText = r, this.bodyText = n;
  }
}
class W extends Error {
  constructor(t) {
    super("Engine error wrapper."), this.name = "WorkerError", this.cause = t;
  }
}
const m = "en-US", u = {}, M = (e, t) => {
  switch (e) {
    case "Edm.Binary":
      return { storageTypeId: a.Binary, usageTypeId: s.Unknown };
    case "Edm.Boolean":
      return { storageTypeId: a.Boolean, usageTypeId: s.Boolean };
    case "Edm.Byte":
      return { storageTypeId: a.Byte, usageTypeId: s.WholeNumber };
    case "Edm.DateTime":
      return { storageTypeId: a.DateTime, usageTypeId: s.Moment };
    case "Edm.DateTimeOffset":
      return { storageTypeId: a.DateTimeOffset, usageTypeId: s.Moment };
    case "Edm.Decimal":
      return { storageTypeId: a.Decimal, usageTypeId: s.DecimalNumber };
    case "Edm.Double":
      return { storageTypeId: a.Double, usageTypeId: s.DecimalNumber };
    case "Edm.Guid":
      return { storageTypeId: a.String, usageTypeId: s.String };
    case "Edm.Int16":
      return { storageTypeId: a.Int16, usageTypeId: s.WholeNumber };
    case "Edm.Int32":
      return { storageTypeId: a.Int32, usageTypeId: s.WholeNumber };
    case "Edm.Int64":
      return { storageTypeId: a.Int64, usageTypeId: s.WholeNumber };
    case "Edm.SByte":
      return { storageTypeId: a.Int8, usageTypeId: s.WholeNumber };
    case "Edm.Single":
      return { storageTypeId: a.Single, usageTypeId: s.DecimalNumber };
    case "Edm.String":
      return { storageTypeId: a.String, usageTypeId: s.String, maximumLength: t };
    case "Edm.Time":
      return { storageTypeId: a.Time, usageTypeId: s.Moment };
    default:
      return { storageTypeId: a.Unknown, usageTypeId: s.Unknown };
  }
}, U = (e) => {
  if (e) {
    const t = e.lastIndexOf("/"), r = e.lastIndexOf(".", t > -1 ? t : e.length);
    return r > -1 ? e.substring(0, r) : e;
  }
}, L = (e) => {
  if (e) {
    const t = e.lastIndexOf(".");
    if (t > -1)
      return e.substring(t + 1);
  }
}, X = (e) => {
  if (e) {
    let t, r;
    return e.endsWith("/") ? (t = e.lastIndexOf("/", e.length - 2), r = e.length - 1) : (t = e.lastIndexOf("/"), r = e.length), t > -1 ? e.substring(t + 1, r) : e;
  }
}, l = (e, t = 2, r = t, n = m) => {
  if (e == null)
    return "";
  const i = `${n}decimal${t}.${r}`;
  let o = u[i];
  return o || (o = new Intl.NumberFormat(n, {
    localeMatcher: "best fit",
    maximumFractionDigits: t,
    minimumFractionDigits: r,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), u[i] = o), o.format(e);
}, R = (e) => e == null ? "" : e === 1 ? "1 byte" : e < 1024 ? `${d(e)} bytes` : e < 1048576 ? `${l(e / 1024, 2, 0)} KB` : e < 1073741824 ? `${l(e / 1048576, 2, 0)} MB` : e < 1099511627776 ? `${l(e / 1073741824, 2, 0)} GB` : `${l(e / 1099511627776, 2, 0)} TB`, q = (e) => e == null ? "" : e < 1e3 ? `${d(e)} ms` : e === 1e3 ? `${d(e)} sec` : e < 6e4 ? `${l(e / 1e3, 2, 0)} secs` : e === 6e4 ? "1 min" : e < 36e5 ? `${l(e / 6e4, 2, 0)} mins` : e === 36e5 ? "1 hr" : e < 864e5 ? `${l(e / 36e5, 2, 0)} hrs` : e === 864e5 ? "1 day" : `${l(e / 864e5, 2, 0)} days`, d = (e, t = m) => {
  if (e == null)
    return "";
  const r = `${t}decimal0.0`;
  let n = u[r];
  return n || (n = new Intl.NumberFormat(t, {
    localeMatcher: "best fit",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), u[r] = n), n.format(e);
}, j = (e) => {
  switch (e) {
    case "csv":
      return "text/csv";
    case "tab":
    case "tsv":
      return "text/tab-separated-values";
    case "xls":
      return "application/vnd.ms-excel";
    case "xlsx":
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    default:
      return "application/octet-stream";
  }
};
export {
  w as AbortError,
  A as BackendContextError,
  x as ComponentTypeId,
  v as ConnectionEntryPreviewTypeId,
  p as ConnectionEntryTypeId,
  f as ConnectorAuthMethodId,
  O as ConnectorContextError,
  b as ConnectorUsageId,
  B as ContentAuditColumn,
  c as ContextError,
  $ as CoreError,
  E as DataFormatId,
  k as EngineContextError,
  z as FetchResponseError,
  a as FieldStorageTypeId,
  I as FrontendContextError,
  N as PreviewColumn,
  S as ValueDelimiterId,
  W as WorkerError,
  M as convertODataTypeToDataType,
  L as extractFileExtensionFromFilePath,
  U as extractFileNameFromFilePath,
  X as extractLastSegmentFromPath,
  l as formatNumberAsDecimalNumber,
  q as formatNumberAsDuration,
  R as formatNumberAsStorageSize,
  d as formatNumberAsWholeNumber,
  y as getComponentStatus,
  V as getDataFormats,
  D as getValueDelimiters,
  j as lookupMimeTypeForFileExtension
};
