"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export function CartLink() {
  const { count, ready } = useCart();
  return (
    <Link href="/kosarica" className="transition-opacity duration-150 hover:opacity-60">
      Košarica <span className="tabular-nums">({ready ? count : 0})</span>
    </Link>
  );
}
