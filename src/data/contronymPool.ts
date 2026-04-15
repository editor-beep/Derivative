// contronymPool.ts
// Contronyms (Janus words / auto-antonyms) structured as BORROWED puzzle entries.
// Each word carries two meanings that directly contradict each other.
//
//   Puzzle 1 — "The Janus Sort": sort contronyms by the nature of their internal tension
//   Puzzle 2 — "The Authority Paradox": official-language contronyms sorted by institutional mechanism
//   Puzzle 3 — "Both Ways": match each contronym to its contradictory definition pair

import { applyDatasetProvenance } from "./sources";
import type { SortPoolEntry } from "../types";

export const CONTRONYM_POOL: SortPoolEntry[] = [
  // --- PUZZLE 1: The Janus Sort ---
  {
    root: "contronyms / Janus words",
    lang: "Old English / Latin / Old French → English",
    meaning: "words that are their own opposites — sorted by the kind of contradiction they carry",
    groups: [
      {
        id: "surface_body",
        displayLabel: "surface & body",
        solutionLabel: "Words whose meanings oppose around the physical state of an object — remove vs. apply",
        hint: "Each of these words can mean stripping something away — and also adding something on. The same verb, two directions.",
        hintLevel2: "Think about fine particles on a shelf, seeds in a fruit, a stone in an olive, and excess branches on a hedge — and the exact opposite action for each.",
        accepts: ["dust", "seed", "pit", "trim"],
        related: ["hull", "skin"],
      },
      {
        id: "attachment_separation",
        displayLabel: "attachment & separation",
        solutionLabel: "Words whose meanings oppose around joining or splitting — fasten vs. cut/flee",
        hint: "Each of these words can mean holding two things together — and also forcing them apart.",
        hintLevel2: "Think about the fastener on a door, the act of cutting a coupon from a page, and the split in a log — and the exact opposite action each word also performs.",
        accepts: ["bolt", "clip", "cleave"],
        related: ["buckle", "weather"],
      },
      {
        id: "gaze_blindness",
        displayLabel: "gaze & blindness",
        solutionLabel: "Words whose meanings oppose around seeing and not seeing — supervise vs. miss/conceal",
        hint: "Each of these words can mean watching carefully — and also failing to notice, or hiding from view.",
        hintLevel2: "Think about a supervisor looking down on workers, the unintentional failure to catch an error, and the act of projecting a film or hiding a window.",
        accepts: ["overlook", "oversight", "screen"],
        related: ["monitor", "watch"],
      },
    ],
    pool: ["dust", "seed", "pit", "trim", "bolt", "clip", "cleave", "overlook", "oversight", "screen"],
    tension:
      "These words are not ambiguous — they are structurally opposed. Each one carries two meanings that cannot both be true at once. The same word that fastens also flees; the same word that supervises also fails to notice. A contronym is not a flaw in English — it is a record of English being forced to hold contradictions it never resolved. The language absorbed two incompatible demands on the same sound, and kept both.",
    questionPrompt: "Sort these words by the kind of internal contradiction they carry.",
    revealHeadline: "Every word here means its own opposite. The question is: which kind of opposite?",
    revealBody:
      "Dust (Old English dūst) meant fine particles — the verb first meant to remove them (dust the shelf), then to apply them (dust for fingerprints, dust a crop). The verb turned bidirectional because both actions involve the same substance: the removing and the coating are the same gesture aimed differently. Bolt (Old English bolt: a short arrow) acquired the 'fasten' sense from the bolt that secures a door, and the 'flee' sense from the bolt of a startled horse — sudden, straight-line motion. Cleave is one of English's oldest contronyms: Old English clifian (to stick, adhere) and cleofan (to split) were two separate words that collapsed into the same spelling. Overlook and oversight are a matched pair: both contain the idea of looking over something from above. When the oversight is deliberate and careful it becomes supervision; when it slips, the same word names the failure. Screen comes from the screen that hides and the screen on which images are cast: concealing and revealing are both things surfaces do.",
  },

  // --- PUZZLE 2: The Authority Paradox ---
  {
    root: "official language as contronym",
    lang: "Latin / Old French → legal and institutional English",
    meaning: "the vocabulary of institutional power — each word authorizes and revokes in the same breath",
    groups: [
      {
        id: "legal_formal",
        displayLabel: "legal permission & prohibition",
        solutionLabel: "Words where the law both permits and forbids using the same term",
        hint: "These two words are used in legal and official contexts — and in each case the same word can mean 'you may proceed' or 'you are stopped.'",
        hintLevel2: "One of these can impose an international trade penalty or grant official approval. The other can order you to act or legally bar you from acting.",
        accepts: ["sanction", "enjoin"],
        related: ["censure", "authorize"],
      },
      {
        id: "supervisory_gaze",
        displayLabel: "supervision & inattention",
        solutionLabel: "Words where watchful care and the failure to notice share the same root",
        hint: "These two words are built from the same idea — looking over something from above. One name means the care is diligent; the other means the look missed something.",
        hintLevel2: "One is the job title of the person paid to watch everything. The other is the word for the error that occurred because no one was watching.",
        accepts: ["overlook", "oversight"],
        related: ["supervise", "neglect"],
      },
      {
        id: "behavioral_restraint",
        displayLabel: "restraint & repetition",
        solutionLabel: "A word that holds back from doing — and also the thing that keeps coming back",
        hint: "This word names the act of stopping yourself from doing something. It also names the part of a song that keeps returning, whether you want it to or not.",
        hintLevel2: "To refrain is to hold back. A refrain is what cannot be held back.",
        accepts: ["refrain"],
        related: ["abstain", "chorus"],
      },
    ],
    pool: ["sanction", "enjoin", "overlook", "oversight", "refrain"],
    tension:
      "Official language invented words that could go either way. Sanction lets you proceed — and sanction stops you cold. Enjoin orders you to act — and enjoin bars you from acting. The same bureaucratic vocabulary that grants authority also revokes it, because power has always needed to be able to say yes and no with the same breath. These are not accidents of usage; they are the structure of institutional double-speak built into the foundation of legal English.",
    questionPrompt: "Sort these authority words by which institutional mechanism they name — and contradict.",
    revealHeadline: "The law that permits. The law that prohibits. They use the same word.",
    revealBody:
      "Sanction (from Latin sanctio: a decree, from sancire: to make sacred or inviolable) entered English as a term for official approval or ratification. The penalty sense developed from the same root: a sanction was originally the penalty clause attached to a law — the consequence that made the law binding. Over time the penalty became detached from the ratification, and 'sanction' ended up naming both. Enjoin (from Old French enjoindre, from Latin injungere: to join onto, impose) originally meant to impose an obligation — to command. The legal injunction that prohibits developed as the same imposition turned to restraint: the court joins an order onto you, whether to act or to stop. Overlook and oversight are companion pieces from the same directional metaphor: surveying from above. The supervisor's overlook is attentive; the administrative oversight is the scan that failed. Refrain (from Old French refrainer, from Latin refrenare: to hold back with a bridle) names the act of restraint — and also, in music, the repeated passage that returns regardless of restraint. To refrain and a refrain hold the same tension in a single syllable.",
  },

  // --- PUZZLE 3: Both Ways (MATCH) ---
  {
    root: "contronym definition pairs",
    lang: "Old English / Latin / Old French → English",
    meaning: "match each Janus word to the two meanings it holds simultaneously",
    groups: [],
    pool: [
      "dust",
      "bolt",
      "cleave",
      "sanction",
      "screen",
      "table",
      "remove fine particles / apply fine particles",
      "lock firmly in place / run away suddenly",
      "split apart / cling closely to",
      "grant official permission / impose a penalty",
      "show to an audience / hide from view",
      "bring up for discussion (UK) / postpone indefinitely (US)",
    ],
    tension:
      "A Janus word is not a coincidence — it is a site where the language was pulled in two directions hard enough to leave a scar. Every word here records a moment when the same concept was used for opposite ends, and neither usage won. The word held the tension until the tension became the word.",
    questionPrompt: "Match each contronym to the pair of contradictory meanings it carries.",
    revealHeadline: "The word that means yes. The word that means no. They are the same word.",
    revealBody:
      "Dust moved bidirectionally because removing and applying fine particles are the same gestural act with opposite purposes — the same hand, the same motion, the same substance. Bolt acquired two incompatible meanings from two different Middle English sources: the bolt that secures a door (held fast, fixed in place) and the bolt of a startled horse (sudden flight, maximum speed). These are not merely different senses — they are structural opposites: immovability and the fastest possible movement. Cleave is English's oldest documented contronym: Old English clifian (to adhere, cling) and cleofan (to split, cut) were distinct verbs that the language chose to collapse into a single spelling. They have coexisted as opposites for over a thousand years. Sanction carries the yes/no opposition at the center of all legal authority: the same word that ratifies also penalizes, because every permission contains an implicit threat. Screen holds the tension of all surfaces: a screen can be a barrier that hides or a projection surface that reveals — and the same physical object can function as both. Table is a documented case of English and its own dialects directly contradicting each other: British parliamentary procedure uses 'table' to mean 'bring to the floor for discussion'; American parliamentary procedure uses 'table' to mean 'set aside indefinitely.' The same motion, the same word, opposite intentions.",
    matchPairs: [
      { source: "dust", target: "remove fine particles / apply fine particles" },
      { source: "bolt", target: "lock firmly in place / run away suddenly" },
      { source: "cleave", target: "split apart / cling closely to" },
      { source: "sanction", target: "grant official permission / impose a penalty" },
      { source: "screen", target: "show to an audience / hide from view" },
      { source: "table", target: "bring up for discussion (UK) / postpone indefinitely (US)" },
    ],
  },
];

// Provenance annotations
applyDatasetProvenance(CONTRONYM_POOL, "contronym");
