class c extends Error {
  locator;
  /** Logical source of the error. */
  constructor(t, o, r) {
    super(t, r), this.name = new.target.name, this.locator = o;
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
  constructor(t, o, r, s) {
    super(t, o, s), this.name = new.target.name, this.body = g(r ?? void 0);
  }
}
async function y(e, t, o) {
  const r = ` - ${e.statusText}`, s = `${t} Response status '${e.status}${e.statusText ? r : ""}' received.`;
  let a;
  try {
    a = await e.text();
  } catch (u) {
    a = `<body unavailable: ${n(u).message}>`;
  }
  return new l(s, o, a);
}
function w(e) {
  return e.map((t) => t.message).join(" ");
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
function k(e) {
  const t = /* @__PURE__ */ new Set(), o = [];
  let r = n(e);
  for (; r != null && !t.has(r); ) {
    t.add(r);
    let s;
    r instanceof l ? (s = { body: r.body, locator: r.locator, message: r.message, name: "FetchError", stack: r.stack }, r = r.cause == null ? null : n(r.cause)) : r instanceof c ? (s = { body: void 0, locator: r.locator, message: r.message, name: "DataPosError", stack: r.stack }, r = r.cause == null ? null : n(r.cause)) : r instanceof Error ? (s = { body: void 0, locator: "", message: r.message, name: r.name, stack: r.stack }, r = r.cause == null ? null : n(r.cause)) : (s = { body: void 0, locator: "", message: E(r), name: "Error", stack: void 0 }, r = null), /(?:\.{3}|[.!?])$/.test(s.message) || (s.message += "."), o.push(s);
  }
  return o;
}
function h(e) {
  if (e.length === 0) return;
  let t;
  for (const o of e.toReversed()) {
    let r;
    if (console.log(1111, o), o.body !== void 0)
      r = new l(o.message, o.locator, o.body, { cause: t });
    else if (o.locator === "")
      r = new Error(o.message, { cause: t }), r.name = o.name;
    else
      switch (o.name) {
        case "APIError":
          r = new f(o.message, o.locator, { cause: t });
          break;
        case "EngineError":
          r = new d(o.message, o.locator, { cause: t });
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
          r = new c(o.message, o.locator, { cause: t });
          break;
      }
    o.stack !== void 0 && (r.stack = o.stack), t = r;
  }
  return t;
}
function E(e) {
  let t;
  try {
    t = JSON.stringify(e);
  } catch {
    typeof e == "symbol" ? t = e.description ?? "Unknown error" : typeof e == "bigint" ? t = e.toString() : t = "Unknown error";
  }
  return t === "" && (t = "Unknown error"), t;
}
function g(e) {
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
  n as normalizeToError,
  k as serialiseError,
  h as unserialiseError
};
