let M;
// @__NO_SIDE_EFFECTS__
function U(t) {
  return {
    lang: t?.lang ?? M?.lang,
    message: t?.message,
    abortEarly: t?.abortEarly ?? M?.abortEarly,
    abortPipeEarly: t?.abortPipeEarly ?? M?.abortPipeEarly
  };
}
let F;
// @__NO_SIDE_EFFECTS__
function G(t) {
  return F?.get(t);
}
let z;
// @__NO_SIDE_EFFECTS__
function V(t) {
  return z?.get(t);
}
let X;
// @__NO_SIDE_EFFECTS__
function K(t, n) {
  return X?.get(t)?.get(n);
}
// @__NO_SIDE_EFFECTS__
function N(t) {
  const n = typeof t;
  return n === "string" ? `"${t}"` : n === "number" || n === "bigint" || n === "boolean" ? `${t}` : n === "object" || n === "function" ? (t && Object.getPrototypeOf(t)?.constructor?.name) ?? "null" : n;
}
function g(t, n, e, r, o) {
  const s = o && "input" in o ? o.input : e.value, i = o?.expected ?? t.expects ?? null, u = o?.received ?? /* @__PURE__ */ N(s), l = {
    kind: t.kind,
    type: t.type,
    input: s,
    expected: i,
    received: u,
    message: `Invalid ${n}: ${i ? `Expected ${i} but r` : "R"}eceived ${u}`,
    requirement: t.requirement,
    path: o?.path,
    issues: o?.issues,
    lang: r.lang,
    abortEarly: r.abortEarly,
    abortPipeEarly: r.abortPipeEarly
  }, p = t.kind === "schema", d = o?.message ?? t.message ?? /* @__PURE__ */ K(t.reference, l.lang) ?? (p ? /* @__PURE__ */ V(l.lang) : null) ?? r.message ?? /* @__PURE__ */ G(l.lang);
  d !== void 0 && (l.message = typeof d == "function" ? d(l) : d), p && (e.typed = !1), e.issues ? e.issues.push(l) : e.issues = [l];
}
// @__NO_SIDE_EFFECTS__
function h(t) {
  return {
    version: 1,
    vendor: "valibot",
    validate(n) {
      return t["~run"]({ value: n }, /* @__PURE__ */ U());
    }
  };
}
// @__NO_SIDE_EFFECTS__
function q(t, n) {
  return Object.hasOwn(t, n) && n !== "__proto__" && n !== "prototype" && n !== "constructor";
}
// @__NO_SIDE_EFFECTS__
function H(t, n) {
  const e = [...new Set(t)];
  return e.length > 1 ? `(${e.join(` ${n} `)})` : e[0] ?? "never";
}
// @__NO_SIDE_EFFECTS__
function J(t, n, e) {
  return typeof t.fallback == "function" ? t.fallback(n, e) : t.fallback;
}
// @__NO_SIDE_EFFECTS__
function j(t, n, e) {
  return typeof t.default == "function" ? t.default(n, e) : t.default;
}
// @__NO_SIDE_EFFECTS__
function S(t, n) {
  return {
    kind: "schema",
    type: "array",
    reference: S,
    expects: "Array",
    async: !1,
    item: t,
    message: n,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(e, r) {
      const o = e.value;
      if (Array.isArray(o)) {
        e.typed = !0, e.value = [];
        for (let s = 0; s < o.length; s++) {
          const i = o[s], u = this.item["~run"]({ value: i }, r);
          if (u.issues) {
            const l = {
              type: "array",
              origin: "value",
              input: o,
              key: s,
              value: i
            };
            for (const p of u.issues)
              p.path ? p.path.unshift(l) : p.path = [l], e.issues?.push(p);
            if (e.issues || (e.issues = u.issues), r.abortEarly) {
              e.typed = !1;
              break;
            }
          }
          u.typed || (e.typed = !1), e.value.push(u.value);
        }
      } else g(this, "type", e, r);
      return e;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function w(t) {
  return {
    kind: "schema",
    type: "boolean",
    reference: w,
    expects: "boolean",
    async: !1,
    message: t,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(n, e) {
      return typeof n.value == "boolean" ? n.typed = !0 : g(this, "type", n, e), n;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function E(t, n) {
  return {
    kind: "schema",
    type: "literal",
    reference: E,
    expects: /* @__PURE__ */ N(t),
    async: !1,
    literal: t,
    message: n,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(e, r) {
      return e.value === this.literal ? e.typed = !0 : g(this, "type", e, r), e;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function y(t, n) {
  return {
    kind: "schema",
    type: "nullable",
    reference: y,
    expects: `(${t.expects} | null)`,
    async: !1,
    wrapped: t,
    default: n,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(e, r) {
      return e.value === null && (this.default !== void 0 && (e.value = /* @__PURE__ */ j(this, e, r)), e.value === null) ? (e.typed = !0, e) : this.wrapped["~run"](e, r);
    }
  };
}
// @__NO_SIDE_EFFECTS__
function C(t) {
  return {
    kind: "schema",
    type: "number",
    reference: C,
    expects: "number",
    async: !1,
    message: t,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(n, e) {
      return typeof n.value == "number" && !isNaN(n.value) ? n.typed = !0 : g(this, "type", n, e), n;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function f(t, n) {
  return {
    kind: "schema",
    type: "object",
    reference: f,
    expects: "Object",
    async: !1,
    entries: t,
    message: n,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(e, r) {
      const o = e.value;
      if (o && typeof o == "object") {
        e.typed = !0, e.value = {};
        for (const s in this.entries) {
          const i = this.entries[s];
          if (s in o || (i.type === "exact_optional" || i.type === "optional" || i.type === "nullish") && i.default !== void 0) {
            const u = s in o ? o[s] : /* @__PURE__ */ j(i), l = i["~run"]({ value: u }, r);
            if (l.issues) {
              const p = {
                type: "object",
                origin: "value",
                input: o,
                key: s,
                value: u
              };
              for (const d of l.issues)
                d.path ? d.path.unshift(p) : d.path = [p], e.issues?.push(d);
              if (e.issues || (e.issues = l.issues), r.abortEarly) {
                e.typed = !1;
                break;
              }
            }
            l.typed || (e.typed = !1), e.value[s] = l.value;
          } else if (i.fallback !== void 0) e.value[s] = /* @__PURE__ */ J(i);
          else if (i.type !== "exact_optional" && i.type !== "optional" && i.type !== "nullish" && (g(this, "key", e, r, {
            input: void 0,
            expected: `"${s}"`,
            path: [{
              type: "object",
              origin: "key",
              input: o,
              key: s,
              value: o[s]
            }]
          }), r.abortEarly))
            break;
        }
      } else g(this, "type", e, r);
      return e;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function b(t, n) {
  return {
    kind: "schema",
    type: "optional",
    reference: b,
    expects: `(${t.expects} | undefined)`,
    async: !1,
    wrapped: t,
    default: n,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(e, r) {
      return e.value === void 0 && (this.default !== void 0 && (e.value = /* @__PURE__ */ j(this, e, r)), e.value === void 0) ? (e.typed = !0, e) : this.wrapped["~run"](e, r);
    }
  };
}
// @__NO_SIDE_EFFECTS__
function R(t, n, e) {
  return {
    kind: "schema",
    type: "record",
    reference: R,
    expects: "Object",
    async: !1,
    key: t,
    value: n,
    message: e,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(r, o) {
      const s = r.value;
      if (s && typeof s == "object") {
        r.typed = !0, r.value = {};
        for (const i in s) if (/* @__PURE__ */ q(s, i)) {
          const u = s[i], l = this.key["~run"]({ value: i }, o);
          if (l.issues) {
            const d = {
              type: "object",
              origin: "key",
              input: s,
              key: i,
              value: u
            };
            for (const x of l.issues)
              x.path = [d], r.issues?.push(x);
            if (r.issues || (r.issues = l.issues), o.abortEarly) {
              r.typed = !1;
              break;
            }
          }
          const p = this.value["~run"]({ value: u }, o);
          if (p.issues) {
            const d = {
              type: "object",
              origin: "value",
              input: s,
              key: i,
              value: u
            };
            for (const x of p.issues)
              x.path ? x.path.unshift(d) : x.path = [d], r.issues?.push(x);
            if (r.issues || (r.issues = p.issues), o.abortEarly) {
              r.typed = !1;
              break;
            }
          }
          (!l.typed || !p.typed) && (r.typed = !1), l.typed && (r.value[l.value] = p.value);
        }
      } else g(this, "type", r, o);
      return r;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function a(t) {
  return {
    kind: "schema",
    type: "string",
    reference: a,
    expects: "string",
    async: !1,
    message: t,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(n, e) {
      return typeof n.value == "string" ? n.typed = !0 : g(this, "type", n, e), n;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function _(t) {
  let n;
  if (t) for (const e of t) n ? n.push(...e.issues) : n = e.issues;
  return n;
}
// @__NO_SIDE_EFFECTS__
function P(t, n) {
  return {
    kind: "schema",
    type: "union",
    reference: P,
    expects: /* @__PURE__ */ H(t.map((e) => e.expects), "|"),
    async: !1,
    options: t,
    message: n,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(e, r) {
      let o, s, i;
      for (const u of this.options) {
        const l = u["~run"]({ value: e.value }, r);
        if (l.typed) if (l.issues) s ? s.push(l) : s = [l];
        else {
          o = l;
          break;
        }
        else i ? i.push(l) : i = [l];
      }
      if (o) return o;
      if (s) {
        if (s.length === 1) return s[0];
        g(this, "type", e, r, { issues: /* @__PURE__ */ _(s) }), e.typed = !0;
      } else {
        if (i?.length === 1) return i[0];
        g(this, "type", e, r, { issues: /* @__PURE__ */ _(i) });
      }
      return e;
    }
  };
}
const m = (t) => /* @__PURE__ */ P(t.map((n) => /* @__PURE__ */ E(n))), B = /* @__PURE__ */ f({
  "en-au": /* @__PURE__ */ a(),
  "en-gb": /* @__PURE__ */ a(),
  "en-us": /* @__PURE__ */ a(),
  "es-es": /* @__PURE__ */ a()
}), k = /* @__PURE__ */ f({
  "en-au": /* @__PURE__ */ b(/* @__PURE__ */ a()),
  "en-gb": /* @__PURE__ */ b(/* @__PURE__ */ a()),
  "en-us": /* @__PURE__ */ b(/* @__PURE__ */ a()),
  "es-es": /* @__PURE__ */ b(/* @__PURE__ */ a())
}), Q = m(["amber", "green", "red", "other"]), W = m([
  "alpha",
  "beta",
  "generalAvailability",
  "notApplicable",
  "preAlpha",
  "proposed",
  "releaseCandidate",
  "unavailable",
  "underReview"
]), Y = m([
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
m(["app", "engine", "connector", "context", "presenter", "tool"]);
const Z = /* @__PURE__ */ f({
  id: /* @__PURE__ */ a(),
  color: Q,
  label: /* @__PURE__ */ a()
}), I = {
  id: /* @__PURE__ */ a(),
  label: k,
  description: k,
  firstCreatedAt: /* @__PURE__ */ b(/* @__PURE__ */ C()),
  icon: /* @__PURE__ */ y(/* @__PURE__ */ a()),
  iconDark: /* @__PURE__ */ y(/* @__PURE__ */ a()),
  lastUpdatedAt: /* @__PURE__ */ y(/* @__PURE__ */ C()),
  status: /* @__PURE__ */ y(Z),
  statusId: W
}, fe = /* @__PURE__ */ f({
  ...I,
  typeId: Y
}), A = {
  ...I,
  version: /* @__PURE__ */ a()
}, T = /* @__PURE__ */ f({
  id: /* @__PURE__ */ a(),
  label: k,
  description: k,
  icon: /* @__PURE__ */ y(/* @__PURE__ */ a()),
  iconDark: /* @__PURE__ */ y(/* @__PURE__ */ a()),
  order: /* @__PURE__ */ C(),
  path: /* @__PURE__ */ a()
}), v = (t) => {
  const n = Object.entries(t).filter((e) => typeof e[1] == "string");
  return new Map(n);
}, $ = (t, n, e = O) => {
  const r = t.get(n);
  if (r !== void 0) return r;
  if (e !== n)
    return t.get(e);
}, ee = [
  { id: "alpha", color: "red", labels: v({ "en-gb": "alpha" }) },
  { id: "beta", color: "amber", labels: v({ "en-gb": "beta" }) },
  { id: "generalAvailability", color: "green", labels: v({ "en-gb": "" }) },
  { id: "notApplicable", color: "green", labels: v({ "en-gb": "not-applicable" }) },
  { id: "preAlpha", color: "red", labels: v({ "en-gb": "pre-alpha" }) },
  { id: "proposed", color: "other", labels: v({ "en-gb": "proposed" }) },
  { id: "releaseCandidate", color: "green", labels: v({ "en-gb": "release-candidate" }) },
  { id: "unavailable", color: "other", labels: v({ "en-gb": "unavailable" }) },
  { id: "underReview", color: "other", labels: v({ "en-gb": "under-review" }) }
], ye = (t, n = O) => {
  const e = ee.find((r) => r.id === t);
  if (e) {
    const r = $(e.labels, n);
    return { id: e.id, color: e.color, label: r ?? e.id };
  }
  return { id: t, color: "other", label: t };
}, te = m(["apiKey", "disabled", "oAuth2", "none"]), ne = m(["application", "curatedDataset", "database", "fileStore"]), re = m([
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
]), se = m(["bidirectional", "destination", "source", "unknown"]), oe = /* @__PURE__ */ f({
  authMethodId: te,
  activeConnectionCount: /* @__PURE__ */ b(/* @__PURE__ */ C()),
  canDescribe: /* @__PURE__ */ b(/* @__PURE__ */ w()),
  id: /* @__PURE__ */ b(/* @__PURE__ */ a()),
  label: /* @__PURE__ */ b(B),
  maxConnectionCount: /* @__PURE__ */ b(/* @__PURE__ */ C()),
  params: /* @__PURE__ */ b(/* @__PURE__ */ S(/* @__PURE__ */ R(/* @__PURE__ */ a(), /* @__PURE__ */ a())))
}), ge = /* @__PURE__ */ f({
  ...A,
  typeId: /* @__PURE__ */ E("connector"),
  category: /* @__PURE__ */ y(/* @__PURE__ */ f({ id: /* @__PURE__ */ a(), label: /* @__PURE__ */ a() })),
  categoryId: ne,
  implementations: /* @__PURE__ */ R(/* @__PURE__ */ a(), oe),
  operations: /* @__PURE__ */ S(re),
  usageId: se,
  vendorAccountURL: /* @__PURE__ */ y(/* @__PURE__ */ a()),
  vendorDocumentationURL: /* @__PURE__ */ y(/* @__PURE__ */ a()),
  vendorHomeURL: /* @__PURE__ */ y(/* @__PURE__ */ a())
}), he = ["createObject", "dropObject", "removeRecords", "upsertRecords"], me = ["findObject", "getRecord", "listNodes", "previewObject", "retrieveRecords"], D = (t) => {
  const n = Object.entries(t).filter((e) => typeof e[1] == "string");
  return new Map(n);
};
D({ "en-gb": "Application" }), D({ "en-gb": "Curated Dataset" }), D({ "en-gb": "Database" }), D({ "en-gb": "File Store" });
const ie = m(["list"]), le = /* @__PURE__ */ f({
  ...I,
  typeId: /* @__PURE__ */ E("contextModelGroup"),
  modelRefs: /* @__PURE__ */ S(T),
  order: /* @__PURE__ */ C()
}), ve = /* @__PURE__ */ f({
  ...A,
  typeId: /* @__PURE__ */ E("context"),
  models: /* @__PURE__ */ S(le),
  operations: /* @__PURE__ */ S(ie)
}), ae = m(["list", "render", "setColorMode"]), Se = /* @__PURE__ */ f({
  ...A,
  typeId: /* @__PURE__ */ E("presenter"),
  presentations: /* @__PURE__ */ S(T),
  operations: /* @__PURE__ */ S(ae)
});
function xe() {
  return { render: ce };
}
function ce(t, n, e) {
  e.textContent = "Cytoscape.js diagram goes here...";
}
function Ce() {
  return { render: ue };
}
function ue(t, n) {
  console.log(1111, t), console.log(2222, n), console.log(3333, n.childNodes), console.log(4444, n.children);
}
const c = (t) => new Map(Object.entries(t)), L = (t, n, e = O) => {
  const r = t.get(n);
  if (r !== void 0) return r;
  if (e !== n)
    return t.get(e);
}, pe = [
  { id: "dtv", labels: c({ "en-gb": "Delimited Text" }) },
  { id: "e/e", labels: c({ "en-gb": "Entity/Event" }) },
  { id: "jsonArray", labels: c({ "en-gb": "JSON Array" }) },
  { id: "spss", labels: c({ "en-gb": "SPSS" }) },
  { id: "xls", labels: c({ "en-gb": "XLS" }) },
  { id: "xlsx", labels: c({ "en-gb": "XLSX" }) },
  { id: "xml", labels: c({ "en-gb": "XML" }) }
], Ee = (t = O) => {
  const n = [];
  for (const e of pe) {
    const r = L(e.labels, t);
    n.push({ id: e.id, label: r ?? e.id });
  }
  return n;
}, de = [
  { id: `
`, labels: c({ "en-gb": "Newline" }) },
  { id: "\r", labels: c({ "en-gb": "Carriage Return" }) },
  { id: `\r
`, labels: c({ "en-gb": "Carriage Return/Newline" }) }
], Oe = (t = O) => {
  const n = [];
  for (const e of de) {
    const r = L(e.labels, t);
    n.push({ id: e.id, label: r ?? e.id });
  }
  return n;
}, be = [
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
], De = (t = O) => {
  const n = [];
  for (const e of be) {
    const r = L(e.labels, t);
    n.push({ id: e.id, label: r ?? e.id });
  }
  return n;
}, O = "en-gb";
export {
  he as CONNECTOR_DESTINATION_OPERATIONS,
  me as CONNECTOR_SOURCE_OPERATIONS,
  O as D,
  ve as a,
  Ce as b,
  fe as c,
  ge as connectorConfigSchema,
  Oe as d,
  De as e,
  ye as f,
  Ee as g,
  Se as p,
  xe as u
};
