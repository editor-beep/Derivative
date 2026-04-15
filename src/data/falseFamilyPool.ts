export const FALSE_FAMILY_POOL = [
  {
    root: "ear (two homonyms)",
    lang: "Old English",
    meaning: "accidental collision",
    groups: [
      {
        id: "hear",
        displayLabel: "hearing organ",
        solutionLabel: "ear (hearing organ) — OE ēare",
        accepts: ["ear", "eardrum", "earlap", "aural"],
        related: ["listen", "hearing"],
      },
      {
        id: "grain",
        displayLabel: "grain stalk",
        solutionLabel: "ear (of grain) — OE ēar",
        accepts: ["earworm", "spike", "kernel"],
        related: ["grain", "corn"],
      },
    ],
    pool: [
      "ear", "eardrum", "earlap", "aural", "earworm", "spike", "kernel",
      "listen", "hearing", "grain", "corn",
    ],
    tension:
      "Two different Old English words — 'ēare' and 'ēar' — became identical in Modern English",
  },
  {
    root: "sound (three homonyms)",
    lang: "Latin + Old Norse + Old English",
    meaning: "triple collision",
    groups: [
      {
        id: "noise",
        displayLabel: "noise",
        solutionLabel: "sound (noise) — Latin sonus",
        accepts: ["sonic", "resound", "resonance", "ultrasound"],
        related: ["noise"],
      },
      {
        id: "water",
        displayLabel: "water channel",
        solutionLabel: "sound (water channel) — Old Norse sund",
        accepts: ["fathom", "strait", "inlet"],
        related: ["swim"],
      },
      {
        id: "healthy",
        displayLabel: "healthy",
        solutionLabel: "sound (healthy) — Old English gesund",
        accepts: ["unsound", "soundly", "soundness"],
        related: ["healthy"],
      },
    ],
    pool: [
      "sonic", "resound", "resonance", "ultrasound", "fathom", "strait", "inlet",
      "unsound", "soundly", "soundness", "noise", "swim", "healthy",
    ],
    tension:
      "Three unrelated words — from Latin, Old Norse, and Old English — collapsed into 'sound'",
  },
  {
    root: "bat",
    lang: "Germanic/Norse + Old French/Latin",
    meaning: "flying mammal vs. striking tool",
    groups: [
      {
        id: "animal",
        displayLabel: "flying mammal",
        solutionLabel: "bat (animal) — ME bakke, prob. from ON leðrblaka 'leather flapper'",
        accepts: ["bat", "chiroptera", "flittermouse"],
        related: ["flap", "wing", "nocturnal"],
      },
      {
        id: "tool",
        displayLabel: "striking implement",
        solutionLabel: "bat (club) — OE *batt or OF batre 'to beat'",
        accepts: ["baseball bat", "cricket bat", "paddle"],
        related: ["beat", "strike", "club"],
      },
    ],
    pool: [
      "bat", "chiroptera", "flittermouse", "baseball bat", "cricket bat", "paddle",
      "flap", "wing", "beat", "strike", "club", "nocturnal",
    ],
    tension:
      "One from flapping motion (Norse/Germanic), the other from beating/striking (French/Latin influence)",
  },
  {
    root: "cleave",
    lang: "Old English (two distinct roots)",
    meaning: "split vs. cling — true contronym",
    groups: [
      {
        id: "split",
        displayLabel: "split or divide",
        solutionLabel: "cleave (split) — OE clēofan from PG *kleuban 'to cut'",
        accepts: ["cleave", "split", "cloven", "cleft"],
        related: ["divide", "hew", "cleaver"],
      },
      {
        id: "adhere",
        displayLabel: "adhere or cling",
        solutionLabel: "cleave (cling) — OE clifian from PG *kliban 'to stick'",
        accepts: ["cleave", "cling", "adhere"],
        related: ["stick", "hold"],
      },
    ],
    pool: [
      "cleave", "split", "cloven", "cleft", "cling", "adhere", "divide", "hew",
      "cleaver", "stick", "hold",
    ],
    tension:
      "Two separate Old English verbs (one 'cut', one 'stick') merged into the same modern spelling with opposite meanings",
  },
  {
    root: "bow",
    lang: "Old English/Germanic",
    meaning: "bend, weapon, and ship front",
    groups: [
      {
        id: "bend",
        displayLabel: "to bend the body",
        solutionLabel: "bow (bend) — OE būgan 'to bend'",
        accepts: ["bow down", "curtsy", "obeisance"],
        related: ["bend", "yield"],
      },
      {
        id: "weapon",
        displayLabel: "archery weapon",
        solutionLabel: "bow (weapon) — OE boga 'bent thing'",
        accepts: ["longbow", "crossbow", "bowstring"],
        related: ["arrow", "arch"],
      },
      {
        id: "ship",
        displayLabel: "front of a ship",
        solutionLabel: "bow (ship) — prob. from MLG boech or similar Germanic 'bend'",
        accepts: ["prow", "fore"],
        related: ["stern", "ship"],
      },
    ],
    pool: [
      "bow", "bow down", "curtsy", "obeisance", "longbow", "crossbow", "bowstring",
      "prow", "fore", "bend", "yield", "arrow", "arch", "stern", "ship",
    ],
    tension:
      "All trace to 'bending/curving' roots but diverged across Germanic applications",
  },
  {
    root: "bank",
    lang: "Proto-Germanic (two branches)",
    meaning: "financial vs. river side",
    groups: [
      {
        id: "finance",
        displayLabel: "financial institution",
        solutionLabel: "bank (money) — It. banca 'bench/counter' from PG *bankiz 'shelf'",
        accepts: ["banker", "savings", "deposit"],
        related: ["bench", "counter"],
      },
      {
        id: "river",
        displayLabel: "river edge",
        solutionLabel: "bank (river) — ON banki from PG *bankô 'slope'",
        accepts: ["riverbank", "embankment"],
        related: ["slope", "hill"],
      },
    ],
    pool: [
      "bank", "banker", "savings", "deposit", "riverbank", "embankment",
      "bench", "counter", "slope", "hill",
    ],
    tension:
      "Closely related Proto-Germanic roots (*bankiz vs. *bankô) but entered English via different paths (Italian commerce vs. Norse geography)",
  },
  {
    root: "fine",
    lang: "Latin via Old French",
    meaning: "excellent vs. penalty",
    groups: [
      {
        id: "good",
        displayLabel: "high quality / excellent",
        solutionLabel: "fine (good) — OF fin from L. finis 'end, highest point'",
        accepts: ["fine wine", "finely crafted", "refined"],
        related: ["finish", "refine"],
      },
      {
        id: "penalty",
        displayLabel: "monetary penalty",
        solutionLabel: "fine (penalty) — via Medieval L. finis 'payment/settlement'",
        accepts: ["parking fine", "ticket"],
        related: ["punish", "fee"],
      },
    ],
    pool: [
      "fine", "fine wine", "finely crafted", "refined", "parking fine", "ticket",
      "finish", "refine", "punish", "fee",
    ],
    tension:
      "Both from Latin *finis* ('end/limit') but one evolved to 'peak quality' and the other to 'final settlement/payment'",
  },
  {
    root: "mean",
    lang: "Old English + Latin/French",
    meaning: "intend / average / unkind",
    groups: [
      {
        id: "intend",
        displayLabel: "to intend or signify",
        solutionLabel: "mean (intend) — OE mænan 'to intend'",
        accepts: ["meaning", "meant"],
        related: ["intend", "signify"],
      },
      {
        id: "average",
        displayLabel: "mathematical average",
        solutionLabel: "mean (average) — OF meien from L. medianus 'middle'",
        accepts: ["mean value", "average"],
        related: ["median", "middle"],
      },
      {
        id: "unkind",
        displayLabel: "unkind or stingy",
        solutionLabel: "mean (unkind) — OE gemæne 'common/inferior' → 'base'",
        accepts: ["mean-spirited", "meanie"],
        related: ["cruel", "stingy"],
      },
    ],
    pool: [
      "mean", "meaning", "meant", "mean value", "average", "mean-spirited", "meanie",
      "intend", "signify", "median", "middle", "cruel", "stingy",
    ],
    tension:
      "Three distinct paths: OE intent, Latin 'middle', and OE 'common/inferior' all colliding in Modern English",
  },
  {
    root: "ring",
    lang: "Old English + imitative",
    meaning: "circle vs. sound",
    groups: [
      {
        id: "circle",
        displayLabel: "circular object",
        solutionLabel: "ring (circle) — OE hring from PG *hringaz 'curved thing'",
        accepts: ["wedding ring", "keyring", "circle"],
        related: ["hoop", "loop"],
      },
      {
        id: "sound",
        displayLabel: "bell sound",
        solutionLabel: "ring (sound) — OE hringan, imitative origin",
        accepts: ["telephone ring", "chime"],
        related: ["bell", "chime"],
      },
    ],
    pool: [
      "ring", "wedding ring", "keyring", "circle", "telephone ring", "chime",
      "hoop", "loop", "bell",
    ],
    tension:
      "One from physical 'curve/bend', the other likely imitative of resonant sound",
  },
  {
    root: "lead",
    lang: "Old English (two roots)",
    meaning: "guide vs. metal",
    groups: [
      {
        id: "guide",
        displayLabel: "to guide or direct",
        solutionLabel: "lead (guide) — OE lǣdan 'to lead'",
        accepts: ["leader", "mislead"],
        related: ["guide", "direct"],
      },
      {
        id: "metal",
        displayLabel: "heavy metal",
        solutionLabel: "lead (metal) — OE lēad from PG *lauda-",
        accepts: ["lead pipe", "plumbum"],
        related: ["plumber", "heavy"],
      },
    ],
    pool: [
      "lead", "leader", "mislead", "lead pipe", "plumbum", "guide", "direct",
      "plumber", "heavy",
    ],
    tension:
      "Completely unrelated Old English roots that share modern spelling (and sometimes pronunciation)",
  },
  {
    root: "rack",
    lang: "Dutch/Germanic + others",
    meaning: "framework, torment, ruin",
    groups: [
      {
        id: "frame",
        displayLabel: "framework or shelf",
        solutionLabel: "rack (frame) — MDu rec/recke 'framework'",
        accepts: ["dish rack", "coat rack", "torture rack"],
        related: ["shelf", "stretch"],
      },
      {
        id: "ruin",
        displayLabel: "ruin or wreck",
        solutionLabel: "rack (ruin, as in rack and ruin) — variant of wrack from OE wræc or MDu wrak",
        accepts: ["wrack", "wreck", "ruin"],
        related: ["destroy", "damage"],
      },
    ],
    pool: [
      "rack", "dish rack", "coat rack", "torture rack", "wrack", "wreck", "ruin",
      "shelf", "stretch", "destroy", "damage",
    ],
    tension:
      "Multiple senses from distinct Germanic/Dutch sources (framework/stretching vs. wreckage) — often conflated",
  },
];
