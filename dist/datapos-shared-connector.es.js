import { DEFAULT_LOCALE_CODE as m, createLabelMap as p, resolveLabel as C } from "./datapos-shared-locale.es.js";
import { l as n, o as i, f as t, r as s, d as u, s as e, g as o, b as g, n as l, h, i as S, p as f } from "./componentConfig.schema-C0C6ceb5.js";
import { m as O } from "./moduleConfig.schema-DNq1iU4S.js";
const L = n(["apiKey", "disabled", "oAuth2", "none"]), R = i({
  authMethodId: L,
  activeConnectionCount: o(l()),
  canDescribe: o(S()),
  id: o(e()),
  label: o(h),
  maxConnectionCount: t(l()),
  params: o(g(s(e(), e())))
}), v = n(["application", "curatedDataset", "database", "fileStore"]), y = n([
  "abortOperation",
  "auditObjectContent",
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
  implementations: s(e(), R),
  operations: y,
  usageId: I,
  vendorAccountURL: t(e()),
  vendorDocumentationURL: t(e()),
  vendorHomeURL: t(e())
}), A = [
  { id: "application", label: { "en-gb": "Application" } },
  { id: "curatedDataset", label: { "en-gb": "Curated Dataset" } },
  { id: "database", label: { "en-gb": "Database" } },
  { id: "fileStore", label: { "en-gb": "File Store" } }
], N = (c, d = m) => {
  const a = A.find((r) => r.id === c);
  if (a) {
    const r = p(a.label), b = C(r, d);
    return { id: a.id, label: b ?? a.id };
  }
  return { id: c, label: c };
};
export {
  F as connectorConfigSchema,
  N as constructConnectorCategoryConfig
};
