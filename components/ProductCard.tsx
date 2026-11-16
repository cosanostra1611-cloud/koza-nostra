import Link from "next/link";
import { formatEur } from "@/lib/format";
import type { Product } from "@/lib/types";
import { AddToCart } from "./AddToCart";
import { Photo } from "./Photo";

export function ProductCard({ product, showWhy = false }: { product: Product; showWhy?: boolean }) {
  return (
    <article className="flex flex-col">
      <Link href={`/izdelek/${product.slug}`} className="block">
        <Photo src={product.image_url} alt={product.name} ratio="4:5" />
      </Link>
      <div className="mt-3 flex flex-1 flex-col">
        <Link
          href={`/druzina/${product.producer.slug}`}
          className="text-xs uppercase tracking-widest text-olive/65 underline-offset-4 hover:underline"
        >
          {product.producer.name}
        </Link>
        <h3 className="mt-1 text-lg leading-snug">
          <Link href={`/izdelek/${product.slug}`} className="underline-offset-4 hover:underline">
            {product.name}
          </Link>
        </h3>
        {product.unit_label && <p className="text-sm text-olive/65">{product.unit_label}</p>}
        {showWhy && product.why_chosen && (
          <p className="mt-2 text-sm text-olive/80">
            <span className="font-medium text-olive">Zakaj smo ga izbrali: </span>
            {product.why_chosen}
          </p>
        )}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-4">
          <span className="font-medium">{formatEur(product.price_cents)}</span>
          <AddToCart
            id={product.id}
            slug={product.slug}
            name={product.name}
            priceCents={product.price_cents}
            imageUrl={product.image_url}
            soldOut={product.stock === 0}
          />
        </div>
      </div>
    </article>
  );
}
