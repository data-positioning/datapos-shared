let k;
// @__NO_SIDE_EFFECTS__
function I(n) {
  return {
    lang: n?.lang ?? k?.lang,
    message: n?.message,
    abortEarly: n?.abortEarly ?? k?.abortEarly,
    abortPipeEarly: n?.abortPipeEarly ?? k?.abortPipeEarly
  };
}
let _;
// @__NO_SIDE_EFFECTS__
function P(n) {
  return _?.get(n);
}
let A;
// @__NO_SIDE_EFFECTS__
function C(n) {
  return A?.get(n);
}
let O;
// @__NO_SIDE_EFFECTS__
function G(n, t) {
  return O?.get(n)?.get(t);
}
// @__NO_SIDE_EFFECTS__
function M(n) {
  const t = typeof n;
  return t === "string" ? `"${n}"` : t === "number" || t === "bigint" || t === "boolean" ? `${n}` : t === "object" || t === "function" ? (n && Object.getPrototypeOf(n)?.constructor?.name) ?? "null" : t;
}
function f(n, t, e, s, i) {
  const r = i && "input" in i ? i.input : e.value, u = i?.expected ?? n.expects ?? null, a = i?.received ?? /* @__PURE__ */ M(r), l = {
    kind: n.kind,
    type: n.type,
    input: r,
    expected: u,
    received: a,
    message: `Invalid ${t}: ${u ? `Expected ${u} but r` : "R"}eceived ${a}`,
    requirement: n.requirement,
    path: i?.path,
    issues: i?.issues,
    lang: s.lang,
    abortEarly: s.abortEarly,
    abortPipeEarly: s.abortPipeEarly
  }, c = n.kind === "schema", p = i?.message ?? n.message ?? /* @__PURE__ */ G(n.reference, l.lang) ?? (c ? /* @__PURE__ */ C(l.lang) : null) ?? s.message ?? /* @__PURE__ */ P(l.lang);
  p !== void 0 && (l.message = typeof p == "function" ? p(l) : p), c && (e.typed = !1), e.issues ? e.issues.push(l) : e.issues = [l];
}
// @__NO_SIDE_EFFECTS__
function y(n) {
  return {
    version: 1,
    vendor: "valibot",
    validate(t) {
      return n["~run"]({ value: t }, /* @__PURE__ */ I());
    }
  };
}
// @__NO_SIDE_EFFECTS__
function w(n, t) {
  return Object.hasOwn(n, t) && t !== "__proto__" && t !== "prototype" && t !== "constructor";
}
// @__NO_SIDE_EFFECTS__
function R(n, t) {
  const e = [...new Set(n)];
  return e.length > 1 ? `(${e.join(` ${t} `)})` : e[0] ?? "never";
}
// @__NO_SIDE_EFFECTS__
function V(n, t, e) {
  return typeof n.fallback == "function" ? n.fallback(t, e) : n.fallback;
}
// @__NO_SIDE_EFFECTS__
function x(n, t, e) {
  return typeof n.default == "function" ? n.default(t, e) : n.default;
}
// @__NO_SIDE_EFFECTS__
function q(n, t) {
  return {
    kind: "schema",
    type: "array",
    reference: q,
    expects: "Array",
    async: !1,
    item: n,
    message: t,
    get "~standard"() {
      return /* @__PURE__ */ y(this);
    },
    "~run"(e, s) {
      const i = e.value;
      if (Array.isArray(i)) {
        e.typed = !0, e.value = [];
        for (let r = 0; r < i.length; r++) {
          const u = i[r], a = this.item["~run"]({ value: u }, s);
          if (a.issues) {
            const l = {
              type: "array",
              origin: "value",
              input: i,
              key: r,
              value: u
            };
            for (const c of a.issues)
              c.path ? c.path.unshift(l) : c.path = [l], e.issues?.push(c);
            if (e.issues || (e.issues = a.issues), s.abortEarly) {
              e.typed = !1;
              break;
            }
          }
          a.typed || (e.typed = !1), e.value.push(a.value);
        }
      } else f(this, "type", e, s);
      return e;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function F(n) {
  return {
    kind: "schema",
    type: "boolean",
    reference: F,
    expects: "boolean",
    async: !1,
    message: n,
    get "~standard"() {
      return /* @__PURE__ */ y(this);
    },
    "~run"(t, e) {
      return typeof t.value == "boolean" ? t.typed = !0 : f(this, "type", t, e), t;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function j(n, t) {
  return {
    kind: "schema",
    type: "literal",
    reference: j,
    expects: /* @__PURE__ */ M(n),
    async: !1,
    literal: n,
    message: t,
    get "~standard"() {
      return /* @__PURE__ */ y(this);
    },
    "~run"(e, s) {
      return e.value === this.literal ? e.typed = !0 : f(this, "type", e, s), e;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function v(n, t) {
  return {
    kind: "schema",
    type: "nullable",
    reference: v,
    expects: `(${n.expects} | null)`,
    async: !1,
    wrapped: n,
    default: t,
    get "~standard"() {
      return /* @__PURE__ */ y(this);
    },
    "~run"(e, s) {
      return e.value === null && (this.default !== void 0 && (e.value = /* @__PURE__ */ x(this, e, s)), e.value === null) ? (e.typed = !0, e) : this.wrapped["~run"](e, s);
    }
  };
}
// @__NO_SIDE_EFFECTS__
function m(n) {
  return {
    kind: "schema",
    type: "number",
    reference: m,
    expects: "number",
    async: !1,
    message: n,
    get "~standard"() {
      return /* @__PURE__ */ y(this);
    },
    "~run"(t, e) {
      return typeof t.value == "number" && !isNaN(t.value) ? t.typed = !0 : f(this, "type", t, e), t;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function d(n, t) {
  return {
    kind: "schema",
    type: "object",
    reference: d,
    expects: "Object",
    async: !1,
    entries: n,
    message: t,
    get "~standard"() {
      return /* @__PURE__ */ y(this);
    },
    "~run"(e, s) {
      const i = e.value;
      if (i && typeof i == "object") {
        e.typed = !0, e.value = {};
        for (const r in this.entries) {
          const u = this.entries[r];
          if (r in i || (u.type === "exact_optional" || u.type === "optional" || u.type === "nullish") && u.default !== void 0) {
            const a = r in i ? i[r] : /* @__PURE__ */ x(u), l = u["~run"]({ value: a }, s);
            if (l.issues) {
              const c = {
                type: "object",
                origin: "value",
                input: i,
                key: r,
                value: a
              };
              for (const p of l.issues)
                p.path ? p.path.unshift(c) : p.path = [c], e.issues?.push(p);
              if (e.issues || (e.issues = l.issues), s.abortEarly) {
                e.typed = !1;
                break;
              }
            }
            l.typed || (e.typed = !1), e.value[r] = l.value;
          } else if (u.fallback !== void 0) e.value[r] = /* @__PURE__ */ V(u);
          else if (u.type !== "exact_optional" && u.type !== "optional" && u.type !== "nullish" && (f(this, "key", e, s, {
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
      } else f(this, "type", e, s);
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
      return /* @__PURE__ */ y(this);
    },
    "~run"(e, s) {
      return e.value === void 0 && (this.default !== void 0 && (e.value = /* @__PURE__ */ x(this, e, s)), e.value === void 0) ? (e.typed = !0, e) : this.wrapped["~run"](e, s);
    }
  };
}
// @__NO_SIDE_EFFECTS__
function K(n, t, e) {
  return {
    kind: "schema",
    type: "record",
    reference: K,
    expects: "Object",
    async: !1,
    key: n,
    value: t,
    message: e,
    get "~standard"() {
      return /* @__PURE__ */ y(this);
    },
    "~run"(s, i) {
      const r = s.value;
      if (r && typeof r == "object") {
        s.typed = !0, s.value = {};
        for (const u in r) if (/* @__PURE__ */ w(r, u)) {
          const a = r[u], l = this.key["~run"]({ value: u }, i);
          if (l.issues) {
            const p = {
              type: "object",
              origin: "key",
              input: r,
              key: u,
              value: a
            };
            for (const h of l.issues)
              h.path = [p], s.issues?.push(h);
            if (s.issues || (s.issues = l.issues), i.abortEarly) {
              s.typed = !1;
              break;
            }
          }
          const c = this.value["~run"]({ value: a }, i);
          if (c.issues) {
            const p = {
              type: "object",
              origin: "value",
              input: r,
              key: u,
              value: a
            };
            for (const h of c.issues)
              h.path ? h.path.unshift(p) : h.path = [p], s.issues?.push(h);
            if (s.issues || (s.issues = c.issues), i.abortEarly) {
              s.typed = !1;
              break;
            }
          }
          (!l.typed || !c.typed) && (s.typed = !1), l.typed && (s.value[l.value] = c.value);
        }
      } else f(this, "type", s, i);
      return s;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function o(n) {
  return {
    kind: "schema",
    type: "string",
    reference: o,
    expects: "string",
    async: !1,
    message: n,
    get "~standard"() {
      return /* @__PURE__ */ y(this);
    },
    "~run"(t, e) {
      return typeof t.value == "string" ? t.typed = !0 : f(this, "type", t, e), t;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function S(n) {
  let t;
  if (n) for (const e of n) t ? t.push(...e.issues) : t = e.issues;
  return t;
}
// @__NO_SIDE_EFFECTS__
function D(n, t) {
  return {
    kind: "schema",
    type: "union",
    reference: D,
    expects: /* @__PURE__ */ R(n.map((e) => e.expects), "|"),
    async: !1,
    options: n,
    message: t,
    get "~standard"() {
      return /* @__PURE__ */ y(this);
    },
    "~run"(e, s) {
      let i, r, u;
      for (const a of this.options) {
        const l = a["~run"]({ value: e.value }, s);
        if (l.typed) if (l.issues) r ? r.push(l) : r = [l];
        else {
          i = l;
          break;
        }
        else u ? u.push(l) : u = [l];
      }
      if (i) return i;
      if (r) {
        if (r.length === 1) return r[0];
        f(this, "type", e, s, { issues: /* @__PURE__ */ S(r) }), e.typed = !0;
      } else {
        if (u?.length === 1) return u[0];
        f(this, "type", e, s, { issues: /* @__PURE__ */ S(u) });
      }
      return e;
    }
  };
}
const E = (n) => /* @__PURE__ */ D(n.map((t) => /* @__PURE__ */ j(t))), T = /* @__PURE__ */ d({
  "en-au": /* @__PURE__ */ o(),
  "en-gb": /* @__PURE__ */ o(),
  "en-us": /* @__PURE__ */ o(),
  "es-es": /* @__PURE__ */ o()
}), g = /* @__PURE__ */ d({
  "en-au": /* @__PURE__ */ b(/* @__PURE__ */ o()),
  "en-gb": /* @__PURE__ */ b(/* @__PURE__ */ o()),
  "en-us": /* @__PURE__ */ b(/* @__PURE__ */ o()),
  "es-es": /* @__PURE__ */ b(/* @__PURE__ */ o())
}), N = E(["amber", "green", "red", "other"]), U = E([
  "alpha",
  "beta",
  "generalAvailability",
  "notApplicable",
  "preAlpha",
  "proposed",
  "releaseCandidate",
  "unavailable",
  "underReview"
]), H = E([
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
]), L = /* @__PURE__ */ d({
  id: /* @__PURE__ */ o(),
  color: N,
  label: /* @__PURE__ */ o()
}), Q = {
  id: /* @__PURE__ */ o(),
  label: g,
  description: g,
  firstCreatedAt: /* @__PURE__ */ b(/* @__PURE__ */ m()),
  icon: /* @__PURE__ */ v(/* @__PURE__ */ o()),
  iconDark: /* @__PURE__ */ v(/* @__PURE__ */ o()),
  lastUpdatedAt: /* @__PURE__ */ v(/* @__PURE__ */ m()),
  status: /* @__PURE__ */ v(L),
  statusId: U
}, z = /* @__PURE__ */ d({
  ...Q,
  typeId: H
}), B = /* @__PURE__ */ d({
  id: /* @__PURE__ */ o(),
  label: g,
  description: g,
  icon: /* @__PURE__ */ v(/* @__PURE__ */ o()),
  iconDark: /* @__PURE__ */ v(/* @__PURE__ */ o()),
  order: /* @__PURE__ */ m(),
  path: /* @__PURE__ */ o()
});
export {
  q as a,
  j as b,
  Q as c,
  B as d,
  z as e,
  v as f,
  b as g,
  T as h,
  F as i,
  E as l,
  m as n,
  d as o,
  g as p,
  K as r,
  o as s
};
