let M;
// @__NO_SIDE_EFFECTS__
function w(n) {
  return {
    lang: n?.lang ?? M?.lang,
    message: n?.message,
    abortEarly: n?.abortEarly ?? M?.abortEarly,
    abortPipeEarly: n?.abortPipeEarly ?? M?.abortPipeEarly
  };
}
let F;
// @__NO_SIDE_EFFECTS__
function G(n) {
  return F?.get(n);
}
let R;
// @__NO_SIDE_EFFECTS__
function N(n) {
  return R?.get(n);
}
let T;
// @__NO_SIDE_EFFECTS__
function U(n, t) {
  return T?.get(n)?.get(t);
}
// @__NO_SIDE_EFFECTS__
function O(n) {
  const t = typeof n;
  return t === "string" ? `"${n}"` : t === "number" || t === "bigint" || t === "boolean" ? `${n}` : t === "object" || t === "function" ? (n && Object.getPrototypeOf(n)?.constructor?.name) ?? "null" : t;
}
function y(n, t, e, s, i) {
  const r = i && "input" in i ? i.input : e.value, o = i?.expected ?? n.expects ?? null, c = i?.received ?? /* @__PURE__ */ O(r), l = {
    kind: n.kind,
    type: n.type,
    input: r,
    expected: o,
    received: c,
    message: `Invalid ${t}: ${o ? `Expected ${o} but r` : "R"}eceived ${c}`,
    requirement: n.requirement,
    path: i?.path,
    issues: i?.issues,
    lang: s.lang,
    abortEarly: s.abortEarly,
    abortPipeEarly: s.abortPipeEarly
  }, p = n.kind === "schema", f = i?.message ?? n.message ?? /* @__PURE__ */ U(n.reference, l.lang) ?? (p ? /* @__PURE__ */ N(l.lang) : null) ?? s.message ?? /* @__PURE__ */ G(l.lang);
  f !== void 0 && (l.message = typeof f == "function" ? f(l) : f), p && (e.typed = !1), e.issues ? e.issues.push(l) : e.issues = [l];
}
// @__NO_SIDE_EFFECTS__
function d(n) {
  return {
    version: 1,
    vendor: "valibot",
    validate(t) {
      return n["~run"]({ value: t }, /* @__PURE__ */ w());
    }
  };
}
// @__NO_SIDE_EFFECTS__
function V(n, t) {
  return Object.hasOwn(n, t) && t !== "__proto__" && t !== "prototype" && t !== "constructor";
}
// @__NO_SIDE_EFFECTS__
function z(n, t) {
  const e = [...new Set(n)];
  return e.length > 1 ? `(${e.join(` ${t} `)})` : e[0] ?? "never";
}
// @__NO_SIDE_EFFECTS__
function X(n, t, e) {
  return typeof n.fallback == "function" ? n.fallback(t, e) : n.fallback;
}
// @__NO_SIDE_EFFECTS__
function C(n, t, e) {
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
      return /* @__PURE__ */ d(this);
    },
    "~run"(e, s) {
      const i = e.value;
      if (Array.isArray(i)) {
        e.typed = !0, e.value = [];
        for (let r = 0; r < i.length; r++) {
          const o = i[r], c = this.item["~run"]({ value: o }, s);
          if (c.issues) {
            const l = {
              type: "array",
              origin: "value",
              input: i,
              key: r,
              value: o
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
      } else y(this, "type", e, s);
      return e;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function q(n) {
  return {
    kind: "schema",
    type: "boolean",
    reference: q,
    expects: "boolean",
    async: !1,
    message: n,
    get "~standard"() {
      return /* @__PURE__ */ d(this);
    },
    "~run"(t, e) {
      return typeof t.value == "boolean" ? t.typed = !0 : y(this, "type", t, e), t;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function k(n, t) {
  return {
    kind: "schema",
    type: "literal",
    reference: k,
    expects: /* @__PURE__ */ O(n),
    async: !1,
    literal: n,
    message: t,
    get "~standard"() {
      return /* @__PURE__ */ d(this);
    },
    "~run"(e, s) {
      return e.value === this.literal ? e.typed = !0 : y(this, "type", e, s), e;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function g(n, t) {
  return {
    kind: "schema",
    type: "nullable",
    reference: g,
    expects: `(${n.expects} | null)`,
    async: !1,
    wrapped: n,
    default: t,
    get "~standard"() {
      return /* @__PURE__ */ d(this);
    },
    "~run"(e, s) {
      return e.value === null && (this.default !== void 0 && (e.value = /* @__PURE__ */ C(this, e, s)), e.value === null) ? (e.typed = !0, e) : this.wrapped["~run"](e, s);
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
      return /* @__PURE__ */ d(this);
    },
    "~run"(t, e) {
      return typeof t.value == "number" && !isNaN(t.value) ? t.typed = !0 : y(this, "type", t, e), t;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function b(n, t) {
  return {
    kind: "schema",
    type: "object",
    reference: b,
    expects: "Object",
    async: !1,
    entries: n,
    message: t,
    get "~standard"() {
      return /* @__PURE__ */ d(this);
    },
    "~run"(e, s) {
      const i = e.value;
      if (i && typeof i == "object") {
        e.typed = !0, e.value = {};
        for (const r in this.entries) {
          const o = this.entries[r];
          if (r in i || (o.type === "exact_optional" || o.type === "optional" || o.type === "nullish") && o.default !== void 0) {
            const c = r in i ? i[r] : /* @__PURE__ */ C(o), l = o["~run"]({ value: c }, s);
            if (l.issues) {
              const p = {
                type: "object",
                origin: "value",
                input: i,
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
          } else if (o.fallback !== void 0) e.value[r] = /* @__PURE__ */ X(o);
          else if (o.type !== "exact_optional" && o.type !== "optional" && o.type !== "nullish" && (y(this, "key", e, s, {
            input: void 0,
            expected: `"${r}"`,
            path: [{
              type: "object",
              origin: "key",
              input: i,
              key: r,
              value: i[r]
            }]
          }), s.abortEarly))
            break;
        }
      } else y(this, "type", e, s);
      return e;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function m(n, t) {
  return {
    kind: "schema",
    type: "optional",
    reference: m,
    expects: `(${n.expects} | undefined)`,
    async: !1,
    wrapped: n,
    default: t,
    get "~standard"() {
      return /* @__PURE__ */ d(this);
    },
    "~run"(e, s) {
      return e.value === void 0 && (this.default !== void 0 && (e.value = /* @__PURE__ */ C(this, e, s)), e.value === void 0) ? (e.typed = !0, e) : this.wrapped["~run"](e, s);
    }
  };
}
// @__NO_SIDE_EFFECTS__
function J(n, t, e) {
  return {
    kind: "schema",
    type: "record",
    reference: J,
    expects: "Object",
    async: !1,
    key: n,
    value: t,
    message: e,
    get "~standard"() {
      return /* @__PURE__ */ d(this);
    },
    "~run"(s, i) {
      const r = s.value;
      if (r && typeof r == "object") {
        s.typed = !0, s.value = {};
        for (const o in r) if (/* @__PURE__ */ V(r, o)) {
          const c = r[o], l = this.key["~run"]({ value: o }, i);
          if (l.issues) {
            const f = {
              type: "object",
              origin: "key",
              input: r,
              key: o,
              value: c
            };
            for (const h of l.issues)
              h.path = [f], s.issues?.push(h);
            if (s.issues || (s.issues = l.issues), i.abortEarly) {
              s.typed = !1;
              break;
            }
          }
          const p = this.value["~run"]({ value: c }, i);
          if (p.issues) {
            const f = {
              type: "object",
              origin: "value",
              input: r,
              key: o,
              value: c
            };
            for (const h of p.issues)
              h.path ? h.path.unshift(f) : h.path = [f], s.issues?.push(h);
            if (s.issues || (s.issues = p.issues), i.abortEarly) {
              s.typed = !1;
              break;
            }
          }
          (!l.typed || !p.typed) && (s.typed = !1), l.typed && (s.value[l.value] = p.value);
        }
      } else y(this, "type", s, i);
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
      return /* @__PURE__ */ d(this);
    },
    "~run"(t, e) {
      return typeof t.value == "string" ? t.typed = !0 : y(this, "type", t, e), t;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function _(n) {
  let t;
  if (n) for (const e of n) t ? t.push(...e.issues) : t = e.issues;
  return t;
}
// @__NO_SIDE_EFFECTS__
function A(n, t) {
  return {
    kind: "schema",
    type: "union",
    reference: A,
    expects: /* @__PURE__ */ z(n.map((e) => e.expects), "|"),
    async: !1,
    options: n,
    message: t,
    get "~standard"() {
      return /* @__PURE__ */ d(this);
    },
    "~run"(e, s) {
      let i, r, o;
      for (const c of this.options) {
        const l = c["~run"]({ value: e.value }, s);
        if (l.typed) if (l.issues) r ? r.push(l) : r = [l];
        else {
          i = l;
          break;
        }
        else o ? o.push(l) : o = [l];
      }
      if (i) return i;
      if (r) {
        if (r.length === 1) return r[0];
        y(this, "type", e, s, { issues: /* @__PURE__ */ _(r) }), e.typed = !0;
      } else {
        if (o?.length === 1) return o[0];
        y(this, "type", e, s, { issues: /* @__PURE__ */ _(o) });
      }
      return e;
    }
  };
}
const x = (n) => /* @__PURE__ */ A(n.map((t) => /* @__PURE__ */ k(t))), re = /* @__PURE__ */ b({
  "en-au": /* @__PURE__ */ a(),
  "en-gb": /* @__PURE__ */ a(),
  "en-us": /* @__PURE__ */ a(),
  "es-es": /* @__PURE__ */ a()
}), E = /* @__PURE__ */ b({
  "en-au": /* @__PURE__ */ m(/* @__PURE__ */ a()),
  "en-gb": /* @__PURE__ */ m(/* @__PURE__ */ a()),
  "en-us": /* @__PURE__ */ m(/* @__PURE__ */ a()),
  "es-es": /* @__PURE__ */ m(/* @__PURE__ */ a())
}), K = x(["amber", "green", "red", "other"]), B = x([
  "alpha",
  "beta",
  "generalAvailability",
  "notApplicable",
  "preAlpha",
  "proposed",
  "releaseCandidate",
  "unavailable",
  "underReview"
]), H = x([
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
]), Q = /* @__PURE__ */ b({
  id: /* @__PURE__ */ a(),
  color: K,
  label: /* @__PURE__ */ a()
}), j = {
  id: /* @__PURE__ */ a(),
  label: E,
  description: E,
  firstCreatedAt: /* @__PURE__ */ m(/* @__PURE__ */ S()),
  icon: /* @__PURE__ */ g(/* @__PURE__ */ a()),
  iconDark: /* @__PURE__ */ g(/* @__PURE__ */ a()),
  lastUpdatedAt: /* @__PURE__ */ g(/* @__PURE__ */ S()),
  status: /* @__PURE__ */ g(Q),
  statusId: B
}, ie = /* @__PURE__ */ b({
  ...j,
  typeId: H
}), L = /* @__PURE__ */ b({
  id: /* @__PURE__ */ a(),
  label: E,
  description: E,
  icon: /* @__PURE__ */ g(/* @__PURE__ */ a()),
  iconDark: /* @__PURE__ */ g(/* @__PURE__ */ a()),
  order: /* @__PURE__ */ S(),
  path: /* @__PURE__ */ a()
});
x(["app", "engine", "connector", "context", "presenter", "tool"]);
const P = {
  ...j,
  version: /* @__PURE__ */ a()
}, W = x(["list"]), Y = /* @__PURE__ */ b({
  ...j,
  typeId: /* @__PURE__ */ k("contextModelGroup"),
  modelRefs: /* @__PURE__ */ v(L),
  order: /* @__PURE__ */ S()
}), oe = /* @__PURE__ */ b({
  ...P,
  typeId: /* @__PURE__ */ k("context"),
  models: /* @__PURE__ */ v(Y),
  operations: /* @__PURE__ */ v(W)
}), Z = x(["list", "render", "setColorMode"]), le = /* @__PURE__ */ b({
  ...P,
  typeId: /* @__PURE__ */ k("presenter"),
  presentations: /* @__PURE__ */ v(L),
  operations: /* @__PURE__ */ v(Z)
});
function ue() {
  return { render: $ };
}
function $(n, t, e) {
  e.textContent = "Cytoscape.js diagram goes here...";
}
function ae() {
  return { render: ee };
}
function ee(n, t) {
  console.log(1111, n), console.log(2222, t), console.log(3333, t.childNodes), console.log(4444, t.children);
}
const u = (n) => new Map(Object.entries(n)), I = (n, t, e = D) => {
  const s = n.get(t);
  if (s !== void 0) return s;
  if (e !== t)
    return n.get(e);
}, ne = [
  { id: "dtv", labels: u({ "en-gb": "Delimited Text" }) },
  { id: "e/e", labels: u({ "en-gb": "Entity/Event" }) },
  { id: "jsonArray", labels: u({ "en-gb": "JSON Array" }) },
  { id: "spss", labels: u({ "en-gb": "SPSS" }) },
  { id: "xls", labels: u({ "en-gb": "XLS" }) },
  { id: "xlsx", labels: u({ "en-gb": "XLSX" }) },
  { id: "xml", labels: u({ "en-gb": "XML" }) }
], ce = (n = D) => {
  const t = [];
  for (const e of ne) {
    const s = I(e.labels, n);
    t.push({ id: e.id, label: s ?? e.id });
  }
  return t;
}, te = [
  { id: `
`, labels: u({ "en-gb": "Newline" }) },
  { id: "\r", labels: u({ "en-gb": "Carriage Return" }) },
  { id: `\r
`, labels: u({ "en-gb": "Carriage Return/Newline" }) }
], pe = (n = D) => {
  const t = [];
  for (const e of te) {
    const s = I(e.labels, n);
    t.push({ id: e.id, label: s ?? e.id });
  }
  return t;
}, se = [
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
], fe = (n = D) => {
  const t = [];
  for (const e of se) {
    const s = I(e.labels, n);
    t.push({ id: e.id, label: s ?? e.id });
  }
  return t;
}, D = "en-gb";
export {
  D,
  v as a,
  k as b,
  ie as c,
  m as d,
  S as e,
  re as f,
  q as g,
  oe as h,
  ae as i,
  ce as j,
  pe as k,
  x as l,
  P as m,
  g as n,
  b as o,
  le as p,
  fe as q,
  J as r,
  a as s,
  ue as u
};
