import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/Photo";
import { getProducers } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Družina",
  description: "Ljudje, ki delajo to, kar prodajamo. Vsakega smo obiskali in izbrali sami.",
};

export default async function FamilyPage() {
  const producers = await getProducers();

  return (
    <div>
      <div className="grid gap-6 border-b border-olive/15 pb-10 md:grid-cols-[3fr_2fr] md:items-end">
        <h1 className="text-5xl leading-none sm:text-7xl">Družina</h1>
        <p className="max-w-md text-lg leading-relaxed text-olive/75 md:justify-self-end">
          Ljudje, ki delajo to, kar prodajamo. Vsakega smo obiskali in izbrali sami.
        </p>
      </div>

      {producers.length === 0 ? (
        <p className="py-24 text-center font-serif text-2xl text-olive/70">Družina se še zbira.</p>
      ) : (
        <ul className="mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {producers.map((p) => (
            <li key={p.id}>
              <Link href={`/druzina/${p.slug}`} className="group block">
                <Photo
                  src={p.photo_url}
                  alt={p.name}
                  ratio="4:5"
                  className="transition-opacity duration-150 group-hover:opacity-85"
                />
                {p.region && <p className="eyebrow mt-5 text-olive/60">{p.region}</p>}
                <h2 className="mt-2 text-3xl leading-tight">{p.name}</h2>
                {p.story && (
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-olive/70">{p.story}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-24 flex flex-col items-start gap-6 bg-sand p-8 sm:flex-row sm:items-center sm:justify-between md:p-12">
        <p className="font-serif text-2xl leading-snug sm:text-3xl">Delate kaj dobrega?</p>
        <Link href="/postani-del-druzine" className="btn">
          Postanite del družine
        </Link>
      </div>
    </div>
  );
}
