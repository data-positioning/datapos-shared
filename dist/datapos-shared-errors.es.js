class c extends Error {
  locator;
  /** Logical source of the error. */
  constructor(s, t, e) {
    super(s, e), this.name = new.target.name, this.locator = t;
  }
}
class i extends c {
}
class d extends i {
}
class u extends i {
}
class l extends i {
  body;
  /** Sanitized HTTP response body. */
  constructor(s, t, e, o) {
    super(s, t, o), this.name = new.target.name, this.body = g(e ?? void 0);
  }
}
async function y(r, s, t) {
  const e = ` - ${r.statusText}`, o = `${s} Response status '${r.status}${r.statusText ? e : ""}' received.`;
  let a;
  try {
    a = await r.text();
  } catch (f) {
    a = `<body unavailable: ${n(f).message}>`;
  }
  return new l(o, t, a);
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
  const s = /* @__PURE__ */ new Set(), t = [];
  let e = n(r);
  for (; e != null && !s.has(e); ) {
    s.add(e);
    let o;
    e instanceof l ? (o = { body: e.body, locator: e.locator, message: e.message, name: "FetchError", stack: e.stack }, e = e.cause == null ? null : n(e.cause)) : e instanceof u ? (o = { body: void 0, locator: e.locator, message: e.message, name: "EngineError", stack: e.stack }, e = e.cause == null ? null : n(e.cause)) : e instanceof c ? (o = { body: void 0, locator: e.locator, message: e.message, name: "DataPosError", stack: e.stack }, e = e.cause == null ? null : n(e.cause)) : e instanceof Error ? (o = { body: void 0, locator: "", message: e.message, name: e.name, stack: e.stack }, e = e.cause == null ? null : n(e.cause)) : (o = { body: void 0, locator: "", message: E(e), name: "Error", stack: void 0 }, e = null), /(?:\.{3}|[.!?])$/.test(o.message) || (o.message += "."), t.push(o);
  }
  return t;
}
function h(r) {
  if (r.length === 0) return;
  let s;
  for (const t of r.toReversed()) {
    let e;
    if (console.log(1111, t), t.body !== void 0)
      e = new l(t.message, t.locator, t.body, { cause: s });
    else if (t.locator === "")
      e = new Error(t.message, { cause: s }), e.name = t.name;
    else
      switch (t.name) {
        case "APIError":
          e = new d(t.message, t.locator, { cause: s });
          break;
        case "EngineError":
          e = new u(t.message, t.locator, { cause: s });
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
          e = new c(t.message, t.locator, { cause: s });
          break;
      }
    t.stack !== void 0 && (e.stack = t.stack), s = e;
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
function g(r) {
  if (!(r == null || r === ""))
    return r.length > 2048 ? `${r.slice(0, 2048)}... [truncated]` : r;
}
export {
  d as APIError,
  u as EngineError,
  l as FetchError,
  y as buildFetchError,
  b as concatenateSerialisedErrorMessages,
  w as ignoreErrors,
  n as normalizeToError,
  k as serialiseError,
  h as unserialiseError
};
