export const SITE = {
  name: "Koza Nostra",
  tagline: "Vse najboljše domače. Naša stvar.",
  description:
    "Izdelki lokalnih ponudnikov z Obale, Krasa in Istre: olje, vino, pršut, med in obrt.",
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
  { id: "kozmetika", label: "Kozmetika" },
  { id: "obrt", label: "Obrt" },
  { id: "drugo", label: "Drugo" },
] as const;

export function categoryLabel(id: string): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
