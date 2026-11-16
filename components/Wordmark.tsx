import { SITE } from "@/lib/config";

// Začasni napis namesto logotipa (logotip še ni izbran).
// Ko bo, zamenjaj samo to komponento.
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-serif font-medium lowercase tracking-tight ${className}`}>
      {SITE.name}.
    </span>
  );
}
