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
  // primary: glavni klic k dejanju (honey), samo na strani izdelka ali paketa.
  // quiet: besedilna povezava na karticah.
  variant?: "default" | "primary" | "quiet";
};

export function AddToCart({
  kind = "product",
  id,
  slug,
  name,
  priceCents,
  imageUrl,
  soldOut = false,
  variant = "default",
}: Props) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  if (soldOut) {
    return (
      <span className={variant === "quiet" ? "eyebrow text-olive/50" : "btn btn-line pointer-events-none opacity-50"}>
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
      className={
        variant === "primary"
          ? "btn btn-honey w-full sm:w-auto sm:min-w-56"
          : variant === "quiet"
            ? "eyebrow link"
            : "btn"
      }
    >
      <span aria-live="polite">{added ? "Dodano" : "V košarico"}</span>
    </button>
  );
}
