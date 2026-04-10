import { useState, useEffect, useRef } from "react";

const TYPE_LABELS = {
  ROOT:"ROOT",SUPPLETIVE:"SUPPLETIVE PAIR",GRIMM:"SOUND SHIFT",
  SEMANTIC:"SEMANTIC DRIFT",COLLISION:"COLLISION",PIE:"DEEP ROOT"
};
const TYPE_COLORS = {
  ROOT:"#c8922a",SUPPLETIVE:"#b87820",GRIMM:"#4ecfcf",
  SEMANTIC:"#d4732a",COLLISION:"#8ab8b8",PIE:"#e8b84b"
};

// ── PUZZLE DATA (inlined for artifact preview; in production import from puzzles.js) ──
const PUZZLES = [
  {date:"2026-01-01",type:"ROOT",root:"rupt",lang:"Latin",meaning:"to break",targets:["rupture","interrupt","corrupt","disrupt","erupt","abrupt","irrupt"],required:["rupture","interrupt","corrupt","disrupt","erupt","abrupt"],reveal:{headline:"You have been using these words your whole life.",body:"Every time you say something is corrupted you are saying it is completely broken — co (together) + rupt (broken). Every time you are interrupted you are describing something broken between. The breaking was always there. You just could not see it.",connections:[["interrupt","broken between (inter)"],["corrupt","broken together (co)"],["erupt","broken outward (e)"],["disrupt","broken apart (dis)"],["abrupt","broken off (ab)"]]}},
  {date:"2026-01-02",type:"SUPPLETIVE",root:"go / went / gone",lang:"Old English + Proto-Germanic",meaning:"two verbs. one corpse.",prompt:"Sort each word into the verb it actually comes from. They are not the same verb.",pool:["go","goes","going","gone","went","wend","wayward","wending"],groups:[{id:"gan",label:"gān (OE: to go)",accepts:["go","goes","going","gone"],related:[]},{id:"wendan",label:"wendan (PGmc: to turn)",accepts:["went","wend","wending"],related:["wayward"]}],reveal:{headline:"\"Went\" has nothing to do with \"go.\"",body:"\"Go\" comes from Old English gān. \"Went\" comes from wenden — a completely different verb meaning to turn, to travel. That verb died in common use around the 15th century. \"Go\" needed a past tense. It took the corpse of another word and wore it.",connections:[["went","from wenden: to turn, to travel — a different verb entirely"],["go","from OE gān — has no true past tense of its own"],["wayward","from wenden: one who turns away"]]}},
  {date:"2026-01-03",type:"GRIMM",root:"p → f (Grimm's Law)",lang:"Proto-Indo-European → Proto-Germanic",meaning:"the consonant shift that split Latin from English",prompt:"Every Latin word below has an English twin. The p became f. Type the English word.",pairs:[{source:"pater (Latin: father)",target:"father",note:"p → f"},{source:"pes / pedis (Latin: foot)",target:"foot",note:"p → f"},{source:"piscis (Latin: fish)",target:"fish",note:"p → f"},{source:"quinque (Latin: five)",target:"five",note:"qu → f"},{source:"pyr (Greek: fire)",target:"fire",note:"p → f"}],reveal:{headline:"Someone rewrote the alphabet and no one noticed.",body:"Around 500 BCE every p in Proto-Germanic shifted to f. Every t shifted to th. Every k shifted to h. Jacob Grimm documented it in 1822. It had been happening in your mouth for two thousand years before he gave it a name.",connections:[["father","Latin pater → Proto-Germanic *fader"],["foot","Latin pes/pedis → OE fōt"],["fish","Latin piscis → OE fisc"],["five","Latin quinque → OE fīf"],["fire","Greek pyr → OE fȳr"]]}},
  {date:"2026-01-04",type:"ROOT",root:"scrib / script",lang:"Latin",meaning:"to scratch, to write",targets:["scribe","describe","prescribe","inscription","manuscript","subscribe","transcribe","scripture","conscript","postscript","ascribe","proscribe"],required:["scribe","describe","prescribe","inscription","manuscript","subscribe","transcribe","scripture"],reveal:{headline:"Every document you have ever signed is a scar.",body:"Scribere: to scratch, to incise, to write. Before ink there was a stylus. Before a stylus there was a nail. A scribe was someone who scratched marks into clay. The scratching never stopped. It just became invisible.",connections:[["prescribe","scratched before (pre)"],["describe","scratched down from (de)"],["transcribe","scratched across (trans)"],["subscribe","scratched below (sub)"],["manuscript","hand-scratched (manus + script)"]]}},
  {date:"2026-01-05",type:"SEMANTIC",root:"nice",lang:"Latin → Old French → Middle English → Modern English",meaning:"a word that forgot what it was",prompt:"\"Nice\" has meant four completely different things across eight centuries. Fill in what it meant in each era.",word:"nice",timeline:[{era:"Latin root",meaning:"nescius: not knowing, ignorant"},{era:"1300s",meaning:"foolish, stupid, ignorant",blank:true},{era:"1400s",meaning:"lascivious, wanton, loose",blank:true},{era:"1500s",meaning:"precise, particular, fastidious"},{era:"1700s onward",meaning:"pleasant, agreeable",blank:true}],reveal:{headline:"\"Nice\" meant stupid.",body:"The word traveled from ignorance to lewdness to fussiness to agreeableness over five hundred years. When you call the dinner nice, you are using the final stop on a very long journey that began with not knowing anything at all.",connections:[["nice (1300s)","foolish, ignorant — from Latin nescius"],["nice (1400s)","lascivious, wanton"],["nice (1500s)","precise, particular"],["nice (1700s+)","pleasant, agreeable — the corpse of an insult"]]}},
  {date:"2026-01-06",type:"PIE",root:"to be",lang:"Proto-Indo-European",meaning:"three roots. one verb. no explanation.",prompt:"The verb \"to be\" is built from three completely unrelated PIE roots. Sort each word into the root it descended from.",pool:["am","is","are","be","been","being","was","were","essence","entity","future","becoming"],groups:[{id:"es",label:"*es- (to exist)",accepts:["am","is","are","essence","entity"],related:[]},{id:"bhuh",label:"*bʰuH- (to grow, become)",accepts:["be","been","being","future","becoming"],related:[]},{id:"hwes",label:"*h₂wes- (to dwell, remain)",accepts:["was","were"],related:[]}],reveal:{headline:"\"Be,\" \"am,\" and \"was\" come from three different Proto-Indo-European roots that have never, in any language, belonged together.",body:"PIE *es- gave us am, is, are — and Latin esse, essence. PIE *bʰuH- gave us be, been, being — and Latin futurus. PIE *h₂wes- gave us was, were — to dwell, to remain. Three families. Three origins. Collapsed into a single paradigm with no explanation and no apology.",connections:[["am / is / are","PIE *es-: to exist"],["be / been / being","PIE *bʰuH-: to become, to grow"],["was / were","PIE *h₂wes-: to remain, to dwell"],["essence","from *es-: the quality of existing"],["future","from *bʰuH-: that which will grow into being"]]}},
  {date:"2026-01-07",type:"ROOT",root:"port",lang:"Latin",meaning:"to carry",targets:["transport","import","export","report","deport","portfolio","portable","portal","important","support","deportment","purport"],required:["transport","import","export","report","deport","portable","important","portal"],reveal:{headline:"Every time something crosses a threshold, it is being carried.",body:"Portare: to carry. A portal is a place of carrying-through. \"Important\" means carried-in — what has been brought to you. The most weighted word in the language is just: something that arrived.",connections:[["transport","carried across (trans)"],["import","carried in (im)"],["export","carried out (ex)"],["report","carried back (re)"],["important","carried in: that which arrives"],["portal","the place of carrying-through"]]}},
  {date:"2026-01-08",type:"COLLISION",root:"Old Norse vs Old English",lang:"871 CE — the Danelaw",meaning:"the vocabulary war you never knew was happening",prompt:"After the Viking settlement of northern England, two languages crashed. Sort each word into the language it came from.",pool:["sky","heaven","egg","die","window","ugly","they","weak","death","earth","lord","berserk"],groups:[{id:"norse",label:"Old Norse",accepts:["sky","egg","die","window","ugly","they","weak","berserk"],related:[]},{id:"oe",label:"Old English",accepts:["heaven","death","earth","lord"],related:[]}],reveal:{headline:"The Vikings did not just raid the coasts. They raided the dictionary.",body:"When Norse-speaking Danes settled northern England after 871, two vocabularies crashed. Old English heofon and Old Norse ský both meant the space above — they negotiated. Egg won over ǣg. Deyja displaced steorfan. The words you use most casually are often the ones that won a war you never knew was happening.",connections:[["sky","ON ský — displaced OE wolcen"],["die","ON deyja — displaced OE steorfan"],["egg","ON egg — displaced OE ǣg"],["ugly","ON uggligr: dreadful, fearsome"],["they","ON þeir — OE had no equivalent plural pronoun"],["window","ON vindauga: wind-eye"]]}},
  {date:"2026-01-09",type:"ROOT",root:"fract / frag",lang:"Latin",meaning:"to break",targets:["fracture","fragment","fraction","fragile","infraction","refract","frail","frangible"],required:["fracture","fragment","fraction","fragile","infraction","refract","frail"],reveal:{headline:"A fraction is a piece of something broken. Mathematics borrowed the word from surgery.",body:"Frangere: to break. A fraction is literally a broken number — something less than whole. Frail comes from the same root through Old French fraile: easily broken.",connections:[["fraction","a broken number: less than whole"],["fragile","prone to breaking"],["frail","broken-natured: via Old French fraile"],["infraction","a breaking-into: a violation"],["refract","broken back: light bent at a boundary"]]}},
  {date:"2026-01-10",type:"SEMANTIC",root:"silly",lang:"Old English → Middle English → Modern English",meaning:"a word that fell from grace completely",prompt:"\"Silly\" began as the highest compliment in the language. Fill in what it meant at each stage of its fall.",word:"silly",timeline:[{era:"OE sǣlig",meaning:"blessed, God-favored, fortunate",blank:true},{era:"ME sely 1200s",meaning:"innocent, simple"},{era:"ME 1400s",meaning:"pitiable, helpless",blank:true},{era:"1500s",meaning:"weak, feeble",blank:true},{era:"1600s onward",meaning:"foolish, absurd"}],reveal:{headline:"\"Silly\" meant blessed. Then innocent. Then pitiable. Then weak. Then foolish.",body:"Old English sǣlig: blessed, happy, fortunate — the same root as German selig. The word fell one step at a time. Each generation handed it downward. By the time it reached you it had nothing left of its original light.",connections:[["sǣlig (OE)","blessed, God-favored"],["sely (ME 1200s)","innocent, simple"],["silly (ME 1400s)","pitiable, helpless"],["silly (1500s)","weak, feeble"],["silly (1600s+)","foolish, absurd — the bottom of the fall"]]}},
  {date:"2026-01-11",type:"ROOT",root:"greg",lang:"Latin",meaning:"flock, herd",targets:["congregate","segregate","aggregate","egregious","gregarious","congregation","segregation"],required:["congregate","segregate","aggregate","egregious","gregarious"],reveal:{headline:"\"Egregious\" once meant the best sheep in the flock.",body:"Grex/gregis: a flock. Egregious: e + grex — standing out from the flock. It once meant exceptionally good. Somewhere in the 16th century the word reversed. The flock decided what it meant. The flock always does.",connections:[["gregarious","loves the flock"],["congregate","flock together (con)"],["segregate","separated from the flock (se)"],["aggregate","driven toward the flock (ad)"],["egregious","outside the flock (e) — once admirable, now damning"]]}},
  {date:"2026-01-12",type:"PIE",root:"*gʷen-",lang:"Proto-Indo-European",meaning:"to strike, to kill",prompt:"Three modern English words descend from the PIE root meaning 'to strike.' Sort the pool — some belong, some are imposters.",pool:["bane","gun","quell","baneful","murder","kill","slay","wound"],groups:[{id:"gwen",label:"*gʷen- descendants",accepts:["bane","gun","quell","baneful"],related:[]},{id:"other",label:"Not from *gʷen-",accepts:["murder","kill","slay","wound"],related:[]}],reveal:{headline:"\"Gun\" may be descended from a word meaning to strike down.",body:"PIE *gʷen-: to strike, to kill. Old English bana: killer — hence bane. Old Norse gunnr: war, battle. Medieval records show a 14th century ballista named Domina Gunilda — a woman's name built from gunnr + hildr. The machine became gun. The violence was always at the beginning.",connections:[["bane","OE bana: killer, destroyer"],["gun","from ON gunnr: war — possibly via the name Gunhild"],["quell","OE cwellan: to kill, strike dead — now softened"]]}},
  {date:"2026-01-13",type:"ROOT",root:"vert / vers",lang:"Latin",meaning:"to turn",targets:["convert","invert","divert","revert","subvert","universe","version","versatile","vertigo","avert","pervert","introvert","extrovert","traverse","controversy"],required:["convert","invert","divert","subvert","universe","introvert","extrovert","vertigo","versatile","avert"],reveal:{headline:"The universe is everything turned into one. Vertigo is the world turning without you.",body:"Vertere: to turn. Universe: uni (one) + versus (turned). Vertigo: the sensation of turning when you are standing still. Every word is a direction. Every direction is a choice about where to turn.",connections:[["universe","everything turned into one (uni + versus)"],["vertigo","the world moves, you do not"],["subvert","turned from underneath"],["introvert","turned inward"],["extrovert","turned outward"]]}},
  {date:"2026-01-14",type:"GRIMM",root:"t → th (Grimm's Law)",lang:"Proto-Indo-European → Proto-Germanic",meaning:"the second shift: t became th",prompt:"The same law that turned p into f also turned t into th. Type the English word for each Latin source.",pairs:[{source:"tres (Latin: three)",target:"three",note:"t → th"},{source:"tenuis (Latin: thin)",target:"thin",note:"t → th"},{source:"tu (Latin: you)",target:"thou",note:"t → th"},{source:"dentis (Latin: tooth)",target:"tooth",note:"d → t, t → th"},{source:"cor / cardio (Greek: heart)",target:"heart",note:"c/k → h"}],reveal:{headline:"The shift was systematic. It rewrote every consonant in the language.",body:"Grimm's Law describes three consonant shifts that separated Proto-Germanic from every other Indo-European branch. p→f, t→th, k→h happened to virtually every word simultaneously, over centuries, invisibly.",connections:[["three","Latin tres: t → th"],["thin","Latin tenuis: t → th"],["thou","Latin tu: t → th — the word we abandoned for 'you'"],["tooth","Latin dens/dentis: via a complex shift path"]]}},
  {date:"2026-01-15",type:"ROOT",root:"duc / duct",lang:"Latin",meaning:"to lead",targets:["produce","reduce","deduce","induce","seduce","educate","conduct","aqueduct","duke","abduct","viaduct","ductile"],required:["produce","reduce","deduce","educate","conduct","aqueduct","seduce","abduct","duke"],reveal:{headline:"To seduce someone is to lead them aside.",body:"Ducere: to lead. To educate is to lead out — to draw out what is already there. To seduce is to lead aside — se (away) + ducere. The seducer was never about desire. The word was always about direction.",connections:[["educate","lead out (ex + ducere): draw out the latent"],["seduce","lead aside (se + ducere): draw away from the path"],["deduce","lead down: from premise to conclusion"],["aqueduct","water-leader: aqua + ductus"],["duke","dux: the leader — the one who goes first"]]}},
  {date:"2026-01-16",type:"COLLISION",root:"The legal vocabulary",lang:"Old Norse vs Old English",meaning:"the Danelaw wrote half the rulebook",prompt:"The Vikings gave English most of its legal vocabulary. Sort each word into the language it came from.",pool:["law","outlaw","wrong","loose","thrall","ransack","crime","guilt","judge","witness","oath","bylaw"],groups:[{id:"norse",label:"Old Norse",accepts:["law","outlaw","wrong","loose","thrall","ransack","bylaw"],related:[]},{id:"oe",label:"Old English",accepts:["crime","guilt","judge","witness","oath"],related:[]}],reveal:{headline:"The Vikings gave English its words for law, crime, and punishment.",body:"Old Norse lög: law — literally things laid down. Wrong: Old Norse rangr, crooked, unjust. The Danelaw occupied not just territory but the language of governance, and the occupation never entirely ended.",connections:[["law","ON lög: things laid down"],["outlaw","ON útlagi: one placed outside the law"],["wrong","ON rangr: crooked, unjust"],["thrall","ON þræll: slave, one who is bound"],["ransack","ON rannsaka: to search a house"]]}},
  {date:"2026-01-17",type:"ROOT",root:"mit / miss",lang:"Latin",meaning:"to send",targets:["submit","commit","admit","emit","permit","transmit","mission","missile","dismiss","promise","intermittent","remit","omit","manumit"],required:["submit","commit","admit","emit","permit","transmit","mission","missile","dismiss"],reveal:{headline:"A missile is simply something sent.",body:"Mittere: to send. A missile is something sent — the word predates the weapon by centuries. To dismiss is to send away. The word for letting someone go and the word for casting them out share the same root.",connections:[["missile","something sent: the word predates the weapon"],["submit","sent under (sub): to yield"],["commit","sent together (com): bound to"],["dismiss","sent away (dis): discharged"],["manumit","sent from the hand (manus): to free a slave"]]}},
  {date:"2026-01-18",type:"SEMANTIC",root:"lord / lady",lang:"Old English",meaning:"the hidden bread",prompt:"Both \"lord\" and \"lady\" contain the same hidden word. Fill in the etymology of each title.",word:"lord / lady",timeline:[{era:"hlāf",meaning:"Old English: loaf, bread — the hidden root of both words"},{era:"hlāford",meaning:"hlāf + weard (guardian): bread-keeper → lord",blank:true},{era:"hlǣfdige",meaning:"hlāf + dige (kneader): bread-maker → lady",blank:true},{era:"Modern usage",meaning:"Lord and Lady — titles of power built entirely from a word for food"}],reveal:{headline:"\"Lord\" means bread-guardian. \"Lady\" means bread-kneader.",body:"Power was food. Status was who controlled it and who made it. The highest titles in the medieval social order were both built from the same word: loaf.",connections:[["lord","OE hlāford: hlāf (loaf) + weard (guardian)"],["lady","OE hlǣfdige: hlāf (bread) + dige (kneader)"],["loaf","OE hlāf: the root of the whole hierarchy"]]}},
  {date:"2026-01-19",type:"ROOT",root:"grad / gress",lang:"Latin",meaning:"to step, to walk",targets:["progress","regress","transgress","digress","congress","graduate","gradual","ingredient","degrade","grade","gradient","retrograde","centigrade"],required:["progress","regress","transgress","digress","congress","graduate","degrade","ingredient"],reveal:{headline:"Congress is a room full of people who stepped together.",body:"Gradus: a step. Transgress: stepping across a line you were not meant to cross. Ingredient: that which steps into the mixture. Graduate: one who has been given a step.",connections:[["progress","stepping forward (pro)"],["congress","stepping together (con)"],["transgress","stepping across — a violation"],["ingredient","that which steps into the mixture"],["graduate","given a step: graded upward"]]}},
  {date:"2026-01-20",type:"SUPPLETIVE",root:"good / better / best",lang:"Proto-Germanic",meaning:"three words that have no business being in the same sentence",prompt:"\"Good,\" \"better,\" and \"best\" come from three different Proto-Germanic roots. Sort each word into its actual origin.",pool:["good","goodness","goodly","better","betterment","best","batten","boot","boon","bonus"],groups:[{id:"god",label:"*gōdaz (good)",accepts:["good","goodness","goodly"],related:[]},{id:"bat",label:"*batizô (advantage, use)",accepts:["better","betterment","best","batten","boot"],related:["boon"]},{id:"bonus",label:"Latin bonus (unrelated to both)",accepts:["bonus"],related:[]}],reveal:{headline:"\"Good,\" \"better,\" and \"best\" are three unrelated words pressed into a single paradigm by force.",body:"Proto-Germanic *gōdaz: good. Proto-Germanic *batizô: better — from *bat-, a different root. *batistaz: best. When a paradigm loses its comparative and superlative forms, the language raids nearby words. English did not notice. English never notices.",connections:[["good","PGmc *gōdaz — has no true comparative"],["better","PGmc *batizô — from *bat-: useful, advantageous"],["best","PGmc *batistaz — superlative of *bat-, not *gōd-"],["bonus","Latin bonus: good — unrelated to English 'good'"]]}},
  {date:"2026-01-21",type:"ROOT",root:"voc / vok",lang:"Latin",meaning:"to call, voice",targets:["invoke","evoke","provoke","revoke","vocal","vocabulary","vocation","advocate","equivocate","irrevocable","vociferous"],required:["invoke","evoke","provoke","revoke","vocal","vocation","advocate","equivocate","vociferous"],reveal:{headline:"Your vocation is what you were called to do.",body:"Vocare: to call. A vocation is a calling. An advocate calls toward you on your behalf. To equivocate: to call equally in two directions — to speak with a voice that points both ways.",connections:[["vocation","vocare: a calling — what you were summoned to"],["advocate","called toward you (ad): one who speaks for"],["provoke","called forth (pro): brought out of hiding"],["evoke","called out (e): summoned from memory"],["equivocate","called equally both ways: speaking in two directions at once"]]}},
  {date:"2026-01-22",type:"GRIMM",root:"k → h (Grimm's Law)",lang:"Proto-Indo-European → Proto-Germanic",meaning:"the third shift: k became h",prompt:"The same law also turned k (and c) into h. Type the English word for each Latin or Greek source.",pairs:[{source:"canis (Latin: dog)",target:"hound",note:"c/k → h"},{source:"centum (Latin: hundred)",target:"hundred",note:"c → h"},{source:"cor / cardio (Greek: heart)",target:"heart",note:"c → h"},{source:"cornu (Latin: horn)",target:"horn",note:"c → h"},{source:"caput (Latin: head)",target:"head",note:"c → h"}],reveal:{headline:"\"Hound,\" \"hundred,\" \"heart,\" \"horn,\" \"head\" — every h was once a k.",body:"The third arm of Grimm's Law: voiceless stops k shifted to h in Proto-Germanic. Latin canis became OE hund. The letter h in English is often a ghost — the mark of a harder sound that softened over two thousand years.",connections:[["hound","Latin canis: c/k → h"],["hundred","Latin centum: c → h"],["heart","Greek kardia: k → h"],["horn","Latin cornu: c → h"],["head","Latin caput: c → h"]]}},
  {date:"2026-01-23",type:"ROOT",root:"cred",lang:"Latin",meaning:"to believe, to trust",targets:["credit","credible","incredible","credential","creed","credulous","miscreant","accredit","credo","recreant","credence"],required:["credit","credible","incredible","credential","creed","credulous","miscreant","credence"],reveal:{headline:"A miscreant is someone who believes the wrong things.",body:"Credere: to believe, to trust. Miscreant: mis + credent — one who believes wrongly, a heretic. The word moved from theology to crime fiction. The heretic became the villain. The believing was always the problem.",connections:[["credit","what is believed about you: trust made currency"],["credulous","believes too readily"],["miscreant","believes wrongly (mis): heretic → criminal"],["incredible","beyond belief — then: exceptionally good"],["recreant","believes again incorrectly: one who surrenders — a coward"]]}},
  {date:"2026-01-24",type:"PIE",root:"*dʰeh₁-",lang:"Proto-Indo-European",meaning:"to place, to set, to do",prompt:"One PIE root gave English 'do' and Greek 'thesis.' Sort each word into the language branch it came through.",pool:["do","deed","doom","thesis","theme","thesaurus","fact","fashion","satisfy","door"],groups:[{id:"germanic",label:"Via Germanic (*dʰ → d)",accepts:["do","deed","doom","door"],related:[]},{id:"greek",label:"Via Greek (*dʰ → t)",accepts:["thesis","theme","thesaurus"],related:[]},{id:"latin",label:"Via Latin (*dʰ → f)",accepts:["fact","fashion","satisfy"],related:[]}],reveal:{headline:"Every time you open a door, you are performing an ancient root meaning to place, to set.",body:"PIE *dʰeh₁-: to place, to set, to do. In Greek: títhēmi — thesis, theme. In Latin: facio — fact, fashion. In Germanic: dōn — do, deed, doom. The same root, three paths, three totally different sounds.",connections:[["do / deed","PIE *dʰeh₁- via Germanic: *dh → d"],["thesis","PIE *dʰeh₁- via Greek: *dh → t"],["fact","PIE *dʰeh₁- via Latin: *dh → f"],["doom","OE dōm: a thing placed or decreed"],["door","PIE *dʰwer-: threshold, the place of passage"]]}},
  {date:"2026-01-25",type:"ROOT",root:"pend / pens",lang:"Latin",meaning:"to hang, to weigh",targets:["depend","suspend","pension","pensive","compensate","appendix","perpendicular","impend","expend","pendant","pendulum","independent","spend","dispense","impending","suspense","stipend"],required:["depend","suspend","pension","pensive","pendulum","independent","spend","appendix","impending","suspense"],reveal:{headline:"To be pensive is to hang in thought.",body:"Pendere: to hang, to weigh, to pay. To spend: from Latin expendere — to weigh out coin. Every word for thinking carefully, paying carefully, or hanging anxiously descends from the same physical act: something suspended, swaying, about to be weighed.",connections:[["pensive","hanging in thought: weighed down by consideration"],["depend","hanging from (de): suspended by something outside yourself"],["pendulum","the pure form: the hanger, the swinger"],["impending","hanging over (im): about to fall"],["spend","via Latin expendere: to weigh out payment"],["suspense","hanging under (sub): held in mid-air, unresolved"]]}},
  {date:"2026-01-26",type:"PIE",root:"*weid-",lang:"Proto-Indo-European",meaning:"to see — and why seeing became knowing",prompt:"One PIE root for 'to see' became the word for 'to know.' Sort each word into the language it came through.",pool:["wise","wit","wizard","vision","video","evidence","idea","history","supervise","guide"],groups:[{id:"germanic",label:"Via Germanic (wis/wit)",accepts:["wise","wit","wizard","guide"],related:[]},{id:"latin",label:"Via Latin (vid/vis)",accepts:["vision","video","evidence","supervise"],related:[]},{id:"greek",label:"Via Greek (id/hist)",accepts:["idea","history"],related:[]}],reveal:{headline:"In Proto-Indo-European, seeing and knowing were the same act.",body:"PIE *weid-: to see. In Greek: oida — I have seen, therefore I know. In Latin: video (I see). In Old English: witan (to know), wit, wise. History: from Greek historia — the act of seeing for oneself. Idea: Greek idein — to see; an idea is a thing you see in your mind.",connections:[["video","Latin: I see — in your streaming queue"],["wise","OE wīs: one who has seen"],["idea","Greek idein: to see — what the mind perceives"],["history","Greek historia: inquiry, seeing for oneself"],["evidence","Latin evidentia: that which is clearly visible"],["wizard","one who knows (wis): the seer"]]}},
  {date:"2026-01-27",type:"ROOT",root:"terra / terr",lang:"Latin",meaning:"earth, land",targets:["territory","terrain","terrestrial","Mediterranean","terrace","subterranean","extraterrestrial","tureen","terrarium","terracotta","inter"],required:["territory","terrain","terrestrial","Mediterranean","subterranean","extraterrestrial","terrace","terrarium","inter"],reveal:{headline:"The Mediterranean is the sea in the middle of the earth.",body:"Terra: earth, land. Mediterranean: medius (middle) + terra. Tureen: from French terrine, from Latin terra — an earthen dish. Every meal served from a tureen is served from the earth.",connections:[["Mediterranean","medius + terra: the sea at the middle of the earth"],["territory","land held under authority"],["subterranean","under the earth (sub)"],["extraterrestrial","outside the earth"],["inter","from Latin interrare: to place into the earth — to bury"],["tureen","from Latin terra via French: an earthen vessel"]]}},
  {date:"2026-01-28",type:"SUPPLETIVE",root:"person / people",lang:"Latin → French → English",meaning:"a mask, a crowd, and how they became us",prompt:"\"Person\" and \"people\" look like they belong together. They come from completely different Latin roots. Sort each word into its actual origin.",pool:["person","persona","personnel","impersonate","personage","people","population","public","republic","populace"],groups:[{id:"persona",label:"persona (theatrical mask)",accepts:["person","persona","personnel","impersonate","personage"],related:[]},{id:"populus",label:"populus (the crowd)",accepts:["people","population","public","republic","populace"],related:[]}],reveal:{headline:"You are, etymologically, a mask.",body:"Latin persona: a theatrical mask — the mask through which the actor's voice sounded. The mask became the character. The character became the role. The role became the legal entity. The legal entity became you. When the state calls you a person it is using a word that began as a prop in a play.",connections:[["person","Latin persona: theatrical mask through which the voice sounds"],["personnel","persons in service: the human masks of an institution"],["republic","res publica: the public thing, belonging to the people"],["population","the people as a countable mass: populus"],["impersonate","to put on the mask of another (im + persona)"]]}},
  {date:"2026-01-29",type:"ROOT",root:"luc / lum / lustr",lang:"Latin",meaning:"light",targets:["lucid","illuminate","illustrate","lustrous","translucent","elucidate","lucifer","luminary","pellucid","luminous","luna"],required:["lucid","illuminate","illustrate","translucent","elucidate","lucifer","luminary","luminous"],reveal:{headline:"Lucifer means light-bearer.",body:"Lux/lucis: light. Lucifer: luci + ferre — the light-bearer, Venus at dawn. It was a Latin title, not a name. The application to Satan comes from a mistranslation of Isaiah 14:12. The word for the devil is the word for dawn light. Language is not careful with its assignments.",connections:[["lucifer","lux + ferre: light-carrier — the morning star, then the fallen"],["lucid","full of light: transparent, clear"],["illuminate","to light up (in + lumen): to make visible"],["illustrate","to throw light on (in + lustrare): to clarify"],["translucent","light passing through (trans): between opaque and clear"]]}},
  {date:"2026-01-30",type:"SEMANTIC",root:"manufacture",lang:"Latin",meaning:"the hand that survived the machine",prompt:"\"Manufacture\" literally means made by hand. Trace how the word for handcraft became the word for industrial production.",word:"manufacture",timeline:[{era:"manus + factura",meaning:"Latin: hand + making — made by hand"},{era:"1500s English",meaning:"things made by hand — craft production",blank:true},{era:"1700s",meaning:"large-scale production — but still the same word",blank:true},{era:"Industrial Revolution onward",meaning:"factory production — the hands are gone but the word remains"}],reveal:{headline:"The word for industrial production still means hand-made.",body:"Manus: hand. The word entered English meaning exactly that. Then the factories came and the hands left, but the word remained. Every word about control is a word about hands.",connections:[["manufacture","manus + factura: made by hand — the word survived the machines"],["manipulate","to handle: to work with the hands, then without them"],["emancipate","to take from the hand: to release"],["maintain","to hold in the hand: to keep"],["manacle","a little hand — a device for the hand: a chain"]]}},
  {date:"2026-01-31",type:"PIE",root:"*es- / *bʰuH- / *h₂wes-",lang:"Proto-Indo-European",meaning:"the final machinery: to be",prompt:"You saw this on January 6th. Now assign the Latin and Greek descendants too. Three roots. Everything that means existence descended from one of them.",pool:["am","is","are","be","been","being","was","were","essence","entity","future","absent","becoming","exist","subsist"],groups:[{id:"es",label:"*es- (to exist)",accepts:["am","is","are","essence","entity","exist","absent"],related:[]},{id:"bhuh",label:"*bʰuH- (to grow, become)",accepts:["be","been","being","future","becoming"],related:[]},{id:"hwes",label:"*h₂wes- (to dwell, remain)",accepts:["was","were","subsist"],related:[]}],reveal:{headline:"You have been using three dead languages every time you say \"I am.\"",body:"Three roots, three meanings: to exist, to become, to remain. English collapsed them into a single verb with no explanation and no apology. When you say I am here, you are doing all three at once. The verb contains the whole argument. It always did.",connections:[["am / is / are","PIE *es-: to exist — the simplest claim"],["be / been / being","PIE *bʰuH-: to become, to grow — the process"],["was / were","PIE *h₂wes-: to remain, to dwell — the past as habitation"],["essence","from *es-: the quality of existing"],["future","from *bʰuH-: that which will grow into being"],["entity","from *es-: a thing that exists"]]}}
];

