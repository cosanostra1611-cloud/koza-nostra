export const SITE = {
  name: "Koza Nostra",
  tagline: "Naša stvar.",
  description:
    "Izbrani domači izdelki z Obale, Krasa in Istre: paketi, hrana in pijača, naravna kozmetika in obrt.",
  // [DOPOLNI] e-naslov za vprašanja kupcev
  contactEmail: "[DOPOLNI]",
};

// Cene in poštnina v centih
export const SHIPPING = {
  flatCents: 490,
  freeOverCents: 6000,
};

export function shippingFor(subtotalCents: number): number {
  return subtotalCents >= SHIPPING.freeOverCents ? 0 : SHIPPING.flatCents;
}

export const CATEGORIES = [
  { id: "olje", label: "Oljčno olje" },
  { id: "vino", label: "Vino" },
  { id: "meso", label: "Mesnine" },
  { id: "med", label: "Med" },
  { id: "sir", label: "Sir" },
  { id: "sol", label: "Sol" },
  { id: "kozmetika", label: "Kozmetika" },
  { id: "obrt", label: "Obrt" },
  { id: "nakit", label: "Nakit" },
  { id: "drugo", label: "Drugo" },
] as const;

export function categoryLabel(id: string): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

// Priložnosti za pakete (bundles.occasion)
export const OCCASIONS = [
  { id: "turist", label: "Za turista" },
  { id: "dom", label: "Za dom" },
  { id: "darilo", label: "Za darilo" },
  { id: "poslovno", label: "Poslovno" },
] as const;

export function occasionLabel(id: string): string {
  return OCCASIONS.find((o) => o.id === id)?.label ?? id;
}
