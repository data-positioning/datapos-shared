import { D as a } from "./locale-CPeRw0Am.js";
import { c as s } from "./locale-CPeRw0Am.js";
const n = [
  { id: "alpha", color: "red", labels: { "en-gb": "alpha" } },
  { id: "beta", color: "amber", labels: { "en-gb": "beta" } },
  { id: "generalAvailability", color: "green", labels: { "en-gb": "" } },
  { id: "notApplicable", color: "green", labels: { "en-gb": "not-applicable" } },
  { id: "preAlpha", color: "red", labels: { "en-gb": "pre-alpha" } },
  { id: "proposed", color: "other", labels: { "en-gb": "proposed" } },
  { id: "releaseCandidate", color: "green", labels: { "en-gb": "release-candidate" } },
  { id: "unavailable", color: "other", labels: { "en-gb": "unavailable" } },
  { id: "underReview", color: "other", labels: { "en-gb": "under-review" } }
];
function b(l, r = a) {
  const e = n.find((o) => o.id === l);
  if (e) {
    const o = e.labels[r] ?? e.labels[a] ?? e.id;
    return { id: e.id, color: e.color, label: o };
  }
  return { id: l, color: "other", label: l };
}
export {
  s as componentConfigSchema,
  b as getComponentStatus
};
