import { l as n, o, a as e, b as t, n as a, c, d as r } from "./componentConfig.schema-BhoHfdqq.js";
import { m as s } from "./moduleConfig.schema-CzfX-j-V.js";
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
