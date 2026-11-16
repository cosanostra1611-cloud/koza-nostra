"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

type Props = {
  productId: string;
  slug: string;
  name: string;
  priceCents: number;
  imageUrl: string | null;
  stock: number | null;
};

export function AddToCart({ productId, slug, name, priceCents, imageUrl, stock }: Props) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  if (stock === 0) {
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
        add({ productId, slug, name, priceCents, imageUrl });
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
      className="btn"
    >
      {added ? "Dodano" : "V košarico"}
    </button>
  );
}
