let O;
// @__NO_SIDE_EFFECTS__
function L(e) {
  return {
    lang: e?.lang ?? O?.lang,
    message: e?.message,
    abortEarly: e?.abortEarly ?? O?.abortEarly,
    abortPipeEarly: e?.abortPipeEarly ?? O?.abortPipeEarly
  };
}
let P;
// @__NO_SIDE_EFFECTS__
function V(e) {
  return P?.get(e);
}
let H;
// @__NO_SIDE_EFFECTS__
function K(e) {
  return H?.get(e);
}
let W;
// @__NO_SIDE_EFFECTS__
function X(e, r) {
  return W?.get(e)?.get(r);
}
// @__NO_SIDE_EFFECTS__
function F(e) {
  const r = typeof e;
  return r === "string" ? `"${e}"` : r === "number" || r === "bigint" || r === "boolean" ? `${e}` : r === "object" || r === "function" ? (e && Object.getPrototypeOf(e)?.constructor?.name) ?? "null" : r;
}
function y(e, r, t, n, o) {
  const s = o && "input" in o ? o.input : t.value, i = o?.expected ?? e.expects ?? null, c = o?.received ?? /* @__PURE__ */ F(s), a = {
    kind: e.kind,
    type: e.type,
    input: s,
    expected: i,
    received: c,
    message: `Invalid ${r}: ${i ? `Expected ${i} but r` : "R"}eceived ${c}`,
    requirement: e.requirement,
    path: o?.path,
    issues: o?.issues,
    lang: n.lang,
    abortEarly: n.abortEarly,
    abortPipeEarly: n.abortPipeEarly
  }, u = e.kind === "schema", p = o?.message ?? e.message ?? /* @__PURE__ */ X(e.reference, a.lang) ?? (u ? /* @__PURE__ */ K(a.lang) : null) ?? n.message ?? /* @__PURE__ */ V(a.lang);
  p !== void 0 && (a.message = typeof p == "function" ? p(a) : p), u && (t.typed = !1), t.issues ? t.issues.push(a) : t.issues = [a];
}
// @__NO_SIDE_EFFECTS__
function g(e) {
  return {
    version: 1,
    vendor: "valibot",
    validate(r) {
      return e["~run"]({ value: r }, /* @__PURE__ */ L());
    }
  };
}
// @__NO_SIDE_EFFECTS__
function z(e, r) {
  return Object.hasOwn(e, r) && r !== "__proto__" && r !== "prototype" && r !== "constructor";
}
// @__NO_SIDE_EFFECTS__
function J(e, r) {
  const t = [...new Set(e)];
  return t.length > 1 ? `(${t.join(` ${r} `)})` : t[0] ?? "never";
}
// @__NO_SIDE_EFFECTS__
function q(e, r, t) {
  return typeof e.fallback == "function" ? e.fallback(r, t) : e.fallback;
}
// @__NO_SIDE_EFFECTS__
function N(e, r, t) {
  return typeof e.default == "function" ? e.default(r, t) : e.default;
}
// @__NO_SIDE_EFFECTS__
function v(e, r) {
  return {
    kind: "schema",
    type: "array",
    reference: v,
    expects: "Array",
    async: !1,
    item: e,
    message: r,
    get "~standard"() {
      return /* @__PURE__ */ g(this);
    },
    "~run"(t, n) {
      const o = t.value;
      if (Array.isArray(o)) {
        t.typed = !0, t.value = [];
        for (let s = 0; s < o.length; s++) {
          const i = o[s], c = this.item["~run"]({ value: i }, n);
          if (c.issues) {
            const a = {
              type: "array",
              origin: "value",
              input: o,
              key: s,
              value: i
            };
            for (const u of c.issues)
              u.path ? u.path.unshift(a) : u.path = [a], t.issues?.push(u);
            if (t.issues || (t.issues = c.issues), n.abortEarly) {
              t.typed = !1;
              break;
            }
          }
          c.typed || (t.typed = !1), t.value.push(c.value);
        }
      } else y(this, "type", t, n);
      return t;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function $(e) {
  return {
    kind: "schema",
    type: "boolean",
    reference: $,
    expects: "boolean",
    async: !1,
    message: e,
    get "~standard"() {
      return /* @__PURE__ */ g(this);
    },
    "~run"(r, t) {
      return typeof r.value == "boolean" ? r.typed = !0 : y(this, "type", r, t), r;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function k(e, r) {
  return {
    kind: "schema",
    type: "literal",
    reference: k,
    expects: /* @__PURE__ */ F(e),
    async: !1,
    literal: e,
    message: r,
    get "~standard"() {
      return /* @__PURE__ */ g(this);
    },
    "~run"(t, n) {
      return t.value === this.literal ? t.typed = !0 : y(this, "type", t, n), t;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function b(e, r) {
  return {
    kind: "schema",
    type: "nullable",
    reference: b,
    expects: `(${e.expects} | null)`,
    async: !1,
    wrapped: e,
    default: r,
    get "~standard"() {
      return /* @__PURE__ */ g(this);
    },
    "~run"(t, n) {
      return t.value === null && (this.default !== void 0 && (t.value = /* @__PURE__ */ N(this, t, n)), t.value === null) ? (t.typed = !0, t) : this.wrapped["~run"](t, n);
    }
  };
}
// @__NO_SIDE_EFFECTS__
function S(e) {
  return {
    kind: "schema",
    type: "number",
    reference: S,
    expects: "number",
    async: !1,
    message: e,
    get "~standard"() {
      return /* @__PURE__ */ g(this);
    },
    "~run"(r, t) {
      return typeof r.value == "number" && !isNaN(r.value) ? r.typed = !0 : y(this, "type", r, t), r;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function m(e, r) {
  return {
    kind: "schema",
    type: "object",
    reference: m,
    expects: "Object",
    async: !1,
    entries: e,
    message: r,
    get "~standard"() {
      return /* @__PURE__ */ g(this);
    },
    "~run"(t, n) {
      const o = t.value;
      if (o && typeof o == "object") {
        t.typed = !0, t.value = {};
        for (const s in this.entries) {
          const i = this.entries[s];
          if (s in o || (i.type === "exact_optional" || i.type === "optional" || i.type === "nullish") && i.default !== void 0) {
            const c = s in o ? o[s] : /* @__PURE__ */ N(i), a = i["~run"]({ value: c }, n);
            if (a.issues) {
              const u = {
                type: "object",
                origin: "value",
                input: o,
                key: s,
                value: c
              };
              for (const p of a.issues)
                p.path ? p.path.unshift(u) : p.path = [u], t.issues?.push(p);
              if (t.issues || (t.issues = a.issues), n.abortEarly) {
                t.typed = !1;
                break;
              }
            }
            a.typed || (t.typed = !1), t.value[s] = a.value;
          } else if (i.fallback !== void 0) t.value[s] = /* @__PURE__ */ q(i);
          else if (i.type !== "exact_optional" && i.type !== "optional" && i.type !== "nullish" && (y(this, "key", t, n, {
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
      } else y(this, "type", t, n);
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
      return /* @__PURE__ */ g(this);
    },
    "~run"(t, n) {
      return t.value === void 0 && (this.default !== void 0 && (t.value = /* @__PURE__ */ N(this, t, n)), t.value === void 0) ? (t.typed = !0, t) : this.wrapped["~run"](t, n);
    }
  };
}
// @__NO_SIDE_EFFECTS__
function M(e, r, t) {
  return {
    kind: "schema",
    type: "record",
    reference: M,
    expects: "Object",
    async: !1,
    key: e,
    value: r,
    message: t,
    get "~standard"() {
      return /* @__PURE__ */ g(this);
    },
    "~run"(n, o) {
      const s = n.value;
      if (s && typeof s == "object") {
        n.typed = !0, n.value = {};
        for (const i in s) if (/* @__PURE__ */ z(s, i)) {
          const c = s[i], a = this.key["~run"]({ value: i }, o);
          if (a.issues) {
            const p = {
              type: "object",
              origin: "key",
              input: s,
              key: i,
              value: c
            };
            for (const x of a.issues)
              x.path = [p], n.issues?.push(x);
            if (n.issues || (n.issues = a.issues), o.abortEarly) {
              n.typed = !1;
              break;
            }
          }
          const u = this.value["~run"]({ value: c }, o);
          if (u.issues) {
            const p = {
              type: "object",
              origin: "value",
              input: s,
              key: i,
              value: c
            };
            for (const x of u.issues)
              x.path ? x.path.unshift(p) : x.path = [p], n.issues?.push(x);
            if (n.issues || (n.issues = u.issues), o.abortEarly) {
              n.typed = !1;
              break;
            }
          }
          (!a.typed || !u.typed) && (n.typed = !1), a.typed && (n.value[a.value] = u.value);
        }
      } else y(this, "type", n, o);
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
      return /* @__PURE__ */ g(this);
    },
    "~run"(r, t) {
      return typeof r.value == "string" ? r.typed = !0 : y(this, "type", r, t), r;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function T(e) {
  let r;
  if (e) for (const t of e) r ? r.push(...t.issues) : r = t.issues;
  return r;
}
// @__NO_SIDE_EFFECTS__
function _(e, r) {
  return {
    kind: "schema",
    type: "union",
    reference: _,
    expects: /* @__PURE__ */ J(e.map((t) => t.expects), "|"),
    async: !1,
    options: e,
    message: r,
    get "~standard"() {
      return /* @__PURE__ */ g(this);
    },
    "~run"(t, n) {
      let o, s, i;
      for (const c of this.options) {
        const a = c["~run"]({ value: t.value }, n);
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
        y(this, "type", t, n, { issues: /* @__PURE__ */ T(s) }), t.typed = !0;
      } else {
        if (i?.length === 1) return i[0];
        y(this, "type", t, n, { issues: /* @__PURE__ */ T(i) });
      }
      return t;
    }
  };
}
const h = (e) => /* @__PURE__ */ _(e.map((r) => /* @__PURE__ */ k(r))), Q = /* @__PURE__ */ m({
  "en-au": /* @__PURE__ */ l(),
  "en-gb": /* @__PURE__ */ l(),
  "en-us": /* @__PURE__ */ l(),
  "es-es": /* @__PURE__ */ l()
}), D = /* @__PURE__ */ m({
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
const te = /* @__PURE__ */ m({
  id: /* @__PURE__ */ l(),
  color: Y,
  label: /* @__PURE__ */ l()
}), j = {
  id: /* @__PURE__ */ l(),
  label: D,
  description: D,
  firstCreatedAt: /* @__PURE__ */ f(/* @__PURE__ */ S()),
  icon: /* @__PURE__ */ b(/* @__PURE__ */ l()),
  iconDark: /* @__PURE__ */ b(/* @__PURE__ */ l()),
  lastUpdatedAt: /* @__PURE__ */ b(/* @__PURE__ */ S()),
  status: /* @__PURE__ */ b(te),
  statusId: Z
}, ye = /* @__PURE__ */ m({
  ...j,
  typeId: ee
}), A = {
  ...j,
  version: /* @__PURE__ */ l()
}, U = /* @__PURE__ */ m({
  id: /* @__PURE__ */ l(),
  label: D,
  description: D,
  icon: /* @__PURE__ */ b(/* @__PURE__ */ l()),
  iconDark: /* @__PURE__ */ b(/* @__PURE__ */ l()),
  order: /* @__PURE__ */ S(),
  path: /* @__PURE__ */ l()
}), re = [
  { id: "alpha", color: "red", label: { "en-gb": "alpha" } },
  { id: "beta", color: "amber", label: { "en-gb": "beta" } },
  { id: "generalAvailability", color: "green", label: { "en-gb": "" } },
  { id: "notApplicable", color: "green", label: { "en-gb": "not-applicable" } },
  { id: "preAlpha", color: "red", label: { "en-gb": "pre-alpha" } },
  { id: "proposed", color: "other", label: { "en-gb": "proposed" } },
  { id: "releaseCandidate", color: "green", label: { "en-gb": "release-candidate" } },
  { id: "unavailable", color: "other", label: { "en-gb": "unavailable" } },
  { id: "underReview", color: "other", label: { "en-gb": "under-review" } }
], ge = (e, r = E) => {
  const t = re.find((n) => n.id === e);
  return t ? { ...t, label: t.label[r] || t.label[E] || e } : { id: e, color: "other", label: e };
}, ne = h(["application", "curatedDataset", "database", "fileStore"]), oe = h([
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
]), se = h(["bidirectional", "destination", "source", "unknown"]), ie = h(["apiKey", "disabled", "oAuth2", "none"]), ae = /* @__PURE__ */ m({
  id: /* @__PURE__ */ l(),
  label: /* @__PURE__ */ l()
}), le = /* @__PURE__ */ m({
  authMethodId: ie,
  activeConnectionCount: /* @__PURE__ */ f(/* @__PURE__ */ S()),
  canDescribe: /* @__PURE__ */ f(/* @__PURE__ */ $()),
  id: /* @__PURE__ */ f(/* @__PURE__ */ l()),
  label: /* @__PURE__ */ f(Q),
  maxConnectionCount: /* @__PURE__ */ f(/* @__PURE__ */ S()),
  params: /* @__PURE__ */ f(/* @__PURE__ */ v(/* @__PURE__ */ M(/* @__PURE__ */ l(), /* @__PURE__ */ l())))
}), he = /* @__PURE__ */ m({
  ...A,
  typeId: /* @__PURE__ */ k("connector"),
  category: /* @__PURE__ */ b(ae),
  categoryId: ne,
  implementations: /* @__PURE__ */ M(/* @__PURE__ */ l(), le),
  operations: /* @__PURE__ */ v(oe),
  usageId: se,
  vendorAccountURL: /* @__PURE__ */ b(/* @__PURE__ */ l()),
  vendorDocumentationURL: /* @__PURE__ */ b(/* @__PURE__ */ l()),
  vendorHomeURL: /* @__PURE__ */ b(/* @__PURE__ */ l())
}), ve = ["createObject", "dropObject", "removeRecords", "upsertRecords"], Ee = ["findObject", "getRecord", "listNodes", "previewObject", "retrieveRecords"], ce = h(["list"]), ue = /* @__PURE__ */ m({
  ...j,
  typeId: /* @__PURE__ */ k("contextModelGroup"),
  modelRefs: /* @__PURE__ */ v(U),
  order: /* @__PURE__ */ S()
}), xe = /* @__PURE__ */ m({
  ...A,
  typeId: /* @__PURE__ */ k("context"),
  models: /* @__PURE__ */ v(ue),
  operations: /* @__PURE__ */ v(ce)
}), pe = h(["list", "render", "setColorMode"]), Se = /* @__PURE__ */ m({
  ...A,
  typeId: /* @__PURE__ */ k("presenter"),
  presentations: /* @__PURE__ */ v(U),
  operations: /* @__PURE__ */ v(pe)
});
function ke() {
  function e(r, t, n) {
    n.textContent = "Cytoscape.js diagram goes here...";
  }
  return { render: e };
}
function Ie() {
  function e(r, t) {
    console.log(1111, r), console.log(2222, t), console.log(3333, t.childNodes), console.log(4444, t.children);
  }
  return { render: e };
}
const De = 0, we = (e) => e, Ce = () => Date.now();
class R extends Error {
  locator;
  constructor(r, t, n) {
    super(r, n), this.name = "DataPosError", this.locator = t, Error.captureStackTrace?.(this, new.target);
  }
}
class I extends R {
  constructor(r, t, n) {
    super(r, t, n), this.name = "ApplicationError";
  }
}
class Oe extends I {
  constructor(r, t, n) {
    super(r, t, n), this.name = "APIError";
  }
}
class Ne extends I {
  constructor(r, t, n) {
    super(r, t, n), this.name = "EngineError";
  }
}
class G extends I {
  body;
  constructor(r, t, n, o) {
    super(r, t, o), this.name = "FetchError", this.body = n;
  }
}
class fe extends I {
  componentName;
  info;
  constructor(r, t, n, o, s) {
    super(r, t, s), this.name = "VueHandledError", this.info = n, this.componentName = o;
  }
}
class Me extends I {
  constructor(r, t, n) {
    super(r, t, n), this.name = "WindowHandledRuntimeError";
  }
}
class je extends I {
  constructor(r, t, n) {
    super(r, t, n), this.name = "WindowHandledPromiseRejectionError";
  }
}
class Ae extends R {
  constructor(r, t, n) {
    super(r, t, n), this.name = "OperationalError";
  }
}
async function Re(e, r, t) {
  const n = `${r} Response status '${e.status}${e.statusText ? ` - ${e.statusText}` : ""}' received.`, o = await e.text();
  return new G(n, t, o);
}
function Te(e) {
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
function $e(e) {
  const r = /* @__PURE__ */ new Set(), t = [];
  let n = e;
  for (; n && !r.has(n); ) {
    r.add(n);
    let o;
    if (n instanceof G)
      o = { body: n.body, locator: n.locator, message: n.message, name: n.name, stack: n.stack }, n = n.cause;
    else if (n instanceof fe)
      o = { componentName: n.componentName, info: n.info, locator: n.locator, message: n.message, name: n.name, stack: n.stack }, n = n.cause;
    else if (n instanceof R)
      o = { locator: n.locator, message: n.message, name: n.name, stack: n.stack }, n = n.cause;
    else if (n instanceof Error) {
      const s = n;
      o = { locator: "", message: s.message, name: s.name, stack: s.stack }, n = s.cause;
    } else n ? (o = { locator: "", message: String(n), name: "Error" }, n = void 0) : (o = { locator: "", message: "Unknown error.", name: "Error" }, n = void 0);
    /(?:\.{3}|[.!?])$/.test(o.message) || (o.message += "."), t.push(o);
  }
  return t;
}
const B = "en-US", w = {};
function _e(e) {
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
function Ue(e) {
  if (e) {
    const r = e.lastIndexOf("/"), t = e.lastIndexOf(".", r > -1 ? r : e.length);
    return t > -1 ? e.substring(0, t) : e;
  }
}
function Ge(e) {
  if (e) {
    const r = e.lastIndexOf(".");
    if (r > -1) return e.substring(r + 1);
  }
}
function d(e, r = 2, t = r, n = B) {
  if (e == null) return "";
  const o = `${n}decimal${r}.${t}`;
  let s = w[o];
  return s || (s = new Intl.NumberFormat(n, {
    localeMatcher: "best fit",
    maximumFractionDigits: r,
    minimumFractionDigits: t,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), w[o] = s), s.format(e);
}
function Be(e) {
  return e == null ? "" : e < 1e3 ? C(e) : e < 1e6 ? `${d(e / 1e3, 2, 0)}K` : e < 1e9 ? `${d(e / 1e6, 2, 0)}M` : e < 1e12 ? `${d(e / 1e9, 2, 0)}B` : `${d(e / 1e12, 2, 0)}T`;
}
function Le(e) {
  return e == null ? "" : e === 1 ? "1 byte" : e < 1024 ? `${C(e)} bytes` : e < 1048576 ? `${d(e / 1024, 2, 0)} KB` : e < 1073741824 ? `${d(e / 1048576, 2, 0)} MB` : e < 1099511627776 ? `${d(e / 1073741824, 2, 0)} GB` : `${d(e / 1099511627776, 2, 0)} TB`;
}
function Pe(e) {
  return e == null ? "" : e < 1e3 ? `${C(e)} ms` : e === 1e3 ? `${C(e)} sec` : e < 6e4 ? `${d(e / 1e3, 2, 0)} secs` : e === 6e4 ? "1 min" : e < 36e5 ? `${d(e / 6e4, 2, 0)} mins` : e === 36e5 ? "1 hr" : e < 864e5 ? `${d(e / 36e5, 2, 0)} hrs` : e === 864e5 ? "1 day" : `${d(e / 864e5, 2, 0)} days`;
}
function C(e, r = B) {
  if (e == null) return "";
  const t = `${r}decimal0.0`;
  let n = w[t];
  return n || (n = new Intl.NumberFormat(r, {
    localeMatcher: "best fit",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), w[t] = n), n.format(e);
}
function Ve(e) {
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
const de = [
  { id: "dtv", label: { "en-gb": "Delimited Text" } },
  { id: "e/e", label: { "en-gb": "Entity/Event" } },
  { id: "jsonArray", label: { "en-gb": "JSON Array" } },
  { id: "spss", label: { "en-gb": "SPSS" } },
  { id: "xls", label: { "en-gb": "XLS" } },
  { id: "xlsx", label: { "en-gb": "XLSX" } },
  { id: "xml", label: { "en-gb": "XML" } }
], He = (e = E) => {
  const r = [];
  for (const t of de) r.push({ ...t, label: t.label[e] || t.label[E] || t.id });
  return r;
}, me = [
  { id: `
`, label: { "en-gb": "Newline" } },
  { id: "\r", label: { "en-gb": "Carriage Return" } },
  { id: `\r
`, label: { "en-gb": "Carriage Return/Newline" } }
], Ke = (e = E) => {
  const r = [];
  for (const t of me)
    r.push({ ...t, label: t.label[e] || t.label[E] || t.id });
  return r;
}, be = [
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
], We = (e = E) => {
  const r = [];
  for (const t of be)
    r.push({ ...t, label: t.label[e] || t.label[E] || t.id });
  return r;
}, E = "en-gb";
export {
  Oe as APIError,
  I as ApplicationError,
  ve as CONNECTOR_DESTINATION_OPERATIONS,
  Ee as CONNECTOR_SOURCE_OPERATIONS,
  E as DEFAULT_LOCALE_CODE,
  De as DefaultTimestamp,
  Ne as EngineError,
  G as FetchError,
  Ae as OperationalError,
  fe as VueError,
  je as WindowPromiseRejectionError,
  Me as WindowRuntimeError,
  Re as buildFetchError,
  ye as componentConfigSchema,
  Te as concatenateSerialisedErrorMessages,
  he as connectorConfigSchema,
  xe as contextConfigSchema,
  we as convertMillisecondsToTimestamp,
  _e as convertODataTypeIdToUsageTypeId,
  Ge as extractExtensionFromPath,
  Ue as extractNameFromPath,
  d as formatNumberAsDecimalNumber,
  Pe as formatNumberAsDuration,
  Be as formatNumberAsSize,
  Le as formatNumberAsStorageSize,
  C as formatNumberAsWholeNumber,
  ge as getComponentStatus,
  Ce as getCurrentTimestamp,
  He as getDataFormats,
  Ke as getRecordDelimiters,
  We as getValueDelimiters,
  Ve as lookupMimeTypeForExtension,
  Fe as normalizeToError,
  Se as presenterConfigSchema,
  $e as serialiseError,
  ke as useCytoscapeJS,
  Ie as useDataTable
};
