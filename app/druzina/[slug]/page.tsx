import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GoatDivider } from "@/components/GoatDivider";
import { Photo } from "@/components/Photo";
import { ProductCard } from "@/components/ProductCard";
import { getProducer, getProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const producer = await getProducer(slug);
  if (!producer) return {};
  return { title: producer.name, description: producer.story ?? undefined };
}

export default async function ProducerPage({ params }: Props) {
  const { slug } = await params;
  const producer = await getProducer(slug);
  if (!producer) notFound();
  const products = await getProducts({ producerId: producer.id });

  return (
    <article>
      <Photo src={producer.photo_url} alt={producer.name} ratio="3:2" />
      <div className="mt-8 grid gap-6 md:grid-cols-[2fr_3fr] md:gap-14">
        <div>
          {producer.region && (
            <p className="text-xs uppercase tracking-widest text-olive/65">{producer.region}</p>
          )}
          <h1 className="mt-2 text-4xl leading-tight sm:text-5xl">{producer.name}</h1>
        </div>
        {producer.story && (
          <p className="whitespace-pre-line text-lg leading-relaxed text-olive/85">{producer.story}</p>
        )}
      </div>

      {products.length > 0 && (
        <section aria-labelledby="njihovi-izdelki">
          <GoatDivider className="my-16" />
          <h2 id="njihovi-izdelki" className="text-3xl">
            Kar delajo
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:gap-x-8">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
