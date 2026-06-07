/**
 * Canonical catalog of diseases supported in v1.
 * Disease slug is the source of truth for personalization.
 *
 * `relatedMechanisms` / `relatedGenes` / `relatedInterventions` drive cross-linking
 * on the dashboard and on disease pages. Update these when new content is added.
 */
export type DiseaseSlug =
  | "parkinsons"
  | "alzheimers"
  | "als-ftd"
  | "huntingtons"
  | "multiple-sclerosis"
  | "cipn"
  | "ischemic-stroke"
  | "tbi-cte";

export interface DiseaseEntry {
  slug: DiseaseSlug;
  name: string;
  shortName: string;
  relatedMechanisms: string[];
  relatedGenes: string[];
  relatedInterventions: string[];
  /** One-sentence context about which interventions matter most for this disease. Shown on the dashboard. */
  interventionNote: string;
}

export const DISEASES: DiseaseEntry[] = [
  {
    slug: "parkinsons",
    name: "Parkinson's Disease",
    shortName: "Parkinson's",
    relatedMechanisms: [
      "mitochondrial-dysfunction",
      "oxidative-stress",
      "protein-aggregation",
      "autophagy-and-lysosome",
      "inflammation",
    ],
    relatedGenes: ["parkinsons-genes"],
    relatedInterventions: ["lifestyle", "medical-interventions", "supplements"],
    interventionNote:
      "Levodopa and deep brain stimulation are the primary medical treatments. Exercise has among the strongest evidence of any intervention for slowing progression and supporting motor function.",
  },
  {
    slug: "alzheimers",
    name: "Alzheimer's Disease",
    shortName: "Alzheimer's",
    relatedMechanisms: [
      "protein-aggregation",
      "inflammation",
      "oxidative-stress",
      "mitochondrial-dysfunction",
      "senescence",
    ],
    relatedGenes: ["alzheimers-genes"],
    relatedInterventions: ["lifestyle", "medical-interventions", "supplements"],
    interventionNote:
      "Cholinesterase inhibitors and memantine help manage cognitive symptoms. Exercise, cognitive engagement, and sleep have the strongest preventive evidence among lifestyle interventions.",
  },
  {
    slug: "als-ftd",
    name: "ALS / FTD",
    shortName: "ALS / FTD",
    relatedMechanisms: [
      "protein-aggregation",
      "mitochondrial-dysfunction",
      "autophagy-and-lysosome",
      "oxidative-stress",
      "inflammation",
    ],
    relatedGenes: ["als-ftd-genes"],
    relatedInterventions: ["lifestyle", "medical-interventions", "supplements"],
    interventionNote:
      "No approved disease-modifying treatments exist yet. SARM1 inhibitors are among the most promising emerging therapies. Exercise and sleep are central to supportive care.",
  },
  {
    slug: "huntingtons",
    name: "Huntington's Disease",
    shortName: "Huntington's",
    relatedMechanisms: [
      "protein-aggregation",
      "mitochondrial-dysfunction",
      "autophagy-and-lysosome",
      "oxidative-stress",
    ],
    relatedGenes: ["huntingtons-genes"],
    relatedInterventions: ["lifestyle", "medical-interventions", "supplements"],
    interventionNote:
      "No disease-modifying treatments are currently approved. Management focuses on symptom control, with exercise, sleep, and cognitive engagement as the strongest evidence-based supportive interventions.",
  },
  {
    slug: "multiple-sclerosis",
    name: "Multiple Sclerosis",
    shortName: "MS",
    relatedMechanisms: ["inflammation", "oxidative-stress", "mitochondrial-dysfunction"],
    relatedGenes: [],
    relatedInterventions: ["lifestyle", "medical-interventions", "supplements"],
    interventionNote:
      "Disease-modifying immune therapies have the strongest evidence base for MS. Vitamin D correction, exercise, and sleep play important supporting roles alongside medical care.",
  },
  {
    slug: "cipn",
    name: "Chemotherapy-Induced Peripheral Neuropathy",
    shortName: "CIPN",
    relatedMechanisms: ["mitochondrial-dysfunction", "oxidative-stress", "inflammation"],
    relatedGenes: [],
    relatedInterventions: ["lifestyle", "medical-interventions", "supplements"],
    interventionNote:
      "Management focuses on symptom relief during and after chemotherapy. Exercise shows emerging evidence for prevention and recovery; B vitamins and omega-3s are commonly studied in this context.",
  },
  {
    slug: "ischemic-stroke",
    name: "Ischemic Stroke",
    shortName: "Stroke",
    relatedMechanisms: ["oxidative-stress", "inflammation", "mitochondrial-dysfunction"],
    relatedGenes: [],
    relatedInterventions: ["lifestyle", "medical-interventions", "supplements"],
    interventionNote:
      "Acute care focuses on clot management and reperfusion. Long-term prevention is strongly tied to diet, exercise, and cardiovascular risk factor control.",
  },
  {
    slug: "tbi-cte",
    name: "TBI / CTE",
    shortName: "TBI/CTE",
    relatedMechanisms: ["protein-aggregation", "inflammation", "oxidative-stress"],
    relatedGenes: [],
    relatedInterventions: ["lifestyle", "medical-interventions"],
    interventionNote:
      "No approved disease-modifying therapies exist. Management is supportive — exercise and sleep are among the most studied interventions for supporting recovery and long-term brain health.",
  },
];

export const DISEASE_BY_SLUG: Record<string, DiseaseEntry> = Object.fromEntries(
  DISEASES.map((d) => [d.slug, d]),
);

export function getDisease(slug: string | null | undefined): DiseaseEntry | null {
  if (!slug) return null;
  return DISEASE_BY_SLUG[slug] ?? null;
}
