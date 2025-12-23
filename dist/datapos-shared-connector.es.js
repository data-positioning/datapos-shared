import { c as r } from "./index-shYsk_2c.js";
const e = (a) => {
  const t = Object.entries(a).filter((n) => typeof n[1] == "string");
  return new Map(t);
};
e({ "en-gb": "Application" }), e({ "en-gb": "Curated Dataset" }), e({ "en-gb": "Database" }), e({ "en-gb": "File Store" });
export {
  r as connectorConfigSchema
};
