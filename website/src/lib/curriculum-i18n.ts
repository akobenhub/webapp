// Multilingual content for the Parent & Community curriculum.
// Languages supported for course content: English (en), Twi (tw), Ga (ga).
// If a translation is missing, the English value is used as a safe fallback.

import { LEVELS, type CurriculumModule, type Level } from "./curriculum";

export type CourseLang = "en" | "tw" | "ga";

export const COURSE_LANGS: { code: CourseLang; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "tw", label: "Twi", native: "Twi" },
  { code: "ga", label: "Ga", native: "Gã" },
];

type Translatable = { title: string; description: string };

type LevelI18n = {
  name: string;
  audience: string;
  audienceDetail: string;
  summary: string;
};

// Level translations
const LEVEL_TR: Record<Level["key"], Partial<Record<CourseLang, LevelI18n>>> = {
  basic: {
    tw: {
      name: "Sɔhwɛ 1 — Mfitiaseɛ",
      audience: "Awofoɔ, ahwɛfoɔ, ne mpɔtam mufoɔ",
      audienceDetail: "Ma mmusua ne mpɔtamhɔfoɔ a wɔrehyɛ aseɛ asua mmɔfra banbɔ wɔ fie.",
      summary: "Sua mmɔfra ho ɔbra bɔne, ɔhaw a ɛfiri mu, ne ɔkwan a wɔde sie mu wɔ fie.",
    },
    ga: {
      name: "Kasemɔ Klɛŋklɛŋ 1 — Shishijee",
      audience: "Fɔlɔi, hɛlɛlɔi, kɛ akutso mli mɛi",
      audienceDetail: "Kɛha wekui kɛ akutso mli mɛi ní amɛkaseɔ gbekɛbii hewalɛ shishijee yɛ shia.",
      summary: "Nɔɔ̃ŋ gbekɛbii he efɔŋ feemɔ, amanehulu, kɛ bɔni akɛbaa bo lɛ yɛ shia mli.",
    },
  },
  intermediate: {
    tw: {
      name: "Sɔhwɛ 2 — Mfimfini",
      audience: "Akyerɛkyerɛfoɔ, asɔre mpanin, mmabunu kannifoɔ, PTA mufoɔ, akansifoɔ, mpɔtam adwumayɛfoɔ",
      audienceDetail: "Ma nnipa a wɔkura adwuma wɔ sukuu, asɔre, mmabunu nkabom ne agorɔ adwumakuo mu.",
      summary: "Fa banbɔ nyansa no di dwuma wɔ sukuu, asɔre, ne mmabunu nkabom mu.",
    },
    ga: {
      name: "Kasemɔ Klɛŋklɛŋ 2 — Teŋgbɛ",
      audience: "Tsɔɔlɔi, sɔlemɔhei onukpai, oblahii kuu hiɛnyiɛlɔi, PTA mli mɛi, akansiilɔi, akutso mli ní amɛyeɔ amɛhe yiŋ",
      audienceDetail: "Kɛha mɛi ní amɛhiɛɛ nitsumɔ yɛ skulhei, sɔlemɔhei, oblahii kuui, kɛ PTA mli.",
      summary: "Kɛ hewalɛ kasemɔ ní atsuɔ enii yɛ skul, sɔlemɔ, kɛ oblahii kuui amli.",
    },
  },
  advanced: {
    tw: {
      name: "Sɔhwɛ 3 — Soronko",
      audience: "Mmɔfra banbɔ adwumayɛfoɔ, sɛsɛeɛ adwumayɛfoɔ, NGO adwumayɛfoɔ, sukuu mpanin, mmara so dwumadifoɔ",
      audienceDetail: "Ma adwumayɛfoɔ a wɔdi banbɔ nhyehyɛeɛ, asɛm ahwehwɛeɛ, ne nnipakuo nkitahodi anim.",
      summary: "Di banbɔ nhyehyɛeɛ anim, dwumadi asɛm na hwɛ nnipakuo a wɔboaa wɔn so.",
    },
    ga: {
      name: "Kasemɔ Klɛŋklɛŋ 3 — Henɔŋŋ",
      audience: "Gbekɛbii hewalɛ nitsulɔi, weku ŋmɛlɛi, NGO nitsulɔi, skul yiŋtsɛmɛi, mla nitsulɔi",
      audienceDetail: "Kɛha nitsulɔi ní amɛhiɛɛ hewalɛ nikasemɔi, sane nitsumɔ, kɛ kuui ateŋ nitsumɔ.",
      summary: "Hiɛnyiɛ hewalɛ nikasemɔi, ye sane nitsumɔ, kɛ tsuɔ kuui pii akɛ̃ɛ.",
    },
  },
};

