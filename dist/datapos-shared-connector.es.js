import { DEFAULT_LOCALE_CODE as p, createLabelMap as C, resolveLabel as u } from "./datapos-shared-locale.es.js";
import { l as n, o as i, f as t, b as l, r as d, d as g, s as e, g as o, n as s, h, i as S, p as f } from "./componentConfig.schema-C0C6ceb5.js";
import { m as O } from "./moduleConfig.schema-DNq1iU4S.js";
const L = n(["apiKey", "disabled", "oAuth2", "none"]), R = i({
  authMethodId: L,
  activeConnectionCount: o(s()),
  canDescribe: o(S()),
  id: o(e()),
  label: o(h),
  maxConnectionCount: t(s()),
  params: o(l(d(e(), e())))
}), v = n(["application", "curatedDataset", "database", "fileStore"]), y = n([
  "abortOperation",
  "auditObjectContent",
  "authenticateConnection",
  "createObject",
  "describeConnection",
  "dropObject",
  "findObject",
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
}), N = i({
  ...O,
  typeId: g("connector"),
  category: t(D),
  categoryId: v,
  implementations: d(e(), R),
  operations: l(y),
  usageId: I,
  vendorAccountURL: t(e()),
  vendorDocumentationURL: t(e()),
  vendorHomeURL: t(e())
}), A = [
  { id: "application", label: { "en-gb": "Application" } },
  { id: "curatedDataset", label: { "en-gb": "Curated Dataset" } },
  { id: "database", label: { "en-gb": "Database" } },
  { id: "fileStore", label: { "en-gb": "File Store" } }
], F = (c, b = p) => {
  const a = A.find((r) => r.id === c);
  if (a) {
    const r = C(a.label), m = u(r, b);
    return { id: a.id, label: m ?? a.id };
  }
  return { id: c, label: c };
};
export {
  N as connectorConfigSchema,
  F as constructConnectorCategoryConfig
};
