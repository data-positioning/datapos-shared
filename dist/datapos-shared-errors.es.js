class c extends Error {
  data;
  locator;
  // Error locator 'package.module.method'
  constructor(s, t, r, a) {
    super(s, a), this.name = "DPUseError", this.data = r, this.locator = t;
  }
}
class E extends c {
  constructor(s, t, r, a) {
    super(s, t, r, a), this.name = "AppError";
  }
}
class d extends c {
  constructor(s, t, r, a) {
    super(s, t, r, a), this.name = "APIError";
  }
}
class m extends c {
  constructor(s, t, r, a) {
    super(s, t, r, a), this.name = "EngineError";
  }
}
class g extends c {
  constructor(s, t, r, a) {
    super(s, t, r, a), this.name = "ConnectorError";
  }
}
class u extends c {
  constructor(s, t, r, a) {
    super(s, t, r, a), this.name = "FetchError";
  }
}
async function p(e, s, t) {
  const r = ` - ${e.statusText}`, a = `${s} Response status '${e.status}${e.statusText ? r : ""}' received.`;
  let i;
  try {
    i = await e.text();
  } catch (l) {
    i = `<body unavailable: ${n(l).message}>`;
  }
  return new u(a, t, { body: k(i) });
}
function h(e) {
  return e.map((s) => s.message).join(" ");
}
function b(e) {
  try {
    e();
  } catch {
  }
}
function n(e) {
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
function w(e) {
  const s = /* @__PURE__ */ new Set(), t = [];
  let r = n(e);
  for (; r != null && !s.has(r); ) {
    s.add(r);
    let a;
    switch (r.name) {
      case "APIError": {
        const o = r;
        a = { data: o.data, locator: o.locator, message: r.message, name: "APIError", stack: r.stack }, r = r.cause == null ? null : n(r.cause);
        break;
      }
      case "AppError": {
        const o = r;
        a = { data: o.data, locator: o.locator, message: r.message, name: "AppError", stack: r.stack }, r = r.cause == null ? null : n(r.cause);
        break;
      }
      case "ConnectorError": {
        const o = r;
        a = { data: o.data, locator: o.locator, message: r.message, name: "ConnectorError", stack: r.stack }, r = r.cause == null ? null : n(r.cause);
        break;
      }
      case "EngineError": {
        const o = r;
        a = { data: o.data, locator: o.locator, message: r.message, name: "EngineError", stack: r.stack }, r = r.cause == null ? null : n(r.cause);
        break;
      }
      case "FetchError": {
        const o = r;
        a = { data: o.data, locator: o.locator, message: r.message, name: "FetchError", stack: r.stack }, r = r.cause == null ? null : n(r.cause);
        break;
      }
      default:
        const { cause: i, ...l } = Object.fromEntries(Object.entries(r));
        r.name ? (a = { data: l, locator: "", message: r.message, name: r.name, stack: r.stack }, r = r.cause == null ? null : n(r.cause)) : (a = { data: l, locator: "", message: f(r), name: "Error", stack: void 0 }, r = null);
    }
    /(?:\.{3}|[.!?])$/.test(a.message) || (a.message += "."), t.push(a);
  }
  return t;
}
function y(e) {
  if (e.length === 0) return;
  let s;
  for (const t of e.toReversed()) {
    let r;
    switch (t.name) {
      case "APIError":
        r = new d(t.message, t.locator, t.data, { cause: s });
        break;
      case "AppError":
        r = new E(t.message, t.locator, t.data, { cause: s });
        break;
      case "ConnectorError":
        r = new g(t.message, t.locator, t.data, { cause: s });
        break;
      case "EngineError":
        r = new m(t.message, t.locator, t.data, { cause: s });
        break;
      case "FetchError":
        r = new u(t.message, t.locator, t.data, { cause: s });
        break;
      default:
        r = new Error(t.message, { cause: s }), r.name = t.name;
        break;
    }
    t.stack !== void 0 && (r.stack = t.stack), s = r;
  }
  return s;
}
function f(e) {
  let s;
  try {
    s = JSON.stringify(e);
  } catch {
    typeof e == "symbol" ? s = e.description ?? "Unknown error" : typeof e == "bigint" ? s = e.toString() : s = "Unknown error";
  }
  return s === "" && (s = "Unknown error"), s;
}
function k(e) {
  if (!(e == null || e === ""))
    return e.length > 2048 ? `${e.slice(0, 2048)}... [truncated]` : e;
}
export {
  d as APIError,
  E as AppError,
  g as ConnectorError,
  c as DPUseError,
  m as EngineError,
  u as FetchError,
  p as buildFetchError,
  h as concatenateSerialisedErrorMessages,
  b as ignoreErrors,
  n as normalizeToError,
  w as serialiseError,
  y as unserialiseError
};
