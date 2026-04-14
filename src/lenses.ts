import type { Lens, LinguisticInsight } from "../types";

export const LENSES: Lens[] = [
  {
    id: "DEFAULT",
    label: "The Root",
    sublabel: "direct etymology",
    applicableTo: [
      "ROOT",
      "SEMANTIC",
      "SUPPLETIVE",
      "GRIMM",
      "COLLISION",
      "PIE",
      "DECEPTION",
      "FALSE_FAMILY",
      "PHANTOM_ROOT",
      "IDIOM",
      "BORROWED",
      "TOPONYM",
      "MATCH",
    ],
  },
  {
    id: "METAPHOR_DRIFT",
    label: "The Abstraction",
    sublabel: "when roots lose their body",
    applicableTo: ["ROOT", "BORROWED", "MATCH", "SEMANTIC", "TOPONYM"],
  },
  {
    id: "ETYMOLOGY_FILTER",
    label: "The Path",
    sublabel: "French vs. Latin vs. direct",
    applicableTo: ["ROOT", "COLLISION", "BORROWED", "MATCH", "TOPONYM"],
  },
  {
    id: "FALSE_TWIN",
    label: "The Impostor",
    sublabel: "looks related, isn't",
    applicableTo: ["ROOT", "PIE", "GRIMM"],
  },
  {
    id: "TEMPORAL_DEPTH",
    label: "The Strata",
    sublabel: "sorting by century of entry",
    applicableTo: ["ROOT", "PIE", "SEMANTIC"],
  },
  {
    id: "COMPOUND_HUNT",
    label: "The Buried Root",
    sublabel: "find it hiding inside the word",
    applicableTo: ["ROOT"],
  },
  {
    id: "REGISTER_SORT",
    label: "The Class Marker",
    sublabel: "formal vs. everyday vs. technical",
    applicableTo: ["BORROWED", "MATCH", "COLLISION", "FALSE_FAMILY", "TOPONYM"],
  },
  {
    id: "SOUND_TRACE",
    label: "The Sound Law",
    sublabel: "apply the shift rule",
    applicableTo: ["GRIMM", "PIE", "SUPPLETIVE"],
  },
];

export function applyLens(
  insight: LinguisticInsight,
  lens: Lens,
  r: () => number,
): LinguisticInsight {
  if (!lens.applicableTo.includes(insight.type)) {
    return { ...insight, lens: LENSES[0] };
  }

  const out = {
    ...insight,
    lens,
    data: { ...insight.data },
  } as LinguisticInsight;

  switch (lens.id) {
    case "DEFAULT":
      return out;

    case "METAPHOR_DRIFT": {
      if (insight.type === "ROOT" && insight.data.metaphorSplit) {
        out.tension =
          `The root "${insight.root}" originally meant something physical. ` +
          insight.tension +
          ` — but meaning doesn't stay literal.`;
      } else if (insight.type === "SEMANTIC") {
        out.tension =
          `Meaning can drift toward the abstract. ` + insight.tension;
      }
      return out;
    }

    case "ETYMOLOGY_FILTER": {
      if (insight.type === "ROOT" && insight.data.entryPaths) {
        const paths = insight.data.entryPaths as Record<string, string>;
        const via_french = insight.words.filter(
          (w) => paths[w] === "via_french",
        );
        const direct = insight.words.filter((w) => paths[w] === "direct_latin");
        if (via_french.length > 0 && direct.length > 0) {
          out.data = {
            ...out.data,
            groups: [
              {
                id: "french",
                label: "Via Old French",
                accepts: via_french,
                related: [],
              },
              {
                id: "direct",
                label: "Direct Latin/Greek",
                accepts: direct,
                related: [],
              },
            ],
            pool: insight.words,
          };
          out.tension =
            insight.tension +
            ` — but not all of them took the same route into English.`;
        }
      }
      return out;
    }

    case "FALSE_TWIN": {
      if (insight.type === "ROOT" && insight.data.impostors?.length) {
        const impostors = insight.data.impostors as string[];
        const impostor = impostors[Math.floor(r() * impostors.length)];
        if (!impostor) return out;
        const pool = [...insight.words.slice(0, 5), impostor];
        out.data = {
          ...out.data,
          pool,
          impostor,
          targets: pool,
          required: [impostor],
        };
        out.tension =
          `Not every word that looks like it belongs to this family does. ` +
          `One is a false cousin — it only resembles "${insight.root}".`;
      }
      return out;
    }

    case "TEMPORAL_DEPTH": {
      if (insight.type === "ROOT" && insight.data.eras) {
        const eras = insight.data.eras as Record<string, string>;
        const eraOrder = [
          "Old English",
          "Middle English",
          "Early Modern English",
          "Modern English",
        ];
        const timeline = Object.entries(eras)
          .sort((a, b) => eraOrder.indexOf(a[1]) - eraOrder.indexOf(b[1]))
          .map(([word, era]) => ({ era, meaning: word, blank: true }));
        out.data = { ...out.data, timeline };
        out.tension =
          insight.tension +
          ` — and these words arrived across a thousand years.`;
      }
      return out;
    }

    case "COMPOUND_HUNT": {
      if (insight.type === "ROOT" && insight.data.decompositions) {
        out.tension =
          `The root "${insight.root}" (${insight.meaning}) is hiding inside each of these words. ` +
          `Find it, and name what the prefix adds.`;
      }
      return out;
    }

    case "REGISTER_SORT": {
      if ("registers" in insight.data && insight.data.registers) {
        const regs = insight.data.registers as Record<string, string>;
        const formal = insight.words.filter((w) => regs[w] === "formal");
        const everyday = insight.words.filter((w) => regs[w] === "informal");
        const technical = insight.words.filter((w) => regs[w] === "technical");
        if (formal.length > 0 || everyday.length > 0 || technical.length > 0) {
          out.data = {
            ...out.data,
            groups: [
              {
                id: "formal",
                label: "Formal / Literary",
                accepts: formal,
                related: [],
              },
              {
                id: "everyday",
                label: "Everyday Speech",
                accepts: everyday,
                related: [],
              },
              {
                id: "technical",
                label: "Technical / Specialist",
                accepts: technical,
                related: [],
              },
            ],
            pool: insight.words,
          };
          out.tension =
            insight.tension +
            ` — social history is encoded in which register each word landed in.`;
        }
      }
      return out;
    }

    case "SOUND_TRACE": {
      if (insight.type === "GRIMM") {
        out.tension =
          `A sound law connects these words. Apply the rule: ` +
          insight.tension;
      }
      return out;
    }

    default:
      return out;
  }
}
