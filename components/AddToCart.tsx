"use client";

import { useState } from "react";
import { useCart, type CartKind } from "./CartProvider";

type Props = {
  kind?: CartKind;
  id: string;
  slug: string;
  name: string;
  priceCents: number;
  imageUrl: string | null;
  soldOut?: boolean;
  // Glavni klic k dejanju (honey) samo na strani izdelka ali paketa.
  primary?: boolean;
};

export function AddToCart({
  kind = "product",
  id,
  slug,
  name,
  priceCents,
  imageUrl,
  soldOut = false,
  primary = false,
}: Props) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  if (soldOut) {
    return (
      <span className="inline-block border border-olive/30 px-4 py-2 text-sm text-olive/65">
        Razprodano
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        add({ kind, id, slug, name, priceCents, imageUrl });
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
      className={primary ? "btn btn-honey px-7 py-3 text-base" : "btn"}
    >
      <span aria-live="polite">{added ? "Dodano" : "V košarico"}</span>
    </button>
  );
}
