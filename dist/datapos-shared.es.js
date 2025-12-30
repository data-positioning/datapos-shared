import { l as s, o as n, b as e, d as t, f as l, a as d, i as c } from "./componentConfig.schema-DInGC5Y6.js";
import { m as a } from "./moduleConfig.schema-BJfbCrO6.js";
const p = s(["list"]), m = n({
  ...d,
  typeId: t("contextModelGroup"),
  modelRefs: e(c),
  order: l()
}), x = n({
  ...a,
  typeId: t("context"),
  models: e(m),
  operations: e(p)
}), f = s(["list", "render", "setColorMode"]), y = n({
  ...a,
  typeId: t("presenter"),
  presentations: e(c),
  operations: e(f)
});
function S() {
  return { render: g };
}
function g(r, o, i) {
  i.textContent = "Cytoscape.js diagram goes here...";
}
function b() {
  return { render: u };
}
function u(r, o) {
  console.log(1111, r), console.log(2222, o), console.log(3333, o.childNodes), console.log(4444, o.children);
}
export {
  x as contextConfigSchema,
  y as presenterConfigSchema,
  S as useCytoscapeJS,
  b as useDataTable
};
