import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/AddToCart";
import { Photo } from "@/components/Photo";
import { ShippingNote } from "@/components/ShippingNote";
import { occasionLabel } from "@/lib/config";
import { bundleSoldOut, getBundle } from "@/lib/data";
import { formatEur } from "@/lib/format";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const bundle = await getBundle(slug);
  if (!bundle) return {};
  return { title: bundle.name, description: bundle.description ?? undefined };
}

export default async function BundlePage({ params }: Props) {
  const { slug } = await params;
  const bundle = await getBundle(slug);
  if (!bundle) notFound();
  const items = bundle.items.filter((i) => i.product);

  return (
    <article>
      <nav aria-label="Drobtinice" className="eyebrow text-olive/55">
        <Link href="/paketi" className="hover:text-olive">
          Paketi
        </Link>
        <span className="mx-2">/</span>
        <span>{occasionLabel(bundle.occasion)}</span>
      </nav>

      <div className="mt-6 grid gap-10 md:grid-cols-[6fr_5fr] md:gap-16">
        <Photo src={bundle.image_url} alt={bundle.name} ratio="4:5" priority />

        <div className="md:sticky md:top-10 md:self-start md:pt-4">
          <p className="eyebrow text-olive/60">Paket · {occasionLabel(bundle.occasion)}</p>
          <h1 className="mt-5 text-4xl leading-[1.08] sm:text-[3.25rem]">{bundle.name}</h1>
          {bundle.description && (
            <p className="mt-5 whitespace-pre-line leading-relaxed text-olive/80">{bundle.description}</p>
          )}

          <p className="mt-7 text-2xl tabular-nums">{formatEur(bundle.price_cents)}</p>
          <p className="mt-1 text-xs text-olive/55">Cena vključuje DDV.</p>

          <div className="mt-7">
            <AddToCart
              kind="bundle"
              id={bundle.id}
              slug={bundle.slug}
              name={bundle.name}
              priceCents={bundle.price_cents}
              imageUrl={bundle.image_url}
              soldOut={bundleSoldOut(bundle)}
              variant="primary"
            />
          </div>

          <ShippingNote className="mt-7 border-t border-olive/15 pt-6" />

          <section className="mt-8 border-t border-olive/15 pt-8" aria-labelledby="v-paketu">
            <h2 id="v-paketu" className="eyebrow font-sans text-olive/60">
              V paketu
            </h2>
            <ul className="mt-3">
              {items.map((i) => (
                <li key={i.product.id} className="border-b border-olive/15 py-4 last:border-b-0">
                  <Link href={`/izdelek/${i.product.slug}`} className="font-serif text-xl hover:opacity-60">
                    {i.quantity > 1 && <span>{i.quantity}× </span>}
                    {i.product.name}
                  </Link>
                  <p className="mt-1 text-sm text-olive/65">
                    {i.product.unit_label && <span>{i.product.unit_label} · </span>}
                    <Link href={`/druzina/${i.product.producer.slug}`} className="hover:text-olive">
                      {i.product.producer.name}
                      {i.product.producer.region && `, ${i.product.producer.region}`}
                    </Link>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
}
