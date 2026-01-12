class i extends Error {
  locator;
  /** Logical source of the error. */
  constructor(n, o, e) {
    super(n, e), this.name = new.target.name, this.locator = o;
  }
}
class a extends i {
}
class d extends a {
}
class f extends a {
}
class c extends a {
  body;
  /** Sanitized HTTP response body. */
  constructor(n, o, e, t) {
    super(n, o, t), this.name = new.target.name, this.body = b(e ?? void 0);
  }
}
class g extends i {
}
class l extends a {
  componentName;
  /** Vue component name, if available. */
  info;
  /** Vue error info string. */
  constructor(n, o, e, t, s) {
    super(n, o, s), this.name = new.target.name, this.info = e, this.componentName = t;
  }
}
class E extends a {
}
class u extends a {
}
async function y(r, n, o) {
  const e = ` - ${r.statusText}`, t = `${n} Response status '${r.status}${r.statusText ? e : ""}' received.`;
  let s;
  try {
    s = await r.text();
  } catch (m) {
    s = `<body unavailable: ${w(m).message}>`;
  }
  return new c(t, o, s);
}
function h(r) {
  return r.map((n) => n.message).join(" ");
}
function R(r) {
  try {
    r();
  } catch {
  }
}
function w(r) {
  if (r instanceof Error) return r;
  if (typeof r == "string") return new Error(r);
  if (typeof r == "number" || typeof r == "boolean" || typeof r == "bigint") return new Error(String(r));
  if (typeof r == "symbol") return new Error(r.description ?? "Unknown error");
  if (r != null && typeof r == "object")
    try {
      return new Error(JSON.stringify(r));
    } catch {
      return new Error("Unknown error");
    }
  return new Error("Unknown error");
}
function x(r) {
  const n = /* @__PURE__ */ new Set(), o = [];
  let e = r;
  for (; e != null && !n.has(e); ) {
    n.add(e);
    let t;
    if (e instanceof c)
      t = { componentName: void 0, body: e.body, info: void 0, locator: e.locator, message: e.message, name: e.name, stack: e.stack }, e = e.cause;
    else if (e instanceof l)
      t = {
        componentName: e.componentName,
        body: void 0,
        info: e.info,
        locator: e.locator,
        message: e.message,
        name: e.name,
        stack: e.stack
      }, e = e.cause;
    else if (e instanceof i)
      t = { componentName: void 0, body: void 0, info: void 0, locator: e.locator, message: e.message, name: e.name, stack: e.stack }, e = e.cause;
    else if (e instanceof Error) {
      const s = e;
      t = { componentName: void 0, body: void 0, info: void 0, locator: "", message: s.message, name: s.name, stack: s.stack }, e = s.cause;
    } else
      t = { componentName: void 0, body: void 0, info: void 0, locator: "", message: p(e), name: "Error", stack: void 0 }, e = void 0;
    /(?:\.{3}|[.!?])$/.test(t.message) || (t.message += "."), o.push(t);
  }
  return o;
}
function v(r) {
  if (r.length === 0) return;
  let n;
  for (const o of r.toReversed()) {
    let e;
    if (o.body !== void 0)
      e = new c(o.message, o.locator, o.body, { cause: n });
    else if (o.info !== void 0)
      e = new l(o.message, o.locator, o.info, o.componentName, { cause: n });
    else if (o.locator === "")
      e = new Error(o.message, { cause: n }), e.name = o.name;
    else
      switch (o.name) {
        case "APIError":
          e = new d(o.message, o.locator, { cause: n });
          break;
        case "EngineError":
          e = new f(o.message, o.locator, { cause: n });
          break;
        case "ApplicationError":
          e = new a(o.message, o.locator, { cause: n });
          break;
        case "OperationalError":
          e = new g(o.message, o.locator, { cause: n });
          break;
        case "WindowHandledRuntimeError":
          e = new E(o.message, o.locator, { cause: n });
          break;
        case "WindowHandledPromiseRejectionError":
          e = new u(o.message, o.locator, { cause: n });
          break;
        default:
          e = new i(o.message, o.locator, { cause: n });
          break;
      }
    o.stack !== void 0 && (e.stack = o.stack), n = e;
  }
  return n;
}
function p(r) {
  let n;
  try {
    n = JSON.stringify(r);
  } catch {
    typeof r == "symbol" ? n = r.description ?? "Unknown error" : typeof r == "bigint" ? n = r.toString() : n = "Unknown error";
  }
  return n === "" && (n = "Unknown error"), n;
}
function b(r) {
  if (!(r == null || r === ""))
    return r.length > 2048 ? `${r.slice(0, 2048)}... [truncated]` : r;
}
export {
  d as APIError,
  a as ApplicationError,
  f as EngineError,
  c as FetchError,
  g as OperationalError,
  l as VueHandledError,
  u as WindowHandledPromiseRejectionError,
  E as WindowHandledRuntimeError,
  y as buildFetchError,
  h as concatenateSerialisedErrorMessages,
  R as ignoreErrors,
  w as normalizeToError,
  x as serialiseError,
  v as unserialiseError
};
