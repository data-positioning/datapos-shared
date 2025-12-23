import { connectorConfigSchema as b } from "./datapos-shared.es.js";
const e = (n) => {
  const o = Object.entries(n).filter((t) => typeof t[1] == "string");
  return new Map(o);
};
e({ "en-gb": "Application" }), e({ "en-gb": "Curated Dataset" }), e({ "en-gb": "Database" }), e({ "en-gb": "File Store" });
async function c(n, o) {
  const t = `datapos-tool-${o}`, a = n.toolConfigs.find((s) => s.id === t);
  if (!a) throw new Error(`Connector could not load unknown tool '${o}'.`);
  const l = await import(`https://engine-eu.datapos.app/tools/${o}_v${a.version}/${t}.es.js`);
  return new l.Tool();
}
export {
  b as connectorConfigSchema,
  c as loadToolForConnector
};
