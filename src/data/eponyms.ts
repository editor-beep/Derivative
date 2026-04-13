// eponyms.ts
// BORROWED puzzle entries framed around eponyms — words derived from real people's names.
// These are among the most "deceptive" entries in English: a single person's identity
// (tied to privilege, violence, exploitation, or fleeting fame) is laundered into a
// neutral everyday word, while the original human story is erased.
//
// Each entry groups eponyms by what kind of history they conceal, turning the sorting
// puzzle into a reveal about how power, class, empire, and notoriety get absorbed
// into vocabulary.

export const EPONYM_POOL = [
  {
    root: "eponyms of class and fashion",
    lang: "English personal names → common vocabulary",
    meaning: "aristocratic excess and grassroots resistance alike laundered into neutral words",
    groups: [
      {
        id: "aristocratic_leisure",
        label: "Named after aristocrats and their habits",
        accepts: ["sandwich", "cardigan", "silhouette", "leotard"],
        related: ["wellington", "raglan"],
      },
      {
        id: "resistance_neutralized",
        label: "Named after reformers and resisters — then stripped of that charge",
        accepts: ["boycott", "bloomers", "maverick"],
        related: ["gerrymander", "quisling"],
      },
    ],
    pool: ["sandwich", "cardigan", "silhouette", "leotard", "boycott", "bloomers", "maverick"],
    tension:
      "Sandwich is the Earl of Sandwich's gambling habit elevated to a food; cardigan is Lord Cardigan's military fashion from the catastrophic Charge of the Light Brigade; silhouette is a French minister mocked for austerity. Meanwhile boycott comes from Irish tenants resisting English landlord oppression — and that act of collective resistance is what English immortalized. Bloomers preserves a suffragist's name but turned feminist dress reform into a mild joke. The oppressor's habits and the oppressed's strategies get laundered into the same innocent vocabulary.",
  },
  {
    root: "eponyms of invention and colonial science",
    lang: "European personal names → global technical vocabulary",
    meaning: "individual naming rights as intellectual and colonial extraction",
    groups: [
      {
        id: "european_inventors",
        label: "Named after European inventors and scientists",
        accepts: ["saxophone", "diesel", "pasteurize", "shrapnel"],
        related: ["bowie", "jacuzzi"],
      },
      {
        id: "colonial_naming",
        label: "Named after colonial merchants and charismatic pseudoscientists",
        accepts: ["nicotine", "mesmerize"],
        related: ["quinine", "galvanism"],
      },
    ],
    pool: ["saxophone", "diesel", "pasteurize", "shrapnel", "nicotine", "mesmerize"],
    tension:
      "Saxophone, diesel, and pasteurize represent European industrial and scientific naming rights — individual genius branded into global vocabulary while the knowledge itself often built on uncredited collective work. Shrapnel is the weapon its inventor designed to scatter lethal metal fragments; the killing mechanism became a textbook term. Nicotine is named after Jean Nicot, the French ambassador who introduced tobacco to the French court — but behind the chemical name lies the transatlantic slave economy that grew tobacco. Mesmerize is Franz Mesmer's 'animal magnetism' — pseudoscience elevated into a word for being captivated. European branding, legitimate or not, dominates.",
  },
  {
    root: "eponyms of psychology and politics",
    lang: "European personal names → clinical and political vocabulary",
    meaning: "aristocratic depravity and political manipulation normalized as neutral terminology",
    groups: [
      {
        id: "clinical_pathology",
        label: "Aristocratic and literary transgression medicalized into clinical terms",
        accepts: ["sadism", "masochism", "guillotine"],
        related: ["narcissism", "munchausen"],
      },
      {
        id: "political_distortion",
        label: "Political manipulation and nationalist myth turned into standard vocabulary",
        accepts: ["gerrymander", "chauvinism"],
        related: ["quisling", "machiavellian"],
      },
    ],
    pool: ["sadism", "masochism", "guillotine", "gerrymander", "chauvinism"],
    tension:
      "Sadism is named after the Marquis de Sade — a French nobleman whose writings celebrated cruelty; masochism after Leopold von Sacher-Masoch — an Austrian writer who explored submission. Extreme aristocratic depravity and literary transgression became the clinical language of psychology. Guillotine is named after a doctor who promoted execution as 'humane' medical progress — state terror rebranded as rational science. Gerrymander preserves Massachusetts Governor Elbridge Gerry's salamander-shaped voting district, elite electoral rigging turned into a standard political-science term. Chauvinism takes a possibly-fictional Napoleon loyalist's blind patriotism and turns it into the universal word for excessive bias — French imperial nationalism laundered into neutral English.",
  },
];
