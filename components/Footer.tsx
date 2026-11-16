import Link from "next/link";
import { SHIPPING, SITE } from "@/lib/config";
import { formatEur } from "@/lib/format";
import { Wordmark } from "./Wordmark";

const SHOP = [
  { href: "/paketi", label: "Paketi" },
  { href: "/izdelki", label: "Izdelki" },
  { href: "/druzina", label: "Družina" },
  { href: "/kosarica", label: "Košarica" },
];

const INFO = [
  { href: "/o-nas", label: "O nas" },
  { href: "/postani-del-druzine", label: "Postani del družine" },
  { href: "/dostava-in-vracila", label: "Dostava in vračila" },
  { href: "/pogoji", label: "Pogoji poslovanja" },
  { href: "/zasebnost", label: "Zasebnost" },
];

export function Footer() {
  return (
    <footer className="mt-28 bg-olive text-cream">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[2fr_1fr_1fr_1.4fr]">
        <div>
          <Wordmark className="text-3xl" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">{SITE.description}</p>
        </div>
        <FooterNav title="Trgovina" links={SHOP} />
        <FooterNav title="Informacije" links={INFO} />
        <div>
          <h2 className="eyebrow font-sans text-cream/60">Dostava</h2>
          <p className="mt-5 text-sm leading-relaxed text-cream/85">
            Po Sloveniji {formatEur(SHIPPING.flatCents)}.
            <br />
            Nad {formatEur(SHIPPING.freeOverCents)} brezplačno.
          </p>
          <h2 className="eyebrow mt-8 font-sans text-cream/60">Vprašanja</h2>
          <p className="mt-5 text-sm text-cream/85">{SITE.contactEmail}</p>
        </div>
      </div>
      <div className="border-t border-cream/15">
        <p className="wrap py-6 text-xs text-cream/55">
          © {new Date().getFullYear()} {SITE.name}. Cene vključujejo DDV.
        </p>
      </div>
    </footer>
  );
}

function FooterNav({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="eyebrow font-sans text-cream/60">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-cream/85 transition-colors duration-150 hover:text-cream">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
