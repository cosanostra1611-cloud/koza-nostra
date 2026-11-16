"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export function CartLink() {
  const { count, ready } = useCart();
  return (
    <Link href="/kosarica" className="hover:text-honey">
      Košarica{ready && count > 0 ? ` (${count})` : ""}
    </Link>
  );
}
