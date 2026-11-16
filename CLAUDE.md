# Koza Nostra: kontekst projekta

Spletna tržnica domačih izdelkov (olje, vino, pršut, med, obrt) več lokalnih ponudnikov z Obale, Krasa in Istre. Lastnik: Ruben. Jezik vmesnika in komunikacije: slovenščina.

## Stanje (16. 11. 2026)

Delamo po fazah iz `MASTER_PROMPT.md` (točka 10). Koda je na GitHubu: `cosanostra1611-cloud/koza-nostra`, veja `main`.

Faza 1 (osnova) je končana in preverjena (typecheck, build, pregled pri 1280 in 360 px; shema in seed zagnana na lokalnem Postgresu):
- Tema v `app/globals.css`: barve, pisavi, največ 2 px zaobljenosti, razredi `.btn`, `.btn-honey`, `.btn-line`, `.rule`
- `components/`: Header (Paketi, Izdelki, Družina, Košarica), Footer, Stamp (žig "Odobreno od koze"), GoatDivider, Photo (ogradno polje 4:5, 3:2, 1:1), ProductCard, AddToCart, CartLink, CartProvider
- `lib/`: config (SITE, SHIPPING, CATEGORIES, OCCASIONS), types (Product, Bundle), data, format, supabase, stripe
- `supabase/schema.sql`: producers, products (why_chosen, koza_approved, series_label, weight_grams), bundles, bundle_items, applications, orders, order_items (bundle_id), RLS. Skripta je ponovljiva. `commission_pct` javnosti ni viden (grant po stolpcih), zato javne poizvedbe na `producers` nikoli ne smejo uporabiti `select *`.
- `supabase/seed.sql`: primeri, vsi označeni s "Primer:"
- `app/page.tsx` je začasna (pokaže gradnike), `app/not-found.tsx` je končna
- `package.json` ima `overrides.postcss`, ker Next 15 vleče ranljivo različico; ne odstranjuj

Še NI preizkušeno: nič proti pravemu Supabase projektu (ključev še ni), Stripe.

Naslednje faze: 2 katalog (izdelki, paketi, družina, strani izdelka), 3 domača in /o-nas, 4 košarica, checkout, webhook, /hvala, 5 prijava ponudnikov in /admin, 6 pravne strani, SEO, dostopnost, README.

Poti: ponudniki so `/druzina` in `/druzina/[slug]` (ne `/ponudniki`).

Celoten načrt gradnje (faze, strani, podatkovni model, ton) je v `MASTER_PROMPT.md`. Kjer se razlikuje od tega dokumenta, velja MASTER_PROMPT.md.

## Odločitve

- Next.js 15 (App Router), Tailwind 4, Supabase, Stripe Checkout. Brez Stripe Connecta in portala za ponudnike (dodamo ob približno 50 naročilih na mesec ali 15 ponudnikih).
- Model: ponudnike obiščem, blago pobiram enkrat do dvakrat na teden, pakiram sam in pošljem en paket (GLS ali DPD). Izplačila ponudnikom ročno enkrat na mesec iz `order_items`.
- Samo Slovenija. Poštnina 4,90 €, brezplačna nad 60 € (v `lib/config.ts`). Provizija privzeto 20 % (`producers.commission_pct`).
- Prijava kupcev ni potrebna (guest checkout). Košarica je v localStorage.
- Glavni izdelek: darilni paketi (olje + vino + pršut), ker rešijo mešano košarico.

## Znamka

- Ime je "koza nostra." (z malo in s piko v logotipu; v besedilu "Koza Nostra"). Besedna igra na Cosa Nostra, zato pred registracijo znamke preveri pri URSIL/EUIPO. Ime je zbrano v `lib/config.ts` (`SITE`).
- Slogan: "Naša stvar."
- Barve: olive #1E2E23, cream #F7F5F0, honey #C69214, wine #5A1A22. Besedilo vedno olive, honey samo za gumbe in poudarke (na kremni podlagi je premalo kontrasta za besedilo).
- Logotip je končan, datoteke v `public/brand/`: `icon.svg` (koza v olivnem krogu, tudi `app/icon.svg` kot favicon), `wordmark-olive.svg` (napis za kremno podlago), `wordmark-cream.svg` (napis za temno podlago), `icon-wine-original.svg` (ikona na vinski podlagi, za družbena omrežja), `lockup-wine.png` (ikona + napis na vinski podlagi). `*-original.svg` so neobrezani izvozi 800x800.
- Pisavi (placeholder): Fraunces za naslove, Karla za besedilo.

## Pravila za izgled

Ne sme izgledati kot generirano. Brez privzetega shadcn videza, brez generičnih stock ali AI fotografij, brez pretirano gladkih marketinških stavkov. Fotografije bodo prave (ponudniki, njihove roke, hlevi, oljke), ki jih posname Ruben. Besedila v preprostem, lokalnem jeziku.

## Pred lansiranjem

- Vsaj 5 ponudnikov z dogovorjeno ceno ali provizijo, fotografije in zgodba
- Pravno: kdo je prodajalec na računu (d.o.o.), registracija za prodajo in skladiščenje hrane, alkohol na daljavo (starost, trošarine), ime in znamka
- Test embalaže za steklenice (10 poskusnih paketov)
