import Link from "next/link";
import { occasionLabel } from "@/lib/config";
import { bundleSoldOut } from "@/lib/data";
import { formatEur } from "@/lib/format";
import type { Bundle } from "@/lib/types";
import { AddToCart } from "./AddToCart";
import { Photo } from "./Photo";

export function BundleCard({ bundle, ratio = "4:5" }: { bundle: Bundle; ratio?: "4:5" | "3:2" }) {
  const contents = bundle.items
    .filter((i) => i.product)
    .map((i) => {
      const name = i.product.name.replace(/^Primer:\s*/, "");
      return i.quantity > 1 ? `${i.quantity}× ${name}` : name;
    });
  return (
    <article className="group flex flex-col">
      <Link href={`/paket/${bundle.slug}`} className="block overflow-hidden" tabIndex={-1} aria-hidden="true">
        <Photo
          src={bundle.image_url}
          alt={bundle.name}
          ratio={ratio}
          className="transition-opacity duration-150 group-hover:opacity-85"
        />
      </Link>
      <p className="eyebrow mt-5 text-olive/60">{occasionLabel(bundle.occasion)}</p>
      <h3 className="mt-2 text-2xl leading-tight sm:text-[1.75rem]">
        <Link href={`/paket/${bundle.slug}`}>{bundle.name}</Link>
      </h3>
      {contents.length > 0 && (
        <p className="mt-2 text-sm leading-relaxed text-olive/70">{contents.join(" · ")}</p>
      )}
      <div className="mt-auto flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 pt-4">
        <span className="text-lg tabular-nums">{formatEur(bundle.price_cents)}</span>
        <AddToCart
          kind="bundle"
          id={bundle.id}
          slug={bundle.slug}
          name={bundle.name}
          priceCents={bundle.price_cents}
          imageUrl={bundle.image_url}
          soldOut={bundleSoldOut(bundle)}
          variant="quiet"
        />
      </div>
    </article>
  );
}
