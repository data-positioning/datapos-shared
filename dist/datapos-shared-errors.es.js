class c extends Error {
  locator;
  /** Logical source of the error. */
  constructor(n, o, r) {
    super(n, r), this.name = new.target.name, this.locator = o;
  }
}
class i extends c {
}
class f extends i {
}
class d extends i {
}
class l extends i {
  body;
  /** Sanitized HTTP response body. */
  constructor(n, o, r, t) {
    super(n, o, t), this.name = new.target.name, this.body = m(r ?? void 0);
  }
}
async function y(e, n, o) {
  const r = ` - ${e.statusText}`, t = `${n} Response status '${e.status}${e.statusText ? r : ""}' received.`;
  let a;
  try {
    a = await e.text();
  } catch (u) {
    a = `<body unavailable: ${s(u).message}>`;
  }
  return new l(t, o, a);
}
function w(e) {
  return e.map((n) => n.message).join(" ");
}
function b(e) {
  try {
    e();
  } catch {
  }
}
function s(e) {
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
function k(e) {
  const n = /* @__PURE__ */ new Set(), o = [];
  let r = s(e);
  for (; r != null && !n.has(r); ) {
    n.add(r);
    let t;
    r instanceof l ? (t = { body: r.body, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause == null ? null : s(r.cause)) : r instanceof c ? (t = { body: void 0, locator: r.locator, message: r.message, name: r.name, stack: r.stack }, r = r.cause == null ? null : s(r.cause)) : r instanceof Error ? (t = { body: void 0, locator: "", message: r.message, name: r.name, stack: r.stack }, r = r.cause == null ? null : s(r.cause)) : (t = { body: void 0, locator: "", message: g(r), name: "Error", stack: void 0 }, r = null), /(?:\.{3}|[.!?])$/.test(t.message) || (t.message += "."), o.push(t);
  }
  return o;
}
function h(e) {
  if (e.length === 0) return;
  let n;
  console.log(1111, e);
  for (const o of e.toReversed()) {
    console.log(2222, o);
    let r;
    if (o.body !== void 0)
      r = new l(o.message, o.locator, o.body, { cause: n });
    else if (o.locator === "")
      r = new Error(o.message, { cause: n }), r.name = o.name;
    else
      switch (o.name) {
        case "APIError":
          r = new f(o.message, o.locator, { cause: n });
          break;
        case "EngineError":
          r = new d(o.message, o.locator, { cause: n });
          break;
        // case 'ApplicationError':
        //     error = new ApplicationError(serialised.message, serialised.locator, { pendingError });
        //     break;
        // case 'OperationalError':
        //     error = new OperationalError(serialised.message, serialised.locator, { pendingError });
        //     break;
        // case 'WindowHandledRuntimeError':
        //     error = new WindowHandledRuntimeError(serialised.message, serialised.locator, { pendingError });
        //     break;
        // case 'WindowHandledPromiseRejectionError':
        //     error = new WindowHandledPromiseRejectionError(serialised.message, serialised.locator, { pendingError });
        //     break;
        default:
          r = new c(o.message, o.locator, { cause: n });
          break;
      }
    o.stack !== void 0 && (r.stack = o.stack), n = r;
  }
  return console.log(3333, n), n;
}
function g(e) {
  let n;
  try {
    n = JSON.stringify(e);
  } catch {
    typeof e == "symbol" ? n = e.description ?? "Unknown error" : typeof e == "bigint" ? n = e.toString() : n = "Unknown error";
  }
  return n === "" && (n = "Unknown error"), n;
}
function m(e) {
  if (!(e == null || e === ""))
    return e.length > 2048 ? `${e.slice(0, 2048)}... [truncated]` : e;
}
export {
  f as APIError,
  d as EngineError,
  l as FetchError,
  y as buildFetchError,
  w as concatenateSerialisedErrorMessages,
  b as ignoreErrors,
  s as normalizeToError,
  k as serialiseError,
  h as unserialiseError
};
