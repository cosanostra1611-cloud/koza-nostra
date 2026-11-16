import Link from "next/link";
import { formatEur } from "@/lib/format";
import type { Product } from "@/lib/types";
import { AddToCart } from "./AddToCart";
import { Photo } from "./Photo";

export function ProductCard({ product, showWhy = false }: { product: Product; showWhy?: boolean }) {
  return (
    <article className="group flex flex-col">
      <Link href={`/izdelek/${product.slug}`} className="block overflow-hidden" tabIndex={-1} aria-hidden="true">
        <Photo
          src={product.image_url}
          alt={product.name}
          ratio="4:5"
          className="transition-opacity duration-150 group-hover:opacity-85"
        />
      </Link>
      <div className="mt-4 flex flex-1 flex-col">
        <Link href={`/druzina/${product.producer.slug}`} className="eyebrow text-olive/60 hover:text-olive">
          {product.producer.name}
        </Link>
        <h3 className="mt-2 text-xl leading-snug">
          <Link href={`/izdelek/${product.slug}`}>{product.name}</Link>
        </h3>
        {showWhy && product.why_chosen && (
          <p className="mt-2 text-sm leading-relaxed text-olive/70">{product.why_chosen}</p>
        )}
        <div className="mt-auto flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 pt-4">
          <p className="tabular-nums">
            {formatEur(product.price_cents)}
            {product.unit_label && <span className="text-sm text-olive/55"> / {product.unit_label}</span>}
          </p>
          <AddToCart
            id={product.id}
            slug={product.slug}
            name={product.name}
            priceCents={product.price_cents}
            imageUrl={product.image_url}
            soldOut={product.stock === 0}
            variant="quiet"
          />
        </div>
      </div>
    </article>
  );
}
