async function a(e, o) {
  const n = `datapos-tool-${o}`, t = e.find((r) => r.id === n);
  if (!t) throw new Error(`Connector could not load unknown tool '${o}'.`);
  const l = await import(`https://engine-eu.datapos.app/tools/${o}_v${t.version}/${n}.es.js`);
  return new l.Tool();
}
export {
  a as loadTool
};
