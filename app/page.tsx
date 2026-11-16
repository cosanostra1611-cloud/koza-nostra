import Link from "next/link";
import { BundleCard } from "@/components/BundleCard";
import { Photo } from "@/components/Photo";
import { ProductCard } from "@/components/ProductCard";
import { SectionHead } from "@/components/SectionHead";
import { Stamp } from "@/components/Stamp";
import { SHIPPING, SITE } from "@/lib/config";
import { getBundles, getProducers, getProducts } from "@/lib/data";
import { formatEur } from "@/lib/format";

export const dynamic = "force-dynamic";

// Priložnosti na domači strani, po tem vrstnem redu.
const HOME_OCCASIONS = ["turist", "dom", "darilo"];

export default async function Home() {
  const [bundles, producers, products] = await Promise.all([
    getBundles(),
    getProducers(),
    getProducts({ limit: 8 }),
  ]);

  const featured = HOME_OCCASIONS.map((id) => bundles.find((b) => b.occasion === id)).filter(
    (b) => b !== undefined,
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-olive text-cream">
        <div className="wrap grid gap-10 py-12 md:grid-cols-[1fr_1fr] md:items-center md:gap-16 md:py-20 lg:grid-cols-[5fr_4fr]">
          <div>
            <p className="eyebrow text-cream/65">Obala · Kras · Istra</p>
            <h1 className="mt-6 text-[4.25rem] leading-[0.95] sm:text-8xl lg:text-[8.5rem]">
              {SITE.tagline}
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-cream/80">
              Domače z Obale, Krasa in Istre. Izbrali smo mi, pride v enem paketu.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/paketi" className="btn btn-honey hover:!border-cream hover:!bg-cream hover:!text-olive">
                Poglej pakete
              </Link>
              <Link href="/izdelki" className="btn btn-on-dark">
                Vsi izdelki
              </Link>
            </div>
          </div>
          {SITE.heroImage ? (
            <Photo src={SITE.heroImage} alt={SITE.heroAlt} ratio="4:5" priority />
          ) : (
            <div className="hidden aspect-[4/5] w-full bg-cream/[0.07] md:block" aria-hidden="true" />
          )}
        </div>
      </section>

      {/* Dostava na kratko */}
      <section aria-label="Dostava" className="border-b border-olive/15">
        <ul className="wrap eyebrow grid gap-y-3 py-5 text-olive/75 sm:grid-cols-3 sm:text-center">
          <li>Dostava po Sloveniji {formatEur(SHIPPING.flatCents)}</li>
          <li>Brezplačno nad {formatEur(SHIPPING.freeOverCents)}</li>
          <li>Vse v enem paketu</li>
        </ul>
      </section>

      {/* Paketi po priložnosti */}
      {featured.length > 0 && (
        <section className="wrap mt-20 md:mt-28" aria-labelledby="home-paketi">
          <SectionHead id="home-paketi" title="Paketi" href="/paketi" linkLabel="Vsi paketi" />
          <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((b) => (
              <BundleCard key={b.id} bundle={b} />
            ))}
          </div>
        </section>
      )}

      {/* Družina */}
      {producers.length > 0 && (
        <section className="mt-20 bg-sand md:mt-28" aria-labelledby="home-druzina">
          <div className="wrap grid gap-10 py-16 md:grid-cols-[2fr_3fr] md:gap-16 md:py-24">
            <div>
              <p className="eyebrow text-olive/60">Družina</p>
              <h2 id="home-druzina" className="mt-4 text-4xl leading-[1.05] sm:text-5xl">
                Ljudje, ki to delajo.
              </h2>
              <p className="mt-5 max-w-sm leading-relaxed text-olive/75">
                Vsakega smo obiskali in izbrali sami. Zato jim rečemo družina.
              </p>
              <Link href="/druzina" className="eyebrow link mt-8 inline-block">
                Spoznaj družino
              </Link>
            </div>
            <ul className="border-t border-olive/20">
              {producers.slice(0, 6).map((p) => (
                <li key={p.id} className="border-b border-olive/20">
                  <Link
                    href={`/druzina/${p.slug}`}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5 transition-opacity duration-150 hover:opacity-60"
                  >
                    <span className="font-serif text-2xl sm:text-3xl">{p.name}</span>
                    {p.region && <span className="eyebrow text-olive/60">{p.region}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Izbor izdelkov */}
      {products.length > 0 && (
        <section className="wrap mt-20 md:mt-28" aria-labelledby="home-izbor">
          <SectionHead id="home-izbor" title="Iz naše shrambe" href="/izdelki" linkLabel="Vsi izdelki" />
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-4 md:gap-x-8">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} showWhy />
            ))}
          </div>
        </section>
      )}

      {/* Manifest */}
      <section className="wrap mt-24 md:mt-36" aria-labelledby="home-manifest">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Stamp size={104} />
          <h2 id="home-manifest" className="mt-10 text-3xl leading-[1.25] sm:text-[2.6rem]">
            Nismo tržnica. Vsakega ponudnika obiščemo in izberemo sami. Kar naročite, pride v enem
            paketu.
          </h2>
          <Link href="/o-nas" className="eyebrow link mt-10">
            Več o nas
          </Link>
        </div>
      </section>
    </>
  );
}
