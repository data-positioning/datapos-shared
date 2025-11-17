const E = ["createObject", "dropObject", "removeRecords", "upsertRecords"], I = ["findObject", "getRecord", "listNodes", "previewObject", "retrieveRecords"];
function C() {
  function e(a, t, r) {
    r.textContent = "Cytoscape.js diagram goes here...";
  }
  return { render: e };
}
function S() {
  function e(a, t, r) {
    console.log(1111, a), console.log(2222, t), console.log(3333, r), console.log(4444, r.childNodes), console.log(5555, r.children);
  }
  return { render: e };
}
const x = 0, w = (e) => e, N = () => Date.now(), D = {
  cartesianChart_areaLine: { categoryId: "cartesianChart", typeId: "areaLine", label: { "en-gb": "Area Line" } },
  cartesianChart_areaSpline: { categoryId: "cartesianChart", typeId: "areaSpline", label: { "en-gb": "Area Spline" } },
  cartesianChart_bar: { categoryId: "cartesianChart", typeId: "bar", label: { "en-gb": "Bar" } },
  cartesianChart_column: { categoryId: "cartesianChart", typeId: "column", label: { "en-gb": "Column" } },
  cartesianChart_line: { categoryId: "cartesianChart", typeId: "line", label: { "en-gb": "Line" } },
  cartesianChart_pyramid: { categoryId: "cartesianChart", typeId: "pyramid", label: { "en-gb": "Pyramid" } },
  cartesianChart_spline: { categoryId: "cartesianChart", typeId: "spline", label: { "en-gb": "Spline" } },
  chordDiagram: { categoryId: "chordDiagram", label: { "en-gb": "Chord Diagram" } },
  periodFlowBoundariesChart: { categoryId: "periodFlowBoundariesChart", label: { "en-gb": "Period Flow & Boundaries" } },
  polarChart_areaLine: { categoryId: "polarChart", typeId: "areaLine", label: { "en-gb": "Radar (Area Line)" } },
  polarChart_areaSpline: { categoryId: "polarChart", typeId: "areaSpline", label: { "en-gb": "Radar (Area Spline)" } },
  polarChart_column: { categoryId: "polarChart", typeId: "column", label: { "en-gb": "Radar (Column)" } },
  polarChart_line: { categoryId: "polarChart", typeId: "line", label: { "en-gb": "Radar (Line)" } },
  polarChart_spline: { categoryId: "polarChart", typeId: "spline", label: { "en-gb": "Radar (Spline)" } },
  rangeChart_areaLine: { categoryId: "rangeChart", typeId: "areaLine", label: { "en-gb": "Range (Area Line)" } },
  rangeChart_areaSpline: { categoryId: "rangeChart", typeId: "areaSpline", label: { "en-gb": "Range (Area Spline)" } },
  rangeChart_bar: { categoryId: "rangeChart", typeId: "bar", label: { "en-gb": "Range (Bar)" } },
  rangeChart_column: { categoryId: "rangeChart", typeId: "column", label: { "en-gb": "Range (Column)" } },
  sankeyDiagram: { categoryId: "sankeyDiagram", label: { "en-gb": "Sankey Diagram" } },
  streamGraph: { categoryId: "streamGraph", label: { "en-gb": "Streamgraph" } },
  valueTable: { categoryId: "valueTable", label: { "en-gb": "Values" } }
};
class u extends Error {
  locator;
  constructor(a, t, r) {
    super(a, r), this.name = "DataPosError", this.locator = t, Error.captureStackTrace?.(this, new.target);
  }
}
class i extends u {
  constructor(a, t, r) {
    super(a, t, r), this.name = "ApplicationError";
  }
}
class T extends i {
  constructor(a, t, r) {
    super(a, t, r), this.name = "APIError";
  }
}
class v extends i {
  constructor(a, t, r) {
    super(a, t, r), this.name = "EngineError";
  }
}
class g extends i {
  body;
  constructor(a, t, r, n) {
    super(a, t, n), this.name = "FetchError", this.body = r;
  }
}
class b extends i {
  componentName;
  info;
  constructor(a, t, r, n, s) {
    super(a, t, s), this.name = "VueHandledError", this.info = r, this.componentName = n;
  }
}
class R extends i {
  constructor(a, t, r) {
    super(a, t, r), this.name = "WindowHandledRuntimeError";
  }
}
class A extends i {
  constructor(a, t, r) {
    super(a, t, r), this.name = "WindowHandledPromiseRejectionError";
  }
}
class O extends u {
  constructor(a, t, r) {
    super(a, t, r), this.name = "OperationalError";
  }
}
async function $(e, a, t) {
  const r = `${a} Response status '${e.status}${e.statusText ? ` - ${e.statusText}` : ""}' received.`, n = await e.text();
  return new g(r, t, n);
}
function _(e) {
  return e.map((a) => a.message).join(" ");
}
function F(e, a = "Unknown error.") {
  if (e instanceof Error) return e;
  if (typeof e == "string") return new Error(e);
  try {
    return new Error(JSON.stringify(e ?? a));
  } catch {
    return new Error(a);
  }
}
function L(e) {
  const a = /* @__PURE__ */ new Set(), t = [];
  let r = e;
  for (; r && !a.has(r); ) {
    a.add(r);
    let n;
    if (r instanceof g)
      n = { body: r.body, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof b)
      n = { componentName: r.componentName, info: r.info, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof u)
      n = { locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof Error) {
      const s = r;
      n = { locator: "", message: s.message, name: s.name, stack: s.stack }, r = s.cause;
    } else r ? (n = { locator: "", message: String(r), name: "Error" }, r = void 0) : (n = { locator: "", message: "Unknown error.", name: "Error" }, r = void 0);
    /(?:\.{3}|[.!?])$/.test(n.message) || (n.message += "."), t.push(n);
  }
  return t;
}
const m = "en-US", c = {}, k = (e) => {
  switch (e) {
    case "Edm.Binary":
      return "unknown";
    // Binary...
    case "Edm.Boolean":
      return "boolean";
    case "Edm.Byte":
      return "wholeNumber";
    case "Edm.DateTime":
      return "moment";
    // DateTime...
    case "Edm.DateTimeOffset":
      return "moment";
    // DateTimeOffset...
    case "Edm.Decimal":
      return "decimalNumber";
    case "Edm.Double":
      return "decimalNumber";
    case "Edm.Guid":
      return "string";
    case "Edm.Int16":
      return "wholeNumber";
    case "Edm.Int32":
      return "wholeNumber";
    case "Edm.Int64":
      return "wholeNumber";
    case "Edm.SByte":
      return "wholeNumber";
    case "Edm.Single":
      return "decimalNumber";
    case "Edm.String":
      return "string";
    case "Edm.Time":
      return "momentTime";
    // Time...
    default:
      return "unknown";
  }
}, B = (e) => {
  if (e) {
    const a = e.lastIndexOf("/"), t = e.lastIndexOf(".", a > -1 ? a : e.length);
    return t > -1 ? e.substring(0, t) : e;
  }
}, M = (e) => {
  if (e) {
    const a = e.lastIndexOf(".");
    if (a > -1) return e.substring(a + 1);
  }
}, o = (e, a = 2, t = a, r = m) => {
  if (e == null) return "";
  const n = `${r}decimal${a}.${t}`;
  let s = c[n];
  return s || (s = new Intl.NumberFormat(r, {
    localeMatcher: "best fit",
    maximumFractionDigits: a,
    minimumFractionDigits: t,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), c[n] = s), s.format(e);
}, j = (e) => e == null ? "" : e < 1e3 ? d(e) : e < 1e6 ? `${o(e / 1e3, 2, 0)}K` : e < 1e9 ? `${o(e / 1e6, 2, 0)}M` : e < 1e12 ? `${o(e / 1e9, 2, 0)}B` : `${o(e / 1e12, 2, 0)}T`, U = (e) => e == null ? "" : e === 1 ? "1 byte" : e < 1024 ? `${d(e)} bytes` : e < 1048576 ? `${o(e / 1024, 2, 0)} KB` : e < 1073741824 ? `${o(e / 1048576, 2, 0)} MB` : e < 1099511627776 ? `${o(e / 1073741824, 2, 0)} GB` : `${o(e / 1099511627776, 2, 0)} TB`, G = (e) => e == null ? "" : e < 1e3 ? `${d(e)} ms` : e === 1e3 ? `${d(e)} sec` : e < 6e4 ? `${o(e / 1e3, 2, 0)} secs` : e === 6e4 ? "1 min" : e < 36e5 ? `${o(e / 6e4, 2, 0)} mins` : e === 36e5 ? "1 hr" : e < 864e5 ? `${o(e / 36e5, 2, 0)} hrs` : e === 864e5 ? "1 day" : `${o(e / 864e5, 2, 0)} days`, d = (e, a = m) => {
  if (e == null) return "";
  const t = `${a}decimal0.0`;
  let r = c[t];
  return r || (r = new Intl.NumberFormat(a, {
    localeMatcher: "best fit",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), c[t] = r), r.format(e);
}, V = (e) => {
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
}, p = [
  { id: "dtv", label: { "en-gb": "Delimited Text" } },
  { id: "e/e", label: { "en-gb": "Entity/Event" } },
  { id: "jsonArray", label: { "en-gb": "JSON Array" } },
  { id: "spss", label: { "en-gb": "SPSS" } },
  { id: "xls", label: { "en-gb": "XLS" } },
  { id: "xlsx", label: { "en-gb": "XLSX" } },
  { id: "xml", label: { "en-gb": "XML" } }
], W = (e = l) => {
  const a = [];
  for (const t of p) a.push({ ...t, label: t.label[e] || t.label[l] || t.id });
  return a;
}, f = [
  { id: `
`, label: { "en-gb": "Newline" } },
  { id: "\r", label: { "en-gb": "Carriage Return" } },
  { id: `\r
`, label: { "en-gb": "Carriage Return/Newline" } }
], P = (e = l) => {
  const a = [];
  for (const t of f)
    a.push({ ...t, label: t.label[e] || t.label[l] || t.id });
  return a;
}, h = [
  { id: ":", label: { "en-gb": "Colon" } },
  { id: ",", label: { "en-gb": "Comma" } },
  { id: "!", label: { "en-gb": "Exclamation Mark" } },
  // { id: '', label: { 'en-gb': 'Other' } }, // TODO: Maybe set this to a 'not printing' or special ascii character when there is a user supplied delimited, rather than ''?
  { id: "0x1E", label: { "en-gb": "Record Separator" } },
  { id: ";", label: { "en-gb": "Semicolon" } },
  { id: " ", label: { "en-gb": "Space" } },
  { id: "	", label: { "en-gb": "Tab" } },
  { id: "_", label: { "en-gb": "Underscore" } },
  { id: "0x1F", label: { "en-gb": "Unit Separator" } },
  { id: "|", label: { "en-gb": "Vertical Bar" } }
], X = (e = l) => {
  const a = [];
  for (const t of h)
    a.push({ ...t, label: t.label[e] || t.label[l] || t.id });
  return a;
}, y = [
  { id: "alpha", color: "red", label: { "en-gb": "alpha" } },
  { id: "beta", color: "amber", label: { "en-gb": "beta" } },
  { id: "generalAvailability", color: "green", label: { "en-gb": "" } },
  { id: "notApplicable", color: "green", label: { "en-gb": "not-applicable" } },
  { id: "preAlpha", color: "red", label: { "en-gb": "pre-alpha" } },
  { id: "proposed", color: "other", label: { "en-gb": "proposed" } },
  { id: "releaseCandidate", color: "green", label: { "en-gb": "release-candidate" } },
  { id: "unavailable", color: "other", label: { "en-gb": "unavailable" } },
  { id: "underReview", color: "other", label: { "en-gb": "under-review" } }
], z = (e, a = l) => {
  const t = y.find((r) => r.id === e);
  return t ? { ...t, label: t.label[a] || t.label[l] || e } : { id: e, color: "other", label: e };
}, l = "en-gb";
export {
  T as APIError,
  i as ApplicationError,
  E as CONNECTOR_DESTINATION_OPERATIONS,
  I as CONNECTOR_SOURCE_OPERATIONS,
  l as DEFAULT_LOCALE_CODE,
  x as DefaultTimestamp,
  v as EngineError,
  g as FetchError,
  O as OperationalError,
  b as VueError,
  A as WindowPromiseRejectionError,
  R as WindowRuntimeError,
  $ as buildFetchError,
  _ as concatenateSerialisedErrorMessages,
  w as convertMillisecondsToTimestamp,
  k as convertODataTypeIdToUsageTypeId,
  M as extractExtensionFromPath,
  B as extractNameFromPath,
  o as formatNumberAsDecimalNumber,
  G as formatNumberAsDuration,
  j as formatNumberAsSize,
  U as formatNumberAsStorageSize,
  d as formatNumberAsWholeNumber,
  z as getComponentStatus,
  N as getCurrentTimestamp,
  W as getDataFormats,
  P as getRecordDelimiters,
  X as getValueDelimiters,
  V as lookupMimeTypeForExtension,
  F as normalizeToError,
  D as presentationViewTypeMap,
  L as serialiseError,
  C as useCytoscapeJS,
  S as useDataTable
};
