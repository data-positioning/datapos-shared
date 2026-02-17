class c extends Error {
  locator;
  // Logical source of the error
  constructor(o, s, r) {
    super(o, r), this.name = "DPUError", this.locator = s;
  }
}
class E extends c {
  body;
  // Sanitized snapshot of the response body
  constructor(o, s, r, t) {
    super(o, s, t), this.name = "APIError", this.body = l(r ?? void 0);
  }
}
class d extends c {
  constructor(o, s, r) {
    super(o, s, r), this.name = "EngineError";
  }
}
class m extends c {
  constructor(o, s, r) {
    super(o, s, r), this.name = "ConnectorError";
  }
}
class i extends c {
  body;
  // Sanitized snapshot of the response body
  constructor(o, s, r, t) {
    super(o, s, t), this.name = "FetchError", this.body = l(r ?? void 0);
  }
}
async function b(e, o, s) {
  const r = ` - ${e.statusText}`, t = `${o} Response status '${e.status}${e.statusText ? r : ""}' received.`;
  let n;
  try {
    n = await e.text();
  } catch (u) {
    n = `<body unavailable: ${a(u).message}>`;
  }
  return new i(t, s, n);
}
function y(e) {
  return e.map((o) => o.message).join(" ");
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
  const o = /* @__PURE__ */ new Set(), s = [];
  let r = a(e);
  for (; r != null && !o.has(r); ) {
    o.add(r);
    let t;
    switch (console.log("0000", r), r.name) {
      case "APIError": {
        const n = r;
        t = { body: n.body, locator: n.locator, message: r.message, name: "APIError", stack: r.stack }, r = r.cause == null ? null : a(r.cause);
        break;
      }
      case "ConnectorError": {
        const n = r;
        console.log(1111, n.locator), t = { body: void 0, locator: n.locator, message: r.message, name: "ConnectorError", stack: r.stack }, r = r.cause == null ? null : a(r.cause);
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
      case "DPUError": {
        t = { body: void 0, locator: r.locator, message: r.message, name: "DPUError", stack: r.stack }, r = r.cause == null ? null : a(r.cause);
        break;
      }
      case "Error":
        t = { body: void 0, locator: "", message: r.message, name: r.name, stack: r.stack }, r = r.cause == null ? null : a(r.cause);
        break;
      default:
        t = { body: void 0, locator: "", message: g(r), name: "Error", stack: void 0 }, r = null;
    }
    /(?:\.{3}|[.!?])$/.test(t.message) || (t.message += "."), s.push(t);
  }
  return s;
}
function p(e) {
  if (e.length === 0) return;
  let o;
  for (const s of e.toReversed()) {
    let r;
    switch (s.name) {
      case "APIError":
        r = new E(s.message, s.locator, s.body, { cause: o });
        break;
      case "ConnectorError":
        console.log(2222, s.locator), r = new m(s.message, s.locator, { cause: o });
        break;
      case "EngineError":
        r = new d(s.message, s.locator, { cause: o });
        break;
      case "FetchError":
        r = new i(s.message, s.locator, s.body, { cause: o });
        break;
      case "DPUError":
        r = new c(s.message, s.locator, { cause: o });
        break;
      default:
        r = new Error(s.message, { cause: o }), r.name = s.name;
        break;
    }
    s.stack !== void 0 && (r.stack = s.stack), o = r;
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
function l(e) {
  if (!(e == null || e === ""))
    return e.length > 2048 ? `${e.slice(0, 2048)}... [truncated]` : e;
}
export {
  E as APIError,
  m as ConnectorError,
  c as DPUError,
  d as EngineError,
  i as FetchError,
  b as buildFetchError,
  y as concatenateSerialisedErrorMessages,
  k as ignoreErrors,
  a as normalizeToError,
  h as serialiseError,
  p as unserialiseError
};
