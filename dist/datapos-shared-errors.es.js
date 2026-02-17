class i extends Error {
  locator;
  /** Logical source of the error. */
  constructor(o, n, e) {
    super(o, e), this.name = new.target.name, this.locator = n;
  }
}
class s extends i {
}
class f extends s {
}
class u extends s {
}
class l extends s {
  body;
  /** Sanitized HTTP response body. */
  constructor(o, n, e, t) {
    super(o, n, t), this.name = new.target.name, this.body = E(e ?? void 0);
  }
}
class m extends i {
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
class b extends s {
}
class k extends s {
}
async function p(r, o, n) {
  const e = ` - ${r.statusText}`, t = `${o} Response status '${r.status}${r.statusText ? e : ""}' received.`;
  let a;
  try {
    a = await r.text();
  } catch (d) {
    a = `<body unavailable: ${c(d).message}>`;
  }
  return new l(t, n, a);
}
function h(r) {
  return r.map((o) => o.message).join(" ");
}
function x(r) {
  try {
    r();
  } catch {
  }
}
function c(r) {
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
function R(r) {
  const o = /* @__PURE__ */ new Set(), n = [];
  let e = c(r);
  for (; e != null && !o.has(e); ) {
    o.add(e);
    let t;
    e instanceof l ? (t = { body: e.body, locator: e.locator, message: e.message, name: e.name, stack: e.stack }, e = e.cause == null ? null : c(e.cause)) : e instanceof i ? (t = { body: void 0, locator: e.locator, message: e.message, name: e.name, stack: e.stack }, e = e.cause == null ? null : c(e.cause)) : e instanceof Error ? (t = { body: void 0, locator: "", message: e.message, name: e.name, stack: e.stack }, e = e.cause == null ? null : c(e.cause)) : (t = { body: void 0, locator: "", message: g(e), name: "Error", stack: void 0 }, e = null), /(?:\.{3}|[.!?])$/.test(t.message) || (t.message += "."), n.push(t);
  }
  return n;
}
function O(r) {
  if (r.length === 0) return;
  let o;
  console.log(1111, r);
  for (const n of r.toReversed()) {
    console.log(2222, n);
    let e;
    if (n.body !== void 0)
      e = new l(n.message, n.locator, n.body, { cause: o });
    else if (n.locator === "")
      e = new Error(n.message, { cause: o }), e.name = n.name;
    else
      switch (n.name) {
        case "APIError":
          e = new f(n.message, n.locator, { cause: o });
          break;
        case "EngineError":
          e = new u(n.message, n.locator, { cause: o });
          break;
        case "ApplicationError":
          e = new s(n.message, n.locator, { cause: o });
          break;
        case "OperationalError":
          e = new m(n.message, n.locator, { cause: o });
          break;
        // case 'WindowHandledRuntimeError':
        //     error = new WindowHandledRuntimeError(serialised.message, serialised.locator, { cause });
        //     break;
        // case 'WindowHandledPromiseRejectionError':
        //     error = new WindowHandledPromiseRejectionError(serialised.message, serialised.locator, { cause });
        //     break;
        default:
          e = new i(n.message, n.locator, { cause: o });
          break;
      }
    console.log(3333, e), n.stack !== void 0 && (e.stack = n.stack), o = e;
  }
  return o;
}
function g(r) {
  let o;
  try {
    o = JSON.stringify(r);
  } catch {
    typeof r == "symbol" ? o = r.description ?? "Unknown error" : typeof r == "bigint" ? o = r.toString() : o = "Unknown error";
  }
  return o === "" && (o = "Unknown error"), o;
}
function E(r) {
  if (!(r == null || r === ""))
    return r.length > 2048 ? `${r.slice(0, 2048)}... [truncated]` : r;
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
  c as normalizeToError,
  R as serialiseError,
  O as unserialiseError
};
