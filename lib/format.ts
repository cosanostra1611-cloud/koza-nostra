const eur = new Intl.NumberFormat("sl-SI", {
  style: "currency",
  currency: "EUR",
});

export function formatEur(cents: number): string {
  return eur.format(cents / 100);
}
