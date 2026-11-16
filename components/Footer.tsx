import Link from "next/link";
import { SITE, SHIPPING } from "@/lib/config";
import { formatEur } from "@/lib/format";

const LINKS = [
  { href: "/o-nas", label: "O nas" },
  { href: "/druzina", label: "Družina" },
  { href: "/postani-del-druzine", label: "Postani del družine" },
  { href: "/dostava-in-vracila", label: "Dostava in vračila" },
  { href: "/pogoji", label: "Pogoji" },
  { href: "/zasebnost", label: "Zasebnost" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-olive/15">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-[2fr_1fr]">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/wordmark-olive.svg" alt={SITE.name} width={166} height={20} />
          <p className="mt-4 max-w-sm text-sm text-olive/75">
            Dostava po Sloveniji, {formatEur(SHIPPING.flatCents)}. Nad{" "}
            {formatEur(SHIPPING.freeOverCents)} jo častimo mi.
          </p>
          <p className="mt-2 text-sm text-olive/75">Vprašanja: {SITE.contactEmail}</p>
        </div>
        <nav aria-label="Noga" className="flex flex-col gap-2 text-sm">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="underline-offset-4 hover:underline">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
