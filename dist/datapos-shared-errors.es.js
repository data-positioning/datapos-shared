class i extends Error {
  locator;
  /** Logical source of the error. */
  constructor(o, t, r) {
    super(o, r), this.name = new.target.name, this.locator = t;
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
  constructor(o, t, r, n) {
    super(o, t, n), this.name = new.target.name, this.body = E(r ?? void 0);
  }
}
class y extends i {
}
class m extends a {
  componentName;
  /** Vue component name, if available. */
  info;
  /** Vue error info string. */
  constructor(o, t, r, n, s) {
    super(o, t, s), this.name = new.target.name, this.info = r, this.componentName = n;
  }
}
class w extends a {
}
class b extends a {
}
async function h(e, o, t) {
  const r = ` - ${e.statusText}`, n = `${o} Response status '${e.status}${e.statusText ? r : ""}' received.`;
  let s;
  try {
    s = await e.text();
  } catch (d) {
    s = `<body unavailable: ${l(d).message}>`;
  }
  return new c(n, t, s);
}
function k(e) {
  return e.map((o) => o.message).join(" ");
}
function l(e) {
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
  const o = /* @__PURE__ */ new Set(), t = [];
  let r = e;
  for (; r != null && !o.has(r); ) {
    o.add(r);
    let n;
    if (r instanceof c)
      n = { componentName: void 0, body: r.body, info: void 0, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof m)
      n = {
        componentName: r.componentName,
        body: void 0,
        info: r.info,
        locator: r.locator,
        message: r.message,
        name: r.name,
        stack: r.stack
      }, r = r.cause;
    else if (r instanceof i)
      n = { componentName: void 0, body: void 0, info: void 0, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause;
    else if (r instanceof Error) {
      const s = r;
      n = { componentName: void 0, body: void 0, info: void 0, locator: "", message: s.message, name: s.name, stack: s.stack }, r = s.cause;
    } else
      n = { componentName: void 0, body: void 0, info: void 0, locator: "", message: f(r), name: "Error", stack: void 0 }, r = void 0;
    /(?:\.{3}|[.!?])$/.test(n.message) || (n.message += "."), t.push(n);
  }
  return t;
}
function f(e) {
  let o;
  try {
    o = JSON.stringify(e);
  } catch {
    typeof e == "symbol" ? o = e.description ?? "Unknown error" : typeof e == "bigint" ? o = e.toString() : o = "Unknown error";
  }
  return o === "" && (o = "Unknown error"), o;
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
  y as OperationalError,
  m as VueHandledError,
  b as WindowHandledPromiseRejectionError,
  w as WindowHandledRuntimeError,
  h as buildFetchError,
  k as concatenateSerialisedErrorMessages,
  l as normalizeToError,
  x as serialiseError
};
