# Koza Nostra: kontekst projekta

Spletna tržnica domačih izdelkov (olje, vino, pršut, med, obrt) več lokalnih ponudnikov z Obale, Krasa in Istre. Lastnik: Ruben. Jezik vmesnika in komunikacije: slovenščina.

## Stanje (16. 11. 2026)

Delamo po fazah iz `MASTER_PROMPT.md` (točka 10). Koda je na GitHubu: `cosanostra1611-cloud/koza-nostra`, veja `main`. Supabase projekt obstaja, shema in seed sta zagnana; javni URL in publishable ključ sta v `.env.local` (ni v gitu).

Končano in preverjeno (typecheck, build, vse strani pri 1440 in 360 px na pravih podatkih iz Supabase):
- Faza 1: tema, glava, noga, gradniki, shema, seed
- Faza 2: `/izdelki` (filter `?kategorija=`), `/izdelek/[slug]`, `/paketi`, `/paket/[slug]`, `/druzina`, `/druzina/[slug]`
- Faza 3 delno: domača stran (`app/page.tsx`). `/o-nas` še manjka (rabimo Rubnovo besedilo).

Prenova izgleda (na Rubnovo zahtevo: "manj AI, elegantno, kot prava spletna trgovina"):
- LOGOTIPI SO ODSTRANJENI. Ruben še ni izbral logotipa; ne dodajaj jih brez vprašanja. Namesto logotipa je besedilni napis v `components/Wordmark.tsx` (zamenjaš samo to komponento). Favicona ni. Ločilo s kozo je odstranjeno, žig (`Stamp`) je samo tipografski.
- Naslovi so Fraunces v navadni teži (400), ne SemiBold; drobni napisi so razred `.eyebrow` (verzalke, razmaknjene); gumbi so verzalke, brez zaobljenosti.
- Glava: temna vrstica z brezplačno dostavo, navigacija levo, napis na sredini, košarica desno. Noga je temna (olive) s stolpci.
- Ogradna polja fotografij so mirni barvni bloki (sand, sage, blush, straw) z imenom v ležečem serifu; brez napisov "Fotografija 4:5".
- Postavitev: `app/layout.tsx` nima vsebnika; strani trgovine so v skupini `app/(shop)/` z `.wrap`, domača stran je čez celo širino.
- Kartice imajo tiho povezavo "V košarico" (`AddToCart variant="quiet"`), honey gumb je samo na strani izdelka in paketa ter v heroju.

Tehnično:
- Vse strani s podatki so `force-dynamic` (sveža zaloga, build ne rabi baze).
- Košarica podpira pakete: postavka ima `kind` (product | bundle) in `id`, ključ je `cartKey()`, localStorage `koza-nostra-cart-v2`.
- `commission_pct` javnosti ni viden (grant po stolpcih), zato javne poizvedbe na `producers` nikoli ne smejo uporabiti `select *`.
- `package.json` ima `overrides.postcss`, ker Next 15 vleče ranljivo različico; ne odstranjuj.
- Glavna fotografija domače strani: `SITE.heroImage` v `lib/config.ts`.

Še NI preizkušeno: Stripe, pisanje v bazo s service role ključem.

Naslednje: `/o-nas`, nato faza 4 (košarica, checkout, webhook, /hvala), 5 (prijava ponudnikov, /admin), 6 (pravne strani, SEO, dostopnost, README).

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
- Logotip še ni izbran (glej Stanje).
- Pisavi: Fraunces (teža 400) za naslove, Karla za besedilo.

## Pravila za izgled

Ne sme izgledati kot generirano. Brez privzetega shadcn videza, brez generičnih stock ali AI fotografij, brez pretirano gladkih marketinških stavkov. Fotografije bodo prave (ponudniki, njihove roke, hlevi, oljke), ki jih posname Ruben. Besedila v preprostem, lokalnem jeziku.

## Pred lansiranjem

- Vsaj 5 ponudnikov z dogovorjeno ceno ali provizijo, fotografije in zgodba
- Pravno: kdo je prodajalec na računu (d.o.o.), registracija za prodajo in skladiščenje hrane, alkohol na daljavo (starost, trošarine), ime in znamka
- Test embalaže za steklenice (10 poskusnih paketov)