const getPuzzleForDate = d => PUZZLES.find(p => p.date === d) || null;
const getTodayStr = () => { const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
const STORAGE_KEY = "derivative_v3";
const load = () => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}"); } catch { return {}; } };
const save = d => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch {} };

const S = {
  mono: { fontFamily:"var(--font-mono,monospace)" },
  btn: { background:"transparent", border:"1px solid #3a2e14", color:"#c8922a", padding:"0.45rem 1rem", fontFamily:"var(--font-mono,monospace)", fontSize:"0.7rem", letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:"2px" },
  btnSm: { background:"transparent", border:"1px solid #2a2010", color:"#7a5618", padding:"0.3rem 0.6rem", fontFamily:"var(--font-mono,monospace)", fontSize:"0.62rem", letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:"2px" },
  btnPrimary: { background:"#c8922a", border:"1px solid #c8922a", color:"#0d0b08", padding:"0.45rem 1rem", fontFamily:"var(--font-mono,monospace)", fontSize:"0.7rem", letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:"2px" },
  input: { background:"#0d0b08", border:"1px solid #2a2010", borderRadius:"2px", color:"#d4c4a0", fontFamily:"var(--font-mono,monospace)", fontSize:"0.85rem", padding:"0.45rem 0.65rem", outline:"none", letterSpacing:"0.04em", width:"100%", boxSizing:"border-box" },
};