// Module translations — keyed by module slug
const MODULE_TR: Record<string, Partial<Record<CourseLang, Translatable>>> = {
  // ---------- Level 1 ----------
  "basic-csa": {
    tw: { title: "Mmɔfra Ɔbra Bɔne Ho Adesua", description: "Deɛ ɛyɛ, sɛdeɛ ɛda adi wɔ afie mu, ne adeɛ a enti adwene ho hia." },
    ga: { title: "Gbekɛbii He Efɔŋ Feemɔ He Nɔɔ̃ŋ", description: "Bɔni efeeɔ, bɔni ehiɛɔ yɛ shiai amli, kɛ mɛni hewɔ shishijee yiŋmɔ he hiaa." },
  },
  "basic-trauma-brain": {
    tw: { title: "Ɔhaw ne Abɔfra Adwene", description: "Sɛdeɛ ɔhaw kɛkɛre abɔfra adwene ne ne suban." },
    ga: { title: "Amanehulu kɛ Gbekɛ Yiŋ", description: "Bɔni amanehulu tsɔɔ̃ɔ gbekɛ yiŋtoo kɛ ehe nifeemɔ." },
  },
  "basic-retrauma": {
    tw: { title: "Sɛdeɛ Awofoɔ Pira Mmɔfra Bio", description: "Nneyɛeɛ a awofoɔ yɛ a ɛpira mmɔfra bio — ne ɔkwan pa." },
    ga: { title: "Bɔni Fɔlɔi Pirãa Gbekɛbii Ekoŋŋ", description: "Nifeemɔi ní pirãa gbekɛbii ekoŋŋ — kɛ gbɛjianɔ ni hi." },
  },
  "basic-disclosure": {
    tw: { title: "Akwan Pa a Wɔfa So Tie", description: "Sɛdeɛ wobɛtie, agye adi, na woagye abɔfra so bere a waka asɛm akyerɛ wo." },
    ga: { title: "Gbɛjianɔ ni Hi yɛ Bo Boomɔ He", description: "Bɔni okɛɔɔ ohe haa, oheɔɔ noyeli, kɛ obuaa gbekɛ kɛji egba sane lɛ." },
  },
  "basic-reporting": {
    tw: { title: "Amane bɔ ne Banbɔ Nhyehyɛeɛ wɔ Ghana", description: "DOVVSU, Asetena Ho Nsɛm Adwumayɛfoɔ, sukuu, ne gyidi mpanin — hwan na frɛ no." },
    ga: { title: "Sanetsumɔ kɛ Hewalɛ Nhyehyɛmɔ yɛ Ghana", description: "DOVVSU, Shihilɛ Nitsumɔ, skulhei, kɛ hemɔkɛyeli onukpai — namɔ otsɛɔ." },
  },
  "basic-prevention": {
    tw: { title: "Banbɔ Wɔ Fie", description: "Daa nneyɛeɛ, nkɔmmɔbɔ, ne ahoɔden a ɛbɔ mmɔfra ho ban wɔ fie." },
    ga: { title: "Hewalɛ yɛ Shia", description: "Daa nifeemɔi, sane gbamɔi, kɛ baa ni buaa gbekɛbii yɛ shia." },
  },
  "basic-healing": {
    tw: { title: "Ayaresa ne Daa Mmoa", description: "Boa abɔfra n'ayaresa kwan so wɔ bosome ne mfeɛ pii mu." },
    ga: { title: "Hewalɛjɔɔmɔ kɛ Be Kɛ̃ɛ Yelikɛbuamɔ", description: "Bua gbekɛ ehewalɛjɔɔmɔ gbɛ̃ nɔ yɛ nyɔŋmɔi kɛ afii pii mli." },
  },
  "basic-ethics": {
    tw: { title: "Suban Pa ne Banbɔ", description: "Kokoamsɛm, akwankyerɛ pɛ, ne suban pa a wɔde boa abɔfra." },
    ga: { title: "Suban Kpakpa kɛ Hewalɛ", description: "Teemɔŋ sane, pɛ ní akɛheɔ noyeli, kɛ suban kpakpa yɛ gbekɛ yelikɛbuamɔ mli." },
  },
  // ---------- Level 2 ----------
  "inter-csa-institutions": {
    tw: { title: "CSA wɔ Adwumakuo ne Asɔre Mu", description: "Sɛdeɛ adwumakuo bɛtumi abɔ mmɔfra ho ban — anaa wɔ basabasa kwan." },
    ga: { title: "CSA yɛ Skulhei kɛ Sɔlemɔhei Mli", description: "Bɔni nitsumɔ hei nyɛɔ amɛbuaa gbekɛbii — loo amɛkɛɔɔ amɛ gbɛ basabasa." },
  },
  "inter-trauma-brain": {
    tw: { title: "Ɔhaw wɔ Sukuu ne Nkitahodi Mu", description: "Sɛdeɛ ɔhaw da adi wɔ sukuu adesua dan ne mmabunu nhyiamu mu." },
    ga: { title: "Amanehulu yɛ Skul kɛ Oblahii Kuui Amli", description: "Bɔni amanehulu hiɛɔ yɛ skulhei kɛ oblahii kuui amli." },
  },
  "inter-retrauma": {
    tw: { title: "Sɛdeɛ Adwumakuo Pira Mmɔfra Bio", description: "Mmara, kasa, ne nneyɛeɛ a ɛpira — ne sɛnea wobɛsesa." },
    ga: { title: "Bɔni Nitsumɔ Hei Pirãa Gbekɛbii Ekoŋŋ", description: "Mlai, wiemɔi, kɛ nifeemɔi ní pirãa — kɛ bɔni akɛɔ atsakeɔ." },
  },
  "inter-disclosure": {
    tw: { title: "Banbɔ Asɛm Tie wɔ Adwumakuo Mu", description: "Deɛ ɛsɛ sɛ woyɛ bere a sukuuni anaa asɔrefoɔ ka asɛm akyerɛ wo." },
    ga: { title: "Sane Boomɔ Yelikɛbuamɔ yɛ Nitsumɔ Hei Amli", description: "Nɔ ní esa akɛ ofee kɛji skulnyo loo sɔlemɔ mlinyo egba sane lɛ." },
  },
  "inter-reporting": {
    tw: { title: "Amane bɔ ne Banbɔ Nhyehyɛeɛ", description: "Mmara so banbɔ nkwantanan ne sɛdeɛ wo ne DOVVSU di dwuma." },
    ga: { title: "Sanetsumɔ kɛ Hewalɛ Nhyehyɛmɔi", description: "Mlanɔ banbɔ gbɛi kɛ bɔni okɛ DOVVSU tsuɔ nii." },
  },
  "inter-prevention": {
    tw: { title: "Banbɔ Adwumakuo Mu", description: "Adwumayɛfoɔ a wɔafa wɔn dwumadie pa, ahwɛyɛ, ne baabi a wɔwɔ." },
    ga: { title: "Hewalɛ yɛ Nitsumɔ Hei", description: "Nitsulɔi heremɔ ni hi, hiɛnyiɛlɛ, kɛ hé ní amɛyɔɔ lɛ." },
  },
  "inter-healing": {
    tw: { title: "Ayaresa ne Daa Mmoa", description: "Kura ɔhwɛ mu wɔ mmerɛ tenten mu a worenpira bio." },
    ga: { title: "Hewalɛjɔɔmɔ kɛ Be Kɛ̃ɛ Yelikɛbuamɔ", description: "Mɔ ehiɛnyiɛlɛ mli yɛ be kɛ̃ɛ mli ní opirãa nyo ekoŋŋ." },
  },
  "inter-ethics": {
    tw: { title: "Suban Pa wɔ Adwumakuo Mu", description: "Kokoamsɛm, dwumadi ahye, ne suban pa adwumayɛ mu." },
    ga: { title: "Suban Kpakpa yɛ Nitsumɔ Mli", description: "Teemɔŋ sane, nitsumɔ naagbamɔi, kɛ suban kpakpa nitsumɔ mli." },
  },
  // ---------- Level 3 ----------
  "adv-law": {
    tw: { title: "Mmɔfra Banbɔ Mmara wɔ Ghana", description: "Mmɔfra Mmara, Fie mu Basabasayɛ Mmara, ne banbɔ mmara ahoɔden." },
    ga: { title: "Gbekɛbii Hewalɛ Mlai yɛ Ghana", description: "Gbekɛbii Mla, Shia Mli Basabasayeli Mla, kɛ hewalɛ mlai amli toomɔ." },
  },
  "adv-case-mgmt": {
    tw: { title: "Asɛm Hwɛ ne Nkrataa Nhyehyɛeɛ", description: "Asɛmgye, nhwehwɛmu, nhyehyɛeɛ, nsɔhwɛ, ne kokoamsɛm kratasi." },
    ga: { title: "Sane Hiɛnyiɛlɛ kɛ Wolo Nhyehyɛmɔ", description: "Sanepuamɔ, sanekamɔ, nhyehyɛmɔ, nsɔɔmɔ, kɛ teemɔŋ woloi." },
  },
  "adv-mandatory-reporting": {
    tw: { title: "Mmara so Amane bɔ ne Kwankyerɛ", description: "Mmara mu adwuma, anohyeto, ne nkurokuro ntam nkitahodi." },
    ga: { title: "Mlanɔ Sanetsumɔ kɛ Tsoomɔ", description: "Mla mli nitsumɔ, naagbamɔi, kɛ kuui ateŋ tsoomɔ." },
  },
  "adv-evidence": {
    tw: { title: "Adansedeɛ Hwɛ ne Banbɔ Akwan", description: "Sɛdeɛ wobɛkora adansedeɛ na woahwɛ abɔfra ho ban." },
    ga: { title: "Odaseyeli Hiɛnyiɛlɛ kɛ Hewalɛ Gbɛi", description: "Bɔni okɛɔɔ odaseyeli ahi shi ní obuaa gbekɛ lɛ." },
  },
  "adv-institutional": {
    tw: { title: "Adwumakuo Banbɔ Nhyehyɛeɛ", description: "Banbɔ nhyehyɛeɛ a wɔayɛ, wɔhwɛ so, na wɔma ɛkɔ so yɛ pa." },
    ga: { title: "Nitsumɔ Hei Hewalɛ Nhyehyɛmɔi", description: "Hewalɛ nhyehyɛmɔi nɔ amɛfee, amɛkwɛɔ, kɛ amɛhaa ehiɛɔ ekoŋŋ." },
  },
  "adv-ethics": {
    tw: { title: "Mmara Mu Suban Pa ne Dwumadi", description: "Ahyeɛ, akyinnyeɛ, ne suban pa nyansapɛ adwuma mu." },
    ga: { title: "Mla Mli Suban Kpakpa kɛ Nitsumɔ", description: "Naagbamɔi, ŋwanejee, kɛ suban kpakpa yiŋkpɛɛ yɛ nitsumɔ mli." },
  },
  "adv-multi-agency": {
    tw: { title: "Nkurokuro Pii Nkitahodi", description: "Apolisifoɔ, asetena adwumayɛfoɔ, ayaresabea, sukuu — nkitahodi a ɛhwɛ abɔfra so." },
    ga: { title: "Kuui Pii Ateŋ Tsuumɔ", description: "Polisi, shihilɛ nitsumɔ, hewalɛhei, skulhei — tsuumɔ ní ehiɛ gbekɛ." },
  },
  "adv-governance": {
    tw: { title: "Hwɛ So, Akontabuo, ne Banbɔ Akwankyerɛ", description: "Mpanin hwɛsoɔ, data, nsuasua, ne nkwagyefoɔ adwene adwuma." },
    ga: { title: "Hiɛnyiɛlɛ, Sanekamɔ, kɛ Hewalɛ Yiŋtoo", description: "Onukpai hiɛnyiɛlɛ, data, kasemɔi, kɛ amanehulushilɔi susumaŋ nitsumɔ." },
  },
};

