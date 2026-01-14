async function e(t, o) {
  const n = t.find((l) => l.id === o);
  if (!n) throw new Error(`Connector could not load unknown tool '${o}'.`);
  const r = await import(`https://engine-eu.datapos.app/tools/${o}_v${n.version}/${o}.es.js`);
  return new r.Tool();
}
export {
  e as loadTool
};
