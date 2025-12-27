import { l as n, o as i, n as a, b as d, r as b, d as C, s as e, e as o, f as s, g as p, h as g, p as u, D as l } from "./locale-CPeRw0Am.js";
import { m as h } from "./moduleConfig.schema-ElDY1bZx.js";
const S = n(["apiKey", "disabled", "oAuth2", "none"]), f = i({
  authMethodId: S,
  activeConnectionCount: o(s()),
  canDescribe: o(g()),
  id: o(e()),
  label: o(p),
  maxConnectionCount: o(s()),
  params: o(d(b(e(), e())))
}), O = n(["application", "curatedDataset", "database", "fileStore"]), R = n([
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
]), y = n(["bidirectional", "destination", "source", "unknown"]), D = i({
  id: e(),
  label: u
}), L = i({
  ...h,
  typeId: C("connector"),
  category: a(D),
  categoryId: O,
  implementations: b(e(), f),
  operations: d(R),
  usageId: y,
  vendorAccountURL: a(e()),
  vendorDocumentationURL: a(e()),
  vendorHomeURL: a(e())
}), I = [
  { id: "application", label: { "en-gb": "Application" } },
  { id: "curatedDataset", label: { "en-gb": "Curated Dataset" } },
  { id: "database", label: { "en-gb": "Database" } },
  { id: "fileStore", label: { "en-gb": "File Store" } }
], U = (c, m = l) => {
  const t = I.find((r) => r.id === c);
  if (t) {
    const r = t.label[m] ?? t.label[l] ?? t.id;
    return { id: t.id, label: r };
  }
  return { id: c, label: c };
};
export {
  L as connectorConfigSchema,
  U as constructConnectorCategoryConfig
};
