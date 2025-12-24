import { l as n, o as i, n as a, a as d, r as b, b as g, m as u, s as e, d as o, e as s, f as p, g as C, D as l } from "./index-5UsJyepS.js";
const h = n(["apiKey", "disabled", "oAuth2", "none"]), S = i({
  authMethodId: h,
  activeConnectionCount: o(s()),
  canDescribe: o(C()),
  id: o(e()),
  label: o(p),
  maxConnectionCount: o(s()),
  params: o(d(b(e(), e())))
}), f = n(["application", "curatedDataset", "database", "fileStore"]), y = n([
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
]), D = n(["bidirectional", "destination", "source", "unknown"]), v = i({
  id: e(),
  label: e()
}), R = i({
  ...u,
  typeId: g("connector"),
  category: a(v),
  categoryId: f,
  implementations: b(e(), S),
  operations: d(y),
  usageId: D,
  vendorAccountURL: a(e()),
  vendorDocumentationURL: a(e()),
  vendorHomeURL: a(e())
}), I = [
  { id: "application", labels: { "en-gb": "Application" } },
  { id: "curatedDataset", labels: { "en-gb": "Curated Dataset" } },
  { id: "database", labels: { "en-gb": "Database" } },
  { id: "fileStore", labels: { "en-gb": "File Store" } }
], A = (c, m = l) => {
  const t = I.find((r) => r.id === c);
  if (t) {
    const r = t.labels[m] ?? t.labels[l] ?? t.id;
    return { id: t.id, label: r };
  }
  return { id: c, label: c };
};
export {
  R as connectorConfigSchema,
  A as getConnectorCategory
};
