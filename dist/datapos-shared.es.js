const F = ["createObject", "dropObject", "removeRecords", "upsertRecords"], U = ["findObject", "getRecord", "listNodes", "previewObject", "retrieveRecords"];
function P() {
  function e(a, r, t) {
    t.textContent = "Cytoscape.js diagram goes here...";
  }
  return { render: e };
}
function B() {
  function e(a, r, t) {
    t.textContent = "values table goes here...";
  }
  return { render: e };
}
const v = "https://cdn.jsdelivr.net/npm/highcharts@11.4.3/es-modules/masters/", I = "highcharts";
let b, T = !1;
function W() {
  async function e(n, s, m, h) {
    await t();
    const l = [];
    for (const c of s.data.measures)
      l.push({ type: n.options.highchartsType, name: c.name, data: c.data });
    const p = {
      chart: { type: n.options.highchartsType },
      plotOptions: { series: { borderColor: "#333" } },
      series: l,
      title: { text: s.title.text },
      xAxis: { categories: s.data.categoryLabels },
      yAxis: { title: { text: s.data.name } }
    }, u = b.chart(m, p, h);
    return { chart: u, resize: () => u.reflow(), vendorId: I };
  }
  async function a(n, s, m, h) {
    await Promise.all([t(), o()]);
    const l = [];
    for (const c of s.data.measures)
      l.push({ type: n.options.highchartsType, name: c.name, data: c.data });
    const p = {
      chart: { polar: !0 },
      plotOptions: { series: { borderColor: "#333" } },
      series: l,
      title: { text: s.title.text },
      xAxis: { categories: s.data.categoryLabels },
      yAxis: { title: { text: s.data.name } }
    }, u = b.chart(m, p, h);
    return { chart: u, resize: () => u.reflow(), vendorId: I };
  }
  async function r(n, s, m, h) {
    await Promise.all([t(), o()]);
    const l = [], p = [];
    for (let f = 0; f < s.data.measures[0].data.length; f++)
      p.push([s.data.measures[0].data[f][0], s.data.measures[1].data[f][0]]);
    l.push({ type: n.options.highchartsType, name: "Unknown", data: p });
    const u = {
      chart: { type: n.options.highchartsType, inverted: n.options.inverted },
      plotOptions: { series: { borderColor: "#333" } },
      series: l,
      title: { text: s.title.text },
      xAxis: { categories: s.data.categoryLabels },
      yAxis: { title: { text: s.data.name } }
    }, c = b.chart(m, u, h);
    return { chart: c, resize: () => c.reflow(), vendorId: I };
  }
  async function t() {
    if (b) return;
    const n = "https://cdn.jsdelivr.net/npm/highcharts@11.4.3/es-modules/masters/", s = `${n}highcharts.src.js`, m = `${n}modules/accessibility.src.js`;
    b = (await import(
      /* @vite-ignore */
      s
    )).default, await import(
      /* @vite-ignore */
      m
    );
  }
  async function o() {
    if (T) return;
    await import(`${v}highcharts-more.src.js`), T = !0;
  }
  return { renderCartesianChart: e, renderPolarChart: a, renderRangeChart: r };
}
const A = 4, O = `https://cdn.jsdelivr.net/npm/micromark@${A}/+esm`, w = 1, N = `https://cdn.jsdelivr.net/npm/prismjs@${w}/+esm`, _ = `https://cdn.jsdelivr.net/npm/prismjs@${w}/components/prism-javascript.min.js`, C = `https://cdn.jsdelivr.net/npm/prismjs@${w}/components/prism-json.min.js`;
let x;
function H() {
  async function e() {
    return await r(), { micromark: x };
  }
  async function a() {
    await r();
  }
  async function r() {
    if (x) return;
    x = (await Promise.all([import(
      /* @vite-ignore */
      O
    ), import(
      /* @vite-ignore */
      N
    )]))[0].micromark, await Promise.all([import(
      /* @vite-ignore */
      _
    ), import(
      /* @vite-ignore */
      C
    )]);
  }
  return { getStuff: e, render: a };
}
const V = 0, z = (e) => e, X = () => Date.now(), G = {
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
class D extends Error {
  locator;
  constructor(a, r, t) {
    super(a, t), this.name = "DataPosError", this.locator = r, Error.captureStackTrace?.(this, new.target);
  }
}
class g extends D {
  constructor(a, r, t) {
    super(a, r, t), this.name = "ApplicationError";
  }
}
class J extends g {
  constructor(a, r, t) {
    super(a, r, t), this.name = "APIError";
  }
}
class K extends g {
  constructor(a, r, t) {
    super(a, r, t), this.name = "EngineError";
  }
}
class R extends g {
  body;
  constructor(a, r, t, o) {
    super(a, r, o), this.name = "FetchError", this.body = t;
  }
}
class L extends g {
  componentName;
  info;
  constructor(a, r, t, o, n) {
    super(a, r, n), this.name = "VueHandledError", this.info = t, this.componentName = o;
  }
}
class q extends g {
  constructor(a, r, t) {
    super(a, r, t), this.name = "WindowHandledRuntimeError";
  }
}
class Q extends g {
  constructor(a, r, t) {
    super(a, r, t), this.name = "WindowHandledPromiseRejectionError";
  }
}
class Y extends D {
  constructor(a, r, t) {
    super(a, r, t), this.name = "OperationalError";
  }
}
async function Z(e, a, r) {
  const t = `${a} Response status '${e.status}${e.statusText ? ` - ${e.statusText}` : ""}' received.`, o = await e.text();
  return new R(t, r, o);
}
function ee(e) {
  return e.map((a) => a.message).join(" ");
}
function te(e, a = "Unknown error.") {
  if (e instanceof Error) return e;
  if (typeof e == "string") return new Error(e);
  try {
    return new Error(JSON.stringify(e ?? a));
  } catch {
    return new Error(a);
  }
}
function re(e) {
  const a = /* @__PURE__ */ new Set(), r = [];
  let t = e;
  for (; t && !a.has(t); ) {
    a.add(t);
    let o;
    if (t instanceof R)
      o = { body: t.body, locator: t.locator, message: t.message, name: t.name, stack: t.stack }, t = t.cause;
    else if (t instanceof L)
      o = { componentName: t.componentName, info: t.info, locator: t.locator, message: t.message, name: t.name, stack: t.stack }, t = t.cause;
    else if (t instanceof D)
      o = { locator: t.locator, message: t.message, name: t.name, stack: t.stack }, t = t.cause;
    else if (t instanceof Error) {
      const n = t;
      o = { locator: "", message: n.message, name: n.name, stack: n.stack }, t = n.cause;
    } else t ? (o = { locator: "", message: String(t), name: "Error" }, t = void 0) : (o = { locator: "", message: "Unknown error.", name: "Error" }, t = void 0);
    /(?:\.{3}|[.!?])$/.test(o.message) || (o.message += "."), r.push(o);
  }
  return r;
}
const S = "en-US", y = {}, ae = (e) => {
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
}, ne = (e) => {
  if (e) {
    const a = e.lastIndexOf("/"), r = e.lastIndexOf(".", a > -1 ? a : e.length);
    return r > -1 ? e.substring(0, r) : e;
  }
}, oe = (e) => {
  if (e) {
    const a = e.lastIndexOf(".");
    if (a > -1) return e.substring(a + 1);
  }
}, i = (e, a = 2, r = a, t = S) => {
  if (e == null) return "";
  const o = `${t}decimal${a}.${r}`;
  let n = y[o];
  return n || (n = new Intl.NumberFormat(t, {
    localeMatcher: "best fit",
    maximumFractionDigits: a,
    minimumFractionDigits: r,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), y[o] = n), n.format(e);
}, se = (e) => e == null ? "" : e < 1e3 ? E(e) : e < 1e6 ? `${i(e / 1e3, 2, 0)}K` : e < 1e9 ? `${i(e / 1e6, 2, 0)}M` : e < 1e12 ? `${i(e / 1e9, 2, 0)}B` : `${i(e / 1e12, 2, 0)}T`, ie = (e) => e == null ? "" : e === 1 ? "1 byte" : e < 1024 ? `${E(e)} bytes` : e < 1048576 ? `${i(e / 1024, 2, 0)} KB` : e < 1073741824 ? `${i(e / 1048576, 2, 0)} MB` : e < 1099511627776 ? `${i(e / 1073741824, 2, 0)} GB` : `${i(e / 1099511627776, 2, 0)} TB`, le = (e) => e == null ? "" : e < 1e3 ? `${E(e)} ms` : e === 1e3 ? `${E(e)} sec` : e < 6e4 ? `${i(e / 1e3, 2, 0)} secs` : e === 6e4 ? "1 min" : e < 36e5 ? `${i(e / 6e4, 2, 0)} mins` : e === 36e5 ? "1 hr" : e < 864e5 ? `${i(e / 36e5, 2, 0)} hrs` : e === 864e5 ? "1 day" : `${i(e / 864e5, 2, 0)} days`, E = (e, a = S) => {
  if (e == null) return "";
  const r = `${a}decimal0.0`;
  let t = y[r];
  return t || (t = new Intl.NumberFormat(a, {
    localeMatcher: "best fit",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), y[r] = t), t.format(e);
}, ce = (e) => {
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
}, $ = [
  { id: "dtv", label: { "en-gb": "Delimited Text" } },
  { id: "e/e", label: { "en-gb": "Entity/Event" } },
  { id: "jsonArray", label: { "en-gb": "JSON Array" } },
  { id: "spss", label: { "en-gb": "SPSS" } },
  { id: "xls", label: { "en-gb": "XLS" } },
  { id: "xlsx", label: { "en-gb": "XLSX" } },
  { id: "xml", label: { "en-gb": "XML" } }
], de = (e = d) => {
  const a = [];
  for (const r of $) a.push({ ...r, label: r.label[e] || r.label[d] || r.id });
  return a;
}, M = [
  { id: `
`, label: { "en-gb": "Newline" } },
  { id: "\r", label: { "en-gb": "Carriage Return" } },
  { id: `\r
`, label: { "en-gb": "Carriage Return/Newline" } }
], me = (e = d) => {
  const a = [];
  for (const r of M)
    a.push({ ...r, label: r.label[e] || r.label[d] || r.id });
  return a;
}, j = [
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
], ue = (e = d) => {
  const a = [];
  for (const r of j)
    a.push({ ...r, label: r.label[e] || r.label[d] || r.id });
  return a;
}, k = [
  { id: "alpha", color: "red", label: { "en-gb": "alpha" } },
  { id: "beta", color: "amber", label: { "en-gb": "beta" } },
  { id: "generalAvailability", color: "green", label: { "en-gb": "" } },
  { id: "notApplicable", color: "green", label: { "en-gb": "not-applicable" } },
  { id: "preAlpha", color: "red", label: { "en-gb": "pre-alpha" } },
  { id: "proposed", color: "other", label: { "en-gb": "proposed" } },
  { id: "releaseCandidate", color: "green", label: { "en-gb": "release-candidate" } },
  { id: "unavailable", color: "other", label: { "en-gb": "unavailable" } },
  { id: "underReview", color: "other", label: { "en-gb": "under-review" } }
], pe = (e, a = d) => {
  const r = k.find((t) => t.id === e);
  return r ? { ...r, label: r.label[a] || r.label[d] || e } : { id: e, color: "other", label: e };
}, d = "en-gb";
export {
  J as APIError,
  g as ApplicationError,
  F as CONNECTOR_DESTINATION_OPERATIONS,
  U as CONNECTOR_SOURCE_OPERATIONS,
  d as DEFAULT_LOCALE_CODE,
  V as DefaultTimestamp,
  K as EngineError,
  R as FetchError,
  Y as OperationalError,
  L as VueError,
  Q as WindowPromiseRejectionError,
  q as WindowRuntimeError,
  Z as buildFetchError,
  ee as concatenateSerialisedErrorMessages,
  z as convertMillisecondsToTimestamp,
  ae as convertODataTypeIdToUsageTypeId,
  oe as extractExtensionFromPath,
  ne as extractNameFromPath,
  i as formatNumberAsDecimalNumber,
  le as formatNumberAsDuration,
  se as formatNumberAsSize,
  ie as formatNumberAsStorageSize,
  E as formatNumberAsWholeNumber,
  pe as getComponentStatus,
  X as getCurrentTimestamp,
  de as getDataFormats,
  me as getRecordDelimiters,
  ue as getValueDelimiters,
  ce as lookupMimeTypeForExtension,
  te as normalizeToError,
  G as presentationViewTypeMap,
  re as serialiseError,
  P as useCytoscapeJS,
  B as useDataTable,
  W as useHighcharts,
  H as useMicromark
};