// ── STARFIELD ──────────────────────────────────────────────────────────────
const Starfield = () => (
  <canvas style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:0,pointerEvents:"none"}} ref={el=>{
    if(!el||el._init) return; el._init=true;
    const ctx=el.getContext("2d");
    const resize=()=>{el.width=el.offsetWidth;el.height=el.offsetHeight;};
    resize();
    const stars=Array.from({length:160},()=>({x:Math.random()*el.width,y:Math.random()*el.height,r:Math.random()*1.1+0.1,o:Math.random()*0.5+0.1,s:Math.random()*0.4+0.1,d:Math.random()>0.5?1:-1,cyan:Math.random()>0.75}));
    const draw=()=>{
      ctx.clearRect(0,0,el.width,el.height);
      stars.forEach(s=>{s.o+=0.003*s.s*s.d;if(s.o>0.7||s.o<0.08)s.d*=-1;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=s.cyan?`rgba(78,207,207,${s.o})`:`rgba(200,146,42,${s.o})`;ctx.fill();});
      requestAnimationFrame(draw);
    };
    draw(); window.addEventListener("resize",resize);
  }}/>
);

// ── TYPE BADGE ─────────────────────────────────────────────────────────────
const TypeBadge = ({type}) => {
  const tc = TYPE_COLORS[type]||"#c8922a";
  return <div style={{display:"inline-block",background:tc+"18",border:`1px solid ${tc}44`,borderRadius:"2px",padding:"0.15rem 0.5rem",...S.mono,fontSize:"0.58rem",color:tc,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:"0.5rem"}}>{TYPE_LABELS[type]||type}</div>;
};

