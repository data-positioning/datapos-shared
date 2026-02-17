class c extends Error {
  locator;
  /** Logical source of the error. */
  constructor(o, n, r) {
    super(o, r), this.name = new.target.name, this.locator = n;
  }
}
class s extends c {
}
class f extends s {
}
class u extends s {
}
class l extends s {
  body;
  /** Sanitized HTTP response body. */
  constructor(o, n, r, t) {
    super(o, n, t), this.name = new.target.name, this.body = E(r ?? void 0);
  }
}
class m extends c {
}
class y extends s {
  componentName;
  /** Vue component name, if available. */
  info;
  /** Vue error info string. */
  constructor(o, n, r, t, a) {
    super(o, n, a), this.name = new.target.name, this.info = r, this.componentName = t;
  }
}
class b extends s {
}
class k extends s {
}
async function p(e, o, n) {
  const r = ` - ${e.statusText}`, t = `${o} Response status '${e.status}${e.statusText ? r : ""}' received.`;
  let a;
  try {
    a = await e.text();
  } catch (d) {
    a = `<body unavailable: ${i(d).message}>`;
  }
  return new l(t, n, a);
}
function h(e) {
  return e.map((o) => o.message).join(" ");
}
function x(e) {
  try {
    e();
  } catch {
  }
}
function i(e) {
  if (e instanceof Error) return e;
  if (typeof e == "string") return new Error(e);
  if (typeof e == "number" || typeof e == "boolean" || typeof e == "bigint") return new Error(String(e));
  if (typeof e == "symbol") return new Error(e.description ?? "Unknown error");
  if (typeof e == "object")
    try {
      return new Error(JSON.stringify(e));
    } catch {
      return new Error("Unknown error");
    }
  return new Error("Unknown error");
}
function R(e) {
  const o = /* @__PURE__ */ new Set(), n = [];
  let r = i(e);
  for (; r != null && !o.has(r); ) {
    o.add(r);
    let t;
    r instanceof l ? (t = { body: r.body, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause == null ? null : i(r.cause)) : r instanceof c ? (t = { body: void 0, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause == null ? null : i(r.cause)) : r instanceof Error ? (t = { body: void 0, locator: "", message: r.message, name: r.name, stack: r.stack }, r = r.cause == null ? null : i(r.cause)) : (t = { body: void 0, locator: "", message: g(r), name: "Error", stack: void 0 }, r = null), /(?:\.{3}|[.!?])$/.test(t.message) || (t.message += "."), n.push(t);
  }
  return n;
}
function O(e) {
  if (e.length === 0) return;
  let o;
  console.log(1111, e);
  for (const n of e.toReversed()) {
    console.log(2222, n);
    let r;
    if (n.body !== void 0)
      r = new l(n.message, n.locator, n.body, { cause: o });
    else if (n.locator === "")
      r = new Error(n.message, { cause: o }), r.name = n.name;
    else
      switch (n.name) {
        case "APIError":
          r = new f(n.message, n.locator, { cause: o });
          break;
        case "EngineError":
          r = new u(n.message, n.locator, { cause: o });
          break;
        case "ApplicationError":
          r = new s(n.message, n.locator, { cause: o });
          break;
        case "OperationalError":
          r = new m(n.message, n.locator, { cause: o });
          break;
        // case 'WindowHandledRuntimeError':
        //     error = new WindowHandledRuntimeError(serialised.message, serialised.locator, { cause });
        //     break;
        // case 'WindowHandledPromiseRejectionError':
        //     error = new WindowHandledPromiseRejectionError(serialised.message, serialised.locator, { cause });
        //     break;
        default:
          r = new c(n.message, n.locator, { cause: o });
          break;
      }
    n.stack !== void 0 && (r.stack = n.stack), o = r;
  }
  return o;
}
function g(e) {
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
  f as APIError,
  s as ApplicationError,
  u as EngineError,
  l as FetchError,
  m as OperationalError,
  y as VueHandledError,
  k as WindowHandledPromiseRejectionError,
  b as WindowHandledRuntimeError,
  p as buildFetchError,
  h as concatenateSerialisedErrorMessages,
  x as ignoreErrors,
  i as normalizeToError,
  R as serialiseError,
  O as unserialiseError
};
