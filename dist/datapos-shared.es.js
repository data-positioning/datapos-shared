const M = ["createObject", "dropObject", "removeRecords", "upsertRecords"], k = ["findObject", "getRecord", "listNodes", "previewObject", "retrieveRecords"];
function F() {
  function e(t, a, r) {
    r.textContent = "Cytoscape.js diagram goes here...";
  }
  return { render: e };
}
function U() {
  function e(t, a, r) {
    r.textContent = "values table goes here...";
  }
  return { render: e };
}
const N = "https://cdn.jsdelivr.net/npm/highcharts@11.4.3/es-modules/masters/", x = "highcharts";
let b, T = !1;
function j() {
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
    await import(`${N}highcharts-more.src.js`), T = !0;
  }
  return { renderCartesianChart: e, renderPolarChart: t, renderRangeChart: a };
}
const S = 4, A = `https://cdn.jsdelivr.net/npm/micromark@${S}/+esm`;
let I, D;
function B() {
  async function e(a, r, o) {
    await t(), o.textContent = "Micromark & Prism content goes here...";
  }
  async function t() {
    I && D || (I = await import(
      /* @vite-ignore */
      A
    ), console.log("micromarkModule", I), console.log("prismModule", D));
  }
  return { render: e };
}
const H = 0, P = (e) => e, W = () => Date.now(), z = {
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
  constructor(t, a, r) {
    super(t, r), this.name = "DataPosError", this.locator = a, Error.captureStackTrace?.(this, new.target);
  }
}
class p extends w {
  constructor(t, a, r) {
    super(t, a, r), this.name = "ApplicationError";
  }
}
class V extends p {
  constructor(t, a, r) {
    super(t, a, r), this.name = "APIError";
  }
}
class X extends p {
  constructor(t, a, r) {
    super(t, a, r), this.name = "EngineError";
  }
}
class v extends p {
  body;
  constructor(t, a, r, o) {
    super(t, a, o), this.name = "FetchError", this.body = r;
  }
}
class O extends p {
  componentName;
  info;
  constructor(t, a, r, o, n) {
    super(t, a, n), this.name = "VueHandledError", this.info = r, this.componentName = o;
  }
}
class G extends p {
  constructor(t, a, r) {
    super(t, a, r), this.name = "WindowHandledRuntimeError";
  }
}
class K extends p {
  constructor(t, a, r) {
    super(t, a, r), this.name = "WindowHandledPromiseRejectionError";
  }
}
class J extends w {
  constructor(t, a, r) {
    super(t, a, r), this.name = "OperationalError";
  }
}
async function q(e, t, a) {
  const r = `${t} Response status '${e.status}${e.statusText ? ` - ${e.statusText}` : ""}' received.`, o = await e.text();
  return new v(r, a, o);
}
function Q(e) {
  return e.map((t) => t.message).join(" ");
}
function Y(e, t = "Unknown error.") {
  if (e instanceof Error) return e;
  if (typeof e == "string") return new Error(e);
  try {
    return new Error(JSON.stringify(e ?? t));
  } catch {
    return new Error(t);
  }
}
function Z(e) {
  const t = /* @__PURE__ */ new Set(), a = [];
  let r = e;
  for (; r && !t.has(r); ) {
    t.add(r);
    let o;
    if (r instanceof v)
      o = { body: r.body, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof O)
      o = { componentName: r.componentName, info: r.info, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof w)
      o = { locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof Error) {
      const n = r;
      o = { locator: "", message: n.message, name: n.name, stack: n.stack }, r = n.cause;
    } else r ? (o = { locator: "", message: String(r), name: "Error" }, r = void 0) : (o = { locator: "", message: "Unknown error.", name: "Error" }, r = void 0);
    /(?:\.{3}|[.!?])$/.test(o.message) || (o.message += "."), a.push(o);
  }
  return a;
}
const R = "en-US", y = {}, ee = (e) => {
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
}, re = (e) => {
  if (e) {
    const t = e.lastIndexOf("/"), a = e.lastIndexOf(".", t > -1 ? t : e.length);
    return a > -1 ? e.substring(0, a) : e;
  }
}, te = (e) => {
  if (e) {
    const t = e.lastIndexOf(".");
    if (t > -1) return e.substring(t + 1);
  }
}, i = (e, t = 2, a = t, r = R) => {
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
}, ae = (e) => e == null ? "" : e < 1e3 ? E(e) : e < 1e6 ? `${i(e / 1e3, 2, 0)}K` : e < 1e9 ? `${i(e / 1e6, 2, 0)}M` : e < 1e12 ? `${i(e / 1e9, 2, 0)}B` : `${i(e / 1e12, 2, 0)}T`, ne = (e) => e == null ? "" : e === 1 ? "1 byte" : e < 1024 ? `${E(e)} bytes` : e < 1048576 ? `${i(e / 1024, 2, 0)} KB` : e < 1073741824 ? `${i(e / 1048576, 2, 0)} MB` : e < 1099511627776 ? `${i(e / 1073741824, 2, 0)} GB` : `${i(e / 1099511627776, 2, 0)} TB`, oe = (e) => e == null ? "" : e < 1e3 ? `${E(e)} ms` : e === 1e3 ? `${E(e)} sec` : e < 6e4 ? `${i(e / 1e3, 2, 0)} secs` : e === 6e4 ? "1 min" : e < 36e5 ? `${i(e / 6e4, 2, 0)} mins` : e === 36e5 ? "1 hr" : e < 864e5 ? `${i(e / 36e5, 2, 0)} hrs` : e === 864e5 ? "1 day" : `${i(e / 864e5, 2, 0)} days`, E = (e, t = R) => {
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
}, se = (e) => {
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
], ie = (e = d) => {
  const t = [];
  for (const a of C) t.push({ ...a, label: a.label[e] || a.label[d] || a.id });
  return t;
}, _ = [
  { id: `
`, label: { "en-gb": "Newline" } },
  { id: "\r", label: { "en-gb": "Carriage Return" } },
  { id: `\r
`, label: { "en-gb": "Carriage Return/Newline" } }
], le = (e = d) => {
  const t = [];
  for (const a of _)
    t.push({ ...a, label: a.label[e] || a.label[d] || a.id });
  return t;
}, L = [
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
], ce = (e = d) => {
  const t = [];
  for (const a of L)
    t.push({ ...a, label: a.label[e] || a.label[d] || a.id });
  return t;
}, $ = [
  { id: "alpha", color: "red", label: { "en-gb": "alpha" } },
  { id: "beta", color: "amber", label: { "en-gb": "beta" } },
  { id: "generalAvailability", color: "green", label: { "en-gb": "" } },
  { id: "notApplicable", color: "green", label: { "en-gb": "not-applicable" } },
  { id: "preAlpha", color: "red", label: { "en-gb": "pre-alpha" } },
  { id: "proposed", color: "other", label: { "en-gb": "proposed" } },
  { id: "releaseCandidate", color: "green", label: { "en-gb": "release-candidate" } },
  { id: "unavailable", color: "other", label: { "en-gb": "unavailable" } },
  { id: "underReview", color: "other", label: { "en-gb": "under-review" } }
], de = (e, t = d) => {
  const a = $.find((r) => r.id === e);
  return a ? { ...a, label: a.label[t] || a.label[d] || e } : { id: e, color: "other", label: e };
}, d = "en-gb";
export {
  V as APIError,
  p as ApplicationError,
  M as CONNECTOR_DESTINATION_OPERATIONS,
  k as CONNECTOR_SOURCE_OPERATIONS,
  d as DEFAULT_LOCALE_CODE,
  H as DefaultTimestamp,
  X as EngineError,
  v as FetchError,
  J as OperationalError,
  O as VueError,
  K as WindowPromiseRejectionError,
  G as WindowRuntimeError,
  q as buildFetchError,
  Q as concatenateSerialisedErrorMessages,
  P as convertMillisecondsToTimestamp,
  ee as convertODataTypeIdToUsageTypeId,
  te as extractExtensionFromPath,
  re as extractNameFromPath,
  i as formatNumberAsDecimalNumber,
  oe as formatNumberAsDuration,
  ae as formatNumberAsSize,
  ne as formatNumberAsStorageSize,
  E as formatNumberAsWholeNumber,
  de as getComponentStatus,
  W as getCurrentTimestamp,
  ie as getDataFormats,
  le as getRecordDelimiters,
  ce as getValueDelimiters,
  se as lookupMimeTypeForExtension,
  Y as normalizeToError,
  z as presentationViewTypeMap,
  Z as serialiseError,
  F as useCytoscapeJS,
  U as useDataTable,
  j as useHighcharts,
  B as useMicromark
};
