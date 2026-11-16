-- PRIMERI podatkov, da stran ob prvem zagonu ni prazna.
-- Pred lansiranjem jih izbriši in vnesi prave ponudnike in izdelke.

insert into producers (slug, name, region, story, commission_pct) values
  ('primer-oljarna', 'Primer: Oljarna', 'Slovenska Istra',
   'Tukaj bo prava zgodba ponudnika: kdo je, od kdaj dela in kaj ga loči od drugih. Dve do tri stavke v njegovih besedah.', 20),
  ('primer-klet', 'Primer: Vinska klet', 'Kras',
   'Tukaj bo prava zgodba ponudnika.', 20)
on conflict (slug) do nothing;

insert into products (producer_id, slug, name, description, category, price_cents, unit_label, stock)
select p.id, v.slug, v.name, v.description, v.category, v.price_cents, v.unit_label, v.stock
from (values
  ('primer-oljarna', 'primer-oljcno-olje', 'Primer: ekstra deviško oljčno olje', 'Opis izdelka.', 'olje', 1490, '0,5 l', 40),
  ('primer-oljarna', 'primer-oljcni-namaz', 'Primer: oljčni namaz', 'Opis izdelka.', 'drugo', 590, '180 g', 25),
  ('primer-klet', 'primer-refosk', 'Primer: refošk', 'Opis izdelka.', 'vino', 1190, '0,75 l', 60)
) as v(producer_slug, slug, name, description, category, price_cents, unit_label, stock)
join producers p on p.slug = v.producer_slug
on conflict (slug) do nothing;
