import { l as d, o as a, b as s, d as i, f as m, a as p, i as b, D as r } from "./locale-CPeRw0Am.js";
import { m as g } from "./moduleConfig.schema-ElDY1bZx.js";
const u = d(["list"]), f = a({
  ...p,
  typeId: i("contextModelGroup"),
  modelRefs: s(b),
  order: m()
}), E = a({
  ...g,
  typeId: i("context"),
  models: s(f),
  operations: s(u)
}), C = d(["list", "render", "setColorMode"]), F = a({
  ...g,
  typeId: i("presenter"),
  presentations: s(b),
  operations: s(C)
});
function M() {
  return { render: S };
}
function S(t, o, n) {
  n.textContent = "Cytoscape.js diagram goes here...";
}
function O() {
  return { render: x };
}
function x(t, o) {
  console.log(1111, t), console.log(2222, o), console.log(3333, o.childNodes), console.log(4444, o.children);
}
const e = (t) => new Map(Object.entries(t)), c = (t, o, n = r) => {
  const l = t.get(o);
  if (l !== void 0) return l;
  if (n !== o)
    return t.get(n);
}, h = [
  { id: "dtv", labels: e({ "en-gb": "Delimited Text" }) },
  { id: "e/e", labels: e({ "en-gb": "Entity/Event" }) },
  { id: "jsonArray", labels: e({ "en-gb": "JSON Array" }) },
  { id: "spss", labels: e({ "en-gb": "SPSS" }) },
  { id: "xls", labels: e({ "en-gb": "XLS" }) },
  { id: "xlsx", labels: e({ "en-gb": "XLSX" }) },
  { id: "xml", labels: e({ "en-gb": "XML" }) }
], R = (t = r) => {
  const o = [];
  for (const n of h) {
    const l = c(n.labels, t);
    o.push({ id: n.id, label: l ?? n.id });
  }
  return o;
}, D = [
  { id: `
`, labels: e({ "en-gb": "Newline" }) },
  { id: "\r", labels: e({ "en-gb": "Carriage Return" }) },
  { id: `\r
`, labels: e({ "en-gb": "Carriage Return/Newline" }) }
], T = (t = r) => {
  const o = [];
  for (const n of D) {
    const l = c(n.labels, t);
    o.push({ id: n.id, label: l ?? n.id });
  }
  return o;
}, L = [
  { id: ":", labels: e({ "en-gb": "Colon" }) },
  { id: ",", labels: e({ "en-gb": "Comma" }) },
  { id: "!", labels: e({ "en-gb": "Exclamation Mark" }) },
  // { id: '', label: { 'en-gb': 'Other' } }, // TODO: Maybe set this to a 'not printing' or special ascii character when there is a user supplied delimited, rather than ''?
  { id: "0x1E", labels: e({ "en-gb": "Record Separator" }) },
  { id: ";", labels: e({ "en-gb": "Semicolon" }) },
  { id: " ", labels: e({ "en-gb": "Space" }) },
  { id: "	", labels: e({ "en-gb": "Tab" }) },
  { id: "_", labels: e({ "en-gb": "Underscore" }) },
  { id: "0x1F", labels: e({ "en-gb": "Unit Separator" }) },
  { id: "|", labels: e({ "en-gb": "Vertical Bar" }) }
], j = (t = r) => {
  const o = [];
  for (const n of L) {
    const l = c(n.labels, t);
    o.push({ id: n.id, label: l ?? n.id });
  }
  return o;
};
export {
  E as contextConfigSchema,
  R as getDataFormats,
  T as getRecordDelimiters,
  j as getValueDelimiters,
  F as presenterConfigSchema,
  M as useCytoscapeJS,
  O as useDataTable
};
