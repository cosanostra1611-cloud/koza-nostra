import type { Metadata } from "next";
import { BundleCard } from "@/components/BundleCard";
import { GoatDivider } from "@/components/GoatDivider";
import { OCCASIONS } from "@/lib/config";
import { getBundles } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Paketi",
  description: "Pripravljeni paketi domačih izdelkov z Obale, Krasa in Istre. Za turista, za dom, za darilo.",
};

export default async function BundlesPage() {
  const bundles = await getBundles();
  const groups = OCCASIONS.map((o) => ({
    ...o,
    bundles: bundles.filter((b) => b.occasion === o.id),
  })).filter((g) => g.bundles.length > 0);

  return (
    <div>
      <h1 className="text-5xl sm:text-6xl">Paketi</h1>
      <p className="mt-4 max-w-xl text-lg text-olive/80">
        Sestavili smo jih mi, da jih ni treba vam. Vsak pride v eni škatli.
      </p>

      {groups.length === 0 && (
        <p className="mt-16 text-lg text-olive/80">Paketov še ni. Koza še izbira.</p>
      )}

      {groups.map((g, i) => (
        <section key={g.id} aria-labelledby={`priloznost-${g.id}`}>
          {i === 0 ? <div className="mt-12" /> : <GoatDivider className="my-16" />}
          <div className="grid gap-8 md:grid-cols-[1fr_3fr]">
            <h2 id={`priloznost-${g.id}`} className="text-3xl">
              {g.label}
            </h2>
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
              {g.bundles.map((b) => (
                <BundleCard key={b.id} bundle={b} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
