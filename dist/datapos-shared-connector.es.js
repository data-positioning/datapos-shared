import { DEFAULT_LOCALE_CODE as p, createLabelMap as C, resolveLabel as g } from "./datapos-shared-locale.es.js";
import { l as n, o as i, f as t, b as s, r as d, d as u, s as e, g as o, n as l, h, i as S, p as f } from "./componentConfig.schema-C0C6ceb5.js";
import { m as O } from "./moduleConfig.schema-DNq1iU4S.js";
const L = n(["apiKey", "disabled", "oAuth2", "none"]), R = i({
  authMethodId: L,
  activeConnectionCount: o(l()),
  canDescribe: o(S()),
  id: o(e()),
  label: o(h),
  maxConnectionCount: o(l()),
  params: o(s(d(e(), e())))
}), v = n(["application", "curatedDataset", "database", "fileStore"]), y = n([
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
]), I = n(["bidirectional", "destination", "source", "unknown"]), D = i({
  id: e(),
  label: f
}), F = i({
  ...O,
  typeId: u("connector"),
  category: t(D),
  categoryId: v,
  implementations: d(e(), R),
  operations: s(y),
  usageId: I,
  vendorAccountURL: t(e()),
  vendorDocumentationURL: t(e()),
  vendorHomeURL: t(e())
}), A = [
  { id: "application", label: { "en-gb": "Application" } },
  { id: "curatedDataset", label: { "en-gb": "Curated Dataset" } },
  { id: "database", label: { "en-gb": "Database" } },
  { id: "fileStore", label: { "en-gb": "File Store" } }
], N = (c, b = p) => {
  const a = A.find((r) => r.id === c);
  if (a) {
    const r = C(a.label), m = g(r, b);
    return { id: a.id, label: m ?? a.id };
  }
  return { id: c, label: c };
};
export {
  F as connectorConfigSchema,
  N as constructConnectorCategoryConfig
};
