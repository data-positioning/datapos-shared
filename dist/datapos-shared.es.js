const _c = ["createObject", "dropObject", "removeRecords", "upsertRecords"], vc = ["findObject", "getRecord", "listNodes", "previewObject", "retrieveRecords"];
function a(e, t, n) {
  function r(u, l) {
    var d;
    Object.defineProperty(u, "_zod", {
      value: u._zod ?? {},
      enumerable: !1
    }), (d = u._zod).traits ?? (d.traits = /* @__PURE__ */ new Set()), u._zod.traits.add(e), t(u, l);
    for (const h in c.prototype)
      h in u || Object.defineProperty(u, h, { value: c.prototype[h].bind(u) });
    u._zod.constr = c, u._zod.def = l;
  }
  const o = n?.Parent ?? Object;
  class i extends o {
  }
  Object.defineProperty(i, "name", { value: e });
  function c(u) {
    var l;
    const d = n?.Parent ? new i() : this;
    r(d, u), (l = d._zod).deferred ?? (l.deferred = []);
    for (const h of d._zod.deferred)
      h();
    return d;
  }
  return Object.defineProperty(c, "init", { value: r }), Object.defineProperty(c, Symbol.hasInstance, {
    value: (u) => n?.Parent && u instanceof n.Parent ? !0 : u?._zod?.traits?.has(e)
  }), Object.defineProperty(c, "name", { value: e }), c;
}
class L extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class Be extends Error {
  constructor(t) {
    super(`Encountered unidirectional transform during encode: ${t}`), this.name = "ZodEncodeError";
  }
}
const We = {};
function C(e) {
  return We;
}
function bt(e) {
  const t = Object.values(e).filter((r) => typeof r == "number");
  return Object.entries(e).filter(([r, o]) => t.indexOf(+r) === -1).map(([r, o]) => o);
}
function le(e, t) {
  return typeof t == "bigint" ? t.toString() : t;
}
function fe(e) {
  return {
    get value() {
      {
        const t = e();
        return Object.defineProperty(this, "value", { value: t }), t;
      }
    }
  };
}
function he(e) {
  return e == null;
}
function me(e) {
  const t = e.startsWith("^") ? 1 : 0, n = e.endsWith("$") ? e.length - 1 : e.length;
  return e.slice(t, n);
}
function wt(e, t) {
  const n = (e.toString().split(".")[1] || "").length, r = t.toString();
  let o = (r.split(".")[1] || "").length;
  if (o === 0 && /\d?e-\d?/.test(r)) {
    const l = r.match(/\d?e-(\d?)/);
    l?.[1] && (o = Number.parseInt(l[1]));
  }
  const i = n > o ? n : o, c = Number.parseInt(e.toFixed(i).replace(".", "")), u = Number.parseInt(t.toFixed(i).replace(".", ""));
  return c % u / 10 ** i;
}
const ke = Symbol("evaluating");
function m(e, t, n) {
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
function j(e, t, n) {
  Object.defineProperty(e, t, {
    value: n,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function M(...e) {
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
const Je = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {
};
function Q(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
const zt = fe(() => {
  if (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))
    return !1;
  try {
    const e = Function;
    return new e(""), !0;
  } catch {
    return !1;
  }
});
function V(e) {
  if (Q(e) === !1)
    return !1;
  const t = e.constructor;
  if (t === void 0)
    return !0;
  const n = t.prototype;
  return !(Q(n) === !1 || Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") === !1);
}
function Ke(e) {
  return V(e) ? { ...e } : Array.isArray(e) ? [...e] : e;
}
const kt = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function G(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function R(e, t, n) {
  const r = new e._zod.constr(t ?? e._zod.def);
  return (!t || n?.parent) && (r._zod.parent = e), r;
}
function f(e) {
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
function $t(e) {
  return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
const yt = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function Zt(e, t) {
  const n = e._zod.def, r = M(e._zod.def, {
    get shape() {
      const o = {};
      for (const i in t) {
        if (!(i in n.shape))
          throw new Error(`Unrecognized key: "${i}"`);
        t[i] && (o[i] = n.shape[i]);
      }
      return j(this, "shape", o), o;
    },
    checks: []
  });
  return R(e, r);
}
function Et(e, t) {
  const n = e._zod.def, r = M(e._zod.def, {
    get shape() {
      const o = { ...e._zod.def.shape };
      for (const i in t) {
        if (!(i in n.shape))
          throw new Error(`Unrecognized key: "${i}"`);
        t[i] && delete o[i];
      }
      return j(this, "shape", o), o;
    },
    checks: []
  });
  return R(e, r);
}
function It(e, t) {
  if (!V(t))
    throw new Error("Invalid input to extend: expected a plain object");
  const n = e._zod.def.checks;
  if (n && n.length > 0)
    throw new Error("Object schemas containing refinements cannot be extended. Use `.safeExtend()` instead.");
  const o = M(e._zod.def, {
    get shape() {
      const i = { ...e._zod.def.shape, ...t };
      return j(this, "shape", i), i;
    },
    checks: []
  });
  return R(e, o);
}
function St(e, t) {
  if (!V(t))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const n = {
    ...e._zod.def,
    get shape() {
      const r = { ...e._zod.def.shape, ...t };
      return j(this, "shape", r), r;
    },
    checks: e._zod.def.checks
  };
  return R(e, n);
}
function xt(e, t) {
  const n = M(e._zod.def, {
    get shape() {
      const r = { ...e._zod.def.shape, ...t._zod.def.shape };
      return j(this, "shape", r), r;
    },
    get catchall() {
      return t._zod.def.catchall;
    },
    checks: []
    // delete existing checks
  });
  return R(e, n);
}
function At(e, t, n) {
  const r = M(t._zod.def, {
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
      return j(this, "shape", i), i;
    },
    checks: []
  });
  return R(t, r);
}
function Tt(e, t, n) {
  const r = M(t._zod.def, {
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
      return j(this, "shape", i), i;
    },
    checks: []
  });
  return R(t, r);
}
function F(e, t = 0) {
  if (e.aborted === !0)
    return !0;
  for (let n = t; n < e.issues.length; n++)
    if (e.issues[n]?.continue !== !0)
      return !0;
  return !1;
}
function U(e, t) {
  return t.map((n) => {
    var r;
    return (r = n).path ?? (r.path = []), n.path.unshift(e), n;
  });
}
function X(e) {
  return typeof e == "string" ? e : e?.message;
}
function N(e, t, n) {
  const r = { ...e, path: e.path ?? [] };
  if (!e.message) {
    const o = X(e.inst?._zod.def?.error?.(e)) ?? X(t?.error?.(e)) ?? X(n.customError?.(e)) ?? X(n.localeError?.(e)) ?? "Invalid input";
    r.message = o;
  }
  return delete r.inst, delete r.continue, t?.reportInput || delete r.input, r;
}
function ge(e) {
  return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function J(...e) {
  const [t, n, r] = e;
  return typeof t == "string" ? {
    message: t,
    code: "custom",
    input: n,
    inst: r
  } : { ...t };
}
const Xe = (e, t) => {
  e.name = "$ZodError", Object.defineProperty(e, "_zod", {
    value: e._zod,
    enumerable: !1
  }), Object.defineProperty(e, "issues", {
    value: t,
    enumerable: !1
  }), e.message = JSON.stringify(t, le, 2), Object.defineProperty(e, "toString", {
    value: () => e.message,
    enumerable: !1
  });
}, He = a("$ZodError", Xe), Ye = a("$ZodError", Xe, { Parent: Error });
function Ot(e, t = (n) => n.message) {
  const n = {}, r = [];
  for (const o of e.issues)
    o.path.length > 0 ? (n[o.path[0]] = n[o.path[0]] || [], n[o.path[0]].push(t(o))) : r.push(t(o));
  return { formErrors: r, fieldErrors: n };
}
function Ct(e, t = (n) => n.message) {
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
          const l = i.path[u];
          u === i.path.length - 1 ? (c[l] = c[l] || { _errors: [] }, c[l]._errors.push(t(i))) : c[l] = c[l] || { _errors: [] }, c = c[l], u++;
        }
      }
  };
  return r(e), n;
}
const _e = (e) => (t, n, r, o) => {
  const i = r ? Object.assign(r, { async: !1 }) : { async: !1 }, c = t._zod.run({ value: n, issues: [] }, i);
  if (c instanceof Promise)
    throw new L();
  if (c.issues.length) {
    const u = new (o?.Err ?? e)(c.issues.map((l) => N(l, i, C())));
    throw Je(u, o?.callee), u;
  }
  return c.value;
}, ve = (e) => async (t, n, r, o) => {
  const i = r ? Object.assign(r, { async: !0 }) : { async: !0 };
  let c = t._zod.run({ value: n, issues: [] }, i);
  if (c instanceof Promise && (c = await c), c.issues.length) {
    const u = new (o?.Err ?? e)(c.issues.map((l) => N(l, i, C())));
    throw Je(u, o?.callee), u;
  }
  return c.value;
}, oe = (e) => (t, n, r) => {
  const o = r ? { ...r, async: !1 } : { async: !1 }, i = t._zod.run({ value: n, issues: [] }, o);
  if (i instanceof Promise)
    throw new L();
  return i.issues.length ? {
    success: !1,
    error: new (e ?? He)(i.issues.map((c) => N(c, o, C())))
  } : { success: !0, data: i.value };
}, Nt = /* @__PURE__ */ oe(Ye), ie = (e) => async (t, n, r) => {
  const o = r ? Object.assign(r, { async: !0 }) : { async: !0 };
  let i = t._zod.run({ value: n, issues: [] }, o);
  return i instanceof Promise && (i = await i), i.issues.length ? {
    success: !1,
    error: new e(i.issues.map((c) => N(c, o, C())))
  } : { success: !0, data: i.value };
}, Dt = /* @__PURE__ */ ie(Ye), Pt = (e) => (t, n, r) => {
  const o = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return _e(e)(t, n, o);
}, Rt = (e) => (t, n, r) => _e(e)(t, n, r), jt = (e) => async (t, n, r) => {
  const o = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return ve(e)(t, n, o);
}, Mt = (e) => async (t, n, r) => ve(e)(t, n, r), Ft = (e) => (t, n, r) => {
  const o = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return oe(e)(t, n, o);
}, Ut = (e) => (t, n, r) => oe(e)(t, n, r), Lt = (e) => async (t, n, r) => {
  const o = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return ie(e)(t, n, o);
}, Vt = (e) => async (t, n, r) => ie(e)(t, n, r), Gt = /^[cC][^\s-]{8,}$/, Bt = /^[0-9a-z]+$/, Wt = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, Jt = /^[0-9a-vA-V]{20}$/, Kt = /^[A-Za-z0-9]{27}$/, Xt = /^[a-zA-Z0-9_-]{21}$/, Ht = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Yt = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, ye = (e) => e ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, qt = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, Qt = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function en() {
  return new RegExp(Qt, "u");
}
const tn = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, nn = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, rn = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, on = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, cn = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, qe = /^[A-Za-z0-9_-]*$/, sn = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/, an = /^\+(?:[0-9]){6,14}[0-9]$/, Qe = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", un = /* @__PURE__ */ new RegExp(`^${Qe}$`);
function et(e) {
  const t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function ln(e) {
  return new RegExp(`^${et(e)}$`);
}
function dn(e) {
  const t = et({ precision: e.precision }), n = ["Z"];
  e.local && n.push(""), e.offset && n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const r = `${t}(?:${n.join("|")})`;
  return new RegExp(`^${Qe}T(?:${r})$`);
}
const pn = (e) => {
  const t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${t}$`);
}, fn = /^-?\d+$/, hn = /^-?\d+(?:\.\d+)?/, mn = /^(?:true|false)$/i, gn = /^[^A-Z]*$/, _n = /^[^a-z]*$/, y = /* @__PURE__ */ a("$ZodCheck", (e, t) => {
  var n;
  e._zod ?? (e._zod = {}), e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), tt = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, nt = /* @__PURE__ */ a("$ZodCheckLessThan", (e, t) => {
  y.init(e, t);
  const n = tt[typeof t.value];
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
}), rt = /* @__PURE__ */ a("$ZodCheckGreaterThan", (e, t) => {
  y.init(e, t);
  const n = tt[typeof t.value];
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
}), vn = /* @__PURE__ */ a("$ZodCheckMultipleOf", (e, t) => {
  y.init(e, t), e._zod.onattach.push((n) => {
    var r;
    (r = n._zod.bag).multipleOf ?? (r.multipleOf = t.value);
  }), e._zod.check = (n) => {
    if (typeof n.value != typeof t.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof n.value == "bigint" ? n.value % t.value === BigInt(0) : wt(n.value, t.value) === 0) || n.issues.push({
      origin: typeof n.value,
      code: "not_multiple_of",
      divisor: t.value,
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), bn = /* @__PURE__ */ a("$ZodCheckNumberFormat", (e, t) => {
  y.init(e, t), t.format = t.format || "float64";
  const n = t.format?.includes("int"), r = n ? "int" : "number", [o, i] = yt[t.format];
  e._zod.onattach.push((c) => {
    const u = c._zod.bag;
    u.format = t.format, u.minimum = o, u.maximum = i, n && (u.pattern = fn);
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
}), wn = /* @__PURE__ */ a("$ZodCheckMaxLength", (e, t) => {
  var n;
  y.init(e, t), (n = e._zod.def).when ?? (n.when = (r) => {
    const o = r.value;
    return !he(o) && o.length !== void 0;
  }), e._zod.onattach.push((r) => {
    const o = r._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    t.maximum < o && (r._zod.bag.maximum = t.maximum);
  }), e._zod.check = (r) => {
    const o = r.value;
    if (o.length <= t.maximum)
      return;
    const c = ge(o);
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
}), zn = /* @__PURE__ */ a("$ZodCheckMinLength", (e, t) => {
  var n;
  y.init(e, t), (n = e._zod.def).when ?? (n.when = (r) => {
    const o = r.value;
    return !he(o) && o.length !== void 0;
  }), e._zod.onattach.push((r) => {
    const o = r._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    t.minimum > o && (r._zod.bag.minimum = t.minimum);
  }), e._zod.check = (r) => {
    const o = r.value;
    if (o.length >= t.minimum)
      return;
    const c = ge(o);
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
}), kn = /* @__PURE__ */ a("$ZodCheckLengthEquals", (e, t) => {
  var n;
  y.init(e, t), (n = e._zod.def).when ?? (n.when = (r) => {
    const o = r.value;
    return !he(o) && o.length !== void 0;
  }), e._zod.onattach.push((r) => {
    const o = r._zod.bag;
    o.minimum = t.length, o.maximum = t.length, o.length = t.length;
  }), e._zod.check = (r) => {
    const o = r.value, i = o.length;
    if (i === t.length)
      return;
    const c = ge(o), u = i > t.length;
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
}), ce = /* @__PURE__ */ a("$ZodCheckStringFormat", (e, t) => {
  var n, r;
  y.init(e, t), e._zod.onattach.push((o) => {
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
}), $n = /* @__PURE__ */ a("$ZodCheckRegex", (e, t) => {
  ce.init(e, t), e._zod.check = (n) => {
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
}), yn = /* @__PURE__ */ a("$ZodCheckLowerCase", (e, t) => {
  t.pattern ?? (t.pattern = gn), ce.init(e, t);
}), Zn = /* @__PURE__ */ a("$ZodCheckUpperCase", (e, t) => {
  t.pattern ?? (t.pattern = _n), ce.init(e, t);
}), En = /* @__PURE__ */ a("$ZodCheckIncludes", (e, t) => {
  y.init(e, t);
  const n = G(t.includes), r = new RegExp(typeof t.position == "number" ? `^.{${t.position}}${n}` : n);
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
}), In = /* @__PURE__ */ a("$ZodCheckStartsWith", (e, t) => {
  y.init(e, t);
  const n = new RegExp(`^${G(t.prefix)}.*`);
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
}), Sn = /* @__PURE__ */ a("$ZodCheckEndsWith", (e, t) => {
  y.init(e, t);
  const n = new RegExp(`.*${G(t.suffix)}$`);
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
}), xn = /* @__PURE__ */ a("$ZodCheckOverwrite", (e, t) => {
  y.init(e, t), e._zod.check = (n) => {
    n.value = t.tx(n.value);
  };
});
class An {
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
const Tn = {
  major: 4,
  minor: 1,
  patch: 12
}, _ = /* @__PURE__ */ a("$ZodType", (e, t) => {
  var n;
  e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = Tn;
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
    const o = (c, u, l) => {
      let d = F(c), h;
      for (const $ of u) {
        if ($._zod.def.when) {
          if (!$._zod.def.when(c))
            continue;
        } else if (d)
          continue;
        const b = c.issues.length, k = $._zod.check(c);
        if (k instanceof Promise && l?.async === !1)
          throw new L();
        if (h || k instanceof Promise)
          h = (h ?? Promise.resolve()).then(async () => {
            await k, c.issues.length !== b && (d || (d = F(c, b)));
          });
        else {
          if (c.issues.length === b)
            continue;
          d || (d = F(c, b));
        }
      }
      return h ? h.then(() => c) : c;
    }, i = (c, u, l) => {
      if (F(c))
        return c.aborted = !0, c;
      const d = o(u, r, l);
      if (d instanceof Promise) {
        if (l.async === !1)
          throw new L();
        return d.then((h) => e._zod.parse(h, l));
      }
      return e._zod.parse(d, l);
    };
    e._zod.run = (c, u) => {
      if (u.skipChecks)
        return e._zod.parse(c, u);
      if (u.direction === "backward") {
        const d = e._zod.parse({ value: c.value, issues: [] }, { ...u, skipChecks: !0 });
        return d instanceof Promise ? d.then((h) => i(h, c, u)) : i(d, c, u);
      }
      const l = e._zod.parse(c, u);
      if (l instanceof Promise) {
        if (u.async === !1)
          throw new L();
        return l.then((d) => o(d, r, u));
      }
      return o(l, r, u);
    };
  }
  e["~standard"] = {
    validate: (o) => {
      try {
        const i = Nt(e, o);
        return i.success ? { value: i.data } : { issues: i.error?.issues };
      } catch {
        return Dt(e, o).then((c) => c.success ? { value: c.data } : { issues: c.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  };
}), be = /* @__PURE__ */ a("$ZodString", (e, t) => {
  _.init(e, t), e._zod.pattern = [...e?._zod.bag?.patterns ?? []].pop() ?? pn(e._zod.bag), e._zod.parse = (n, r) => {
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
}), g = /* @__PURE__ */ a("$ZodStringFormat", (e, t) => {
  ce.init(e, t), be.init(e, t);
}), On = /* @__PURE__ */ a("$ZodGUID", (e, t) => {
  t.pattern ?? (t.pattern = Yt), g.init(e, t);
}), Cn = /* @__PURE__ */ a("$ZodUUID", (e, t) => {
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
    t.pattern ?? (t.pattern = ye(r));
  } else
    t.pattern ?? (t.pattern = ye());
  g.init(e, t);
}), Nn = /* @__PURE__ */ a("$ZodEmail", (e, t) => {
  t.pattern ?? (t.pattern = qt), g.init(e, t);
}), Dn = /* @__PURE__ */ a("$ZodURL", (e, t) => {
  g.init(e, t), e._zod.check = (n) => {
    try {
      const r = n.value.trim(), o = new URL(r);
      t.hostname && (t.hostname.lastIndex = 0, t.hostname.test(o.hostname) || n.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid hostname",
        pattern: sn.source,
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
}), Pn = /* @__PURE__ */ a("$ZodEmoji", (e, t) => {
  t.pattern ?? (t.pattern = en()), g.init(e, t);
}), Rn = /* @__PURE__ */ a("$ZodNanoID", (e, t) => {
  t.pattern ?? (t.pattern = Xt), g.init(e, t);
}), jn = /* @__PURE__ */ a("$ZodCUID", (e, t) => {
  t.pattern ?? (t.pattern = Gt), g.init(e, t);
}), Mn = /* @__PURE__ */ a("$ZodCUID2", (e, t) => {
  t.pattern ?? (t.pattern = Bt), g.init(e, t);
}), Fn = /* @__PURE__ */ a("$ZodULID", (e, t) => {
  t.pattern ?? (t.pattern = Wt), g.init(e, t);
}), Un = /* @__PURE__ */ a("$ZodXID", (e, t) => {
  t.pattern ?? (t.pattern = Jt), g.init(e, t);
}), Ln = /* @__PURE__ */ a("$ZodKSUID", (e, t) => {
  t.pattern ?? (t.pattern = Kt), g.init(e, t);
}), Vn = /* @__PURE__ */ a("$ZodISODateTime", (e, t) => {
  t.pattern ?? (t.pattern = dn(t)), g.init(e, t);
}), Gn = /* @__PURE__ */ a("$ZodISODate", (e, t) => {
  t.pattern ?? (t.pattern = un), g.init(e, t);
}), Bn = /* @__PURE__ */ a("$ZodISOTime", (e, t) => {
  t.pattern ?? (t.pattern = ln(t)), g.init(e, t);
}), Wn = /* @__PURE__ */ a("$ZodISODuration", (e, t) => {
  t.pattern ?? (t.pattern = Ht), g.init(e, t);
}), Jn = /* @__PURE__ */ a("$ZodIPv4", (e, t) => {
  t.pattern ?? (t.pattern = tn), g.init(e, t), e._zod.onattach.push((n) => {
    const r = n._zod.bag;
    r.format = "ipv4";
  });
}), Kn = /* @__PURE__ */ a("$ZodIPv6", (e, t) => {
  t.pattern ?? (t.pattern = nn), g.init(e, t), e._zod.onattach.push((n) => {
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
}), Xn = /* @__PURE__ */ a("$ZodCIDRv4", (e, t) => {
  t.pattern ?? (t.pattern = rn), g.init(e, t);
}), Hn = /* @__PURE__ */ a("$ZodCIDRv6", (e, t) => {
  t.pattern ?? (t.pattern = on), g.init(e, t), e._zod.check = (n) => {
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
function ot(e) {
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
const Yn = /* @__PURE__ */ a("$ZodBase64", (e, t) => {
  t.pattern ?? (t.pattern = cn), g.init(e, t), e._zod.onattach.push((n) => {
    n._zod.bag.contentEncoding = "base64";
  }), e._zod.check = (n) => {
    ot(n.value) || n.issues.push({
      code: "invalid_format",
      format: "base64",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
});
function qn(e) {
  if (!qe.test(e))
    return !1;
  const t = e.replace(/[-_]/g, (r) => r === "-" ? "+" : "/"), n = t.padEnd(Math.ceil(t.length / 4) * 4, "=");
  return ot(n);
}
const Qn = /* @__PURE__ */ a("$ZodBase64URL", (e, t) => {
  t.pattern ?? (t.pattern = qe), g.init(e, t), e._zod.onattach.push((n) => {
    n._zod.bag.contentEncoding = "base64url";
  }), e._zod.check = (n) => {
    qn(n.value) || n.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), er = /* @__PURE__ */ a("$ZodE164", (e, t) => {
  t.pattern ?? (t.pattern = an), g.init(e, t);
});
function tr(e, t = null) {
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
const nr = /* @__PURE__ */ a("$ZodJWT", (e, t) => {
  g.init(e, t), e._zod.check = (n) => {
    tr(n.value, t.alg) || n.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), it = /* @__PURE__ */ a("$ZodNumber", (e, t) => {
  _.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? hn, e._zod.parse = (n, r) => {
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
}), rr = /* @__PURE__ */ a("$ZodNumber", (e, t) => {
  bn.init(e, t), it.init(e, t);
}), or = /* @__PURE__ */ a("$ZodBoolean", (e, t) => {
  _.init(e, t), e._zod.pattern = mn, e._zod.parse = (n, r) => {
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
}), ir = /* @__PURE__ */ a("$ZodUnknown", (e, t) => {
  _.init(e, t), e._zod.parse = (n) => n;
}), cr = /* @__PURE__ */ a("$ZodNever", (e, t) => {
  _.init(e, t), e._zod.parse = (n, r) => (n.issues.push({
    expected: "never",
    code: "invalid_type",
    input: n.value,
    inst: e
  }), n);
});
function Ze(e, t, n) {
  e.issues.length && t.issues.push(...U(n, e.issues)), t.value[n] = e.value;
}
const sr = /* @__PURE__ */ a("$ZodArray", (e, t) => {
  _.init(e, t), e._zod.parse = (n, r) => {
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
      const u = o[c], l = t.element._zod.run({
        value: u,
        issues: []
      }, r);
      l instanceof Promise ? i.push(l.then((d) => Ze(d, n, c))) : Ze(l, n, c);
    }
    return i.length ? Promise.all(i).then(() => n) : n;
  };
});
function ee(e, t, n, r) {
  e.issues.length && t.issues.push(...U(n, e.issues)), e.value === void 0 ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
}
function ct(e) {
  const t = Object.keys(e.shape);
  for (const r of t)
    if (!e.shape?.[r]?._zod?.traits?.has("$ZodType"))
      throw new Error(`Invalid element at key "${r}": expected a Zod schema`);
  const n = $t(e.shape);
  return {
    ...e,
    keys: t,
    keySet: new Set(t),
    numKeys: t.length,
    optionalKeys: new Set(n)
  };
}
function st(e, t, n, r, o, i) {
  const c = [], u = o.keySet, l = o.catchall._zod, d = l.def.type;
  for (const h of Object.keys(t)) {
    if (u.has(h))
      continue;
    if (d === "never") {
      c.push(h);
      continue;
    }
    const $ = l.run({ value: t[h], issues: [] }, r);
    $ instanceof Promise ? e.push($.then((b) => ee(b, n, h, t))) : ee($, n, h, t);
  }
  return c.length && n.issues.push({
    code: "unrecognized_keys",
    keys: c,
    input: t,
    inst: i
  }), e.length ? Promise.all(e).then(() => n) : n;
}
const ar = /* @__PURE__ */ a("$ZodObject", (e, t) => {
  if (_.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get) {
    const u = t.shape;
    Object.defineProperty(t, "shape", {
      get: () => {
        const l = { ...u };
        return Object.defineProperty(t, "shape", {
          value: l
        }), l;
      }
    });
  }
  const r = fe(() => ct(t));
  m(e._zod, "propValues", () => {
    const u = t.shape, l = {};
    for (const d in u) {
      const h = u[d]._zod;
      if (h.values) {
        l[d] ?? (l[d] = /* @__PURE__ */ new Set());
        for (const $ of h.values)
          l[d].add($);
      }
    }
    return l;
  });
  const o = Q, i = t.catchall;
  let c;
  e._zod.parse = (u, l) => {
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
    const h = [], $ = c.shape;
    for (const b of c.keys) {
      const Z = $[b]._zod.run({ value: d[b], issues: [] }, l);
      Z instanceof Promise ? h.push(Z.then((se) => ee(se, u, b, d))) : ee(Z, u, b, d);
    }
    return i ? st(h, d, u, l, r.value, e) : h.length ? Promise.all(h).then(() => u) : u;
  };
}), ur = /* @__PURE__ */ a("$ZodObjectJIT", (e, t) => {
  ar.init(e, t);
  const n = e._zod.parse, r = fe(() => ct(t)), o = (b) => {
    const k = new An(["shape", "payload", "ctx"]), Z = r.value, se = (T) => {
      const x = $e(T);
      return `shape[${x}]._zod.run({ value: input[${x}], issues: [] }, ctx)`;
    };
    k.write("const input = payload.value;");
    const ze = /* @__PURE__ */ Object.create(null);
    let _t = 0;
    for (const T of Z.keys)
      ze[T] = `key_${_t++}`;
    k.write("const newResult = {};");
    for (const T of Z.keys) {
      const x = ze[T], W = $e(T);
      k.write(`const ${x} = ${se(T)};`), k.write(`
        if (${x}.issues.length) {
          payload.issues = payload.issues.concat(${x}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${W}, ...iss.path] : [${W}]
          })));
        }
        
        
        if (${x}.value === undefined) {
          if (${W} in input) {
            newResult[${W}] = undefined;
          }
        } else {
          newResult[${W}] = ${x}.value;
        }
        
      `);
    }
    k.write("payload.value = newResult;"), k.write("return payload;");
    const vt = k.compile();
    return (T, x) => vt(b, T, x);
  };
  let i;
  const c = Q, u = !We.jitless, d = u && zt.value, h = t.catchall;
  let $;
  e._zod.parse = (b, k) => {
    $ ?? ($ = r.value);
    const Z = b.value;
    return c(Z) ? u && d && k?.async === !1 && k.jitless !== !0 ? (i || (i = o(t.shape)), b = i(b, k), h ? st([], Z, b, k, $, e) : b) : n(b, k) : (b.issues.push({
      expected: "object",
      code: "invalid_type",
      input: Z,
      inst: e
    }), b);
  };
});
function Ee(e, t, n, r) {
  for (const i of e)
    if (i.issues.length === 0)
      return t.value = i.value, t;
  const o = e.filter((i) => !F(i));
  return o.length === 1 ? (t.value = o[0].value, o[0]) : (t.issues.push({
    code: "invalid_union",
    input: t.value,
    inst: n,
    errors: e.map((i) => i.issues.map((c) => N(c, r, C())))
  }), t);
}
const lr = /* @__PURE__ */ a("$ZodUnion", (e, t) => {
  _.init(e, t), m(e._zod, "optin", () => t.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0), m(e._zod, "optout", () => t.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0), m(e._zod, "values", () => {
    if (t.options.every((o) => o._zod.values))
      return new Set(t.options.flatMap((o) => Array.from(o._zod.values)));
  }), m(e._zod, "pattern", () => {
    if (t.options.every((o) => o._zod.pattern)) {
      const o = t.options.map((i) => i._zod.pattern);
      return new RegExp(`^(${o.map((i) => me(i.source)).join("|")})$`);
    }
  });
  const n = t.options.length === 1, r = t.options[0]._zod.run;
  e._zod.parse = (o, i) => {
    if (n)
      return r(o, i);
    let c = !1;
    const u = [];
    for (const l of t.options) {
      const d = l._zod.run({
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
    return c ? Promise.all(u).then((l) => Ee(l, o, e, i)) : Ee(u, o, e, i);
  };
}), dr = /* @__PURE__ */ a("$ZodIntersection", (e, t) => {
  _.init(e, t), e._zod.parse = (n, r) => {
    const o = n.value, i = t.left._zod.run({ value: o, issues: [] }, r), c = t.right._zod.run({ value: o, issues: [] }, r);
    return i instanceof Promise || c instanceof Promise ? Promise.all([i, c]).then(([l, d]) => Ie(n, l, d)) : Ie(n, i, c);
  };
});
function de(e, t) {
  if (e === t)
    return { valid: !0, data: e };
  if (e instanceof Date && t instanceof Date && +e == +t)
    return { valid: !0, data: e };
  if (V(e) && V(t)) {
    const n = Object.keys(t), r = Object.keys(e).filter((i) => n.indexOf(i) !== -1), o = { ...e, ...t };
    for (const i of r) {
      const c = de(e[i], t[i]);
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
      const o = e[r], i = t[r], c = de(o, i);
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
  if (t.issues.length && e.issues.push(...t.issues), n.issues.length && e.issues.push(...n.issues), F(e))
    return e;
  const r = de(t.value, n.value);
  if (!r.valid)
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(r.mergeErrorPath)}`);
  return e.value = r.data, e;
}
const pr = /* @__PURE__ */ a("$ZodRecord", (e, t) => {
  _.init(e, t), e._zod.parse = (n, r) => {
    const o = n.value;
    if (!V(o))
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
      for (const l of c)
        if (typeof l == "string" || typeof l == "number" || typeof l == "symbol") {
          const d = t.valueType._zod.run({ value: o[l], issues: [] }, r);
          d instanceof Promise ? i.push(d.then((h) => {
            h.issues.length && n.issues.push(...U(l, h.issues)), n.value[l] = h.value;
          })) : (d.issues.length && n.issues.push(...U(l, d.issues)), n.value[l] = d.value);
        }
      let u;
      for (const l in o)
        c.has(l) || (u = u ?? [], u.push(l));
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
            issues: u.issues.map((d) => N(d, r, C())),
            input: c,
            path: [c],
            inst: e
          }), n.value[u.value] = u.value;
          continue;
        }
        const l = t.valueType._zod.run({ value: o[c], issues: [] }, r);
        l instanceof Promise ? i.push(l.then((d) => {
          d.issues.length && n.issues.push(...U(c, d.issues)), n.value[u.value] = d.value;
        })) : (l.issues.length && n.issues.push(...U(c, l.issues)), n.value[u.value] = l.value);
      }
    }
    return i.length ? Promise.all(i).then(() => n) : n;
  };
}), fr = /* @__PURE__ */ a("$ZodEnum", (e, t) => {
  _.init(e, t);
  const n = bt(t.entries), r = new Set(n);
  e._zod.values = r, e._zod.pattern = new RegExp(`^(${n.filter((o) => kt.has(typeof o)).map((o) => typeof o == "string" ? G(o) : o.toString()).join("|")})$`), e._zod.parse = (o, i) => {
    const c = o.value;
    return r.has(c) || o.issues.push({
      code: "invalid_value",
      values: n,
      input: c,
      inst: e
    }), o;
  };
}), hr = /* @__PURE__ */ a("$ZodLiteral", (e, t) => {
  if (_.init(e, t), t.values.length === 0)
    throw new Error("Cannot create literal schema with no valid values");
  e._zod.values = new Set(t.values), e._zod.pattern = new RegExp(`^(${t.values.map((n) => typeof n == "string" ? G(n) : n ? G(n.toString()) : String(n)).join("|")})$`), e._zod.parse = (n, r) => {
    const o = n.value;
    return e._zod.values.has(o) || n.issues.push({
      code: "invalid_value",
      values: t.values,
      input: o,
      inst: e
    }), n;
  };
}), mr = /* @__PURE__ */ a("$ZodTransform", (e, t) => {
  _.init(e, t), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      throw new Be(e.constructor.name);
    const o = t.transform(n.value, n);
    if (r.async)
      return (o instanceof Promise ? o : Promise.resolve(o)).then((c) => (n.value = c, n));
    if (o instanceof Promise)
      throw new L();
    return n.value = o, n;
  };
});
function Se(e, t) {
  return e.issues.length && t === void 0 ? { issues: [], value: void 0 } : e;
}
const gr = /* @__PURE__ */ a("$ZodOptional", (e, t) => {
  _.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", m(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, void 0]) : void 0), m(e._zod, "pattern", () => {
    const n = t.innerType._zod.pattern;
    return n ? new RegExp(`^(${me(n.source)})?$`) : void 0;
  }), e._zod.parse = (n, r) => {
    if (t.innerType._zod.optin === "optional") {
      const o = t.innerType._zod.run(n, r);
      return o instanceof Promise ? o.then((i) => Se(i, n.value)) : Se(o, n.value);
    }
    return n.value === void 0 ? n : t.innerType._zod.run(n, r);
  };
}), _r = /* @__PURE__ */ a("$ZodNullable", (e, t) => {
  _.init(e, t), m(e._zod, "optin", () => t.innerType._zod.optin), m(e._zod, "optout", () => t.innerType._zod.optout), m(e._zod, "pattern", () => {
    const n = t.innerType._zod.pattern;
    return n ? new RegExp(`^(${me(n.source)}|null)$`) : void 0;
  }), m(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, null]) : void 0), e._zod.parse = (n, r) => n.value === null ? n : t.innerType._zod.run(n, r);
}), vr = /* @__PURE__ */ a("$ZodDefault", (e, t) => {
  _.init(e, t), e._zod.optin = "optional", m(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return t.innerType._zod.run(n, r);
    if (n.value === void 0)
      return n.value = t.defaultValue, n;
    const o = t.innerType._zod.run(n, r);
    return o instanceof Promise ? o.then((i) => xe(i, t)) : xe(o, t);
  };
});
function xe(e, t) {
  return e.value === void 0 && (e.value = t.defaultValue), e;
}
const br = /* @__PURE__ */ a("$ZodPrefault", (e, t) => {
  _.init(e, t), e._zod.optin = "optional", m(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (n, r) => (r.direction === "backward" || n.value === void 0 && (n.value = t.defaultValue), t.innerType._zod.run(n, r));
}), wr = /* @__PURE__ */ a("$ZodNonOptional", (e, t) => {
  _.init(e, t), m(e._zod, "values", () => {
    const n = t.innerType._zod.values;
    return n ? new Set([...n].filter((r) => r !== void 0)) : void 0;
  }), e._zod.parse = (n, r) => {
    const o = t.innerType._zod.run(n, r);
    return o instanceof Promise ? o.then((i) => Ae(i, e)) : Ae(o, e);
  };
});
function Ae(e, t) {
  return !e.issues.length && e.value === void 0 && e.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: e.value,
    inst: t
  }), e;
}
const zr = /* @__PURE__ */ a("$ZodCatch", (e, t) => {
  _.init(e, t), m(e._zod, "optin", () => t.innerType._zod.optin), m(e._zod, "optout", () => t.innerType._zod.optout), m(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return t.innerType._zod.run(n, r);
    const o = t.innerType._zod.run(n, r);
    return o instanceof Promise ? o.then((i) => (n.value = i.value, i.issues.length && (n.value = t.catchValue({
      ...n,
      error: {
        issues: i.issues.map((c) => N(c, r, C()))
      },
      input: n.value
    }), n.issues = []), n)) : (n.value = o.value, o.issues.length && (n.value = t.catchValue({
      ...n,
      error: {
        issues: o.issues.map((i) => N(i, r, C()))
      },
      input: n.value
    }), n.issues = []), n);
  };
}), kr = /* @__PURE__ */ a("$ZodPipe", (e, t) => {
  _.init(e, t), m(e._zod, "values", () => t.in._zod.values), m(e._zod, "optin", () => t.in._zod.optin), m(e._zod, "optout", () => t.out._zod.optout), m(e._zod, "propValues", () => t.in._zod.propValues), e._zod.parse = (n, r) => {
    if (r.direction === "backward") {
      const i = t.out._zod.run(n, r);
      return i instanceof Promise ? i.then((c) => H(c, t.in, r)) : H(i, t.in, r);
    }
    const o = t.in._zod.run(n, r);
    return o instanceof Promise ? o.then((i) => H(i, t.out, r)) : H(o, t.out, r);
  };
});
function H(e, t, n) {
  return e.issues.length ? (e.aborted = !0, e) : t._zod.run({ value: e.value, issues: e.issues }, n);
}
const $r = /* @__PURE__ */ a("$ZodReadonly", (e, t) => {
  _.init(e, t), m(e._zod, "propValues", () => t.innerType._zod.propValues), m(e._zod, "values", () => t.innerType._zod.values), m(e._zod, "optin", () => t.innerType._zod.optin), m(e._zod, "optout", () => t.innerType._zod.optout), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return t.innerType._zod.run(n, r);
    const o = t.innerType._zod.run(n, r);
    return o instanceof Promise ? o.then(Te) : Te(o);
  };
});
function Te(e) {
  return e.value = Object.freeze(e.value), e;
}
const yr = /* @__PURE__ */ a("$ZodCustom", (e, t) => {
  y.init(e, t), _.init(e, t), e._zod.parse = (n, r) => n, e._zod.check = (n) => {
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
    r._zod.def.params && (o.params = r._zod.def.params), t.issues.push(J(o));
  }
}
class Zr {
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
function Er() {
  return new Zr();
}
const Y = /* @__PURE__ */ Er();
function Ir(e, t) {
  return new e({
    type: "string",
    ...f(t)
  });
}
function Sr(e, t) {
  return new e({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...f(t)
  });
}
function Ce(e, t) {
  return new e({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...f(t)
  });
}
function xr(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...f(t)
  });
}
function Ar(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...f(t)
  });
}
function Tr(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...f(t)
  });
}
function Or(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...f(t)
  });
}
function Cr(e, t) {
  return new e({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...f(t)
  });
}
function Nr(e, t) {
  return new e({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...f(t)
  });
}
function Dr(e, t) {
  return new e({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...f(t)
  });
}
function Pr(e, t) {
  return new e({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...f(t)
  });
}
function Rr(e, t) {
  return new e({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...f(t)
  });
}
function jr(e, t) {
  return new e({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...f(t)
  });
}
function Mr(e, t) {
  return new e({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...f(t)
  });
}
function Fr(e, t) {
  return new e({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...f(t)
  });
}
function Ur(e, t) {
  return new e({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...f(t)
  });
}
function Lr(e, t) {
  return new e({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...f(t)
  });
}
function Vr(e, t) {
  return new e({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...f(t)
  });
}
function Gr(e, t) {
  return new e({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...f(t)
  });
}
function Br(e, t) {
  return new e({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...f(t)
  });
}
function Wr(e, t) {
  return new e({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...f(t)
  });
}
function Jr(e, t) {
  return new e({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...f(t)
  });
}
function Kr(e, t) {
  return new e({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...f(t)
  });
}
function Xr(e, t) {
  return new e({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...f(t)
  });
}
function Hr(e, t) {
  return new e({
    type: "string",
    format: "date",
    check: "string_format",
    ...f(t)
  });
}
function Yr(e, t) {
  return new e({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...f(t)
  });
}
function qr(e, t) {
  return new e({
    type: "string",
    format: "duration",
    check: "string_format",
    ...f(t)
  });
}
function Qr(e, t) {
  return new e({
    type: "number",
    checks: [],
    ...f(t)
  });
}
function eo(e, t) {
  return new e({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...f(t)
  });
}
function to(e, t) {
  return new e({
    type: "boolean",
    ...f(t)
  });
}
function no(e) {
  return new e({
    type: "unknown"
  });
}
function ro(e, t) {
  return new e({
    type: "never",
    ...f(t)
  });
}
function Ne(e, t) {
  return new nt({
    check: "less_than",
    ...f(t),
    value: e,
    inclusive: !1
  });
}
function ae(e, t) {
  return new nt({
    check: "less_than",
    ...f(t),
    value: e,
    inclusive: !0
  });
}
function De(e, t) {
  return new rt({
    check: "greater_than",
    ...f(t),
    value: e,
    inclusive: !1
  });
}
function ue(e, t) {
  return new rt({
    check: "greater_than",
    ...f(t),
    value: e,
    inclusive: !0
  });
}
function Pe(e, t) {
  return new vn({
    check: "multiple_of",
    ...f(t),
    value: e
  });
}
function at(e, t) {
  return new wn({
    check: "max_length",
    ...f(t),
    maximum: e
  });
}
function te(e, t) {
  return new zn({
    check: "min_length",
    ...f(t),
    minimum: e
  });
}
function ut(e, t) {
  return new kn({
    check: "length_equals",
    ...f(t),
    length: e
  });
}
function oo(e, t) {
  return new $n({
    check: "string_format",
    format: "regex",
    ...f(t),
    pattern: e
  });
}
function io(e) {
  return new yn({
    check: "string_format",
    format: "lowercase",
    ...f(e)
  });
}
function co(e) {
  return new Zn({
    check: "string_format",
    format: "uppercase",
    ...f(e)
  });
}
function so(e, t) {
  return new En({
    check: "string_format",
    format: "includes",
    ...f(t),
    includes: e
  });
}
function ao(e, t) {
  return new In({
    check: "string_format",
    format: "starts_with",
    ...f(t),
    prefix: e
  });
}
function uo(e, t) {
  return new Sn({
    check: "string_format",
    format: "ends_with",
    ...f(t),
    suffix: e
  });
}
function K(e) {
  return new xn({
    check: "overwrite",
    tx: e
  });
}
function lo(e) {
  return K((t) => t.normalize(e));
}
function po() {
  return K((e) => e.trim());
}
function fo() {
  return K((e) => e.toLowerCase());
}
function ho() {
  return K((e) => e.toUpperCase());
}
function mo(e, t, n) {
  return new e({
    type: "array",
    element: t,
    // get element() {
    //   return element;
    // },
    ...f(n)
  });
}
function go(e, t, n) {
  return new e({
    type: "custom",
    check: "custom",
    fn: t,
    ...f(n)
  });
}
function _o(e) {
  const t = vo((n) => (n.addIssue = (r) => {
    if (typeof r == "string")
      n.issues.push(J(r, n.value, t._zod.def));
    else {
      const o = r;
      o.fatal && (o.continue = !1), o.code ?? (o.code = "custom"), o.input ?? (o.input = n.value), o.inst ?? (o.inst = t), o.continue ?? (o.continue = !t._zod.def.abort), n.issues.push(J(o));
    }
  }, e(n.value, n)));
  return t;
}
function vo(e, t) {
  const n = new y({
    check: "custom",
    ...f(t)
  });
  return n._zod.check = e, n;
}
const bo = /* @__PURE__ */ a("ZodISODateTime", (e, t) => {
  Vn.init(e, t), v.init(e, t);
});
function wo(e) {
  return Xr(bo, e);
}
const zo = /* @__PURE__ */ a("ZodISODate", (e, t) => {
  Gn.init(e, t), v.init(e, t);
});
function ko(e) {
  return Hr(zo, e);
}
const $o = /* @__PURE__ */ a("ZodISOTime", (e, t) => {
  Bn.init(e, t), v.init(e, t);
});
function yo(e) {
  return Yr($o, e);
}
const Zo = /* @__PURE__ */ a("ZodISODuration", (e, t) => {
  Wn.init(e, t), v.init(e, t);
});
function Eo(e) {
  return qr(Zo, e);
}
const Io = (e, t) => {
  He.init(e, t), e.name = "ZodError", Object.defineProperties(e, {
    format: {
      value: (n) => Ct(e, n)
      // enumerable: false,
    },
    flatten: {
      value: (n) => Ot(e, n)
      // enumerable: false,
    },
    addIssue: {
      value: (n) => {
        e.issues.push(n), e.message = JSON.stringify(e.issues, le, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (n) => {
        e.issues.push(...n), e.message = JSON.stringify(e.issues, le, 2);
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
}, S = a("ZodError", Io, {
  Parent: Error
}), So = /* @__PURE__ */ _e(S), xo = /* @__PURE__ */ ve(S), Ao = /* @__PURE__ */ oe(S), To = /* @__PURE__ */ ie(S), Oo = /* @__PURE__ */ Pt(S), Co = /* @__PURE__ */ Rt(S), No = /* @__PURE__ */ jt(S), Do = /* @__PURE__ */ Mt(S), Po = /* @__PURE__ */ Ft(S), Ro = /* @__PURE__ */ Ut(S), jo = /* @__PURE__ */ Lt(S), Mo = /* @__PURE__ */ Vt(S), w = /* @__PURE__ */ a("ZodType", (e, t) => (_.init(e, t), e.def = t, e.type = t.type, Object.defineProperty(e, "_def", { value: t }), e.check = (...n) => e.clone(M(t, {
  checks: [
    ...t.checks ?? [],
    ...n.map((r) => typeof r == "function" ? { _zod: { check: r, def: { check: "custom" }, onattach: [] } } : r)
  ]
})), e.clone = (n, r) => R(e, n, r), e.brand = () => e, e.register = (n, r) => (n.add(e, r), e), e.parse = (n, r) => So(e, n, r, { callee: e.parse }), e.safeParse = (n, r) => Ao(e, n, r), e.parseAsync = async (n, r) => xo(e, n, r, { callee: e.parseAsync }), e.safeParseAsync = async (n, r) => To(e, n, r), e.spa = e.safeParseAsync, e.encode = (n, r) => Oo(e, n, r), e.decode = (n, r) => Co(e, n, r), e.encodeAsync = async (n, r) => No(e, n, r), e.decodeAsync = async (n, r) => Do(e, n, r), e.safeEncode = (n, r) => Po(e, n, r), e.safeDecode = (n, r) => Ro(e, n, r), e.safeEncodeAsync = async (n, r) => jo(e, n, r), e.safeDecodeAsync = async (n, r) => Mo(e, n, r), e.refine = (n, r) => e.check(Oi(n, r)), e.superRefine = (n) => e.check(Ci(n)), e.overwrite = (n) => e.check(K(n)), e.optional = () => Fe(e), e.nullable = () => Ue(e), e.nullish = () => Fe(Ue(e)), e.nonoptional = (n) => Zi(e, n), e.array = () => D(e), e.or = (n) => z([e, n]), e.and = (n) => hi(e, n), e.transform = (n) => Le(e, bi(n)), e.default = (n) => ki(e, n), e.prefault = (n) => yi(e, n), e.catch = (n) => Ii(e, n), e.pipe = (n) => Le(e, n), e.readonly = () => Ai(e), e.describe = (n) => {
  const r = e.clone();
  return Y.add(r, { description: n }), r;
}, Object.defineProperty(e, "description", {
  get() {
    return Y.get(e)?.description;
  },
  configurable: !0
}), e.meta = (...n) => {
  if (n.length === 0)
    return Y.get(e);
  const r = e.clone();
  return Y.add(r, n[0]), r;
}, e.isOptional = () => e.safeParse(void 0).success, e.isNullable = () => e.safeParse(null).success, e)), lt = /* @__PURE__ */ a("_ZodString", (e, t) => {
  be.init(e, t), w.init(e, t);
  const n = e._zod.bag;
  e.format = n.format ?? null, e.minLength = n.minimum ?? null, e.maxLength = n.maximum ?? null, e.regex = (...r) => e.check(oo(...r)), e.includes = (...r) => e.check(so(...r)), e.startsWith = (...r) => e.check(ao(...r)), e.endsWith = (...r) => e.check(uo(...r)), e.min = (...r) => e.check(te(...r)), e.max = (...r) => e.check(at(...r)), e.length = (...r) => e.check(ut(...r)), e.nonempty = (...r) => e.check(te(1, ...r)), e.lowercase = (r) => e.check(io(r)), e.uppercase = (r) => e.check(co(r)), e.trim = () => e.check(po()), e.normalize = (...r) => e.check(lo(...r)), e.toLowerCase = () => e.check(fo()), e.toUpperCase = () => e.check(ho());
}), Fo = /* @__PURE__ */ a("ZodString", (e, t) => {
  be.init(e, t), lt.init(e, t), e.email = (n) => e.check(Sr(Uo, n)), e.url = (n) => e.check(Cr(Lo, n)), e.jwt = (n) => e.check(Kr(ri, n)), e.emoji = (n) => e.check(Nr(Vo, n)), e.guid = (n) => e.check(Ce(Re, n)), e.uuid = (n) => e.check(xr(q, n)), e.uuidv4 = (n) => e.check(Ar(q, n)), e.uuidv6 = (n) => e.check(Tr(q, n)), e.uuidv7 = (n) => e.check(Or(q, n)), e.nanoid = (n) => e.check(Dr(Go, n)), e.guid = (n) => e.check(Ce(Re, n)), e.cuid = (n) => e.check(Pr(Bo, n)), e.cuid2 = (n) => e.check(Rr(Wo, n)), e.ulid = (n) => e.check(jr(Jo, n)), e.base64 = (n) => e.check(Br(ei, n)), e.base64url = (n) => e.check(Wr(ti, n)), e.xid = (n) => e.check(Mr(Ko, n)), e.ksuid = (n) => e.check(Fr(Xo, n)), e.ipv4 = (n) => e.check(Ur(Ho, n)), e.ipv6 = (n) => e.check(Lr(Yo, n)), e.cidrv4 = (n) => e.check(Vr(qo, n)), e.cidrv6 = (n) => e.check(Gr(Qo, n)), e.e164 = (n) => e.check(Jr(ni, n)), e.datetime = (n) => e.check(wo(n)), e.date = (n) => e.check(ko(n)), e.time = (n) => e.check(yo(n)), e.duration = (n) => e.check(Eo(n));
});
function p(e) {
  return Ir(Fo, e);
}
const v = /* @__PURE__ */ a("ZodStringFormat", (e, t) => {
  g.init(e, t), lt.init(e, t);
}), Uo = /* @__PURE__ */ a("ZodEmail", (e, t) => {
  Nn.init(e, t), v.init(e, t);
}), Re = /* @__PURE__ */ a("ZodGUID", (e, t) => {
  On.init(e, t), v.init(e, t);
}), q = /* @__PURE__ */ a("ZodUUID", (e, t) => {
  Cn.init(e, t), v.init(e, t);
}), Lo = /* @__PURE__ */ a("ZodURL", (e, t) => {
  Dn.init(e, t), v.init(e, t);
}), Vo = /* @__PURE__ */ a("ZodEmoji", (e, t) => {
  Pn.init(e, t), v.init(e, t);
}), Go = /* @__PURE__ */ a("ZodNanoID", (e, t) => {
  Rn.init(e, t), v.init(e, t);
}), Bo = /* @__PURE__ */ a("ZodCUID", (e, t) => {
  jn.init(e, t), v.init(e, t);
}), Wo = /* @__PURE__ */ a("ZodCUID2", (e, t) => {
  Mn.init(e, t), v.init(e, t);
}), Jo = /* @__PURE__ */ a("ZodULID", (e, t) => {
  Fn.init(e, t), v.init(e, t);
}), Ko = /* @__PURE__ */ a("ZodXID", (e, t) => {
  Un.init(e, t), v.init(e, t);
}), Xo = /* @__PURE__ */ a("ZodKSUID", (e, t) => {
  Ln.init(e, t), v.init(e, t);
}), Ho = /* @__PURE__ */ a("ZodIPv4", (e, t) => {
  Jn.init(e, t), v.init(e, t);
}), Yo = /* @__PURE__ */ a("ZodIPv6", (e, t) => {
  Kn.init(e, t), v.init(e, t);
}), qo = /* @__PURE__ */ a("ZodCIDRv4", (e, t) => {
  Xn.init(e, t), v.init(e, t);
}), Qo = /* @__PURE__ */ a("ZodCIDRv6", (e, t) => {
  Hn.init(e, t), v.init(e, t);
}), ei = /* @__PURE__ */ a("ZodBase64", (e, t) => {
  Yn.init(e, t), v.init(e, t);
}), ti = /* @__PURE__ */ a("ZodBase64URL", (e, t) => {
  Qn.init(e, t), v.init(e, t);
}), ni = /* @__PURE__ */ a("ZodE164", (e, t) => {
  er.init(e, t), v.init(e, t);
}), ri = /* @__PURE__ */ a("ZodJWT", (e, t) => {
  nr.init(e, t), v.init(e, t);
}), dt = /* @__PURE__ */ a("ZodNumber", (e, t) => {
  it.init(e, t), w.init(e, t), e.gt = (r, o) => e.check(De(r, o)), e.gte = (r, o) => e.check(ue(r, o)), e.min = (r, o) => e.check(ue(r, o)), e.lt = (r, o) => e.check(Ne(r, o)), e.lte = (r, o) => e.check(ae(r, o)), e.max = (r, o) => e.check(ae(r, o)), e.int = (r) => e.check(je(r)), e.safe = (r) => e.check(je(r)), e.positive = (r) => e.check(De(0, r)), e.nonnegative = (r) => e.check(ue(0, r)), e.negative = (r) => e.check(Ne(0, r)), e.nonpositive = (r) => e.check(ae(0, r)), e.multipleOf = (r, o) => e.check(Pe(r, o)), e.step = (r, o) => e.check(Pe(r, o)), e.finite = () => e;
  const n = e._zod.bag;
  e.minValue = Math.max(n.minimum ?? Number.NEGATIVE_INFINITY, n.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null, e.maxValue = Math.min(n.maximum ?? Number.POSITIVE_INFINITY, n.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null, e.isInt = (n.format ?? "").includes("int") || Number.isSafeInteger(n.multipleOf ?? 0.5), e.isFinite = !0, e.format = n.format ?? null;
});
function O(e) {
  return Qr(dt, e);
}
const oi = /* @__PURE__ */ a("ZodNumberFormat", (e, t) => {
  rr.init(e, t), dt.init(e, t);
});
function je(e) {
  return eo(oi, e);
}
const ii = /* @__PURE__ */ a("ZodBoolean", (e, t) => {
  or.init(e, t), w.init(e, t);
});
function ci(e) {
  return to(ii, e);
}
const si = /* @__PURE__ */ a("ZodUnknown", (e, t) => {
  ir.init(e, t), w.init(e, t);
});
function Me() {
  return no(si);
}
const ai = /* @__PURE__ */ a("ZodNever", (e, t) => {
  cr.init(e, t), w.init(e, t);
});
function ui(e) {
  return ro(ai, e);
}
const li = /* @__PURE__ */ a("ZodArray", (e, t) => {
  sr.init(e, t), w.init(e, t), e.element = t.element, e.min = (n, r) => e.check(te(n, r)), e.nonempty = (n) => e.check(te(1, n)), e.max = (n, r) => e.check(at(n, r)), e.length = (n, r) => e.check(ut(n, r)), e.unwrap = () => e.element;
});
function D(e, t) {
  return mo(li, e, t);
}
const di = /* @__PURE__ */ a("ZodObject", (e, t) => {
  ur.init(e, t), w.init(e, t), m(e, "shape", () => t.shape), e.keyof = () => gi(Object.keys(e._zod.def.shape)), e.catchall = (n) => e.clone({ ...e._zod.def, catchall: n }), e.passthrough = () => e.clone({ ...e._zod.def, catchall: Me() }), e.loose = () => e.clone({ ...e._zod.def, catchall: Me() }), e.strict = () => e.clone({ ...e._zod.def, catchall: ui() }), e.strip = () => e.clone({ ...e._zod.def, catchall: void 0 }), e.extend = (n) => It(e, n), e.safeExtend = (n) => St(e, n), e.merge = (n) => xt(e, n), e.pick = (n) => Zt(e, n), e.omit = (n) => Et(e, n), e.partial = (...n) => At(pt, e, n[0]), e.required = (...n) => Tt(ft, e, n[0]);
});
function A(e, t) {
  const n = {
    type: "object",
    shape: e ?? {},
    ...f(t)
  };
  return new di(n);
}
const pi = /* @__PURE__ */ a("ZodUnion", (e, t) => {
  lr.init(e, t), w.init(e, t), e.options = t.options;
});
function z(e, t) {
  return new pi({
    type: "union",
    options: e,
    ...f(t)
  });
}
const fi = /* @__PURE__ */ a("ZodIntersection", (e, t) => {
  dr.init(e, t), w.init(e, t);
});
function hi(e, t) {
  return new fi({
    type: "intersection",
    left: e,
    right: t
  });
}
const mi = /* @__PURE__ */ a("ZodRecord", (e, t) => {
  pr.init(e, t), w.init(e, t), e.keyType = t.keyType, e.valueType = t.valueType;
});
function E(e, t, n) {
  return new mi({
    type: "record",
    keyType: e,
    valueType: t,
    ...f(n)
  });
}
const pe = /* @__PURE__ */ a("ZodEnum", (e, t) => {
  fr.init(e, t), w.init(e, t), e.enum = t.entries, e.options = Object.values(t.entries);
  const n = new Set(Object.keys(t.entries));
  e.extract = (r, o) => {
    const i = {};
    for (const c of r)
      if (n.has(c))
        i[c] = t.entries[c];
      else
        throw new Error(`Key ${c} not found in enum`);
    return new pe({
      ...t,
      checks: [],
      ...f(o),
      entries: i
    });
  }, e.exclude = (r, o) => {
    const i = { ...t.entries };
    for (const c of r)
      if (n.has(c))
        delete i[c];
      else
        throw new Error(`Key ${c} not found in enum`);
    return new pe({
      ...t,
      checks: [],
      ...f(o),
      entries: i
    });
  };
});
function gi(e, t) {
  const n = Array.isArray(e) ? Object.fromEntries(e.map((r) => [r, r])) : e;
  return new pe({
    type: "enum",
    entries: n,
    ...f(t)
  });
}
const _i = /* @__PURE__ */ a("ZodLiteral", (e, t) => {
  hr.init(e, t), w.init(e, t), e.values = new Set(t.values), Object.defineProperty(e, "value", {
    get() {
      if (t.values.length > 1)
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      return t.values[0];
    }
  });
});
function s(e, t) {
  return new _i({
    type: "literal",
    values: Array.isArray(e) ? e : [e],
    ...f(t)
  });
}
const vi = /* @__PURE__ */ a("ZodTransform", (e, t) => {
  mr.init(e, t), w.init(e, t), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      throw new Be(e.constructor.name);
    n.addIssue = (i) => {
      if (typeof i == "string")
        n.issues.push(J(i, n.value, t));
      else {
        const c = i;
        c.fatal && (c.continue = !1), c.code ?? (c.code = "custom"), c.input ?? (c.input = n.value), c.inst ?? (c.inst = e), n.issues.push(J(c));
      }
    };
    const o = t.transform(n.value, n);
    return o instanceof Promise ? o.then((i) => (n.value = i, n)) : (n.value = o, n);
  };
});
function bi(e) {
  return new vi({
    type: "transform",
    transform: e
  });
}
const pt = /* @__PURE__ */ a("ZodOptional", (e, t) => {
  gr.init(e, t), w.init(e, t), e.unwrap = () => e._zod.def.innerType;
});
function Fe(e) {
  return new pt({
    type: "optional",
    innerType: e
  });
}
const wi = /* @__PURE__ */ a("ZodNullable", (e, t) => {
  _r.init(e, t), w.init(e, t), e.unwrap = () => e._zod.def.innerType;
});
function Ue(e) {
  return new wi({
    type: "nullable",
    innerType: e
  });
}
const zi = /* @__PURE__ */ a("ZodDefault", (e, t) => {
  vr.init(e, t), w.init(e, t), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function ki(e, t) {
  return new zi({
    type: "default",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : Ke(t);
    }
  });
}
const $i = /* @__PURE__ */ a("ZodPrefault", (e, t) => {
  br.init(e, t), w.init(e, t), e.unwrap = () => e._zod.def.innerType;
});
function yi(e, t) {
  return new $i({
    type: "prefault",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : Ke(t);
    }
  });
}
const ft = /* @__PURE__ */ a("ZodNonOptional", (e, t) => {
  wr.init(e, t), w.init(e, t), e.unwrap = () => e._zod.def.innerType;
});
function Zi(e, t) {
  return new ft({
    type: "nonoptional",
    innerType: e,
    ...f(t)
  });
}
const Ei = /* @__PURE__ */ a("ZodCatch", (e, t) => {
  zr.init(e, t), w.init(e, t), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function Ii(e, t) {
  return new Ei({
    type: "catch",
    innerType: e,
    catchValue: typeof t == "function" ? t : () => t
  });
}
const Si = /* @__PURE__ */ a("ZodPipe", (e, t) => {
  kr.init(e, t), w.init(e, t), e.in = t.in, e.out = t.out;
});
function Le(e, t) {
  return new Si({
    type: "pipe",
    in: e,
    out: t
    // ...util.normalizeParams(params),
  });
}
const xi = /* @__PURE__ */ a("ZodReadonly", (e, t) => {
  $r.init(e, t), w.init(e, t), e.unwrap = () => e._zod.def.innerType;
});
function Ai(e) {
  return new xi({
    type: "readonly",
    innerType: e
  });
}
const Ti = /* @__PURE__ */ a("ZodCustom", (e, t) => {
  yr.init(e, t), w.init(e, t);
});
function Oi(e, t = {}) {
  return go(Ti, e, t);
}
function Ci(e) {
  return _o(e);
}
const Ni = z([s("amber"), s("green"), s("red"), s("other")]), Di = z([
  s("alpha"),
  s("beta"),
  s("generalAvailability"),
  s("notApplicable"),
  s("preAlpha"),
  s("proposed"),
  s("releaseCandidate"),
  s("unavailable"),
  s("underReview")
]), Pi = z([
  s("app"),
  s("connector"),
  s("connectorConnection"),
  s("context"),
  s("contextModelGroup"),
  s("contextModel"),
  s("contextModelDimensionGroup"),
  s("contextModelDimension"),
  s("contextModelDimensionHierarchy"),
  s("contextModelEntityGroup"),
  s("contextModelEntity"),
  s("contextModelEntityDataItem"),
  s("contextModelEntityEvent"),
  s("contextModelEntityPrimaryMeasure"),
  s("contextModelSecondaryMeasureGroup"),
  s("contextModelSecondaryMeasure"),
  s("dataView"),
  s("dimension"),
  s("engine"),
  s("eventQuery"),
  s("presenter"),
  s("presenterPresentation"),
  s("tool")
]), Ri = z([s("en-au"), s("en-gb"), s("en-us"), s("es-es")]), ji = E(Ri, p()), Mi = A({
  id: p(),
  color: Ni,
  label: p()
}), Fi = A({
  id: p(),
  label: E(p(), p()),
  description: E(p(), p()),
  firstCreatedAt: O().optional(),
  icon: p().optional(),
  iconDark: p().optional(),
  lastUpdatedAt: O().optional(),
  status: Mi.nullable().optional(),
  statusId: Di,
  typeId: Pi
}), Ui = z([s("app"), s("engine"), s("connector"), s("context"), s("presenter"), s("tool")]), Li = A({
  id: p(),
  label: p()
}), Vi = A({
  activeConnectionCount: O().optional(),
  canDescribe: ci().optional(),
  id: p().optional(),
  authMethodId: z([s("apiKey"), s("disabled"), s("oAuth2"), s("none")]),
  label: ji.optional(),
  maxConnectionCount: O().optional(),
  params: D(E(p(), p())).optional()
}), Gi = z([s("application"), s("curatedDataset"), s("database"), s("fileStore")]), Bi = z([
  s("abortOperation"),
  s("authenticateConnection"),
  s("createObject"),
  s("describeConnection"),
  s("dropObject"),
  s("findObject"),
  s("getRecord"),
  s("listNodes"),
  s("previewObject"),
  s("removeRecords"),
  s("retrieveRecords"),
  s("upsertRecords")
]), Wi = z([s("bidirectional"), s("destination"), s("source"), s("unknown")]), Ji = Fi.extend({
  typeId: Ui,
  version: p()
}), bc = Ji.extend({
  category: Li.optional(),
  categoryId: Gi,
  implementations: E(p(), Vi),
  operations: D(Bi),
  typeId: s("connector"),
  usageId: Wi,
  vendorAccountURL: p().nullable().optional(),
  vendorDocumentationURL: p().nullable().optional(),
  vendorHomeURL: p().nullable().optional()
}), Ki = z([s("amber"), s("green"), s("red"), s("other")]), Xi = z([
  s("alpha"),
  s("beta"),
  s("generalAvailability"),
  s("notApplicable"),
  s("preAlpha"),
  s("proposed"),
  s("releaseCandidate"),
  s("unavailable"),
  s("underReview")
]), Hi = z([
  s("app"),
  s("connector"),
  s("connectorConnection"),
  s("context"),
  s("contextModelGroup"),
  s("contextModel"),
  s("contextModelDimensionGroup"),
  s("contextModelDimension"),
  s("contextModelDimensionHierarchy"),
  s("contextModelEntityGroup"),
  s("contextModelEntity"),
  s("contextModelEntityDataItem"),
  s("contextModelEntityEvent"),
  s("contextModelEntityPrimaryMeasure"),
  s("contextModelSecondaryMeasureGroup"),
  s("contextModelSecondaryMeasure"),
  s("dataView"),
  s("dimension"),
  s("engine"),
  s("eventQuery"),
  s("presenter"),
  s("presenterPresentation"),
  s("tool")
]), Ve = O(), Yi = A({
  id: p(),
  color: Ki,
  label: p()
}), qi = A({
  id: p(),
  label: E(p(), p()),
  description: E(p(), p()),
  icon: p().optional(),
  iconDark: p().optional(),
  order: O(),
  path: p()
}), ht = A({
  id: p(),
  label: E(p(), p()),
  description: E(p(), p()),
  firstCreatedAt: Ve.optional(),
  icon: p().optional(),
  iconDark: p().optional(),
  lastUpdatedAt: Ve.optional(),
  status: Yi.optional(),
  statusId: Xi,
  typeId: Hi
}), Qi = z([s("app"), s("engine"), s("connector"), s("context"), s("presenter"), s("tool")]), ec = ht.extend({
  typeId: Qi,
  version: p()
}), tc = ht.extend({
  modelRefs: D(qi),
  order: O()
}), nc = s("list"), wc = ec.extend({
  models: D(tc),
  operations: D(nc),
  typeId: s("context")
}), rc = z([s("amber"), s("green"), s("red"), s("other")]), oc = z([s("alpha"), s("beta"), s("generalAvailability"), s("notApplicable"), s("preAlpha"), s("proposed"), s("releaseCandidate"), s("unavailable"), s("underReview")]), ic = z([s("app"), s("connector"), s("connectorConnection"), s("context"), s("contextModelGroup"), s("contextModel"), s("contextModelDimensionGroup"), s("contextModelDimension"), s("contextModelDimensionHierarchy"), s("contextModelEntityGroup"), s("contextModelEntity"), s("contextModelEntityDataItem"), s("contextModelEntityEvent"), s("contextModelEntityPrimaryMeasure"), s("contextModelSecondaryMeasureGroup"), s("contextModelSecondaryMeasure"), s("dataView"), s("dimension"), s("engine"), s("eventQuery"), s("presenter"), s("presenterPresentation"), s("tool")]), Ge = O(), cc = A({
  id: p(),
  color: rc,
  label: p()
}), sc = A({
  id: p(),
  label: E(p(), p()),
  description: E(p(), p()),
  icon: p().optional(),
  iconDark: p().optional(),
  order: O(),
  path: p()
}), ac = A({
  id: p(),
  label: E(p(), p()),
  description: E(p(), p()),
  firstCreatedAt: Ge.optional(),
  icon: p().optional(),
  iconDark: p().optional(),
  lastUpdatedAt: Ge.optional(),
  status: cc.optional(),
  statusId: oc,
  typeId: ic
}), uc = z([s("app"), s("engine"), s("connector"), s("context"), s("presenter"), s("tool")]), lc = ac.extend({
  typeId: uc,
  version: p()
}), dc = z([s("list"), s("render"), s("setColorMode")]), zc = lc.extend({
  presentations: D(sc),
  operations: D(dc),
  typeId: s("presenter")
});
function kc() {
  function e(t, n, r) {
    r.textContent = "Cytoscape.js diagram goes here...";
  }
  return { render: e };
}
function $c() {
  function e(t, n) {
    console.log(1111, t), console.log(2222, n), console.log(3333, n.childNodes), console.log(4444, n.children);
  }
  return { render: e };
}
const yc = 0, Zc = (e) => e, Ec = () => Date.now();
class we extends Error {
  locator;
  constructor(t, n, r) {
    super(t, r), this.name = "DataPosError", this.locator = n, Error.captureStackTrace?.(this, new.target);
  }
}
class B extends we {
  constructor(t, n, r) {
    super(t, n, r), this.name = "ApplicationError";
  }
}
class Ic extends B {
  constructor(t, n, r) {
    super(t, n, r), this.name = "APIError";
  }
}
class Sc extends B {
  constructor(t, n, r) {
    super(t, n, r), this.name = "EngineError";
  }
}
class mt extends B {
  body;
  constructor(t, n, r, o) {
    super(t, n, o), this.name = "FetchError", this.body = r;
  }
}
class pc extends B {
  componentName;
  info;
  constructor(t, n, r, o, i) {
    super(t, n, i), this.name = "VueHandledError", this.info = r, this.componentName = o;
  }
}
class xc extends B {
  constructor(t, n, r) {
    super(t, n, r), this.name = "WindowHandledRuntimeError";
  }
}
class Ac extends B {
  constructor(t, n, r) {
    super(t, n, r), this.name = "WindowHandledPromiseRejectionError";
  }
}
class Tc extends we {
  constructor(t, n, r) {
    super(t, n, r), this.name = "OperationalError";
  }
}
async function Oc(e, t, n) {
  const r = `${t} Response status '${e.status}${e.statusText ? ` - ${e.statusText}` : ""}' received.`, o = await e.text();
  return new mt(r, n, o);
}
function Cc(e) {
  return e.map((t) => t.message).join(" ");
}
function Nc(e, t = "Unknown error.") {
  if (e instanceof Error) return e;
  if (typeof e == "string") return new Error(e);
  try {
    return new Error(JSON.stringify(e ?? t));
  } catch {
    return new Error(t);
  }
}
function Dc(e) {
  const t = /* @__PURE__ */ new Set(), n = [];
  let r = e;
  for (; r && !t.has(r); ) {
    t.add(r);
    let o;
    if (r instanceof mt)
      o = { body: r.body, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof pc)
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
const gt = "en-US", ne = {}, Pc = (e) => {
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
}, Rc = (e) => {
  if (e) {
    const t = e.lastIndexOf("/"), n = e.lastIndexOf(".", t > -1 ? t : e.length);
    return n > -1 ? e.substring(0, n) : e;
  }
}, jc = (e) => {
  if (e) {
    const t = e.lastIndexOf(".");
    if (t > -1) return e.substring(t + 1);
  }
}, I = (e, t = 2, n = t, r = gt) => {
  if (e == null) return "";
  const o = `${r}decimal${t}.${n}`;
  let i = ne[o];
  return i || (i = new Intl.NumberFormat(r, {
    localeMatcher: "best fit",
    maximumFractionDigits: t,
    minimumFractionDigits: n,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), ne[o] = i), i.format(e);
}, Mc = (e) => e == null ? "" : e < 1e3 ? re(e) : e < 1e6 ? `${I(e / 1e3, 2, 0)}K` : e < 1e9 ? `${I(e / 1e6, 2, 0)}M` : e < 1e12 ? `${I(e / 1e9, 2, 0)}B` : `${I(e / 1e12, 2, 0)}T`, Fc = (e) => e == null ? "" : e === 1 ? "1 byte" : e < 1024 ? `${re(e)} bytes` : e < 1048576 ? `${I(e / 1024, 2, 0)} KB` : e < 1073741824 ? `${I(e / 1048576, 2, 0)} MB` : e < 1099511627776 ? `${I(e / 1073741824, 2, 0)} GB` : `${I(e / 1099511627776, 2, 0)} TB`, Uc = (e) => e == null ? "" : e < 1e3 ? `${re(e)} ms` : e === 1e3 ? `${re(e)} sec` : e < 6e4 ? `${I(e / 1e3, 2, 0)} secs` : e === 6e4 ? "1 min" : e < 36e5 ? `${I(e / 6e4, 2, 0)} mins` : e === 36e5 ? "1 hr" : e < 864e5 ? `${I(e / 36e5, 2, 0)} hrs` : e === 864e5 ? "1 day" : `${I(e / 864e5, 2, 0)} days`, re = (e, t = gt) => {
  if (e == null) return "";
  const n = `${t}decimal0.0`;
  let r = ne[n];
  return r || (r = new Intl.NumberFormat(t, {
    localeMatcher: "best fit",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), ne[n] = r), r.format(e);
}, Lc = (e) => {
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
}, fc = [
  { id: "dtv", label: { "en-gb": "Delimited Text" } },
  { id: "e/e", label: { "en-gb": "Entity/Event" } },
  { id: "jsonArray", label: { "en-gb": "JSON Array" } },
  { id: "spss", label: { "en-gb": "SPSS" } },
  { id: "xls", label: { "en-gb": "XLS" } },
  { id: "xlsx", label: { "en-gb": "XLSX" } },
  { id: "xml", label: { "en-gb": "XML" } }
], Vc = (e = P) => {
  const t = [];
  for (const n of fc) t.push({ ...n, label: n.label[e] || n.label[P] || n.id });
  return t;
}, hc = [
  { id: `
`, label: { "en-gb": "Newline" } },
  { id: "\r", label: { "en-gb": "Carriage Return" } },
  { id: `\r
`, label: { "en-gb": "Carriage Return/Newline" } }
], Gc = (e = P) => {
  const t = [];
  for (const n of hc)
    t.push({ ...n, label: n.label[e] || n.label[P] || n.id });
  return t;
}, mc = [
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
], Bc = (e = P) => {
  const t = [];
  for (const n of mc)
    t.push({ ...n, label: n.label[e] || n.label[P] || n.id });
  return t;
}, gc = [
  { id: "alpha", color: "red", label: { "en-gb": "alpha" } },
  { id: "beta", color: "amber", label: { "en-gb": "beta" } },
  { id: "generalAvailability", color: "green", label: { "en-gb": "" } },
  { id: "notApplicable", color: "green", label: { "en-gb": "not-applicable" } },
  { id: "preAlpha", color: "red", label: { "en-gb": "pre-alpha" } },
  { id: "proposed", color: "other", label: { "en-gb": "proposed" } },
  { id: "releaseCandidate", color: "green", label: { "en-gb": "release-candidate" } },
  { id: "unavailable", color: "other", label: { "en-gb": "unavailable" } },
  { id: "underReview", color: "other", label: { "en-gb": "under-review" } }
], Wc = (e, t = P) => {
  const n = gc.find((r) => r.id === e);
  return n ? { ...n, label: n.label[t] || n.label[P] || e } : { id: e, color: "other", label: e };
}, P = "en-gb";
export {
  Ic as APIError,
  B as ApplicationError,
  _c as CONNECTOR_DESTINATION_OPERATIONS,
  vc as CONNECTOR_SOURCE_OPERATIONS,
  P as DEFAULT_LOCALE_CODE,
  yc as DefaultTimestamp,
  Sc as EngineError,
  mt as FetchError,
  Tc as OperationalError,
  pc as VueError,
  Ac as WindowPromiseRejectionError,
  xc as WindowRuntimeError,
  Oc as buildFetchError,
  Cc as concatenateSerialisedErrorMessages,
  bc as connectorConfigSchema,
  wc as contextConfigSchema,
  Zc as convertMillisecondsToTimestamp,
  Pc as convertODataTypeIdToUsageTypeId,
  jc as extractExtensionFromPath,
  Rc as extractNameFromPath,
  I as formatNumberAsDecimalNumber,
  Uc as formatNumberAsDuration,
  Mc as formatNumberAsSize,
  Fc as formatNumberAsStorageSize,
  re as formatNumberAsWholeNumber,
  Wc as getComponentStatus,
  Ec as getCurrentTimestamp,
  Vc as getDataFormats,
  Gc as getRecordDelimiters,
  Bc as getValueDelimiters,
  Lc as lookupMimeTypeForExtension,
  Nc as normalizeToError,
  zc as presenterConfigSchema,
  Dc as serialiseError,
  kc as useCytoscapeJS,
  $c as useDataTable
};
