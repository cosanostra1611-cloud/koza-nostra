import { SHIPPING } from "@/lib/config";
import { formatEur } from "@/lib/format";

export function ShippingNote({ className = "" }: { className?: string }) {
  return (
    <p className={`text-sm text-olive/75 ${className}`}>
      Dostava po Sloveniji {formatEur(SHIPPING.flatCents)}. Nad{" "}
      {formatEur(SHIPPING.freeOverCents)} je brezplačna. Vse pride v enem paketu.
    </p>
  );
}