export function localizeLevel(lv: Level, lang: CourseLang) {
  const tr = LEVEL_TR[lv.key]?.[lang];
  return {
    ...lv,
    name: tr?.name ?? lv.name,
    audience: tr?.audience ?? lv.audience,
    audienceDetail: tr?.audienceDetail ?? lv.audienceDetail,
    summary: tr?.summary ?? lv.summary,
  };
}

export function localizeModule(mod: CurriculumModule, lang: CourseLang): CurriculumModule {
  const tr = MODULE_TR[mod.slug]?.[lang];
  if (!tr) return mod;
  return { ...mod, title: tr.title, description: tr.description };
}

// Short helper for static UI strings on course pages
export const COURSE_UI: Record<string, Record<CourseLang, string>> = {
  chooseLanguage: { en: "Choose your language", tw: "Yi wo kasa", ga: "Halã wo wiemɔ" },
  contentLanguage: { en: "Content language", tw: "Adesua kasa", ga: "Nikasemɔ wiemɔ" },
  module: { en: "Module", tw: "Adesua", ga: "Nikasemɔ" },
  complete: { en: "Complete", tw: "Awie", ga: "Egbe naa" },
  locked: { en: "Locked", tw: "Ato mu", ga: "Eto naa" },
  inProgress: { en: "In progress", tw: "Ɛrekɔ so", ga: "Eyaa nɔ" },
  continueBtn: { en: "Continue", tw: "Toa so", ga: "Yaa nɔ" },
  review: { en: "Review module", tw: "San hwɛ adesua", ga: "Kwɛ nikasemɔ" },
  levelProgress: { en: "Level progress", tw: "Sɔhwɛ anim kɔ", ga: "Klɛŋklɛŋ hiɛnyiɛlɛ" },
  completePrev: { en: "Complete previous level to unlock", tw: "Wie sɔhwɛ a ɛdi kan na ɛbɛbue", ga: "Gbe klɛŋklɛŋ ní hi hiɛ lɛ naa koni egbele" },
  text: { en: "Text", tw: "Atwerɛ", ga: "Ŋmaa" },
  audio: { en: "Audio", tw: "Nnyegyeɛ", ga: "Gbɛɛmɔ" },
  video: { en: "Video", tw: "Mfoni a ɛkeka", ga: "Mfoni ní tsɔɔ̃ɔ" },
};

export function uiTr(key: keyof typeof COURSE_UI, lang: CourseLang): string {
  return COURSE_UI[key]?.[lang] ?? COURSE_UI[key]?.en ?? String(key);
}

export function getLocalizedLevels(lang: CourseLang) {
  return LEVELS.map((lv) => ({
    ...localizeLevel(lv, lang),
    modules: lv.modules.map((m) => localizeModule(m, lang)),
  }));
}
