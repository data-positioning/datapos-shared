let M;
// @__NO_SIDE_EFFECTS__
function G(n) {
  return {
    lang: n?.lang ?? M?.lang,
    message: n?.message,
    abortEarly: n?.abortEarly ?? M?.abortEarly,
    abortPipeEarly: n?.abortPipeEarly ?? M?.abortPipeEarly
  };
}
let N;
// @__NO_SIDE_EFFECTS__
function T(n) {
  return N?.get(n);
}
let z;
// @__NO_SIDE_EFFECTS__
function V(n) {
  return z?.get(n);
}
let X;
// @__NO_SIDE_EFFECTS__
function K(n, t) {
  return X?.get(n)?.get(t);
}
// @__NO_SIDE_EFFECTS__
function w(n) {
  const t = typeof n;
  return t === "string" ? `"${n}"` : t === "number" || t === "bigint" || t === "boolean" ? `${n}` : t === "object" || t === "function" ? (n && Object.getPrototypeOf(n)?.constructor?.name) ?? "null" : t;
}
function g(n, t, e, r, o) {
  const s = o && "input" in o ? o.input : e.value, i = o?.expected ?? n.expects ?? null, c = o?.received ?? /* @__PURE__ */ w(s), l = {
    kind: n.kind,
    type: n.type,
    input: s,
    expected: i,
    received: c,
    message: `Invalid ${t}: ${i ? `Expected ${i} but r` : "R"}eceived ${c}`,
    requirement: n.requirement,
    path: o?.path,
    issues: o?.issues,
    lang: r.lang,
    abortEarly: r.abortEarly,
    abortPipeEarly: r.abortPipeEarly
  }, p = n.kind === "schema", d = o?.message ?? n.message ?? /* @__PURE__ */ K(n.reference, l.lang) ?? (p ? /* @__PURE__ */ V(l.lang) : null) ?? r.message ?? /* @__PURE__ */ T(l.lang);
  d !== void 0 && (l.message = typeof d == "function" ? d(l) : d), p && (e.typed = !1), e.issues ? e.issues.push(l) : e.issues = [l];
}
// @__NO_SIDE_EFFECTS__
function h(n) {
  return {
    version: 1,
    vendor: "valibot",
    validate(t) {
      return n["~run"]({ value: t }, /* @__PURE__ */ G());
    }
  };
}
// @__NO_SIDE_EFFECTS__
function q(n, t) {
  return Object.hasOwn(n, t) && t !== "__proto__" && t !== "prototype" && t !== "constructor";
}
// @__NO_SIDE_EFFECTS__
function H(n, t) {
  const e = [...new Set(n)];
  return e.length > 1 ? `(${e.join(` ${t} `)})` : e[0] ?? "never";
}
// @__NO_SIDE_EFFECTS__
function J(n, t, e) {
  return typeof n.fallback == "function" ? n.fallback(t, e) : n.fallback;
}
// @__NO_SIDE_EFFECTS__
function j(n, t, e) {
  return typeof n.default == "function" ? n.default(t, e) : n.default;
}
// @__NO_SIDE_EFFECTS__
function S(n, t) {
  return {
    kind: "schema",
    type: "array",
    reference: S,
    expects: "Array",
    async: !1,
    item: n,
    message: t,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(e, r) {
      const o = e.value;
      if (Array.isArray(o)) {
        e.typed = !0, e.value = [];
        for (let s = 0; s < o.length; s++) {
          const i = o[s], c = this.item["~run"]({ value: i }, r);
          if (c.issues) {
            const l = {
              type: "array",
              origin: "value",
              input: o,
              key: s,
              value: i
            };
            for (const p of c.issues)
              p.path ? p.path.unshift(l) : p.path = [l], e.issues?.push(p);
            if (e.issues || (e.issues = c.issues), r.abortEarly) {
              e.typed = !1;
              break;
            }
          }
          c.typed || (e.typed = !1), e.value.push(c.value);
        }
      } else g(this, "type", e, r);
      return e;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function P(n) {
  return {
    kind: "schema",
    type: "boolean",
    reference: P,
    expects: "boolean",
    async: !1,
    message: n,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(t, e) {
      return typeof t.value == "boolean" ? t.typed = !0 : g(this, "type", t, e), t;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function k(n, t) {
  return {
    kind: "schema",
    type: "literal",
    reference: k,
    expects: /* @__PURE__ */ w(n),
    async: !1,
    literal: n,
    message: t,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(e, r) {
      return e.value === this.literal ? e.typed = !0 : g(this, "type", e, r), e;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function y(n, t) {
  return {
    kind: "schema",
    type: "nullable",
    reference: y,
    expects: `(${n.expects} | null)`,
    async: !1,
    wrapped: n,
    default: t,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(e, r) {
      return e.value === null && (this.default !== void 0 && (e.value = /* @__PURE__ */ j(this, e, r)), e.value === null) ? (e.typed = !0, e) : this.wrapped["~run"](e, r);
    }
  };
}
// @__NO_SIDE_EFFECTS__
function C(n) {
  return {
    kind: "schema",
    type: "number",
    reference: C,
    expects: "number",
    async: !1,
    message: n,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(t, e) {
      return typeof t.value == "number" && !isNaN(t.value) ? t.typed = !0 : g(this, "type", t, e), t;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function f(n, t) {
  return {
    kind: "schema",
    type: "object",
    reference: f,
    expects: "Object",
    async: !1,
    entries: n,
    message: t,
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
            const c = s in o ? o[s] : /* @__PURE__ */ j(i), l = i["~run"]({ value: c }, r);
            if (l.issues) {
              const p = {
                type: "object",
                origin: "value",
                input: o,
                key: s,
                value: c
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
function b(n, t) {
  return {
    kind: "schema",
    type: "optional",
    reference: b,
    expects: `(${n.expects} | undefined)`,
    async: !1,
    wrapped: n,
    default: t,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(e, r) {
      return e.value === void 0 && (this.default !== void 0 && (e.value = /* @__PURE__ */ j(this, e, r)), e.value === void 0) ? (e.typed = !0, e) : this.wrapped["~run"](e, r);
    }
  };
}
// @__NO_SIDE_EFFECTS__
function I(n, t, e) {
  return {
    kind: "schema",
    type: "record",
    reference: I,
    expects: "Object",
    async: !1,
    key: n,
    value: t,
    message: e,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(r, o) {
      const s = r.value;
      if (s && typeof s == "object") {
        r.typed = !0, r.value = {};
        for (const i in s) if (/* @__PURE__ */ q(s, i)) {
          const c = s[i], l = this.key["~run"]({ value: i }, o);
          if (l.issues) {
            const d = {
              type: "object",
              origin: "key",
              input: s,
              key: i,
              value: c
            };
            for (const x of l.issues)
              x.path = [d], r.issues?.push(x);
            if (r.issues || (r.issues = l.issues), o.abortEarly) {
              r.typed = !1;
              break;
            }
          }
          const p = this.value["~run"]({ value: c }, o);
          if (p.issues) {
            const d = {
              type: "object",
              origin: "value",
              input: s,
              key: i,
              value: c
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
function a(n) {
  return {
    kind: "schema",
    type: "string",
    reference: a,
    expects: "string",
    async: !1,
    message: n,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(t, e) {
      return typeof t.value == "string" ? t.typed = !0 : g(this, "type", t, e), t;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function R(n) {
  let t;
  if (n) for (const e of n) t ? t.push(...e.issues) : t = e.issues;
  return t;
}
// @__NO_SIDE_EFFECTS__
function U(n, t) {
  return {
    kind: "schema",
    type: "union",
    reference: U,
    expects: /* @__PURE__ */ H(n.map((e) => e.expects), "|"),
    async: !1,
    options: n,
    message: t,
    get "~standard"() {
      return /* @__PURE__ */ h(this);
    },
    "~run"(e, r) {
      let o, s, i;
      for (const c of this.options) {
        const l = c["~run"]({ value: e.value }, r);
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
        g(this, "type", e, r, { issues: /* @__PURE__ */ R(s) }), e.typed = !0;
      } else {
        if (i?.length === 1) return i[0];
        g(this, "type", e, r, { issues: /* @__PURE__ */ R(i) });
      }
      return e;
    }
  };
}
const m = (n) => /* @__PURE__ */ U(n.map((t) => /* @__PURE__ */ k(t))), B = /* @__PURE__ */ f({
  "en-au": /* @__PURE__ */ a(),
  "en-gb": /* @__PURE__ */ a(),
  "en-us": /* @__PURE__ */ a(),
  "es-es": /* @__PURE__ */ a()
}), D = /* @__PURE__ */ f({
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
]), Z = /* @__PURE__ */ f({
  id: /* @__PURE__ */ a(),
  color: Q,
  label: /* @__PURE__ */ a()
}), L = {
  id: /* @__PURE__ */ a(),
  label: D,
  description: D,
  firstCreatedAt: /* @__PURE__ */ b(/* @__PURE__ */ C()),
  icon: /* @__PURE__ */ y(/* @__PURE__ */ a()),
  iconDark: /* @__PURE__ */ y(/* @__PURE__ */ a()),
  lastUpdatedAt: /* @__PURE__ */ y(/* @__PURE__ */ C()),
  status: /* @__PURE__ */ y(Z),
  statusId: W
}, be = /* @__PURE__ */ f({
  ...L,
  typeId: Y
}), F = /* @__PURE__ */ f({
  id: /* @__PURE__ */ a(),
  label: D,
  description: D,
  icon: /* @__PURE__ */ y(/* @__PURE__ */ a()),
  iconDark: /* @__PURE__ */ y(/* @__PURE__ */ a()),
  order: /* @__PURE__ */ C(),
  path: /* @__PURE__ */ a()
}), _ = [
  { id: "alpha", color: "red", labels: v({ "en-gb": "alpha" }) },
  { id: "beta", color: "amber", labels: v({ "en-gb": "beta" }) },
  { id: "generalAvailability", color: "green", labels: v({ "en-gb": "" }) },
  { id: "notApplicable", color: "green", labels: v({ "en-gb": "not-applicable" }) },
  { id: "preAlpha", color: "red", labels: v({ "en-gb": "pre-alpha" }) },
  { id: "proposed", color: "other", labels: v({ "en-gb": "proposed" }) },
  { id: "releaseCandidate", color: "green", labels: v({ "en-gb": "release-candidate" }) },
  { id: "unavailable", color: "other", labels: v({ "en-gb": "unavailable" }) },
  { id: "underReview", color: "other", labels: v({ "en-gb": "under-review" }) }
];
function v(n) {
  const t = Object.entries(n).filter((e) => typeof e[1] == "string");
  return new Map(t);
}
function fe(n, t = E) {
  console.log(1111, _);
  const e = _.find((r) => r.id === n);
  if (e) {
    const r = $(e.labels, t);
    return { id: e.id, color: e.color, label: r ?? e.id };
  }
  return { id: n, color: "other", label: n };
}
function $(n, t, e = E) {
  const r = n.get(t);
  if (r != null) return r;
  if (e !== t)
    return n.get(e);
}
m(["app", "engine", "connector", "context", "presenter", "tool"]);
const O = {
  ...L,
  version: /* @__PURE__ */ a()
}, ee = m(["apiKey", "disabled", "oAuth2", "none"]), ne = /* @__PURE__ */ f({
  authMethodId: ee,
  activeConnectionCount: /* @__PURE__ */ b(/* @__PURE__ */ C()),
  canDescribe: /* @__PURE__ */ b(/* @__PURE__ */ P()),
  id: /* @__PURE__ */ b(/* @__PURE__ */ a()),
  label: /* @__PURE__ */ b(B),
  maxConnectionCount: /* @__PURE__ */ b(/* @__PURE__ */ C()),
  params: /* @__PURE__ */ b(/* @__PURE__ */ S(/* @__PURE__ */ I(/* @__PURE__ */ a(), /* @__PURE__ */ a())))
}), te = m(["application", "curatedDataset", "database", "fileStore"]), re = m([
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
]), se = m(["bidirectional", "destination", "source", "unknown"]), ye = /* @__PURE__ */ f({
  ...O,
  typeId: /* @__PURE__ */ k("connector"),
  category: /* @__PURE__ */ y(/* @__PURE__ */ f({ id: /* @__PURE__ */ a(), label: /* @__PURE__ */ a() })),
  categoryId: te,
  implementations: /* @__PURE__ */ I(/* @__PURE__ */ a(), ne),
  operations: /* @__PURE__ */ S(re),
  usageId: se,
  vendorAccountURL: /* @__PURE__ */ y(/* @__PURE__ */ a()),
  vendorDocumentationURL: /* @__PURE__ */ y(/* @__PURE__ */ a()),
  vendorHomeURL: /* @__PURE__ */ y(/* @__PURE__ */ a())
}), oe = m(["list"]), ie = /* @__PURE__ */ f({
  ...L,
  typeId: /* @__PURE__ */ k("contextModelGroup"),
  modelRefs: /* @__PURE__ */ S(F),
  order: /* @__PURE__ */ C()
}), ge = /* @__PURE__ */ f({
  ...O,
  typeId: /* @__PURE__ */ k("context"),
  models: /* @__PURE__ */ S(ie),
  operations: /* @__PURE__ */ S(oe)
}), le = m(["list", "render", "setColorMode"]), he = /* @__PURE__ */ f({
  ...O,
  typeId: /* @__PURE__ */ k("presenter"),
  presentations: /* @__PURE__ */ S(F),
  operations: /* @__PURE__ */ S(le)
});
function me() {
  return { render: ae };
}
function ae(n, t, e) {
  e.textContent = "Cytoscape.js diagram goes here...";
}
function ve() {
  return { render: ue };
}
function ue(n, t) {
  console.log(1111, n), console.log(2222, t), console.log(3333, t.childNodes), console.log(4444, t.children);
}
const u = (n) => new Map(Object.entries(n)), A = (n, t, e = E) => {
  const r = n.get(t);
  if (r !== void 0) return r;
  if (e !== t)
    return n.get(e);
}, ce = [
  { id: "dtv", labels: u({ "en-gb": "Delimited Text" }) },
  { id: "e/e", labels: u({ "en-gb": "Entity/Event" }) },
  { id: "jsonArray", labels: u({ "en-gb": "JSON Array" }) },
  { id: "spss", labels: u({ "en-gb": "SPSS" }) },
  { id: "xls", labels: u({ "en-gb": "XLS" }) },
  { id: "xlsx", labels: u({ "en-gb": "XLSX" }) },
  { id: "xml", labels: u({ "en-gb": "XML" }) }
], Se = (n = E) => {
  const t = [];
  for (const e of ce) {
    const r = A(e.labels, n);
    t.push({ id: e.id, label: r ?? e.id });
  }
  return t;
}, pe = [
  { id: `
`, labels: u({ "en-gb": "Newline" }) },
  { id: "\r", labels: u({ "en-gb": "Carriage Return" }) },
  { id: `\r
`, labels: u({ "en-gb": "Carriage Return/Newline" }) }
], xe = (n = E) => {
  const t = [];
  for (const e of pe) {
    const r = A(e.labels, n);
    t.push({ id: e.id, label: r ?? e.id });
  }
  return t;
}, de = [
  { id: ":", labels: u({ "en-gb": "Colon" }) },
  { id: ",", labels: u({ "en-gb": "Comma" }) },
  { id: "!", labels: u({ "en-gb": "Exclamation Mark" }) },
  // { id: '', label: { 'en-gb': 'Other' } }, // TODO: Maybe set this to a 'not printing' or special ascii character when there is a user supplied delimited, rather than ''?
  { id: "0x1E", labels: u({ "en-gb": "Record Separator" }) },
  { id: ";", labels: u({ "en-gb": "Semicolon" }) },
  { id: " ", labels: u({ "en-gb": "Space" }) },
  { id: "	", labels: u({ "en-gb": "Tab" }) },
  { id: "_", labels: u({ "en-gb": "Underscore" }) },
  { id: "0x1F", labels: u({ "en-gb": "Unit Separator" }) },
  { id: "|", labels: u({ "en-gb": "Vertical Bar" }) }
], Ce = (n = E) => {
  const t = [];
  for (const e of de) {
    const r = A(e.labels, n);
    t.push({ id: e.id, label: r ?? e.id });
  }
  return t;
}, E = "en-gb";
export {
  E as D,
  be as a,
  ge as b,
  ye as c,
  ve as d,
  Se as e,
  xe as f,
  fe as g,
  Ce as h,
  he as p,
  me as u
};
