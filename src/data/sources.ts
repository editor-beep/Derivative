import type { EntryProvenance, SourceReference } from "../../types";

export const SOURCES: Record<string, SourceReference> = {
  oed: {
    sourceId: "oed",
    sourceTitle: "Oxford English Dictionary (entry data)",
    sourceUrl: "https://www.oed.com/",
    publisher: "Oxford University Press",
    retrievedAt: "2026-04-13",
  },
  etymonline: {
    sourceId: "etymonline",
    sourceTitle: "Online Etymology Dictionary",
    sourceUrl: "https://www.etymonline.com/",
    publisher: "Douglas Harper / Etymonline",
    retrievedAt: "2026-04-13",
  },
  wiktionary: {
    sourceId: "wiktionary",
    sourceTitle: "Wiktionary",
    sourceUrl: "https://en.wiktionary.org/",
    publisher: "Wikimedia Foundation",
    retrievedAt: "2026-04-13",
    license: "CC BY-SA 4.0",
  },
  merriam_webster: {
    sourceId: "merriam_webster",
    sourceTitle: "Merriam-Webster Dictionary",
    sourceUrl: "https://www.merriam-webster.com/",
    publisher: "Merriam-Webster",
    retrievedAt: "2026-04-13",
  },
  wikipedia: {
    sourceId: "wikipedia",
    sourceTitle: "Wikipedia (topic-level historical summaries)",
    sourceUrl: "https://en.wikipedia.org/",
    publisher: "Wikimedia Foundation",
    retrievedAt: "2026-04-13",
    license: "CC BY-SA 4.0",
  },
};

const DATASET_SOURCE_INDEX: Record<string, { sourceIds: string[]; confidence: EntryProvenance["confidence"]; notes: string }> = {
  roots_core: { sourceIds: ["oed", "etymonline", "wiktionary"], confidence: "probable", notes: "Root-family groupings synthesized from dictionary etymologies." },
  roots_extended: { sourceIds: ["etymonline", "wiktionary"], confidence: "probable", notes: "Extended root set merged from internal curation and public etymology references." },
  roots_extended_2: { sourceIds: ["etymonline", "wiktionary"], confidence: "probable", notes: "Second extended root batch curated from the same source stack." },
  meaning_drift_1: { sourceIds: ["oed", "etymonline", "merriam_webster"], confidence: "probable", notes: "Semantic-shift timelines are interpretive summaries of attested sense history." },
  meaning_drift_2: { sourceIds: ["oed", "etymonline", "merriam_webster"], confidence: "probable", notes: "Semantic-shift timelines are interpretive summaries of attested sense history." },
  french_visual_fraud: { sourceIds: ["oed", "etymonline", "wiktionary"], confidence: "probable", notes: "Orthography narratives simplified for puzzle framing." },
  french_doublets: { sourceIds: ["oed", "etymonline", "wiktionary"], confidence: "probable", notes: "Doublet pairings represent common historical pathways, not exhaustive attestations." },
  french_false_friends: { sourceIds: ["oed", "wiktionary"], confidence: "probable", notes: "False-friend examples are pedagogical simplifications." },
  norse_consonant: { sourceIds: ["oed", "etymonline", "wiktionary"], confidence: "probable", notes: "Sound-collision groupings are heuristic and may have alternative analyses." },
  norse_borrowed: { sourceIds: ["oed", "etymonline", "wiktionary"], confidence: "probable", notes: "Borrowing pathways summarized from dictionary etymologies." },
  loanword_extraction: { sourceIds: ["oed", "etymonline", "wikipedia"], confidence: "disputed", notes: "Sociopolitical framing is editorial and may be contested; etymons are source-backed." },
  eponyms: { sourceIds: ["oed", "etymonline", "wikipedia"], confidence: "disputed", notes: "Some named-origin narratives are contested in historical literature.", },
  suppletive_paradigms: { sourceIds: ["oed", "wiktionary"], confidence: "verified", notes: "Suppletive paradigms align with mainstream historical grammar references." },
  folk_etymology: { sourceIds: ["oed", "etymonline", "wiktionary"], confidence: "probable", notes: "Folk-etymology examples include simplified teaching forms." },
  toponyms: { sourceIds: ["oed", "etymonline", "wikipedia"], confidence: "disputed", notes: "Toponymic origins are generally sourced; political interpretation may be contested." },
  academic_root_table: { sourceIds: ["oed", "wiktionary"], confidence: "verified", notes: "Reference-table rows summarize well-attested classical stems." },
  african_diaspora: { sourceIds: ["etymonline", "wiktionary", "wikipedia"], confidence: "disputed", notes: "African-origin etymologies draw on contested historical linguistics; Wolof/AAVE connections are debated in scholarly literature. Cultural and political framing is editorial." },
  moorish_arabic: { sourceIds: ["oed", "etymonline", "wiktionary", "wikipedia"], confidence: "probable", notes: "Arabic-Iberian etymologies are well-attested in comparative linguistics; some intermediate borrowing routes (e.g. via Medieval Latin or Old French) are simplified. Cultural and Hero/Villain framing is editorial." },
  woman_centric: { sourceIds: ["oed", "etymonline", "wiktionary", "wikipedia"], confidence: "probable", notes: "Etymology data is well-attested in standard references; semantic-shift and reclamation narratives are interpretive summaries. Hero/Villain framing is editorial." },
  lgbtq: { sourceIds: ["oed", "etymonline", "wiktionary", "wikipedia"], confidence: "disputed", notes: "LGBTQ etymology and reclamation histories draw on activist and cultural scholarship; some first-use attributions (e.g. ballroom vocabulary, Stonewall accounts) are contested or incomplete in the written record. Cultural and political framing is editorial." },
  capitonym: { sourceIds: ["oed", "etymonline", "wiktionary", "wikipedia"], confidence: "probable", notes: "Capitonym pairings and their etymologies are well-attested in standard references; historical-colonial framing and Hero/Villain narrative are editorial." },
};

export function applyDatasetProvenance<TEntry extends object>(entries: TEntry[], datasetKey: keyof typeof DATASET_SOURCE_INDEX): void {
  const config = DATASET_SOURCE_INDEX[datasetKey];
  if (!config) return;
  const base = config.sourceIds
    .map((id) => SOURCES[id])
    .filter((source): source is SourceReference => source !== undefined);

  for (const entry of entries) {
    const withProvenance = entry as TEntry & { provenance?: EntryProvenance };
    if (withProvenance.provenance) continue;

    withProvenance.provenance = {
      sourceIds: config.sourceIds,
      sources: base,
      confidence: config.confidence,
      notes: config.notes,
    };
  }
}
