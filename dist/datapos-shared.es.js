const U = ["createObject", "dropObject", "removeRecords", "upsertRecords"], P = ["findObject", "getRecord", "listNodes", "previewObject", "retrieveRecords"];
function B() {
  function e(r, a, t) {
    t.textContent = "Cytoscape.js diagram goes here...";
  }
  return { render: e };
}
function W() {
  function e(r, a, t) {
    t.textContent = "values table goes here...";
  }
  return { render: e };
}
const A = "https://cdn.jsdelivr.net/npm/highcharts@11.4.3/es-modules/masters/", w = "highcharts";
let b, R = !1;
function H() {
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
    return { chart: u, resize: () => u.reflow(), vendorId: w };
  }
  async function r(n, s, m, h) {
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
    return { chart: u, resize: () => u.reflow(), vendorId: w };
  }
  async function a(n, s, m, h) {
    await Promise.all([t(), o()]);
    const l = [], p = [];
    for (let E = 0; E < s.data.measures[0].data.length; E++)
      p.push([s.data.measures[0].data[E][0], s.data.measures[1].data[E][0]]);
    l.push({ type: n.options.highchartsType, name: "Unknown", data: p });
    const u = {
      chart: { type: n.options.highchartsType, inverted: n.options.inverted },
      plotOptions: { series: { borderColor: "#333" } },
      series: l,
      title: { text: s.title.text },
      xAxis: { categories: s.data.categoryLabels },
      yAxis: { title: { text: s.data.name } }
    }, c = b.chart(m, u, h);
    return { chart: c, resize: () => c.reflow(), vendorId: w };
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
    if (R) return;
    await import(`${A}highcharts-more.src.js`), R = !0;
  }
  return { renderCartesianChart: e, renderPolarChart: r, renderRangeChart: a };
}
const O = 4, N = `https://cdn.jsdelivr.net/npm/micromark@${O}/+esm`, T = 1, _ = `https://cdn.jsdelivr.net/npm/prismjs@${T}/+esm`, C = `https://cdn.jsdelivr.net/npm/prismjs@${T}/components/prism-javascript.min.js`, L = `https://cdn.jsdelivr.net/npm/prismjs@${T}/components/prism-javascript.min.js`;
let f, y;
function V() {
  async function e(t, o, n) {
    await a(), n.textContent = "Micromark & Prism content goes here...";
  }
  function r() {
    return { micromarkModule: f, prismModule: y };
  }
  async function a() {
    f && y || (f = await import(
      /* @vite-ignore */
      N
    ), y = await import(
      /* @vite-ignore */
      _
    ), await import(
      /* @vite-ignore */
      C
    ), await import(
      /* @vite-ignore */
      L
    ), console.log("micromarkModule", f), console.log("prismModule", y));
  }
  return { getStuff: r, micromarkModule: f, prismModule: y, render: e };
}
const z = 0, X = (e) => e, G = () => Date.now(), J = {
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
  constructor(r, a, t) {
    super(r, t), this.name = "DataPosError", this.locator = a, Error.captureStackTrace?.(this, new.target);
  }
}
class g extends D {
  constructor(r, a, t) {
    super(r, a, t), this.name = "ApplicationError";
  }
}
class K extends g {
  constructor(r, a, t) {
    super(r, a, t), this.name = "APIError";
  }
}
class q extends g {
  constructor(r, a, t) {
    super(r, a, t), this.name = "EngineError";
  }
}
class v extends g {
  body;
  constructor(r, a, t, o) {
    super(r, a, o), this.name = "FetchError", this.body = t;
  }
}
class $ extends g {
  componentName;
  info;
  constructor(r, a, t, o, n) {
    super(r, a, n), this.name = "VueHandledError", this.info = t, this.componentName = o;
  }
}
class Q extends g {
  constructor(r, a, t) {
    super(r, a, t), this.name = "WindowHandledRuntimeError";
  }
}
class Y extends g {
  constructor(r, a, t) {
    super(r, a, t), this.name = "WindowHandledPromiseRejectionError";
  }
}
class Z extends D {
  constructor(r, a, t) {
    super(r, a, t), this.name = "OperationalError";
  }
}
async function ee(e, r, a) {
  const t = `${r} Response status '${e.status}${e.statusText ? ` - ${e.statusText}` : ""}' received.`, o = await e.text();
  return new v(t, a, o);
}
function te(e) {
  return e.map((r) => r.message).join(" ");
}
function re(e, r = "Unknown error.") {
  if (e instanceof Error) return e;
  if (typeof e == "string") return new Error(e);
  try {
    return new Error(JSON.stringify(e ?? r));
  } catch {
    return new Error(r);
  }
}
function ae(e) {
  const r = /* @__PURE__ */ new Set(), a = [];
  let t = e;
  for (; t && !r.has(t); ) {
    r.add(t);
    let o;
    if (t instanceof v)
      o = { body: t.body, locator: t.locator, message: t.message, name: t.name, stack: t.stack }, t = t.cause;
    else if (t instanceof $)
      o = { componentName: t.componentName, info: t.info, locator: t.locator, message: t.message, name: t.name, stack: t.stack }, t = t.cause;
    else if (t instanceof D)
      o = { locator: t.locator, message: t.message, name: t.name, stack: t.stack }, t = t.cause;
    else if (t instanceof Error) {
      const n = t;
      o = { locator: "", message: n.message, name: n.name, stack: n.stack }, t = n.cause;
    } else t ? (o = { locator: "", message: String(t), name: "Error" }, t = void 0) : (o = { locator: "", message: "Unknown error.", name: "Error" }, t = void 0);
    /(?:\.{3}|[.!?])$/.test(o.message) || (o.message += "."), a.push(o);
  }
  return a;
}
const S = "en-US", I = {}, ne = (e) => {
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
}, oe = (e) => {
  if (e) {
    const r = e.lastIndexOf("/"), a = e.lastIndexOf(".", r > -1 ? r : e.length);
    return a > -1 ? e.substring(0, a) : e;
  }
}, se = (e) => {
  if (e) {
    const r = e.lastIndexOf(".");
    if (r > -1) return e.substring(r + 1);
  }
}, i = (e, r = 2, a = r, t = S) => {
  if (e == null) return "";
  const o = `${t}decimal${r}.${a}`;
  let n = I[o];
  return n || (n = new Intl.NumberFormat(t, {
    localeMatcher: "best fit",
    maximumFractionDigits: r,
    minimumFractionDigits: a,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), I[o] = n), n.format(e);
}, ie = (e) => e == null ? "" : e < 1e3 ? x(e) : e < 1e6 ? `${i(e / 1e3, 2, 0)}K` : e < 1e9 ? `${i(e / 1e6, 2, 0)}M` : e < 1e12 ? `${i(e / 1e9, 2, 0)}B` : `${i(e / 1e12, 2, 0)}T`, le = (e) => e == null ? "" : e === 1 ? "1 byte" : e < 1024 ? `${x(e)} bytes` : e < 1048576 ? `${i(e / 1024, 2, 0)} KB` : e < 1073741824 ? `${i(e / 1048576, 2, 0)} MB` : e < 1099511627776 ? `${i(e / 1073741824, 2, 0)} GB` : `${i(e / 1099511627776, 2, 0)} TB`, ce = (e) => e == null ? "" : e < 1e3 ? `${x(e)} ms` : e === 1e3 ? `${x(e)} sec` : e < 6e4 ? `${i(e / 1e3, 2, 0)} secs` : e === 6e4 ? "1 min" : e < 36e5 ? `${i(e / 6e4, 2, 0)} mins` : e === 36e5 ? "1 hr" : e < 864e5 ? `${i(e / 36e5, 2, 0)} hrs` : e === 864e5 ? "1 day" : `${i(e / 864e5, 2, 0)} days`, x = (e, r = S) => {
  if (e == null) return "";
  const a = `${r}decimal0.0`;
  let t = I[a];
  return t || (t = new Intl.NumberFormat(r, {
    localeMatcher: "best fit",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), I[a] = t), t.format(e);
}, de = (e) => {
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
}, M = [
  { id: "dtv", label: { "en-gb": "Delimited Text" } },
  { id: "e/e", label: { "en-gb": "Entity/Event" } },
  { id: "jsonArray", label: { "en-gb": "JSON Array" } },
  { id: "spss", label: { "en-gb": "SPSS" } },
  { id: "xls", label: { "en-gb": "XLS" } },
  { id: "xlsx", label: { "en-gb": "XLSX" } },
  { id: "xml", label: { "en-gb": "XML" } }
], me = (e = d) => {
  const r = [];
  for (const a of M) r.push({ ...a, label: a.label[e] || a.label[d] || a.id });
  return r;
}, j = [
  { id: `
`, label: { "en-gb": "Newline" } },
  { id: "\r", label: { "en-gb": "Carriage Return" } },
  { id: `\r
`, label: { "en-gb": "Carriage Return/Newline" } }
], ue = (e = d) => {
  const r = [];
  for (const a of j)
    r.push({ ...a, label: a.label[e] || a.label[d] || a.id });
  return r;
}, k = [
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
], pe = (e = d) => {
  const r = [];
  for (const a of k)
    r.push({ ...a, label: a.label[e] || a.label[d] || a.id });
  return r;
}, F = [
  { id: "alpha", color: "red", label: { "en-gb": "alpha" } },
  { id: "beta", color: "amber", label: { "en-gb": "beta" } },
  { id: "generalAvailability", color: "green", label: { "en-gb": "" } },
  { id: "notApplicable", color: "green", label: { "en-gb": "not-applicable" } },
  { id: "preAlpha", color: "red", label: { "en-gb": "pre-alpha" } },
  { id: "proposed", color: "other", label: { "en-gb": "proposed" } },
  { id: "releaseCandidate", color: "green", label: { "en-gb": "release-candidate" } },
  { id: "unavailable", color: "other", label: { "en-gb": "unavailable" } },
  { id: "underReview", color: "other", label: { "en-gb": "under-review" } }
], ge = (e, r = d) => {
  const a = F.find((t) => t.id === e);
  return a ? { ...a, label: a.label[r] || a.label[d] || e } : { id: e, color: "other", label: e };
}, d = "en-gb";
export {
  K as APIError,
  g as ApplicationError,
  U as CONNECTOR_DESTINATION_OPERATIONS,
  P as CONNECTOR_SOURCE_OPERATIONS,
  d as DEFAULT_LOCALE_CODE,
  z as DefaultTimestamp,
  q as EngineError,
  v as FetchError,
  Z as OperationalError,
  $ as VueError,
  Y as WindowPromiseRejectionError,
  Q as WindowRuntimeError,
  ee as buildFetchError,
  te as concatenateSerialisedErrorMessages,
  X as convertMillisecondsToTimestamp,
  ne as convertODataTypeIdToUsageTypeId,
  se as extractExtensionFromPath,
  oe as extractNameFromPath,
  i as formatNumberAsDecimalNumber,
  ce as formatNumberAsDuration,
  ie as formatNumberAsSize,
  le as formatNumberAsStorageSize,
  x as formatNumberAsWholeNumber,
  ge as getComponentStatus,
  G as getCurrentTimestamp,
  me as getDataFormats,
  ue as getRecordDelimiters,
  pe as getValueDelimiters,
  de as lookupMimeTypeForExtension,
  re as normalizeToError,
  J as presentationViewTypeMap,
  ae as serialiseError,
  B as useCytoscapeJS,
  W as useDataTable,
  H as useHighcharts,
  V as useMicromark
};