// ── REVEAL CARD ────────────────────────────────────────────────────────────
const RevealCard = ({puzzle, onShare}) => (
  <div style={{borderTop:"1px solid #2a2010",paddingTop:"1.25rem",marginTop:"0.75rem"}}>
    <div style={{...S.mono,fontSize:"0.58rem",color:TYPE_COLORS[puzzle.type]||"#c8922a",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:"0.65rem"}}>— revealed —</div>
    <div style={{fontSize:"0.98rem",color:"#d4c4a0",fontWeight:500,lineHeight:1.55,marginBottom:"0.65rem"}}>{puzzle.reveal.headline}</div>
    <div style={{fontSize:"0.82rem",color:"#8a7868",lineHeight:1.85,marginBottom:"1rem"}}>{puzzle.reveal.body}</div>
    <div style={{display:"flex",flexDirection:"column",gap:"5px",marginBottom:"1rem"}}>
      {puzzle.reveal.connections.map(([w,d],i)=>(
        <div key={i} style={{display:"flex",gap:"1rem",fontSize:"0.74rem",...S.mono}}>
          <span style={{color:"#c8922a",minWidth:"130px",flexShrink:0}}>{w}</span>
          <span style={{color:"#5a4a38"}}>{d}</span>
        </div>
      ))}
    </div>
    <button style={S.btnSm} onClick={onShare}>share →</button>
  </div>
);

