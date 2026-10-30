/**
 * Add GEP vendor cluster descriptions to Matter Server's browser dashboard.
 *
 * The dashboard ships its own static metadata table and does not use the
 * server-side Matter model. Generate the dashboard entries from that same
 * model so names, types, and access remain synchronized.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const [bundlePath, modelPath] = process.argv.slice(2);
if (!bundlePath || !modelPath) {
  throw new Error("Usage: gep_patch_dashboard.mjs <dashboard-bundle> <model-module>");
}

const marker = "/* GEP_CUSTOM_CLUSTER_DESCRIPTIONS */";
const clusterTableStart = "const clusters = {";
const globalAttributes = {
  0xfff8: {
    id: 0xfff8,
    label: "GeneratedCommandList",
    type: "List[command-id]",
    writable: false,
  },
  0xfff9: {
    id: 0xfff9,
    label: "AcceptedCommandList",
    type: "List[command-id]",
    writable: false,
  },
  0xfffa: {
    id: 0xfffa,
    label: "EventList",
    type: "List[event-id]",
    writable: false,
  },
  0xfffb: {
    id: 0xfffb,
    label: "AttributeList",
    type: "List[attrib-id]",
    writable: false,
  },
  0xfffc: {
    id: 0xfffc,
    label: "FeatureMap",
    type: "map32",
    writable: false,
  },
  0xfffd: {
    id: 0xfffd,
    label: "ClusterRevision",
    type: "ClusterRevision",
    writable: false,
  },
};
let bundle = readFileSync(bundlePath, "utf8");

if (bundle.includes(marker)) {
  process.exit(0);
}
if (!bundle.includes(clusterTableStart)) {
  throw new Error(`Unable to locate dashboard cluster table in ${bundlePath}`);
}

const { GepClusters } = await import(pathToFileURL(modelPath).href);

function dashboardType(attribute) {
  if (attribute.type !== "list") {
    return attribute.type;
  }

  const entryType = attribute.children?.[0]?.type ?? "unknown";
  return `List[${entryType}]`;
}

const descriptions = Object.fromEntries(
  GepClusters.map(cluster => [
    cluster.id,
    {
      id: cluster.id,
      label: cluster.name,
      attributes: {
        ...Object.fromEntries(
          cluster.children
            .filter(child => child.tag === "attribute")
            .map(attribute => [
              attribute.id,
              {
                id: attribute.id,
                cluster_id: cluster.id,
                label: attribute.name,
                type: dashboardType(attribute),
                writable: attribute.access?.includes("W") ?? false,
              },
            ]),
        ),
        ...Object.fromEntries(
          Object.entries(globalAttributes).map(([id, attribute]) => [
            id,
            { ...attribute, cluster_id: cluster.id },
          ]),
        ),
      },
      commands: {},
    },
  ]),
);

const entries = JSON.stringify(descriptions, null, 2).slice(1, -1);
bundle = bundle.replace(
  clusterTableStart,
  `${clusterTableStart}\n  ${marker}\n${entries},`,
);
writeFileSync(bundlePath, bundle);
