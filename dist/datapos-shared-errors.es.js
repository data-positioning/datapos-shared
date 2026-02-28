class c extends Error {
  locator;
  // Error locator 'package.module.method'
  constructor(s, o, r) {
    super(s, r), this.name = "DPUError", this.locator = o;
  }
}
class y extends c {
  constructor(s, o, r) {
    super(s, o, r), this.name = "AppError";
  }
}
class E extends c {
  body;
  // Sanitized snapshot of the response body
  constructor(s, o, r, t) {
    super(s, o, t), this.name = "APIError", this.body = l(r ?? void 0);
  }
}
class d extends c {
  constructor(s, o, r) {
    super(s, o, r), this.name = "EngineError";
  }
}
class m extends c {
  constructor(s, o, r) {
    super(s, o, r), this.name = "ConnectorError";
  }
}
class i extends c {
  body;
  // Sanitized portion of the response body
  constructor(s, o, r, t) {
    super(s, o, t), this.name = "FetchError", this.body = l(r ?? void 0);
  }
}
async function b(e, s, o) {
  const r = ` - ${e.statusText}`, t = `${s} Response status '${e.status}${e.statusText ? r : ""}' received.`;
  let n;
  try {
    n = await e.text();
  } catch (u) {
    n = `<body unavailable: ${a(u).message}>`;
  }
  return new i(t, o, n);
}
function p(e) {
  return e.map((s) => s.message).join(" ");
}
function k(e) {
  try {
    e();
  } catch {
  }
}
function a(e) {
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
function h(e) {
  const s = /* @__PURE__ */ new Set(), o = [];
  let r = a(e);
  for (; r != null && !s.has(r); ) {
    s.add(r);
    let t;
    switch (r.name) {
      case "APIError": {
        const n = r;
        t = { body: n.body, locator: n.locator, message: r.message, name: "APIError", stack: r.stack }, r = r.cause == null ? null : a(r.cause);
        break;
      }
      case "AppError": {
        t = { body: void 0, locator: r.locator, message: r.message, name: "AppError", stack: r.stack }, r = r.cause == null ? null : a(r.cause);
        break;
      }
      case "ConnectorError": {
        t = { body: void 0, locator: r.locator, message: r.message, name: "ConnectorError", stack: r.stack }, r = r.cause == null ? null : a(r.cause);
        break;
      }
      case "EngineError": {
        t = { body: void 0, locator: r.locator, message: r.message, name: "EngineError", stack: r.stack }, r = r.cause == null ? null : a(r.cause);
        break;
      }
      case "FetchError": {
        const n = r;
        t = { body: n.body, locator: n.locator, message: r.message, name: "FetchError", stack: r.stack }, r = r.cause == null ? null : a(r.cause);
        break;
      }
      default:
        r.name ? (t = { body: void 0, locator: "", message: r.message, name: r.name, stack: r.stack }, r = r.cause == null ? null : a(r.cause)) : (t = { body: void 0, locator: "", message: g(r), name: "Error", stack: void 0 }, r = null);
    }
    /(?:\.{3}|[.!?])$/.test(t.message) || (t.message += "."), o.push(t);
  }
  return o;
}
function w(e) {
  if (e.length === 0) return;
  let s;
  for (const o of e.toReversed()) {
    let r;
    switch (o.name) {
      case "APIError":
        r = new E(o.message, o.locator, o.body, { cause: s });
        break;
      case "ConnectorError":
        r = new m(o.message, o.locator, { cause: s });
        break;
      case "EngineError":
        r = new d(o.message, o.locator, { cause: s });
        break;
      case "FetchError":
        r = new i(o.message, o.locator, o.body, { cause: s });
        break;
      default:
        r = new Error(o.message, { cause: s }), r.name = o.name;
        break;
    }
    o.stack !== void 0 && (r.stack = o.stack), s = r;
  }
  return s;
}
function g(e) {
  let s;
  try {
    s = JSON.stringify(e);
  } catch {
    typeof e == "symbol" ? s = e.description ?? "Unknown error" : typeof e == "bigint" ? s = e.toString() : s = "Unknown error";
  }
  return s === "" && (s = "Unknown error"), s;
}
function l(e) {
  if (!(e == null || e === ""))
    return e.length > 2048 ? `${e.slice(0, 2048)}... [truncated]` : e;
}
export {
  E as APIError,
  y as AppError,
  m as ConnectorError,
  c as DPUError,
  d as EngineError,
  i as FetchError,
  b as buildFetchError,
  p as concatenateSerialisedErrorMessages,
  k as ignoreErrors,
  a as normalizeToError,
  h as serialiseError,
  w as unserialiseError
};
