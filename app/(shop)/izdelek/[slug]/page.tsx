import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/AddToCart";
import { Photo } from "@/components/Photo";
import { ShippingNote } from "@/components/ShippingNote";
import { Stamp } from "@/components/Stamp";
import { categoryLabel } from "@/lib/config";
import { getProduct } from "@/lib/data";
import { formatEur } from "@/lib/format";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.why_chosen ?? product.description ?? undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <article>
      <nav aria-label="Drobtinice" className="eyebrow text-olive/55">
        <Link href="/izdelki" className="hover:text-olive">
          Izdelki
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/izdelki?kategorija=${product.category}`} className="hover:text-olive">
          {categoryLabel(product.category)}
        </Link>
      </nav>

      <div className="mt-6 grid gap-10 md:grid-cols-[6fr_5fr] md:gap-16">
        <Photo src={product.image_url} alt={product.name} ratio="4:5" priority />

        <div className="md:sticky md:top-10 md:self-start md:pt-4">
          <Link href={`/druzina/${product.producer.slug}`} className="eyebrow link text-olive/70">
            {product.producer.name}
            {product.producer.region && ` · ${product.producer.region}`}
          </Link>
          <h1 className="mt-5 text-4xl leading-[1.08] sm:text-[3.25rem]">{product.name}</h1>
          {product.series_label && (
            <p className="mt-3 font-serif text-lg italic text-olive/65">{product.series_label}</p>
          )}

          <p className="mt-7 text-2xl tabular-nums">
            {formatEur(product.price_cents)}
            {product.unit_label && <span className="text-base text-olive/55"> / {product.unit_label}</span>}
          </p>
          <p className="mt-1 text-xs text-olive/55">Cena vključuje DDV.</p>

          <div className="mt-7">
            <AddToCart
              id={product.id}
              slug={product.slug}
              name={product.name}
              priceCents={product.price_cents}
              imageUrl={product.image_url}
              soldOut={product.stock === 0}
              variant="primary"
            />
          </div>

          <ShippingNote className="mt-7 border-t border-olive/15 pt-6" />

          {product.why_chosen && (
            <section className="mt-8 border-t border-olive/15 pt-8">
              <div className="flex items-start gap-6">
                <div>
                  <h2 className="eyebrow font-sans text-olive/60">Zakaj smo ga izbrali</h2>
                  <p className="mt-4 font-serif text-xl leading-relaxed">{product.why_chosen}</p>
                </div>
                {product.koza_approved && <Stamp size={84} className="hidden text-olive sm:block" />}
              </div>
            </section>
          )}

          {product.description && (
            <section className="mt-8 border-t border-olive/15 pt-8">
              <h2 className="eyebrow font-sans text-olive/60">O izdelku</h2>
              <p className="mt-4 whitespace-pre-line leading-relaxed text-olive/85">{product.description}</p>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
