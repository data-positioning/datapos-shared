class a extends Error {
  locator;
  // Logical source of the error
  constructor(o, s, r) {
    super(o, r), this.name = "DPUError", this.locator = s;
  }
}
class l extends a {
  body;
  // Sanitized snapshot of the response body
  constructor(o, s, r, n) {
    super(o, s, n), this.name = "APIError", this.body = m(r ?? void 0);
  }
}
class u extends a {
  constructor(o, s, r) {
    super(o, s, r), this.name = "EngineError";
  }
}
class d extends a {
  id;
  // Connector identifier
  constructor(o, s, r, n) {
    super(o, s, n), this.name = "ConnectorError", this.id = r;
  }
}
class i extends a {
  body;
  // Sanitized snapshot of the response body
  constructor(o, s, r, n) {
    super(o, s, n), this.name = "FetchError", this.body = m(r ?? void 0);
  }
}
async function b(e, o, s) {
  const r = ` - ${e.statusText}`, n = `${o} Response status '${e.status}${e.statusText ? r : ""}' received.`;
  let c;
  try {
    c = await e.text();
  } catch (f) {
    c = `<body unavailable: ${t(f).message}>`;
  }
  return new i(n, s, c);
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
function t(e) {
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
  let r = t(e);
  for (; r != null && !o.has(r); ) {
    o.add(r);
    let n;
    r instanceof l ? (n = { body: r.body, componentId: void 0, locator: r.locator, message: r.message, name: "APIError", stack: r.stack }, r = r.cause == null ? null : t(r.cause)) : r instanceof d ? (n = { body: void 0, componentId: r.id, locator: r.locator, message: r.message, name: "ConnectorError", stack: r.stack }, r = r.cause == null ? null : t(r.cause)) : r instanceof u ? (n = { body: void 0, componentId: void 0, locator: r.locator, message: r.message, name: "EngineError", stack: r.stack }, r = r.cause == null ? null : t(r.cause)) : r instanceof i ? (n = { body: r.body, componentId: void 0, locator: r.locator, message: r.message, name: "FetchError", stack: r.stack }, r = r.cause == null ? null : t(r.cause)) : r instanceof a ? (n = { body: void 0, componentId: void 0, locator: r.locator, message: r.message, name: "DPUError", stack: r.stack }, r = r.cause == null ? null : t(r.cause)) : r instanceof Error ? (n = { body: void 0, componentId: void 0, locator: "", message: r.message, name: r.name, stack: r.stack }, r = r.cause == null ? null : t(r.cause)) : (n = { body: void 0, componentId: void 0, locator: "", message: E(r), name: "Error", stack: void 0 }, r = null), /(?:\.{3}|[.!?])$/.test(n.message) || (n.message += "."), s.push(n);
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
        r = new l(s.message, s.locator, s.body, { cause: o });
        break;
      case "ConnectorError":
        r = new d(s.message, s.locator, s.componentId, { cause: o });
        break;
      case "EngineError":
        r = new u(s.message, s.locator, { cause: o });
        break;
      case "FetchError":
        r = new i(s.message, s.locator, s.body, { cause: o });
        break;
      case "DPUError":
        r = new a(s.message, s.locator, { cause: o });
        break;
      default:
        r = new Error(s.message, { cause: o }), r.name = s.name;
        break;
    }
    s.stack !== void 0 && (r.stack = s.stack), o = r;
  }
  return o;
}
function E(e) {
  let o;
  try {
    o = JSON.stringify(e);
  } catch {
    typeof e == "symbol" ? o = e.description ?? "Unknown error" : typeof e == "bigint" ? o = e.toString() : o = "Unknown error";
  }
  return o === "" && (o = "Unknown error"), o;
}
function m(e) {
  if (!(e == null || e === ""))
    return e.length > 2048 ? `${e.slice(0, 2048)}... [truncated]` : e;
}
export {
  l as APIError,
  d as ConnectorError,
  u as EngineError,
  i as FetchError,
  b as buildFetchError,
  y as concatenateSerialisedErrorMessages,
  k as ignoreErrors,
  t as normalizeToError,
  h as serialiseError,
  p as unserialiseError
};
