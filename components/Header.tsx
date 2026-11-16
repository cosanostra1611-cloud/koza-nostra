import Link from "next/link";
import { SITE } from "@/lib/config";
import { CartLink } from "./CartLink";

const LINKS = [
  { href: "/paketi", label: "Paketi" },
  { href: "/izdelki", label: "Izdelki" },
  { href: "/druzina", label: "Družina" },
];

export function Header() {
  return (
    <header className="rule border-t-0 border-b border-olive/15">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-4">
        <Link href="/" className="flex items-center gap-3" aria-label={`${SITE.name}, domov`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/icon.svg" alt="" width={40} height={40} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/wordmark-olive.svg" alt={SITE.name} width={149} height={18} />
        </Link>
        <nav aria-label="Glavna navigacija" className="flex items-center gap-5 text-[0.9375rem] sm:gap-7">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="underline-offset-4 hover:underline">
              {l.label}
            </Link>
          ))}
          <CartLink />
        </nav>
      </div>
    </header>
  );
}
