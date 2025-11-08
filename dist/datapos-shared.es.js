const us = ["createObject", "dropObject", "removeRecords", "upsertRecords"], ls = ["findObject", "getRecord", "listNodes", "previewObject", "retrieveRecords"];
function i(e, t, n) {
  function r(c, l) {
    var u;
    Object.defineProperty(c, "_zod", {
      value: c._zod ?? {},
      enumerable: !1
    }), (u = c._zod).traits ?? (u.traits = /* @__PURE__ */ new Set()), c._zod.traits.add(e), t(c, l);
    for (const p in a.prototype)
      p in c || Object.defineProperty(c, p, { value: a.prototype[p].bind(c) });
    c._zod.constr = a, c._zod.def = l;
  }
  const o = n?.Parent ?? Object;
  class s extends o {
  }
  Object.defineProperty(s, "name", { value: e });
  function a(c) {
    var l;
    const u = n?.Parent ? new s() : this;
    r(u, c), (l = u._zod).deferred ?? (l.deferred = []);
    for (const p of u._zod.deferred)
      p();
    return u;
  }
  return Object.defineProperty(a, "init", { value: r }), Object.defineProperty(a, Symbol.hasInstance, {
    value: (c) => n?.Parent && c instanceof n.Parent ? !0 : c?._zod?.traits?.has(e)
  }), Object.defineProperty(a, "name", { value: e }), a;
}
class R extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class Re extends Error {
  constructor(t) {
    super(`Encountered unidirectional transform during encode: ${t}`), this.name = "ZodEncodeError";
  }
}
const je = {};
function T(e) {
  return je;
}
function st(e) {
  const t = Object.values(e).filter((r) => typeof r == "number");
  return Object.entries(e).filter(([r, o]) => t.indexOf(+r) === -1).map(([r, o]) => o);
}
function re(e, t) {
  return typeof t == "bigint" ? t.toString() : t;
}
function ie(e) {
  return {
    get value() {
      {
        const t = e();
        return Object.defineProperty(this, "value", { value: t }), t;
      }
    }
  };
}
function ce(e) {
  return e == null;
}
function ue(e) {
  const t = e.startsWith("^") ? 1 : 0, n = e.endsWith("$") ? e.length - 1 : e.length;
  return e.slice(t, n);
}
const _e = Symbol("evaluating");
function h(e, t, n) {
  let r;
  Object.defineProperty(e, t, {
    get() {
      if (r !== _e)
        return r === void 0 && (r = _e, r = n()), r;
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
function S(e, t, n) {
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
function ve(e) {
  return JSON.stringify(e);
}
const Ce = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {
};
function J(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
const at = ie(() => {
  if (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))
    return !1;
  try {
    const e = Function;
    return new e(""), !0;
  } catch {
    return !1;
  }
});
function N(e) {
  if (J(e) === !1)
    return !1;
  const t = e.constructor;
  if (t === void 0)
    return !0;
  const n = t.prototype;
  return !(J(n) === !1 || Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") === !1);
}
function Ue(e) {
  return N(e) ? { ...e } : Array.isArray(e) ? [...e] : e;
}
const it = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function q(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function A(e, t, n) {
  const r = new e._zod.constr(t ?? e._zod.def);
  return (!t || n?.parent) && (r._zod.parent = e), r;
}
function d(e) {
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
function ct(e) {
  return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
function ut(e, t) {
  const n = e._zod.def, r = D(e._zod.def, {
    get shape() {
      const o = {};
      for (const s in t) {
        if (!(s in n.shape))
          throw new Error(`Unrecognized key: "${s}"`);
        t[s] && (o[s] = n.shape[s]);
      }
      return S(this, "shape", o), o;
    },
    checks: []
  });
  return A(e, r);
}
function lt(e, t) {
  const n = e._zod.def, r = D(e._zod.def, {
    get shape() {
      const o = { ...e._zod.def.shape };
      for (const s in t) {
        if (!(s in n.shape))
          throw new Error(`Unrecognized key: "${s}"`);
        t[s] && delete o[s];
      }
      return S(this, "shape", o), o;
    },
    checks: []
  });
  return A(e, r);
}
function dt(e, t) {
  if (!N(t))
    throw new Error("Invalid input to extend: expected a plain object");
  const n = e._zod.def.checks;
  if (n && n.length > 0)
    throw new Error("Object schemas containing refinements cannot be extended. Use `.safeExtend()` instead.");
  const o = D(e._zod.def, {
    get shape() {
      const s = { ...e._zod.def.shape, ...t };
      return S(this, "shape", s), s;
    },
    checks: []
  });
  return A(e, o);
}
function pt(e, t) {
  if (!N(t))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const n = {
    ...e._zod.def,
    get shape() {
      const r = { ...e._zod.def.shape, ...t };
      return S(this, "shape", r), r;
    },
    checks: e._zod.def.checks
  };
  return A(e, n);
}
function ft(e, t) {
  const n = D(e._zod.def, {
    get shape() {
      const r = { ...e._zod.def.shape, ...t._zod.def.shape };
      return S(this, "shape", r), r;
    },
    get catchall() {
      return t._zod.def.catchall;
    },
    checks: []
    // delete existing checks
  });
  return A(e, n);
}
function ht(e, t, n) {
  const r = D(t._zod.def, {
    get shape() {
      const o = t._zod.def.shape, s = { ...o };
      if (n)
        for (const a in n) {
          if (!(a in o))
            throw new Error(`Unrecognized key: "${a}"`);
          n[a] && (s[a] = e ? new e({
            type: "optional",
            innerType: o[a]
          }) : o[a]);
        }
      else
        for (const a in o)
          s[a] = e ? new e({
            type: "optional",
            innerType: o[a]
          }) : o[a];
      return S(this, "shape", s), s;
    },
    checks: []
  });
  return A(t, r);
}
function mt(e, t, n) {
  const r = D(t._zod.def, {
    get shape() {
      const o = t._zod.def.shape, s = { ...o };
      if (n)
        for (const a in n) {
          if (!(a in s))
            throw new Error(`Unrecognized key: "${a}"`);
          n[a] && (s[a] = new e({
            type: "nonoptional",
            innerType: o[a]
          }));
        }
      else
        for (const a in o)
          s[a] = new e({
            type: "nonoptional",
            innerType: o[a]
          });
      return S(this, "shape", s), s;
    },
    checks: []
  });
  return A(t, r);
}
function x(e, t = 0) {
  if (e.aborted === !0)
    return !0;
  for (let n = t; n < e.issues.length; n++)
    if (e.issues[n]?.continue !== !0)
      return !0;
  return !1;
}
function Ne(e, t) {
  return t.map((n) => {
    var r;
    return (r = n).path ?? (r.path = []), n.path.unshift(e), n;
  });
}
function M(e) {
  return typeof e == "string" ? e : e?.message;
}
function O(e, t, n) {
  const r = { ...e, path: e.path ?? [] };
  if (!e.message) {
    const o = M(e.inst?._zod.def?.error?.(e)) ?? M(t?.error?.(e)) ?? M(n.customError?.(e)) ?? M(n.localeError?.(e)) ?? "Invalid input";
    r.message = o;
  }
  return delete r.inst, delete r.continue, t?.reportInput || delete r.input, r;
}
function le(e) {
  return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function F(...e) {
  const [t, n, r] = e;
  return typeof t == "string" ? {
    message: t,
    code: "custom",
    input: n,
    inst: r
  } : { ...t };
}
const Fe = (e, t) => {
  e.name = "$ZodError", Object.defineProperty(e, "_zod", {
    value: e._zod,
    enumerable: !1
  }), Object.defineProperty(e, "issues", {
    value: t,
    enumerable: !1
  }), e.message = JSON.stringify(t, re, 2), Object.defineProperty(e, "toString", {
    value: () => e.message,
    enumerable: !1
  });
}, Le = i("$ZodError", Fe), Me = i("$ZodError", Fe, { Parent: Error });
function gt(e, t = (n) => n.message) {
  const n = {}, r = [];
  for (const o of e.issues)
    o.path.length > 0 ? (n[o.path[0]] = n[o.path[0]] || [], n[o.path[0]].push(t(o))) : r.push(t(o));
  return { formErrors: r, fieldErrors: n };
}
function _t(e, t = (n) => n.message) {
  const n = { _errors: [] }, r = (o) => {
    for (const s of o.issues)
      if (s.code === "invalid_union" && s.errors.length)
        s.errors.map((a) => r({ issues: a }));
      else if (s.code === "invalid_key")
        r({ issues: s.issues });
      else if (s.code === "invalid_element")
        r({ issues: s.issues });
      else if (s.path.length === 0)
        n._errors.push(t(s));
      else {
        let a = n, c = 0;
        for (; c < s.path.length; ) {
          const l = s.path[c];
          c === s.path.length - 1 ? (a[l] = a[l] || { _errors: [] }, a[l]._errors.push(t(s))) : a[l] = a[l] || { _errors: [] }, a = a[l], c++;
        }
      }
  };
  return r(e), n;
}
const de = (e) => (t, n, r, o) => {
  const s = r ? Object.assign(r, { async: !1 }) : { async: !1 }, a = t._zod.run({ value: n, issues: [] }, s);
  if (a instanceof Promise)
    throw new R();
  if (a.issues.length) {
    const c = new (o?.Err ?? e)(a.issues.map((l) => O(l, s, T())));
    throw Ce(c, o?.callee), c;
  }
  return a.value;
}, pe = (e) => async (t, n, r, o) => {
  const s = r ? Object.assign(r, { async: !0 }) : { async: !0 };
  let a = t._zod.run({ value: n, issues: [] }, s);
  if (a instanceof Promise && (a = await a), a.issues.length) {
    const c = new (o?.Err ?? e)(a.issues.map((l) => O(l, s, T())));
    throw Ce(c, o?.callee), c;
  }
  return a.value;
}, Y = (e) => (t, n, r) => {
  const o = r ? { ...r, async: !1 } : { async: !1 }, s = t._zod.run({ value: n, issues: [] }, o);
  if (s instanceof Promise)
    throw new R();
  return s.issues.length ? {
    success: !1,
    error: new (e ?? Le)(s.issues.map((a) => O(a, o, T())))
  } : { success: !0, data: s.value };
}, vt = /* @__PURE__ */ Y(Me), Q = (e) => async (t, n, r) => {
  const o = r ? Object.assign(r, { async: !0 }) : { async: !0 };
  let s = t._zod.run({ value: n, issues: [] }, o);
  return s instanceof Promise && (s = await s), s.issues.length ? {
    success: !1,
    error: new e(s.issues.map((a) => O(a, o, T())))
  } : { success: !0, data: s.value };
}, bt = /* @__PURE__ */ Q(Me), wt = (e) => (t, n, r) => {
  const o = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return de(e)(t, n, o);
}, zt = (e) => (t, n, r) => de(e)(t, n, r), yt = (e) => async (t, n, r) => {
  const o = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return pe(e)(t, n, o);
}, kt = (e) => async (t, n, r) => pe(e)(t, n, r), $t = (e) => (t, n, r) => {
  const o = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return Y(e)(t, n, o);
}, Zt = (e) => (t, n, r) => Y(e)(t, n, r), Et = (e) => async (t, n, r) => {
  const o = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return Q(e)(t, n, o);
}, It = (e) => async (t, n, r) => Q(e)(t, n, r), At = /^[cC][^\s-]{8,}$/, Tt = /^[0-9a-z]+$/, Ot = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, St = /^[0-9a-vA-V]{20}$/, Dt = /^[A-Za-z0-9]{27}$/, xt = /^[a-zA-Z0-9_-]{21}$/, Pt = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Rt = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, be = (e) => e ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, jt = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, Ct = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function Ut() {
  return new RegExp(Ct, "u");
}
const Nt = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Ft = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, Lt = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, Mt = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Wt = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, We = /^[A-Za-z0-9_-]*$/, Vt = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/, Bt = /^\+(?:[0-9]){6,14}[0-9]$/, Ve = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", Jt = /* @__PURE__ */ new RegExp(`^${Ve}$`);
function Be(e) {
  const t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function Kt(e) {
  return new RegExp(`^${Be(e)}$`);
}
function Ht(e) {
  const t = Be({ precision: e.precision }), n = ["Z"];
  e.local && n.push(""), e.offset && n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const r = `${t}(?:${n.join("|")})`;
  return new RegExp(`^${Ve}T(?:${r})$`);
}
const Gt = (e) => {
  const t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${t}$`);
}, Xt = /^[^A-Z]*$/, qt = /^[^a-z]*$/, Z = /* @__PURE__ */ i("$ZodCheck", (e, t) => {
  var n;
  e._zod ?? (e._zod = {}), e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), Yt = /* @__PURE__ */ i("$ZodCheckMaxLength", (e, t) => {
  var n;
  Z.init(e, t), (n = e._zod.def).when ?? (n.when = (r) => {
    const o = r.value;
    return !ce(o) && o.length !== void 0;
  }), e._zod.onattach.push((r) => {
    const o = r._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    t.maximum < o && (r._zod.bag.maximum = t.maximum);
  }), e._zod.check = (r) => {
    const o = r.value;
    if (o.length <= t.maximum)
      return;
    const a = le(o);
    r.issues.push({
      origin: a,
      code: "too_big",
      maximum: t.maximum,
      inclusive: !0,
      input: o,
      inst: e,
      continue: !t.abort
    });
  };
}), Qt = /* @__PURE__ */ i("$ZodCheckMinLength", (e, t) => {
  var n;
  Z.init(e, t), (n = e._zod.def).when ?? (n.when = (r) => {
    const o = r.value;
    return !ce(o) && o.length !== void 0;
  }), e._zod.onattach.push((r) => {
    const o = r._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    t.minimum > o && (r._zod.bag.minimum = t.minimum);
  }), e._zod.check = (r) => {
    const o = r.value;
    if (o.length >= t.minimum)
      return;
    const a = le(o);
    r.issues.push({
      origin: a,
      code: "too_small",
      minimum: t.minimum,
      inclusive: !0,
      input: o,
      inst: e,
      continue: !t.abort
    });
  };
}), en = /* @__PURE__ */ i("$ZodCheckLengthEquals", (e, t) => {
  var n;
  Z.init(e, t), (n = e._zod.def).when ?? (n.when = (r) => {
    const o = r.value;
    return !ce(o) && o.length !== void 0;
  }), e._zod.onattach.push((r) => {
    const o = r._zod.bag;
    o.minimum = t.length, o.maximum = t.length, o.length = t.length;
  }), e._zod.check = (r) => {
    const o = r.value, s = o.length;
    if (s === t.length)
      return;
    const a = le(o), c = s > t.length;
    r.issues.push({
      origin: a,
      ...c ? { code: "too_big", maximum: t.length } : { code: "too_small", minimum: t.length },
      inclusive: !0,
      exact: !0,
      input: r.value,
      inst: e,
      continue: !t.abort
    });
  };
}), ee = /* @__PURE__ */ i("$ZodCheckStringFormat", (e, t) => {
  var n, r;
  Z.init(e, t), e._zod.onattach.push((o) => {
    const s = o._zod.bag;
    s.format = t.format, t.pattern && (s.patterns ?? (s.patterns = /* @__PURE__ */ new Set()), s.patterns.add(t.pattern));
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
}), tn = /* @__PURE__ */ i("$ZodCheckRegex", (e, t) => {
  ee.init(e, t), e._zod.check = (n) => {
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
}), nn = /* @__PURE__ */ i("$ZodCheckLowerCase", (e, t) => {
  t.pattern ?? (t.pattern = Xt), ee.init(e, t);
}), rn = /* @__PURE__ */ i("$ZodCheckUpperCase", (e, t) => {
  t.pattern ?? (t.pattern = qt), ee.init(e, t);
}), on = /* @__PURE__ */ i("$ZodCheckIncludes", (e, t) => {
  Z.init(e, t);
  const n = q(t.includes), r = new RegExp(typeof t.position == "number" ? `^.{${t.position}}${n}` : n);
  t.pattern = r, e._zod.onattach.push((o) => {
    const s = o._zod.bag;
    s.patterns ?? (s.patterns = /* @__PURE__ */ new Set()), s.patterns.add(r);
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
}), sn = /* @__PURE__ */ i("$ZodCheckStartsWith", (e, t) => {
  Z.init(e, t);
  const n = new RegExp(`^${q(t.prefix)}.*`);
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
}), an = /* @__PURE__ */ i("$ZodCheckEndsWith", (e, t) => {
  Z.init(e, t);
  const n = new RegExp(`.*${q(t.suffix)}$`);
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
}), cn = /* @__PURE__ */ i("$ZodCheckOverwrite", (e, t) => {
  Z.init(e, t), e._zod.check = (n) => {
    n.value = t.tx(n.value);
  };
});
class un {
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
`).filter((a) => a), o = Math.min(...r.map((a) => a.length - a.trimStart().length)), s = r.map((a) => a.slice(o)).map((a) => " ".repeat(this.indent * 2) + a);
    for (const a of s)
      this.content.push(a);
  }
  compile() {
    const t = Function, n = this?.args, o = [...(this?.content ?? [""]).map((s) => `  ${s}`)];
    return new t(...n, o.join(`
`));
  }
}
const ln = {
  major: 4,
  minor: 1,
  patch: 12
}, b = /* @__PURE__ */ i("$ZodType", (e, t) => {
  var n;
  e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = ln;
  const r = [...e._zod.def.checks ?? []];
  e._zod.traits.has("$ZodCheck") && r.unshift(e);
  for (const o of r)
    for (const s of o._zod.onattach)
      s(e);
  if (r.length === 0)
    (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
      e._zod.run = e._zod.parse;
    });
  else {
    const o = (a, c, l) => {
      let u = x(a), p;
      for (const g of c) {
        if (g._zod.def.when) {
          if (!g._zod.def.when(a))
            continue;
        } else if (u)
          continue;
        const f = a.issues.length, _ = g._zod.check(a);
        if (_ instanceof Promise && l?.async === !1)
          throw new R();
        if (p || _ instanceof Promise)
          p = (p ?? Promise.resolve()).then(async () => {
            await _, a.issues.length !== f && (u || (u = x(a, f)));
          });
        else {
          if (a.issues.length === f)
            continue;
          u || (u = x(a, f));
        }
      }
      return p ? p.then(() => a) : a;
    }, s = (a, c, l) => {
      if (x(a))
        return a.aborted = !0, a;
      const u = o(c, r, l);
      if (u instanceof Promise) {
        if (l.async === !1)
          throw new R();
        return u.then((p) => e._zod.parse(p, l));
      }
      return e._zod.parse(u, l);
    };
    e._zod.run = (a, c) => {
      if (c.skipChecks)
        return e._zod.parse(a, c);
      if (c.direction === "backward") {
        const u = e._zod.parse({ value: a.value, issues: [] }, { ...c, skipChecks: !0 });
        return u instanceof Promise ? u.then((p) => s(p, a, c)) : s(u, a, c);
      }
      const l = e._zod.parse(a, c);
      if (l instanceof Promise) {
        if (c.async === !1)
          throw new R();
        return l.then((u) => o(u, r, c));
      }
      return o(l, r, c);
    };
  }
  e["~standard"] = {
    validate: (o) => {
      try {
        const s = vt(e, o);
        return s.success ? { value: s.data } : { issues: s.error?.issues };
      } catch {
        return bt(e, o).then((a) => a.success ? { value: a.data } : { issues: a.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  };
}), fe = /* @__PURE__ */ i("$ZodString", (e, t) => {
  b.init(e, t), e._zod.pattern = [...e?._zod.bag?.patterns ?? []].pop() ?? Gt(e._zod.bag), e._zod.parse = (n, r) => {
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
}), m = /* @__PURE__ */ i("$ZodStringFormat", (e, t) => {
  ee.init(e, t), fe.init(e, t);
}), dn = /* @__PURE__ */ i("$ZodGUID", (e, t) => {
  t.pattern ?? (t.pattern = Rt), m.init(e, t);
}), pn = /* @__PURE__ */ i("$ZodUUID", (e, t) => {
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
    t.pattern ?? (t.pattern = be(r));
  } else
    t.pattern ?? (t.pattern = be());
  m.init(e, t);
}), fn = /* @__PURE__ */ i("$ZodEmail", (e, t) => {
  t.pattern ?? (t.pattern = jt), m.init(e, t);
}), hn = /* @__PURE__ */ i("$ZodURL", (e, t) => {
  m.init(e, t), e._zod.check = (n) => {
    try {
      const r = n.value.trim(), o = new URL(r);
      t.hostname && (t.hostname.lastIndex = 0, t.hostname.test(o.hostname) || n.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid hostname",
        pattern: Vt.source,
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
}), mn = /* @__PURE__ */ i("$ZodEmoji", (e, t) => {
  t.pattern ?? (t.pattern = Ut()), m.init(e, t);
}), gn = /* @__PURE__ */ i("$ZodNanoID", (e, t) => {
  t.pattern ?? (t.pattern = xt), m.init(e, t);
}), _n = /* @__PURE__ */ i("$ZodCUID", (e, t) => {
  t.pattern ?? (t.pattern = At), m.init(e, t);
}), vn = /* @__PURE__ */ i("$ZodCUID2", (e, t) => {
  t.pattern ?? (t.pattern = Tt), m.init(e, t);
}), bn = /* @__PURE__ */ i("$ZodULID", (e, t) => {
  t.pattern ?? (t.pattern = Ot), m.init(e, t);
}), wn = /* @__PURE__ */ i("$ZodXID", (e, t) => {
  t.pattern ?? (t.pattern = St), m.init(e, t);
}), zn = /* @__PURE__ */ i("$ZodKSUID", (e, t) => {
  t.pattern ?? (t.pattern = Dt), m.init(e, t);
}), yn = /* @__PURE__ */ i("$ZodISODateTime", (e, t) => {
  t.pattern ?? (t.pattern = Ht(t)), m.init(e, t);
}), kn = /* @__PURE__ */ i("$ZodISODate", (e, t) => {
  t.pattern ?? (t.pattern = Jt), m.init(e, t);
}), $n = /* @__PURE__ */ i("$ZodISOTime", (e, t) => {
  t.pattern ?? (t.pattern = Kt(t)), m.init(e, t);
}), Zn = /* @__PURE__ */ i("$ZodISODuration", (e, t) => {
  t.pattern ?? (t.pattern = Pt), m.init(e, t);
}), En = /* @__PURE__ */ i("$ZodIPv4", (e, t) => {
  t.pattern ?? (t.pattern = Nt), m.init(e, t), e._zod.onattach.push((n) => {
    const r = n._zod.bag;
    r.format = "ipv4";
  });
}), In = /* @__PURE__ */ i("$ZodIPv6", (e, t) => {
  t.pattern ?? (t.pattern = Ft), m.init(e, t), e._zod.onattach.push((n) => {
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
}), An = /* @__PURE__ */ i("$ZodCIDRv4", (e, t) => {
  t.pattern ?? (t.pattern = Lt), m.init(e, t);
}), Tn = /* @__PURE__ */ i("$ZodCIDRv6", (e, t) => {
  t.pattern ?? (t.pattern = Mt), m.init(e, t), e._zod.check = (n) => {
    const r = n.value.split("/");
    try {
      if (r.length !== 2)
        throw new Error();
      const [o, s] = r;
      if (!s)
        throw new Error();
      const a = Number(s);
      if (`${a}` !== s)
        throw new Error();
      if (a < 0 || a > 128)
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
function Je(e) {
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
const On = /* @__PURE__ */ i("$ZodBase64", (e, t) => {
  t.pattern ?? (t.pattern = Wt), m.init(e, t), e._zod.onattach.push((n) => {
    n._zod.bag.contentEncoding = "base64";
  }), e._zod.check = (n) => {
    Je(n.value) || n.issues.push({
      code: "invalid_format",
      format: "base64",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
});
function Sn(e) {
  if (!We.test(e))
    return !1;
  const t = e.replace(/[-_]/g, (r) => r === "-" ? "+" : "/"), n = t.padEnd(Math.ceil(t.length / 4) * 4, "=");
  return Je(n);
}
const Dn = /* @__PURE__ */ i("$ZodBase64URL", (e, t) => {
  t.pattern ?? (t.pattern = We), m.init(e, t), e._zod.onattach.push((n) => {
    n._zod.bag.contentEncoding = "base64url";
  }), e._zod.check = (n) => {
    Sn(n.value) || n.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), xn = /* @__PURE__ */ i("$ZodE164", (e, t) => {
  t.pattern ?? (t.pattern = Bt), m.init(e, t);
});
function Pn(e, t = null) {
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
const Rn = /* @__PURE__ */ i("$ZodJWT", (e, t) => {
  m.init(e, t), e._zod.check = (n) => {
    Pn(n.value, t.alg) || n.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), jn = /* @__PURE__ */ i("$ZodUnknown", (e, t) => {
  b.init(e, t), e._zod.parse = (n) => n;
}), Cn = /* @__PURE__ */ i("$ZodNever", (e, t) => {
  b.init(e, t), e._zod.parse = (n, r) => (n.issues.push({
    expected: "never",
    code: "invalid_type",
    input: n.value,
    inst: e
  }), n);
});
function we(e, t, n) {
  e.issues.length && t.issues.push(...Ne(n, e.issues)), t.value[n] = e.value;
}
const Un = /* @__PURE__ */ i("$ZodArray", (e, t) => {
  b.init(e, t), e._zod.parse = (n, r) => {
    const o = n.value;
    if (!Array.isArray(o))
      return n.issues.push({
        expected: "array",
        code: "invalid_type",
        input: o,
        inst: e
      }), n;
    n.value = Array(o.length);
    const s = [];
    for (let a = 0; a < o.length; a++) {
      const c = o[a], l = t.element._zod.run({
        value: c,
        issues: []
      }, r);
      l instanceof Promise ? s.push(l.then((u) => we(u, n, a))) : we(l, n, a);
    }
    return s.length ? Promise.all(s).then(() => n) : n;
  };
});
function K(e, t, n, r) {
  e.issues.length && t.issues.push(...Ne(n, e.issues)), e.value === void 0 ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
}
function Ke(e) {
  const t = Object.keys(e.shape);
  for (const r of t)
    if (!e.shape?.[r]?._zod?.traits?.has("$ZodType"))
      throw new Error(`Invalid element at key "${r}": expected a Zod schema`);
  const n = ct(e.shape);
  return {
    ...e,
    keys: t,
    keySet: new Set(t),
    numKeys: t.length,
    optionalKeys: new Set(n)
  };
}
function He(e, t, n, r, o, s) {
  const a = [], c = o.keySet, l = o.catchall._zod, u = l.def.type;
  for (const p of Object.keys(t)) {
    if (c.has(p))
      continue;
    if (u === "never") {
      a.push(p);
      continue;
    }
    const g = l.run({ value: t[p], issues: [] }, r);
    g instanceof Promise ? e.push(g.then((f) => K(f, n, p, t))) : K(g, n, p, t);
  }
  return a.length && n.issues.push({
    code: "unrecognized_keys",
    keys: a,
    input: t,
    inst: s
  }), e.length ? Promise.all(e).then(() => n) : n;
}
const Nn = /* @__PURE__ */ i("$ZodObject", (e, t) => {
  if (b.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get) {
    const c = t.shape;
    Object.defineProperty(t, "shape", {
      get: () => {
        const l = { ...c };
        return Object.defineProperty(t, "shape", {
          value: l
        }), l;
      }
    });
  }
  const r = ie(() => Ke(t));
  h(e._zod, "propValues", () => {
    const c = t.shape, l = {};
    for (const u in c) {
      const p = c[u]._zod;
      if (p.values) {
        l[u] ?? (l[u] = /* @__PURE__ */ new Set());
        for (const g of p.values)
          l[u].add(g);
      }
    }
    return l;
  });
  const o = J, s = t.catchall;
  let a;
  e._zod.parse = (c, l) => {
    a ?? (a = r.value);
    const u = c.value;
    if (!o(u))
      return c.issues.push({
        expected: "object",
        code: "invalid_type",
        input: u,
        inst: e
      }), c;
    c.value = {};
    const p = [], g = a.shape;
    for (const f of a.keys) {
      const z = g[f]._zod.run({ value: u[f], issues: [] }, l);
      z instanceof Promise ? p.push(z.then((te) => K(te, c, f, u))) : K(z, c, f, u);
    }
    return s ? He(p, u, c, l, r.value, e) : p.length ? Promise.all(p).then(() => c) : c;
  };
}), Fn = /* @__PURE__ */ i("$ZodObjectJIT", (e, t) => {
  Nn.init(e, t);
  const n = e._zod.parse, r = ie(() => Ke(t)), o = (f) => {
    const _ = new un(["shape", "payload", "ctx"]), z = r.value, te = (E) => {
      const $ = ve(E);
      return `shape[${$}]._zod.run({ value: input[${$}], issues: [] }, ctx)`;
    };
    _.write("const input = payload.value;");
    const ge = /* @__PURE__ */ Object.create(null);
    let rt = 0;
    for (const E of z.keys)
      ge[E] = `key_${rt++}`;
    _.write("const newResult = {};");
    for (const E of z.keys) {
      const $ = ge[E], C = ve(E);
      _.write(`const ${$} = ${te(E)};`), _.write(`
        if (${$}.issues.length) {
          payload.issues = payload.issues.concat(${$}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${C}, ...iss.path] : [${C}]
          })));
        }
        
        
        if (${$}.value === undefined) {
          if (${C} in input) {
            newResult[${C}] = undefined;
          }
        } else {
          newResult[${C}] = ${$}.value;
        }
        
      `);
    }
    _.write("payload.value = newResult;"), _.write("return payload;");
    const ot = _.compile();
    return (E, $) => ot(f, E, $);
  };
  let s;
  const a = J, c = !je.jitless, u = c && at.value, p = t.catchall;
  let g;
  e._zod.parse = (f, _) => {
    g ?? (g = r.value);
    const z = f.value;
    return a(z) ? c && u && _?.async === !1 && _.jitless !== !0 ? (s || (s = o(t.shape)), f = s(f, _), p ? He([], z, f, _, g, e) : f) : n(f, _) : (f.issues.push({
      expected: "object",
      code: "invalid_type",
      input: z,
      inst: e
    }), f);
  };
});
function ze(e, t, n, r) {
  for (const s of e)
    if (s.issues.length === 0)
      return t.value = s.value, t;
  const o = e.filter((s) => !x(s));
  return o.length === 1 ? (t.value = o[0].value, o[0]) : (t.issues.push({
    code: "invalid_union",
    input: t.value,
    inst: n,
    errors: e.map((s) => s.issues.map((a) => O(a, r, T())))
  }), t);
}
const Ln = /* @__PURE__ */ i("$ZodUnion", (e, t) => {
  b.init(e, t), h(e._zod, "optin", () => t.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0), h(e._zod, "optout", () => t.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0), h(e._zod, "values", () => {
    if (t.options.every((o) => o._zod.values))
      return new Set(t.options.flatMap((o) => Array.from(o._zod.values)));
  }), h(e._zod, "pattern", () => {
    if (t.options.every((o) => o._zod.pattern)) {
      const o = t.options.map((s) => s._zod.pattern);
      return new RegExp(`^(${o.map((s) => ue(s.source)).join("|")})$`);
    }
  });
  const n = t.options.length === 1, r = t.options[0]._zod.run;
  e._zod.parse = (o, s) => {
    if (n)
      return r(o, s);
    let a = !1;
    const c = [];
    for (const l of t.options) {
      const u = l._zod.run({
        value: o.value,
        issues: []
      }, s);
      if (u instanceof Promise)
        c.push(u), a = !0;
      else {
        if (u.issues.length === 0)
          return u;
        c.push(u);
      }
    }
    return a ? Promise.all(c).then((l) => ze(l, o, e, s)) : ze(c, o, e, s);
  };
}), Mn = /* @__PURE__ */ i("$ZodIntersection", (e, t) => {
  b.init(e, t), e._zod.parse = (n, r) => {
    const o = n.value, s = t.left._zod.run({ value: o, issues: [] }, r), a = t.right._zod.run({ value: o, issues: [] }, r);
    return s instanceof Promise || a instanceof Promise ? Promise.all([s, a]).then(([l, u]) => ye(n, l, u)) : ye(n, s, a);
  };
});
function oe(e, t) {
  if (e === t)
    return { valid: !0, data: e };
  if (e instanceof Date && t instanceof Date && +e == +t)
    return { valid: !0, data: e };
  if (N(e) && N(t)) {
    const n = Object.keys(t), r = Object.keys(e).filter((s) => n.indexOf(s) !== -1), o = { ...e, ...t };
    for (const s of r) {
      const a = oe(e[s], t[s]);
      if (!a.valid)
        return {
          valid: !1,
          mergeErrorPath: [s, ...a.mergeErrorPath]
        };
      o[s] = a.data;
    }
    return { valid: !0, data: o };
  }
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length)
      return { valid: !1, mergeErrorPath: [] };
    const n = [];
    for (let r = 0; r < e.length; r++) {
      const o = e[r], s = t[r], a = oe(o, s);
      if (!a.valid)
        return {
          valid: !1,
          mergeErrorPath: [r, ...a.mergeErrorPath]
        };
      n.push(a.data);
    }
    return { valid: !0, data: n };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function ye(e, t, n) {
  if (t.issues.length && e.issues.push(...t.issues), n.issues.length && e.issues.push(...n.issues), x(e))
    return e;
  const r = oe(t.value, n.value);
  if (!r.valid)
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(r.mergeErrorPath)}`);
  return e.value = r.data, e;
}
const Wn = /* @__PURE__ */ i("$ZodEnum", (e, t) => {
  b.init(e, t);
  const n = st(t.entries), r = new Set(n);
  e._zod.values = r, e._zod.pattern = new RegExp(`^(${n.filter((o) => it.has(typeof o)).map((o) => typeof o == "string" ? q(o) : o.toString()).join("|")})$`), e._zod.parse = (o, s) => {
    const a = o.value;
    return r.has(a) || o.issues.push({
      code: "invalid_value",
      values: n,
      input: a,
      inst: e
    }), o;
  };
}), Vn = /* @__PURE__ */ i("$ZodTransform", (e, t) => {
  b.init(e, t), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      throw new Re(e.constructor.name);
    const o = t.transform(n.value, n);
    if (r.async)
      return (o instanceof Promise ? o : Promise.resolve(o)).then((a) => (n.value = a, n));
    if (o instanceof Promise)
      throw new R();
    return n.value = o, n;
  };
});
function ke(e, t) {
  return e.issues.length && t === void 0 ? { issues: [], value: void 0 } : e;
}
const Bn = /* @__PURE__ */ i("$ZodOptional", (e, t) => {
  b.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", h(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, void 0]) : void 0), h(e._zod, "pattern", () => {
    const n = t.innerType._zod.pattern;
    return n ? new RegExp(`^(${ue(n.source)})?$`) : void 0;
  }), e._zod.parse = (n, r) => {
    if (t.innerType._zod.optin === "optional") {
      const o = t.innerType._zod.run(n, r);
      return o instanceof Promise ? o.then((s) => ke(s, n.value)) : ke(o, n.value);
    }
    return n.value === void 0 ? n : t.innerType._zod.run(n, r);
  };
}), Jn = /* @__PURE__ */ i("$ZodNullable", (e, t) => {
  b.init(e, t), h(e._zod, "optin", () => t.innerType._zod.optin), h(e._zod, "optout", () => t.innerType._zod.optout), h(e._zod, "pattern", () => {
    const n = t.innerType._zod.pattern;
    return n ? new RegExp(`^(${ue(n.source)}|null)$`) : void 0;
  }), h(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, null]) : void 0), e._zod.parse = (n, r) => n.value === null ? n : t.innerType._zod.run(n, r);
}), Kn = /* @__PURE__ */ i("$ZodDefault", (e, t) => {
  b.init(e, t), e._zod.optin = "optional", h(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return t.innerType._zod.run(n, r);
    if (n.value === void 0)
      return n.value = t.defaultValue, n;
    const o = t.innerType._zod.run(n, r);
    return o instanceof Promise ? o.then((s) => $e(s, t)) : $e(o, t);
  };
});
function $e(e, t) {
  return e.value === void 0 && (e.value = t.defaultValue), e;
}
const Hn = /* @__PURE__ */ i("$ZodPrefault", (e, t) => {
  b.init(e, t), e._zod.optin = "optional", h(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (n, r) => (r.direction === "backward" || n.value === void 0 && (n.value = t.defaultValue), t.innerType._zod.run(n, r));
}), Gn = /* @__PURE__ */ i("$ZodNonOptional", (e, t) => {
  b.init(e, t), h(e._zod, "values", () => {
    const n = t.innerType._zod.values;
    return n ? new Set([...n].filter((r) => r !== void 0)) : void 0;
  }), e._zod.parse = (n, r) => {
    const o = t.innerType._zod.run(n, r);
    return o instanceof Promise ? o.then((s) => Ze(s, e)) : Ze(o, e);
  };
});
function Ze(e, t) {
  return !e.issues.length && e.value === void 0 && e.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: e.value,
    inst: t
  }), e;
}
const Xn = /* @__PURE__ */ i("$ZodCatch", (e, t) => {
  b.init(e, t), h(e._zod, "optin", () => t.innerType._zod.optin), h(e._zod, "optout", () => t.innerType._zod.optout), h(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return t.innerType._zod.run(n, r);
    const o = t.innerType._zod.run(n, r);
    return o instanceof Promise ? o.then((s) => (n.value = s.value, s.issues.length && (n.value = t.catchValue({
      ...n,
      error: {
        issues: s.issues.map((a) => O(a, r, T()))
      },
      input: n.value
    }), n.issues = []), n)) : (n.value = o.value, o.issues.length && (n.value = t.catchValue({
      ...n,
      error: {
        issues: o.issues.map((s) => O(s, r, T()))
      },
      input: n.value
    }), n.issues = []), n);
  };
}), qn = /* @__PURE__ */ i("$ZodPipe", (e, t) => {
  b.init(e, t), h(e._zod, "values", () => t.in._zod.values), h(e._zod, "optin", () => t.in._zod.optin), h(e._zod, "optout", () => t.out._zod.optout), h(e._zod, "propValues", () => t.in._zod.propValues), e._zod.parse = (n, r) => {
    if (r.direction === "backward") {
      const s = t.out._zod.run(n, r);
      return s instanceof Promise ? s.then((a) => W(a, t.in, r)) : W(s, t.in, r);
    }
    const o = t.in._zod.run(n, r);
    return o instanceof Promise ? o.then((s) => W(s, t.out, r)) : W(o, t.out, r);
  };
});
function W(e, t, n) {
  return e.issues.length ? (e.aborted = !0, e) : t._zod.run({ value: e.value, issues: e.issues }, n);
}
const Yn = /* @__PURE__ */ i("$ZodReadonly", (e, t) => {
  b.init(e, t), h(e._zod, "propValues", () => t.innerType._zod.propValues), h(e._zod, "values", () => t.innerType._zod.values), h(e._zod, "optin", () => t.innerType._zod.optin), h(e._zod, "optout", () => t.innerType._zod.optout), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return t.innerType._zod.run(n, r);
    const o = t.innerType._zod.run(n, r);
    return o instanceof Promise ? o.then(Ee) : Ee(o);
  };
});
function Ee(e) {
  return e.value = Object.freeze(e.value), e;
}
const Qn = /* @__PURE__ */ i("$ZodCustom", (e, t) => {
  Z.init(e, t), b.init(e, t), e._zod.parse = (n, r) => n, e._zod.check = (n) => {
    const r = n.value, o = t.fn(r);
    if (o instanceof Promise)
      return o.then((s) => Ie(s, n, r, e));
    Ie(o, n, r, e);
  };
});
function Ie(e, t, n, r) {
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
    r._zod.def.params && (o.params = r._zod.def.params), t.issues.push(F(o));
  }
}
class er {
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
function tr() {
  return new er();
}
const V = /* @__PURE__ */ tr();
function nr(e, t) {
  return new e({
    type: "string",
    ...d(t)
  });
}
function rr(e, t) {
  return new e({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...d(t)
  });
}
function Ae(e, t) {
  return new e({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...d(t)
  });
}
function or(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...d(t)
  });
}
function sr(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...d(t)
  });
}
function ar(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...d(t)
  });
}
function ir(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...d(t)
  });
}
function cr(e, t) {
  return new e({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...d(t)
  });
}
function ur(e, t) {
  return new e({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...d(t)
  });
}
function lr(e, t) {
  return new e({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...d(t)
  });
}
function dr(e, t) {
  return new e({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...d(t)
  });
}
function pr(e, t) {
  return new e({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...d(t)
  });
}
function fr(e, t) {
  return new e({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...d(t)
  });
}
function hr(e, t) {
  return new e({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...d(t)
  });
}
function mr(e, t) {
  return new e({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...d(t)
  });
}
function gr(e, t) {
  return new e({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...d(t)
  });
}
function _r(e, t) {
  return new e({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...d(t)
  });
}
function vr(e, t) {
  return new e({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...d(t)
  });
}
function br(e, t) {
  return new e({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...d(t)
  });
}
function wr(e, t) {
  return new e({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...d(t)
  });
}
function zr(e, t) {
  return new e({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...d(t)
  });
}
function yr(e, t) {
  return new e({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...d(t)
  });
}
function kr(e, t) {
  return new e({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...d(t)
  });
}
function $r(e, t) {
  return new e({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...d(t)
  });
}
function Zr(e, t) {
  return new e({
    type: "string",
    format: "date",
    check: "string_format",
    ...d(t)
  });
}
function Er(e, t) {
  return new e({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...d(t)
  });
}
function Ir(e, t) {
  return new e({
    type: "string",
    format: "duration",
    check: "string_format",
    ...d(t)
  });
}
function Ar(e) {
  return new e({
    type: "unknown"
  });
}
function Tr(e, t) {
  return new e({
    type: "never",
    ...d(t)
  });
}
function Ge(e, t) {
  return new Yt({
    check: "max_length",
    ...d(t),
    maximum: e
  });
}
function H(e, t) {
  return new Qt({
    check: "min_length",
    ...d(t),
    minimum: e
  });
}
function Xe(e, t) {
  return new en({
    check: "length_equals",
    ...d(t),
    length: e
  });
}
function Or(e, t) {
  return new tn({
    check: "string_format",
    format: "regex",
    ...d(t),
    pattern: e
  });
}
function Sr(e) {
  return new nn({
    check: "string_format",
    format: "lowercase",
    ...d(e)
  });
}
function Dr(e) {
  return new rn({
    check: "string_format",
    format: "uppercase",
    ...d(e)
  });
}
function xr(e, t) {
  return new on({
    check: "string_format",
    format: "includes",
    ...d(t),
    includes: e
  });
}
function Pr(e, t) {
  return new sn({
    check: "string_format",
    format: "starts_with",
    ...d(t),
    prefix: e
  });
}
function Rr(e, t) {
  return new an({
    check: "string_format",
    format: "ends_with",
    ...d(t),
    suffix: e
  });
}
function L(e) {
  return new cn({
    check: "overwrite",
    tx: e
  });
}
function jr(e) {
  return L((t) => t.normalize(e));
}
function Cr() {
  return L((e) => e.trim());
}
function Ur() {
  return L((e) => e.toLowerCase());
}
function Nr() {
  return L((e) => e.toUpperCase());
}
function Fr(e, t, n) {
  return new e({
    type: "array",
    element: t,
    // get element() {
    //   return element;
    // },
    ...d(n)
  });
}
function Lr(e, t, n) {
  return new e({
    type: "custom",
    check: "custom",
    fn: t,
    ...d(n)
  });
}
function Mr(e) {
  const t = Wr((n) => (n.addIssue = (r) => {
    if (typeof r == "string")
      n.issues.push(F(r, n.value, t._zod.def));
    else {
      const o = r;
      o.fatal && (o.continue = !1), o.code ?? (o.code = "custom"), o.input ?? (o.input = n.value), o.inst ?? (o.inst = t), o.continue ?? (o.continue = !t._zod.def.abort), n.issues.push(F(o));
    }
  }, e(n.value, n)));
  return t;
}
function Wr(e, t) {
  const n = new Z({
    check: "custom",
    ...d(t)
  });
  return n._zod.check = e, n;
}
const Vr = /* @__PURE__ */ i("ZodISODateTime", (e, t) => {
  yn.init(e, t), v.init(e, t);
});
function Br(e) {
  return $r(Vr, e);
}
const Jr = /* @__PURE__ */ i("ZodISODate", (e, t) => {
  kn.init(e, t), v.init(e, t);
});
function Kr(e) {
  return Zr(Jr, e);
}
const Hr = /* @__PURE__ */ i("ZodISOTime", (e, t) => {
  $n.init(e, t), v.init(e, t);
});
function Gr(e) {
  return Er(Hr, e);
}
const Xr = /* @__PURE__ */ i("ZodISODuration", (e, t) => {
  Zn.init(e, t), v.init(e, t);
});
function qr(e) {
  return Ir(Xr, e);
}
const Yr = (e, t) => {
  Le.init(e, t), e.name = "ZodError", Object.defineProperties(e, {
    format: {
      value: (n) => _t(e, n)
      // enumerable: false,
    },
    flatten: {
      value: (n) => gt(e, n)
      // enumerable: false,
    },
    addIssue: {
      value: (n) => {
        e.issues.push(n), e.message = JSON.stringify(e.issues, re, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (n) => {
        e.issues.push(...n), e.message = JSON.stringify(e.issues, re, 2);
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
}, k = i("ZodError", Yr, {
  Parent: Error
}), Qr = /* @__PURE__ */ de(k), eo = /* @__PURE__ */ pe(k), to = /* @__PURE__ */ Y(k), no = /* @__PURE__ */ Q(k), ro = /* @__PURE__ */ wt(k), oo = /* @__PURE__ */ zt(k), so = /* @__PURE__ */ yt(k), ao = /* @__PURE__ */ kt(k), io = /* @__PURE__ */ $t(k), co = /* @__PURE__ */ Zt(k), uo = /* @__PURE__ */ Et(k), lo = /* @__PURE__ */ It(k), w = /* @__PURE__ */ i("ZodType", (e, t) => (b.init(e, t), e.def = t, e.type = t.type, Object.defineProperty(e, "_def", { value: t }), e.check = (...n) => e.clone(D(t, {
  checks: [
    ...t.checks ?? [],
    ...n.map((r) => typeof r == "function" ? { _zod: { check: r, def: { check: "custom" }, onattach: [] } } : r)
  ]
})), e.clone = (n, r) => A(e, n, r), e.brand = () => e, e.register = (n, r) => (n.add(e, r), e), e.parse = (n, r) => Qr(e, n, r, { callee: e.parse }), e.safeParse = (n, r) => to(e, n, r), e.parseAsync = async (n, r) => eo(e, n, r, { callee: e.parseAsync }), e.safeParseAsync = async (n, r) => no(e, n, r), e.spa = e.safeParseAsync, e.encode = (n, r) => ro(e, n, r), e.decode = (n, r) => oo(e, n, r), e.encodeAsync = async (n, r) => so(e, n, r), e.decodeAsync = async (n, r) => ao(e, n, r), e.safeEncode = (n, r) => io(e, n, r), e.safeDecode = (n, r) => co(e, n, r), e.safeEncodeAsync = async (n, r) => uo(e, n, r), e.safeDecodeAsync = async (n, r) => lo(e, n, r), e.refine = (n, r) => e.check(es(n, r)), e.superRefine = (n) => e.check(ts(n)), e.overwrite = (n) => e.check(L(n)), e.optional = () => Oe(e), e.nullable = () => Se(e), e.nullish = () => Oe(Se(e)), e.nonoptional = (n) => Ko(e, n), e.array = () => Po(e), e.or = (n) => Co([e, n]), e.and = (n) => No(e, n), e.transform = (n) => De(e, Lo(n)), e.default = (n) => Vo(e, n), e.prefault = (n) => Jo(e, n), e.catch = (n) => Go(e, n), e.pipe = (n) => De(e, n), e.readonly = () => Yo(e), e.describe = (n) => {
  const r = e.clone();
  return V.add(r, { description: n }), r;
}, Object.defineProperty(e, "description", {
  get() {
    return V.get(e)?.description;
  },
  configurable: !0
}), e.meta = (...n) => {
  if (n.length === 0)
    return V.get(e);
  const r = e.clone();
  return V.add(r, n[0]), r;
}, e.isOptional = () => e.safeParse(void 0).success, e.isNullable = () => e.safeParse(null).success, e)), qe = /* @__PURE__ */ i("_ZodString", (e, t) => {
  fe.init(e, t), w.init(e, t);
  const n = e._zod.bag;
  e.format = n.format ?? null, e.minLength = n.minimum ?? null, e.maxLength = n.maximum ?? null, e.regex = (...r) => e.check(Or(...r)), e.includes = (...r) => e.check(xr(...r)), e.startsWith = (...r) => e.check(Pr(...r)), e.endsWith = (...r) => e.check(Rr(...r)), e.min = (...r) => e.check(H(...r)), e.max = (...r) => e.check(Ge(...r)), e.length = (...r) => e.check(Xe(...r)), e.nonempty = (...r) => e.check(H(1, ...r)), e.lowercase = (r) => e.check(Sr(r)), e.uppercase = (r) => e.check(Dr(r)), e.trim = () => e.check(Cr()), e.normalize = (...r) => e.check(jr(...r)), e.toLowerCase = () => e.check(Ur()), e.toUpperCase = () => e.check(Nr());
}), po = /* @__PURE__ */ i("ZodString", (e, t) => {
  fe.init(e, t), qe.init(e, t), e.email = (n) => e.check(rr(fo, n)), e.url = (n) => e.check(cr(ho, n)), e.jwt = (n) => e.check(kr(To, n)), e.emoji = (n) => e.check(ur(mo, n)), e.guid = (n) => e.check(Ae(Te, n)), e.uuid = (n) => e.check(or(B, n)), e.uuidv4 = (n) => e.check(sr(B, n)), e.uuidv6 = (n) => e.check(ar(B, n)), e.uuidv7 = (n) => e.check(ir(B, n)), e.nanoid = (n) => e.check(lr(go, n)), e.guid = (n) => e.check(Ae(Te, n)), e.cuid = (n) => e.check(dr(_o, n)), e.cuid2 = (n) => e.check(pr(vo, n)), e.ulid = (n) => e.check(fr(bo, n)), e.base64 = (n) => e.check(wr(Eo, n)), e.base64url = (n) => e.check(zr(Io, n)), e.xid = (n) => e.check(hr(wo, n)), e.ksuid = (n) => e.check(mr(zo, n)), e.ipv4 = (n) => e.check(gr(yo, n)), e.ipv6 = (n) => e.check(_r(ko, n)), e.cidrv4 = (n) => e.check(vr($o, n)), e.cidrv6 = (n) => e.check(br(Zo, n)), e.e164 = (n) => e.check(yr(Ao, n)), e.datetime = (n) => e.check(Br(n)), e.date = (n) => e.check(Kr(n)), e.time = (n) => e.check(Gr(n)), e.duration = (n) => e.check(qr(n));
});
function P(e) {
  return nr(po, e);
}
const v = /* @__PURE__ */ i("ZodStringFormat", (e, t) => {
  m.init(e, t), qe.init(e, t);
}), fo = /* @__PURE__ */ i("ZodEmail", (e, t) => {
  fn.init(e, t), v.init(e, t);
}), Te = /* @__PURE__ */ i("ZodGUID", (e, t) => {
  dn.init(e, t), v.init(e, t);
}), B = /* @__PURE__ */ i("ZodUUID", (e, t) => {
  pn.init(e, t), v.init(e, t);
}), ho = /* @__PURE__ */ i("ZodURL", (e, t) => {
  hn.init(e, t), v.init(e, t);
}), mo = /* @__PURE__ */ i("ZodEmoji", (e, t) => {
  mn.init(e, t), v.init(e, t);
}), go = /* @__PURE__ */ i("ZodNanoID", (e, t) => {
  gn.init(e, t), v.init(e, t);
}), _o = /* @__PURE__ */ i("ZodCUID", (e, t) => {
  _n.init(e, t), v.init(e, t);
}), vo = /* @__PURE__ */ i("ZodCUID2", (e, t) => {
  vn.init(e, t), v.init(e, t);
}), bo = /* @__PURE__ */ i("ZodULID", (e, t) => {
  bn.init(e, t), v.init(e, t);
}), wo = /* @__PURE__ */ i("ZodXID", (e, t) => {
  wn.init(e, t), v.init(e, t);
}), zo = /* @__PURE__ */ i("ZodKSUID", (e, t) => {
  zn.init(e, t), v.init(e, t);
}), yo = /* @__PURE__ */ i("ZodIPv4", (e, t) => {
  En.init(e, t), v.init(e, t);
}), ko = /* @__PURE__ */ i("ZodIPv6", (e, t) => {
  In.init(e, t), v.init(e, t);
}), $o = /* @__PURE__ */ i("ZodCIDRv4", (e, t) => {
  An.init(e, t), v.init(e, t);
}), Zo = /* @__PURE__ */ i("ZodCIDRv6", (e, t) => {
  Tn.init(e, t), v.init(e, t);
}), Eo = /* @__PURE__ */ i("ZodBase64", (e, t) => {
  On.init(e, t), v.init(e, t);
}), Io = /* @__PURE__ */ i("ZodBase64URL", (e, t) => {
  Dn.init(e, t), v.init(e, t);
}), Ao = /* @__PURE__ */ i("ZodE164", (e, t) => {
  xn.init(e, t), v.init(e, t);
}), To = /* @__PURE__ */ i("ZodJWT", (e, t) => {
  Rn.init(e, t), v.init(e, t);
}), Oo = /* @__PURE__ */ i("ZodUnknown", (e, t) => {
  jn.init(e, t), w.init(e, t);
});
function se() {
  return Ar(Oo);
}
const So = /* @__PURE__ */ i("ZodNever", (e, t) => {
  Cn.init(e, t), w.init(e, t);
});
function Do(e) {
  return Tr(So, e);
}
const xo = /* @__PURE__ */ i("ZodArray", (e, t) => {
  Un.init(e, t), w.init(e, t), e.element = t.element, e.min = (n, r) => e.check(H(n, r)), e.nonempty = (n) => e.check(H(1, n)), e.max = (n, r) => e.check(Ge(n, r)), e.length = (n, r) => e.check(Xe(n, r)), e.unwrap = () => e.element;
});
function Po(e, t) {
  return Fr(xo, e, t);
}
const Ro = /* @__PURE__ */ i("ZodObject", (e, t) => {
  Fn.init(e, t), w.init(e, t), h(e, "shape", () => t.shape), e.keyof = () => he(Object.keys(e._zod.def.shape)), e.catchall = (n) => e.clone({ ...e._zod.def, catchall: n }), e.passthrough = () => e.clone({ ...e._zod.def, catchall: se() }), e.loose = () => e.clone({ ...e._zod.def, catchall: se() }), e.strict = () => e.clone({ ...e._zod.def, catchall: Do() }), e.strip = () => e.clone({ ...e._zod.def, catchall: void 0 }), e.extend = (n) => dt(e, n), e.safeExtend = (n) => pt(e, n), e.merge = (n) => ft(e, n), e.pick = (n) => ut(e, n), e.omit = (n) => lt(e, n), e.partial = (...n) => ht(Qe, e, n[0]), e.required = (...n) => mt(et, e, n[0]);
});
function Ye(e, t) {
  const n = {
    type: "object",
    shape: e ?? {},
    ...d(t)
  };
  return new Ro(n);
}
const jo = /* @__PURE__ */ i("ZodUnion", (e, t) => {
  Ln.init(e, t), w.init(e, t), e.options = t.options;
});
function Co(e, t) {
  return new jo({
    type: "union",
    options: e,
    ...d(t)
  });
}
const Uo = /* @__PURE__ */ i("ZodIntersection", (e, t) => {
  Mn.init(e, t), w.init(e, t);
});
function No(e, t) {
  return new Uo({
    type: "intersection",
    left: e,
    right: t
  });
}
const ae = /* @__PURE__ */ i("ZodEnum", (e, t) => {
  Wn.init(e, t), w.init(e, t), e.enum = t.entries, e.options = Object.values(t.entries);
  const n = new Set(Object.keys(t.entries));
  e.extract = (r, o) => {
    const s = {};
    for (const a of r)
      if (n.has(a))
        s[a] = t.entries[a];
      else
        throw new Error(`Key ${a} not found in enum`);
    return new ae({
      ...t,
      checks: [],
      ...d(o),
      entries: s
    });
  }, e.exclude = (r, o) => {
    const s = { ...t.entries };
    for (const a of r)
      if (n.has(a))
        delete s[a];
      else
        throw new Error(`Key ${a} not found in enum`);
    return new ae({
      ...t,
      checks: [],
      ...d(o),
      entries: s
    });
  };
});
function he(e, t) {
  const n = Array.isArray(e) ? Object.fromEntries(e.map((r) => [r, r])) : e;
  return new ae({
    type: "enum",
    entries: n,
    ...d(t)
  });
}
const Fo = /* @__PURE__ */ i("ZodTransform", (e, t) => {
  Vn.init(e, t), w.init(e, t), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      throw new Re(e.constructor.name);
    n.addIssue = (s) => {
      if (typeof s == "string")
        n.issues.push(F(s, n.value, t));
      else {
        const a = s;
        a.fatal && (a.continue = !1), a.code ?? (a.code = "custom"), a.input ?? (a.input = n.value), a.inst ?? (a.inst = e), n.issues.push(F(a));
      }
    };
    const o = t.transform(n.value, n);
    return o instanceof Promise ? o.then((s) => (n.value = s, n)) : (n.value = o, n);
  };
});
function Lo(e) {
  return new Fo({
    type: "transform",
    transform: e
  });
}
const Qe = /* @__PURE__ */ i("ZodOptional", (e, t) => {
  Bn.init(e, t), w.init(e, t), e.unwrap = () => e._zod.def.innerType;
});
function Oe(e) {
  return new Qe({
    type: "optional",
    innerType: e
  });
}
const Mo = /* @__PURE__ */ i("ZodNullable", (e, t) => {
  Jn.init(e, t), w.init(e, t), e.unwrap = () => e._zod.def.innerType;
});
function Se(e) {
  return new Mo({
    type: "nullable",
    innerType: e
  });
}
const Wo = /* @__PURE__ */ i("ZodDefault", (e, t) => {
  Kn.init(e, t), w.init(e, t), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function Vo(e, t) {
  return new Wo({
    type: "default",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : Ue(t);
    }
  });
}
const Bo = /* @__PURE__ */ i("ZodPrefault", (e, t) => {
  Hn.init(e, t), w.init(e, t), e.unwrap = () => e._zod.def.innerType;
});
function Jo(e, t) {
  return new Bo({
    type: "prefault",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : Ue(t);
    }
  });
}
const et = /* @__PURE__ */ i("ZodNonOptional", (e, t) => {
  Gn.init(e, t), w.init(e, t), e.unwrap = () => e._zod.def.innerType;
});
function Ko(e, t) {
  return new et({
    type: "nonoptional",
    innerType: e,
    ...d(t)
  });
}
const Ho = /* @__PURE__ */ i("ZodCatch", (e, t) => {
  Xn.init(e, t), w.init(e, t), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function Go(e, t) {
  return new Ho({
    type: "catch",
    innerType: e,
    catchValue: typeof t == "function" ? t : () => t
  });
}
const Xo = /* @__PURE__ */ i("ZodPipe", (e, t) => {
  qn.init(e, t), w.init(e, t), e.in = t.in, e.out = t.out;
});
function De(e, t) {
  return new Xo({
    type: "pipe",
    in: e,
    out: t
    // ...util.normalizeParams(params),
  });
}
const qo = /* @__PURE__ */ i("ZodReadonly", (e, t) => {
  Yn.init(e, t), w.init(e, t), e.unwrap = () => e._zod.def.innerType;
});
function Yo(e) {
  return new qo({
    type: "readonly",
    innerType: e
  });
}
const Qo = /* @__PURE__ */ i("ZodCustom", (e, t) => {
  Qn.init(e, t), w.init(e, t);
});
function es(e, t = {}) {
  return Lr(Qo, e, t);
}
function ts(e) {
  return Mr(e);
}
he(["en-au", "en-gb", "en-us", "es-es"]);
const ns = he(["app", "engine", "connector", "context", "informer", "presenter"]), xe = Ye({
  "en-au": P().optional(),
  "en-gb": P().optional(),
  "en-us": P().optional(),
  "es-es": P().optional()
}), ds = Ye({
  id: P(),
  label: xe,
  description: xe,
  statusId: se(),
  typeId: ns,
  version: P()
});
function ps() {
  function e(t, n, r) {
    r.textContent = "Cytoscape.js diagram goes here...";
  }
  return { render: e };
}
function fs() {
  function e(t, n, r) {
    r.textContent = "values table goes here...";
  }
  return { render: e };
}
const rs = "https://cdn.jsdelivr.net/npm/highcharts@11.4.3/es-modules/masters/", ne = "highcharts";
let U, Pe = !1;
function hs() {
  async function e(s, a, c, l) {
    await r();
    const u = [];
    for (const f of a.data.measures)
      u.push({ type: s.options.highchartsType, name: f.name, data: f.data });
    const p = {
      chart: { type: s.options.highchartsType },
      plotOptions: { series: { borderColor: "#333" } },
      series: u,
      title: { text: a.title.text },
      xAxis: { categories: a.data.categoryLabels },
      yAxis: { title: { text: a.data.name } }
    }, g = U.chart(c, p, l);
    return { chart: g, resize: () => g.reflow(), vendorId: ne };
  }
  async function t(s, a, c, l) {
    await Promise.all([r(), o()]);
    const u = [];
    for (const f of a.data.measures)
      u.push({ type: s.options.highchartsType, name: f.name, data: f.data });
    const p = {
      chart: { polar: !0 },
      plotOptions: { series: { borderColor: "#333" } },
      series: u,
      title: { text: a.title.text },
      xAxis: { categories: a.data.categoryLabels },
      yAxis: { title: { text: a.data.name } }
    }, g = U.chart(c, p, l);
    return { chart: g, resize: () => g.reflow(), vendorId: ne };
  }
  async function n(s, a, c, l) {
    await Promise.all([r(), o()]);
    const u = [], p = [];
    for (let _ = 0; _ < a.data.measures[0].data.length; _++)
      p.push([a.data.measures[0].data[_][0], a.data.measures[1].data[_][0]]);
    u.push({ type: s.options.highchartsType, name: "Unknown", data: p });
    const g = {
      chart: { type: s.options.highchartsType, inverted: s.options.inverted },
      plotOptions: { series: { borderColor: "#333" } },
      series: u,
      title: { text: a.title.text },
      xAxis: { categories: a.data.categoryLabels },
      yAxis: { title: { text: a.data.name } }
    }, f = U.chart(c, g, l);
    return { chart: f, resize: () => f.reflow(), vendorId: ne };
  }
  async function r() {
    if (U) return;
    const s = "https://cdn.jsdelivr.net/npm/highcharts@11.4.3/es-modules/masters/", a = `${s}highcharts.src.js`, c = `${s}modules/accessibility.src.js`;
    U = (await import(
      /* @vite-ignore */
      a
    )).default, await import(
      /* @vite-ignore */
      c
    );
  }
  async function o() {
    if (Pe) return;
    await import(`${rs}highcharts-more.src.js`), Pe = !0;
  }
  return { renderCartesianChart: e, renderPolarChart: t, renderRangeChart: n };
}
const ms = 0, gs = (e) => e, _s = () => Date.now(), vs = {
  cartesian_areaLine: { categoryId: "cartesian", typeId: "areaLine", label: { "en-gb": "Area Line" }, options: { highchartsType: "area" } },
  cartesian_areaSpline: { categoryId: "cartesian", typeId: "areaSpline", label: { "en-gb": "Area Spline" }, options: { highchartsType: "area" } },
  cartesian_bar: { categoryId: "cartesian", typeId: "bar", label: { "en-gb": "Bar" }, options: { highchartsType: "bar" } },
  cartesian_column: { categoryId: "cartesian", typeId: "column", label: { "en-gb": "Column" }, options: { highchartsType: "column" } },
  cartesian_line: { categoryId: "cartesian", typeId: "line", label: { "en-gb": "Line" }, options: { highchartsType: "line" } },
  cartesian_pyramid: { categoryId: "cartesian", typeId: "line", label: { "en-gb": "Pyramid" }, options: { highchartsType: "line" } },
  cartesian_spline: { categoryId: "cartesian", typeId: "line", label: { "en-gb": "Spline" }, options: { highchartsType: "line" } },
  chordDiagram: { categoryId: "chordDiagram", label: { "en-gb": "Chord Diagram" }, options: {} },
  polar_area: { categoryId: "polar", typeId: "area", label: { "en-gb": "Radar (Area)" }, options: { highchartsType: "area" } },
  polar_column: { categoryId: "polar", typeId: "column", label: { "en-gb": "Radar (Column)" }, options: { highchartsType: "column" } },
  polar_line: { categoryId: "polar", typeId: "line", label: { "en-gb": "Radar (Line)" }, options: { highchartsType: "line" } },
  range_area: { categoryId: "range", typeId: "area", label: { "en-gb": "Range (Area)" }, options: { highchartsType: "arearange" } },
  range_bar: { categoryId: "range", typeId: "bar", label: { "en-gb": "Range (Bar)" }, options: { highchartsType: "columnrange", inverted: !0 } },
  range_column: { categoryId: "range", typeId: "column", label: { "en-gb": "Range (Column)" }, options: { highchartsType: "columnrange" } },
  sankeyDiagram: { categoryId: "sankeyDiagram", label: { "en-gb": "Sankey Diagram" }, options: {} },
  streamgraph: { categoryId: "streamgraph", label: { "en-gb": "Streamgraph" }, options: {} },
  values: { categoryId: "values", label: { "en-gb": "Values" }, options: {} }
};
class me extends Error {
  locator;
  constructor(t, n, r) {
    super(t, r), this.name = "DataPosError", this.locator = n, Error.captureStackTrace?.(this, new.target);
  }
}
class j extends me {
  constructor(t, n, r) {
    super(t, n, r), this.name = "ApplicationError";
  }
}
class bs extends j {
  constructor(t, n, r) {
    super(t, n, r), this.name = "APIError";
  }
}
class ws extends j {
  constructor(t, n, r) {
    super(t, n, r), this.name = "EngineError";
  }
}
class tt extends j {
  body;
  constructor(t, n, r, o) {
    super(t, n, o), this.name = "FetchError", this.body = r;
  }
}
class os extends j {
  componentName;
  info;
  constructor(t, n, r, o, s) {
    super(t, n, s), this.name = "VueHandledError", this.info = r, this.componentName = o;
  }
}
class zs extends j {
  constructor(t, n, r) {
    super(t, n, r), this.name = "WindowHandledRuntimeError";
  }
}
class ys extends j {
  constructor(t, n, r) {
    super(t, n, r), this.name = "WindowHandledPromiseRejectionError";
  }
}
class ks extends me {
  constructor(t, n, r) {
    super(t, n, r), this.name = "OperationalError";
  }
}
async function $s(e, t, n) {
  const r = `${t} Response status '${e.status}${e.statusText ? ` - ${e.statusText}` : ""}' received.`, o = await e.text();
  return new tt(r, n, o);
}
function Zs(e) {
  return e.map((t) => t.message).join(" ");
}
function Es(e, t = "Unknown error.") {
  if (e instanceof Error) return e;
  if (typeof e == "string") return new Error(e);
  try {
    return new Error(JSON.stringify(e ?? t));
  } catch {
    return new Error(t);
  }
}
function Is(e) {
  const t = /* @__PURE__ */ new Set(), n = [];
  let r = e;
  for (; r && !t.has(r); ) {
    t.add(r);
    let o;
    if (r instanceof tt)
      o = { body: r.body, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof os)
      o = { componentName: r.componentName, info: r.info, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof me)
      o = { locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof Error) {
      const s = r;
      o = { locator: "", message: s.message, name: s.name, stack: s.stack }, r = s.cause;
    } else r ? (o = { locator: "", message: String(r), name: "Error" }, r = void 0) : (o = { locator: "", message: "Unknown error.", name: "Error" }, r = void 0);
    /(?:\.{3}|[.!?])$/.test(o.message) || (o.message += "."), n.push(o);
  }
  return n;
}
const nt = "en-US", G = {}, As = (e) => {
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
}, Ts = (e) => {
  if (e) {
    const t = e.lastIndexOf("/"), n = e.lastIndexOf(".", t > -1 ? t : e.length);
    return n > -1 ? e.substring(0, n) : e;
  }
}, Os = (e) => {
  if (e) {
    const t = e.lastIndexOf(".");
    if (t > -1) return e.substring(t + 1);
  }
}, y = (e, t = 2, n = t, r = nt) => {
  if (e == null) return "";
  const o = `${r}decimal${t}.${n}`;
  let s = G[o];
  return s || (s = new Intl.NumberFormat(r, {
    localeMatcher: "best fit",
    maximumFractionDigits: t,
    minimumFractionDigits: n,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), G[o] = s), s.format(e);
}, Ss = (e) => e == null ? "" : e < 1e3 ? X(e) : e < 1e6 ? `${y(e / 1e3, 2, 0)}K` : e < 1e9 ? `${y(e / 1e6, 2, 0)}M` : e < 1e12 ? `${y(e / 1e9, 2, 0)}B` : `${y(e / 1e12, 2, 0)}T`, Ds = (e) => e == null ? "" : e === 1 ? "1 byte" : e < 1024 ? `${X(e)} bytes` : e < 1048576 ? `${y(e / 1024, 2, 0)} KB` : e < 1073741824 ? `${y(e / 1048576, 2, 0)} MB` : e < 1099511627776 ? `${y(e / 1073741824, 2, 0)} GB` : `${y(e / 1099511627776, 2, 0)} TB`, xs = (e) => e == null ? "" : e < 1e3 ? `${X(e)} ms` : e === 1e3 ? `${X(e)} sec` : e < 6e4 ? `${y(e / 1e3, 2, 0)} secs` : e === 6e4 ? "1 min" : e < 36e5 ? `${y(e / 6e4, 2, 0)} mins` : e === 36e5 ? "1 hr" : e < 864e5 ? `${y(e / 36e5, 2, 0)} hrs` : e === 864e5 ? "1 day" : `${y(e / 864e5, 2, 0)} days`, X = (e, t = nt) => {
  if (e == null) return "";
  const n = `${t}decimal0.0`;
  let r = G[n];
  return r || (r = new Intl.NumberFormat(t, {
    localeMatcher: "best fit",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), G[n] = r), r.format(e);
}, Ps = (e) => {
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
}, ss = [
  { id: "dtv", label: { "en-gb": "Delimited Text" } },
  { id: "e/e", label: { "en-gb": "Entity/Event" } },
  { id: "jsonArray", label: { "en-gb": "JSON Array" } },
  { id: "spss", label: { "en-gb": "SPSS" } },
  { id: "xls", label: { "en-gb": "XLS" } },
  { id: "xlsx", label: { "en-gb": "XLSX" } },
  { id: "xml", label: { "en-gb": "XML" } }
], Rs = (e = I) => {
  const t = [];
  for (const n of ss) t.push({ ...n, label: n.label[e] || n.label[I] || n.id });
  return t;
}, as = [
  { id: `
`, label: { "en-gb": "Newline" } },
  { id: "\r", label: { "en-gb": "Carriage Return" } },
  { id: `\r
`, label: { "en-gb": "Carriage Return/Newline" } }
], js = (e = I) => {
  const t = [];
  for (const n of as)
    t.push({ ...n, label: n.label[e] || n.label[I] || n.id });
  return t;
}, is = [
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
], Cs = (e = I) => {
  const t = [];
  for (const n of is)
    t.push({ ...n, label: n.label[e] || n.label[I] || n.id });
  return t;
}, cs = [
  { id: "alpha", color: "red", label: { "en-gb": "alpha" } },
  { id: "beta", color: "amber", label: { "en-gb": "beta" } },
  { id: "generalAvailability", color: "green", label: { "en-gb": "" } },
  { id: "notApplicable", color: "green", label: { "en-gb": "not-applicable" } },
  { id: "preAlpha", color: "red", label: { "en-gb": "pre-alpha" } },
  { id: "proposed", color: "other", label: { "en-gb": "proposed" } },
  { id: "releaseCandidate", color: "green", label: { "en-gb": "release-candidate" } },
  { id: "unavailable", color: "other", label: { "en-gb": "unavailable" } },
  { id: "underReview", color: "other", label: { "en-gb": "under-review" } }
], Us = (e, t = I) => {
  const n = cs.find((r) => r.id === e);
  return n ? { ...n, label: n.label[t] || n.label[I] || e } : { id: e, color: "other", label: e };
}, I = "en-gb";
export {
  bs as APIError,
  j as ApplicationError,
  us as CONNECTOR_DESTINATION_OPERATIONS,
  ls as CONNECTOR_SOURCE_OPERATIONS,
  I as DEFAULT_LOCALE_CODE,
  ms as DefaultTimestamp,
  ws as EngineError,
  tt as FetchError,
  ks as OperationalError,
  os as VueError,
  ys as WindowPromiseRejectionError,
  zs as WindowRuntimeError,
  $s as buildFetchError,
  Zs as concatenateSerialisedErrorMessages,
  gs as convertMillisecondsToTimestamp,
  As as convertODataTypeIdToUsageTypeId,
  Os as extractExtensionFromPath,
  Ts as extractNameFromPath,
  y as formatNumberAsDecimalNumber,
  xs as formatNumberAsDuration,
  Ss as formatNumberAsSize,
  Ds as formatNumberAsStorageSize,
  X as formatNumberAsWholeNumber,
  Us as getComponentStatus,
  _s as getCurrentTimestamp,
  Rs as getDataFormats,
  js as getRecordDelimiters,
  Cs as getValueDelimiters,
  Ps as lookupMimeTypeForExtension,
  ds as moduleConfigSchema,
  Es as normalizeToError,
  vs as presentationViewTypeMap,
  Is as serialiseError,
  ps as useCytoscapeJS,
  fs as useDataTable,
  hs as useHighcharts
};
