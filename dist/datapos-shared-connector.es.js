import { connectorConfigSchema as b } from "./datapos-shared.es.js";
const n = (e) => {
  const o = Object.entries(e).filter((t) => typeof t[1] == "string");
  return new Map(o);
};
n({ "en-gb": "Application" }), n({ "en-gb": "Curated Dataset" }), n({ "en-gb": "Database" }), n({ "en-gb": "File Store" });
async function i(e, o) {
  console.log("loadToolForConnector", e, o);
  const t = `datapos-tool-${o}`, a = e.find((r) => r.id === t);
  if (!a) throw new Error(`Connector could not load unknown tool '${o}'.`);
  const l = await import(`https://engine-eu.datapos.app/tools/${o}_v${a.version}/${t}.es.js`);
  return new l.Tool();
}
export {
  b as connectorConfigSchema,
  i as loadToolForConnector
};
