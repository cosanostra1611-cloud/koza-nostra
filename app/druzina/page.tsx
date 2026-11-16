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
      <h1 className="text-5xl sm:text-6xl">Družina</h1>
      <p className="mt-4 max-w-xl text-lg text-olive/80">
        Ljudje, ki delajo to, kar prodajamo. Vsakega smo obiskali in izbrali sami.
      </p>

      {producers.length === 0 ? (
        <p className="mt-16 text-lg text-olive/80">Družina se še zbira.</p>
      ) : (
        <ul className="mt-12 border-t border-olive/15">
          {producers.map((p, i) => (
            <li key={p.id} className="border-b border-olive/15 py-10">
              <Link
                href={`/druzina/${p.slug}`}
                className={`group grid items-center gap-6 sm:gap-10 ${
                  i % 2 === 1 ? "sm:grid-cols-[2fr_1fr]" : "sm:grid-cols-[1fr_2fr]"
                }`}
              >
                <Photo
                  src={p.photo_url}
                  alt={p.name}
                  ratio="4:5"
                  className={i % 2 === 1 ? "sm:order-2" : ""}
                />
                <div>
                  {p.region && (
                    <p className="text-xs uppercase tracking-widest text-olive/65">{p.region}</p>
                  )}
                  <h2 className="mt-2 text-3xl underline-offset-4 group-hover:underline sm:text-4xl">
                    {p.name}
                  </h2>
                  {p.story && <p className="mt-4 line-clamp-3 max-w-prose text-olive/80">{p.story}</p>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-12">
        Delate kaj dobrega?{" "}
        <Link href="/postani-del-druzine" className="underline underline-offset-4">
          Postanite del družine
        </Link>
        .
      </p>
    </div>
  );
}
