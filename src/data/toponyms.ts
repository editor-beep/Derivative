// src/data/toponyms.ts
// Toponym puzzle pool — words derived from place names.
// Each entry uses the sort-puzzle shape (groups + pool) so players sort
// everyday words by their geographic origin, then the reveal delivers
// the extraction / deception angle: English commodified these places
// into neutral brand labels while erasing the labor, displacement, or
// violence behind the original location.

export const TOPONYM_POOL = [
  // ── ENTRY 1: Fabric toponyms ─────────────────────────────────────────────────
  // Players sort cloth words by the region that gave them their name.
  {
    root: "fabric toponyms",
    lang: "Place names → English textiles",
    meaning: "cloth named after the places that made (or were exploited for) it",
    groups: [
      {
        id: "french",
        label: "Named after French cities or regions",
        accepts: ["denim", "gauze", "cambric"],
        related: ["voile", "chiffon"],
      },
      {
        id: "middle_east",
        label: "Named after Middle Eastern / Silk Road cities",
        accepts: ["damask", "muslin"],
        related: ["taffeta", "satin"],
      },
      {
        id: "south_asia",
        label: "Named after South Asian colonial trade ports",
        accepts: ["calico", "cashmere"],
        related: ["chintz", "madras"],
      },
    ],
    pool: ["denim", "gauze", "cambric", "damask", "muslin", "calico", "cashmere"],
    tension:
      "Denim is 'serge de Nîmes' — a French city's weaving tradition compressed to two syllables. " +
      "Damask is Damascus, muslin is Mosul, calico is Calicut (Kozhikode). " +
      "Each fabric name is a captured place: the local craft knowledge was extracted through trade routes, " +
      "then production shifted to cheaper labor markets while the geographic brand stayed behind.",
  },

  // ── ENTRY 2: Food toponyms ────────────────────────────────────────────────────
  // Players sort food words by the place of origin they hide inside.
  {
    root: "food toponyms",
    lang: "Place names → everyday foods",
    meaning: "foods whose names began as geographic designations",
    groups: [
      {
        id: "french_italian",
        label: "Named after French or Italian aristocratic estates / regions",
        accepts: ["champagne", "cantaloupe", "mayonnaise"],
        related: ["brie", "burgundy"],
      },
      {
        id: "german",
        label: "Named after German port cities",
        accepts: ["hamburger", "frankfurter"],
        related: ["berliner", "wiener"],
      },
      {
        id: "british",
        label: "Named after British regional heritage sites",
        accepts: ["cheddar", "stilton"],
        related: ["worcestershire", "bakewell"],
      },
    ],
    pool: ["champagne", "cantaloupe", "mayonnaise", "hamburger", "frankfurter", "cheddar", "stilton"],
    tension:
      "Champagne names a French region whose sparkling wine became global luxury — yet English speakers " +
      "casually call any sparkling wine 'champagne.' Mayonnaise is 'salsa mahonesa' from Mahón, Menorca, " +
      "a port seized by France in 1756 and the sauce popularized by French chefs afterward. " +
      "Cantaloupe is a noble Italian estate near Rome. Hamburger and frankfurter are German port cities " +
      "whose emigrants brought their food to America, where industrial production severed the geographic tie " +
      "while keeping the name as a brand.",
  },

  // ── ENTRY 3: Conquest toponyms ────────────────────────────────────────────────
  // Players sort words by the type of violence or extraction behind the place name.
  {
    root: "conquest toponyms",
    lang: "Conflict sites → English fashion and dye",
    meaning: "everyday words that hide battlefields, nuclear tests, and colonial plantations",
    groups: [
      {
        id: "battle",
        label: "Named after battle sites or military events",
        accepts: ["bikini", "balaclava", "cardigan", "magenta"],
        related: ["alma", "inkerman"],
      },
      {
        id: "colonial",
        label: "Named after colonial extraction sites",
        accepts: ["calico", "indigo"],
        related: ["tabasco", "chintz"],
      },
    ],
    pool: ["bikini", "balaclava", "cardigan", "magenta", "calico", "indigo"],
    tension:
      "Bikini Atoll was irradiated by U.S. nuclear weapons tests in 1946, displacing the Indigenous " +
      "Marshallese residents — the two-piece swimsuit was named for its 'explosive' reveal the same year. " +
      "Balaclava and cardigan are both Crimean War battle sites: Lord Cardigan led the disastrous Charge " +
      "of the Light Brigade there. Magenta is an 1859 Franco-Austrian battle in Italy, named as the dye " +
      "was discovered that year. Calico came from Calicut via the British East India Company; indigo " +
      "was a colonial plantation crop farmed under coercion in India and the Caribbean. " +
      "The words survive as cheerful consumer labels; the violence is forgotten.",
  },

  // ── ENTRY 4: Clothing toponyms ────────────────────────────────────────────────
  // Players sort garment words by the kind of place hidden in the name.
  {
    root: "clothing toponyms",
    lang: "Place names → garments",
    meaning: "your wardrobe is a secret geography lesson",
    groups: [
      {
        id: "islands",
        label: "Named after islands or island regions",
        accepts: ["jersey", "bikini", "cashmere"],
        related: ["worsted", "angora"],
      },
      {
        id: "cities",
        label: "Named after cities or urban enclaves",
        accepts: ["jeans", "denim", "tuxedo"],
        related: ["paisley", "dungarees"],
      },
    ],
    pool: ["jersey", "bikini", "cashmere", "jeans", "denim", "tuxedo"],
    tension:
      "Jersey is a Channel Island's knitting tradition elevated to a universal term for any knit fabric or " +
      "sports shirt. Cashmere is the Kashmir region — a disputed territory whose fine wool became a " +
      "luxury commodity traded through colonial routes. Jeans are 'bleu de Gênes,' the durable cotton from " +
      "the Italian port of Genoa used by sailors. Denim is 'serge de Nîmes.' Tuxedo is Tuxedo Park, a " +
      "Gilded Age estate in New York where America's wealthy elite invented their own formal dress code — " +
      "a word encoding exclusion, not geography. Every item in your wardrobe is a place that got commodified.",
  },
];
