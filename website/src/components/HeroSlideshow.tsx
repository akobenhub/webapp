import { useEffect, useState } from "react";
import slide1 from "@/assets/hero-survivor-support.jpg";
import slide2 from "@/assets/hero-community-education.png";

type Slide = { image: string; heading: string; eyebrow: string };

const SLIDES: Slide[] = [
  {
    image: slide1,
    eyebrow: "Akoben Digital Healing & Advocacy Hub",
    heading: "Safe Trauma-Informed Education and Support Pathways for Survivors",
  },
  {
    image: slide2,
    eyebrow: "Building Safer Communities Together",
    heading:
      "Helping communities protect children and build informed responses to trauma and safeguarding concerns.",
  },
];

export function HeroSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), 6500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative isolate overflow-hidden">
      <div className="relative h-[clamp(28rem,75vh,40rem)] w-full">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            aria-hidden={active !== i}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
              active === i ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={s.image}
              alt=""
              className="h-full w-full object-cover scale-105"
              style={{ filter: "blur(2px)" }}
              loading={i === 0 ? "eager" : "lazy"}
            />
            {/* Soft Akoben-blue overlay + white veil for readability */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in oklab, var(--primary) 78%, transparent) 0%, color-mix(in oklab, var(--primary) 55%, transparent) 55%, color-mix(in oklab, var(--primary) 35%, transparent) 100%)",
              }}
            />
            <div className="absolute inset-0 bg-white/10" />
          </div>
        ))}

        {/* Centered text */}
        <div className="relative mx-auto flex h-full max-w-5xl items-center justify-center px-5 text-center">
          {SLIDES.map((s, i) => (
            <div
              key={i}
              className={`absolute inset-x-4 transition-opacity duration-[1400ms] ease-in-out ${
                active === i ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-widest text-primary backdrop-blur-sm sm:text-xs">
                {s.eyebrow}
              </p>
              <h1 className="mx-auto mt-5 max-w-3xl font-serif text-3xl leading-[1.12] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] sm:text-4xl md:text-5xl">
                {s.heading}
              </h1>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                active === i ? "w-8 bg-white" : "w-2.5 bg-white/55 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
