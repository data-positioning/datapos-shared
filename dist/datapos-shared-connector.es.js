import { DEFAULT_LOCALE_CODE as a } from "./datapos-shared.es.js";
import { connectorConfigSchema as g } from "./datapos-shared.es.js";
const n = (t) => {
  const o = Object.entries(t).filter((e) => typeof e[1] == "string");
  return new Map(o);
}, i = [
  { id: "application", labels: n({ "en-gb": "Application" }) },
  { id: "curatedDataset", labels: n({ "en-gb": "Curated Dataset" }) },
  { id: "database", labels: n({ "en-gb": "Database" }) },
  { id: "fileStore", labels: n({ "en-gb": "File Store" }) }
], l = (t, o, e = a) => {
  const r = t.get(o);
  if (r !== void 0) return r;
  if (e !== o)
    return t.get(e);
}, c = (t, o = a) => {
  const e = i.find((r) => r.id === t);
  if (e) {
    const r = l(e.labels, o);
    return { id: e.id, label: r ?? e.id };
  }
  return { id: t, label: t };
};
export {
  g as connectorConfigSchema,
  c as getConnectorCategory
};
