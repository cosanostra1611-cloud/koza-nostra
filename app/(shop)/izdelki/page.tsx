import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, categoryLabel } from "@/lib/config";
import { getProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Izdelki",
  description: "Posamezni izdelki naše družine: olje, vino, mesnine, med, sir, sol, kozmetika in obrt.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ kategorija?: string }>;
}) {
  const { kategorija } = await searchParams;
  const category = CATEGORIES.some((c) => c.id === kategorija) ? kategorija : undefined;
  const products = await getProducts({ category });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-5xl leading-none sm:text-7xl">
          {category ? categoryLabel(category) : "Izdelki"}
        </h1>
        <p className="eyebrow text-olive/60 tabular-nums">
          {products.length} {plural(products.length)}
        </p>
      </div>
      <nav
        aria-label="Kategorije"
        className="eyebrow mt-8 flex flex-wrap gap-x-7 gap-y-3 border-y border-olive/15 py-5"
      >
        <FilterLink href="/izdelki" active={!category}>
          Vse
        </FilterLink>
        {CATEGORIES.map((c) => (
          <FilterLink key={c.id} href={`/izdelki?kategorija=${c.id}`} active={category === c.id}>
            {c.label}
          </FilterLink>
        ))}
      </nav>

      {products.length === 0 ? (
        <p className="py-24 text-center font-serif text-2xl text-olive/70">
          Tukaj še ni ničesar. Koza še izbira.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function plural(n: number): string {
  const m = n % 100;
  if (m === 1) return "izdelek";
  if (m === 2) return "izdelka";
  if (m === 3 || m === 4) return "izdelki";
  return "izdelkov";
}

function FilterLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={
        active
          ? "border-b border-olive pb-1"
          : "border-b border-transparent pb-1 text-olive/55 transition-colors duration-150 hover:text-olive"
      }
    >
      {children}
    </Link>
  );
}
