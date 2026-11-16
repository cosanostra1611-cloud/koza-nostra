import { SITE } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-olive/15">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-olive/70">
        <p className="font-serif text-base text-olive">{SITE.tagline}</p>
        <p className="mt-2">
          Dostava po Sloveniji. Vprašanja in pomoč: pišite nam na e-naslov, ki ga vnesete tukaj.
        </p>
      </div>
    </footer>
  );
}
