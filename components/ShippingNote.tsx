import { SHIPPING } from "@/lib/config";
import { formatEur } from "@/lib/format";

export function ShippingNote({ className = "" }: { className?: string }) {
  return (
    <ul className={`space-y-2 text-sm text-olive/75 ${className}`}>
      <li>Dostava po Sloveniji {formatEur(SHIPPING.flatCents)}</li>
      <li>Brezplačna dostava nad {formatEur(SHIPPING.freeOverCents)}</li>
      <li>Celotno naročilo pride v enem paketu</li>
    </ul>
  );
}
