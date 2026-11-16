import Link from "next/link";
import { bundleSoldOut } from "@/lib/data";
import { formatEur } from "@/lib/format";
import type { Bundle } from "@/lib/types";
import { AddToCart } from "./AddToCart";
import { Photo } from "./Photo";

export function BundleCard({ bundle }: { bundle: Bundle }) {
  const contents = bundle.items
    .filter((i) => i.product)
    .map((i) => (i.quantity > 1 ? `${i.quantity}× ${i.product.name}` : i.product.name));
  return (
    <article className="flex flex-col">
      <Link href={`/paket/${bundle.slug}`} className="block">
        <Photo src={bundle.image_url} alt={bundle.name} ratio="3:2" />
      </Link>
      <h3 className="mt-4 text-2xl leading-tight">
        <Link href={`/paket/${bundle.slug}`} className="underline-offset-4 hover:underline">
          {bundle.name}
        </Link>
      </h3>
      {contents.length > 0 && (
        <p className="mt-2 text-sm text-olive/75">V paketu: {contents.join(", ")}.</p>
      )}
      <div className="mt-auto flex items-center justify-between gap-3 pt-4">
        <span className="text-lg font-medium">{formatEur(bundle.price_cents)}</span>
        <AddToCart
          kind="bundle"
          id={bundle.id}
          slug={bundle.slug}
          name={bundle.name}
          priceCents={bundle.price_cents}
          imageUrl={bundle.image_url}
          soldOut={bundleSoldOut(bundle)}
        />
      </div>
    </article>
  );
}
