import { createContext, useContext, useState, type ReactNode } from "react";

// Country scaffolding — Ghana only for now, future-ready for Liberia, Nigeria, etc.
export type CountryCode = "GH" | "NG" | "LR";

export type Country = {
  code: CountryCode;
  name: string;
  flag: string; // emoji for low-data friendly rendering
  available: boolean;
};

export const COUNTRIES: Country[] = [
  { code: "GH", name: "Ghana", flag: "🇬🇭", available: true },
  { code: "NG", name: "Nigeria", flag: "🇳🇬", available: false },
  { code: "LR", name: "Liberia", flag: "🇱🇷", available: false },
];

type Ctx = { country: Country; setCountry: (c: CountryCode) => void; countries: Country[] };
const CountryContext = createContext<Ctx | null>(null);

export function CountryProvider({ children }: { children: ReactNode }) {
  const [code, setCode] = useState<CountryCode>("GH");
  const country = COUNTRIES.find((c) => c.code === code) ?? COUNTRIES[0];
  return (
    <CountryContext.Provider value={{ country, setCountry: setCode, countries: COUNTRIES }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const ctx = useContext(CountryContext);
  if (!ctx) throw new Error("useCountry must be used within CountryProvider");
  return ctx;
}
