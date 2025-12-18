let w;
// @__NO_SIDE_EFFECTS__
function R(e) {
  return {
    lang: e?.lang ?? w?.lang,
    message: e?.message,
    abortEarly: e?.abortEarly ?? w?.abortEarly,
    abortPipeEarly: e?.abortPipeEarly ?? w?.abortPipeEarly
  };
}
let j;
// @__NO_SIDE_EFFECTS__
function F(e) {
  return j?.get(e);
}
let _;
// @__NO_SIDE_EFFECTS__
function U(e) {
  return _?.get(e);
}
let B;
// @__NO_SIDE_EFFECTS__
function P(e, r) {
  return B?.get(e)?.get(r);
}
// @__NO_SIDE_EFFECTS__
function T(e) {
  const r = typeof e;
  return r === "string" ? `"${e}"` : r === "number" || r === "bigint" || r === "boolean" ? `${e}` : r === "object" || r === "function" ? (e && Object.getPrototypeOf(e)?.constructor?.name) ?? "null" : r;
}
function m(e, r, t, n, o) {
  const s = o && "input" in o ? o.input : t.value, i = o?.expected ?? e.expects ?? null, p = o?.received ?? /* @__PURE__ */ T(s), a = {
    kind: e.kind,
    type: e.type,
    input: s,
    expected: i,
    received: p,
    message: `Invalid ${r}: ${i ? `Expected ${i} but r` : "R"}eceived ${p}`,
    requirement: e.requirement,
    path: o?.path,
    issues: o?.issues,
    lang: n.lang,
    abortEarly: n.abortEarly,
    abortPipeEarly: n.abortPipeEarly
  }, h = e.kind === "schema", u = o?.message ?? e.message ?? /* @__PURE__ */ P(e.reference, a.lang) ?? (h ? /* @__PURE__ */ U(a.lang) : null) ?? n.message ?? /* @__PURE__ */ F(a.lang);
  u !== void 0 && (a.message = typeof u == "function" ? u(a) : u), h && (t.typed = !1), t.issues ? t.issues.push(a) : t.issues = [a];
}
// @__NO_SIDE_EFFECTS__
function b(e) {
  return {
    version: 1,
    vendor: "valibot",
    validate(r) {
      return e["~run"]({ value: r }, /* @__PURE__ */ R());
    }
  };
}
// @__NO_SIDE_EFFECTS__
function G(e, r) {
  const t = [...new Set(e)];
  return t.length > 1 ? `(${t.join(` ${r} `)})` : t[0] ?? "never";
}
// @__NO_SIDE_EFFECTS__
function L(e, r, t) {
  return typeof e.fallback == "function" ? e.fallback(r, t) : e.fallback;
}
// @__NO_SIDE_EFFECTS__
function D(e, r, t) {
  return typeof e.default == "function" ? e.default(r, t) : e.default;
}
// @__NO_SIDE_EFFECTS__
function C(e, r) {
  return {
    kind: "schema",
    type: "literal",
    reference: C,
    expects: /* @__PURE__ */ T(e),
    async: !1,
    literal: e,
    message: r,
    get "~standard"() {
      return /* @__PURE__ */ b(this);
    },
    "~run"(t, n) {
      return t.value === this.literal ? t.typed = !0 : m(this, "type", t, n), t;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function E(e, r) {
  return {
    kind: "schema",
    type: "nullable",
    reference: E,
    expects: `(${e.expects} | null)`,
    async: !1,
    wrapped: e,
    default: r,
    get "~standard"() {
      return /* @__PURE__ */ b(this);
    },
    "~run"(t, n) {
      return t.value === null && (this.default !== void 0 && (t.value = /* @__PURE__ */ D(this, t, n)), t.value === null) ? (t.typed = !0, t) : this.wrapped["~run"](t, n);
    }
  };
}
// @__NO_SIDE_EFFECTS__
function k(e) {
  return {
    kind: "schema",
    type: "number",
    reference: k,
    expects: "number",
    async: !1,
    message: e,
    get "~standard"() {
      return /* @__PURE__ */ b(this);
    },
    "~run"(r, t) {
      return typeof r.value == "number" && !isNaN(r.value) ? r.typed = !0 : m(this, "type", r, t), r;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function S(e, r) {
  return {
    kind: "schema",
    type: "object",
    reference: S,
    expects: "Object",
    async: !1,
    entries: e,
    message: r,
    get "~standard"() {
      return /* @__PURE__ */ b(this);
    },
    "~run"(t, n) {
      const o = t.value;
      if (o && typeof o == "object") {
        t.typed = !0, t.value = {};
        for (const s in this.entries) {
          const i = this.entries[s];
          if (s in o || (i.type === "exact_optional" || i.type === "optional" || i.type === "nullish") && i.default !== void 0) {
            const p = s in o ? o[s] : /* @__PURE__ */ D(i), a = i["~run"]({ value: p }, n);
            if (a.issues) {
              const h = {
                type: "object",
                origin: "value",
                input: o,
                key: s,
                value: p
              };
              for (const u of a.issues)
                u.path ? u.path.unshift(h) : u.path = [h], t.issues?.push(u);
              if (t.issues || (t.issues = a.issues), n.abortEarly) {
                t.typed = !1;
                break;
              }
            }
            a.typed || (t.typed = !1), t.value[s] = a.value;
          } else if (i.fallback !== void 0) t.value[s] = /* @__PURE__ */ L(i);
          else if (i.type !== "exact_optional" && i.type !== "optional" && i.type !== "nullish" && (m(this, "key", t, n, {
            input: void 0,
            expected: `"${s}"`,
            path: [{
              type: "object",
              origin: "key",
              input: o,
              key: s,
              value: o[s]
            }]
          }), n.abortEarly))
            break;
        }
      } else m(this, "type", t, n);
      return t;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function g(e, r) {
  return {
    kind: "schema",
    type: "optional",
    reference: g,
    expects: `(${e.expects} | undefined)`,
    async: !1,
    wrapped: e,
    default: r,
    get "~standard"() {
      return /* @__PURE__ */ b(this);
    },
    "~run"(t, n) {
      return t.value === void 0 && (this.default !== void 0 && (t.value = /* @__PURE__ */ D(this, t, n)), t.value === void 0) ? (t.typed = !0, t) : this.wrapped["~run"](t, n);
    }
  };
}
// @__NO_SIDE_EFFECTS__
function c(e) {
  return {
    kind: "schema",
    type: "string",
    reference: c,
    expects: "string",
    async: !1,
    message: e,
    get "~standard"() {
      return /* @__PURE__ */ b(this);
    },
    "~run"(r, t) {
      return typeof r.value == "string" ? r.typed = !0 : m(this, "type", r, t), r;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function I(e) {
  let r;
  if (e) for (const t of e) r ? r.push(...t.issues) : r = t.issues;
  return r;
}
// @__NO_SIDE_EFFECTS__
function M(e, r) {
  return {
    kind: "schema",
    type: "union",
    reference: M,
    expects: /* @__PURE__ */ G(e.map((t) => t.expects), "|"),
    async: !1,
    options: e,
    message: r,
    get "~standard"() {
      return /* @__PURE__ */ b(this);
    },
    "~run"(t, n) {
      let o, s, i;
      for (const p of this.options) {
        const a = p["~run"]({ value: t.value }, n);
        if (a.typed) if (a.issues) s ? s.push(a) : s = [a];
        else {
          o = a;
          break;
        }
        else i ? i.push(a) : i = [a];
      }
      if (o) return o;
      if (s) {
        if (s.length === 1) return s[0];
        m(this, "type", t, n, { issues: /* @__PURE__ */ I(s) }), t.typed = !0;
      } else {
        if (i?.length === 1) return i[0];
        m(this, "type", t, n, { issues: /* @__PURE__ */ I(i) });
      }
      return t;
    }
  };
}
const f = (e) => /* @__PURE__ */ M(e.map((r) => /* @__PURE__ */ C(r))), O = /* @__PURE__ */ S({
  "en-au": /* @__PURE__ */ g(/* @__PURE__ */ c()),
  "en-gb": /* @__PURE__ */ g(/* @__PURE__ */ c()),
  "en-us": /* @__PURE__ */ g(/* @__PURE__ */ c()),
  "es-es": /* @__PURE__ */ g(/* @__PURE__ */ c())
}), V = f(["amber", "green", "red", "other"]), W = f([
  "alpha",
  "beta",
  "generalAvailability",
  "notApplicable",
  "preAlpha",
  "proposed",
  "releaseCandidate",
  "unavailable",
  "underReview"
]), H = f([
  "app",
  "connector",
  "connectorConnection",
  "context",
  "contextModelGroup",
  "contextModel",
  "contextModelDimensionGroup",
  "contextModelDimension",
  "contextModelDimensionHierarchy",
  "contextModelEntityGroup",
  "contextModelEntity",
  "contextModelEntityDataItem",
  "contextModelEntityEvent",
  "contextModelEntityPrimaryMeasure",
  "contextModelSecondaryMeasureGroup",
  "contextModelSecondaryMeasure",
  "dataView",
  "dimension",
  "engine",
  "eventQuery",
  "presenter",
  "presenterPresentation",
  "tool"
]);
f(["app", "engine", "connector", "context", "presenter", "tool"]);
const X = /* @__PURE__ */ S({
  id: /* @__PURE__ */ c(),
  color: V,
  label: /* @__PURE__ */ c()
}), z = {
  id: /* @__PURE__ */ c(),
  label: O,
  description: O,
  firstCreatedAt: /* @__PURE__ */ g(/* @__PURE__ */ k()),
  icon: /* @__PURE__ */ E(/* @__PURE__ */ c()),
  iconDark: /* @__PURE__ */ E(/* @__PURE__ */ c()),
  lastUpdatedAt: /* @__PURE__ */ E(/* @__PURE__ */ k()),
  status: /* @__PURE__ */ E(X),
  statusId: W
}, Z = /* @__PURE__ */ S({
  ...z,
  typeId: H
}), J = [
  { id: "alpha", color: "red", label: { "en-gb": "alpha" } },
  { id: "beta", color: "amber", label: { "en-gb": "beta" } },
  { id: "generalAvailability", color: "green", label: { "en-gb": "" } },
  { id: "notApplicable", color: "green", label: { "en-gb": "not-applicable" } },
  { id: "preAlpha", color: "red", label: { "en-gb": "pre-alpha" } },
  { id: "proposed", color: "other", label: { "en-gb": "proposed" } },
  { id: "releaseCandidate", color: "green", label: { "en-gb": "release-candidate" } },
  { id: "unavailable", color: "other", label: { "en-gb": "unavailable" } },
  { id: "underReview", color: "other", label: { "en-gb": "under-review" } }
], ee = (e, r = d) => {
  const t = J.find((n) => n.id === e);
  return t ? { ...t, label: t.label[r] || t.label[d] || e } : { id: e, color: "other", label: e };
};
f(["application", "curatedDataset", "database", "fileStore"]);
f([
  "abortOperation",
  "authenticateConnection",
  "createObject",
  "describeConnection",
  "dropObject",
  "findObject",
  "getRecord",
  "listNodes",
  "previewObject",
  "removeRecords",
  "retrieveRecords",
  "upsertRecords"
]);
f(["bidirectional", "destination", "source", "unknown"]);
f(["apiKey", "disabled", "oAuth2", "none"]);
const te = ["createObject", "dropObject", "removeRecords", "upsertRecords"], re = ["findObject", "getRecord", "listNodes", "previewObject", "retrieveRecords"];
function ne() {
  function e(r, t, n) {
    n.textContent = "Cytoscape.js diagram goes here...";
  }
  return { render: e };
}
function oe() {
  function e(r, t) {
    console.log(1111, r), console.log(2222, t), console.log(3333, t.childNodes), console.log(4444, t.children);
  }
  return { render: e };
}
const se = 0, ie = (e) => e, ae = () => Date.now();
class N extends Error {
  locator;
  constructor(r, t, n) {
    super(r, n), this.name = "DataPosError", this.locator = t, Error.captureStackTrace?.(this, new.target);
  }
}
class y extends N {
  constructor(r, t, n) {
    super(r, t, n), this.name = "ApplicationError";
  }
}
class le extends y {
  constructor(r, t, n) {
    super(r, t, n), this.name = "APIError";
  }
}
class ce extends y {
  constructor(r, t, n) {
    super(r, t, n), this.name = "EngineError";
  }
}
class $ extends y {
  body;
  constructor(r, t, n, o) {
    super(r, t, o), this.name = "FetchError", this.body = n;
  }
}
class K extends y {
  componentName;
  info;
  constructor(r, t, n, o, s) {
    super(r, t, s), this.name = "VueHandledError", this.info = n, this.componentName = o;
  }
}
class ue extends y {
  constructor(r, t, n) {
    super(r, t, n), this.name = "WindowHandledRuntimeError";
  }
}
class de extends y {
  constructor(r, t, n) {
    super(r, t, n), this.name = "WindowHandledPromiseRejectionError";
  }
}
class fe extends N {
  constructor(r, t, n) {
    super(r, t, n), this.name = "OperationalError";
  }
}
async function pe(e, r, t) {
  const n = `${r} Response status '${e.status}${e.statusText ? ` - ${e.statusText}` : ""}' received.`, o = await e.text();
  return new $(n, t, o);
}
function me(e) {
  return e.map((r) => r.message).join(" ");
}
function be(e) {
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
function ge(e) {
  const r = /* @__PURE__ */ new Set(), t = [];
  let n = e;
  for (; n && !r.has(n); ) {
    r.add(n);
    let o;
    if (n instanceof $)
      o = { body: n.body, locator: n.locator, message: n.message, name: n.name, stack: n.stack }, n = n.cause;
    else if (n instanceof K)
      o = { componentName: n.componentName, info: n.info, locator: n.locator, message: n.message, name: n.name, stack: n.stack }, n = n.cause;
    else if (n instanceof N)
      o = { locator: n.locator, message: n.message, name: n.name, stack: n.stack }, n = n.cause;
    else if (n instanceof Error) {
      const s = n;
      o = { locator: "", message: s.message, name: s.name, stack: s.stack }, n = s.cause;
    } else n ? (o = { locator: "", message: String(n), name: "Error" }, n = void 0) : (o = { locator: "", message: "Unknown error.", name: "Error" }, n = void 0);
    /(?:\.{3}|[.!?])$/.test(o.message) || (o.message += "."), t.push(o);
  }
  return t;
}
const A = "en-US", v = {};
function ye(e) {
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
function he(e) {
  if (e) {
    const r = e.lastIndexOf("/"), t = e.lastIndexOf(".", r > -1 ? r : e.length);
    return t > -1 ? e.substring(0, t) : e;
  }
}
function Ee(e) {
  if (e) {
    const r = e.lastIndexOf(".");
    if (r > -1) return e.substring(r + 1);
  }
}
function l(e, r = 2, t = r, n = A) {
  if (e == null) return "";
  const o = `${n}decimal${r}.${t}`;
  let s = v[o];
  return s || (s = new Intl.NumberFormat(n, {
    localeMatcher: "best fit",
    maximumFractionDigits: r,
    minimumFractionDigits: t,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), v[o] = s), s.format(e);
}
function ve(e) {
  return e == null ? "" : e < 1e3 ? x(e) : e < 1e6 ? `${l(e / 1e3, 2, 0)}K` : e < 1e9 ? `${l(e / 1e6, 2, 0)}M` : e < 1e12 ? `${l(e / 1e9, 2, 0)}B` : `${l(e / 1e12, 2, 0)}T`;
}
function xe(e) {
  return e == null ? "" : e === 1 ? "1 byte" : e < 1024 ? `${x(e)} bytes` : e < 1048576 ? `${l(e / 1024, 2, 0)} KB` : e < 1073741824 ? `${l(e / 1048576, 2, 0)} MB` : e < 1099511627776 ? `${l(e / 1073741824, 2, 0)} GB` : `${l(e / 1099511627776, 2, 0)} TB`;
}
function Se(e) {
  return e == null ? "" : e < 1e3 ? `${x(e)} ms` : e === 1e3 ? `${x(e)} sec` : e < 6e4 ? `${l(e / 1e3, 2, 0)} secs` : e === 6e4 ? "1 min" : e < 36e5 ? `${l(e / 6e4, 2, 0)} mins` : e === 36e5 ? "1 hr" : e < 864e5 ? `${l(e / 36e5, 2, 0)} hrs` : e === 864e5 ? "1 day" : `${l(e / 864e5, 2, 0)} days`;
}
function x(e, r = A) {
  if (e == null) return "";
  const t = `${r}decimal0.0`;
  let n = v[t];
  return n || (n = new Intl.NumberFormat(r, {
    localeMatcher: "best fit",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), v[t] = n), n.format(e);
}
function we(e) {
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
const q = [
  { id: "dtv", label: { "en-gb": "Delimited Text" } },
  { id: "e/e", label: { "en-gb": "Entity/Event" } },
  { id: "jsonArray", label: { "en-gb": "JSON Array" } },
  { id: "spss", label: { "en-gb": "SPSS" } },
  { id: "xls", label: { "en-gb": "XLS" } },
  { id: "xlsx", label: { "en-gb": "XLSX" } },
  { id: "xml", label: { "en-gb": "XML" } }
], ke = (e = d) => {
  const r = [];
  for (const t of q) r.push({ ...t, label: t.label[e] || t.label[d] || t.id });
  return r;
}, Q = [
  { id: `
`, label: { "en-gb": "Newline" } },
  { id: "\r", label: { "en-gb": "Carriage Return" } },
  { id: `\r
`, label: { "en-gb": "Carriage Return/Newline" } }
], De = (e = d) => {
  const r = [];
  for (const t of Q)
    r.push({ ...t, label: t.label[e] || t.label[d] || t.id });
  return r;
}, Y = [
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
], Ne = (e = d) => {
  const r = [];
  for (const t of Y)
    r.push({ ...t, label: t.label[e] || t.label[d] || t.id });
  return r;
}, d = "en-gb";
export {
  le as APIError,
  y as ApplicationError,
  te as CONNECTOR_DESTINATION_OPERATIONS,
  re as CONNECTOR_SOURCE_OPERATIONS,
  d as DEFAULT_LOCALE_CODE,
  se as DefaultTimestamp,
  ce as EngineError,
  $ as FetchError,
  fe as OperationalError,
  K as VueError,
  de as WindowPromiseRejectionError,
  ue as WindowRuntimeError,
  pe as buildFetchError,
  Z as componentConfigSchema,
  me as concatenateSerialisedErrorMessages,
  ie as convertMillisecondsToTimestamp,
  ye as convertODataTypeIdToUsageTypeId,
  Ee as extractExtensionFromPath,
  he as extractNameFromPath,
  l as formatNumberAsDecimalNumber,
  Se as formatNumberAsDuration,
  ve as formatNumberAsSize,
  xe as formatNumberAsStorageSize,
  x as formatNumberAsWholeNumber,
  ee as getComponentStatus,
  ae as getCurrentTimestamp,
  ke as getDataFormats,
  De as getRecordDelimiters,
  Ne as getValueDelimiters,
  we as lookupMimeTypeForExtension,
  be as normalizeToError,
  ge as serialiseError,
  ne as useCytoscapeJS,
  oe as useDataTable
};
