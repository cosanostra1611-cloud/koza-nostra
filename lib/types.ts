export type ProducerLite = {
  id: string;
  slug: string;
  name: string;
  region: string | null;
};

export type Producer = ProducerLite & {
  story: string | null;
  photo_url: string | null;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  category: string;
  price_cents: number;
  unit_label: string | null;
  image_url: string | null;
  stock: number | null;
  producer: ProducerLite;
};
