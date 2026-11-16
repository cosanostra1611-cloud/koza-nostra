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
  why_chosen: string | null;
  koza_approved: boolean;
  series_label: string | null;
  weight_grams: number | null;
  producer: ProducerLite;
};

export type Occasion = "turist" | "dom" | "darilo" | "poslovno";

export type BundleItem = {
  quantity: number;
  product: Pick<Product, "id" | "slug" | "name" | "unit_label" | "image_url" | "stock"> & {
    producer: ProducerLite;
  };
};

export type Bundle = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  occasion: Occasion;
  price_cents: number;
  image_url: string | null;
  items: BundleItem[];
};
