import Link from "next/link";
import { SITE } from "@/lib/config";
import { CartLink } from "./CartLink";

export function Header() {
  return (
    <header className="border-b border-olive/15">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3" aria-label={SITE.name}>
          <img src="/brand/icon.svg" alt="" width={40} height={40} />
          <img src="/brand/wordmark-olive.svg" alt={SITE.name} width={149} height={18} />
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/izdelki" className="hover:text-honey">
            Izdelki
          </Link>
          <Link href="/ponudniki" className="hover:text-honey">
            Ponudniki
          </Link>
          <CartLink />
        </nav>
      </div>
    </header>
  );
}
