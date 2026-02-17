class c extends Error {
  locator;
  /** Logical source of the error. */
  constructor(o, n, e) {
    super(o, e), this.name = new.target.name, this.locator = n;
  }
}
class s extends c {
}
class m extends s {
}
class f extends s {
}
class l extends s {
  body;
  /** Sanitized HTTP response body. */
  constructor(o, n, e, t) {
    super(o, n, t), this.name = new.target.name, this.body = b(e ?? void 0);
  }
}
class u extends c {
}
class y extends s {
  componentName;
  /** Vue component name, if available. */
  info;
  /** Vue error info string. */
  constructor(o, n, e, t, a) {
    super(o, n, a), this.name = new.target.name, this.info = e, this.componentName = t;
  }
}
class E extends s {
}
class g extends s {
}
async function p(r, o, n) {
  const e = ` - ${r.statusText}`, t = `${o} Response status '${r.status}${r.statusText ? e : ""}' received.`;
  let a;
  try {
    a = await r.text();
  } catch (d) {
    a = `<body unavailable: ${i(d).message}>`;
  }
  return new l(t, n, a);
}
function h(r) {
  return r.map((o) => o.message).join(" ");
}
function R(r) {
  try {
    r();
  } catch {
  }
}
function i(r) {
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
function x(r) {
  const o = /* @__PURE__ */ new Set(), n = [];
  let e = i(r);
  for (; e != null && !o.has(e); ) {
    o.add(e);
    let t;
    e instanceof l ? (t = { body: e.body, locator: e.locator, message: e.message, name: e.name, stack: e.stack }, e = e.cause == null ? null : i(e.cause)) : e instanceof c ? (t = { body: void 0, locator: e.locator, message: e.message, name: e.name, stack: e.stack }, e = e.cause == null ? null : i(e.cause)) : e instanceof Error ? (t = { body: void 0, locator: "", message: e.message, name: e.name, stack: e.stack }, e = e.cause == null ? null : i(e.cause)) : (t = { body: void 0, locator: "", message: w(e), name: "Error", stack: void 0 }, e = null), /(?:\.{3}|[.!?])$/.test(t.message) || (t.message += "."), n.push(t);
  }
  return n;
}
function O(r) {
  if (r.length === 0) return;
  let o;
  for (const n of r.toReversed()) {
    let e;
    if (n.body !== void 0)
      e = new l(n.message, n.locator, n.body, { cause: o });
    else if (n.locator === "")
      e = new Error(n.message, { cause: o }), e.name = n.name;
    else
      switch (n.name) {
        case "APIError":
          e = new m(n.message, n.locator, { cause: o });
          break;
        case "EngineError":
          e = new f(n.message, n.locator, { cause: o });
          break;
        case "ApplicationError":
          e = new s(n.message, n.locator, { cause: o });
          break;
        case "OperationalError":
          e = new u(n.message, n.locator, { cause: o });
          break;
        case "WindowHandledRuntimeError":
          e = new E(n.message, n.locator, { cause: o });
          break;
        case "WindowHandledPromiseRejectionError":
          e = new g(n.message, n.locator, { cause: o });
          break;
        default:
          e = new c(n.message, n.locator, { cause: o });
          break;
      }
    n.stack !== void 0 && (e.stack = n.stack), o = e;
  }
  return o;
}
function w(r) {
  let o;
  try {
    o = JSON.stringify(r);
  } catch {
    typeof r == "symbol" ? o = r.description ?? "Unknown error" : typeof r == "bigint" ? o = r.toString() : o = "Unknown error";
  }
  return o === "" && (o = "Unknown error"), o;
}
function b(r) {
  if (!(r == null || r === ""))
    return r.length > 2048 ? `${r.slice(0, 2048)}... [truncated]` : r;
}
export {
  m as APIError,
  s as ApplicationError,
  f as EngineError,
  l as FetchError,
  u as OperationalError,
  y as VueHandledError,
  g as WindowHandledPromiseRejectionError,
  E as WindowHandledRuntimeError,
  p as buildFetchError,
  h as concatenateSerialisedErrorMessages,
  R as ignoreErrors,
  i as normalizeToError,
  x as serialiseError,
  O as unserialiseError
};
