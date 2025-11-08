const C = ["createObject", "dropObject", "removeRecords", "upsertRecords"], $ = ["findObject", "getRecord", "listNodes", "previewObject", "retrieveRecords"];
function _() {
  function e(t, a, r) {
    r.textContent = "Cytoscape.js diagram goes here...";
  }
  return { render: e };
}
function L() {
  function e(t, a, r) {
    r.textContent = "values table goes here...";
  }
  return { render: e };
}
const v = "https://cdn.jsdelivr.net/npm/highcharts@11.4.3/es-modules/masters/", x = "highcharts";
let b, T = !1;
function F() {
  async function e(n, s, u, h) {
    await r();
    const l = [];
    for (const c of s.data.measures)
      l.push({ type: n.options.highchartsType, name: c.name, data: c.data });
    const g = {
      chart: { type: n.options.highchartsType },
      plotOptions: { series: { borderColor: "#333" } },
      series: l,
      title: { text: s.title.text },
      xAxis: { categories: s.data.categoryLabels },
      yAxis: { title: { text: s.data.name } }
    }, m = b.chart(u, g, h);
    return { chart: m, resize: () => m.reflow(), vendorId: x };
  }
  async function t(n, s, u, h) {
    await Promise.all([r(), o()]);
    const l = [];
    for (const c of s.data.measures)
      l.push({ type: n.options.highchartsType, name: c.name, data: c.data });
    const g = {
      chart: { polar: !0 },
      plotOptions: { series: { borderColor: "#333" } },
      series: l,
      title: { text: s.title.text },
      xAxis: { categories: s.data.categoryLabels },
      yAxis: { title: { text: s.data.name } }
    }, m = b.chart(u, g, h);
    return { chart: m, resize: () => m.reflow(), vendorId: x };
  }
  async function a(n, s, u, h) {
    await Promise.all([r(), o()]);
    const l = [], g = [];
    for (let f = 0; f < s.data.measures[0].data.length; f++)
      g.push([s.data.measures[0].data[f][0], s.data.measures[1].data[f][0]]);
    l.push({ type: n.options.highchartsType, name: "Unknown", data: g });
    const m = {
      chart: { type: n.options.highchartsType, inverted: n.options.inverted },
      plotOptions: { series: { borderColor: "#333" } },
      series: l,
      title: { text: s.title.text },
      xAxis: { categories: s.data.categoryLabels },
      yAxis: { title: { text: s.data.name } }
    }, c = b.chart(u, m, h);
    return { chart: c, resize: () => c.reflow(), vendorId: x };
  }
  async function r() {
    if (b) return;
    const n = "https://cdn.jsdelivr.net/npm/highcharts@11.4.3/es-modules/masters/", s = `${n}highcharts.src.js`, u = `${n}modules/accessibility.src.js`;
    b = (await import(
      /* @vite-ignore */
      s
    )).default, await import(
      /* @vite-ignore */
      u
    );
  }
  async function o() {
    if (T) return;
    await import(`${v}highcharts-more.src.js`), T = !0;
  }
  return { renderCartesianChart: e, renderPolarChart: t, renderRangeChart: a };
}
const k = 0, M = (e) => e, U = () => Date.now(), j = {
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
class I extends Error {
  locator;
  constructor(t, a, r) {
    super(t, r), this.name = "DataPosError", this.locator = a, Error.captureStackTrace?.(this, new.target);
  }
}
class p extends I {
  constructor(t, a, r) {
    super(t, a, r), this.name = "ApplicationError";
  }
}
class B extends p {
  constructor(t, a, r) {
    super(t, a, r), this.name = "APIError";
  }
}
class H extends p {
  constructor(t, a, r) {
    super(t, a, r), this.name = "EngineError";
  }
}
class w extends p {
  body;
  constructor(t, a, r, o) {
    super(t, a, o), this.name = "FetchError", this.body = r;
  }
}
class S extends p {
  componentName;
  info;
  constructor(t, a, r, o, n) {
    super(t, a, n), this.name = "VueHandledError", this.info = r, this.componentName = o;
  }
}
class P extends p {
  constructor(t, a, r) {
    super(t, a, r), this.name = "WindowHandledRuntimeError";
  }
}
class W extends p {
  constructor(t, a, r) {
    super(t, a, r), this.name = "WindowHandledPromiseRejectionError";
  }
}
class z extends I {
  constructor(t, a, r) {
    super(t, a, r), this.name = "OperationalError";
  }
}
async function V(e, t, a) {
  const r = `${t} Response status '${e.status}${e.statusText ? ` - ${e.statusText}` : ""}' received.`, o = await e.text();
  return new w(r, a, o);
}
function X(e) {
  return e.map((t) => t.message).join(" ");
}
function G(e, t = "Unknown error.") {
  if (e instanceof Error) return e;
  if (typeof e == "string") return new Error(e);
  try {
    return new Error(JSON.stringify(e ?? t));
  } catch {
    return new Error(t);
  }
}
function J(e) {
  const t = /* @__PURE__ */ new Set(), a = [];
  let r = e;
  for (; r && !t.has(r); ) {
    t.add(r);
    let o;
    if (r instanceof w)
      o = { body: r.body, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof S)
      o = { componentName: r.componentName, info: r.info, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof I)
      o = { locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof Error) {
      const n = r;
      o = { locator: "", message: n.message, name: n.name, stack: n.stack }, r = n.cause;
    } else r ? (o = { locator: "", message: String(r), name: "Error" }, r = void 0) : (o = { locator: "", message: "Unknown error.", name: "Error" }, r = void 0);
    /(?:\.{3}|[.!?])$/.test(o.message) || (o.message += "."), a.push(o);
  }
  return a;
}
const D = "en-US", y = {}, K = (e) => {
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
}, q = (e) => {
  if (e) {
    const t = e.lastIndexOf("/"), a = e.lastIndexOf(".", t > -1 ? t : e.length);
    return a > -1 ? e.substring(0, a) : e;
  }
}, Q = (e) => {
  if (e) {
    const t = e.lastIndexOf(".");
    if (t > -1) return e.substring(t + 1);
  }
}, i = (e, t = 2, a = t, r = D) => {
  if (e == null) return "";
  const o = `${r}decimal${t}.${a}`;
  let n = y[o];
  return n || (n = new Intl.NumberFormat(r, {
    localeMatcher: "best fit",
    maximumFractionDigits: t,
    minimumFractionDigits: a,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), y[o] = n), n.format(e);
}, Y = (e) => e == null ? "" : e < 1e3 ? E(e) : e < 1e6 ? `${i(e / 1e3, 2, 0)}K` : e < 1e9 ? `${i(e / 1e6, 2, 0)}M` : e < 1e12 ? `${i(e / 1e9, 2, 0)}B` : `${i(e / 1e12, 2, 0)}T`, Z = (e) => e == null ? "" : e === 1 ? "1 byte" : e < 1024 ? `${E(e)} bytes` : e < 1048576 ? `${i(e / 1024, 2, 0)} KB` : e < 1073741824 ? `${i(e / 1048576, 2, 0)} MB` : e < 1099511627776 ? `${i(e / 1073741824, 2, 0)} GB` : `${i(e / 1099511627776, 2, 0)} TB`, ee = (e) => e == null ? "" : e < 1e3 ? `${E(e)} ms` : e === 1e3 ? `${E(e)} sec` : e < 6e4 ? `${i(e / 1e3, 2, 0)} secs` : e === 6e4 ? "1 min" : e < 36e5 ? `${i(e / 6e4, 2, 0)} mins` : e === 36e5 ? "1 hr" : e < 864e5 ? `${i(e / 36e5, 2, 0)} hrs` : e === 864e5 ? "1 day" : `${i(e / 864e5, 2, 0)} days`, E = (e, t = D) => {
  if (e == null) return "";
  const a = `${t}decimal0.0`;
  let r = y[a];
  return r || (r = new Intl.NumberFormat(t, {
    localeMatcher: "best fit",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), y[a] = r), r.format(e);
}, re = (e) => {
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
}, N = [
  { id: "dtv", label: { "en-gb": "Delimited Text" } },
  { id: "e/e", label: { "en-gb": "Entity/Event" } },
  { id: "jsonArray", label: { "en-gb": "JSON Array" } },
  { id: "spss", label: { "en-gb": "SPSS" } },
  { id: "xls", label: { "en-gb": "XLS" } },
  { id: "xlsx", label: { "en-gb": "XLSX" } },
  { id: "xml", label: { "en-gb": "XML" } }
], te = (e = d) => {
  const t = [];
  for (const a of N) t.push({ ...a, label: a.label[e] || a.label[d] || a.id });
  return t;
}, R = [
  { id: `
`, label: { "en-gb": "Newline" } },
  { id: "\r", label: { "en-gb": "Carriage Return" } },
  { id: `\r
`, label: { "en-gb": "Carriage Return/Newline" } }
], ae = (e = d) => {
  const t = [];
  for (const a of R)
    t.push({ ...a, label: a.label[e] || a.label[d] || a.id });
  return t;
}, A = [
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
], ne = (e = d) => {
  const t = [];
  for (const a of A)
    t.push({ ...a, label: a.label[e] || a.label[d] || a.id });
  return t;
}, O = [
  { id: "alpha", color: "red", label: { "en-gb": "alpha" } },
  { id: "beta", color: "amber", label: { "en-gb": "beta" } },
  { id: "generalAvailability", color: "green", label: { "en-gb": "" } },
  { id: "notApplicable", color: "green", label: { "en-gb": "not-applicable" } },
  { id: "preAlpha", color: "red", label: { "en-gb": "pre-alpha" } },
  { id: "proposed", color: "other", label: { "en-gb": "proposed" } },
  { id: "releaseCandidate", color: "green", label: { "en-gb": "release-candidate" } },
  { id: "unavailable", color: "other", label: { "en-gb": "unavailable" } },
  { id: "underReview", color: "other", label: { "en-gb": "under-review" } }
], oe = (e, t = d) => {
  const a = O.find((r) => r.id === e);
  return a ? { ...a, label: a.label[t] || a.label[d] || e } : { id: e, color: "other", label: e };
}, d = "en-gb";
export {
  B as APIError,
  p as ApplicationError,
  C as CONNECTOR_DESTINATION_OPERATIONS,
  $ as CONNECTOR_SOURCE_OPERATIONS,
  d as DEFAULT_LOCALE_CODE,
  k as DefaultTimestamp,
  H as EngineError,
  w as FetchError,
  z as OperationalError,
  S as VueError,
  W as WindowPromiseRejectionError,
  P as WindowRuntimeError,
  V as buildFetchError,
  X as concatenateSerialisedErrorMessages,
  M as convertMillisecondsToTimestamp,
  K as convertODataTypeIdToUsageTypeId,
  Q as extractExtensionFromPath,
  q as extractNameFromPath,
  i as formatNumberAsDecimalNumber,
  ee as formatNumberAsDuration,
  Y as formatNumberAsSize,
  Z as formatNumberAsStorageSize,
  E as formatNumberAsWholeNumber,
  oe as getComponentStatus,
  U as getCurrentTimestamp,
  te as getDataFormats,
  ae as getRecordDelimiters,
  ne as getValueDelimiters,
  re as lookupMimeTypeForExtension,
  G as normalizeToError,
  j as presentationViewTypeMap,
  J as serialiseError,
  _ as useCytoscapeJS,
  L as useDataTable,
  F as useHighcharts
};
