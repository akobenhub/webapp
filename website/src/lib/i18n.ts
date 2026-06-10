// Lightweight multilingual support — no library, low-data friendly.
// Languages: English, Twi, Ga, Ewe.

export type Lang = "en" | "tw" | "ga" | "ee";

export const LANGS: { code: Lang; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "tw", label: "Twi", native: "Twi" },
  { code: "ga", label: "Ga", native: "Gã" },
  { code: "ee", label: "Ewe", native: "Eʋegbe" },
];

type Dict = Record<string, Record<Lang, string>>;

export const t: Dict = {
  "nav.home": { en: "Home", tw: "Fie", ga: "Shia", ee: "Aƒe" },
  "nav.modules": { en: "Learn", tw: "Sua", ga: "Kase", ee: "Srɔ̃" },
  "nav.referral": { en: "Get Help", tw: "Hwehwɛ Mmoa", ga: "Tao Yelikɛbuamɔ", ee: "Di Kpekpeɖeŋu" },
  "nav.facilitator": { en: "Facilitator", tw: "Kyerɛkyerɛni", ga: "Tsɔɔlɔ", ee: "Nufiala" },
  "nav.about": { en: "About", tw: "Fa Ho", ga: "Yɛyɛ", ee: "Tso" },

  "hero.eyebrow": {
    en: "Akoben — the call to vigilance",
    tw: "Akoben — frɛ a wɔde bɔ ahwɛyɛ",
    ga: "Akoben — bɔni kɛ haomɔ",
    ee: "Akoben — sesẽ ƒe yɔyɔ",
  },
  "hero.title": {
    en: "Digital Healing & Advocacy Hub",
    tw: "Ayaresa ne Akyitaafoɔ Adwumayɛbea",
    ga: "Hewalɛ kɛ Kpalamɔ Hu",
    ee: "Dɔyɔyɔ kple Akpedada Ƒe Nɔƒe",
  },
  "hero.sub": {
    en: "A safe, trauma-informed space for survivors, families, and communities — built for low-data, mobile-first use.",
    tw: "Baabi a ɛyɛ dwoodwoo ma nkwagyefoɔ, abusua, ne mpɔtam hɔfoɔ — yɛasiesie ama mfoni ne mfiri nketewa.",
    ga: "Hé ko ní he yɔɔ jɔɔmɔ kɛhaa mɛi ní amɛna amanehulu, weku, kɛ akutso lɛ.",
    ee: "Teƒe dedie aɖe na ame siwo to nuxaxa me, ƒomewo kple nutowo me — wowɔe na mɔ̃ kpui kple kabɛ.",
  },

  "path.parents.title": { en: "Parents & Community", tw: "Awofoɔ ne Mpɔtam", ga: "Fɔlɔi kɛ Akutso", ee: "Dzilawo kple Nuto" },
  "path.parents.sub": {
    en: "Child protection education for parents, teachers, and faith leaders.",
    tw: "Mmɔfra banbɔ adesua ma awofoɔ, akyerɛkyerɛfoɔ ne gyidi mpanin.",
    ga: "Gbekɛbii hewalɛ kasemɔ kɛha fɔlɔi, tsɔɔlɔi kɛ hemɔkɛyeli onukpai.",
    ee: "Ɖevi ŋuti dzɔdzɔ hehe na dzilawo, nufialawo kple xɔse ƒe amegãwo.",
  },
  "path.survivors.title": { en: "Survivors", tw: "Nkwagyefoɔ", ga: "Mɛi ní amɛna amanehulu", ee: "Ame siwo to nuxaxa me" },
  "path.survivors.sub": {
    en: "Confidential, gentle support and psychoeducation at your pace.",
    tw: "Kokoamsɛm mu mmoa ne adwen ho adesua sɛnea ɛfata wo.",
    ga: "Teemɔŋ mli yelikɛbuamɔ kɛ susumaŋ kasemɔ yɛ bo ko he.",
    ee: "Adzame kpekpeɖeŋu kple susu ŋuti hehe le wò ŋutɔ wò ɣeyiɣi nu.",
  },

  "cta.enter": { en: "Enter safely", tw: "Hyɛn mu dwoodwoo", ga: "Bo mli jɔɔmɔ", ee: "Ge ɖe eme dedie" },
  "cta.anonymous": { en: "Continue anonymously", tw: "Toa so a wonkyerɛ wo din", ga: "Yaa nɔ ní akɛɔɔ ogbɛi", ee: "Yi edzi ŋkɔmaŋkɔe" },
};

export function tr(key: string, lang: Lang): string {
  return t[key]?.[lang] ?? t[key]?.en ?? key;
}
