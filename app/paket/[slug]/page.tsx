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
      <div className="grid gap-8 md:grid-cols-[3fr_2fr] md:gap-14">
        <Photo src={bundle.image_url} alt={bundle.name} ratio="3:2" />
        <div className="md:pt-4">
          <p className="text-xs uppercase tracking-widest text-olive/65">
            Paket · {occasionLabel(bundle.occasion)}
          </p>
          <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">{bundle.name}</h1>
          {bundle.description && (
            <p className="mt-4 whitespace-pre-line text-olive/85">{bundle.description}</p>
          )}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-y border-olive/15 py-5">
            <span className="font-serif text-3xl font-semibold">{formatEur(bundle.price_cents)}</span>
            <AddToCart
              kind="bundle"
              id={bundle.id}
              slug={bundle.slug}
              name={bundle.name}
              priceCents={bundle.price_cents}
              imageUrl={bundle.image_url}
              soldOut={bundleSoldOut(bundle)}
              primary
            />
          </div>
          <ShippingNote className="mt-4" />
        </div>
      </div>

      <section className="mt-16 md:ml-[20%]" aria-labelledby="v-paketu">
        <h2 id="v-paketu" className="text-3xl">
          V paketu
        </h2>
        <ul className="mt-6 border-t border-olive/15">
          {items.map((i) => (
            <li
              key={i.product.id}
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-olive/15 py-4"
            >
              <span>
                {i.quantity > 1 && <span className="mr-2 font-medium">{i.quantity}×</span>}
                <Link href={`/izdelek/${i.product.slug}`} className="text-lg underline-offset-4 hover:underline">
                  {i.product.name}
                </Link>
                {i.product.unit_label && (
                  <span className="ml-2 text-sm text-olive/65">{i.product.unit_label}</span>
                )}
              </span>
              <Link
                href={`/druzina/${i.product.producer.slug}`}
                className="text-sm text-olive/75 underline-offset-4 hover:underline"
              >
                {i.product.producer.name}
                {i.product.producer.region && `, ${i.product.producer.region}`}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
