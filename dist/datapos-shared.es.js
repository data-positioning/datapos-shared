let D;
// @__NO_SIDE_EFFECTS__
function F(n) {
  return {
    lang: n?.lang ?? D?.lang,
    message: n?.message,
    abortEarly: n?.abortEarly ?? D?.abortEarly,
    abortPipeEarly: n?.abortPipeEarly ?? D?.abortPipeEarly
  };
}
let U;
// @__NO_SIDE_EFFECTS__
function G(n) {
  return U?.get(n);
}
let N;
// @__NO_SIDE_EFFECTS__
function T(n) {
  return N?.get(n);
}
let V;
// @__NO_SIDE_EFFECTS__
function z(n, t) {
  return V?.get(n)?.get(t);
}
// @__NO_SIDE_EFFECTS__
function L(n) {
  const t = typeof n;
  return t === "string" ? `"${n}"` : t === "number" || t === "bigint" || t === "boolean" ? `${n}` : t === "object" || t === "function" ? (n && Object.getPrototypeOf(n)?.constructor?.name) ?? "null" : t;
}
function h(n, t, e, s, o) {
  const r = o && "input" in o ? o.input : e.value, i = o?.expected ?? n.expects ?? null, c = o?.received ?? /* @__PURE__ */ L(r), l = {
    kind: n.kind,
    type: n.type,
    input: r,
    expected: i,
    received: c,
    message: `Invalid ${t}: ${i ? `Expected ${i} but r` : "R"}eceived ${c}`,
    requirement: n.requirement,
    path: o?.path,
    issues: o?.issues,
    lang: s.lang,
    abortEarly: s.abortEarly,
    abortPipeEarly: s.abortPipeEarly
  }, p = n.kind === "schema", f = o?.message ?? n.message ?? /* @__PURE__ */ z(n.reference, l.lang) ?? (p ? /* @__PURE__ */ T(l.lang) : null) ?? s.message ?? /* @__PURE__ */ G(l.lang);
  f !== void 0 && (l.message = typeof f == "function" ? f(l) : f), p && (e.typed = !1), e.issues ? e.issues.push(l) : e.issues = [l];
}
// @__NO_SIDE_EFFECTS__
function m(n) {
  return {
    version: 1,
    vendor: "valibot",
    validate(t) {
      return n["~run"]({ value: t }, /* @__PURE__ */ F());
    }
  };
}
// @__NO_SIDE_EFFECTS__
function X(n, t) {
  return Object.hasOwn(n, t) && t !== "__proto__" && t !== "prototype" && t !== "constructor";
}
// @__NO_SIDE_EFFECTS__
function K(n, t) {
  const e = [...new Set(n)];
  return e.length > 1 ? `(${e.join(` ${t} `)})` : e[0] ?? "never";
}
// @__NO_SIDE_EFFECTS__
function q(n, t, e) {
  return typeof n.fallback == "function" ? n.fallback(t, e) : n.fallback;
}
// @__NO_SIDE_EFFECTS__
function M(n, t, e) {
  return typeof n.default == "function" ? n.default(t, e) : n.default;
}
// @__NO_SIDE_EFFECTS__
function v(n, t) {
  return {
    kind: "schema",
    type: "array",
    reference: v,
    expects: "Array",
    async: !1,
    item: n,
    message: t,
    get "~standard"() {
      return /* @__PURE__ */ m(this);
    },
    "~run"(e, s) {
      const o = e.value;
      if (Array.isArray(o)) {
        e.typed = !0, e.value = [];
        for (let r = 0; r < o.length; r++) {
          const i = o[r], c = this.item["~run"]({ value: i }, s);
          if (c.issues) {
            const l = {
              type: "array",
              origin: "value",
              input: o,
              key: r,
              value: i
            };
            for (const p of c.issues)
              p.path ? p.path.unshift(l) : p.path = [l], e.issues?.push(p);
            if (e.issues || (e.issues = c.issues), s.abortEarly) {
              e.typed = !1;
              break;
            }
          }
          c.typed || (e.typed = !1), e.value.push(c.value);
        }
      } else h(this, "type", e, s);
      return e;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function _(n) {
  return {
    kind: "schema",
    type: "boolean",
    reference: _,
    expects: "boolean",
    async: !1,
    message: n,
    get "~standard"() {
      return /* @__PURE__ */ m(this);
    },
    "~run"(t, e) {
      return typeof t.value == "boolean" ? t.typed = !0 : h(this, "type", t, e), t;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function k(n, t) {
  return {
    kind: "schema",
    type: "literal",
    reference: k,
    expects: /* @__PURE__ */ L(n),
    async: !1,
    literal: n,
    message: t,
    get "~standard"() {
      return /* @__PURE__ */ m(this);
    },
    "~run"(e, s) {
      return e.value === this.literal ? e.typed = !0 : h(this, "type", e, s), e;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function b(n, t) {
  return {
    kind: "schema",
    type: "nullable",
    reference: b,
    expects: `(${n.expects} | null)`,
    async: !1,
    wrapped: n,
    default: t,
    get "~standard"() {
      return /* @__PURE__ */ m(this);
    },
    "~run"(e, s) {
      return e.value === null && (this.default !== void 0 && (e.value = /* @__PURE__ */ M(this, e, s)), e.value === null) ? (e.typed = !0, e) : this.wrapped["~run"](e, s);
    }
  };
}
// @__NO_SIDE_EFFECTS__
function S(n) {
  return {
    kind: "schema",
    type: "number",
    reference: S,
    expects: "number",
    async: !1,
    message: n,
    get "~standard"() {
      return /* @__PURE__ */ m(this);
    },
    "~run"(t, e) {
      return typeof t.value == "number" && !isNaN(t.value) ? t.typed = !0 : h(this, "type", t, e), t;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function y(n, t) {
  return {
    kind: "schema",
    type: "object",
    reference: y,
    expects: "Object",
    async: !1,
    entries: n,
    message: t,
    get "~standard"() {
      return /* @__PURE__ */ m(this);
    },
    "~run"(e, s) {
      const o = e.value;
      if (o && typeof o == "object") {
        e.typed = !0, e.value = {};
        for (const r in this.entries) {
          const i = this.entries[r];
          if (r in o || (i.type === "exact_optional" || i.type === "optional" || i.type === "nullish") && i.default !== void 0) {
            const c = r in o ? o[r] : /* @__PURE__ */ M(i), l = i["~run"]({ value: c }, s);
            if (l.issues) {
              const p = {
                type: "object",
                origin: "value",
                input: o,
                key: r,
                value: c
              };
              for (const f of l.issues)
                f.path ? f.path.unshift(p) : f.path = [p], e.issues?.push(f);
              if (e.issues || (e.issues = l.issues), s.abortEarly) {
                e.typed = !1;
                break;
              }
            }
            l.typed || (e.typed = !1), e.value[r] = l.value;
          } else if (i.fallback !== void 0) e.value[r] = /* @__PURE__ */ q(i);
          else if (i.type !== "exact_optional" && i.type !== "optional" && i.type !== "nullish" && (h(this, "key", e, s, {
            input: void 0,
            expected: `"${r}"`,
            path: [{
              type: "object",
              origin: "key",
              input: o,
              key: r,
              value: o[r]
            }]
          }), s.abortEarly))
            break;
        }
      } else h(this, "type", e, s);
      return e;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function d(n, t) {
  return {
    kind: "schema",
    type: "optional",
    reference: d,
    expects: `(${n.expects} | undefined)`,
    async: !1,
    wrapped: n,
    default: t,
    get "~standard"() {
      return /* @__PURE__ */ m(this);
    },
    "~run"(e, s) {
      return e.value === void 0 && (this.default !== void 0 && (e.value = /* @__PURE__ */ M(this, e, s)), e.value === void 0) ? (e.typed = !0, e) : this.wrapped["~run"](e, s);
    }
  };
}
// @__NO_SIDE_EFFECTS__
function j(n, t, e) {
  return {
    kind: "schema",
    type: "record",
    reference: j,
    expects: "Object",
    async: !1,
    key: n,
    value: t,
    message: e,
    get "~standard"() {
      return /* @__PURE__ */ m(this);
    },
    "~run"(s, o) {
      const r = s.value;
      if (r && typeof r == "object") {
        s.typed = !0, s.value = {};
        for (const i in r) if (/* @__PURE__ */ X(r, i)) {
          const c = r[i], l = this.key["~run"]({ value: i }, o);
          if (l.issues) {
            const f = {
              type: "object",
              origin: "key",
              input: r,
              key: i,
              value: c
            };
            for (const x of l.issues)
              x.path = [f], s.issues?.push(x);
            if (s.issues || (s.issues = l.issues), o.abortEarly) {
              s.typed = !1;
              break;
            }
          }
          const p = this.value["~run"]({ value: c }, o);
          if (p.issues) {
            const f = {
              type: "object",
              origin: "value",
              input: r,
              key: i,
              value: c
            };
            for (const x of p.issues)
              x.path ? x.path.unshift(f) : x.path = [f], s.issues?.push(x);
            if (s.issues || (s.issues = p.issues), o.abortEarly) {
              s.typed = !1;
              break;
            }
          }
          (!l.typed || !p.typed) && (s.typed = !1), l.typed && (s.value[l.value] = p.value);
        }
      } else h(this, "type", s, o);
      return s;
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
      return /* @__PURE__ */ m(this);
    },
    "~run"(t, e) {
      return typeof t.value == "string" ? t.typed = !0 : h(this, "type", t, e), t;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function A(n) {
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
    expects: /* @__PURE__ */ K(n.map((e) => e.expects), "|"),
    async: !1,
    options: n,
    message: t,
    get "~standard"() {
      return /* @__PURE__ */ m(this);
    },
    "~run"(e, s) {
      let o, r, i;
      for (const c of this.options) {
        const l = c["~run"]({ value: e.value }, s);
        if (l.typed) if (l.issues) r ? r.push(l) : r = [l];
        else {
          o = l;
          break;
        }
        else i ? i.push(l) : i = [l];
      }
      if (o) return o;
      if (r) {
        if (r.length === 1) return r[0];
        h(this, "type", e, s, { issues: /* @__PURE__ */ A(r) }), e.typed = !0;
      } else {
        if (i?.length === 1) return i[0];
        h(this, "type", e, s, { issues: /* @__PURE__ */ A(i) });
      }
      return e;
    }
  };
}
const g = (n) => /* @__PURE__ */ P(n.map((t) => /* @__PURE__ */ k(t))), H = /* @__PURE__ */ y({
  "en-au": /* @__PURE__ */ a(),
  "en-gb": /* @__PURE__ */ a(),
  "en-us": /* @__PURE__ */ a(),
  "es-es": /* @__PURE__ */ a()
}), C = /* @__PURE__ */ y({
  "en-au": /* @__PURE__ */ d(/* @__PURE__ */ a()),
  "en-gb": /* @__PURE__ */ d(/* @__PURE__ */ a()),
  "en-us": /* @__PURE__ */ d(/* @__PURE__ */ a()),
  "es-es": /* @__PURE__ */ d(/* @__PURE__ */ a())
}), J = g(["amber", "green", "red", "other"]), B = g([
  "alpha",
  "beta",
  "generalAvailability",
  "notApplicable",
  "preAlpha",
  "proposed",
  "releaseCandidate",
  "unavailable",
  "underReview"
]), Q = g([
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
]), W = /* @__PURE__ */ y({
  id: /* @__PURE__ */ a(),
  color: J,
  label: /* @__PURE__ */ a()
}), I = {
  id: /* @__PURE__ */ a(),
  label: C,
  description: C,
  firstCreatedAt: /* @__PURE__ */ d(/* @__PURE__ */ S()),
  icon: /* @__PURE__ */ b(/* @__PURE__ */ a()),
  iconDark: /* @__PURE__ */ b(/* @__PURE__ */ a()),
  lastUpdatedAt: /* @__PURE__ */ b(/* @__PURE__ */ S()),
  status: /* @__PURE__ */ b(W),
  statusId: B
}, ce = /* @__PURE__ */ y({
  ...I,
  typeId: Q
}), w = /* @__PURE__ */ y({
  id: /* @__PURE__ */ a(),
  label: C,
  description: C,
  icon: /* @__PURE__ */ b(/* @__PURE__ */ a()),
  iconDark: /* @__PURE__ */ b(/* @__PURE__ */ a()),
  order: /* @__PURE__ */ S(),
  path: /* @__PURE__ */ a()
});
g(["app", "engine", "connector", "context", "presenter", "tool"]);
const O = {
  ...I,
  version: /* @__PURE__ */ a()
}, Y = g(["apiKey", "disabled", "oAuth2", "none"]), Z = /* @__PURE__ */ y({
  authMethodId: Y,
  activeConnectionCount: /* @__PURE__ */ d(/* @__PURE__ */ S()),
  canDescribe: /* @__PURE__ */ d(/* @__PURE__ */ _()),
  id: /* @__PURE__ */ d(/* @__PURE__ */ a()),
  label: /* @__PURE__ */ d(H),
  maxConnectionCount: /* @__PURE__ */ d(/* @__PURE__ */ S()),
  params: /* @__PURE__ */ d(/* @__PURE__ */ v(/* @__PURE__ */ j(/* @__PURE__ */ a(), /* @__PURE__ */ a())))
}), $ = g(["application", "curatedDataset", "database", "fileStore"]), ee = g([
  "abortOperation",
  "authenticateConnection",
  "createObject",
  "describeConnection",
  "dropObject",
  "findObjectFolderPath",
  "getReadableStream",
  "getRecord",
  "listNodes",
  "previewObject",
  "removeRecords",
  "retrieveChunks",
  "retrieveRecords",
  "upsertRecords"
]), ne = g(["bidirectional", "destination", "source", "unknown"]), pe = /* @__PURE__ */ y({
  ...O,
  typeId: /* @__PURE__ */ k("connector"),
  category: /* @__PURE__ */ b(/* @__PURE__ */ y({ id: /* @__PURE__ */ a(), label: /* @__PURE__ */ a() })),
  categoryId: $,
  implementations: /* @__PURE__ */ j(/* @__PURE__ */ a(), Z),
  operations: /* @__PURE__ */ v(ee),
  usageId: ne,
  vendorAccountURL: /* @__PURE__ */ b(/* @__PURE__ */ a()),
  vendorDocumentationURL: /* @__PURE__ */ b(/* @__PURE__ */ a()),
  vendorHomeURL: /* @__PURE__ */ b(/* @__PURE__ */ a())
}), te = g(["list"]), se = /* @__PURE__ */ y({
  ...I,
  typeId: /* @__PURE__ */ k("contextModelGroup"),
  modelRefs: /* @__PURE__ */ v(w),
  order: /* @__PURE__ */ S()
}), fe = /* @__PURE__ */ y({
  ...O,
  typeId: /* @__PURE__ */ k("context"),
  models: /* @__PURE__ */ v(se),
  operations: /* @__PURE__ */ v(te)
}), re = g(["list", "render", "setColorMode"]), de = /* @__PURE__ */ y({
  ...O,
  typeId: /* @__PURE__ */ k("presenter"),
  presentations: /* @__PURE__ */ v(w),
  operations: /* @__PURE__ */ v(re)
});
function ye() {
  return { render: oe };
}
function oe(n, t, e) {
  e.textContent = "Cytoscape.js diagram goes here...";
}
function be() {
  return { render: ie };
}
function ie(n, t) {
  console.log(1111, n), console.log(2222, t), console.log(3333, t.childNodes), console.log(4444, t.children);
}
const u = (n) => new Map(Object.entries(n)), R = (n, t, e = E) => {
  const s = n.get(t);
  if (s !== void 0) return s;
  if (e !== t)
    return n.get(e);
}, le = [
  { id: "dtv", labels: u({ "en-gb": "Delimited Text" }) },
  { id: "e/e", labels: u({ "en-gb": "Entity/Event" }) },
  { id: "jsonArray", labels: u({ "en-gb": "JSON Array" }) },
  { id: "spss", labels: u({ "en-gb": "SPSS" }) },
  { id: "xls", labels: u({ "en-gb": "XLS" }) },
  { id: "xlsx", labels: u({ "en-gb": "XLSX" }) },
  { id: "xml", labels: u({ "en-gb": "XML" }) }
], he = (n = E) => {
  const t = [];
  for (const e of le) {
    const s = R(e.labels, n);
    t.push({ id: e.id, label: s ?? e.id });
  }
  return t;
}, ae = [
  { id: `
`, labels: u({ "en-gb": "Newline" }) },
  { id: "\r", labels: u({ "en-gb": "Carriage Return" }) },
  { id: `\r
`, labels: u({ "en-gb": "Carriage Return/Newline" }) }
], me = (n = E) => {
  const t = [];
  for (const e of ae) {
    const s = R(e.labels, n);
    t.push({ id: e.id, label: s ?? e.id });
  }
  return t;
}, ue = [
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
], ge = (n = E) => {
  const t = [];
  for (const e of ue) {
    const s = R(e.labels, n);
    t.push({ id: e.id, label: s ?? e.id });
  }
  return t;
}, E = "en-gb";
export {
  E as DEFAULT_LOCALE_CODE,
  ce as componentConfigSchema,
  pe as connectorConfigSchema,
  fe as contextConfigSchema,
  he as getDataFormats,
  me as getRecordDelimiters,
  ge as getValueDelimiters,
  de as presenterConfigSchema,
  ye as useCytoscapeJS,
  be as useDataTable
};
