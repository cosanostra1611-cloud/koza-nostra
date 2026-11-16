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
    <article className="grid gap-8 md:grid-cols-[5fr_4fr] md:gap-14">
      <Photo src={product.image_url} alt={product.name} ratio="4:5" />

      <div className="md:pt-6">
        <p className="text-xs uppercase tracking-widest text-olive/65">
          <Link href={`/izdelki?kategorija=${product.category}`} className="underline-offset-4 hover:underline">
            {categoryLabel(product.category)}
          </Link>
          {product.series_label && <span> · {product.series_label}</span>}
        </p>
        <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">{product.name}</h1>
        <p className="mt-3">
          Dela ga{" "}
          <Link href={`/druzina/${product.producer.slug}`} className="underline underline-offset-4">
            {product.producer.name}
          </Link>
          {product.producer.region && <span className="text-olive/75">, {product.producer.region}</span>}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-y border-olive/15 py-5">
          <p>
            <span className="font-serif text-3xl font-semibold">{formatEur(product.price_cents)}</span>
            {product.unit_label && <span className="ml-2 text-olive/75">{product.unit_label}</span>}
          </p>
          <AddToCart
            id={product.id}
            slug={product.slug}
            name={product.name}
            priceCents={product.price_cents}
            imageUrl={product.image_url}
            soldOut={product.stock === 0}
            primary
          />
        </div>
        <ShippingNote className="mt-4" />

        {(product.why_chosen || product.koza_approved) && (
          <section className="mt-10 flex items-start gap-5">
            {product.koza_approved && <Stamp size={84} />}
            {product.why_chosen && (
              <div>
                <h2 className="text-xl">Zakaj smo ga izbrali</h2>
                <p className="mt-2 text-olive/85">{product.why_chosen}</p>
              </div>
            )}
          </section>
        )}

        {product.description && (
          <p className="mt-8 whitespace-pre-line text-olive/85">{product.description}</p>
        )}
      </div>
    </article>
  );
}
