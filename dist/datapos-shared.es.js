const x = ["createObject", "dropObject", "removeRecords", "upsertRecords"], w = ["findObject", "getRecord", "listNodes", "previewObject", "retrieveRecords"];
function N() {
  function e(n, t, r) {
    r.textContent = "Cytoscape.js diagram goes here...";
  }
  return { render: e };
}
function y() {
  function e(n, t) {
    console.log(1111, n), console.log(2222, t), console.log(3333, t.childNodes), console.log(4444, t.children);
  }
  return { render: e };
}
const S = 0, T = (e) => e, D = () => Date.now();
class u extends Error {
  locator;
  constructor(n, t, r) {
    super(n, r), this.name = "DataPosError", this.locator = t, Error.captureStackTrace?.(this, new.target);
  }
}
class l extends u {
  constructor(n, t, r) {
    super(n, t, r), this.name = "ApplicationError";
  }
}
class O extends l {
  constructor(n, t, r) {
    super(n, t, r), this.name = "APIError";
  }
}
class $ extends l {
  constructor(n, t, r) {
    super(n, t, r), this.name = "EngineError";
  }
}
class m extends l {
  body;
  constructor(n, t, r, o) {
    super(n, t, o), this.name = "FetchError", this.body = r;
  }
}
class g extends l {
  componentName;
  info;
  constructor(n, t, r, o, s) {
    super(n, t, s), this.name = "VueHandledError", this.info = r, this.componentName = o;
  }
}
class I extends l {
  constructor(n, t, r) {
    super(n, t, r), this.name = "WindowHandledRuntimeError";
  }
}
class v extends l {
  constructor(n, t, r) {
    super(n, t, r), this.name = "WindowHandledPromiseRejectionError";
  }
}
class A extends u {
  constructor(n, t, r) {
    super(n, t, r), this.name = "OperationalError";
  }
}
async function C(e, n, t) {
  const r = `${n} Response status '${e.status}${e.statusText ? ` - ${e.statusText}` : ""}' received.`, o = await e.text();
  return new m(r, t, o);
}
function F(e) {
  return e.map((n) => n.message).join(" ");
}
function R(e) {
  if (e instanceof Error) return e;
  if (typeof e == "string") return new Error(e);
  if (typeof e == "number" || typeof e == "boolean" || typeof e == "bigint") return new Error(String(e));
  if (typeof e == "symbol") return new Error(e.description ?? "Unknown error");
  if (e && typeof e == "object")
    try {
      return new Error(JSON.stringify(e));
    } catch {
      return new Error("Unknown error");
    }
  return new Error("Unknown error");
}
function k(e) {
  const n = /* @__PURE__ */ new Set(), t = [];
  let r = e;
  for (; r && !n.has(r); ) {
    n.add(r);
    let o;
    if (r instanceof m)
      o = { body: r.body, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof g)
      o = { componentName: r.componentName, info: r.info, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof u)
      o = { locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof Error) {
      const s = r;
      o = { locator: "", message: s.message, name: s.name, stack: s.stack }, r = s.cause;
    } else r ? (o = { locator: "", message: String(r), name: "Error" }, r = void 0) : (o = { locator: "", message: "Unknown error.", name: "Error" }, r = void 0);
    /(?:\.{3}|[.!?])$/.test(o.message) || (o.message += "."), t.push(o);
  }
  return t;
}
const f = "en-US", c = {};
function B(e) {
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
}
function M(e) {
  if (e) {
    const n = e.lastIndexOf("/"), t = e.lastIndexOf(".", n > -1 ? n : e.length);
    return t > -1 ? e.substring(0, t) : e;
  }
}
function j(e) {
  if (e) {
    const n = e.lastIndexOf(".");
    if (n > -1) return e.substring(n + 1);
  }
}
function a(e, n = 2, t = n, r = f) {
  if (e == null) return "";
  const o = `${r}decimal${n}.${t}`;
  let s = c[o];
  return s || (s = new Intl.NumberFormat(r, {
    localeMatcher: "best fit",
    maximumFractionDigits: n,
    minimumFractionDigits: t,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), c[o] = s), s.format(e);
}
function U(e) {
  return e == null ? "" : e < 1e3 ? d(e) : e < 1e6 ? `${a(e / 1e3, 2, 0)}K` : e < 1e9 ? `${a(e / 1e6, 2, 0)}M` : e < 1e12 ? `${a(e / 1e9, 2, 0)}B` : `${a(e / 1e12, 2, 0)}T`;
}
function L(e) {
  return e == null ? "" : e === 1 ? "1 byte" : e < 1024 ? `${d(e)} bytes` : e < 1048576 ? `${a(e / 1024, 2, 0)} KB` : e < 1073741824 ? `${a(e / 1048576, 2, 0)} MB` : e < 1099511627776 ? `${a(e / 1073741824, 2, 0)} GB` : `${a(e / 1099511627776, 2, 0)} TB`;
}
function _(e) {
  return e == null ? "" : e < 1e3 ? `${d(e)} ms` : e === 1e3 ? `${d(e)} sec` : e < 6e4 ? `${a(e / 1e3, 2, 0)} secs` : e === 6e4 ? "1 min" : e < 36e5 ? `${a(e / 6e4, 2, 0)} mins` : e === 36e5 ? "1 hr" : e < 864e5 ? `${a(e / 36e5, 2, 0)} hrs` : e === 864e5 ? "1 day" : `${a(e / 864e5, 2, 0)} days`;
}
function d(e, n = f) {
  if (e == null) return "";
  const t = `${n}decimal0.0`;
  let r = c[t];
  return r || (r = new Intl.NumberFormat(n, {
    localeMatcher: "best fit",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), c[t] = r), r.format(e);
}
function W(e) {
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
}
const b = [
  { id: "dtv", label: { "en-gb": "Delimited Text" } },
  { id: "e/e", label: { "en-gb": "Entity/Event" } },
  { id: "jsonArray", label: { "en-gb": "JSON Array" } },
  { id: "spss", label: { "en-gb": "SPSS" } },
  { id: "xls", label: { "en-gb": "XLS" } },
  { id: "xlsx", label: { "en-gb": "XLSX" } },
  { id: "xml", label: { "en-gb": "XML" } }
], G = (e = i) => {
  const n = [];
  for (const t of b) n.push({ ...t, label: t.label[e] || t.label[i] || t.id });
  return n;
}, p = [
  { id: `
`, label: { "en-gb": "Newline" } },
  { id: "\r", label: { "en-gb": "Carriage Return" } },
  { id: `\r
`, label: { "en-gb": "Carriage Return/Newline" } }
], V = (e = i) => {
  const n = [];
  for (const t of p)
    n.push({ ...t, label: t.label[e] || t.label[i] || t.id });
  return n;
}, E = [
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
], X = (e = i) => {
  const n = [];
  for (const t of E)
    n.push({ ...t, label: t.label[e] || t.label[i] || t.id });
  return n;
}, h = [
  { id: "alpha", color: "red", label: { "en-gb": "alpha" } },
  { id: "beta", color: "amber", label: { "en-gb": "beta" } },
  { id: "generalAvailability", color: "green", label: { "en-gb": "" } },
  { id: "notApplicable", color: "green", label: { "en-gb": "not-applicable" } },
  { id: "preAlpha", color: "red", label: { "en-gb": "pre-alpha" } },
  { id: "proposed", color: "other", label: { "en-gb": "proposed" } },
  { id: "releaseCandidate", color: "green", label: { "en-gb": "release-candidate" } },
  { id: "unavailable", color: "other", label: { "en-gb": "unavailable" } },
  { id: "underReview", color: "other", label: { "en-gb": "under-review" } }
], z = (e, n = i) => {
  const t = h.find((r) => r.id === e);
  return t ? { ...t, label: t.label[n] || t.label[i] || e } : { id: e, color: "other", label: e };
}, i = "en-gb";
export {
  O as APIError,
  l as ApplicationError,
  x as CONNECTOR_DESTINATION_OPERATIONS,
  w as CONNECTOR_SOURCE_OPERATIONS,
  i as DEFAULT_LOCALE_CODE,
  S as DefaultTimestamp,
  $ as EngineError,
  m as FetchError,
  A as OperationalError,
  g as VueError,
  v as WindowPromiseRejectionError,
  I as WindowRuntimeError,
  C as buildFetchError,
  F as concatenateSerialisedErrorMessages,
  T as convertMillisecondsToTimestamp,
  B as convertODataTypeIdToUsageTypeId,
  j as extractExtensionFromPath,
  M as extractNameFromPath,
  a as formatNumberAsDecimalNumber,
  _ as formatNumberAsDuration,
  U as formatNumberAsSize,
  L as formatNumberAsStorageSize,
  d as formatNumberAsWholeNumber,
  z as getComponentStatus,
  D as getCurrentTimestamp,
  G as getDataFormats,
  V as getRecordDelimiters,
  X as getValueDelimiters,
  W as lookupMimeTypeForExtension,
  R as normalizeToError,
  k as serialiseError,
  N as useCytoscapeJS,
  y as useDataTable
};