// ── SHARE CARD ─────────────────────────────────────────────────────────────
const ShareCard = ({msg}) => {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(msg).catch(()=>{}); setCopied(true); setTimeout(()=>setCopied(false),2000); };
  return (
    <div style={{marginTop:"1rem",background:"#0d0b08",border:"1px solid #3a2e14",borderRadius:"2px",padding:"1rem 1.1rem"}}>
      <pre style={{...S.mono,fontSize:"0.74rem",color:"#c8a050",margin:0,whiteSpace:"pre-wrap",lineHeight:1.9}}>{msg}</pre>
      <button style={{...S.btnSm,marginTop:"0.75rem"}} onClick={copy}>{copied?"copied ✓":"copy to clipboard"}</button>
    </div>
  );
};

// ── PUZZLE HEADER ──────────────────────────────────────────────────────────
const PuzzleHeader = ({puzzle, selDate}) => {
  const dateLabel = new Date(selDate+"T12:00:00").toLocaleDateString("en-US",{month:"long",day:"numeric"});
  return (
    <div style={{marginBottom:"1.25rem"}}>
      <TypeBadge type={puzzle.type}/>
      <div style={{...S.mono,fontSize:"1.35rem",color:"#d4c4a0",letterSpacing:"0.07em",marginBottom:"0.2rem"}}>{puzzle.root}</div>
      <div style={{fontSize:"0.8rem",color:"#7a6858",fontStyle:"italic",marginBottom:"0.2rem"}}>{puzzle.lang} · {puzzle.meaning}</div>
      {puzzle.prompt && <div style={{fontSize:"0.77rem",color:"#5a4a38",borderLeft:"2px solid #3a2e14",paddingLeft:"0.7rem",marginTop:"0.6rem",lineHeight:1.65}}>{puzzle.prompt}</div>}
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// PUZZLE INTERACTION TYPES
// ════════════════════════════════════════════════════════════════════════════

// ── ROOT ───────────────────────────────────────────────────────────────────
const RootPuzzle = ({puzzle, found, onWord, revealed}) => {
  const [input, setInput] = useState("");
  const [flash, setFlash] = useState(null);
  const [shake, setShake] = useState(false);
  const ref = useRef();
  useEffect(()=>{ setTimeout(()=>ref.current?.focus(),100); },[]);

  const submit = () => {
    const w = input.trim().toLowerCase(); if(!w) return;
    setInput("");
    if(found.includes(w)) { setFlash({msg:"already found",ok:false}); return; }
    if(puzzle.targets.includes(w)) {
      onWord(w, puzzle.required.includes(w));
      setFlash({msg: puzzle.required.includes(w) ? "+" : "related", ok:true, bonus:!puzzle.required.includes(w)});
    } else {
      setShake(true); setFlash({msg:"not in this family",ok:false});
      setTimeout(()=>setShake(false),500);
    }
    setTimeout(()=>setFlash(null),1300);
  };

  const reqFound = found.filter(w=>puzzle.required.includes(w));
  const bonusFound = found.filter(w=>!puzzle.required.includes(w)&&puzzle.targets.includes(w));

  return (
    <div>
      {!revealed && (
        <div style={{marginBottom:"1.1rem"}}>
          <div style={{display:"flex",gap:"8px",marginBottom:"0.4rem"}}>
            <input ref={ref} value={input} onChange={e=>setInput(e.target.value.toLowerCase())} onKeyDown={e=>e.key==="Enter"&&submit()}
              placeholder={`build a word using "${puzzle.root}"…`}
              style={{...S.input, border:`1px solid ${shake?"#8b3a3a":"#2a2010"}`, animation:shake?"shake 0.4s ease":"none", flex:1}}/>
            <button style={S.btnPrimary} onClick={submit}>enter</button>
          </div>
          {flash && <div style={{...S.mono,fontSize:"0.65rem",color:flash.ok?(flash.bonus?"#4ecfcf":"#c8922a"):"#8b3a3a",letterSpacing:"0.1em",textTransform:"uppercase"}}>{flash.msg}</div>}
        </div>
      )}
      <div style={{...S.mono,fontSize:"0.58rem",color:"#3a2e1c",letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:"0.45rem"}}>
        {reqFound.length}/{puzzle.required.length} found{bonusFound.length>0?` · +${bonusFound.length} related`:""}
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"0.5rem"}}>
        {puzzle.required.map(w=>{
          const f=found.includes(w);
          return <div key={w} style={{...S.mono,fontSize:"0.78rem",padding:"0.28rem 0.6rem",borderRadius:"2px",background:f?"#2a1e08":"#0d0b08",border:f?"1px solid #c8922a":"1px solid #181508",color:f?"#e8b84b":"#1e1808",transition:"all 0.25s"}}>{f?w:"·".repeat(Math.max(3,w.length))}</div>;
        })}
      </div>
      {bonusFound.length>0 && (
        <div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>
          {bonusFound.map(w=><div key={w} style={{...S.mono,fontSize:"0.7rem",padding:"0.22rem 0.5rem",borderRadius:"2px",background:"#0a1414",border:"1px solid #1a3a3a",color:"#4ecfcf"}}>{w} <span style={{color:"#2a5858",fontSize:"0.58rem"}}>related</span></div>)}
        </div>
      )}
    </div>
  );
};

