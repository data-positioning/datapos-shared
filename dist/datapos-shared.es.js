const E = ["createObject", "dropObject", "removeRecords", "upsertRecords"], I = ["findObject", "getRecord", "listNodes", "previewObject", "retrieveRecords"];
function x() {
  function e(t, a, r) {
    r.textContent = "Cytoscape.js diagram goes here...";
  }
  return { render: e };
}
function T() {
  function e(t, a, r) {
    r.textContent = "values table goes here...";
  }
  return { render: e };
}
const S = 0, N = (e) => e, w = () => Date.now(), D = {
  cartesian_areaLine: { categoryId: "cartesian", typeId: "areaLine", label: { "en-gb": "Area Line" }, options: { highchartsType: "area" } },
  cartesian_areaSpline: { categoryId: "cartesian", typeId: "areaSpline", label: { "en-gb": "Area Spline" }, options: { highchartsType: "area" } },
  cartesian_bar: { categoryId: "cartesian", typeId: "bar", label: { "en-gb": "Bar" }, options: { highchartsType: "bar" } },
  cartesian_column: { categoryId: "cartesian", typeId: "column", label: { "en-gb": "Column" }, options: { highchartsType: "column" } },
  cartesian_line: { categoryId: "cartesian", typeId: "line", label: { "en-gb": "Line" }, options: { highchartsType: "line" } },
  cartesian_pyramid: { categoryId: "cartesian", typeId: "line", label: { "en-gb": "Pyramid" }, options: { highchartsType: "line" } },
  cartesian_spline: { categoryId: "cartesian", typeId: "line", label: { "en-gb": "Spline" }, options: { highchartsType: "line" } },
  chordDiagram: { categoryId: "chordDiagram", label: { "en-gb": "Chord Diagram" }, options: {} },
  polar_area: { categoryId: "polar", typeId: "area", label: { "en-gb": "Radar (Area)" }, options: { highchartsType: "area" } },
  polar_column: { categoryId: "polar", typeId: "column", label: { "en-gb": "Radar (Column)" }, options: { highchartsType: "column" } },
  polar_line: { categoryId: "polar", typeId: "line", label: { "en-gb": "Radar (Line)" }, options: { highchartsType: "line" } },
  range_area: { categoryId: "range", typeId: "area", label: { "en-gb": "Range (Area)" }, options: { highchartsType: "arearange" } },
  range_bar: { categoryId: "range", typeId: "bar", label: { "en-gb": "Range (Bar)" }, options: { highchartsType: "columnrange", inverted: !0 } },
  range_column: { categoryId: "range", typeId: "column", label: { "en-gb": "Range (Column)" }, options: { highchartsType: "columnrange" } },
  sankeyDiagram: { categoryId: "sankeyDiagram", label: { "en-gb": "Sankey Diagram" }, options: {} },
  streamgraph: { categoryId: "streamgraph", label: { "en-gb": "Streamgraph" }, options: {} },
  values: { categoryId: "values", label: { "en-gb": "Values" }, options: {} }
};
class g extends Error {
  locator;
  constructor(t, a, r) {
    super(t, r), this.name = "DataPosError", this.locator = a, Error.captureStackTrace?.(this, new.target);
  }
}
class l extends g {
  constructor(t, a, r) {
    super(t, a, r), this.name = "ApplicationError";
  }
}
class v extends l {
  constructor(t, a, r) {
    super(t, a, r), this.name = "APIError";
  }
}
class C extends l {
  constructor(t, a, r) {
    super(t, a, r), this.name = "EngineError";
  }
}
class u extends l {
  body;
  constructor(t, a, r, n) {
    super(t, a, n), this.name = "FetchError", this.body = r;
  }
}
class p extends l {
  componentName;
  info;
  constructor(t, a, r, n, s) {
    super(t, a, s), this.name = "VueHandledError", this.info = r, this.componentName = n;
  }
}
class O extends l {
  constructor(t, a, r) {
    super(t, a, r), this.name = "WindowHandledRuntimeError";
  }
}
class R extends l {
  constructor(t, a, r) {
    super(t, a, r), this.name = "WindowHandledPromiseRejectionError";
  }
}
class $ extends g {
  constructor(t, a, r) {
    super(t, a, r), this.name = "OperationalError";
  }
}
async function A(e, t, a) {
  const r = `${t} Response status '${e.status}${e.statusText ? ` - ${e.statusText}` : ""}' received.`, n = await e.text();
  return new u(r, a, n);
}
function _(e) {
  return e.map((t) => t.message).join(" ");
}
function F(e, t = "Unknown error.") {
  if (e instanceof Error) return e;
  if (typeof e == "string") return new Error(e);
  try {
    return new Error(JSON.stringify(e ?? t));
  } catch {
    return new Error(t);
  }
}
function k(e) {
  const t = /* @__PURE__ */ new Set(), a = [];
  let r = e;
  for (; r && !t.has(r); ) {
    t.add(r);
    let n;
    if (r instanceof u)
      n = { body: r.body, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof p)
      n = { componentName: r.componentName, info: r.info, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof g)
      n = { locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof Error) {
      const s = r;
      n = { locator: "", message: s.message, name: s.name, stack: s.stack }, r = s.cause;
    } else r ? (n = { locator: "", message: String(r), name: "Error" }, r = void 0) : (n = { locator: "", message: "Unknown error.", name: "Error" }, r = void 0);
    /(?:\.{3}|[.!?])$/.test(n.message) || (n.message += "."), a.push(n);
  }
  return a;
}
const m = "en-US", c = {}, B = (e) => {
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
}, L = (e) => {
  if (e) {
    const t = e.lastIndexOf("/"), a = e.lastIndexOf(".", t > -1 ? t : e.length);
    return a > -1 ? e.substring(0, a) : e;
  }
}, M = (e) => {
  if (e) {
    const t = e.lastIndexOf(".");
    if (t > -1) return e.substring(t + 1);
  }
}, o = (e, t = 2, a = t, r = m) => {
  if (e == null) return "";
  const n = `${r}decimal${t}.${a}`;
  let s = c[n];
  return s || (s = new Intl.NumberFormat(r, {
    localeMatcher: "best fit",
    maximumFractionDigits: t,
    minimumFractionDigits: a,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), c[n] = s), s.format(e);
}, j = (e) => e == null ? "" : e < 1e3 ? d(e) : e < 1e6 ? `${o(e / 1e3, 2, 0)}K` : e < 1e9 ? `${o(e / 1e6, 2, 0)}M` : e < 1e12 ? `${o(e / 1e9, 2, 0)}B` : `${o(e / 1e12, 2, 0)}T`, U = (e) => e == null ? "" : e === 1 ? "1 byte" : e < 1024 ? `${d(e)} bytes` : e < 1048576 ? `${o(e / 1024, 2, 0)} KB` : e < 1073741824 ? `${o(e / 1048576, 2, 0)} MB` : e < 1099511627776 ? `${o(e / 1073741824, 2, 0)} GB` : `${o(e / 1099511627776, 2, 0)} TB`, V = (e) => e == null ? "" : e < 1e3 ? `${d(e)} ms` : e === 1e3 ? `${d(e)} sec` : e < 6e4 ? `${o(e / 1e3, 2, 0)} secs` : e === 6e4 ? "1 min" : e < 36e5 ? `${o(e / 6e4, 2, 0)} mins` : e === 36e5 ? "1 hr" : e < 864e5 ? `${o(e / 36e5, 2, 0)} hrs` : e === 864e5 ? "1 day" : `${o(e / 864e5, 2, 0)} days`, d = (e, t = m) => {
  if (e == null) return "";
  const a = `${t}decimal0.0`;
  let r = c[a];
  return r || (r = new Intl.NumberFormat(t, {
    localeMatcher: "best fit",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), c[a] = r), r.format(e);
}, W = (e) => {
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
}, b = [
  { id: "dtv", label: { "en-gb": "Delimited Text" } },
  { id: "e/e", label: { "en-gb": "Entity/Event" } },
  { id: "jsonArray", label: { "en-gb": "JSON Array" } },
  { id: "spss", label: { "en-gb": "SPSS" } },
  { id: "xls", label: { "en-gb": "XLS" } },
  { id: "xlsx", label: { "en-gb": "XLSX" } },
  { id: "xml", label: { "en-gb": "XML" } }
], G = (e = i) => {
  const t = [];
  for (const a of b) t.push({ ...a, label: a.label[e] || a.label[i] || a.id });
  return t;
}, h = [
  { id: `
`, label: { "en-gb": "Newline" } },
  { id: "\r", label: { "en-gb": "Carriage Return" } },
  { id: `\r
`, label: { "en-gb": "Carriage Return/Newline" } }
], X = (e = i) => {
  const t = [];
  for (const a of h)
    t.push({ ...a, label: a.label[e] || a.label[i] || a.id });
  return t;
}, f = [
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
], z = (e = i) => {
  const t = [];
  for (const a of f)
    t.push({ ...a, label: a.label[e] || a.label[i] || a.id });
  return t;
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
], H = (e, t = i) => {
  const a = y.find((r) => r.id === e);
  return a ? { ...a, label: a.label[t] || a.label[i] || e } : { id: e, color: "other", label: e };
}, i = "en-gb";
export {
  v as APIError,
  l as ApplicationError,
  E as CONNECTOR_DESTINATION_OPERATIONS,
  I as CONNECTOR_SOURCE_OPERATIONS,
  i as DEFAULT_LOCALE_CODE,
  S as DefaultTimestamp,
  C as EngineError,
  u as FetchError,
  $ as OperationalError,
  p as VueError,
  R as WindowPromiseRejectionError,
  O as WindowRuntimeError,
  A as buildFetchError,
  _ as concatenateSerialisedErrorMessages,
  N as convertMillisecondsToTimestamp,
  B as convertODataTypeIdToUsageTypeId,
  M as extractExtensionFromPath,
  L as extractNameFromPath,
  o as formatNumberAsDecimalNumber,
  V as formatNumberAsDuration,
  j as formatNumberAsSize,
  U as formatNumberAsStorageSize,
  d as formatNumberAsWholeNumber,
  H as getComponentStatus,
  w as getCurrentTimestamp,
  G as getDataFormats,
  X as getRecordDelimiters,
  z as getValueDelimiters,
  W as lookupMimeTypeForExtension,
  F as normalizeToError,
  D as presentationViewTypeMap,
  k as serialiseError,
  x as useCytoscapeJS,
  T as useDataTable
};
