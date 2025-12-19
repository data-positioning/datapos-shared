let j;
// @__NO_SIDE_EFFECTS__
function H(e) {
  return {
    lang: e?.lang ?? j?.lang,
    message: e?.message,
    abortEarly: e?.abortEarly ?? j?.abortEarly,
    abortPipeEarly: e?.abortPipeEarly ?? j?.abortPipeEarly
  };
}
let K;
// @__NO_SIDE_EFFECTS__
function W(e) {
  return K?.get(e);
}
let X;
// @__NO_SIDE_EFFECTS__
function J(e) {
  return X?.get(e);
}
let q;
// @__NO_SIDE_EFFECTS__
function Q(e, r) {
  return q?.get(e)?.get(r);
}
// @__NO_SIDE_EFFECTS__
function U(e) {
  const r = typeof e;
  return r === "string" ? `"${e}"` : r === "number" || r === "bigint" || r === "boolean" ? `${e}` : r === "object" || r === "function" ? (e && Object.getPrototypeOf(e)?.constructor?.name) ?? "null" : r;
}
function g(e, r, t, n, s) {
  const o = s && "input" in s ? s.input : t.value, i = s?.expected ?? e.expects ?? null, u = s?.received ?? /* @__PURE__ */ U(o), a = {
    kind: e.kind,
    type: e.type,
    input: o,
    expected: i,
    received: u,
    message: `Invalid ${r}: ${i ? `Expected ${i} but r` : "R"}eceived ${u}`,
    requirement: e.requirement,
    path: s?.path,
    issues: s?.issues,
    lang: n.lang,
    abortEarly: n.abortEarly,
    abortPipeEarly: n.abortPipeEarly
  }, p = e.kind === "schema", d = s?.message ?? e.message ?? /* @__PURE__ */ Q(e.reference, a.lang) ?? (p ? /* @__PURE__ */ J(a.lang) : null) ?? n.message ?? /* @__PURE__ */ W(a.lang);
  d !== void 0 && (a.message = typeof d == "function" ? d(a) : d), p && (t.typed = !1), t.issues ? t.issues.push(a) : t.issues = [a];
}
// @__NO_SIDE_EFFECTS__
function h(e) {
  return {
    version: 1,
    vendor: "valibot",
    validate(r) {
      return e["~run"]({ value: r }, /* @__PURE__ */ H());
    }
  };
}
// @__NO_SIDE_EFFECTS__
function Y(e, r) {
  return Object.hasOwn(e, r) && r !== "__proto__" && r !== "prototype" && r !== "constructor";
}
// @__NO_SIDE_EFFECTS__
function Z(e, r) {
  const t = [...new Set(e)];
  return t.length > 1 ? `(${t.join(` ${r} `)})` : t[0] ?? "never";
}
// @__NO_SIDE_EFFECTS__
function ee(e, r, t) {
  return typeof e.fallback == "function" ? e.fallback(r, t) : e.fallback;
}
// @__NO_SIDE_EFFECTS__
function A(e, r, t) {
  return typeof e.default == "function" ? e.default(r, t) : e.default;
}
// @__NO_SIDE_EFFECTS__
function x(e, r) {
  return {
    kind: "schema",
    type: "array",
    reference: x,
    expects: "Array",
    async: !1,
    item: e,
    message: r,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(t, n) {
      const s = t.value;
      if (Array.isArray(s)) {
        t.typed = !0, t.value = [];
        for (let o = 0; o < s.length; o++) {
          const i = s[o], u = this.item["~run"]({ value: i }, n);
          if (u.issues) {
            const a = {
              type: "array",
              origin: "value",
              input: s,
              key: o,
              value: i
            };
            for (const p of u.issues)
              p.path ? p.path.unshift(a) : p.path = [a], t.issues?.push(p);
            if (t.issues || (t.issues = u.issues), n.abortEarly) {
              t.typed = !1;
              break;
            }
          }
          u.typed || (t.typed = !1), t.value.push(u.value);
        }
      } else g(this, "type", t, n);
      return t;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function B(e) {
  return {
    kind: "schema",
    type: "boolean",
    reference: B,
    expects: "boolean",
    async: !1,
    message: e,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(r, t) {
      return typeof r.value == "boolean" ? r.typed = !0 : g(this, "type", r, t), r;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function k(e, r) {
  return {
    kind: "schema",
    type: "literal",
    reference: k,
    expects: /* @__PURE__ */ U(e),
    async: !1,
    literal: e,
    message: r,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(t, n) {
      return t.value === this.literal ? t.typed = !0 : g(this, "type", t, n), t;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function y(e, r) {
  return {
    kind: "schema",
    type: "nullable",
    reference: y,
    expects: `(${e.expects} | null)`,
    async: !1,
    wrapped: e,
    default: r,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(t, n) {
      return t.value === null && (this.default !== void 0 && (t.value = /* @__PURE__ */ A(this, t, n)), t.value === null) ? (t.typed = !0, t) : this.wrapped["~run"](t, n);
    }
  };
}
// @__NO_SIDE_EFFECTS__
function D(e) {
  return {
    kind: "schema",
    type: "number",
    reference: D,
    expects: "number",
    async: !1,
    message: e,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(r, t) {
      return typeof r.value == "number" && !isNaN(r.value) ? r.typed = !0 : g(this, "type", r, t), r;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function b(e, r) {
  return {
    kind: "schema",
    type: "object",
    reference: b,
    expects: "Object",
    async: !1,
    entries: e,
    message: r,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(t, n) {
      const s = t.value;
      if (s && typeof s == "object") {
        t.typed = !0, t.value = {};
        for (const o in this.entries) {
          const i = this.entries[o];
          if (o in s || (i.type === "exact_optional" || i.type === "optional" || i.type === "nullish") && i.default !== void 0) {
            const u = o in s ? s[o] : /* @__PURE__ */ A(i), a = i["~run"]({ value: u }, n);
            if (a.issues) {
              const p = {
                type: "object",
                origin: "value",
                input: s,
                key: o,
                value: u
              };
              for (const d of a.issues)
                d.path ? d.path.unshift(p) : d.path = [p], t.issues?.push(d);
              if (t.issues || (t.issues = a.issues), n.abortEarly) {
                t.typed = !1;
                break;
              }
            }
            a.typed || (t.typed = !1), t.value[o] = a.value;
          } else if (i.fallback !== void 0) t.value[o] = /* @__PURE__ */ ee(i);
          else if (i.type !== "exact_optional" && i.type !== "optional" && i.type !== "nullish" && (g(this, "key", t, n, {
            input: void 0,
            expected: `"${o}"`,
            path: [{
              type: "object",
              origin: "key",
              input: s,
              key: o,
              value: s[o]
            }]
          }), n.abortEarly))
            break;
        }
      } else g(this, "type", t, n);
      return t;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function f(e, r) {
  return {
    kind: "schema",
    type: "optional",
    reference: f,
    expects: `(${e.expects} | undefined)`,
    async: !1,
    wrapped: e,
    default: r,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(t, n) {
      return t.value === void 0 && (this.default !== void 0 && (t.value = /* @__PURE__ */ A(this, t, n)), t.value === void 0) ? (t.typed = !0, t) : this.wrapped["~run"](t, n);
    }
  };
}
// @__NO_SIDE_EFFECTS__
function R(e, r, t) {
  return {
    kind: "schema",
    type: "record",
    reference: R,
    expects: "Object",
    async: !1,
    key: e,
    value: r,
    message: t,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(n, s) {
      const o = n.value;
      if (o && typeof o == "object") {
        n.typed = !0, n.value = {};
        for (const i in o) if (/* @__PURE__ */ Y(o, i)) {
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
              S.path = [d], n.issues?.push(S);
            if (n.issues || (n.issues = a.issues), s.abortEarly) {
              n.typed = !1;
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
              S.path ? S.path.unshift(d) : S.path = [d], n.issues?.push(S);
            if (n.issues || (n.issues = p.issues), s.abortEarly) {
              n.typed = !1;
              break;
            }
          }
          (!a.typed || !p.typed) && (n.typed = !1), a.typed && (n.value[a.value] = p.value);
        }
      } else g(this, "type", n, s);
      return n;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function l(e) {
  return {
    kind: "schema",
    type: "string",
    reference: l,
    expects: "string",
    async: !1,
    message: e,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(r, t) {
      return typeof r.value == "string" ? r.typed = !0 : g(this, "type", r, t), r;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function _(e) {
  let r;
  if (e) for (const t of e) r ? r.push(...t.issues) : r = t.issues;
  return r;
}
// @__NO_SIDE_EFFECTS__
function G(e, r) {
  return {
    kind: "schema",
    type: "union",
    reference: G,
    expects: /* @__PURE__ */ Z(e.map((t) => t.expects), "|"),
    async: !1,
    options: e,
    message: r,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(t, n) {
      let s, o, i;
      for (const u of this.options) {
        const a = u["~run"]({ value: t.value }, n);
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
        g(this, "type", t, n, { issues: /* @__PURE__ */ _(o) }), t.typed = !0;
      } else {
        if (i?.length === 1) return i[0];
        g(this, "type", t, n, { issues: /* @__PURE__ */ _(i) });
      }
      return t;
    }
  };
}
const v = (e) => /* @__PURE__ */ G(e.map((r) => /* @__PURE__ */ k(r))), te = /* @__PURE__ */ b({
  "en-au": /* @__PURE__ */ l(),
  "en-gb": /* @__PURE__ */ l(),
  "en-us": /* @__PURE__ */ l(),
  "es-es": /* @__PURE__ */ l()
}), O = /* @__PURE__ */ b({
  "en-au": /* @__PURE__ */ f(/* @__PURE__ */ l()),
  "en-gb": /* @__PURE__ */ f(/* @__PURE__ */ l()),
  "en-us": /* @__PURE__ */ f(/* @__PURE__ */ l()),
  "es-es": /* @__PURE__ */ f(/* @__PURE__ */ l())
}), re = v(["amber", "green", "red", "other"]), ne = v([
  "alpha",
  "beta",
  "generalAvailability",
  "notApplicable",
  "preAlpha",
  "proposed",
  "releaseCandidate",
  "unavailable",
  "underReview"
]), se = v([
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
v(["app", "engine", "connector", "context", "presenter", "tool"]);
const oe = /* @__PURE__ */ b({
  id: /* @__PURE__ */ l(),
  color: re,
  label: /* @__PURE__ */ l()
}), T = {
  id: /* @__PURE__ */ l(),
  label: O,
  description: O,
  firstCreatedAt: /* @__PURE__ */ f(/* @__PURE__ */ D()),
  icon: /* @__PURE__ */ y(/* @__PURE__ */ l()),
  iconDark: /* @__PURE__ */ y(/* @__PURE__ */ l()),
  lastUpdatedAt: /* @__PURE__ */ y(/* @__PURE__ */ D()),
  status: /* @__PURE__ */ y(oe),
  statusId: ne
}, De = /* @__PURE__ */ b({
  ...T,
  typeId: se
}), $ = {
  ...T,
  version: /* @__PURE__ */ l()
}, P = /* @__PURE__ */ b({
  id: /* @__PURE__ */ l(),
  label: O,
  description: O,
  icon: /* @__PURE__ */ y(/* @__PURE__ */ l()),
  iconDark: /* @__PURE__ */ y(/* @__PURE__ */ l()),
  order: /* @__PURE__ */ D(),
  path: /* @__PURE__ */ l()
}), E = (e) => {
  const r = Object.entries(e).filter((t) => typeof t[1] == "string");
  return new Map(r);
}, ie = (e, r, t = I) => {
  const n = e.get(r);
  if (n !== void 0) return n;
  if (t !== r)
    return e.get(t);
}, ae = [
  { id: "alpha", color: "red", labels: E({ "en-gb": "alpha" }) },
  { id: "beta", color: "amber", labels: E({ "en-gb": "beta" }) },
  { id: "generalAvailability", color: "green", labels: E({ "en-gb": "" }) },
  { id: "notApplicable", color: "green", labels: E({ "en-gb": "not-applicable" }) },
  { id: "preAlpha", color: "red", labels: E({ "en-gb": "pre-alpha" }) },
  { id: "proposed", color: "other", labels: E({ "en-gb": "proposed" }) },
  { id: "releaseCandidate", color: "green", labels: E({ "en-gb": "release-candidate" }) },
  { id: "unavailable", color: "other", labels: E({ "en-gb": "unavailable" }) },
  { id: "underReview", color: "other", labels: E({ "en-gb": "under-review" }) }
], ke = (e, r = I) => {
  const t = ae.find((n) => n.id === e);
  if (t) {
    const n = ie(t.labels, r);
    return { id: t.id, color: t.color, label: n ?? t.id };
  }
  return { id: e, color: "other", label: e };
}, le = v(["application", "curatedDataset", "database", "fileStore"]), ce = v([
  "abortOperation",
  "authenticateConnection",
  "createObject",
  "describeConnection",
  "dropObject",
  "findObject",
  "getReader",
  "getRecord",
  "listNodes",
  "previewObject",
  "removeRecords",
  "retrieveRecords",
  "upsertRecords"
]), ue = v(["bidirectional", "destination", "source", "unknown"]), pe = v(["apiKey", "disabled", "oAuth2", "none"]), de = /* @__PURE__ */ b({
  id: /* @__PURE__ */ l(),
  label: /* @__PURE__ */ l()
}), fe = /* @__PURE__ */ b({
  authMethodId: pe,
  activeConnectionCount: /* @__PURE__ */ f(/* @__PURE__ */ D()),
  canDescribe: /* @__PURE__ */ f(/* @__PURE__ */ B()),
  id: /* @__PURE__ */ f(/* @__PURE__ */ l()),
  label: /* @__PURE__ */ f(te),
  maxConnectionCount: /* @__PURE__ */ f(/* @__PURE__ */ D()),
  params: /* @__PURE__ */ f(/* @__PURE__ */ x(/* @__PURE__ */ R(/* @__PURE__ */ l(), /* @__PURE__ */ l())))
}), we = /* @__PURE__ */ b({
  ...$,
  typeId: /* @__PURE__ */ k("connector"),
  category: /* @__PURE__ */ y(de),
  categoryId: le,
  implementations: /* @__PURE__ */ R(/* @__PURE__ */ l(), fe),
  operations: /* @__PURE__ */ x(ce),
  usageId: ue,
  vendorAccountURL: /* @__PURE__ */ y(/* @__PURE__ */ l()),
  vendorDocumentationURL: /* @__PURE__ */ y(/* @__PURE__ */ l()),
  vendorHomeURL: /* @__PURE__ */ y(/* @__PURE__ */ l())
}), Ie = ["createObject", "dropObject", "removeRecords", "upsertRecords"], Me = ["findObject", "getRecord", "listNodes", "previewObject", "retrieveRecords"], M = (e) => {
  const r = Object.entries(e).filter((t) => typeof t[1] == "string");
  return new Map(r);
};
M({ "en-gb": "Application" }), M({ "en-gb": "Curated Dataset" }), M({ "en-gb": "Database" }), M({ "en-gb": "File Store" });
const me = v(["list"]), be = /* @__PURE__ */ b({
  ...T,
  typeId: /* @__PURE__ */ k("contextModelGroup"),
  modelRefs: /* @__PURE__ */ x(P),
  order: /* @__PURE__ */ D()
}), Oe = /* @__PURE__ */ b({
  ...$,
  typeId: /* @__PURE__ */ k("context"),
  models: /* @__PURE__ */ x(be),
  operations: /* @__PURE__ */ x(me)
});
class F extends Error {
  locator;
  constructor(r, t, n) {
    super(r, n), this.name = "DataPosError", this.locator = t;
  }
}
class w extends F {
  constructor(r, t, n) {
    super(r, t, n), this.name = "ApplicationError";
  }
}
class Ce extends w {
  constructor(r, t, n) {
    super(r, t, n), this.name = "APIError";
  }
}
class Ne extends w {
  constructor(r, t, n) {
    super(r, t, n), this.name = "EngineError";
  }
}
class z extends w {
  body;
  constructor(r, t, n, s) {
    super(r, t, s), this.name = "FetchError", this.body = n;
  }
}
class ye extends w {
  componentName;
  info;
  constructor(r, t, n, s, o) {
    super(r, t, o), this.name = "VueHandledError", this.info = n, this.componentName = s;
  }
}
class je extends w {
  constructor(r, t, n) {
    super(r, t, n), this.name = "WindowHandledRuntimeError";
  }
}
class Ae extends w {
  constructor(r, t, n) {
    super(r, t, n), this.name = "WindowHandledPromiseRejectionError";
  }
}
class Re extends F {
  constructor(r, t, n) {
    super(r, t, n), this.name = "OperationalError";
  }
}
async function Te(e, r, t) {
  const n = ` - ${e.statusText}`, s = `${r} Response status '${e.status}${e.statusText ? n : ""}' received.`, o = await e.text();
  return new z(s, t, o);
}
function $e(e) {
  return e.map((r) => r.message).join(" ");
}
function Fe(e) {
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
function Le(e) {
  const r = /* @__PURE__ */ new Set(), t = [];
  let n = e;
  for (; n && !r.has(n); ) {
    r.add(n);
    let s;
    if (n instanceof z)
      s = { body: n.body, locator: n.locator, message: n.message, name: n.name, stack: n.stack }, n = n.cause;
    else if (n instanceof ye)
      s = { componentName: n.componentName, info: n.info, locator: n.locator, message: n.message, name: n.name, stack: n.stack }, n = n.cause;
    else if (n instanceof F)
      s = { locator: n.locator, message: n.message, name: n.name, stack: n.stack }, n = n.cause;
    else if (n instanceof Error) {
      const o = n;
      s = { locator: "", message: o.message, name: o.name, stack: o.stack }, n = o.cause;
    } else
      s = { locator: "", message: String(n), name: "Error" }, n = void 0;
    /(?:\.{3}|[.!?])$/.test(s.message) || (s.message += "."), t.push(s);
  }
  return t;
}
const ge = v(["list", "render", "setColorMode"]), _e = /* @__PURE__ */ b({
  ...$,
  typeId: /* @__PURE__ */ k("presenter"),
  presentations: /* @__PURE__ */ x(P),
  operations: /* @__PURE__ */ x(ge)
});
function Ue() {
  return { render: he };
}
function he(e, r, t) {
  t.textContent = "Cytoscape.js diagram goes here...";
}
function Be() {
  return { render: ve };
}
function ve(e, r) {
  console.log(1111, e), console.log(2222, r), console.log(3333, r.childNodes), console.log(4444, r.children);
}
const V = "en-US", C = /* @__PURE__ */ new Map();
function Ge(e) {
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
function Pe(e) {
  if (e) {
    const r = e.lastIndexOf("/"), t = e.lastIndexOf(".", r === -1 ? e.length : r);
    return t === -1 ? e : e.slice(0, Math.max(0, t));
  }
}
function ze(e) {
  if (e) {
    const r = e.lastIndexOf(".");
    if (r !== -1) return e.slice(Math.max(0, r + 1));
  }
}
function m(e, r = 2, t = r, n = V) {
  if (e == null) return "";
  const s = `${n}decimal${r}.${t}`;
  let o = C.get(s);
  return o || (o = new Intl.NumberFormat(n, {
    localeMatcher: "best fit",
    maximumFractionDigits: r,
    minimumFractionDigits: t,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), C.set(s, o)), o.format(e);
}
function Ve(e) {
  return e == null ? "" : e < 1e3 ? N(e) : e < 1e6 ? `${m(e / 1e3, 2, 0)}K` : e < 1e9 ? `${m(e / 1e6, 2, 0)}M` : e < 1e12 ? `${m(e / 1e9, 2, 0)}B` : `${m(e / 1e12, 2, 0)}T`;
}
function He(e) {
  return e == null ? "" : e === 1 ? "1 byte" : e < 1024 ? `${N(e)} bytes` : e < 1048576 ? `${m(e / 1024, 2, 0)} KB` : e < 1073741824 ? `${m(e / 1048576, 2, 0)} MB` : e < 1099511627776 ? `${m(e / 1073741824, 2, 0)} GB` : `${m(e / 1099511627776, 2, 0)} TB`;
}
function Ke(e) {
  return e == null ? "" : e < 1e3 ? `${N(e)} ms` : e === 1e3 ? `${N(e)} sec` : e < 6e4 ? `${m(e / 1e3, 2, 0)} secs` : e === 6e4 ? "1 min" : e < 36e5 ? `${m(e / 6e4, 2, 0)} mins` : e === 36e5 ? "1 hr" : e < 864e5 ? `${m(e / 36e5, 2, 0)} hrs` : e === 864e5 ? "1 day" : `${m(e / 864e5, 2, 0)} days`;
}
function N(e, r = V) {
  if (e == null) return "";
  const t = `${r}decimal0.0`;
  let n = C.get(t);
  return n || (n = new Intl.NumberFormat(r, {
    localeMatcher: "best fit",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), C.set(t, n)), n.format(e);
}
function We(e) {
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
const c = (e) => new Map(Object.entries(e)), L = (e, r, t = I) => {
  const n = e.get(r);
  if (n !== void 0) return n;
  if (t !== r)
    return e.get(t);
}, Ee = [
  { id: "dtv", labels: c({ "en-gb": "Delimited Text" }) },
  { id: "e/e", labels: c({ "en-gb": "Entity/Event" }) },
  { id: "jsonArray", labels: c({ "en-gb": "JSON Array" }) },
  { id: "spss", labels: c({ "en-gb": "SPSS" }) },
  { id: "xls", labels: c({ "en-gb": "XLS" }) },
  { id: "xlsx", labels: c({ "en-gb": "XLSX" }) },
  { id: "xml", labels: c({ "en-gb": "XML" }) }
], Xe = (e = I) => {
  const r = [];
  for (const t of Ee) {
    const n = L(t.labels, e);
    r.push({ id: t.id, label: n ?? t.id });
  }
  return r;
}, xe = [
  { id: `
`, labels: c({ "en-gb": "Newline" }) },
  { id: "\r", labels: c({ "en-gb": "Carriage Return" }) },
  { id: `\r
`, labels: c({ "en-gb": "Carriage Return/Newline" }) }
], Je = (e = I) => {
  const r = [];
  for (const t of xe) {
    const n = L(t.labels, e);
    r.push({ id: t.id, label: n ?? t.id });
  }
  return r;
}, Se = [
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
], qe = (e = I) => {
  const r = [];
  for (const t of Se) {
    const n = L(t.labels, e);
    r.push({ id: t.id, label: n ?? t.id });
  }
  return r;
}, I = "en-gb";
export {
  Ce as APIError,
  w as ApplicationError,
  Ie as CONNECTOR_DESTINATION_OPERATIONS,
  Me as CONNECTOR_SOURCE_OPERATIONS,
  I as DEFAULT_LOCALE_CODE,
  Ne as EngineError,
  z as FetchError,
  Re as OperationalError,
  ye as VueError,
  Ae as WindowPromiseRejectionError,
  je as WindowRuntimeError,
  Te as buildFetchError,
  De as componentConfigSchema,
  $e as concatenateSerialisedErrorMessages,
  we as connectorConfigSchema,
  Oe as contextConfigSchema,
  Ge as convertODataTypeIdToUsageTypeId,
  ze as extractExtensionFromPath,
  Pe as extractNameFromPath,
  m as formatNumberAsDecimalNumber,
  Ke as formatNumberAsDuration,
  Ve as formatNumberAsSize,
  He as formatNumberAsStorageSize,
  N as formatNumberAsWholeNumber,
  ke as getComponentStatus,
  Xe as getDataFormats,
  Je as getRecordDelimiters,
  qe as getValueDelimiters,
  We as lookupMimeTypeForExtension,
  Fe as normalizeToError,
  _e as presenterConfigSchema,
  Le as serialiseError,
  Ue as useCytoscapeJS,
  Be as useDataTable
};
