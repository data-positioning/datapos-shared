const U = ["createObject", "dropObject", "removeRecords", "upsertRecords"], P = ["findObject", "getRecord", "listNodes", "previewObject", "retrieveRecords"];
function B() {
  function e(a, t, r) {
    r.textContent = "Cytoscape.js diagram goes here...";
  }
  return { render: e };
}
function W() {
  function e(a, t, r) {
    r.textContent = "values table goes here...";
  }
  return { render: e };
}
const A = "https://cdn.jsdelivr.net/npm/highcharts@11.4.3/es-modules/masters/", x = "highcharts";
let b, R = !1;
function H() {
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
    return { chart: u, resize: () => u.reflow(), vendorId: x };
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
    return { chart: u, resize: () => u.reflow(), vendorId: x };
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
    return { chart: c, resize: () => c.reflow(), vendorId: x };
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
    if (R) return;
    await import(`${A}highcharts-more.src.js`), R = !0;
  }
  return { renderCartesianChart: e, renderPolarChart: a, renderRangeChart: t };
}
const O = 4, N = `https://cdn.jsdelivr.net/npm/micromark@${O}/+esm`, T = 1, _ = `https://cdn.jsdelivr.net/npm/prismjs@${T}/+esm`, C = `https://cdn.jsdelivr.net/npm/prismjs@${T}/components/prism-javascript.min.js`, L = `https://cdn.jsdelivr.net/npm/prismjs@${T}/components/prism-javascript.min.js`;
let w, y;
function V() {
  async function e() {
    return await t(), { micromark: w, Prism: y };
  }
  async function a() {
    await t();
  }
  async function t() {
    if (w && y) return;
    const r = await Promise.all([
      import(
        /* @vite-ignore */
        N
      ),
      import(
        /* @vite-ignore */
        _
      )
      // import(/* @vite-ignore */ PRISM_JAVASCRIPT_URL),
      // import(/* @vite-ignore */ PRISM_JSON_URL)
    ]);
    w = r[0].micromark, y = r[1].default, globalThis.Prism = y, await Promise.all([import(
      /* @vite-ignore */
      C
    ), import(
      /* @vite-ignore */
      L
    )]);
  }
  return { getStuff: e, render: a };
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
  constructor(a, t, r) {
    super(a, r), this.name = "DataPosError", this.locator = t, Error.captureStackTrace?.(this, new.target);
  }
}
class g extends D {
  constructor(a, t, r) {
    super(a, t, r), this.name = "ApplicationError";
  }
}
class K extends g {
  constructor(a, t, r) {
    super(a, t, r), this.name = "APIError";
  }
}
class q extends g {
  constructor(a, t, r) {
    super(a, t, r), this.name = "EngineError";
  }
}
class v extends g {
  body;
  constructor(a, t, r, o) {
    super(a, t, o), this.name = "FetchError", this.body = r;
  }
}
class $ extends g {
  componentName;
  info;
  constructor(a, t, r, o, n) {
    super(a, t, n), this.name = "VueHandledError", this.info = r, this.componentName = o;
  }
}
class Q extends g {
  constructor(a, t, r) {
    super(a, t, r), this.name = "WindowHandledRuntimeError";
  }
}
class Y extends g {
  constructor(a, t, r) {
    super(a, t, r), this.name = "WindowHandledPromiseRejectionError";
  }
}
class Z extends D {
  constructor(a, t, r) {
    super(a, t, r), this.name = "OperationalError";
  }
}
async function ee(e, a, t) {
  const r = `${a} Response status '${e.status}${e.statusText ? ` - ${e.statusText}` : ""}' received.`, o = await e.text();
  return new v(r, t, o);
}
function re(e) {
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
function ae(e) {
  const a = /* @__PURE__ */ new Set(), t = [];
  let r = e;
  for (; r && !a.has(r); ) {
    a.add(r);
    let o;
    if (r instanceof v)
      o = { body: r.body, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof $)
      o = { componentName: r.componentName, info: r.info, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof D)
      o = { locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof Error) {
      const n = r;
      o = { locator: "", message: n.message, name: n.name, stack: n.stack }, r = n.cause;
    } else r ? (o = { locator: "", message: String(r), name: "Error" }, r = void 0) : (o = { locator: "", message: "Unknown error.", name: "Error" }, r = void 0);
    /(?:\.{3}|[.!?])$/.test(o.message) || (o.message += "."), t.push(o);
  }
  return t;
}
const S = "en-US", E = {}, ne = (e) => {
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
    const a = e.lastIndexOf("/"), t = e.lastIndexOf(".", a > -1 ? a : e.length);
    return t > -1 ? e.substring(0, t) : e;
  }
}, se = (e) => {
  if (e) {
    const a = e.lastIndexOf(".");
    if (a > -1) return e.substring(a + 1);
  }
}, i = (e, a = 2, t = a, r = S) => {
  if (e == null) return "";
  const o = `${r}decimal${a}.${t}`;
  let n = E[o];
  return n || (n = new Intl.NumberFormat(r, {
    localeMatcher: "best fit",
    maximumFractionDigits: a,
    minimumFractionDigits: t,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), E[o] = n), n.format(e);
}, ie = (e) => e == null ? "" : e < 1e3 ? I(e) : e < 1e6 ? `${i(e / 1e3, 2, 0)}K` : e < 1e9 ? `${i(e / 1e6, 2, 0)}M` : e < 1e12 ? `${i(e / 1e9, 2, 0)}B` : `${i(e / 1e12, 2, 0)}T`, le = (e) => e == null ? "" : e === 1 ? "1 byte" : e < 1024 ? `${I(e)} bytes` : e < 1048576 ? `${i(e / 1024, 2, 0)} KB` : e < 1073741824 ? `${i(e / 1048576, 2, 0)} MB` : e < 1099511627776 ? `${i(e / 1073741824, 2, 0)} GB` : `${i(e / 1099511627776, 2, 0)} TB`, ce = (e) => e == null ? "" : e < 1e3 ? `${I(e)} ms` : e === 1e3 ? `${I(e)} sec` : e < 6e4 ? `${i(e / 1e3, 2, 0)} secs` : e === 6e4 ? "1 min" : e < 36e5 ? `${i(e / 6e4, 2, 0)} mins` : e === 36e5 ? "1 hr" : e < 864e5 ? `${i(e / 36e5, 2, 0)} hrs` : e === 864e5 ? "1 day" : `${i(e / 864e5, 2, 0)} days`, I = (e, a = S) => {
  if (e == null) return "";
  const t = `${a}decimal0.0`;
  let r = E[t];
  return r || (r = new Intl.NumberFormat(a, {
    localeMatcher: "best fit",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), E[t] = r), r.format(e);
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
  const a = [];
  for (const t of M) a.push({ ...t, label: t.label[e] || t.label[d] || t.id });
  return a;
}, j = [
  { id: `
`, label: { "en-gb": "Newline" } },
  { id: "\r", label: { "en-gb": "Carriage Return" } },
  { id: `\r
`, label: { "en-gb": "Carriage Return/Newline" } }
], ue = (e = d) => {
  const a = [];
  for (const t of j)
    a.push({ ...t, label: t.label[e] || t.label[d] || t.id });
  return a;
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
  const a = [];
  for (const t of k)
    a.push({ ...t, label: t.label[e] || t.label[d] || t.id });
  return a;
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
], ge = (e, a = d) => {
  const t = F.find((r) => r.id === e);
  return t ? { ...t, label: t.label[a] || t.label[d] || e } : { id: e, color: "other", label: e };
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
  re as concatenateSerialisedErrorMessages,
  X as convertMillisecondsToTimestamp,
  ne as convertODataTypeIdToUsageTypeId,
  se as extractExtensionFromPath,
  oe as extractNameFromPath,
  i as formatNumberAsDecimalNumber,
  ce as formatNumberAsDuration,
  ie as formatNumberAsSize,
  le as formatNumberAsStorageSize,
  I as formatNumberAsWholeNumber,
  ge as getComponentStatus,
  G as getCurrentTimestamp,
  me as getDataFormats,
  ue as getRecordDelimiters,
  pe as getValueDelimiters,
  de as lookupMimeTypeForExtension,
  te as normalizeToError,
  J as presentationViewTypeMap,
  ae as serialiseError,
  B as useCytoscapeJS,
  W as useDataTable,
  H as useHighcharts,
  V as useMicromark
};
