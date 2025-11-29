const Yi = ["createObject", "dropObject", "removeRecords", "upsertRecords"], Hi = ["findObject", "getRecord", "listNodes", "previewObject", "retrieveRecords"];
function s(e, t, n) {
  function r(u, a) {
    var d;
    Object.defineProperty(u, "_zod", {
      value: u._zod ?? {},
      enumerable: !1
    }), (d = u._zod).traits ?? (d.traits = /* @__PURE__ */ new Set()), u._zod.traits.add(e), t(u, a);
    for (const f in c.prototype)
      f in u || Object.defineProperty(u, f, { value: c.prototype[f].bind(u) });
    u._zod.constr = c, u._zod.def = a;
  }
  const o = n?.Parent ?? Object;
  class i extends o {
  }
  Object.defineProperty(i, "name", { value: e });
  function c(u) {
    var a;
    const d = n?.Parent ? new i() : this;
    r(d, u), (a = d._zod).deferred ?? (a.deferred = []);
    for (const f of d._zod.deferred)
      f();
    return d;
  }
  return Object.defineProperty(c, "init", { value: r }), Object.defineProperty(c, Symbol.hasInstance, {
    value: (u) => n?.Parent && u instanceof n.Parent ? !0 : u?._zod?.traits?.has(e)
  }), Object.defineProperty(c, "name", { value: e }), c;
}
class j extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class Ve extends Error {
  constructor(t) {
    super(`Encountered unidirectional transform during encode: ${t}`), this.name = "ZodEncodeError";
  }
}
const Be = {};
function T(e) {
  return Be;
}
function gt(e) {
  const t = Object.values(e).filter((r) => typeof r == "number");
  return Object.entries(e).filter(([r, o]) => t.indexOf(+r) === -1).map(([r, o]) => o);
}
function ae(e, t) {
  return typeof t == "bigint" ? t.toString() : t;
}
function pe(e) {
  return {
    get value() {
      {
        const t = e();
        return Object.defineProperty(this, "value", { value: t }), t;
      }
    }
  };
}
function fe(e) {
  return e == null;
}
function he(e) {
  const t = e.startsWith("^") ? 1 : 0, n = e.endsWith("$") ? e.length - 1 : e.length;
  return e.slice(t, n);
}
function _t(e, t) {
  const n = (e.toString().split(".")[1] || "").length, r = t.toString();
  let o = (r.split(".")[1] || "").length;
  if (o === 0 && /\d?e-\d?/.test(r)) {
    const a = r.match(/\d?e-(\d?)/);
    a?.[1] && (o = Number.parseInt(a[1]));
  }
  const i = n > o ? n : o, c = Number.parseInt(e.toFixed(i).replace(".", "")), u = Number.parseInt(t.toFixed(i).replace(".", ""));
  return c % u / 10 ** i;
}
const ke = Symbol("evaluating");
function h(e, t, n) {
  let r;
  Object.defineProperty(e, t, {
    get() {
      if (r !== ke)
        return r === void 0 && (r = ke, r = n()), r;
    },
    set(o) {
      Object.defineProperty(e, t, {
        value: o
        // configurable: true,
      });
    },
    configurable: !0
  });
}
function P(e, t, n) {
  Object.defineProperty(e, t, {
    value: n,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function D(...e) {
  const t = {};
  for (const n of e) {
    const r = Object.getOwnPropertyDescriptors(n);
    Object.assign(t, r);
  }
  return Object.defineProperties({}, t);
}
function $e(e) {
  return JSON.stringify(e);
}
const We = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {
};
function Y(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
const vt = pe(() => {
  if (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))
    return !1;
  try {
    const e = Function;
    return new e(""), !0;
  } catch {
    return !1;
  }
});
function F(e) {
  if (Y(e) === !1)
    return !1;
  const t = e.constructor;
  if (t === void 0)
    return !0;
  const n = t.prototype;
  return !(Y(n) === !1 || Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") === !1);
}
function Ge(e) {
  return F(e) ? { ...e } : Array.isArray(e) ? [...e] : e;
}
const bt = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function U(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function N(e, t, n) {
  const r = new e._zod.constr(t ?? e._zod.def);
  return (!t || n?.parent) && (r._zod.parent = e), r;
}
function p(e) {
  const t = e;
  if (!t)
    return {};
  if (typeof t == "string")
    return { error: () => t };
  if (t?.message !== void 0) {
    if (t?.error !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    t.error = t.message;
  }
  return delete t.message, typeof t.error == "string" ? { ...t, error: () => t.error } : t;
}
function wt(e) {
  return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
const zt = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function kt(e, t) {
  const n = e._zod.def, r = D(e._zod.def, {
    get shape() {
      const o = {};
      for (const i in t) {
        if (!(i in n.shape))
          throw new Error(`Unrecognized key: "${i}"`);
        t[i] && (o[i] = n.shape[i]);
      }
      return P(this, "shape", o), o;
    },
    checks: []
  });
  return N(e, r);
}
function $t(e, t) {
  const n = e._zod.def, r = D(e._zod.def, {
    get shape() {
      const o = { ...e._zod.def.shape };
      for (const i in t) {
        if (!(i in n.shape))
          throw new Error(`Unrecognized key: "${i}"`);
        t[i] && delete o[i];
      }
      return P(this, "shape", o), o;
    },
    checks: []
  });
  return N(e, r);
}
function Zt(e, t) {
  if (!F(t))
    throw new Error("Invalid input to extend: expected a plain object");
  const n = e._zod.def.checks;
  if (n && n.length > 0)
    throw new Error("Object schemas containing refinements cannot be extended. Use `.safeExtend()` instead.");
  const o = D(e._zod.def, {
    get shape() {
      const i = { ...e._zod.def.shape, ...t };
      return P(this, "shape", i), i;
    },
    checks: []
  });
  return N(e, o);
}
function yt(e, t) {
  if (!F(t))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const n = {
    ...e._zod.def,
    get shape() {
      const r = { ...e._zod.def.shape, ...t };
      return P(this, "shape", r), r;
    },
    checks: e._zod.def.checks
  };
  return N(e, n);
}
function Et(e, t) {
  const n = D(e._zod.def, {
    get shape() {
      const r = { ...e._zod.def.shape, ...t._zod.def.shape };
      return P(this, "shape", r), r;
    },
    get catchall() {
      return t._zod.def.catchall;
    },
    checks: []
    // delete existing checks
  });
  return N(e, n);
}
function It(e, t, n) {
  const r = D(t._zod.def, {
    get shape() {
      const o = t._zod.def.shape, i = { ...o };
      if (n)
        for (const c in n) {
          if (!(c in o))
            throw new Error(`Unrecognized key: "${c}"`);
          n[c] && (i[c] = e ? new e({
            type: "optional",
            innerType: o[c]
          }) : o[c]);
        }
      else
        for (const c in o)
          i[c] = e ? new e({
            type: "optional",
            innerType: o[c]
          }) : o[c];
      return P(this, "shape", i), i;
    },
    checks: []
  });
  return N(t, r);
}
function St(e, t, n) {
  const r = D(t._zod.def, {
    get shape() {
      const o = t._zod.def.shape, i = { ...o };
      if (n)
        for (const c in n) {
          if (!(c in i))
            throw new Error(`Unrecognized key: "${c}"`);
          n[c] && (i[c] = new e({
            type: "nonoptional",
            innerType: o[c]
          }));
        }
      else
        for (const c in o)
          i[c] = new e({
            type: "nonoptional",
            innerType: o[c]
          });
      return P(this, "shape", i), i;
    },
    checks: []
  });
  return N(t, r);
}
function C(e, t = 0) {
  if (e.aborted === !0)
    return !0;
  for (let n = t; n < e.issues.length; n++)
    if (e.issues[n]?.continue !== !0)
      return !0;
  return !1;
}
function R(e, t) {
  return t.map((n) => {
    var r;
    return (r = n).path ?? (r.path = []), n.path.unshift(e), n;
  });
}
function G(e) {
  return typeof e == "string" ? e : e?.message;
}
function x(e, t, n) {
  const r = { ...e, path: e.path ?? [] };
  if (!e.message) {
    const o = G(e.inst?._zod.def?.error?.(e)) ?? G(t?.error?.(e)) ?? G(n.customError?.(e)) ?? G(n.localeError?.(e)) ?? "Invalid input";
    r.message = o;
  }
  return delete r.inst, delete r.continue, t?.reportInput || delete r.input, r;
}
function me(e) {
  return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function V(...e) {
  const [t, n, r] = e;
  return typeof t == "string" ? {
    message: t,
    code: "custom",
    input: n,
    inst: r
  } : { ...t };
}
const Je = (e, t) => {
  e.name = "$ZodError", Object.defineProperty(e, "_zod", {
    value: e._zod,
    enumerable: !1
  }), Object.defineProperty(e, "issues", {
    value: t,
    enumerable: !1
  }), e.message = JSON.stringify(t, ae, 2), Object.defineProperty(e, "toString", {
    value: () => e.message,
    enumerable: !1
  });
}, Ke = s("$ZodError", Je), Xe = s("$ZodError", Je, { Parent: Error });
function At(e, t = (n) => n.message) {
  const n = {}, r = [];
  for (const o of e.issues)
    o.path.length > 0 ? (n[o.path[0]] = n[o.path[0]] || [], n[o.path[0]].push(t(o))) : r.push(t(o));
  return { formErrors: r, fieldErrors: n };
}
function Tt(e, t = (n) => n.message) {
  const n = { _errors: [] }, r = (o) => {
    for (const i of o.issues)
      if (i.code === "invalid_union" && i.errors.length)
        i.errors.map((c) => r({ issues: c }));
      else if (i.code === "invalid_key")
        r({ issues: i.issues });
      else if (i.code === "invalid_element")
        r({ issues: i.issues });
      else if (i.path.length === 0)
        n._errors.push(t(i));
      else {
        let c = n, u = 0;
        for (; u < i.path.length; ) {
          const a = i.path[u];
          u === i.path.length - 1 ? (c[a] = c[a] || { _errors: [] }, c[a]._errors.push(t(i))) : c[a] = c[a] || { _errors: [] }, c = c[a], u++;
        }
      }
  };
  return r(e), n;
}
const ge = (e) => (t, n, r, o) => {
  const i = r ? Object.assign(r, { async: !1 }) : { async: !1 }, c = t._zod.run({ value: n, issues: [] }, i);
  if (c instanceof Promise)
    throw new j();
  if (c.issues.length) {
    const u = new (o?.Err ?? e)(c.issues.map((a) => x(a, i, T())));
    throw We(u, o?.callee), u;
  }
  return c.value;
}, _e = (e) => async (t, n, r, o) => {
  const i = r ? Object.assign(r, { async: !0 }) : { async: !0 };
  let c = t._zod.run({ value: n, issues: [] }, i);
  if (c instanceof Promise && (c = await c), c.issues.length) {
    const u = new (o?.Err ?? e)(c.issues.map((a) => x(a, i, T())));
    throw We(u, o?.callee), u;
  }
  return c.value;
}, ne = (e) => (t, n, r) => {
  const o = r ? { ...r, async: !1 } : { async: !1 }, i = t._zod.run({ value: n, issues: [] }, o);
  if (i instanceof Promise)
    throw new j();
  return i.issues.length ? {
    success: !1,
    error: new (e ?? Ke)(i.issues.map((c) => x(c, o, T())))
  } : { success: !0, data: i.value };
}, xt = /* @__PURE__ */ ne(Xe), re = (e) => async (t, n, r) => {
  const o = r ? Object.assign(r, { async: !0 }) : { async: !0 };
  let i = t._zod.run({ value: n, issues: [] }, o);
  return i instanceof Promise && (i = await i), i.issues.length ? {
    success: !1,
    error: new e(i.issues.map((c) => x(c, o, T())))
  } : { success: !0, data: i.value };
}, Ot = /* @__PURE__ */ re(Xe), Nt = (e) => (t, n, r) => {
  const o = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return ge(e)(t, n, o);
}, Pt = (e) => (t, n, r) => ge(e)(t, n, r), Dt = (e) => async (t, n, r) => {
  const o = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return _e(e)(t, n, o);
}, Ct = (e) => async (t, n, r) => _e(e)(t, n, r), Rt = (e) => (t, n, r) => {
  const o = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return ne(e)(t, n, o);
}, jt = (e) => (t, n, r) => ne(e)(t, n, r), Ft = (e) => async (t, n, r) => {
  const o = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return re(e)(t, n, o);
}, Ut = (e) => async (t, n, r) => re(e)(t, n, r), Mt = /^[cC][^\s-]{8,}$/, Lt = /^[0-9a-z]+$/, Vt = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, Bt = /^[0-9a-vA-V]{20}$/, Wt = /^[A-Za-z0-9]{27}$/, Gt = /^[a-zA-Z0-9_-]{21}$/, Jt = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Kt = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, Ze = (e) => e ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, Xt = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, Yt = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function Ht() {
  return new RegExp(Yt, "u");
}
const qt = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Qt = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, en = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, tn = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, nn = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, Ye = /^[A-Za-z0-9_-]*$/, rn = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/, on = /^\+(?:[0-9]){6,14}[0-9]$/, He = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", cn = /* @__PURE__ */ new RegExp(`^${He}$`);
function qe(e) {
  const t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function sn(e) {
  return new RegExp(`^${qe(e)}$`);
}
function un(e) {
  const t = qe({ precision: e.precision }), n = ["Z"];
  e.local && n.push(""), e.offset && n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const r = `${t}(?:${n.join("|")})`;
  return new RegExp(`^${He}T(?:${r})$`);
}
const an = (e) => {
  const t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${t}$`);
}, ln = /^-?\d+$/, dn = /^-?\d+(?:\.\d+)?/, pn = /^(?:true|false)$/i, fn = /^[^A-Z]*$/, hn = /^[^a-z]*$/, $ = /* @__PURE__ */ s("$ZodCheck", (e, t) => {
  var n;
  e._zod ?? (e._zod = {}), e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), Qe = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, et = /* @__PURE__ */ s("$ZodCheckLessThan", (e, t) => {
  $.init(e, t);
  const n = Qe[typeof t.value];
  e._zod.onattach.push((r) => {
    const o = r._zod.bag, i = (t.inclusive ? o.maximum : o.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    t.value < i && (t.inclusive ? o.maximum = t.value : o.exclusiveMaximum = t.value);
  }), e._zod.check = (r) => {
    (t.inclusive ? r.value <= t.value : r.value < t.value) || r.issues.push({
      origin: n,
      code: "too_big",
      maximum: t.value,
      input: r.value,
      inclusive: t.inclusive,
      inst: e,
      continue: !t.abort
    });
  };
}), tt = /* @__PURE__ */ s("$ZodCheckGreaterThan", (e, t) => {
  $.init(e, t);
  const n = Qe[typeof t.value];
  e._zod.onattach.push((r) => {
    const o = r._zod.bag, i = (t.inclusive ? o.minimum : o.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    t.value > i && (t.inclusive ? o.minimum = t.value : o.exclusiveMinimum = t.value);
  }), e._zod.check = (r) => {
    (t.inclusive ? r.value >= t.value : r.value > t.value) || r.issues.push({
      origin: n,
      code: "too_small",
      minimum: t.value,
      input: r.value,
      inclusive: t.inclusive,
      inst: e,
      continue: !t.abort
    });
  };
}), mn = /* @__PURE__ */ s("$ZodCheckMultipleOf", (e, t) => {
  $.init(e, t), e._zod.onattach.push((n) => {
    var r;
    (r = n._zod.bag).multipleOf ?? (r.multipleOf = t.value);
  }), e._zod.check = (n) => {
    if (typeof n.value != typeof t.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof n.value == "bigint" ? n.value % t.value === BigInt(0) : _t(n.value, t.value) === 0) || n.issues.push({
      origin: typeof n.value,
      code: "not_multiple_of",
      divisor: t.value,
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), gn = /* @__PURE__ */ s("$ZodCheckNumberFormat", (e, t) => {
  $.init(e, t), t.format = t.format || "float64";
  const n = t.format?.includes("int"), r = n ? "int" : "number", [o, i] = zt[t.format];
  e._zod.onattach.push((c) => {
    const u = c._zod.bag;
    u.format = t.format, u.minimum = o, u.maximum = i, n && (u.pattern = ln);
  }), e._zod.check = (c) => {
    const u = c.value;
    if (n) {
      if (!Number.isInteger(u)) {
        c.issues.push({
          expected: r,
          format: t.format,
          code: "invalid_type",
          continue: !1,
          input: u,
          inst: e
        });
        return;
      }
      if (!Number.isSafeInteger(u)) {
        u > 0 ? c.issues.push({
          input: u,
          code: "too_big",
          maximum: Number.MAX_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: e,
          origin: r,
          continue: !t.abort
        }) : c.issues.push({
          input: u,
          code: "too_small",
          minimum: Number.MIN_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: e,
          origin: r,
          continue: !t.abort
        });
        return;
      }
    }
    u < o && c.issues.push({
      origin: "number",
      input: u,
      code: "too_small",
      minimum: o,
      inclusive: !0,
      inst: e,
      continue: !t.abort
    }), u > i && c.issues.push({
      origin: "number",
      input: u,
      code: "too_big",
      maximum: i,
      inst: e
    });
  };
}), _n = /* @__PURE__ */ s("$ZodCheckMaxLength", (e, t) => {
  var n;
  $.init(e, t), (n = e._zod.def).when ?? (n.when = (r) => {
    const o = r.value;
    return !fe(o) && o.length !== void 0;
  }), e._zod.onattach.push((r) => {
    const o = r._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    t.maximum < o && (r._zod.bag.maximum = t.maximum);
  }), e._zod.check = (r) => {
    const o = r.value;
    if (o.length <= t.maximum)
      return;
    const c = me(o);
    r.issues.push({
      origin: c,
      code: "too_big",
      maximum: t.maximum,
      inclusive: !0,
      input: o,
      inst: e,
      continue: !t.abort
    });
  };
}), vn = /* @__PURE__ */ s("$ZodCheckMinLength", (e, t) => {
  var n;
  $.init(e, t), (n = e._zod.def).when ?? (n.when = (r) => {
    const o = r.value;
    return !fe(o) && o.length !== void 0;
  }), e._zod.onattach.push((r) => {
    const o = r._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    t.minimum > o && (r._zod.bag.minimum = t.minimum);
  }), e._zod.check = (r) => {
    const o = r.value;
    if (o.length >= t.minimum)
      return;
    const c = me(o);
    r.issues.push({
      origin: c,
      code: "too_small",
      minimum: t.minimum,
      inclusive: !0,
      input: o,
      inst: e,
      continue: !t.abort
    });
  };
}), bn = /* @__PURE__ */ s("$ZodCheckLengthEquals", (e, t) => {
  var n;
  $.init(e, t), (n = e._zod.def).when ?? (n.when = (r) => {
    const o = r.value;
    return !fe(o) && o.length !== void 0;
  }), e._zod.onattach.push((r) => {
    const o = r._zod.bag;
    o.minimum = t.length, o.maximum = t.length, o.length = t.length;
  }), e._zod.check = (r) => {
    const o = r.value, i = o.length;
    if (i === t.length)
      return;
    const c = me(o), u = i > t.length;
    r.issues.push({
      origin: c,
      ...u ? { code: "too_big", maximum: t.length } : { code: "too_small", minimum: t.length },
      inclusive: !0,
      exact: !0,
      input: r.value,
      inst: e,
      continue: !t.abort
    });
  };
}), oe = /* @__PURE__ */ s("$ZodCheckStringFormat", (e, t) => {
  var n, r;
  $.init(e, t), e._zod.onattach.push((o) => {
    const i = o._zod.bag;
    i.format = t.format, t.pattern && (i.patterns ?? (i.patterns = /* @__PURE__ */ new Set()), i.patterns.add(t.pattern));
  }), t.pattern ? (n = e._zod).check ?? (n.check = (o) => {
    t.pattern.lastIndex = 0, !t.pattern.test(o.value) && o.issues.push({
      origin: "string",
      code: "invalid_format",
      format: t.format,
      input: o.value,
      ...t.pattern ? { pattern: t.pattern.toString() } : {},
      inst: e,
      continue: !t.abort
    });
  }) : (r = e._zod).check ?? (r.check = () => {
  });
}), wn = /* @__PURE__ */ s("$ZodCheckRegex", (e, t) => {
  oe.init(e, t), e._zod.check = (n) => {
    t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: n.value,
      pattern: t.pattern.toString(),
      inst: e,
      continue: !t.abort
    });
  };
}), zn = /* @__PURE__ */ s("$ZodCheckLowerCase", (e, t) => {
  t.pattern ?? (t.pattern = fn), oe.init(e, t);
}), kn = /* @__PURE__ */ s("$ZodCheckUpperCase", (e, t) => {
  t.pattern ?? (t.pattern = hn), oe.init(e, t);
}), $n = /* @__PURE__ */ s("$ZodCheckIncludes", (e, t) => {
  $.init(e, t);
  const n = U(t.includes), r = new RegExp(typeof t.position == "number" ? `^.{${t.position}}${n}` : n);
  t.pattern = r, e._zod.onattach.push((o) => {
    const i = o._zod.bag;
    i.patterns ?? (i.patterns = /* @__PURE__ */ new Set()), i.patterns.add(r);
  }), e._zod.check = (o) => {
    o.value.includes(t.includes, t.position) || o.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: t.includes,
      input: o.value,
      inst: e,
      continue: !t.abort
    });
  };
}), Zn = /* @__PURE__ */ s("$ZodCheckStartsWith", (e, t) => {
  $.init(e, t);
  const n = new RegExp(`^${U(t.prefix)}.*`);
  t.pattern ?? (t.pattern = n), e._zod.onattach.push((r) => {
    const o = r._zod.bag;
    o.patterns ?? (o.patterns = /* @__PURE__ */ new Set()), o.patterns.add(n);
  }), e._zod.check = (r) => {
    r.value.startsWith(t.prefix) || r.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: t.prefix,
      input: r.value,
      inst: e,
      continue: !t.abort
    });
  };
}), yn = /* @__PURE__ */ s("$ZodCheckEndsWith", (e, t) => {
  $.init(e, t);
  const n = new RegExp(`.*${U(t.suffix)}$`);
  t.pattern ?? (t.pattern = n), e._zod.onattach.push((r) => {
    const o = r._zod.bag;
    o.patterns ?? (o.patterns = /* @__PURE__ */ new Set()), o.patterns.add(n);
  }), e._zod.check = (r) => {
    r.value.endsWith(t.suffix) || r.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: t.suffix,
      input: r.value,
      inst: e,
      continue: !t.abort
    });
  };
}), En = /* @__PURE__ */ s("$ZodCheckOverwrite", (e, t) => {
  $.init(e, t), e._zod.check = (n) => {
    n.value = t.tx(n.value);
  };
});
class In {
  constructor(t = []) {
    this.content = [], this.indent = 0, this && (this.args = t);
  }
  indented(t) {
    this.indent += 1, t(this), this.indent -= 1;
  }
  write(t) {
    if (typeof t == "function") {
      t(this, { execution: "sync" }), t(this, { execution: "async" });
      return;
    }
    const r = t.split(`
`).filter((c) => c), o = Math.min(...r.map((c) => c.length - c.trimStart().length)), i = r.map((c) => c.slice(o)).map((c) => " ".repeat(this.indent * 2) + c);
    for (const c of i)
      this.content.push(c);
  }
  compile() {
    const t = Function, n = this?.args, o = [...(this?.content ?? [""]).map((i) => `  ${i}`)];
    return new t(...n, o.join(`
`));
  }
}
const Sn = {
  major: 4,
  minor: 1,
  patch: 12
}, g = /* @__PURE__ */ s("$ZodType", (e, t) => {
  var n;
  e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = Sn;
  const r = [...e._zod.def.checks ?? []];
  e._zod.traits.has("$ZodCheck") && r.unshift(e);
  for (const o of r)
    for (const i of o._zod.onattach)
      i(e);
  if (r.length === 0)
    (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
      e._zod.run = e._zod.parse;
    });
  else {
    const o = (c, u, a) => {
      let d = C(c), f;
      for (const k of u) {
        if (k._zod.def.when) {
          if (!k._zod.def.when(c))
            continue;
        } else if (d)
          continue;
        const v = c.issues.length, z = k._zod.check(c);
        if (z instanceof Promise && a?.async === !1)
          throw new j();
        if (f || z instanceof Promise)
          f = (f ?? Promise.resolve()).then(async () => {
            await z, c.issues.length !== v && (d || (d = C(c, v)));
          });
        else {
          if (c.issues.length === v)
            continue;
          d || (d = C(c, v));
        }
      }
      return f ? f.then(() => c) : c;
    }, i = (c, u, a) => {
      if (C(c))
        return c.aborted = !0, c;
      const d = o(u, r, a);
      if (d instanceof Promise) {
        if (a.async === !1)
          throw new j();
        return d.then((f) => e._zod.parse(f, a));
      }
      return e._zod.parse(d, a);
    };
    e._zod.run = (c, u) => {
      if (u.skipChecks)
        return e._zod.parse(c, u);
      if (u.direction === "backward") {
        const d = e._zod.parse({ value: c.value, issues: [] }, { ...u, skipChecks: !0 });
        return d instanceof Promise ? d.then((f) => i(f, c, u)) : i(d, c, u);
      }
      const a = e._zod.parse(c, u);
      if (a instanceof Promise) {
        if (u.async === !1)
          throw new j();
        return a.then((d) => o(d, r, u));
      }
      return o(a, r, u);
    };
  }
  e["~standard"] = {
    validate: (o) => {
      try {
        const i = xt(e, o);
        return i.success ? { value: i.data } : { issues: i.error?.issues };
      } catch {
        return Ot(e, o).then((c) => c.success ? { value: c.data } : { issues: c.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  };
}), ve = /* @__PURE__ */ s("$ZodString", (e, t) => {
  g.init(e, t), e._zod.pattern = [...e?._zod.bag?.patterns ?? []].pop() ?? an(e._zod.bag), e._zod.parse = (n, r) => {
    if (t.coerce)
      try {
        n.value = String(n.value);
      } catch {
      }
    return typeof n.value == "string" || n.issues.push({
      expected: "string",
      code: "invalid_type",
      input: n.value,
      inst: e
    }), n;
  };
}), m = /* @__PURE__ */ s("$ZodStringFormat", (e, t) => {
  oe.init(e, t), ve.init(e, t);
}), An = /* @__PURE__ */ s("$ZodGUID", (e, t) => {
  t.pattern ?? (t.pattern = Kt), m.init(e, t);
}), Tn = /* @__PURE__ */ s("$ZodUUID", (e, t) => {
  if (t.version) {
    const r = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    }[t.version];
    if (r === void 0)
      throw new Error(`Invalid UUID version: "${t.version}"`);
    t.pattern ?? (t.pattern = Ze(r));
  } else
    t.pattern ?? (t.pattern = Ze());
  m.init(e, t);
}), xn = /* @__PURE__ */ s("$ZodEmail", (e, t) => {
  t.pattern ?? (t.pattern = Xt), m.init(e, t);
}), On = /* @__PURE__ */ s("$ZodURL", (e, t) => {
  m.init(e, t), e._zod.check = (n) => {
    try {
      const r = n.value.trim(), o = new URL(r);
      t.hostname && (t.hostname.lastIndex = 0, t.hostname.test(o.hostname) || n.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid hostname",
        pattern: rn.source,
        input: n.value,
        inst: e,
        continue: !t.abort
      })), t.protocol && (t.protocol.lastIndex = 0, t.protocol.test(o.protocol.endsWith(":") ? o.protocol.slice(0, -1) : o.protocol) || n.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid protocol",
        pattern: t.protocol.source,
        input: n.value,
        inst: e,
        continue: !t.abort
      })), t.normalize ? n.value = o.href : n.value = r;
      return;
    } catch {
      n.issues.push({
        code: "invalid_format",
        format: "url",
        input: n.value,
        inst: e,
        continue: !t.abort
      });
    }
  };
}), Nn = /* @__PURE__ */ s("$ZodEmoji", (e, t) => {
  t.pattern ?? (t.pattern = Ht()), m.init(e, t);
}), Pn = /* @__PURE__ */ s("$ZodNanoID", (e, t) => {
  t.pattern ?? (t.pattern = Gt), m.init(e, t);
}), Dn = /* @__PURE__ */ s("$ZodCUID", (e, t) => {
  t.pattern ?? (t.pattern = Mt), m.init(e, t);
}), Cn = /* @__PURE__ */ s("$ZodCUID2", (e, t) => {
  t.pattern ?? (t.pattern = Lt), m.init(e, t);
}), Rn = /* @__PURE__ */ s("$ZodULID", (e, t) => {
  t.pattern ?? (t.pattern = Vt), m.init(e, t);
}), jn = /* @__PURE__ */ s("$ZodXID", (e, t) => {
  t.pattern ?? (t.pattern = Bt), m.init(e, t);
}), Fn = /* @__PURE__ */ s("$ZodKSUID", (e, t) => {
  t.pattern ?? (t.pattern = Wt), m.init(e, t);
}), Un = /* @__PURE__ */ s("$ZodISODateTime", (e, t) => {
  t.pattern ?? (t.pattern = un(t)), m.init(e, t);
}), Mn = /* @__PURE__ */ s("$ZodISODate", (e, t) => {
  t.pattern ?? (t.pattern = cn), m.init(e, t);
}), Ln = /* @__PURE__ */ s("$ZodISOTime", (e, t) => {
  t.pattern ?? (t.pattern = sn(t)), m.init(e, t);
}), Vn = /* @__PURE__ */ s("$ZodISODuration", (e, t) => {
  t.pattern ?? (t.pattern = Jt), m.init(e, t);
}), Bn = /* @__PURE__ */ s("$ZodIPv4", (e, t) => {
  t.pattern ?? (t.pattern = qt), m.init(e, t), e._zod.onattach.push((n) => {
    const r = n._zod.bag;
    r.format = "ipv4";
  });
}), Wn = /* @__PURE__ */ s("$ZodIPv6", (e, t) => {
  t.pattern ?? (t.pattern = Qt), m.init(e, t), e._zod.onattach.push((n) => {
    const r = n._zod.bag;
    r.format = "ipv6";
  }), e._zod.check = (n) => {
    try {
      new URL(`http://[${n.value}]`);
    } catch {
      n.issues.push({
        code: "invalid_format",
        format: "ipv6",
        input: n.value,
        inst: e,
        continue: !t.abort
      });
    }
  };
}), Gn = /* @__PURE__ */ s("$ZodCIDRv4", (e, t) => {
  t.pattern ?? (t.pattern = en), m.init(e, t);
}), Jn = /* @__PURE__ */ s("$ZodCIDRv6", (e, t) => {
  t.pattern ?? (t.pattern = tn), m.init(e, t), e._zod.check = (n) => {
    const r = n.value.split("/");
    try {
      if (r.length !== 2)
        throw new Error();
      const [o, i] = r;
      if (!i)
        throw new Error();
      const c = Number(i);
      if (`${c}` !== i)
        throw new Error();
      if (c < 0 || c > 128)
        throw new Error();
      new URL(`http://[${o}]`);
    } catch {
      n.issues.push({
        code: "invalid_format",
        format: "cidrv6",
        input: n.value,
        inst: e,
        continue: !t.abort
      });
    }
  };
});
function nt(e) {
  if (e === "")
    return !0;
  if (e.length % 4 !== 0)
    return !1;
  try {
    return atob(e), !0;
  } catch {
    return !1;
  }
}
const Kn = /* @__PURE__ */ s("$ZodBase64", (e, t) => {
  t.pattern ?? (t.pattern = nn), m.init(e, t), e._zod.onattach.push((n) => {
    n._zod.bag.contentEncoding = "base64";
  }), e._zod.check = (n) => {
    nt(n.value) || n.issues.push({
      code: "invalid_format",
      format: "base64",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
});
function Xn(e) {
  if (!Ye.test(e))
    return !1;
  const t = e.replace(/[-_]/g, (r) => r === "-" ? "+" : "/"), n = t.padEnd(Math.ceil(t.length / 4) * 4, "=");
  return nt(n);
}
const Yn = /* @__PURE__ */ s("$ZodBase64URL", (e, t) => {
  t.pattern ?? (t.pattern = Ye), m.init(e, t), e._zod.onattach.push((n) => {
    n._zod.bag.contentEncoding = "base64url";
  }), e._zod.check = (n) => {
    Xn(n.value) || n.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), Hn = /* @__PURE__ */ s("$ZodE164", (e, t) => {
  t.pattern ?? (t.pattern = on), m.init(e, t);
});
function qn(e, t = null) {
  try {
    const n = e.split(".");
    if (n.length !== 3)
      return !1;
    const [r] = n;
    if (!r)
      return !1;
    const o = JSON.parse(atob(r));
    return !("typ" in o && o?.typ !== "JWT" || !o.alg || t && (!("alg" in o) || o.alg !== t));
  } catch {
    return !1;
  }
}
const Qn = /* @__PURE__ */ s("$ZodJWT", (e, t) => {
  m.init(e, t), e._zod.check = (n) => {
    qn(n.value, t.alg) || n.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), rt = /* @__PURE__ */ s("$ZodNumber", (e, t) => {
  g.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? dn, e._zod.parse = (n, r) => {
    if (t.coerce)
      try {
        n.value = Number(n.value);
      } catch {
      }
    const o = n.value;
    if (typeof o == "number" && !Number.isNaN(o) && Number.isFinite(o))
      return n;
    const i = typeof o == "number" ? Number.isNaN(o) ? "NaN" : Number.isFinite(o) ? void 0 : "Infinity" : void 0;
    return n.issues.push({
      expected: "number",
      code: "invalid_type",
      input: o,
      inst: e,
      ...i ? { received: i } : {}
    }), n;
  };
}), er = /* @__PURE__ */ s("$ZodNumber", (e, t) => {
  gn.init(e, t), rt.init(e, t);
}), tr = /* @__PURE__ */ s("$ZodBoolean", (e, t) => {
  g.init(e, t), e._zod.pattern = pn, e._zod.parse = (n, r) => {
    if (t.coerce)
      try {
        n.value = !!n.value;
      } catch {
      }
    const o = n.value;
    return typeof o == "boolean" || n.issues.push({
      expected: "boolean",
      code: "invalid_type",
      input: o,
      inst: e
    }), n;
  };
}), nr = /* @__PURE__ */ s("$ZodUnknown", (e, t) => {
  g.init(e, t), e._zod.parse = (n) => n;
}), rr = /* @__PURE__ */ s("$ZodNever", (e, t) => {
  g.init(e, t), e._zod.parse = (n, r) => (n.issues.push({
    expected: "never",
    code: "invalid_type",
    input: n.value,
    inst: e
  }), n);
});
function ye(e, t, n) {
  e.issues.length && t.issues.push(...R(n, e.issues)), t.value[n] = e.value;
}
const or = /* @__PURE__ */ s("$ZodArray", (e, t) => {
  g.init(e, t), e._zod.parse = (n, r) => {
    const o = n.value;
    if (!Array.isArray(o))
      return n.issues.push({
        expected: "array",
        code: "invalid_type",
        input: o,
        inst: e
      }), n;
    n.value = Array(o.length);
    const i = [];
    for (let c = 0; c < o.length; c++) {
      const u = o[c], a = t.element._zod.run({
        value: u,
        issues: []
      }, r);
      a instanceof Promise ? i.push(a.then((d) => ye(d, n, c))) : ye(a, n, c);
    }
    return i.length ? Promise.all(i).then(() => n) : n;
  };
});
function H(e, t, n, r) {
  e.issues.length && t.issues.push(...R(n, e.issues)), e.value === void 0 ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
}
function ot(e) {
  const t = Object.keys(e.shape);
  for (const r of t)
    if (!e.shape?.[r]?._zod?.traits?.has("$ZodType"))
      throw new Error(`Invalid element at key "${r}": expected a Zod schema`);
  const n = wt(e.shape);
  return {
    ...e,
    keys: t,
    keySet: new Set(t),
    numKeys: t.length,
    optionalKeys: new Set(n)
  };
}
function it(e, t, n, r, o, i) {
  const c = [], u = o.keySet, a = o.catchall._zod, d = a.def.type;
  for (const f of Object.keys(t)) {
    if (u.has(f))
      continue;
    if (d === "never") {
      c.push(f);
      continue;
    }
    const k = a.run({ value: t[f], issues: [] }, r);
    k instanceof Promise ? e.push(k.then((v) => H(v, n, f, t))) : H(k, n, f, t);
  }
  return c.length && n.issues.push({
    code: "unrecognized_keys",
    keys: c,
    input: t,
    inst: i
  }), e.length ? Promise.all(e).then(() => n) : n;
}
const ir = /* @__PURE__ */ s("$ZodObject", (e, t) => {
  if (g.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get) {
    const u = t.shape;
    Object.defineProperty(t, "shape", {
      get: () => {
        const a = { ...u };
        return Object.defineProperty(t, "shape", {
          value: a
        }), a;
      }
    });
  }
  const r = pe(() => ot(t));
  h(e._zod, "propValues", () => {
    const u = t.shape, a = {};
    for (const d in u) {
      const f = u[d]._zod;
      if (f.values) {
        a[d] ?? (a[d] = /* @__PURE__ */ new Set());
        for (const k of f.values)
          a[d].add(k);
      }
    }
    return a;
  });
  const o = Y, i = t.catchall;
  let c;
  e._zod.parse = (u, a) => {
    c ?? (c = r.value);
    const d = u.value;
    if (!o(d))
      return u.issues.push({
        expected: "object",
        code: "invalid_type",
        input: d,
        inst: e
      }), u;
    u.value = {};
    const f = [], k = c.shape;
    for (const v of c.keys) {
      const Z = k[v]._zod.run({ value: d[v], issues: [] }, a);
      Z instanceof Promise ? f.push(Z.then((ce) => H(ce, u, v, d))) : H(Z, u, v, d);
    }
    return i ? it(f, d, u, a, r.value, e) : f.length ? Promise.all(f).then(() => u) : u;
  };
}), cr = /* @__PURE__ */ s("$ZodObjectJIT", (e, t) => {
  ir.init(e, t);
  const n = e._zod.parse, r = pe(() => ot(t)), o = (v) => {
    const z = new In(["shape", "payload", "ctx"]), Z = r.value, ce = (A) => {
      const I = $e(A);
      return `shape[${I}]._zod.run({ value: input[${I}], issues: [] }, ctx)`;
    };
    z.write("const input = payload.value;");
    const ze = /* @__PURE__ */ Object.create(null);
    let ht = 0;
    for (const A of Z.keys)
      ze[A] = `key_${ht++}`;
    z.write("const newResult = {};");
    for (const A of Z.keys) {
      const I = ze[A], L = $e(A);
      z.write(`const ${I} = ${ce(A)};`), z.write(`
        if (${I}.issues.length) {
          payload.issues = payload.issues.concat(${I}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${L}, ...iss.path] : [${L}]
          })));
        }
        
        
        if (${I}.value === undefined) {
          if (${L} in input) {
            newResult[${L}] = undefined;
          }
        } else {
          newResult[${L}] = ${I}.value;
        }
        
      `);
    }
    z.write("payload.value = newResult;"), z.write("return payload;");
    const mt = z.compile();
    return (A, I) => mt(v, A, I);
  };
  let i;
  const c = Y, u = !Be.jitless, d = u && vt.value, f = t.catchall;
  let k;
  e._zod.parse = (v, z) => {
    k ?? (k = r.value);
    const Z = v.value;
    return c(Z) ? u && d && z?.async === !1 && z.jitless !== !0 ? (i || (i = o(t.shape)), v = i(v, z), f ? it([], Z, v, z, k, e) : v) : n(v, z) : (v.issues.push({
      expected: "object",
      code: "invalid_type",
      input: Z,
      inst: e
    }), v);
  };
});
function Ee(e, t, n, r) {
  for (const i of e)
    if (i.issues.length === 0)
      return t.value = i.value, t;
  const o = e.filter((i) => !C(i));
  return o.length === 1 ? (t.value = o[0].value, o[0]) : (t.issues.push({
    code: "invalid_union",
    input: t.value,
    inst: n,
    errors: e.map((i) => i.issues.map((c) => x(c, r, T())))
  }), t);
}
const sr = /* @__PURE__ */ s("$ZodUnion", (e, t) => {
  g.init(e, t), h(e._zod, "optin", () => t.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0), h(e._zod, "optout", () => t.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0), h(e._zod, "values", () => {
    if (t.options.every((o) => o._zod.values))
      return new Set(t.options.flatMap((o) => Array.from(o._zod.values)));
  }), h(e._zod, "pattern", () => {
    if (t.options.every((o) => o._zod.pattern)) {
      const o = t.options.map((i) => i._zod.pattern);
      return new RegExp(`^(${o.map((i) => he(i.source)).join("|")})$`);
    }
  });
  const n = t.options.length === 1, r = t.options[0]._zod.run;
  e._zod.parse = (o, i) => {
    if (n)
      return r(o, i);
    let c = !1;
    const u = [];
    for (const a of t.options) {
      const d = a._zod.run({
        value: o.value,
        issues: []
      }, i);
      if (d instanceof Promise)
        u.push(d), c = !0;
      else {
        if (d.issues.length === 0)
          return d;
        u.push(d);
      }
    }
    return c ? Promise.all(u).then((a) => Ee(a, o, e, i)) : Ee(u, o, e, i);
  };
}), ur = /* @__PURE__ */ s("$ZodIntersection", (e, t) => {
  g.init(e, t), e._zod.parse = (n, r) => {
    const o = n.value, i = t.left._zod.run({ value: o, issues: [] }, r), c = t.right._zod.run({ value: o, issues: [] }, r);
    return i instanceof Promise || c instanceof Promise ? Promise.all([i, c]).then(([a, d]) => Ie(n, a, d)) : Ie(n, i, c);
  };
});
function le(e, t) {
  if (e === t)
    return { valid: !0, data: e };
  if (e instanceof Date && t instanceof Date && +e == +t)
    return { valid: !0, data: e };
  if (F(e) && F(t)) {
    const n = Object.keys(t), r = Object.keys(e).filter((i) => n.indexOf(i) !== -1), o = { ...e, ...t };
    for (const i of r) {
      const c = le(e[i], t[i]);
      if (!c.valid)
        return {
          valid: !1,
          mergeErrorPath: [i, ...c.mergeErrorPath]
        };
      o[i] = c.data;
    }
    return { valid: !0, data: o };
  }
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length)
      return { valid: !1, mergeErrorPath: [] };
    const n = [];
    for (let r = 0; r < e.length; r++) {
      const o = e[r], i = t[r], c = le(o, i);
      if (!c.valid)
        return {
          valid: !1,
          mergeErrorPath: [r, ...c.mergeErrorPath]
        };
      n.push(c.data);
    }
    return { valid: !0, data: n };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function Ie(e, t, n) {
  if (t.issues.length && e.issues.push(...t.issues), n.issues.length && e.issues.push(...n.issues), C(e))
    return e;
  const r = le(t.value, n.value);
  if (!r.valid)
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(r.mergeErrorPath)}`);
  return e.value = r.data, e;
}
const ar = /* @__PURE__ */ s("$ZodRecord", (e, t) => {
  g.init(e, t), e._zod.parse = (n, r) => {
    const o = n.value;
    if (!F(o))
      return n.issues.push({
        expected: "record",
        code: "invalid_type",
        input: o,
        inst: e
      }), n;
    const i = [];
    if (t.keyType._zod.values) {
      const c = t.keyType._zod.values;
      n.value = {};
      for (const a of c)
        if (typeof a == "string" || typeof a == "number" || typeof a == "symbol") {
          const d = t.valueType._zod.run({ value: o[a], issues: [] }, r);
          d instanceof Promise ? i.push(d.then((f) => {
            f.issues.length && n.issues.push(...R(a, f.issues)), n.value[a] = f.value;
          })) : (d.issues.length && n.issues.push(...R(a, d.issues)), n.value[a] = d.value);
        }
      let u;
      for (const a in o)
        c.has(a) || (u = u ?? [], u.push(a));
      u && u.length > 0 && n.issues.push({
        code: "unrecognized_keys",
        input: o,
        inst: e,
        keys: u
      });
    } else {
      n.value = {};
      for (const c of Reflect.ownKeys(o)) {
        if (c === "__proto__")
          continue;
        const u = t.keyType._zod.run({ value: c, issues: [] }, r);
        if (u instanceof Promise)
          throw new Error("Async schemas not supported in object keys currently");
        if (u.issues.length) {
          n.issues.push({
            code: "invalid_key",
            origin: "record",
            issues: u.issues.map((d) => x(d, r, T())),
            input: c,
            path: [c],
            inst: e
          }), n.value[u.value] = u.value;
          continue;
        }
        const a = t.valueType._zod.run({ value: o[c], issues: [] }, r);
        a instanceof Promise ? i.push(a.then((d) => {
          d.issues.length && n.issues.push(...R(c, d.issues)), n.value[u.value] = d.value;
        })) : (a.issues.length && n.issues.push(...R(c, a.issues)), n.value[u.value] = a.value);
      }
    }
    return i.length ? Promise.all(i).then(() => n) : n;
  };
}), lr = /* @__PURE__ */ s("$ZodEnum", (e, t) => {
  g.init(e, t);
  const n = gt(t.entries), r = new Set(n);
  e._zod.values = r, e._zod.pattern = new RegExp(`^(${n.filter((o) => bt.has(typeof o)).map((o) => typeof o == "string" ? U(o) : o.toString()).join("|")})$`), e._zod.parse = (o, i) => {
    const c = o.value;
    return r.has(c) || o.issues.push({
      code: "invalid_value",
      values: n,
      input: c,
      inst: e
    }), o;
  };
}), dr = /* @__PURE__ */ s("$ZodLiteral", (e, t) => {
  if (g.init(e, t), t.values.length === 0)
    throw new Error("Cannot create literal schema with no valid values");
  e._zod.values = new Set(t.values), e._zod.pattern = new RegExp(`^(${t.values.map((n) => typeof n == "string" ? U(n) : n ? U(n.toString()) : String(n)).join("|")})$`), e._zod.parse = (n, r) => {
    const o = n.value;
    return e._zod.values.has(o) || n.issues.push({
      code: "invalid_value",
      values: t.values,
      input: o,
      inst: e
    }), n;
  };
}), pr = /* @__PURE__ */ s("$ZodTransform", (e, t) => {
  g.init(e, t), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      throw new Ve(e.constructor.name);
    const o = t.transform(n.value, n);
    if (r.async)
      return (o instanceof Promise ? o : Promise.resolve(o)).then((c) => (n.value = c, n));
    if (o instanceof Promise)
      throw new j();
    return n.value = o, n;
  };
});
function Se(e, t) {
  return e.issues.length && t === void 0 ? { issues: [], value: void 0 } : e;
}
const fr = /* @__PURE__ */ s("$ZodOptional", (e, t) => {
  g.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", h(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, void 0]) : void 0), h(e._zod, "pattern", () => {
    const n = t.innerType._zod.pattern;
    return n ? new RegExp(`^(${he(n.source)})?$`) : void 0;
  }), e._zod.parse = (n, r) => {
    if (t.innerType._zod.optin === "optional") {
      const o = t.innerType._zod.run(n, r);
      return o instanceof Promise ? o.then((i) => Se(i, n.value)) : Se(o, n.value);
    }
    return n.value === void 0 ? n : t.innerType._zod.run(n, r);
  };
}), hr = /* @__PURE__ */ s("$ZodNullable", (e, t) => {
  g.init(e, t), h(e._zod, "optin", () => t.innerType._zod.optin), h(e._zod, "optout", () => t.innerType._zod.optout), h(e._zod, "pattern", () => {
    const n = t.innerType._zod.pattern;
    return n ? new RegExp(`^(${he(n.source)}|null)$`) : void 0;
  }), h(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, null]) : void 0), e._zod.parse = (n, r) => n.value === null ? n : t.innerType._zod.run(n, r);
}), mr = /* @__PURE__ */ s("$ZodDefault", (e, t) => {
  g.init(e, t), e._zod.optin = "optional", h(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return t.innerType._zod.run(n, r);
    if (n.value === void 0)
      return n.value = t.defaultValue, n;
    const o = t.innerType._zod.run(n, r);
    return o instanceof Promise ? o.then((i) => Ae(i, t)) : Ae(o, t);
  };
});
function Ae(e, t) {
  return e.value === void 0 && (e.value = t.defaultValue), e;
}
const gr = /* @__PURE__ */ s("$ZodPrefault", (e, t) => {
  g.init(e, t), e._zod.optin = "optional", h(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (n, r) => (r.direction === "backward" || n.value === void 0 && (n.value = t.defaultValue), t.innerType._zod.run(n, r));
}), _r = /* @__PURE__ */ s("$ZodNonOptional", (e, t) => {
  g.init(e, t), h(e._zod, "values", () => {
    const n = t.innerType._zod.values;
    return n ? new Set([...n].filter((r) => r !== void 0)) : void 0;
  }), e._zod.parse = (n, r) => {
    const o = t.innerType._zod.run(n, r);
    return o instanceof Promise ? o.then((i) => Te(i, e)) : Te(o, e);
  };
});
function Te(e, t) {
  return !e.issues.length && e.value === void 0 && e.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: e.value,
    inst: t
  }), e;
}
const vr = /* @__PURE__ */ s("$ZodCatch", (e, t) => {
  g.init(e, t), h(e._zod, "optin", () => t.innerType._zod.optin), h(e._zod, "optout", () => t.innerType._zod.optout), h(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return t.innerType._zod.run(n, r);
    const o = t.innerType._zod.run(n, r);
    return o instanceof Promise ? o.then((i) => (n.value = i.value, i.issues.length && (n.value = t.catchValue({
      ...n,
      error: {
        issues: i.issues.map((c) => x(c, r, T()))
      },
      input: n.value
    }), n.issues = []), n)) : (n.value = o.value, o.issues.length && (n.value = t.catchValue({
      ...n,
      error: {
        issues: o.issues.map((i) => x(i, r, T()))
      },
      input: n.value
    }), n.issues = []), n);
  };
}), br = /* @__PURE__ */ s("$ZodPipe", (e, t) => {
  g.init(e, t), h(e._zod, "values", () => t.in._zod.values), h(e._zod, "optin", () => t.in._zod.optin), h(e._zod, "optout", () => t.out._zod.optout), h(e._zod, "propValues", () => t.in._zod.propValues), e._zod.parse = (n, r) => {
    if (r.direction === "backward") {
      const i = t.out._zod.run(n, r);
      return i instanceof Promise ? i.then((c) => J(c, t.in, r)) : J(i, t.in, r);
    }
    const o = t.in._zod.run(n, r);
    return o instanceof Promise ? o.then((i) => J(i, t.out, r)) : J(o, t.out, r);
  };
});
function J(e, t, n) {
  return e.issues.length ? (e.aborted = !0, e) : t._zod.run({ value: e.value, issues: e.issues }, n);
}
const wr = /* @__PURE__ */ s("$ZodReadonly", (e, t) => {
  g.init(e, t), h(e._zod, "propValues", () => t.innerType._zod.propValues), h(e._zod, "values", () => t.innerType._zod.values), h(e._zod, "optin", () => t.innerType._zod.optin), h(e._zod, "optout", () => t.innerType._zod.optout), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return t.innerType._zod.run(n, r);
    const o = t.innerType._zod.run(n, r);
    return o instanceof Promise ? o.then(xe) : xe(o);
  };
});
function xe(e) {
  return e.value = Object.freeze(e.value), e;
}
const zr = /* @__PURE__ */ s("$ZodCustom", (e, t) => {
  $.init(e, t), g.init(e, t), e._zod.parse = (n, r) => n, e._zod.check = (n) => {
    const r = n.value, o = t.fn(r);
    if (o instanceof Promise)
      return o.then((i) => Oe(i, n, r, e));
    Oe(o, n, r, e);
  };
});
function Oe(e, t, n, r) {
  if (!e) {
    const o = {
      code: "custom",
      input: n,
      inst: r,
      // incorporates params.error into issue reporting
      path: [...r._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !r._zod.def.abort
      // params: inst._zod.def.params,
    };
    r._zod.def.params && (o.params = r._zod.def.params), t.issues.push(V(o));
  }
}
class kr {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
  }
  add(t, ...n) {
    const r = n[0];
    if (this._map.set(t, r), r && typeof r == "object" && "id" in r) {
      if (this._idmap.has(r.id))
        throw new Error(`ID ${r.id} already exists in the registry`);
      this._idmap.set(r.id, t);
    }
    return this;
  }
  clear() {
    return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
  }
  remove(t) {
    const n = this._map.get(t);
    return n && typeof n == "object" && "id" in n && this._idmap.delete(n.id), this._map.delete(t), this;
  }
  get(t) {
    const n = t._zod.parent;
    if (n) {
      const r = { ...this.get(n) ?? {} };
      delete r.id;
      const o = { ...r, ...this._map.get(t) };
      return Object.keys(o).length ? o : void 0;
    }
    return this._map.get(t);
  }
  has(t) {
    return this._map.has(t);
  }
}
function $r() {
  return new kr();
}
const K = /* @__PURE__ */ $r();
function Zr(e, t) {
  return new e({
    type: "string",
    ...p(t)
  });
}
function yr(e, t) {
  return new e({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...p(t)
  });
}
function Ne(e, t) {
  return new e({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...p(t)
  });
}
function Er(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...p(t)
  });
}
function Ir(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...p(t)
  });
}
function Sr(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...p(t)
  });
}
function Ar(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...p(t)
  });
}
function Tr(e, t) {
  return new e({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...p(t)
  });
}
function xr(e, t) {
  return new e({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...p(t)
  });
}
function Or(e, t) {
  return new e({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...p(t)
  });
}
function Nr(e, t) {
  return new e({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...p(t)
  });
}
function Pr(e, t) {
  return new e({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...p(t)
  });
}
function Dr(e, t) {
  return new e({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...p(t)
  });
}
function Cr(e, t) {
  return new e({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...p(t)
  });
}
function Rr(e, t) {
  return new e({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...p(t)
  });
}
function jr(e, t) {
  return new e({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...p(t)
  });
}
function Fr(e, t) {
  return new e({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...p(t)
  });
}
function Ur(e, t) {
  return new e({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...p(t)
  });
}
function Mr(e, t) {
  return new e({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...p(t)
  });
}
function Lr(e, t) {
  return new e({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...p(t)
  });
}
function Vr(e, t) {
  return new e({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...p(t)
  });
}
function Br(e, t) {
  return new e({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...p(t)
  });
}
function Wr(e, t) {
  return new e({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...p(t)
  });
}
function Gr(e, t) {
  return new e({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...p(t)
  });
}
function Jr(e, t) {
  return new e({
    type: "string",
    format: "date",
    check: "string_format",
    ...p(t)
  });
}
function Kr(e, t) {
  return new e({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...p(t)
  });
}
function Xr(e, t) {
  return new e({
    type: "string",
    format: "duration",
    check: "string_format",
    ...p(t)
  });
}
function Yr(e, t) {
  return new e({
    type: "number",
    checks: [],
    ...p(t)
  });
}
function Hr(e, t) {
  return new e({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...p(t)
  });
}
function qr(e, t) {
  return new e({
    type: "boolean",
    ...p(t)
  });
}
function Qr(e) {
  return new e({
    type: "unknown"
  });
}
function eo(e, t) {
  return new e({
    type: "never",
    ...p(t)
  });
}
function Pe(e, t) {
  return new et({
    check: "less_than",
    ...p(t),
    value: e,
    inclusive: !1
  });
}
function se(e, t) {
  return new et({
    check: "less_than",
    ...p(t),
    value: e,
    inclusive: !0
  });
}
function De(e, t) {
  return new tt({
    check: "greater_than",
    ...p(t),
    value: e,
    inclusive: !1
  });
}
function ue(e, t) {
  return new tt({
    check: "greater_than",
    ...p(t),
    value: e,
    inclusive: !0
  });
}
function Ce(e, t) {
  return new mn({
    check: "multiple_of",
    ...p(t),
    value: e
  });
}
function ct(e, t) {
  return new _n({
    check: "max_length",
    ...p(t),
    maximum: e
  });
}
function q(e, t) {
  return new vn({
    check: "min_length",
    ...p(t),
    minimum: e
  });
}
function st(e, t) {
  return new bn({
    check: "length_equals",
    ...p(t),
    length: e
  });
}
function to(e, t) {
  return new wn({
    check: "string_format",
    format: "regex",
    ...p(t),
    pattern: e
  });
}
function no(e) {
  return new zn({
    check: "string_format",
    format: "lowercase",
    ...p(e)
  });
}
function ro(e) {
  return new kn({
    check: "string_format",
    format: "uppercase",
    ...p(e)
  });
}
function oo(e, t) {
  return new $n({
    check: "string_format",
    format: "includes",
    ...p(t),
    includes: e
  });
}
function io(e, t) {
  return new Zn({
    check: "string_format",
    format: "starts_with",
    ...p(t),
    prefix: e
  });
}
function co(e, t) {
  return new yn({
    check: "string_format",
    format: "ends_with",
    ...p(t),
    suffix: e
  });
}
function W(e) {
  return new En({
    check: "overwrite",
    tx: e
  });
}
function so(e) {
  return W((t) => t.normalize(e));
}
function uo() {
  return W((e) => e.trim());
}
function ao() {
  return W((e) => e.toLowerCase());
}
function lo() {
  return W((e) => e.toUpperCase());
}
function po(e, t, n) {
  return new e({
    type: "array",
    element: t,
    // get element() {
    //   return element;
    // },
    ...p(n)
  });
}
function fo(e, t, n) {
  return new e({
    type: "custom",
    check: "custom",
    fn: t,
    ...p(n)
  });
}
function ho(e) {
  const t = mo((n) => (n.addIssue = (r) => {
    if (typeof r == "string")
      n.issues.push(V(r, n.value, t._zod.def));
    else {
      const o = r;
      o.fatal && (o.continue = !1), o.code ?? (o.code = "custom"), o.input ?? (o.input = n.value), o.inst ?? (o.inst = t), o.continue ?? (o.continue = !t._zod.def.abort), n.issues.push(V(o));
    }
  }, e(n.value, n)));
  return t;
}
function mo(e, t) {
  const n = new $({
    check: "custom",
    ...p(t)
  });
  return n._zod.check = e, n;
}
const go = /* @__PURE__ */ s("ZodISODateTime", (e, t) => {
  Un.init(e, t), _.init(e, t);
});
function _o(e) {
  return Gr(go, e);
}
const vo = /* @__PURE__ */ s("ZodISODate", (e, t) => {
  Mn.init(e, t), _.init(e, t);
});
function bo(e) {
  return Jr(vo, e);
}
const wo = /* @__PURE__ */ s("ZodISOTime", (e, t) => {
  Ln.init(e, t), _.init(e, t);
});
function zo(e) {
  return Kr(wo, e);
}
const ko = /* @__PURE__ */ s("ZodISODuration", (e, t) => {
  Vn.init(e, t), _.init(e, t);
});
function $o(e) {
  return Xr(ko, e);
}
const Zo = (e, t) => {
  Ke.init(e, t), e.name = "ZodError", Object.defineProperties(e, {
    format: {
      value: (n) => Tt(e, n)
      // enumerable: false,
    },
    flatten: {
      value: (n) => At(e, n)
      // enumerable: false,
    },
    addIssue: {
      value: (n) => {
        e.issues.push(n), e.message = JSON.stringify(e.issues, ae, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (n) => {
        e.issues.push(...n), e.message = JSON.stringify(e.issues, ae, 2);
      }
      // enumerable: false,
    },
    isEmpty: {
      get() {
        return e.issues.length === 0;
      }
      // enumerable: false,
    }
  });
}, E = s("ZodError", Zo, {
  Parent: Error
}), yo = /* @__PURE__ */ ge(E), Eo = /* @__PURE__ */ _e(E), Io = /* @__PURE__ */ ne(E), So = /* @__PURE__ */ re(E), Ao = /* @__PURE__ */ Nt(E), To = /* @__PURE__ */ Pt(E), xo = /* @__PURE__ */ Dt(E), Oo = /* @__PURE__ */ Ct(E), No = /* @__PURE__ */ Rt(E), Po = /* @__PURE__ */ jt(E), Do = /* @__PURE__ */ Ft(E), Co = /* @__PURE__ */ Ut(E), b = /* @__PURE__ */ s("ZodType", (e, t) => (g.init(e, t), e.def = t, e.type = t.type, Object.defineProperty(e, "_def", { value: t }), e.check = (...n) => e.clone(D(t, {
  checks: [
    ...t.checks ?? [],
    ...n.map((r) => typeof r == "function" ? { _zod: { check: r, def: { check: "custom" }, onattach: [] } } : r)
  ]
})), e.clone = (n, r) => N(e, n, r), e.brand = () => e, e.register = (n, r) => (n.add(e, r), e), e.parse = (n, r) => yo(e, n, r, { callee: e.parse }), e.safeParse = (n, r) => Io(e, n, r), e.parseAsync = async (n, r) => Eo(e, n, r, { callee: e.parseAsync }), e.safeParseAsync = async (n, r) => So(e, n, r), e.spa = e.safeParseAsync, e.encode = (n, r) => Ao(e, n, r), e.decode = (n, r) => To(e, n, r), e.encodeAsync = async (n, r) => xo(e, n, r), e.decodeAsync = async (n, r) => Oo(e, n, r), e.safeEncode = (n, r) => No(e, n, r), e.safeDecode = (n, r) => Po(e, n, r), e.safeEncodeAsync = async (n, r) => Do(e, n, r), e.safeDecodeAsync = async (n, r) => Co(e, n, r), e.refine = (n, r) => e.check(Ai(n, r)), e.superRefine = (n) => e.check(Ti(n)), e.overwrite = (n) => e.check(W(n)), e.optional = () => Ue(e), e.nullable = () => Me(e), e.nullish = () => Ue(Me(e)), e.nonoptional = (n) => ki(e, n), e.array = () => be(e), e.or = (n) => S([e, n]), e.and = (n) => di(e, n), e.transform = (n) => Le(e, gi(n)), e.default = (n) => bi(e, n), e.prefault = (n) => zi(e, n), e.catch = (n) => Zi(e, n), e.pipe = (n) => Le(e, n), e.readonly = () => Ii(e), e.describe = (n) => {
  const r = e.clone();
  return K.add(r, { description: n }), r;
}, Object.defineProperty(e, "description", {
  get() {
    return K.get(e)?.description;
  },
  configurable: !0
}), e.meta = (...n) => {
  if (n.length === 0)
    return K.get(e);
  const r = e.clone();
  return K.add(r, n[0]), r;
}, e.isOptional = () => e.safeParse(void 0).success, e.isNullable = () => e.safeParse(null).success, e)), ut = /* @__PURE__ */ s("_ZodString", (e, t) => {
  ve.init(e, t), b.init(e, t);
  const n = e._zod.bag;
  e.format = n.format ?? null, e.minLength = n.minimum ?? null, e.maxLength = n.maximum ?? null, e.regex = (...r) => e.check(to(...r)), e.includes = (...r) => e.check(oo(...r)), e.startsWith = (...r) => e.check(io(...r)), e.endsWith = (...r) => e.check(co(...r)), e.min = (...r) => e.check(q(...r)), e.max = (...r) => e.check(ct(...r)), e.length = (...r) => e.check(st(...r)), e.nonempty = (...r) => e.check(q(1, ...r)), e.lowercase = (r) => e.check(no(r)), e.uppercase = (r) => e.check(ro(r)), e.trim = () => e.check(uo()), e.normalize = (...r) => e.check(so(...r)), e.toLowerCase = () => e.check(ao()), e.toUpperCase = () => e.check(lo());
}), Ro = /* @__PURE__ */ s("ZodString", (e, t) => {
  ve.init(e, t), ut.init(e, t), e.email = (n) => e.check(yr(jo, n)), e.url = (n) => e.check(Tr(Fo, n)), e.jwt = (n) => e.check(Wr(ei, n)), e.emoji = (n) => e.check(xr(Uo, n)), e.guid = (n) => e.check(Ne(Re, n)), e.uuid = (n) => e.check(Er(X, n)), e.uuidv4 = (n) => e.check(Ir(X, n)), e.uuidv6 = (n) => e.check(Sr(X, n)), e.uuidv7 = (n) => e.check(Ar(X, n)), e.nanoid = (n) => e.check(Or(Mo, n)), e.guid = (n) => e.check(Ne(Re, n)), e.cuid = (n) => e.check(Nr(Lo, n)), e.cuid2 = (n) => e.check(Pr(Vo, n)), e.ulid = (n) => e.check(Dr(Bo, n)), e.base64 = (n) => e.check(Lr(Ho, n)), e.base64url = (n) => e.check(Vr(qo, n)), e.xid = (n) => e.check(Cr(Wo, n)), e.ksuid = (n) => e.check(Rr(Go, n)), e.ipv4 = (n) => e.check(jr(Jo, n)), e.ipv6 = (n) => e.check(Fr(Ko, n)), e.cidrv4 = (n) => e.check(Ur(Xo, n)), e.cidrv6 = (n) => e.check(Mr(Yo, n)), e.e164 = (n) => e.check(Br(Qo, n)), e.datetime = (n) => e.check(_o(n)), e.date = (n) => e.check(bo(n)), e.time = (n) => e.check(zo(n)), e.duration = (n) => e.check($o(n));
});
function w(e) {
  return Zr(Ro, e);
}
const _ = /* @__PURE__ */ s("ZodStringFormat", (e, t) => {
  m.init(e, t), ut.init(e, t);
}), jo = /* @__PURE__ */ s("ZodEmail", (e, t) => {
  xn.init(e, t), _.init(e, t);
}), Re = /* @__PURE__ */ s("ZodGUID", (e, t) => {
  An.init(e, t), _.init(e, t);
}), X = /* @__PURE__ */ s("ZodUUID", (e, t) => {
  Tn.init(e, t), _.init(e, t);
}), Fo = /* @__PURE__ */ s("ZodURL", (e, t) => {
  On.init(e, t), _.init(e, t);
}), Uo = /* @__PURE__ */ s("ZodEmoji", (e, t) => {
  Nn.init(e, t), _.init(e, t);
}), Mo = /* @__PURE__ */ s("ZodNanoID", (e, t) => {
  Pn.init(e, t), _.init(e, t);
}), Lo = /* @__PURE__ */ s("ZodCUID", (e, t) => {
  Dn.init(e, t), _.init(e, t);
}), Vo = /* @__PURE__ */ s("ZodCUID2", (e, t) => {
  Cn.init(e, t), _.init(e, t);
}), Bo = /* @__PURE__ */ s("ZodULID", (e, t) => {
  Rn.init(e, t), _.init(e, t);
}), Wo = /* @__PURE__ */ s("ZodXID", (e, t) => {
  jn.init(e, t), _.init(e, t);
}), Go = /* @__PURE__ */ s("ZodKSUID", (e, t) => {
  Fn.init(e, t), _.init(e, t);
}), Jo = /* @__PURE__ */ s("ZodIPv4", (e, t) => {
  Bn.init(e, t), _.init(e, t);
}), Ko = /* @__PURE__ */ s("ZodIPv6", (e, t) => {
  Wn.init(e, t), _.init(e, t);
}), Xo = /* @__PURE__ */ s("ZodCIDRv4", (e, t) => {
  Gn.init(e, t), _.init(e, t);
}), Yo = /* @__PURE__ */ s("ZodCIDRv6", (e, t) => {
  Jn.init(e, t), _.init(e, t);
}), Ho = /* @__PURE__ */ s("ZodBase64", (e, t) => {
  Kn.init(e, t), _.init(e, t);
}), qo = /* @__PURE__ */ s("ZodBase64URL", (e, t) => {
  Yn.init(e, t), _.init(e, t);
}), Qo = /* @__PURE__ */ s("ZodE164", (e, t) => {
  Hn.init(e, t), _.init(e, t);
}), ei = /* @__PURE__ */ s("ZodJWT", (e, t) => {
  Qn.init(e, t), _.init(e, t);
}), at = /* @__PURE__ */ s("ZodNumber", (e, t) => {
  rt.init(e, t), b.init(e, t), e.gt = (r, o) => e.check(De(r, o)), e.gte = (r, o) => e.check(ue(r, o)), e.min = (r, o) => e.check(ue(r, o)), e.lt = (r, o) => e.check(Pe(r, o)), e.lte = (r, o) => e.check(se(r, o)), e.max = (r, o) => e.check(se(r, o)), e.int = (r) => e.check(je(r)), e.safe = (r) => e.check(je(r)), e.positive = (r) => e.check(De(0, r)), e.nonnegative = (r) => e.check(ue(0, r)), e.negative = (r) => e.check(Pe(0, r)), e.nonpositive = (r) => e.check(se(0, r)), e.multipleOf = (r, o) => e.check(Ce(r, o)), e.step = (r, o) => e.check(Ce(r, o)), e.finite = () => e;
  const n = e._zod.bag;
  e.minValue = Math.max(n.minimum ?? Number.NEGATIVE_INFINITY, n.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null, e.maxValue = Math.min(n.maximum ?? Number.POSITIVE_INFINITY, n.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null, e.isInt = (n.format ?? "").includes("int") || Number.isSafeInteger(n.multipleOf ?? 0.5), e.isFinite = !0, e.format = n.format ?? null;
});
function Q(e) {
  return Yr(at, e);
}
const ti = /* @__PURE__ */ s("ZodNumberFormat", (e, t) => {
  er.init(e, t), at.init(e, t);
});
function je(e) {
  return Hr(ti, e);
}
const ni = /* @__PURE__ */ s("ZodBoolean", (e, t) => {
  tr.init(e, t), b.init(e, t);
});
function ri(e) {
  return qr(ni, e);
}
const oi = /* @__PURE__ */ s("ZodUnknown", (e, t) => {
  nr.init(e, t), b.init(e, t);
});
function Fe() {
  return Qr(oi);
}
const ii = /* @__PURE__ */ s("ZodNever", (e, t) => {
  rr.init(e, t), b.init(e, t);
});
function ci(e) {
  return eo(ii, e);
}
const si = /* @__PURE__ */ s("ZodArray", (e, t) => {
  or.init(e, t), b.init(e, t), e.element = t.element, e.min = (n, r) => e.check(q(n, r)), e.nonempty = (n) => e.check(q(1, n)), e.max = (n, r) => e.check(ct(n, r)), e.length = (n, r) => e.check(st(n, r)), e.unwrap = () => e.element;
});
function be(e, t) {
  return po(si, e, t);
}
const ui = /* @__PURE__ */ s("ZodObject", (e, t) => {
  cr.init(e, t), b.init(e, t), h(e, "shape", () => t.shape), e.keyof = () => fi(Object.keys(e._zod.def.shape)), e.catchall = (n) => e.clone({ ...e._zod.def, catchall: n }), e.passthrough = () => e.clone({ ...e._zod.def, catchall: Fe() }), e.loose = () => e.clone({ ...e._zod.def, catchall: Fe() }), e.strict = () => e.clone({ ...e._zod.def, catchall: ci() }), e.strip = () => e.clone({ ...e._zod.def, catchall: void 0 }), e.extend = (n) => Zt(e, n), e.safeExtend = (n) => yt(e, n), e.merge = (n) => Et(e, n), e.pick = (n) => kt(e, n), e.omit = (n) => $t(e, n), e.partial = (...n) => It(lt, e, n[0]), e.required = (...n) => St(dt, e, n[0]);
});
function ie(e, t) {
  const n = {
    type: "object",
    shape: e ?? {},
    ...p(t)
  };
  return new ui(n);
}
const ai = /* @__PURE__ */ s("ZodUnion", (e, t) => {
  sr.init(e, t), b.init(e, t), e.options = t.options;
});
function S(e, t) {
  return new ai({
    type: "union",
    options: e,
    ...p(t)
  });
}
const li = /* @__PURE__ */ s("ZodIntersection", (e, t) => {
  ur.init(e, t), b.init(e, t);
});
function di(e, t) {
  return new li({
    type: "intersection",
    left: e,
    right: t
  });
}
const pi = /* @__PURE__ */ s("ZodRecord", (e, t) => {
  ar.init(e, t), b.init(e, t), e.keyType = t.keyType, e.valueType = t.valueType;
});
function B(e, t, n) {
  return new pi({
    type: "record",
    keyType: e,
    valueType: t,
    ...p(n)
  });
}
const de = /* @__PURE__ */ s("ZodEnum", (e, t) => {
  lr.init(e, t), b.init(e, t), e.enum = t.entries, e.options = Object.values(t.entries);
  const n = new Set(Object.keys(t.entries));
  e.extract = (r, o) => {
    const i = {};
    for (const c of r)
      if (n.has(c))
        i[c] = t.entries[c];
      else
        throw new Error(`Key ${c} not found in enum`);
    return new de({
      ...t,
      checks: [],
      ...p(o),
      entries: i
    });
  }, e.exclude = (r, o) => {
    const i = { ...t.entries };
    for (const c of r)
      if (n.has(c))
        delete i[c];
      else
        throw new Error(`Key ${c} not found in enum`);
    return new de({
      ...t,
      checks: [],
      ...p(o),
      entries: i
    });
  };
});
function fi(e, t) {
  const n = Array.isArray(e) ? Object.fromEntries(e.map((r) => [r, r])) : e;
  return new de({
    type: "enum",
    entries: n,
    ...p(t)
  });
}
const hi = /* @__PURE__ */ s("ZodLiteral", (e, t) => {
  dr.init(e, t), b.init(e, t), e.values = new Set(t.values), Object.defineProperty(e, "value", {
    get() {
      if (t.values.length > 1)
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      return t.values[0];
    }
  });
});
function l(e, t) {
  return new hi({
    type: "literal",
    values: Array.isArray(e) ? e : [e],
    ...p(t)
  });
}
const mi = /* @__PURE__ */ s("ZodTransform", (e, t) => {
  pr.init(e, t), b.init(e, t), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      throw new Ve(e.constructor.name);
    n.addIssue = (i) => {
      if (typeof i == "string")
        n.issues.push(V(i, n.value, t));
      else {
        const c = i;
        c.fatal && (c.continue = !1), c.code ?? (c.code = "custom"), c.input ?? (c.input = n.value), c.inst ?? (c.inst = e), n.issues.push(V(c));
      }
    };
    const o = t.transform(n.value, n);
    return o instanceof Promise ? o.then((i) => (n.value = i, n)) : (n.value = o, n);
  };
});
function gi(e) {
  return new mi({
    type: "transform",
    transform: e
  });
}
const lt = /* @__PURE__ */ s("ZodOptional", (e, t) => {
  fr.init(e, t), b.init(e, t), e.unwrap = () => e._zod.def.innerType;
});
function Ue(e) {
  return new lt({
    type: "optional",
    innerType: e
  });
}
const _i = /* @__PURE__ */ s("ZodNullable", (e, t) => {
  hr.init(e, t), b.init(e, t), e.unwrap = () => e._zod.def.innerType;
});
function Me(e) {
  return new _i({
    type: "nullable",
    innerType: e
  });
}
const vi = /* @__PURE__ */ s("ZodDefault", (e, t) => {
  mr.init(e, t), b.init(e, t), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function bi(e, t) {
  return new vi({
    type: "default",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : Ge(t);
    }
  });
}
const wi = /* @__PURE__ */ s("ZodPrefault", (e, t) => {
  gr.init(e, t), b.init(e, t), e.unwrap = () => e._zod.def.innerType;
});
function zi(e, t) {
  return new wi({
    type: "prefault",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : Ge(t);
    }
  });
}
const dt = /* @__PURE__ */ s("ZodNonOptional", (e, t) => {
  _r.init(e, t), b.init(e, t), e.unwrap = () => e._zod.def.innerType;
});
function ki(e, t) {
  return new dt({
    type: "nonoptional",
    innerType: e,
    ...p(t)
  });
}
const $i = /* @__PURE__ */ s("ZodCatch", (e, t) => {
  vr.init(e, t), b.init(e, t), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function Zi(e, t) {
  return new $i({
    type: "catch",
    innerType: e,
    catchValue: typeof t == "function" ? t : () => t
  });
}
const yi = /* @__PURE__ */ s("ZodPipe", (e, t) => {
  br.init(e, t), b.init(e, t), e.in = t.in, e.out = t.out;
});
function Le(e, t) {
  return new yi({
    type: "pipe",
    in: e,
    out: t
    // ...util.normalizeParams(params),
  });
}
const Ei = /* @__PURE__ */ s("ZodReadonly", (e, t) => {
  wr.init(e, t), b.init(e, t), e.unwrap = () => e._zod.def.innerType;
});
function Ii(e) {
  return new Ei({
    type: "readonly",
    innerType: e
  });
}
const Si = /* @__PURE__ */ s("ZodCustom", (e, t) => {
  zr.init(e, t), b.init(e, t);
});
function Ai(e, t = {}) {
  return fo(Si, e, t);
}
function Ti(e) {
  return ho(e);
}
const xi = S([l("amber"), l("green"), l("red"), l("other")]), Oi = S([
  l("alpha"),
  l("beta"),
  l("generalAvailability"),
  l("notApplicable"),
  l("preAlpha"),
  l("proposed"),
  l("releaseCandidate"),
  l("unavailable"),
  l("underReview")
]), Ni = S([
  l("app"),
  l("connector"),
  l("connectorConnection"),
  l("context"),
  l("contextModelGroup"),
  l("contextModel"),
  l("contextModelDimensionGroup"),
  l("contextModelDimension"),
  l("contextModelDimensionHierarchy"),
  l("contextModelEntityGroup"),
  l("contextModelEntity"),
  l("contextModelEntityDataItem"),
  l("contextModelEntityEvent"),
  l("contextModelEntityPrimaryMeasure"),
  l("contextModelSecondaryMeasureGroup"),
  l("contextModelSecondaryMeasure"),
  l("dataView"),
  l("dimension"),
  l("engine"),
  l("eventQuery"),
  l("presenter"),
  l("presenterPresentation"),
  l("tool")
]), Pi = S([l("en-au"), l("en-gb"), l("en-us"), l("es-es")]), Di = B(Pi, w()), Ci = ie({
  id: w(),
  color: xi,
  label: w()
}), Ri = ie({
  id: w(),
  label: B(w(), w()),
  description: B(w(), w()),
  firstCreatedAt: Q().optional(),
  icon: w().optional(),
  iconDark: w().optional(),
  lastUpdatedAt: Q().optional(),
  status: Ci.nullable().optional(),
  statusId: Oi,
  typeId: Ni
}), ji = S([l("app"), l("engine"), l("connector"), l("context"), l("presenter"), l("tool")]), Fi = ie({
  id: w(),
  label: w()
}), Ui = ie({
  activeConnectionCount: Q().optional(),
  canDescribe: ri().optional(),
  id: w().optional(),
  authMethodId: S([l("apiKey"), l("disabled"), l("oAuth2"), l("none")]),
  label: Di.optional(),
  maxConnectionCount: Q().optional(),
  params: be(B(w(), w())).optional()
}), Mi = S([l("application"), l("curatedDataset"), l("database"), l("fileStore")]), Li = S([
  l("abortOperation"),
  l("authenticateConnection"),
  l("createObject"),
  l("describeConnection"),
  l("dropObject"),
  l("findObject"),
  l("getRecord"),
  l("listNodes"),
  l("previewObject"),
  l("removeRecords"),
  l("retrieveRecords"),
  l("upsertRecords")
]), Vi = S([l("bidirectional"), l("destination"), l("source"), l("unknown")]), Bi = Ri.extend({
  typeId: ji,
  version: w()
}), qi = Bi.extend({
  category: Fi.optional(),
  categoryId: Mi,
  implementations: B(w(), Ui),
  operations: be(Li),
  typeId: l("connector"),
  usageId: Vi,
  vendorAccountURL: w().nullable().optional(),
  vendorDocumentationURL: w().nullable().optional(),
  vendorHomeURL: w().nullable().optional()
});
function Qi() {
  function e(t, n, r) {
    r.textContent = "Cytoscape.js diagram goes here...";
  }
  return { render: e };
}
function ec() {
  function e(t, n) {
    console.log(1111, t), console.log(2222, n), console.log(3333, n.childNodes), console.log(4444, n.children);
  }
  return { render: e };
}
const tc = 0, nc = (e) => e, rc = () => Date.now();
class we extends Error {
  locator;
  constructor(t, n, r) {
    super(t, r), this.name = "DataPosError", this.locator = n, Error.captureStackTrace?.(this, new.target);
  }
}
class M extends we {
  constructor(t, n, r) {
    super(t, n, r), this.name = "ApplicationError";
  }
}
class oc extends M {
  constructor(t, n, r) {
    super(t, n, r), this.name = "APIError";
  }
}
class ic extends M {
  constructor(t, n, r) {
    super(t, n, r), this.name = "EngineError";
  }
}
class pt extends M {
  body;
  constructor(t, n, r, o) {
    super(t, n, o), this.name = "FetchError", this.body = r;
  }
}
class Wi extends M {
  componentName;
  info;
  constructor(t, n, r, o, i) {
    super(t, n, i), this.name = "VueHandledError", this.info = r, this.componentName = o;
  }
}
class cc extends M {
  constructor(t, n, r) {
    super(t, n, r), this.name = "WindowHandledRuntimeError";
  }
}
class sc extends M {
  constructor(t, n, r) {
    super(t, n, r), this.name = "WindowHandledPromiseRejectionError";
  }
}
class uc extends we {
  constructor(t, n, r) {
    super(t, n, r), this.name = "OperationalError";
  }
}
async function ac(e, t, n) {
  const r = `${t} Response status '${e.status}${e.statusText ? ` - ${e.statusText}` : ""}' received.`, o = await e.text();
  return new pt(r, n, o);
}
function lc(e) {
  return e.map((t) => t.message).join(" ");
}
function dc(e, t = "Unknown error.") {
  if (e instanceof Error) return e;
  if (typeof e == "string") return new Error(e);
  try {
    return new Error(JSON.stringify(e ?? t));
  } catch {
    return new Error(t);
  }
}
function pc(e) {
  const t = /* @__PURE__ */ new Set(), n = [];
  let r = e;
  for (; r && !t.has(r); ) {
    t.add(r);
    let o;
    if (r instanceof pt)
      o = { body: r.body, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof Wi)
      o = { componentName: r.componentName, info: r.info, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof we)
      o = { locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof Error) {
      const i = r;
      o = { locator: "", message: i.message, name: i.name, stack: i.stack }, r = i.cause;
    } else r ? (o = { locator: "", message: String(r), name: "Error" }, r = void 0) : (o = { locator: "", message: "Unknown error.", name: "Error" }, r = void 0);
    /(?:\.{3}|[.!?])$/.test(o.message) || (o.message += "."), n.push(o);
  }
  return n;
}
const ft = "en-US", ee = {}, fc = (e) => {
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
}, hc = (e) => {
  if (e) {
    const t = e.lastIndexOf("/"), n = e.lastIndexOf(".", t > -1 ? t : e.length);
    return n > -1 ? e.substring(0, n) : e;
  }
}, mc = (e) => {
  if (e) {
    const t = e.lastIndexOf(".");
    if (t > -1) return e.substring(t + 1);
  }
}, y = (e, t = 2, n = t, r = ft) => {
  if (e == null) return "";
  const o = `${r}decimal${t}.${n}`;
  let i = ee[o];
  return i || (i = new Intl.NumberFormat(r, {
    localeMatcher: "best fit",
    maximumFractionDigits: t,
    minimumFractionDigits: n,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), ee[o] = i), i.format(e);
}, gc = (e) => e == null ? "" : e < 1e3 ? te(e) : e < 1e6 ? `${y(e / 1e3, 2, 0)}K` : e < 1e9 ? `${y(e / 1e6, 2, 0)}M` : e < 1e12 ? `${y(e / 1e9, 2, 0)}B` : `${y(e / 1e12, 2, 0)}T`, _c = (e) => e == null ? "" : e === 1 ? "1 byte" : e < 1024 ? `${te(e)} bytes` : e < 1048576 ? `${y(e / 1024, 2, 0)} KB` : e < 1073741824 ? `${y(e / 1048576, 2, 0)} MB` : e < 1099511627776 ? `${y(e / 1073741824, 2, 0)} GB` : `${y(e / 1099511627776, 2, 0)} TB`, vc = (e) => e == null ? "" : e < 1e3 ? `${te(e)} ms` : e === 1e3 ? `${te(e)} sec` : e < 6e4 ? `${y(e / 1e3, 2, 0)} secs` : e === 6e4 ? "1 min" : e < 36e5 ? `${y(e / 6e4, 2, 0)} mins` : e === 36e5 ? "1 hr" : e < 864e5 ? `${y(e / 36e5, 2, 0)} hrs` : e === 864e5 ? "1 day" : `${y(e / 864e5, 2, 0)} days`, te = (e, t = ft) => {
  if (e == null) return "";
  const n = `${t}decimal0.0`;
  let r = ee[n];
  return r || (r = new Intl.NumberFormat(t, {
    localeMatcher: "best fit",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), ee[n] = r), r.format(e);
}, bc = (e) => {
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
}, Gi = [
  { id: "dtv", label: { "en-gb": "Delimited Text" } },
  { id: "e/e", label: { "en-gb": "Entity/Event" } },
  { id: "jsonArray", label: { "en-gb": "JSON Array" } },
  { id: "spss", label: { "en-gb": "SPSS" } },
  { id: "xls", label: { "en-gb": "XLS" } },
  { id: "xlsx", label: { "en-gb": "XLSX" } },
  { id: "xml", label: { "en-gb": "XML" } }
], wc = (e = O) => {
  const t = [];
  for (const n of Gi) t.push({ ...n, label: n.label[e] || n.label[O] || n.id });
  return t;
}, Ji = [
  { id: `
`, label: { "en-gb": "Newline" } },
  { id: "\r", label: { "en-gb": "Carriage Return" } },
  { id: `\r
`, label: { "en-gb": "Carriage Return/Newline" } }
], zc = (e = O) => {
  const t = [];
  for (const n of Ji)
    t.push({ ...n, label: n.label[e] || n.label[O] || n.id });
  return t;
}, Ki = [
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
], kc = (e = O) => {
  const t = [];
  for (const n of Ki)
    t.push({ ...n, label: n.label[e] || n.label[O] || n.id });
  return t;
}, Xi = [
  { id: "alpha", color: "red", label: { "en-gb": "alpha" } },
  { id: "beta", color: "amber", label: { "en-gb": "beta" } },
  { id: "generalAvailability", color: "green", label: { "en-gb": "" } },
  { id: "notApplicable", color: "green", label: { "en-gb": "not-applicable" } },
  { id: "preAlpha", color: "red", label: { "en-gb": "pre-alpha" } },
  { id: "proposed", color: "other", label: { "en-gb": "proposed" } },
  { id: "releaseCandidate", color: "green", label: { "en-gb": "release-candidate" } },
  { id: "unavailable", color: "other", label: { "en-gb": "unavailable" } },
  { id: "underReview", color: "other", label: { "en-gb": "under-review" } }
], $c = (e, t = O) => {
  const n = Xi.find((r) => r.id === e);
  return n ? { ...n, label: n.label[t] || n.label[O] || e } : { id: e, color: "other", label: e };
}, O = "en-gb";
export {
  oc as APIError,
  M as ApplicationError,
  Yi as CONNECTOR_DESTINATION_OPERATIONS,
  Hi as CONNECTOR_SOURCE_OPERATIONS,
  O as DEFAULT_LOCALE_CODE,
  tc as DefaultTimestamp,
  ic as EngineError,
  pt as FetchError,
  uc as OperationalError,
  Wi as VueError,
  sc as WindowPromiseRejectionError,
  cc as WindowRuntimeError,
  ac as buildFetchError,
  lc as concatenateSerialisedErrorMessages,
  qi as connectorConfigSchema,
  nc as convertMillisecondsToTimestamp,
  fc as convertODataTypeIdToUsageTypeId,
  mc as extractExtensionFromPath,
  hc as extractNameFromPath,
  y as formatNumberAsDecimalNumber,
  vc as formatNumberAsDuration,
  gc as formatNumberAsSize,
  _c as formatNumberAsStorageSize,
  te as formatNumberAsWholeNumber,
  $c as getComponentStatus,
  rc as getCurrentTimestamp,
  wc as getDataFormats,
  zc as getRecordDelimiters,
  kc as getValueDelimiters,
  bc as lookupMimeTypeForExtension,
  dc as normalizeToError,
  pc as serialiseError,
  Qi as useCytoscapeJS,
  ec as useDataTable
};
