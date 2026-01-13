import { l as n, o, b as e, d as t, n as a, a as c, e as r } from "./componentConfig.schema-C0C6ceb5.js";
import { m as s } from "./moduleConfig.schema-DNq1iU4S.js";
const i = n(["list"]), p = o({
  ...c,
  typeId: t("contextModelGroup"),
  modelRefs: e(r),
  order: a()
}), f = o({
  ...s,
  typeId: t("context"),
  models: e(p),
  operations: e(i)
}), m = n(["list", "render", "setColorMode"]), C = o({
  ...s,
  typeId: t("presenter"),
  presentations: e(r),
  operations: e(m)
});
export {
  f as contextConfigSchema,
  C as presenterConfigSchema
};
