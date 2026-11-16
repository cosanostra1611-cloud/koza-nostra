-- PRIMERI podatkov, da stran ob prvem zagonu ni prazna.
-- Vse je označeno s 'Primer:'. Pred lansiranjem jih izbriši (ukazi na dnu)
-- in vnesi prave ponudnike, izdelke in pakete.

insert into producers (slug, name, region, story, commission_pct) values
  ('primer-oljarna', 'Primer: Oljarna', 'Slovenska Istra',
   'Primer: tukaj bo zgodba ponudnika v njegovih besedah. Kdo je, od kdaj dela in zakaj dela tako, kot dela.', 20),
  ('primer-klet', 'Primer: Vinska klet', 'Kras',
   'Primer: tukaj bo zgodba ponudnika v njegovih besedah.', 20),
  ('primer-cebelar', 'Primer: Čebelar', 'Obala',
   'Primer: tukaj bo zgodba ponudnika v njegovih besedah.', 20)
on conflict (slug) do nothing;

insert into products (producer_id, slug, name, description, category, price_cents, unit_label, stock, why_chosen, series_label, weight_grams)
select p.id, v.slug, v.name, v.description, v.category, v.price_cents, v.unit_label, v.stock, v.why_chosen, v.series_label, v.weight_grams
from (values
  ('primer-oljarna', 'primer-oljcno-olje', 'Primer: ekstra deviško oljčno olje', 'Primer: opis izdelka.', 'olje', 1490, '0,5 l', 40, 'Primer: tukaj bo razlog, zakaj je izdelek izbran.', null, 950),
  ('primer-oljarna', 'primer-oljcni-namaz', 'Primer: oljčni namaz', 'Primer: opis izdelka.', 'drugo', 590, '180 g', 25, 'Primer: tukaj bo razlog, zakaj je izdelek izbran.', null, 320),
  ('primer-klet', 'primer-refosk', 'Primer: refošk', 'Primer: opis izdelka.', 'vino', 1190, '0,75 l', 60, 'Primer: tukaj bo razlog, zakaj je izdelek izbran.', 'Primer: jesenska serija', 1300),
  ('primer-cebelar', 'primer-med', 'Primer: cvetlični med', 'Primer: opis izdelka.', 'med', 890, '450 g', 30, 'Primer: tukaj bo razlog, zakaj je izdelek izbran.', null, 700)
) as v(producer_slug, slug, name, description, category, price_cents, unit_label, stock, why_chosen, series_label, weight_grams)
join producers p on p.slug = v.producer_slug
on conflict (slug) do nothing;

insert into bundles (slug, name, description, occasion, price_cents) values
  ('primer-paket-turist', 'Primer: paket za turista', 'Primer: opis paketa.', 'turist', 2490),
  ('primer-paket-dom', 'Primer: paket za dom', 'Primer: opis paketa.', 'dom', 2990),
  ('primer-paket-darilo', 'Primer: paket za darilo', 'Primer: opis paketa.', 'darilo', 3490)
on conflict (slug) do nothing;

insert into bundle_items (bundle_id, product_id, quantity)
select b.id, pr.id, v.quantity
from (values
  ('primer-paket-turist', 'primer-oljcno-olje', 1),
  ('primer-paket-turist', 'primer-med', 1),
  ('primer-paket-dom', 'primer-oljcno-olje', 1),
  ('primer-paket-dom', 'primer-oljcni-namaz', 1),
  ('primer-paket-dom', 'primer-refosk', 1),
  ('primer-paket-darilo', 'primer-oljcno-olje', 1),
  ('primer-paket-darilo', 'primer-refosk', 1),
  ('primer-paket-darilo', 'primer-med', 1)
) as v(bundle_slug, product_slug, quantity)
join bundles b on b.slug = v.bundle_slug
join products pr on pr.slug = v.product_slug
on conflict do nothing;

-- Brisanje primerov pred lansiranjem (odstrani komentar in zaženi):
-- delete from bundles where slug like 'primer-%';
-- delete from products where slug like 'primer-%';
-- delete from producers where slug like 'primer-%';
