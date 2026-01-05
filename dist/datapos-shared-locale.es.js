const o = "en-gb", i = (e) => new Map(Object.entries(e)), s = (e, t, n = o) => {
  const r = e.get(t);
  if (r !== void 0) return r;
  if (n !== t)
    return e.get(n);
};
export {
  o as DEFAULT_LOCALE_CODE,
  i as createLabelMap,
  s as resolveLabel
};
