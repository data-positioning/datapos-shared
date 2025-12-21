import { convertODataTypeIdToUsageTypeId as Ge, extractExtensionFromPath as Ve, extractNameFromPath as He, formatNumberAsDecimalNumber as We, formatNumberAsDuration as $e, formatNumberAsSize as Xe, formatNumberAsStorageSize as Be, formatNumberAsWholeNumber as Je, lookupMimeTypeForExtension as Ke } from "./datapos-shared.es2.js";
let j;
// @__NO_SIDE_EFFECTS__
function G(t) {
  return {
    lang: t?.lang ?? j?.lang,
    message: t?.message,
    abortEarly: t?.abortEarly ?? j?.abortEarly,
    abortPipeEarly: t?.abortPipeEarly ?? j?.abortPipeEarly
  };
}
let V;
// @__NO_SIDE_EFFECTS__
function H(t) {
  return V?.get(t);
}
let W;
// @__NO_SIDE_EFFECTS__
function $(t) {
  return W?.get(t);
}
let X;
// @__NO_SIDE_EFFECTS__
function B(t, n) {
  return X?.get(t)?.get(n);
}
// @__NO_SIDE_EFFECTS__
function T(t) {
  const n = typeof t;
  return n === "string" ? `"${t}"` : n === "number" || n === "bigint" || n === "boolean" ? `${t}` : n === "object" || n === "function" ? (t && Object.getPrototypeOf(t)?.constructor?.name) ?? "null" : n;
}
function y(t, n, e, r, s) {
  const o = s && "input" in s ? s.input : e.value, i = s?.expected ?? t.expects ?? null, u = s?.received ?? /* @__PURE__ */ T(o), a = {
    kind: t.kind,
    type: t.type,
    input: o,
    expected: i,
    received: u,
    message: `Invalid ${n}: ${i ? `Expected ${i} but r` : "R"}eceived ${u}`,
    requirement: t.requirement,
    path: s?.path,
    issues: s?.issues,
    lang: r.lang,
    abortEarly: r.abortEarly,
    abortPipeEarly: r.abortPipeEarly
  }, p = t.kind === "schema", d = s?.message ?? t.message ?? /* @__PURE__ */ B(t.reference, a.lang) ?? (p ? /* @__PURE__ */ $(a.lang) : null) ?? r.message ?? /* @__PURE__ */ H(a.lang);
  d !== void 0 && (a.message = typeof d == "function" ? d(a) : d), p && (e.typed = !1), e.issues ? e.issues.push(a) : e.issues = [a];
}
// @__NO_SIDE_EFFECTS__
function g(t) {
  return {
    version: 1,
    vendor: "valibot",
    validate(n) {
      return t["~run"]({ value: n }, /* @__PURE__ */ G());
    }
  };
}
// @__NO_SIDE_EFFECTS__
function J(t, n) {
  return Object.hasOwn(t, n) && n !== "__proto__" && n !== "prototype" && n !== "constructor";
}
// @__NO_SIDE_EFFECTS__
function K(t, n) {
  const e = [...new Set(t)];
  return e.length > 1 ? `(${e.join(` ${n} `)})` : e[0] ?? "never";
}
// @__NO_SIDE_EFFECTS__
function q(t, n, e) {
  return typeof t.fallback == "function" ? t.fallback(n, e) : t.fallback;
}
// @__NO_SIDE_EFFECTS__
function w(t, n, e) {
  return typeof t.default == "function" ? t.default(n, e) : t.default;
}
// @__NO_SIDE_EFFECTS__
function E(t, n) {
  return {
    kind: "schema",
    type: "array",
    reference: E,
    expects: "Array",
    async: !1,
    item: t,
    message: n,
    get "~standard"() {
      return /* @__PURE__ */ g(this);
    },
    "~run"(e, r) {
      const s = e.value;
      if (Array.isArray(s)) {
        e.typed = !0, e.value = [];
        for (let o = 0; o < s.length; o++) {
          const i = s[o], u = this.item["~run"]({ value: i }, r);
          if (u.issues) {
            const a = {
              type: "array",
              origin: "value",
              input: s,
              key: o,
              value: i
            };
            for (const p of u.issues)
              p.path ? p.path.unshift(a) : p.path = [a], e.issues?.push(p);
            if (e.issues || (e.issues = u.issues), r.abortEarly) {
              e.typed = !1;
              break;
            }
          }
          u.typed || (e.typed = !1), e.value.push(u.value);
        }
      } else y(this, "type", e, r);
      return e;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function _(t) {
  return {
    kind: "schema",
    type: "boolean",
    reference: _,
    expects: "boolean",
    async: !1,
    message: t,
    get "~standard"() {
      return /* @__PURE__ */ g(this);
    },
    "~run"(n, e) {
      return typeof n.value == "boolean" ? n.typed = !0 : y(this, "type", n, e), n;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function k(t, n) {
  return {
    kind: "schema",
    type: "literal",
    reference: k,
    expects: /* @__PURE__ */ T(t),
    async: !1,
    literal: t,
    message: n,
    get "~standard"() {
      return /* @__PURE__ */ g(this);
    },
    "~run"(e, r) {
      return e.value === this.literal ? e.typed = !0 : y(this, "type", e, r), e;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function m(t, n) {
  return {
    kind: "schema",
    type: "nullable",
    reference: m,
    expects: `(${t.expects} | null)`,
    async: !1,
    wrapped: t,
    default: n,
    get "~standard"() {
      return /* @__PURE__ */ g(this);
    },
    "~run"(e, r) {
      return e.value === null && (this.default !== void 0 && (e.value = /* @__PURE__ */ w(this, e, r)), e.value === null) ? (e.typed = !0, e) : this.wrapped["~run"](e, r);
    }
  };
}
// @__NO_SIDE_EFFECTS__
function x(t) {
  return {
    kind: "schema",
    type: "number",
    reference: x,
    expects: "number",
    async: !1,
    message: t,
    get "~standard"() {
      return /* @__PURE__ */ g(this);
    },
    "~run"(n, e) {
      return typeof n.value == "number" && !isNaN(n.value) ? n.typed = !0 : y(this, "type", n, e), n;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function b(t, n) {
  return {
    kind: "schema",
    type: "object",
    reference: b,
    expects: "Object",
    async: !1,
    entries: t,
    message: n,
    get "~standard"() {
      return /* @__PURE__ */ g(this);
    },
    "~run"(e, r) {
      const s = e.value;
      if (s && typeof s == "object") {
        e.typed = !0, e.value = {};
        for (const o in this.entries) {
          const i = this.entries[o];
          if (o in s || (i.type === "exact_optional" || i.type === "optional" || i.type === "nullish") && i.default !== void 0) {
            const u = o in s ? s[o] : /* @__PURE__ */ w(i), a = i["~run"]({ value: u }, r);
            if (a.issues) {
              const p = {
                type: "object",
                origin: "value",
                input: s,
                key: o,
                value: u
              };
              for (const d of a.issues)
                d.path ? d.path.unshift(p) : d.path = [p], e.issues?.push(d);
              if (e.issues || (e.issues = a.issues), r.abortEarly) {
                e.typed = !1;
                break;
              }
            }
            a.typed || (e.typed = !1), e.value[o] = a.value;
          } else if (i.fallback !== void 0) e.value[o] = /* @__PURE__ */ q(i);
          else if (i.type !== "exact_optional" && i.type !== "optional" && i.type !== "nullish" && (y(this, "key", e, r, {
            input: void 0,
            expected: `"${o}"`,
            path: [{
              type: "object",
              origin: "key",
              input: s,
              key: o,
              value: s[o]
            }]
          }), r.abortEarly))
            break;
        }
      } else y(this, "type", e, r);
      return e;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function f(t, n) {
  return {
    kind: "schema",
    type: "optional",
    reference: f,
    expects: `(${t.expects} | undefined)`,
    async: !1,
    wrapped: t,
    default: n,
    get "~standard"() {
      return /* @__PURE__ */ g(this);
    },
    "~run"(e, r) {
      return e.value === void 0 && (this.default !== void 0 && (e.value = /* @__PURE__ */ w(this, e, r)), e.value === void 0) ? (e.typed = !0, e) : this.wrapped["~run"](e, r);
    }
  };
}
// @__NO_SIDE_EFFECTS__
function A(t, n, e) {
  return {
    kind: "schema",
    type: "record",
    reference: A,
    expects: "Object",
    async: !1,
    key: t,
    value: n,
    message: e,
    get "~standard"() {
      return /* @__PURE__ */ g(this);
    },
    "~run"(r, s) {
      const o = r.value;
      if (o && typeof o == "object") {
        r.typed = !0, r.value = {};
        for (const i in o) if (/* @__PURE__ */ J(o, i)) {
          const u = o[i], a = this.key["~run"]({ value: i }, s);
          if (a.issues) {
            const d = {
              type: "object",
              origin: "key",
              input: o,
              key: i,
              value: u
            };
            for (const S of a.issues)
              S.path = [d], r.issues?.push(S);
            if (r.issues || (r.issues = a.issues), s.abortEarly) {
              r.typed = !1;
              break;
            }
          }
          const p = this.value["~run"]({ value: u }, s);
          if (p.issues) {
            const d = {
              type: "object",
              origin: "value",
              input: o,
              key: i,
              value: u
            };
            for (const S of p.issues)
              S.path ? S.path.unshift(d) : S.path = [d], r.issues?.push(S);
            if (r.issues || (r.issues = p.issues), s.abortEarly) {
              r.typed = !1;
              break;
            }
          }
          (!a.typed || !p.typed) && (r.typed = !1), a.typed && (r.value[a.value] = p.value);
        }
      } else y(this, "type", r, s);
      return r;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function l(t) {
  return {
    kind: "schema",
    type: "string",
    reference: l,
    expects: "string",
    async: !1,
    message: t,
    get "~standard"() {
      return /* @__PURE__ */ g(this);
    },
    "~run"(n, e) {
      return typeof n.value == "string" ? n.typed = !0 : y(this, "type", n, e), n;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function P(t) {
  let n;
  if (t) for (const e of t) n ? n.push(...e.issues) : n = e.issues;
  return n;
}
// @__NO_SIDE_EFFECTS__
function F(t, n) {
  return {
    kind: "schema",
    type: "union",
    reference: F,
    expects: /* @__PURE__ */ K(t.map((e) => e.expects), "|"),
    async: !1,
    options: t,
    message: n,
    get "~standard"() {
      return /* @__PURE__ */ g(this);
    },
    "~run"(e, r) {
      let s, o, i;
      for (const u of this.options) {
        const a = u["~run"]({ value: e.value }, r);
        if (a.typed) if (a.issues) o ? o.push(a) : o = [a];
        else {
          s = a;
          break;
        }
        else i ? i.push(a) : i = [a];
      }
      if (s) return s;
      if (o) {
        if (o.length === 1) return o[0];
        y(this, "type", e, r, { issues: /* @__PURE__ */ P(o) }), e.typed = !0;
      } else {
        if (i?.length === 1) return i[0];
        y(this, "type", e, r, { issues: /* @__PURE__ */ P(i) });
      }
      return e;
    }
  };
}
const h = (t) => /* @__PURE__ */ F(t.map((n) => /* @__PURE__ */ k(n))), Q = /* @__PURE__ */ b({
  "en-au": /* @__PURE__ */ l(),
  "en-gb": /* @__PURE__ */ l(),
  "en-us": /* @__PURE__ */ l(),
  "es-es": /* @__PURE__ */ l()
}), M = /* @__PURE__ */ b({
  "en-au": /* @__PURE__ */ f(/* @__PURE__ */ l()),
  "en-gb": /* @__PURE__ */ f(/* @__PURE__ */ l()),
  "en-us": /* @__PURE__ */ f(/* @__PURE__ */ l()),
  "es-es": /* @__PURE__ */ f(/* @__PURE__ */ l())
}), Y = h(["amber", "green", "red", "other"]), Z = h([
  "alpha",
  "beta",
  "generalAvailability",
  "notApplicable",
  "preAlpha",
  "proposed",
  "releaseCandidate",
  "unavailable",
  "underReview"
]), ee = h([
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
h(["app", "engine", "connector", "context", "presenter", "tool"]);
const te = /* @__PURE__ */ b({
  id: /* @__PURE__ */ l(),
  color: Y,
  label: /* @__PURE__ */ l()
}), R = {
  id: /* @__PURE__ */ l(),
  label: M,
  description: M,
  firstCreatedAt: /* @__PURE__ */ f(/* @__PURE__ */ x()),
  icon: /* @__PURE__ */ m(/* @__PURE__ */ l()),
  iconDark: /* @__PURE__ */ m(/* @__PURE__ */ l()),
  lastUpdatedAt: /* @__PURE__ */ m(/* @__PURE__ */ x()),
  status: /* @__PURE__ */ m(te),
  statusId: Z
}, he = /* @__PURE__ */ b({
  ...R,
  typeId: ee
}), N = {
  ...R,
  version: /* @__PURE__ */ l()
}, U = /* @__PURE__ */ b({
  id: /* @__PURE__ */ l(),
  label: M,
  description: M,
  icon: /* @__PURE__ */ m(/* @__PURE__ */ l()),
  iconDark: /* @__PURE__ */ m(/* @__PURE__ */ l()),
  order: /* @__PURE__ */ x(),
  path: /* @__PURE__ */ l()
}), v = (t) => {
  const n = Object.entries(t).filter((e) => typeof e[1] == "string");
  return new Map(n);
}, ne = (t, n, e = O) => {
  const r = t.get(n);
  if (r !== void 0) return r;
  if (e !== n)
    return t.get(e);
}, re = [
  { id: "alpha", color: "red", labels: v({ "en-gb": "alpha" }) },
  { id: "beta", color: "amber", labels: v({ "en-gb": "beta" }) },
  { id: "generalAvailability", color: "green", labels: v({ "en-gb": "" }) },
  { id: "notApplicable", color: "green", labels: v({ "en-gb": "not-applicable" }) },
  { id: "preAlpha", color: "red", labels: v({ "en-gb": "pre-alpha" }) },
  { id: "proposed", color: "other", labels: v({ "en-gb": "proposed" }) },
  { id: "releaseCandidate", color: "green", labels: v({ "en-gb": "release-candidate" }) },
  { id: "unavailable", color: "other", labels: v({ "en-gb": "unavailable" }) },
  { id: "underReview", color: "other", labels: v({ "en-gb": "under-review" }) }
], ve = (t, n = O) => {
  const e = re.find((r) => r.id === t);
  if (e) {
    const r = ne(e.labels, n);
    return { id: e.id, color: e.color, label: r ?? e.id };
  }
  return { id: t, color: "other", label: t };
}, se = h(["apiKey", "disabled", "oAuth2", "none"]), oe = h(["application", "curatedDataset", "database", "fileStore"]), ie = h([
  "abortOperation",
  "authenticateConnection",
  "createObject",
  "describeConnection",
  "dropObject",
  "findObject",
  "getReadableStream",
  "getRecord",
  "listNodes",
  "previewObject",
  "removeRecords",
  "retrieveChunks",
  "retrieveRecords",
  "upsertRecords"
]), ae = h(["bidirectional", "destination", "source", "unknown"]), le = /* @__PURE__ */ b({
  authMethodId: se,
  activeConnectionCount: /* @__PURE__ */ f(/* @__PURE__ */ x()),
  canDescribe: /* @__PURE__ */ f(/* @__PURE__ */ _()),
  id: /* @__PURE__ */ f(/* @__PURE__ */ l()),
  label: /* @__PURE__ */ f(Q),
  maxConnectionCount: /* @__PURE__ */ f(/* @__PURE__ */ x()),
  params: /* @__PURE__ */ f(/* @__PURE__ */ E(/* @__PURE__ */ A(/* @__PURE__ */ l(), /* @__PURE__ */ l())))
}), Ee = /* @__PURE__ */ b({
  ...N,
  typeId: /* @__PURE__ */ k("connector"),
  category: /* @__PURE__ */ m(/* @__PURE__ */ b({ id: /* @__PURE__ */ l(), label: /* @__PURE__ */ l() })),
  categoryId: oe,
  implementations: /* @__PURE__ */ A(/* @__PURE__ */ l(), le),
  operations: /* @__PURE__ */ E(ie),
  usageId: ae,
  vendorAccountURL: /* @__PURE__ */ m(/* @__PURE__ */ l()),
  vendorDocumentationURL: /* @__PURE__ */ m(/* @__PURE__ */ l()),
  vendorHomeURL: /* @__PURE__ */ m(/* @__PURE__ */ l())
}), Se = ["createObject", "dropObject", "removeRecords", "upsertRecords"], xe = ["findObject", "getRecord", "listNodes", "previewObject", "retrieveRecords"], D = (t) => {
  const n = Object.entries(t).filter((e) => typeof e[1] == "string");
  return new Map(n);
};
D({ "en-gb": "Application" }), D({ "en-gb": "Curated Dataset" }), D({ "en-gb": "Database" }), D({ "en-gb": "File Store" });
const ce = h(["list"]), ue = /* @__PURE__ */ b({
  ...R,
  typeId: /* @__PURE__ */ k("contextModelGroup"),
  modelRefs: /* @__PURE__ */ E(U),
  order: /* @__PURE__ */ x()
}), ke = /* @__PURE__ */ b({
  ...N,
  typeId: /* @__PURE__ */ k("context"),
  models: /* @__PURE__ */ E(ue),
  operations: /* @__PURE__ */ E(ce)
});
class I extends Error {
  locator;
  constructor(n, e, r) {
    super(n, r), this.name = "DataPosError", this.locator = e;
  }
}
class C extends I {
  constructor(n, e, r) {
    super(n, e, r), this.name = "ApplicationError";
  }
}
class Ce extends C {
  constructor(n, e, r) {
    super(n, e, r), this.name = "APIError";
  }
}
class Oe extends C {
  constructor(n, e, r) {
    super(n, e, r), this.name = "EngineError";
  }
}
class z extends C {
  body;
  constructor(n, e, r, s) {
    super(n, e, s), this.name = "FetchError", this.body = r;
  }
}
class pe extends C {
  componentName;
  info;
  constructor(n, e, r, s, o) {
    super(n, e, o), this.name = "VueHandledError", this.info = r, this.componentName = s;
  }
}
class De extends C {
  constructor(n, e, r) {
    super(n, e, r), this.name = "WindowHandledRuntimeError";
  }
}
class Me extends C {
  constructor(n, e, r) {
    super(n, e, r), this.name = "WindowHandledPromiseRejectionError";
  }
}
class je extends I {
  constructor(n, e, r) {
    super(n, e, r), this.name = "OperationalError";
  }
}
async function we(t, n, e) {
  const r = ` - ${t.statusText}`, s = `${n} Response status '${t.status}${t.statusText ? r : ""}' received.`, o = await t.text();
  return new z(s, e, o);
}
function Ae(t) {
  return t.map((n) => n.message).join(" ");
}
function Re(t) {
  if (t instanceof Error) return t;
  if (typeof t == "string") return new Error(t);
  if (typeof t == "number" || typeof t == "boolean" || typeof t == "bigint") return new Error(String(t));
  if (typeof t == "symbol") return new Error(t.description ?? "Unknown error");
  if (t && typeof t == "object")
    try {
      return new Error(JSON.stringify(t));
    } catch {
      return new Error("Unknown error");
    }
  return new Error("Unknown error");
}
function Ne(t) {
  const n = /* @__PURE__ */ new Set(), e = [];
  let r = t;
  for (; r && !n.has(r); ) {
    n.add(r);
    let s;
    if (r instanceof z)
      s = { body: r.body, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof pe)
      s = { componentName: r.componentName, info: r.info, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof I)
      s = { locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof Error) {
      const o = r;
      s = { locator: "", message: o.message, name: o.name, stack: o.stack }, r = o.cause;
    } else
      s = { locator: "", message: String(r), name: "Error" }, r = void 0;
    /(?:\.{3}|[.!?])$/.test(s.message) || (s.message += "."), e.push(s);
  }
  return e;
}
const de = h(["list", "render", "setColorMode"]), Ie = /* @__PURE__ */ b({
  ...N,
  typeId: /* @__PURE__ */ k("presenter"),
  presentations: /* @__PURE__ */ E(U),
  operations: /* @__PURE__ */ E(de)
});
function Le() {
  return { render: fe };
}
function fe(t, n, e) {
  e.textContent = "Cytoscape.js diagram goes here...";
}
function Pe() {
  return { render: be };
}
function be(t, n) {
  console.log(1111, t), console.log(2222, n), console.log(3333, n.childNodes), console.log(4444, n.children);
}
const c = (t) => new Map(Object.entries(t)), L = (t, n, e = O) => {
  const r = t.get(n);
  if (r !== void 0) return r;
  if (e !== n)
    return t.get(e);
}, me = [
  { id: "dtv", labels: c({ "en-gb": "Delimited Text" }) },
  { id: "e/e", labels: c({ "en-gb": "Entity/Event" }) },
  { id: "jsonArray", labels: c({ "en-gb": "JSON Array" }) },
  { id: "spss", labels: c({ "en-gb": "SPSS" }) },
  { id: "xls", labels: c({ "en-gb": "XLS" }) },
  { id: "xlsx", labels: c({ "en-gb": "XLSX" }) },
  { id: "xml", labels: c({ "en-gb": "XML" }) }
], Te = (t = O) => {
  const n = [];
  for (const e of me) {
    const r = L(e.labels, t);
    n.push({ id: e.id, label: r ?? e.id });
  }
  return n;
}, ye = [
  { id: `
`, labels: c({ "en-gb": "Newline" }) },
  { id: "\r", labels: c({ "en-gb": "Carriage Return" }) },
  { id: `\r
`, labels: c({ "en-gb": "Carriage Return/Newline" }) }
], _e = (t = O) => {
  const n = [];
  for (const e of ye) {
    const r = L(e.labels, t);
    n.push({ id: e.id, label: r ?? e.id });
  }
  return n;
}, ge = [
  { id: ":", labels: c({ "en-gb": "Colon" }) },
  { id: ",", labels: c({ "en-gb": "Comma" }) },
  { id: "!", labels: c({ "en-gb": "Exclamation Mark" }) },
  // { id: '', label: { 'en-gb': 'Other' } }, // TODO: Maybe set this to a 'not printing' or special ascii character when there is a user supplied delimited, rather than ''?
  { id: "0x1E", labels: c({ "en-gb": "Record Separator" }) },
  { id: ";", labels: c({ "en-gb": "Semicolon" }) },
  { id: " ", labels: c({ "en-gb": "Space" }) },
  { id: "	", labels: c({ "en-gb": "Tab" }) },
  { id: "_", labels: c({ "en-gb": "Underscore" }) },
  { id: "0x1F", labels: c({ "en-gb": "Unit Separator" }) },
  { id: "|", labels: c({ "en-gb": "Vertical Bar" }) }
], Fe = (t = O) => {
  const n = [];
  for (const e of ge) {
    const r = L(e.labels, t);
    n.push({ id: e.id, label: r ?? e.id });
  }
  return n;
}, O = "en-gb";
export {
  Ce as APIError,
  C as ApplicationError,
  Se as CONNECTOR_DESTINATION_OPERATIONS,
  xe as CONNECTOR_SOURCE_OPERATIONS,
  O as DEFAULT_LOCALE_CODE,
  Oe as EngineError,
  z as FetchError,
  je as OperationalError,
  pe as VueError,
  Me as WindowPromiseRejectionError,
  De as WindowRuntimeError,
  we as buildFetchError,
  he as componentConfigSchema,
  Ae as concatenateSerialisedErrorMessages,
  Ee as connectorConfigSchema,
  ke as contextConfigSchema,
  Ge as convertODataTypeIdToUsageTypeId,
  Ve as extractExtensionFromPath,
  He as extractNameFromPath,
  We as formatNumberAsDecimalNumber,
  $e as formatNumberAsDuration,
  Xe as formatNumberAsSize,
  Be as formatNumberAsStorageSize,
  Je as formatNumberAsWholeNumber,
  ve as getComponentStatus,
  Te as getDataFormats,
  _e as getRecordDelimiters,
  Fe as getValueDelimiters,
  Ke as lookupMimeTypeForExtension,
  Re as normalizeToError,
  Ie as presenterConfigSchema,
  Ne as serialiseError,
  Le as useCytoscapeJS,
  Pe as useDataTable
};
