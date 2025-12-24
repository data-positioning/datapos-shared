import { l as s, o as l, n as c, a as b, r as u, b as m, m as p, s as t, d as r, e as d, f as C, g as h, D as g } from "./index-5UsJyepS.js";
const f = s(["apiKey", "disabled", "oAuth2", "none"]), v = l({
  authMethodId: f,
  activeConnectionCount: r(d()),
  canDescribe: r(h()),
  id: r(t()),
  label: r(C),
  maxConnectionCount: r(d()),
  params: r(b(u(t(), t())))
}), S = s(["application", "curatedDataset", "database", "fileStore"]), L = s([
  "abortOperation",
  "authenticateConnection",
  "createObject",
  "describeConnection",
  "dropObject",
  "findObjectFolderPath",
  "getReadableStream",
  "getRecord",
  "listNodes",
  "previewObject",
  "removeRecords",
  "retrieveChunks",
  "retrieveRecords",
  "upsertRecords"
]), y = s(["bidirectional", "destination", "source", "unknown"]), j = l({
  ...p,
  typeId: m("connector"),
  category: c(l({ id: t(), label: t() })),
  categoryId: S,
  implementations: u(t(), v),
  operations: b(L),
  usageId: y,
  vendorAccountURL: c(t()),
  vendorDocumentationURL: c(t()),
  vendorHomeURL: c(t())
}), i = (o) => {
  const n = Object.entries(o).filter((e) => typeof e[1] == "string");
  return new Map(n);
}, D = [
  { id: "application", labels: i({ "en-gb": "Application" }) },
  { id: "curatedDataset", labels: i({ "en-gb": "Curated Dataset" }) },
  { id: "database", labels: i({ "en-gb": "Database" }) },
  { id: "fileStore", labels: i({ "en-gb": "File Store" }) }
], O = (o, n, e = g) => {
  const a = o.get(n);
  if (a !== void 0) return a;
  if (e !== n)
    return o.get(e);
}, A = (o, n = g) => {
  const e = D.find((a) => a.id === o);
  if (e) {
    const a = O(e.labels, n);
    return { id: e.id, label: a ?? e.id };
  }
  return { id: o, label: o };
};
export {
  j as connectorConfigSchema,
  A as getConnectorCategory
};
