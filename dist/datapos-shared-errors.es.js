class c extends Error {
  locator;
  /** Logical source of the error. */
  constructor(o, s, e) {
    super(o, e), this.name = new.target.name, this.locator = s;
  }
}
class i extends c {
}
class g extends i {
}
class u extends i {
  constructor(o, s, e) {
    super(o, s, e), this.name = "EngineError";
  }
}
class l extends i {
  body;
  /** Sanitized HTTP response body. */
  constructor(o, s, e, n) {
    super(o, s, n), this.name = new.target.name, this.body = d(e ?? void 0);
  }
}
async function y(r, o, s) {
  const e = ` - ${r.statusText}`, n = `${o} Response status '${r.status}${r.statusText ? e : ""}' received.`;
  let a;
  try {
    a = await r.text();
  } catch (f) {
    a = `<body unavailable: ${t(f).message}>`;
  }
  return new l(n, s, a);
}
function b(r) {
  return r.map((o) => o.message).join(" ");
}
function k(r) {
  try {
    r();
  } catch {
  }
}
function t(r) {
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
function w(r) {
  const o = /* @__PURE__ */ new Set(), s = [];
  let e = t(r);
  for (; e != null && !o.has(e); ) {
    o.add(e);
    let n;
    e instanceof l ? (n = { body: e.body, locator: e.locator, message: e.message, name: "FetchError", stack: e.stack }, e = e.cause == null ? null : t(e.cause)) : e instanceof u ? (n = { body: void 0, locator: e.locator, message: e.message, name: "EngineError", stack: e.stack }, e = e.cause == null ? null : t(e.cause)) : e instanceof c ? (n = { body: void 0, locator: e.locator, message: e.message, name: "DataPosError", stack: e.stack }, e = e.cause == null ? null : t(e.cause)) : e instanceof Error ? (n = { body: void 0, locator: "", message: e.message, name: e.name, stack: e.stack }, e = e.cause == null ? null : t(e.cause)) : (n = { body: void 0, locator: "", message: E(e), name: "Error", stack: void 0 }, e = null), /(?:\.{3}|[.!?])$/.test(n.message) || (n.message += "."), s.push(n);
  }
  return s;
}
function h(r) {
  if (r.length === 0) return;
  let o;
  for (const s of r.toReversed()) {
    let e;
    if (console.log(1111, s), s.body !== void 0)
      console.log("FetchError"), e = new l(s.message, s.locator, s.body, { cause: o });
    else if (s.locator === "")
      console.log("Generic"), e = new Error(s.message, { cause: o }), e.name = s.name;
    else
      switch (s.name) {
        case "APIError":
          console.log("APIError"), e = new g(s.message, s.locator, { cause: o });
          break;
        case "EngineError":
          e = new u(s.message, s.locator, { cause: o }), console.log("EngineError", e);
          break;
        // case 'ApplicationError':
        //     error = new ApplicationError(serialised.message, serialised.locator, { rebuiltError });
        //     break;
        // case 'OperationalError':
        //     error = new OperationalError(serialised.message, serialised.locator, { rebuiltError });
        //     break;
        // case 'WindowHandledRuntimeError':
        //     error = new WindowHandledRuntimeError(serialised.message, serialised.locator, { rebuiltError });
        //     break;
        // case 'WindowHandledPromiseRejectionError':
        //     error = new WindowHandledPromiseRejectionError(serialised.message, serialised.locator, { rebuiltError });
        //     break;
        default:
          console.log("Fallback"), e = new c(s.message, s.locator, { cause: o });
          break;
      }
    s.stack !== void 0 && (e.stack = s.stack), o = e;
  }
  return o;
}
function E(r) {
  let o;
  try {
    o = JSON.stringify(r);
  } catch {
    typeof r == "symbol" ? o = r.description ?? "Unknown error" : typeof r == "bigint" ? o = r.toString() : o = "Unknown error";
  }
  return o === "" && (o = "Unknown error"), o;
}
function d(r) {
  if (!(r == null || r === ""))
    return r.length > 2048 ? `${r.slice(0, 2048)}... [truncated]` : r;
}
export {
  g as APIError,
  u as EngineError,
  l as FetchError,
  y as buildFetchError,
  b as concatenateSerialisedErrorMessages,
  k as ignoreErrors,
  t as normalizeToError,
  w as serialiseError,
  h as unserialiseError
};
