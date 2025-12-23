async function c(n, o) {
  console.log("loadToolForConnector", n, o);
  const t = `datapos-tool-${o}`, e = n.find((s) => s.id === t);
  if (!e) throw new Error(`Connector could not load unknown tool '${o}'.`);
  const l = await import(`https://engine-eu.datapos.app/tools/${o}_v${e.version}/${t}.es.js`);
  return new l.Tool();
}
export {
  c as loadTool
};
