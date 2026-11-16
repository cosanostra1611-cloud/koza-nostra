import type { Metadata } from "next";
import { BundleCard } from "@/components/BundleCard";
import { getBundles } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Paketi",
  description: "Pripravljeni paketi domačih izdelkov z Obale, Krasa in Istre. Za turista, za dom, za darilo.",
};

export default async function BundlesPage() {
  const bundles = await getBundles();

  return (
    <div>
      <div className="grid gap-6 border-b border-olive/15 pb-10 md:grid-cols-[3fr_2fr] md:items-end">
        <h1 className="text-5xl leading-none sm:text-7xl">Paketi</h1>
        <p className="max-w-md text-lg leading-relaxed text-olive/75 md:justify-self-end">
          Sestavili smo jih mi, da jih ni treba vam. Vsak pride v eni škatli.
        </p>
      </div>

      {bundles.length === 0 ? (
        <p className="py-24 text-center font-serif text-2xl text-olive/70">Paketov še ni. Koza še izbira.</p>
      ) : (
        <div className="mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {bundles.map((b) => (
            <BundleCard key={b.id} bundle={b} />
          ))}
        </div>
      )}
    </div>
  );
}
