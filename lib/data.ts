import { supabasePublic } from "./supabase";
import type { Producer, Product } from "./types";

const PRODUCT_SELECT =
  "id,slug,name,description,category,price_cents,unit_label,image_url,stock,why_chosen,koza_approved,series_label,weight_grams,producer:producers(id,slug,name,region)";

export async function getProducts(
  opts: { category?: string; producerId?: string; limit?: number } = {},
): Promise<Product[]> {
  let q = supabasePublic()
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("active", true)
    .order("created_at", { ascending: false });
  if (opts.category) q = q.eq("category", opts.category);
  if (opts.producerId) q = q.eq("producer_id", opts.producerId);
  if (opts.limit) q = q.limit(opts.limit);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as unknown as Product[];
}

export async function getProduct(slug: string): Promise<Product | null> {
  const { data, error } = await supabasePublic()
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();
  if (error) throw error;
  return (data as unknown as Product) ?? null;
}

export async function getProducers(): Promise<Producer[]> {
  const { data, error } = await supabasePublic()
    .from("producers")
    .select("id,slug,name,region,story,photo_url")
    .eq("active", true)
    .order("name");
  if (error) throw error;
  return (data ?? []) as Producer[];
}

export async function getProducer(slug: string): Promise<Producer | null> {
  const { data, error } = await supabasePublic()
    .from("producers")
    .select("id,slug,name,region,story,photo_url")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();
  if (error) throw error;
  return (data as Producer) ?? null;
}
