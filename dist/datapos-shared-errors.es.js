class i extends Error {
  locator;
  /** Logical source of the error. */
  constructor(n, s, r) {
    super(n, r), this.name = new.target.name, this.locator = s;
  }
}
class a extends i {
}
class g extends a {
}
class p extends a {
}
class c extends a {
  body;
  /** Sanitized HTTP response body. */
  constructor(n, s, r, t) {
    super(n, s, t), this.name = new.target.name, this.body = E(r ?? void 0);
  }
}
class w extends i {
}
class m extends a {
  componentName;
  /** Vue component name, if available. */
  info;
  /** Vue error info string. */
  constructor(n, s, r, t, o) {
    super(n, s, o), this.name = new.target.name, this.info = r, this.componentName = t;
  }
}
class y extends a {
}
class h extends a {
}
async function k(e, n, s) {
  const r = ` - ${e.statusText}`, t = `${n} Response status '${e.status}${e.statusText ? r : ""}' received.`;
  let o;
  try {
    o = await e.text();
  } catch (l) {
    o = `<body unavailable: ${f(l).message}>`;
  }
  return new c(t, s, o);
}
function b(e) {
  return e.map((n) => n.message).join(" ");
}
function f(e) {
  if (e instanceof Error) return e;
  if (typeof e == "string") return new Error(e);
  if (typeof e == "number" || typeof e == "boolean" || typeof e == "bigint") return new Error(String(e));
  if (typeof e == "symbol") return new Error(e.description ?? "Unknown error");
  if (e != null && typeof e == "object")
    try {
      return new Error(JSON.stringify(e));
    } catch {
      return new Error("Unknown error");
    }
  return new Error("Unknown error");
}
function x(e) {
  const n = /* @__PURE__ */ new Set(), s = [];
  let r = e;
  for (; r != null && !n.has(r); ) {
    n.add(r);
    let t;
    if (r instanceof c)
      t = { body: r.body, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof m)
      t = { componentName: r.componentName, info: r.info, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof i)
      t = { locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof Error) {
      const o = r;
      t = { locator: "", message: o.message, name: o.name, stack: o.stack }, r = o.cause;
    } else
      t = { locator: "", message: d(r), name: "Error" }, r = void 0;
    /(?:\.{3}|[.!?])$/.test(t.message) || (t.message += "."), s.push(t);
  }
  return s;
}
function d(e) {
  let n;
  try {
    n = JSON.stringify(e);
  } catch {
    typeof e == "symbol" ? n = e.description ?? "Unknown error" : typeof e == "bigint" ? n = e.toString() : n = "Unknown error";
  }
  return n === "" && (n = "Unknown error"), n;
}
function E(e) {
  if (!(e == null || e === ""))
    return e.length > 2048 ? `${e.slice(0, 2048)}... [truncated]` : e;
}
export {
  g as APIError,
  a as ApplicationError,
  p as EngineError,
  c as FetchError,
  w as OperationalError,
  m as VueHandledError,
  h as WindowHandledPromiseRejectionError,
  y as WindowHandledRuntimeError,
  k as buildFetchError,
  b as concatenateSerialisedErrorMessages,
  f as normalizeToError,
  x as serialiseError
};
