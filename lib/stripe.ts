import Stripe from "stripe";

let client: Stripe | null = null;

// Ustvarimo ga šele ob uporabi, da build ne pade, če ključ še ni nastavljen.
export function getStripe(): Stripe {
  if (!client) {
    client = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }
  return client;
}
