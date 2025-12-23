let M;
// @__NO_SIDE_EFFECTS__
function F(n) {
  return {
    lang: n?.lang ?? M?.lang,
    message: n?.message,
    abortEarly: n?.abortEarly ?? M?.abortEarly,
    abortPipeEarly: n?.abortPipeEarly ?? M?.abortPipeEarly
  };
}
let G;
// @__NO_SIDE_EFFECTS__
function N(n) {
  return G?.get(n);
}
let T;
// @__NO_SIDE_EFFECTS__
function V(n) {
  return T?.get(n);
}
let z;
// @__NO_SIDE_EFFECTS__
function X(n, t) {
  return z?.get(n)?.get(t);
}
// @__NO_SIDE_EFFECTS__
function _(n) {
  const t = typeof n;
  return t === "string" ? `"${n}"` : t === "number" || t === "bigint" || t === "boolean" ? `${n}` : t === "object" || t === "function" ? (n && Object.getPrototypeOf(n)?.constructor?.name) ?? "null" : t;
}
function g(n, t, e, r, o) {
  const s = o && "input" in o ? o.input : e.value, i = o?.expected ?? n.expects ?? null, c = o?.received ?? /* @__PURE__ */ _(s), l = {
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
  }, p = n.kind === "schema", d = o?.message ?? n.message ?? /* @__PURE__ */ X(n.reference, l.lang) ?? (p ? /* @__PURE__ */ V(l.lang) : null) ?? r.message ?? /* @__PURE__ */ N(l.lang);
  d !== void 0 && (l.message = typeof d == "function" ? d(l) : d), p && (e.typed = !1), e.issues ? e.issues.push(l) : e.issues = [l];
}
// @__NO_SIDE_EFFECTS__
function h(n) {
  return {
    version: 1,
    vendor: "valibot",
    validate(t) {
      return n["~run"]({ value: t }, /* @__PURE__ */ F());
    }
  };
}
// @__NO_SIDE_EFFECTS__
function K(n, t) {
  return Object.hasOwn(n, t) && t !== "__proto__" && t !== "prototype" && t !== "constructor";
}
// @__NO_SIDE_EFFECTS__
function q(n, t) {
  const e = [...new Set(n)];
  return e.length > 1 ? `(${e.join(` ${t} `)})` : e[0] ?? "never";
}
// @__NO_SIDE_EFFECTS__
function H(n, t, e) {
  return typeof n.fallback == "function" ? n.fallback(t, e) : n.fallback;
}
// @__NO_SIDE_EFFECTS__
function j(n, t, e) {
  return typeof n.default == "function" ? n.default(t, e) : n.default;
}
// @__NO_SIDE_EFFECTS__
function x(n, t) {
  return {
    kind: "schema",
    type: "array",
    reference: x,
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
function w(n) {
  return {
    kind: "schema",
    type: "boolean",
    reference: w,
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
function C(n, t) {
  return {
    kind: "schema",
    type: "literal",
    reference: C,
    expects: /* @__PURE__ */ _(n),
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
function k(n) {
  return {
    kind: "schema",
    type: "number",
    reference: k,
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
          } else if (i.fallback !== void 0) e.value[s] = /* @__PURE__ */ H(i);
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
        for (const i in s) if (/* @__PURE__ */ K(s, i)) {
          const c = s[i], l = this.key["~run"]({ value: i }, o);
          if (l.issues) {
            const d = {
              type: "object",
              origin: "key",
              input: s,
              key: i,
              value: c
            };
            for (const S of l.issues)
              S.path = [d], r.issues?.push(S);
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
            for (const S of p.issues)
              S.path ? S.path.unshift(d) : S.path = [d], r.issues?.push(S);
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
function P(n, t) {
  return {
    kind: "schema",
    type: "union",
    reference: P,
    expects: /* @__PURE__ */ q(n.map((e) => e.expects), "|"),
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
const m = (n) => /* @__PURE__ */ P(n.map((t) => /* @__PURE__ */ C(t))), J = /* @__PURE__ */ f({
  "en-au": /* @__PURE__ */ a(),
  "en-gb": /* @__PURE__ */ a(),
  "en-us": /* @__PURE__ */ a(),
  "es-es": /* @__PURE__ */ a()
}), E = /* @__PURE__ */ f({
  "en-au": /* @__PURE__ */ b(/* @__PURE__ */ a()),
  "en-gb": /* @__PURE__ */ b(/* @__PURE__ */ a()),
  "en-us": /* @__PURE__ */ b(/* @__PURE__ */ a()),
  "es-es": /* @__PURE__ */ b(/* @__PURE__ */ a())
}), B = m(["amber", "green", "red", "other"]), Q = m([
  "alpha",
  "beta",
  "generalAvailability",
  "notApplicable",
  "preAlpha",
  "proposed",
  "releaseCandidate",
  "unavailable",
  "underReview"
]), W = m([
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
]), Y = /* @__PURE__ */ f({
  id: /* @__PURE__ */ a(),
  color: B,
  label: /* @__PURE__ */ a()
}), O = {
  id: /* @__PURE__ */ a(),
  label: E,
  description: E,
  firstCreatedAt: /* @__PURE__ */ b(/* @__PURE__ */ k()),
  icon: /* @__PURE__ */ y(/* @__PURE__ */ a()),
  iconDark: /* @__PURE__ */ y(/* @__PURE__ */ a()),
  lastUpdatedAt: /* @__PURE__ */ y(/* @__PURE__ */ k()),
  status: /* @__PURE__ */ y(Y),
  statusId: Q
}, pe = /* @__PURE__ */ f({
  ...O,
  typeId: W
}), U = /* @__PURE__ */ f({
  id: /* @__PURE__ */ a(),
  label: E,
  description: E,
  icon: /* @__PURE__ */ y(/* @__PURE__ */ a()),
  iconDark: /* @__PURE__ */ y(/* @__PURE__ */ a()),
  order: /* @__PURE__ */ k(),
  path: /* @__PURE__ */ a()
}), v = (n) => {
  const t = Object.entries(n).filter((e) => typeof e[1] == "string");
  return new Map(t);
};
v({ "en-gb": "alpha" }), v({ "en-gb": "beta" }), v({ "en-gb": "" }), v({ "en-gb": "not-applicable" }), v({ "en-gb": "pre-alpha" }), v({ "en-gb": "proposed" }), v({ "en-gb": "release-candidate" }), v({ "en-gb": "unavailable" }), v({ "en-gb": "under-review" });
m(["app", "engine", "connector", "context", "presenter", "tool"]);
const A = {
  ...O,
  version: /* @__PURE__ */ a()
}, Z = m(["apiKey", "disabled", "oAuth2", "none"]), $ = /* @__PURE__ */ f({
  authMethodId: Z,
  activeConnectionCount: /* @__PURE__ */ b(/* @__PURE__ */ k()),
  canDescribe: /* @__PURE__ */ b(/* @__PURE__ */ w()),
  id: /* @__PURE__ */ b(/* @__PURE__ */ a()),
  label: /* @__PURE__ */ b(J),
  maxConnectionCount: /* @__PURE__ */ b(/* @__PURE__ */ k()),
  params: /* @__PURE__ */ b(/* @__PURE__ */ x(/* @__PURE__ */ I(/* @__PURE__ */ a(), /* @__PURE__ */ a())))
}), ee = m(["application", "curatedDataset", "database", "fileStore"]), ne = m([
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
]), te = m(["bidirectional", "destination", "source", "unknown"]), de = /* @__PURE__ */ f({
  ...A,
  typeId: /* @__PURE__ */ C("connector"),
  category: /* @__PURE__ */ y(/* @__PURE__ */ f({ id: /* @__PURE__ */ a(), label: /* @__PURE__ */ a() })),
  categoryId: ee,
  implementations: /* @__PURE__ */ I(/* @__PURE__ */ a(), $),
  operations: /* @__PURE__ */ x(ne),
  usageId: te,
  vendorAccountURL: /* @__PURE__ */ y(/* @__PURE__ */ a()),
  vendorDocumentationURL: /* @__PURE__ */ y(/* @__PURE__ */ a()),
  vendorHomeURL: /* @__PURE__ */ y(/* @__PURE__ */ a())
}), re = m(["list"]), se = /* @__PURE__ */ f({
  ...O,
  typeId: /* @__PURE__ */ C("contextModelGroup"),
  modelRefs: /* @__PURE__ */ x(U),
  order: /* @__PURE__ */ k()
}), be = /* @__PURE__ */ f({
  ...A,
  typeId: /* @__PURE__ */ C("context"),
  models: /* @__PURE__ */ x(se),
  operations: /* @__PURE__ */ x(re)
}), oe = m(["list", "render", "setColorMode"]), fe = /* @__PURE__ */ f({
  ...A,
  typeId: /* @__PURE__ */ C("presenter"),
  presentations: /* @__PURE__ */ x(U),
  operations: /* @__PURE__ */ x(oe)
});
function ye() {
  return { render: ie };
}
function ie(n, t, e) {
  e.textContent = "Cytoscape.js diagram goes here...";
}
function ge() {
  return { render: le };
}
function le(n, t) {
  console.log(1111, n), console.log(2222, t), console.log(3333, t.childNodes), console.log(4444, t.children);
}
const u = (n) => new Map(Object.entries(n)), L = (n, t, e = D) => {
  const r = n.get(t);
  if (r !== void 0) return r;
  if (e !== t)
    return n.get(e);
}, ae = [
  { id: "dtv", labels: u({ "en-gb": "Delimited Text" }) },
  { id: "e/e", labels: u({ "en-gb": "Entity/Event" }) },
  { id: "jsonArray", labels: u({ "en-gb": "JSON Array" }) },
  { id: "spss", labels: u({ "en-gb": "SPSS" }) },
  { id: "xls", labels: u({ "en-gb": "XLS" }) },
  { id: "xlsx", labels: u({ "en-gb": "XLSX" }) },
  { id: "xml", labels: u({ "en-gb": "XML" }) }
], he = (n = D) => {
  const t = [];
  for (const e of ae) {
    const r = L(e.labels, n);
    t.push({ id: e.id, label: r ?? e.id });
  }
  return t;
}, ue = [
  { id: `
`, labels: u({ "en-gb": "Newline" }) },
  { id: "\r", labels: u({ "en-gb": "Carriage Return" }) },
  { id: `\r
`, labels: u({ "en-gb": "Carriage Return/Newline" }) }
], me = (n = D) => {
  const t = [];
  for (const e of ue) {
    const r = L(e.labels, n);
    t.push({ id: e.id, label: r ?? e.id });
  }
  return t;
}, ce = [
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
], ve = (n = D) => {
  const t = [];
  for (const e of ce) {
    const r = L(e.labels, n);
    t.push({ id: e.id, label: r ?? e.id });
  }
  return t;
}, D = "en-gb";
export {
  D as DEFAULT_LOCALE_CODE,
  pe as componentConfigSchema,
  de as connectorConfigSchema,
  be as contextConfigSchema,
  he as getDataFormats,
  me as getRecordDelimiters,
  ve as getValueDelimiters,
  fe as presenterConfigSchema,
  ye as useCytoscapeJS,
  ge as useDataTable
};
