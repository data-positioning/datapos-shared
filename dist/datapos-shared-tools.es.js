async function c(e, o) {
  const n = `datapos-tool-${o}`, t = e.find((s) => s.id === n);
  if (!t) throw new Error(`Connector could not load unknown tool '${o}'.`);
  const l = await import(`https://engine-eu.datapos.app/tools/${o}_v${t.version}/${n}.es.js`);
  return new l.Tool();
}
export {
  c as loadTool
};
