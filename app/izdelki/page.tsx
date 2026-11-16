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
      <h1 className="text-5xl sm:text-6xl">{category ? categoryLabel(category) : "Izdelki"}</h1>
      <nav aria-label="Kategorije" className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-y border-olive/15 py-4 text-[0.9375rem]">
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
        <p className="mt-16 text-lg text-olive/80">Tukaj še ni ničesar. Koza še izbira.</p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:gap-x-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
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
          ? "font-medium underline decoration-2 underline-offset-8"
          : "text-olive/75 underline-offset-8 hover:text-olive hover:underline"
      }
    >
      {children}
    </Link>
  );
}
