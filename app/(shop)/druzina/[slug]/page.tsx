import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Photo } from "@/components/Photo";
import { ProductCard } from "@/components/ProductCard";
import { SectionHead } from "@/components/SectionHead";
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
      <nav aria-label="Drobtinice" className="eyebrow text-olive/55">
        <Link href="/druzina" className="hover:text-olive">
          Družina
        </Link>
      </nav>

      <div className="mt-6 grid gap-10 md:grid-cols-[5fr_6fr] md:items-center md:gap-16">
        <div className="md:order-2">
          <Photo src={producer.photo_url} alt={producer.name} ratio="4:5" priority />
        </div>
        <div>
          {producer.region && <p className="eyebrow text-olive/60">{producer.region}</p>}
          <h1 className="mt-4 text-5xl leading-[1.02] sm:text-7xl">{producer.name}</h1>
          {producer.story && (
            <p className="mt-8 max-w-prose whitespace-pre-line font-serif text-xl leading-relaxed text-olive/85">
              {producer.story}
            </p>
          )}
        </div>
      </div>

      {products.length > 0 && (
        <section className="mt-20 md:mt-28" aria-labelledby="njihovi-izdelki">
          <SectionHead id="njihovi-izdelki" title="Kar delajo" />
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
