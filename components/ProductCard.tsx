import Link from "next/link";
import { formatEur } from "@/lib/format";
import type { Product } from "@/lib/types";
import { AddToCart } from "./AddToCart";

export function ProductImage({
  src,
  name,
  className = "",
}: {
  src: string | null;
  name: string;
  className?: string;
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={name} className={`object-cover ${className}`} />;
  }
  return (
    <div
      className={`flex items-center justify-center bg-olive/10 font-serif text-4xl text-olive/40 ${className}`}
      aria-hidden="true"
    >
      {name.replace(/^Primer:\s*/, "").charAt(0).toUpperCase()}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col">
      <Link href={`/izdelek/${product.slug}`} className="block overflow-hidden rounded">
        <ProductImage src={product.image_url} name={product.name} className="aspect-square w-full" />
      </Link>
      <div className="mt-3 flex flex-1 flex-col">
        <Link
          href={`/ponudnik/${product.producer.slug}`}
          className="text-xs uppercase tracking-wide text-olive/60 hover:text-honey"
        >
          {product.producer.name}
        </Link>
        <h3 className="mt-1 font-serif text-lg leading-snug">
          <Link href={`/izdelek/${product.slug}`} className="hover:text-honey">
            {product.name}
          </Link>
        </h3>
        {product.unit_label && <p className="text-sm text-olive/60">{product.unit_label}</p>}
        <div className="mt-3 flex items-center justify-between gap-3 pt-1">
          <span className="font-medium">{formatEur(product.price_cents)}</span>
          <AddToCart
            productId={product.id}
            slug={product.slug}
            name={product.name}
            priceCents={product.price_cents}
            imageUrl={product.image_url}
            stock={product.stock}
          />
        </div>
      </div>
    </article>
  );
}
