const c = "en-US", s = /* @__PURE__ */ new Map();
function f(e) {
  switch (e) {
    case "Edm.Binary":
      return "unknown";
    // Binary...
    case "Edm.Boolean":
      return "boolean";
    case "Edm.Byte":
      return "wholeNumber";
    case "Edm.DateTime":
      return "moment";
    // DateTime...
    case "Edm.DateTimeOffset":
      return "moment";
    // DateTimeOffset...
    case "Edm.Decimal":
      return "decimalNumber";
    case "Edm.Double":
      return "decimalNumber";
    case "Edm.Guid":
      return "string";
    case "Edm.Int16":
      return "wholeNumber";
    case "Edm.Int32":
      return "wholeNumber";
    case "Edm.Int64":
      return "wholeNumber";
    case "Edm.SByte":
      return "wholeNumber";
    case "Edm.Single":
      return "decimalNumber";
    case "Edm.String":
      return "string";
    case "Edm.Time":
      return "momentTime";
    // Time...
    default:
      return "unknown";
  }
}
function l(e) {
  if (e) {
    const t = e.lastIndexOf("/"), n = e.lastIndexOf(".", t === -1 ? e.length : t);
    return n === -1 ? e : e.slice(0, Math.max(0, n));
  }
}
function m(e) {
  if (e) {
    const t = e.lastIndexOf(".");
    if (t !== -1) return e.slice(Math.max(0, t + 1));
  }
}
function r(e, t = 2, n = t, i = c) {
  if (e == null) return "";
  const u = `${i}decimal${t}.${n}`;
  let a = s.get(u);
  return a || (a = new Intl.NumberFormat(i, {
    localeMatcher: "best fit",
    maximumFractionDigits: t,
    minimumFractionDigits: n,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), s.set(u, a)), a.format(e);
}
function d(e) {
  return e == null ? "" : e < 1e3 ? o(e) : e < 1e6 ? `${r(e / 1e3, 2, 0)}K` : e < 1e9 ? `${r(e / 1e6, 2, 0)}M` : e < 1e12 ? `${r(e / 1e9, 2, 0)}B` : `${r(e / 1e12, 2, 0)}T`;
}
function x(e) {
  return e == null ? "" : e === 1 ? "1 byte" : e < 1024 ? `${o(e)} bytes` : e < 1048576 ? `${r(e / 1024, 2, 0)} KB` : e < 1073741824 ? `${r(e / 1048576, 2, 0)} MB` : e < 1099511627776 ? `${r(e / 1073741824, 2, 0)} GB` : `${r(e / 1099511627776, 2, 0)} TB`;
}
function p(e) {
  return e == null ? "" : e < 1e3 ? `${o(e)} ms` : e === 1e3 ? `${o(e)} sec` : e < 6e4 ? `${r(e / 1e3, 2, 0)} secs` : e === 6e4 ? "1 min" : e < 36e5 ? `${r(e / 6e4, 2, 0)} mins` : e === 36e5 ? "1 hr" : e < 864e5 ? `${r(e / 36e5, 2, 0)} hrs` : e === 864e5 ? "1 day" : `${r(e / 864e5, 2, 0)} days`;
}
function o(e, t = c) {
  if (e == null) return "";
  const n = `${t}decimal0.0`;
  let i = s.get(n);
  return i || (i = new Intl.NumberFormat(t, {
    localeMatcher: "best fit",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    minimumIntegerDigits: 1,
    style: "decimal",
    useGrouping: !0
  }), s.set(n, i)), i.format(e);
}
function E(e) {
  switch (e) {
    case "csv":
      return "text/csv";
    case "tab":
    case "tsv":
      return "text/tab-separated-values";
    case "xls":
      return "application/vnd.ms-excel";
    case "xlsx":
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    default:
      return "application/octet-stream";
  }
}
export {
  f as convertODataTypeIdToUsageTypeId,
  m as extractExtensionFromPath,
  l as extractNameFromPath,
  r as formatNumberAsDecimalNumber,
  p as formatNumberAsDuration,
  d as formatNumberAsSize,
  x as formatNumberAsStorageSize,
  o as formatNumberAsWholeNumber,
  E as lookupMimeTypeForExtension
};