// ── SORT PUZZLE (SUPPLETIVE / PIE / COLLISION) ─────────────────────────────
const SortPuzzle = ({puzzle, state, onState, revealed}) => {
  // state: { assigned: { wordId: groupId } }
  const assigned = state?.assigned || {};
  const [dragWord, setDragWord] = useState(null);
  const [input, setInput] = useState("");
  const [flash, setFlash] = useState(null);
  const [activeGroup, setActiveGroup] = useState(null);

  const unassigned = puzzle.pool.filter(w => !assigned[w]);
  const totalRequired = puzzle.groups.flatMap(g=>g.accepts).length;
  const correctCount = Object.entries(assigned).filter(([w,g])=>{
    const grp = puzzle.groups.find(gr=>gr.id===g);
    return grp && (grp.accepts.includes(w)||grp.related.includes(w));
  }).length;

  const assign = (word, groupId) => {
    if(!word||!groupId) return;
    const grp = puzzle.groups.find(g=>g.id===groupId);
    if(!grp) return;
    const correct = grp.accepts.includes(word)||grp.related.includes(word);
    const newAssigned = {...assigned, [word]: groupId};
    onState({assigned: newAssigned});
    setFlash({word, correct, bonus: grp.related.includes(word)});
    setTimeout(()=>setFlash(null),1200);
  };

  const unassign = (word) => {
    const na = {...assigned}; delete na[word]; onState({assigned:na});
  };

  const handleTextSubmit = () => {
    if(!activeGroup||!input.trim()) return;
    const w = input.trim().toLowerCase();
    if(puzzle.pool.includes(w) && !assigned[w]) { assign(w, activeGroup); setInput(""); }
    else { setFlash({word:w,correct:false,notInPool:true}); setInput(""); setTimeout(()=>setFlash(null),1200); }
  };

  return (
    <div>
      <div style={{...S.mono,fontSize:"0.58rem",color:"#3a2e1c",letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:"0.75rem"}}>
        {correctCount}/{totalRequired} assigned correctly
      </div>

      {/* Word pool */}
      {!revealed && unassigned.length > 0 && (
        <div style={{marginBottom:"1rem"}}>
          <div style={{...S.mono,fontSize:"0.58rem",color:"#3a2e1c",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:"0.4rem"}}>word pool</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>
            {unassigned.map(w=>(
              <div key={w} draggable onDragStart={()=>setDragWord(w)}
                style={{...S.mono,fontSize:"0.8rem",padding:"0.3rem 0.65rem",borderRadius:"2px",background:"#141208",border:"1px solid #2a2010",color:"#c8922a",cursor:"grab",userSelect:"none"}}>
                {w}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Groups */}
      <div style={{display:"flex",flexDirection:"column",gap:"10px",marginBottom:"0.75rem"}}>
        {puzzle.groups.map(grp=>{
          const grpWords = Object.entries(assigned).filter(([,g])=>g===grp.id).map(([w])=>w);
          const isActive = activeGroup===grp.id;
          return (
            <div key={grp.id}
              onDragOver={e=>{e.preventDefault();}}
              onDrop={e=>{e.preventDefault();if(dragWord){assign(dragWord,grp.id);setDragWord(null);}}}
              onClick={()=>setActiveGroup(isActive?null:grp.id)}
              style={{background:isActive?"#1a1608":"#100e08",border:`1px solid ${isActive?"#c8922a":"#1e1808"}`,borderRadius:"3px",padding:"0.65rem 0.75rem",cursor:"pointer",transition:"all 0.15s"}}>
              <div style={{...S.mono,fontSize:"0.65rem",color:isActive?"#e8b84b":"#5a4a38",letterSpacing:"0.1em",marginBottom:grpWords.length>0?"0.5rem":"0"}}>{grp.label}</div>
              {grpWords.length > 0 && (
                <div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>
                  {grpWords.map(w=>{
                    const correct = grp.accepts.includes(w);
                    const related = grp.related.includes(w);
                    const wrong = !correct&&!related;
                    return (
                      <div key={w} onClick={e=>{e.stopPropagation();if(!revealed)unassign(w);}}
                        style={{...S.mono,fontSize:"0.75rem",padding:"0.22rem 0.55rem",borderRadius:"2px",
                          background: revealed?(correct||related?"#2a1e08":"#2a1212"):wrong&&revealed?"#2a1212":"#1e1808",
                          border: revealed?(correct?"1px solid #c8922a":related?"1px solid #4ecfcf":"1px solid #8b3a3a"):"1px solid #3a2e14",
                          color: revealed?(correct?"#e8b84b":related?"#4ecfcf":"#8b3a3a"):"#9a8868",
                          cursor:revealed?"default":"pointer"}}>
                        {w}
                      </div>
                    );
                  })}
                </div>
              )}
              {isActive && !revealed && (
                <div style={{display:"flex",gap:"6px",marginTop:"0.5rem"}} onClick={e=>e.stopPropagation()}>
                  <input value={input} onChange={e=>setInput(e.target.value.toLowerCase())} onKeyDown={e=>e.key==="Enter"&&handleTextSubmit()}
                    placeholder="type a word…" style={{...S.input,fontSize:"0.78rem",flex:1,padding:"0.3rem 0.55rem"}}/>
                  <button style={{...S.btnPrimary,padding:"0.3rem 0.65rem",fontSize:"0.65rem"}} onClick={handleTextSubmit}>add</button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {flash && (
        <div style={{...S.mono,fontSize:"0.65rem",letterSpacing:"0.1em",textTransform:"uppercase",color:flash.notInPool?"#8b3a3a":flash.correct?(flash.bonus?"#4ecfcf":"#c8922a"):"#8b3a3a",marginBottom:"0.5rem"}}>
          {flash.notInPool?"not in the pool":flash.correct?(flash.bonus?"related":"correct"):"wrong group"}
        </div>
      )}

      {!revealed && <div style={{...S.mono,fontSize:"0.6rem",color:"#3a2e1c",marginTop:"0.25rem"}}>drag words into a group, or click a group then type</div>}
    </div>
  );
};

// ── GRIMM ──────────────────────────────────────────────────────────────────
const GrimmPuzzle = ({puzzle, state, onState, revealed}) => {
  const answers = state?.answers || {};
  const [inputs, setInputs] = useState({});
  const [feedback, setFeedback] = useState({});

  const submit = (idx) => {
    const val = (inputs[idx]||"").trim().toLowerCase();
    if(!val) return;
    const correct = val === puzzle.pairs[idx].target.toLowerCase();
    const newAnswers = {...answers};
    if(correct) newAnswers[idx] = val;
    onState({answers: newAnswers});
    setFeedback(f=>({...f,[idx]:correct?"correct":"wrong"}));
    if(correct) setInputs(i=>({...i,[idx]:""}));
    setTimeout(()=>setFeedback(f=>({...f,[idx]:null})),1200);
  };

  const correct = Object.keys(answers).length;
  const total = puzzle.pairs.length;

  return (
    <div>
      <div style={{...S.mono,fontSize:"0.58rem",color:"#3a2e1c",letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:"0.75rem"}}>{correct}/{total} found</div>
      <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
        {puzzle.pairs.map((pair,idx)=>{
          const solved = !!answers[idx] || revealed;
          const fb = feedback[idx];
          return (
            <div key={idx} style={{display:"flex",alignItems:"center",gap:"10px",background:"#100e08",border:"1px solid #1e1808",borderRadius:"3px",padding:"0.6rem 0.75rem"}}>
              <div style={{flex:"0 0 220px",...S.mono,fontSize:"0.78rem",color:"#6a5a48",lineHeight:1.4}}>{pair.source}</div>
              <div style={{...S.mono,fontSize:"0.65rem",color:"#3a2e1c",flexShrink:0}}>→</div>
              {solved ? (
                <div style={{...S.mono,fontSize:"0.85rem",color:"#e8b84b",flex:1}}>{pair.target}
                  {pair.note&&<span style={{color:"#5a4a38",fontSize:"0.62rem",marginLeft:"0.5rem"}}>{pair.note}</span>}
                </div>
              ) : (
                <div style={{display:"flex",gap:"6px",flex:1}}>
                  <input value={inputs[idx]||""} onChange={e=>setInputs(i=>({...i,[idx]:e.target.value.toLowerCase()}))}
                    onKeyDown={e=>e.key==="Enter"&&submit(idx)}
                    placeholder="english word…"
                    style={{...S.input,flex:1,padding:"0.3rem 0.55rem",fontSize:"0.78rem",
                      border:`1px solid ${fb==="wrong"?"#8b3a3a":"#2a2010"}`}}/>
                  <button style={{...S.btnPrimary,padding:"0.3rem 0.55rem",fontSize:"0.62rem"}} onClick={()=>submit(idx)}>→</button>
                </div>
              )}
              {fb&&!solved&&<div style={{...S.mono,fontSize:"0.6rem",color:fb==="correct"?"#c8922a":"#8b3a3a",letterSpacing:"0.1em",textTransform:"uppercase",flexShrink:0}}>{fb}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── SEMANTIC ───────────────────────────────────────────────────────────────
const SemanticPuzzle = ({puzzle, state, onState, revealed}) => {
  const answers = state?.answers || {};
  const [inputs, setInputs] = useState({});
  const [feedback, setFeedback] = useState({});

  const blanks = puzzle.timeline.filter(t=>t.blank);
  const correct = blanks.filter((_,i)=>answers[i]).length;

  const submit = (blankIdx, era, correctMeaning) => {
    const val = (inputs[blankIdx]||"").trim().toLowerCase();
    if(!val) return;
    // fuzzy: check if user's answer contains any 2+ char word from the correct meaning
    const keywords = correctMeaning.toLowerCase().split(/[\s,;:—–-]+/).filter(w=>w.length>3);
    const isClose = keywords.some(k=>val.includes(k)||k.includes(val));
    if(isClose) {
      onState({answers:{...answers,[blankIdx]:val}});
      setFeedback(f=>({...f,[blankIdx]:"correct"}));
    } else {
      setFeedback(f=>({...f,[blankIdx]:"wrong"}));
    }
    setTimeout(()=>setFeedback(f=>({...f,[blankIdx]:null})),1200);
  };

  let blankIdx = 0;
  return (
    <div>
      <div style={{...S.mono,fontSize:"0.72rem",color:"#c8922a",letterSpacing:"0.08em",marginBottom:"0.9rem",fontStyle:"italic"}}>"{puzzle.word}"</div>
      <div style={{...S.mono,fontSize:"0.58rem",color:"#3a2e1c",letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:"0.75rem"}}>{correct}/{blanks.length} filled</div>
      <div style={{display:"flex",flexDirection:"column",gap:"0"}}>
        {puzzle.timeline.map((item, idx)=>{
          const isBlank = item.blank;
          const myBlankIdx = isBlank ? blankIdx++ : -1;
          const solved = isBlank && (!!answers[myBlankIdx] || revealed);
          const fb = isBlank ? feedback[myBlankIdx] : null;
          const isLast = idx === puzzle.timeline.length-1;
          return (
            <div key={idx} style={{display:"flex",gap:"0",alignItems:"stretch"}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0,width:"20px"}}>
                <div style={{width:"2px",flex:1,background:idx===0?"transparent":"#2a2010"}}/>
                <div style={{width:"8px",height:"8px",borderRadius:"50%",background:solved||!isBlank?"#c8922a":"#2a2010",flexShrink:0,border:"1px solid #c8922a"}}/>
                <div style={{width:"2px",flex:1,background:isLast?"transparent":"#2a2010"}}/>
              </div>
              <div style={{paddingLeft:"0.75rem",paddingTop:"0.15rem",paddingBottom:"0.75rem",flex:1}}>
                <div style={{...S.mono,fontSize:"0.62rem",color:"#5a4a38",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.2rem"}}>{item.era}</div>
                {isBlank&&!solved ? (
                  <div>
                    <div style={{display:"flex",gap:"6px"}}>
                      <input value={inputs[myBlankIdx]||""} onChange={e=>setInputs(i=>({...i,[myBlankIdx]:e.target.value}))}
                        onKeyDown={e=>e.key==="Enter"&&submit(myBlankIdx,item.era,item.meaning)}
                        placeholder="what did it mean here?"
                        style={{...S.input,flex:1,padding:"0.3rem 0.55rem",fontSize:"0.78rem",
                          border:`1px solid ${fb==="wrong"?"#8b3a3a":"#2a2010"}`}}/>
                      <button style={{...S.btnPrimary,padding:"0.3rem 0.6rem",fontSize:"0.62rem"}} onClick={()=>submit(myBlankIdx,item.era,item.meaning)}>→</button>
                    </div>
                    {fb&&<div style={{...S.mono,fontSize:"0.6rem",color:fb==="correct"?"#c8922a":"#8b3a3a",letterSpacing:"0.08em",textTransform:"uppercase",marginTop:"0.25rem"}}>{fb}</div>}
                  </div>
                ) : (
                  <div style={{fontSize:"0.82rem",color:isBlank?"#e8b84b":"#9a8868",lineHeight:1.5}}>{item.meaning}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ════════════════════════════════════════════════════════════════════════════
export default function Derivative() {
  const [view, setView] = useState("splash");
  const [selDate, setSelDate] = useState(null);
  const [puzzle, setPuzzle] = useState(null);
  const [progress, setProgress] = useState(load());
  const [revealed, setRevealed] = useState(false);
  const [puzzleState, setPuzzleState] = useState({});
  const [shareMsg, setShareMsg] = useState(null);
  const today = getTodayStr();

  const getProgress = (dateStr) => progress[dateStr] || {};

  const openPuzzle = (dateStr) => {
    const p = getPuzzleForDate(dateStr); if(!p) return;
    const saved = getProgress(dateStr);
    setSelDate(dateStr); setPuzzle(p);
    setRevealed(saved.revealed||false);
    setPuzzleState(saved.state||{});
    setShareMsg(null); setView("game");
  };

  const updProgress = (dateStr, newState, newRevealed) => {
    const next = {...progress, [dateStr]:{state:newState, revealed:newRevealed}};
    setProgress(next); save(next);
  };

  const handlePuzzleState = (newState) => {
    setPuzzleState(newState);
    updProgress(selDate, newState, revealed);
  };

  const handleWordFound = (word, isRequired) => {
    const newFound = [...(puzzleState.found||[]), word];
    const ns = {...puzzleState, found:newFound};
    setPuzzleState(ns); updProgress(selDate, ns, revealed);
  };

  const handleReveal = () => { setRevealed(true); updProgress(selDate, puzzleState, true); };

  const isComplete = () => {
    if(!puzzle) return false;
    if(puzzle.type==="ROOT") return puzzle.required.every(w=>(puzzleState.found||[]).includes(w));
    if(puzzle.type==="GRIMM") return puzzle.pairs.every((_,i)=>puzzleState.answers?.[i]);
    if(puzzle.type==="SEMANTIC") {
      const blanks = puzzle.timeline.filter(t=>t.blank);
      return blanks.every((_,i)=>puzzleState.answers?.[i]);
    }
    if(["SUPPLETIVE","PIE","COLLISION"].includes(puzzle.type)) {
      const assigned = puzzleState.assigned||{};
      return puzzle.groups.every(g=>g.accepts.every(w=>{
        const gid = assigned[w]; return gid===g.id;
      }));
    }
    return false;
  };

  const buildShare = () => {
    if(!puzzle) return;

    const toRoman = n => {
      const v=[[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
      let r=''; for(const [val,s] of v){while(n>=val){r+=s;n-=val;}} return r;
    };
    const wrap = (text, w) => {
      const words=text.split(' '); let lines=[]; let cur='';
      for(const word of words){ if((cur+' '+word).trim().length>w){if(cur)lines.push(cur);cur=word;}else{cur=(cur+' '+word).trim();} }
      if(cur)lines.push(cur); return lines.join('\n');
    };

    const [year,month,day]=selDate.split('-').map(Number);
    const dateRoman=`${toRoman(day)} · ${toRoman(month)} · ${toRoman(year)}`;
    const sep='────────────────────';
    const complete=isComplete();
    const typeLabel=TYPE_LABELS[puzzle.type]||puzzle.type;

    let chain='';
    let scoreStr='';

    if(puzzle.type==='ROOT') {
      const found=puzzleState.found||[];
      chain=puzzle.required.map(w=>found.includes(w)?'◈':'◇').join('─');
      const n=found.filter(w=>puzzle.required.includes(w)).length;
      scoreStr=`${n} of ${puzzle.required.length} found`;
    } else if(['SUPPLETIVE','PIE','COLLISION'].includes(puzzle.type)) {
      const assigned=puzzleState.assigned||{};
      chain=puzzle.groups.map(g=>{
        const tag=g.label.replace(/[()]/g,'').split(' ')[0].slice(0,8).padEnd(8);
        const nodes=g.accepts.map(w=>assigned[w]===g.id?'◈':'◇').join('');
        return `${tag} ${nodes}`;
      }).join('\n');
      const total=puzzle.groups.flatMap(g=>g.accepts).length;
      const correct=puzzle.groups.flatMap(g=>g.accepts).filter(w=>puzzle.groups.find(gr=>gr.id===assigned[w])?.accepts.includes(w)).length;
      scoreStr=`${correct} of ${total} · ${puzzle.groups.length} branches`;
    } else if(puzzle.type==='GRIMM') {
      const answers=puzzleState.answers||{};
      chain=puzzle.pairs.map((_,i)=>answers[i]?'◈':'◇').join(' ─ ');
      scoreStr=`${Object.keys(answers).length} of ${puzzle.pairs.length} found`;
    } else if(puzzle.type==='SEMANTIC') {
      const answers=puzzleState.answers||{};
      const blanks=puzzle.timeline.filter(t=>t.blank);
      chain=blanks.map((_,i)=>answers[i]?'◈':'◇').join(' ─ ');
      scoreStr=`${blanks.filter((_,i)=>answers[i]).length} of ${blanks.length} filled`;
    }

    const status=complete?'complete':revealed?'revealed':'in progress';
    const headline=wrap(puzzle.reveal.headline.replace(/[""]/g,'"'),42);

    setShareMsg([
      '◈ DERIVATIVE ◈',
      dateRoman,
      sep,
      `${typeLabel} · ${puzzle.root}`,
      `${puzzle.lang}`,
      sep,
      chain,
      `${scoreStr} · ${status}`,
      sep,
      headline,
      sep,
      'derivative.game',
    ].join('\n'));
  };

  const statusFor = (dateStr) => {
    const p = getProgress(dateStr); if(!p||!p.state) return "unplayed";
    const puz = getPuzzleForDate(dateStr); if(!puz) return "unplayed";
    if(p.revealed) return "complete";
    const s = p.state;
    if(puz.type==="ROOT"&&(s.found||[]).length>0) return "partial";
    if(["SUPPLETIVE","PIE","COLLISION"].includes(puz.type)&&Object.keys(s.assigned||{}).length>0) return "partial";
    if(puz.type==="GRIMM"&&Object.keys(s.answers||{}).length>0) return "partial";
    if(puz.type==="SEMANTIC"&&Object.keys(s.answers||{}).length>0) return "partial";
    return "unplayed";
  };

  const bgStyle = {minHeight:"520px",background:"#0d0b08",position:"relative",overflow:"hidden"};

  // ── SPLASH ────────────────────────────────────────────────────────────────
  if(view==="splash") return (
    <div style={{...bgStyle,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"3rem 2rem",textAlign:"center"}}>
      <style>{`
        @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-5px)}40%,80%{transform:translateX(5px)}}
        @keyframes glitch1{0%,100%{clip-path:inset(0 0 98% 0);transform:translate(-3px,0)}25%{clip-path:inset(30% 0 50% 0);transform:translate(3px,0)}50%{clip-path:inset(60% 0 20% 0);transform:translate(-2px,0)}75%{clip-path:inset(10% 0 80% 0);transform:translate(2px,0)}}
        @keyframes glitch2{0%,100%{clip-path:inset(50% 0 30% 0);transform:translate(3px,0)}25%{clip-path:inset(80% 0 5% 0);transform:translate(-3px,0)}50%{clip-path:inset(20% 0 60% 0);transform:translate(2px,0)}75%{clip-path:inset(5% 0 90% 0);transform:translate(-2px,0)}}
        .deriv-title{position:relative;cursor:pointer;display:inline-block;}
        .deriv-title::before,.deriv-title::after{content:attr(data-text);position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;pointer-events:none;}
        .deriv-title::before{color:#f0d070;text-shadow:-2px 0 #c8922a;}
        .deriv-title::after{color:#4ecfcf;text-shadow:2px 0 #e8b84b;}
        .deriv-title:hover::before{opacity:0.8;animation:glitch1 0.35s steps(1) infinite;}
        .deriv-title:hover::after{opacity:0.8;animation:glitch2 0.35s steps(1) infinite;}
        .arch-link{color:#3a2e14;font-family:var(--font-mono,monospace);font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;cursor:pointer;border:none;background:transparent;padding:0;transition:color 0.2s;}
        .arch-link:hover{color:#c8922a;}
      `}</style>
      <div style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",backgroundImage:"url(https://github.com/user-attachments/assets/e6f5403b-5958-4d0e-8be4-439beb2b7a79)",backgroundSize:"cover",backgroundPosition:"center",opacity:0.22,zIndex:0}}/>
      <div style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:"linear-gradient(to bottom, #0d0b08aa 0%, #0d0b08 100%)",zIndex:0}}/>
      <Starfield/>
      <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{maxWidth:"440px",lineHeight:1.9,color:"#8a7868",fontSize:"0.88rem",marginBottom:"2rem"}}>
          <p>I want to play a game.</p>
          <p>The game is called English.</p>
          <p>You have been playing it since before you could walk.<br/>You did not know you were playing.<br/>You did not know there were rules.<br/>You did not know the rules were made of older, broken rules.</p>
          <p>You did not know that <em>went</em> is a corpse wearing the wrong name. That <em>nice</em> meant ignorant. That <em>person</em> is a mask. That <em>be</em> and <em>am</em> and <em>was</em> have never, in any language, belonged together.</p>
          <p>You have been fluent your whole life in a language you have never truly known.</p>
          <p style={{color:"#c8922a",fontSize:"0.8rem",letterSpacing:"0.07em"}}>Do you want to play a game?</p>
        </div>
        <div className="deriv-title" data-text="DERIVATIVE" onClick={()=>openPuzzle(today)}
          style={{...S.mono,fontSize:"2.4rem",fontWeight:400,color:"#e8b84b",letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:"1.5rem",userSelect:"none"}}>
          DERIVATIVE
        </div>
        <button className="arch-link" onClick={()=>setView("archive")}>archive</button>
      </div>
    </div>
  );

  // ── ARCHIVE ───────────────────────────────────────────────────────────────
  if(view==="archive") return (
    <div style={{...bgStyle,padding:"2rem"}}>
      <Starfield/>
      <div style={{position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"1.5rem"}}>
          <button style={S.btnSm} onClick={()=>setView("splash")}>← back</button>
          <span style={{...S.mono,color:"#c8922a",fontSize:"0.75rem",letterSpacing:"0.14em",textTransform:"uppercase"}}>Archive — January 2026</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:"6px",maxWidth:"420px"}}>
          {["S","M","T","W","T","F","S"].map((d,i)=>(
            <div key={i} style={{textAlign:"center",...S.mono,fontSize:"0.6rem",color:"#7a6858",letterSpacing:"0.1em",paddingBottom:"4px"}}>{d}</div>
          ))}
          {[...Array(4)].map((_,i)=><div key={"p"+i}/>)}
          {PUZZLES.map(p=>{
            const day=parseInt(p.date.split("-")[2]);
            const st=statusFor(p.date);
            const isToday=p.date===today;
            return (
              <button key={p.date} onClick={()=>openPuzzle(p.date)} style={{
                background:st==="complete"?"#2a1e08":st==="partial"?"#1e1808":"#141208",
                border:isToday?"1px solid #e8b84b":st==="complete"?"1px solid #c8922a":st==="partial"?"1px solid #3a2e14":"1px solid #282010",
                color:st==="complete"?"#d4c4a0":st==="partial"?"#c8922a":isToday?"#e8b84b":"#6a5a48",
                borderRadius:"3px",padding:"0.45rem 0",...S.mono,fontSize:"0.78rem",cursor:"pointer",textAlign:"center",fontWeight:isToday?500:400
              }}>
                {day}{st==="complete"&&<span style={{display:"block",fontSize:"0.35rem",color:"#e8b84b"}}>●</span>}
              </button>
            );
          })}
        </div>
        <div style={{marginTop:"1.25rem",display:"flex",gap:"1.25rem"}}>
          {[["unplayed","#6a5a48"],["partial","#c8922a"],["complete","#d4c4a0"]].map(([l,c])=>(
            <span key={l} style={{...S.mono,fontSize:"0.6rem",color:c,letterSpacing:"0.08em"}}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  );

  // ── GAME ──────────────────────────────────────────────────────────────────
  if(view==="game"&&puzzle) {
    const complete = isComplete();
    const dateLabel = new Date(selDate+"T12:00:00").toLocaleDateString("en-US",{month:"long",day:"numeric"});
    const isSortType = ["SUPPLETIVE","PIE","COLLISION"].includes(puzzle.type);

    return (
      <div style={{...bgStyle,padding:"1.5rem 1.5rem 2.5rem",maxWidth:"640px",margin:"0 auto"}}>
        <style>{`@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-5px)}40%,80%{transform:translateX(5px)}}`}</style>
        <Starfield/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.25rem"}}>
            <button style={S.btnSm} onClick={()=>setView("splash")}>← back</button>
            <span style={{...S.mono,fontSize:"0.6rem",color:"#4a3a28",letterSpacing:"0.12em",textTransform:"uppercase"}}>{dateLabel}</span>
            <button style={S.btnSm} onClick={()=>setView("archive")}>archive</button>
          </div>

          <PuzzleHeader puzzle={puzzle} selDate={selDate}/>

          {puzzle.type==="ROOT" && (
            <RootPuzzle puzzle={puzzle} found={puzzleState.found||[]} onWord={handleWordFound} revealed={revealed}/>
          )}
          {isSortType && (
            <SortPuzzle puzzle={puzzle} state={puzzleState} onState={handlePuzzleState} revealed={revealed}/>
          )}
          {puzzle.type==="GRIMM" && (
            <GrimmPuzzle puzzle={puzzle} state={puzzleState} onState={handlePuzzleState} revealed={revealed}/>
          )}
          {puzzle.type==="SEMANTIC" && (
            <SemanticPuzzle puzzle={puzzle} state={puzzleState} onState={handlePuzzleState} revealed={revealed}/>
          )}

          {!revealed && (
            <button style={{...S.btnSm,marginTop:"1rem"}} onClick={handleReveal}>reveal machinery →</button>
          )}

          {(revealed||complete) && <RevealCard puzzle={puzzle} onShare={buildShare}/>}
          {shareMsg && <ShareCard msg={shareMsg}/>}
        </div>
      </div>
    );
  }

  return null;
}
