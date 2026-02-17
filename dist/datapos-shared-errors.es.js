class c extends Error {
  locator;
  /** Logical source of the error. */
  constructor(s, o, e) {
    super(s, e), this.name = new.target.name, this.locator = o;
  }
}
class i extends c {
}
class g extends i {
}
class u extends i {
  constructor(s, o, e) {
    super(s, o, e), this.name = new.target.name;
  }
}
class l extends i {
  body;
  /** Sanitized HTTP response body. */
  constructor(s, o, e, t) {
    super(s, o, t), this.name = new.target.name, this.body = d(e ?? void 0);
  }
}
async function y(r, s, o) {
  const e = ` - ${r.statusText}`, t = `${s} Response status '${r.status}${r.statusText ? e : ""}' received.`;
  let a;
  try {
    a = await r.text();
  } catch (f) {
    a = `<body unavailable: ${n(f).message}>`;
  }
  return new l(t, o, a);
}
function b(r) {
  return r.map((s) => s.message).join(" ");
}
function w(r) {
  try {
    r();
  } catch {
  }
}
function n(r) {
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
function k(r) {
  const s = /* @__PURE__ */ new Set(), o = [];
  let e = n(r);
  for (; e != null && !s.has(e); ) {
    s.add(e);
    let t;
    e instanceof l ? (t = { body: e.body, locator: e.locator, message: e.message, name: "FetchError", stack: e.stack }, e = e.cause == null ? null : n(e.cause)) : e instanceof u ? (t = { body: void 0, locator: e.locator, message: e.message, name: "EngineError", stack: e.stack }, e = e.cause == null ? null : n(e.cause)) : e instanceof c ? (t = { body: void 0, locator: e.locator, message: e.message, name: "DataPosError", stack: e.stack }, e = e.cause == null ? null : n(e.cause)) : e instanceof Error ? (t = { body: void 0, locator: "", message: e.message, name: e.name, stack: e.stack }, e = e.cause == null ? null : n(e.cause)) : (t = { body: void 0, locator: "", message: E(e), name: "Error", stack: void 0 }, e = null), /(?:\.{3}|[.!?])$/.test(t.message) || (t.message += "."), o.push(t);
  }
  return o;
}
function h(r) {
  if (r.length === 0) return;
  let s;
  for (const o of r.toReversed()) {
    let e;
    if (console.log(1111, o), o.body !== void 0)
      console.log("FetchError", o), e = new l(o.message, o.locator, o.body, { cause: s });
    else if (o.locator === "")
      console.log("Generic", o), e = new Error(o.message, { cause: s }), e.name = o.name;
    else
      switch (o.name) {
        case "APIError":
          console.log("APIError", o), e = new g(o.message, o.locator, { cause: s });
          break;
        case "EngineError":
          console.log("EngineError", o), e = new u(o.message, o.locator, { cause: s });
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
          console.log("Fallback", o), e = new c(o.message, o.locator, { cause: s });
          break;
      }
    o.stack !== void 0 && (e.stack = o.stack), s = e;
  }
  return s;
}
function E(r) {
  let s;
  try {
    s = JSON.stringify(r);
  } catch {
    typeof r == "symbol" ? s = r.description ?? "Unknown error" : typeof r == "bigint" ? s = r.toString() : s = "Unknown error";
  }
  return s === "" && (s = "Unknown error"), s;
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
  w as ignoreErrors,
  n as normalizeToError,
  k as serialiseError,
  h as unserialiseError
};
