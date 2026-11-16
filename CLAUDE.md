# Koza Nostra: kontekst projekta (paket v package.json se še imenuje cosa-nostra)

Spletna tržnica domačih izdelkov (olje, vino, pršut, med, obrt) več lokalnih ponudnikov z Obale, Krasa in Istre. Lastnik: Ruben. Jezik vmesnika in komunikacije: slovenščina.

## Stanje (16. 11. 2026)

Narejeno, a še NE preizkušeno (paketi niso bili nameščeni, `npm install` še ni tekel):
- `supabase/schema.sql`: tabele producers, products, orders, order_items, RLS, funkcija decrement_stock
- `supabase/seed.sql`: primeri podatkov (pred lansiranjem jih izbriši)
- `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `.env.example`
- `lib/`: config, format, types, supabase, stripe, data
- `components/`: CartProvider, AddToCart, CartLink, Header, Footer, ProductCard
- `app/layout.tsx`, `app/globals.css` (Tailwind 4, barve olive/cream/honey/wine)

Še manjka (v tem vrstnem redu):
1. Strani: `app/page.tsx` (domača), `app/izdelki/page.tsx` (katalog s filtrom `?kategorija=`), `app/izdelek/[slug]/page.tsx`, `app/ponudniki/page.tsx`, `app/ponudnik/[slug]/page.tsx`, `app/kosarica/page.tsx`, `app/hvala/page.tsx`
2. `app/api/checkout/route.ts`: prebere košarico (productId + quantity), cene vzame iz baze (nikoli iz odjemalca), preveri zalogo, ustvari `orders` (status pending) in `order_items` (z commission_pct ponudnika), nato Stripe Checkout Session (mode payment, EUR, locale sl, samo SI, zbira telefon, `client_reference_id` = order.id, poštnina po `shippingFor`) in vrne `{ url }`
3. `app/api/stripe/webhook/route.ts`: preveri podpis (`req.text()`), ob `checkout.session.completed` označi naročilo `paid`, shrani e-pošto, ime, telefon in naslov (`collected_information.shipping_details`, pri starejši API različici `shipping_details`), pokliče `decrement_stock`
4. `middleware.ts`: Basic Auth za `/admin/*` z `ADMIN_PASSWORD`
5. `app/admin/narocila/page.tsx`: seznam plačanih naročil s postavkami in ponudniki, server action za statuse packed in shipped
6. `README.md`: navodila za Supabase, Stripe, webhook (`stripe listen`), Vercel

Izdelke in ponudnike v MVP vnašamo kar v Supabase Table editorju, brez lastnega vmesnika.

Celoten načrt gradnje (faze, strani, podatkovni model, ton) je v `MASTER_PROMPT.md`. Kjer se razlikuje od tega dokumenta, velja MASTER_PROMPT.md.

## Odločitve

- Next.js 15 (App Router), Tailwind 4, Supabase, Stripe Checkout. Brez Stripe Connecta in portala za ponudnike (dodamo ob približno 50 naročilih na mesec ali 15 ponudnikih).
- Model: ponudnike obiščem, blago pobiram enkrat do dvakrat na teden, pakiram sam in pošljem en paket (GLS ali DPD). Izplačila ponudnikom ročno enkrat na mesec iz `order_items`.
- Samo Slovenija. Poštnina 4,90 €, brezplačna nad 60 € (v `lib/config.ts`). Provizija privzeto 20 % (`producers.commission_pct`).
- Prijava kupcev ni potrebna (guest checkout). Košarica je v localStorage.
- Glavni izdelek: darilni paketi (olje + vino + pršut), ker rešijo mešano košarico.

## Znamka

- Ime je "koza nostra." (z malo in s piko v logotipu; v besedilu "Koza Nostra"). Besedna igra na Cosa Nostra, zato pred registracijo znamke preveri pri URSIL/EUIPO. Ime je zbrano v `lib/config.ts` (`SITE`).
- Slogan: "Vse najboljše domače. Naša stvar."
- Barve: olive #1E2E23, cream #F7F5F0, honey #C69214, wine #5A1A22. Besedilo vedno olive, honey samo za gumbe in poudarke (na kremni podlagi je premalo kontrasta za besedilo).
- Logotip je končan, datoteke v `public/brand/`: `icon.svg` (koza v olivnem krogu, tudi `app/icon.svg` kot favicon), `wordmark-olive.svg` (napis za kremno podlago), `wordmark-cream.svg` (napis za temno podlago), `icon-wine-original.svg` (ikona na vinski podlagi, za družbena omrežja), `lockup-wine.png` (ikona + napis na vinski podlagi). `*-original.svg` so neobrezani izvozi 800x800.
- Pisavi (placeholder): Fraunces za naslove, Karla za besedilo.

## Pravila za izgled

Ne sme izgledati kot generirano. Brez privzetega shadcn videza, brez generičnih stock ali AI fotografij, brez pretirano gladkih marketinških stavkov. Fotografije bodo prave (ponudniki, njihove roke, hlevi, oljke), ki jih posname Ruben. Besedila v preprostem, lokalnem jeziku.

## Pred lansiranjem

- Vsaj 5 ponudnikov z dogovorjeno ceno ali provizijo, fotografije in zgodba
- Pravno: kdo je prodajalec na računu (d.o.o.), registracija za prodajo in skladiščenje hrane, alkohol na daljavo (starost, trošarine), ime in znamka
- Test embalaže za steklenice (10 poskusnih paketov)
