import { D as s } from "./locale-DTTQsZic.js";
import { l as n, o as i, f as a, b as d, r as b, d as p, s as e, g as o, n as l, h as C, i as g, p as u } from "./componentConfig.schema-C0C6ceb5.js";
import { m as h } from "./moduleConfig.schema-DNq1iU4S.js";
const S = n(["apiKey", "disabled", "oAuth2", "none"]), f = i({
  authMethodId: S,
  activeConnectionCount: o(l()),
  canDescribe: o(g()),
  id: o(e()),
  label: o(C),
  maxConnectionCount: o(l()),
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
}), U = i({
  ...h,
  typeId: p("connector"),
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
], j = (c, m = s) => {
  const t = I.find((r) => r.id === c);
  if (t) {
    const r = t.label[m] ?? t.label[s] ?? t.id;
    return { id: t.id, label: r };
  }
  return { id: c, label: c };
};
export {
  U as connectorConfigSchema,
  j as constructConnectorCategoryConfig
};
