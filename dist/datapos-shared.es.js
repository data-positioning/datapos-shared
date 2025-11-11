const M = ["createObject", "dropObject", "removeRecords", "upsertRecords"], F = ["findObject", "getRecord", "listNodes", "previewObject", "retrieveRecords"];
function j() {
  function e(a, t, r) {
    r.textContent = "Cytoscape.js diagram goes here...";
  }
  return { render: e };
}
function U() {
  function e(a, t, r) {
    r.textContent = "values table goes here...";
  }
  return { render: e };
}
const v = "https://cdn.jsdelivr.net/npm/highcharts@11.4.3/es-modules/masters/", I = "highcharts";
let b, D = !1;
function B() {
  async function e(n, s, m, h) {
    await r();
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
    await Promise.all([r(), o()]);
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
  async function t(n, s, m, h) {
    await Promise.all([r(), o()]);
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
  async function r() {
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
    if (D) return;
    await import(`${v}highcharts-more.src.js`), D = !0;
  }
  return { renderCartesianChart: e, renderPolarChart: a, renderRangeChart: t };
}
const S = 4, O = `https://cdn.jsdelivr.net/npm/micromark@${S}/+esm`, A = 1, N = `https://cdn.jsdelivr.net/npm/prismjs@${A}/+esm`;
let x;
function P() {
  async function e() {
    return await t(), { micromark: x };
  }
  async function a() {
    await t();
  }
  async function t() {
    if (x) return;
    x = (await Promise.all([import(
      /* @vite-ignore */
      O
    ), import(
      /* @vite-ignore */
      N
    )]))[0].micromark;
  }
  return { getStuff: e, render: a };
}
const W = 0, H = (e) => e, z = () => Date.now(), V = {
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
class w extends Error {
  locator;
  constructor(a, t, r) {
    super(a, r), this.name = "DataPosError", this.locator = t, Error.captureStackTrace?.(this, new.target);
  }
}
class g extends w {
  constructor(a, t, r) {
    super(a, t, r), this.name = "ApplicationError";
  }
}
class X extends g {
  constructor(a, t, r) {
    super(a, t, r), this.name = "APIError";
  }
}
class G extends g {
  constructor(a, t, r) {
    super(a, t, r), this.name = "EngineError";
  }
}
class T extends g {
  body;
  constructor(a, t, r, o) {
    super(a, t, o), this.name = "FetchError", this.body = r;
  }
}
class _ extends g {
  componentName;
  info;
  constructor(a, t, r, o, n) {
    super(a, t, n), this.name = "VueHandledError", this.info = r, this.componentName = o;
  }
}
class K extends g {
  constructor(a, t, r) {
    super(a, t, r), this.name = "WindowHandledRuntimeError";
  }
}
class J extends g {
  constructor(a, t, r) {
    super(a, t, r), this.name = "WindowHandledPromiseRejectionError";
  }
}
class q extends w {
  constructor(a, t, r) {
    super(a, t, r), this.name = "OperationalError";
  }
}
async function Q(e, a, t) {
  const r = `${a} Response status '${e.status}${e.statusText ? ` - ${e.statusText}` : ""}' received.`, o = await e.text();
  return new T(r, t, o);
}
function Y(e) {
  return e.map((a) => a.message).join(" ");
}
function Z(e, a = "Unknown error.") {
  if (e instanceof Error) return e;
  if (typeof e == "string") return new Error(e);
  try {
    return new Error(JSON.stringify(e ?? a));
  } catch {
    return new Error(a);
  }
}
function ee(e) {
  const a = /* @__PURE__ */ new Set(), t = [];
  let r = e;
  for (; r && !a.has(r); ) {
    a.add(r);
    let o;
    if (r instanceof T)
      o = { body: r.body, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof _)
      o = { componentName: r.componentName, info: r.info, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof w)
      o = { locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof Error) {
      const n = r;
      o = { locator: "", message: n.message, name: n.name, stack: n.stack }, r = n.cause;
    } else r ? (o = { locator: "", message: String(r), name: "Error" }, r = void 0) : (o = { locator: "", message: "Unknown error.", name: "Error" }, r = void 0);
    /(?:\.{3}|[.!?])$/.test(o.message) || (o.message += "."), t.push(o);
  }
  return t;
}
const R = "en-US", y = {}, re = (e) => {
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
}, te = (e) => {
  if (e) {
    const a = e.lastIndexOf("/"), t = e.lastIndexOf(".", a > -1 ? a : e.length);
    return t > -1 ? e.substring(0, t) : e;
  }
}, ae = (e) => {
  if (e) {
    const a = e.lastIndexOf(".");
    if (a > -1) return e.substring(a + 1);
  }
}, i = (e, a = 2, t = a, r = R) => {
  if (e == null) return "";
  const o = `${r}decimal${a}.${t}`;
  let n = y[o];
  return n || (n = new Intl.NumberFormat(r, {
    localeMatcher: "best fit",
    maximumFractionDigits: a,
    minimumFractionDigits: t,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), y[o] = n), n.format(e);
}, ne = (e) => e == null ? "" : e < 1e3 ? E(e) : e < 1e6 ? `${i(e / 1e3, 2, 0)}K` : e < 1e9 ? `${i(e / 1e6, 2, 0)}M` : e < 1e12 ? `${i(e / 1e9, 2, 0)}B` : `${i(e / 1e12, 2, 0)}T`, oe = (e) => e == null ? "" : e === 1 ? "1 byte" : e < 1024 ? `${E(e)} bytes` : e < 1048576 ? `${i(e / 1024, 2, 0)} KB` : e < 1073741824 ? `${i(e / 1048576, 2, 0)} MB` : e < 1099511627776 ? `${i(e / 1073741824, 2, 0)} GB` : `${i(e / 1099511627776, 2, 0)} TB`, se = (e) => e == null ? "" : e < 1e3 ? `${E(e)} ms` : e === 1e3 ? `${E(e)} sec` : e < 6e4 ? `${i(e / 1e3, 2, 0)} secs` : e === 6e4 ? "1 min" : e < 36e5 ? `${i(e / 6e4, 2, 0)} mins` : e === 36e5 ? "1 hr" : e < 864e5 ? `${i(e / 36e5, 2, 0)} hrs` : e === 864e5 ? "1 day" : `${i(e / 864e5, 2, 0)} days`, E = (e, a = R) => {
  if (e == null) return "";
  const t = `${a}decimal0.0`;
  let r = y[t];
  return r || (r = new Intl.NumberFormat(a, {
    localeMatcher: "best fit",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), y[t] = r), r.format(e);
}, ie = (e) => {
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
}, C = [
  { id: "dtv", label: { "en-gb": "Delimited Text" } },
  { id: "e/e", label: { "en-gb": "Entity/Event" } },
  { id: "jsonArray", label: { "en-gb": "JSON Array" } },
  { id: "spss", label: { "en-gb": "SPSS" } },
  { id: "xls", label: { "en-gb": "XLS" } },
  { id: "xlsx", label: { "en-gb": "XLSX" } },
  { id: "xml", label: { "en-gb": "XML" } }
], le = (e = d) => {
  const a = [];
  for (const t of C) a.push({ ...t, label: t.label[e] || t.label[d] || t.id });
  return a;
}, L = [
  { id: `
`, label: { "en-gb": "Newline" } },
  { id: "\r", label: { "en-gb": "Carriage Return" } },
  { id: `\r
`, label: { "en-gb": "Carriage Return/Newline" } }
], ce = (e = d) => {
  const a = [];
  for (const t of L)
    a.push({ ...t, label: t.label[e] || t.label[d] || t.id });
  return a;
}, $ = [
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
], de = (e = d) => {
  const a = [];
  for (const t of $)
    a.push({ ...t, label: t.label[e] || t.label[d] || t.id });
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
], me = (e, a = d) => {
  const t = k.find((r) => r.id === e);
  return t ? { ...t, label: t.label[a] || t.label[d] || e } : { id: e, color: "other", label: e };
}, d = "en-gb";
export {
  X as APIError,
  g as ApplicationError,
  M as CONNECTOR_DESTINATION_OPERATIONS,
  F as CONNECTOR_SOURCE_OPERATIONS,
  d as DEFAULT_LOCALE_CODE,
  W as DefaultTimestamp,
  G as EngineError,
  T as FetchError,
  q as OperationalError,
  _ as VueError,
  J as WindowPromiseRejectionError,
  K as WindowRuntimeError,
  Q as buildFetchError,
  Y as concatenateSerialisedErrorMessages,
  H as convertMillisecondsToTimestamp,
  re as convertODataTypeIdToUsageTypeId,
  ae as extractExtensionFromPath,
  te as extractNameFromPath,
  i as formatNumberAsDecimalNumber,
  se as formatNumberAsDuration,
  ne as formatNumberAsSize,
  oe as formatNumberAsStorageSize,
  E as formatNumberAsWholeNumber,
  me as getComponentStatus,
  z as getCurrentTimestamp,
  le as getDataFormats,
  ce as getRecordDelimiters,
  de as getValueDelimiters,
  ie as lookupMimeTypeForExtension,
  Z as normalizeToError,
  V as presentationViewTypeMap,
  ee as serialiseError,
  j as useCytoscapeJS,
  U as useDataTable,
  B as useHighcharts,
  P as useMicromark
};
