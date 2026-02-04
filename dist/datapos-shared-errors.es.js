class c extends Error {
  locator;
  /** Logical source of the error. */
  constructor(n, o, e) {
    super(n, e), this.name = new.target.name, this.locator = o;
  }
}
class a extends c {
}
class f extends a {
}
class u extends a {
}
class m extends a {
  body;
  /** Sanitized HTTP response body. */
  constructor(n, o, e, s) {
    super(n, o, s), this.name = new.target.name, this.body = p(e ?? void 0);
  }
}
class E extends c {
}
class d extends a {
  componentName;
  /** Vue component name, if available. */
  info;
  /** Vue error info string. */
  constructor(n, o, e, s, t) {
    super(n, o, t), this.name = new.target.name, this.info = e, this.componentName = s;
  }
}
class g extends a {
}
class w extends a {
}
async function k(r, n, o) {
  const e = ` - ${r.statusText}`, s = `${n} Response status '${r.status}${r.statusText ? e : ""}' received.`;
  let t;
  try {
    t = await r.text();
  } catch (l) {
    t = `<body unavailable: ${i(l).message}>`;
  }
  return new m(s, o, t);
}
function h(r) {
  return r.map((n) => n.message).join(" ");
}
function y(r) {
  try {
    r();
  } catch {
  }
}
function i(r) {
  if (r != null) {
    if (r instanceof Error) return r;
    if (typeof r == "string") return new Error(r);
    if (typeof r == "number" || typeof r == "boolean" || typeof r == "bigint") return new Error(String(r));
    if (typeof r == "symbol") return new Error(r.description ?? "Unknown error");
    if (typeof r == "object")
      try {
        return new Error(JSON.stringify(r));
      } catch {
        return new Error("Unknown error");
      }
    return new Error("Unknown error");
  }
}
function R(r) {
  const n = /* @__PURE__ */ new Set(), o = [];
  let e = i(r);
  for (; e != null && !n.has(e); ) {
    n.add(e);
    let s;
    if (e instanceof m)
      s = { componentName: void 0, body: e.body, info: void 0, locator: e.locator, message: e.message, name: e.name, stack: e.stack }, e = i(e.cause);
    else if (e instanceof d)
      s = {
        componentName: e.componentName,
        body: void 0,
        info: e.info,
        locator: e.locator,
        message: e.message,
        name: e.name,
        stack: e.stack
      }, e = i(e.cause);
    else if (e instanceof c)
      s = { componentName: void 0, body: void 0, info: void 0, locator: e.locator, message: e.message, name: e.name, stack: e.stack }, e = i(e.cause);
    else {
      const t = e;
      s = { componentName: void 0, body: void 0, info: void 0, locator: "", message: t.message, name: t.name, stack: t.stack }, e = i(e.cause);
    }
    /(?:\.{3}|[.!?])$/.test(s.message) || (s.message += "."), o.push(s);
  }
  return o;
}
function x(r) {
  if (r.length === 0) return;
  let n;
  for (const o of r.toReversed()) {
    let e;
    if (o.body !== void 0)
      e = new m(o.message, o.locator, o.body, { cause: n });
    else if (o.info !== void 0)
      e = new d(o.message, o.locator, o.info, o.componentName, { cause: n });
    else if (o.locator === "")
      e = new Error(o.message, { cause: n }), e.name = o.name;
    else
      switch (o.name) {
        case "APIError":
          e = new f(o.message, o.locator, { cause: n });
          break;
        case "EngineError":
          e = new u(o.message, o.locator, { cause: n });
          break;
        case "ApplicationError":
          e = new a(o.message, o.locator, { cause: n });
          break;
        case "OperationalError":
          e = new E(o.message, o.locator, { cause: n });
          break;
        case "WindowHandledRuntimeError":
          e = new g(o.message, o.locator, { cause: n });
          break;
        case "WindowHandledPromiseRejectionError":
          e = new w(o.message, o.locator, { cause: n });
          break;
        default:
          e = new c(o.message, o.locator, { cause: n });
          break;
      }
    o.stack !== void 0 && (e.stack = o.stack), n = e;
  }
  return n;
}
function p(r) {
  if (!(r == null || r === ""))
    return r.length > 2048 ? `${r.slice(0, 2048)}... [truncated]` : r;
}
export {
  f as APIError,
  a as ApplicationError,
  u as EngineError,
  m as FetchError,
  E as OperationalError,
  d as VueHandledError,
  w as WindowHandledPromiseRejectionError,
  g as WindowHandledRuntimeError,
  k as buildFetchError,
  h as concatenateSerialisedErrorMessages,
  y as ignoreErrors,
  i as normalizeToError,
  R as serialiseError,
  x as unserialiseError
};
