import Link from "next/link";
import { SHIPPING, SITE } from "@/lib/config";
import { formatEur } from "@/lib/format";
import { CartLink } from "./CartLink";
import { Wordmark } from "./Wordmark";

const LINKS = [
  { href: "/paketi", label: "Paketi" },
  { href: "/izdelki", label: "Izdelki" },
  { href: "/druzina", label: "Družina" },
];

export function Header() {
  return (
    <header>
      <p className="eyebrow bg-olive px-4 py-2.5 text-center text-cream">
        Brezplačna dostava nad {formatEur(SHIPPING.freeOverCents)}
        <span className="hidden sm:inline"> · Dostavljamo po vsej Sloveniji</span>
      </p>
      <div className="border-b border-olive/15">
        <div className="wrap grid grid-cols-2 items-center gap-y-4 py-5 md:grid-cols-[1fr_auto_1fr] md:py-6">
          <nav
            aria-label="Glavna navigacija"
            className="eyebrow order-3 col-span-2 flex gap-7 md:order-1 md:col-span-1"
          >
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="transition-opacity duration-150 hover:opacity-60">
                {l.label}
              </Link>
            ))}
          </nav>
          <Link href="/" aria-label={`${SITE.name}, domov`} className="order-1 md:order-2">
            <Wordmark className="text-[1.7rem] leading-none md:text-[2rem]" />
          </Link>
          <div className="eyebrow order-2 justify-self-end md:order-3">
            <CartLink />
          </div>
        </div>
      </div>
    </header>
  );
}
