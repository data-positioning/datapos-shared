import { z as e } from "zod";
const o = e.union([e.literal("amber"), e.literal("green"), e.literal("red"), e.literal("other")]), r = e.union([
  e.literal("alpha"),
  e.literal("beta"),
  e.literal("generalAvailability"),
  e.literal("notApplicable"),
  e.literal("preAlpha"),
  e.literal("proposed"),
  e.literal("releaseCandidate"),
  e.literal("unavailable"),
  e.literal("underReview")
]), i = e.union([
  e.literal("app"),
  e.literal("connector"),
  e.literal("connectorConnection"),
  e.literal("context"),
  e.literal("contextModelGroup"),
  e.literal("contextModel"),
  e.literal("contextModelDimensionGroup"),
  e.literal("contextModelDimension"),
  e.literal("contextModelDimensionHierarchy"),
  e.literal("contextModelEntityGroup"),
  e.literal("contextModelEntity"),
  e.literal("contextModelEntityDataItem"),
  e.literal("contextModelEntityEvent"),
  e.literal("contextModelEntityPrimaryMeasure"),
  e.literal("contextModelSecondaryMeasureGroup"),
  e.literal("contextModelSecondaryMeasure"),
  e.literal("dataView"),
  e.literal("dimension"),
  e.literal("engine"),
  e.literal("eventQuery"),
  e.literal("presenter"),
  e.literal("presenterPresentation"),
  e.literal("tool")
]), a = e.union([e.literal("en-au"), e.literal("en-gb"), e.literal("en-us"), e.literal("es-es")]), c = e.record(a, e.string()), s = e.object({
  id: e.string(),
  color: o,
  label: e.string()
}), d = e.object({
  id: e.string(),
  label: e.record(e.string(), e.string()),
  description: e.record(e.string(), e.string()),
  firstCreatedAt: e.number().optional(),
  icon: e.string().optional(),
  iconDark: e.string().optional(),
  lastUpdatedAt: e.number().optional(),
  status: s.nullable().optional(),
  statusId: r,
  typeId: i
}), p = e.union([e.literal("app"), e.literal("engine"), e.literal("connector"), e.literal("context"), e.literal("presenter"), e.literal("tool")]), m = e.object({
  id: e.string(),
  label: e.string()
}), u = e.object({
  activeConnectionCount: e.number().optional(),
  canDescribe: e.boolean().optional(),
  id: e.string().optional(),
  authMethodId: e.union([e.literal("apiKey"), e.literal("disabled"), e.literal("oAuth2"), e.literal("none")]),
  label: c.optional(),
  maxConnectionCount: e.number().optional(),
  params: e.array(e.record(e.string(), e.string())).optional()
}), g = e.union([e.literal("application"), e.literal("curatedDataset"), e.literal("database"), e.literal("fileStore")]), b = e.union([
  e.literal("abortOperation"),
  e.literal("authenticateConnection"),
  e.literal("createObject"),
  e.literal("describeConnection"),
  e.literal("dropObject"),
  e.literal("findObject"),
  e.literal("getRecord"),
  e.literal("listNodes"),
  e.literal("previewObject"),
  e.literal("removeRecords"),
  e.literal("retrieveRecords"),
  e.literal("upsertRecords")
]), y = e.union([e.literal("bidirectional"), e.literal("destination"), e.literal("source"), e.literal("unknown")]), h = d.extend({
  typeId: p,
  version: e.string()
}), T = h.extend({
  category: m.optional(),
  categoryId: g,
  implementations: e.record(e.string(), u),
  operations: e.array(b),
  typeId: e.literal("connector"),
  usageId: y,
  vendorAccountURL: e.string().nullable().optional(),
  vendorDocumentationURL: e.string().nullable().optional(),
  vendorHomeURL: e.string().nullable().optional()
}), x = e.union([e.literal("amber"), e.literal("green"), e.literal("red"), e.literal("other")]), S = e.union([
  e.literal("alpha"),
  e.literal("beta"),
  e.literal("generalAvailability"),
  e.literal("notApplicable"),
  e.literal("preAlpha"),
  e.literal("proposed"),
  e.literal("releaseCandidate"),
  e.literal("unavailable"),
  e.literal("underReview")
]), M = e.union([
  e.literal("app"),
  e.literal("connector"),
  e.literal("connectorConnection"),
  e.literal("context"),
  e.literal("contextModelGroup"),
  e.literal("contextModel"),
  e.literal("contextModelDimensionGroup"),
  e.literal("contextModelDimension"),
  e.literal("contextModelDimensionHierarchy"),
  e.literal("contextModelEntityGroup"),
  e.literal("contextModelEntity"),
  e.literal("contextModelEntityDataItem"),
  e.literal("contextModelEntityEvent"),
  e.literal("contextModelEntityPrimaryMeasure"),
  e.literal("contextModelSecondaryMeasureGroup"),
  e.literal("contextModelSecondaryMeasure"),
  e.literal("dataView"),
  e.literal("dimension"),
  e.literal("engine"),
  e.literal("eventQuery"),
  e.literal("presenter"),
  e.literal("presenterPresentation"),
  e.literal("tool")
]), t = e.number(), I = e.object({
  id: e.string(),
  color: x,
  label: e.string()
}), C = e.object({
  id: e.string(),
  label: e.record(e.string(), e.string()),
  description: e.record(e.string(), e.string()),
  icon: e.string().optional(),
  iconDark: e.string().optional(),
  order: e.number(),
  path: e.string()
}), n = e.object({
  id: e.string(),
  label: e.record(e.string(), e.string()),
  description: e.record(e.string(), e.string()),
  firstCreatedAt: t.optional(),
  icon: e.string().optional(),
  iconDark: e.string().optional(),
  lastUpdatedAt: t.optional(),
  status: I.optional(),
  statusId: S,
  typeId: M
}), v = e.union([e.literal("app"), e.literal("engine"), e.literal("connector"), e.literal("context"), e.literal("presenter"), e.literal("tool")]), D = n.extend({
  typeId: v,
  version: e.string()
}), f = n.extend({
  modelRefs: e.array(C),
  order: e.number()
}), E = e.literal("list"), H = D.extend({
  models: e.array(f),
  operations: e.array(E),
  typeId: e.literal("context")
}), A = e.union([e.literal("amber"), e.literal("green"), e.literal("red"), e.literal("other")]), $ = e.union([e.literal("alpha"), e.literal("beta"), e.literal("generalAvailability"), e.literal("notApplicable"), e.literal("preAlpha"), e.literal("proposed"), e.literal("releaseCandidate"), e.literal("unavailable"), e.literal("underReview")]), j = e.union([e.literal("app"), e.literal("connector"), e.literal("connectorConnection"), e.literal("context"), e.literal("contextModelGroup"), e.literal("contextModel"), e.literal("contextModelDimensionGroup"), e.literal("contextModelDimension"), e.literal("contextModelDimensionHierarchy"), e.literal("contextModelEntityGroup"), e.literal("contextModelEntity"), e.literal("contextModelEntityDataItem"), e.literal("contextModelEntityEvent"), e.literal("contextModelEntityPrimaryMeasure"), e.literal("contextModelSecondaryMeasureGroup"), e.literal("contextModelSecondaryMeasure"), e.literal("dataView"), e.literal("dimension"), e.literal("engine"), e.literal("eventQuery"), e.literal("presenter"), e.literal("presenterPresentation"), e.literal("tool")]), l = e.number(), G = e.object({
  id: e.string(),
  color: A,
  label: e.string()
}), R = e.object({
  id: e.string(),
  label: e.record(e.string(), e.string()),
  description: e.record(e.string(), e.string()),
  icon: e.string().optional(),
  iconDark: e.string().optional(),
  order: e.number(),
  path: e.string()
}), w = e.object({
  id: e.string(),
  label: e.record(e.string(), e.string()),
  description: e.record(e.string(), e.string()),
  firstCreatedAt: l.optional(),
  icon: e.string().optional(),
  iconDark: e.string().optional(),
  lastUpdatedAt: l.optional(),
  status: G.optional(),
  statusId: $,
  typeId: j
}), O = e.union([e.literal("app"), e.literal("engine"), e.literal("connector"), e.literal("context"), e.literal("presenter"), e.literal("tool")]), U = w.extend({
  typeId: O,
  version: e.string()
}), k = e.union([e.literal("list"), e.literal("render"), e.literal("setColorMode")]), L = U.extend({
  presentations: e.array(R),
  operations: e.array(k),
  typeId: e.literal("presenter")
});
export {
  T as connectorConfigSchema,
  H as contextConfigSchema,
  L as presenterConfigSchema
};
