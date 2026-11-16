MASTER PROMPT: Koza Nostra, spletna trgovina

VLOGA
Si senior full-stack razvijalec in oblikovalec. Gradiš spletno stran za Koza
Nostra. Delaj po fazah (točka 10): po vsaki fazi zaženi typecheck in build,
naredi git commit in kratko poročaj. Ne izmišljaj pravnih besedil ali
podatkov; kjer kaj manjka, vstavi [DOPOLNI]. Če v mapi že obstajajo CLAUDE.md
in ogrodje (lib/, components/, supabase/schema.sql), jih preberi in nadaljuj,
ne piši vsega znova; najprej preveri, da obstoječa koda deluje, ker še ni
bila preizkušena.

1. KAJ JE KOZA NOSTRA
Kurirana spletna trgovina z domačimi izdelki z Obale, Krasa in Istre: hrana
in pijača, naravna kozmetika, obrt in darila. Ni odprta tržnica. Ponudnike
izberemo sami in jim rečemo 'družina', vsak izdelek ima razlog, da je izbran.
Glavni izdelki so pripravljeni paketi (darila), posamezni izdelki so podpora.
Kupec dobi en paket v naši embalaži. Slogan: Naša stvar. Ime je igra besed
(Cosa Nostra; koza je žival in tudi 'stvar' v lokalnem govoru). Samo
slovenščina, samo dostava po Sloveniji, EUR, cene z DDV.

2. TEHNIČNI SKLAD
Next.js 15 App Router (Server Components), TypeScript strict, Tailwind CSS 4,
Supabase (Postgres, RLS, Storage), Stripe Checkout (brez Connecta),
gostovanje Vercel. Brez UI knjižnic s privzetim videzom predloge (brez shadcn
slogov). Strežnik vedno prebere cene iz baze, nikoli ne zaupaj cenam iz
odjemalca. Webhook preveri podpis. E-pošta: Stripe potrdilo kupcu, obvestilo
meni prek Resend, če je ključ nastavljen.

3. PODATKOVNI MODEL (dopolni supabase/schema.sql z migracijo)
- producers: kot doslej, z commission_pct.
- products: dodaj why_chosen text (razlog izbora v mojem glasu),
koza_approved boolean default true (žig 'Odobreno od koze'), series_label
text null (npr. 'Jesenska serija'), weight_grams int null. Razširi
kategorije: olje, vino, meso, med, sir, sol, kozmetika, obrt, nakit, drugo.
- bundles: id, slug, name, description, occasion (turist | dom | darilo |
poslovno), price_cents, image_url, active. bundle_items: bundle_id,
product_id, quantity. Paket ima fiksno ceno; ob nakupu se zaloga posameznih
izdelkov zmanjša.

Koza Nostra: master prompt za gradnjo strani

- applications: id, created_at, business_name, contact_name, email, phone,
city, category, description, website_url, photo_urls text[], price_info,
legal_form (sp | doo | kmetija | drugo), vat_registered bool,
food_registration text, weekly_capacity text, accepts_terms bool, status (new
| review | accepted | rejected), internal_note.
- orders in order_items kot doslej; order_items naj podpira tudi paket
(bundle_id nullable).
RLS: javno branje aktivnih ponudnikov, izdelkov in paketov; applications samo
vstavljanje prek strežnika; vse ostalo prek service role.

4. STRANI
/ (domača); /paketi in /paket/[slug]; /izdelki (filter ?kategorija=) in
/izdelek/[slug]; /druzina in /druzina/[slug]; /postani-del-druzine;
/kosarica; /hvala; /o-nas (manifest); /dostava-in-vracila; /pogoji;
/zasebnost; /admin (Basic Auth): naročila, prijave, ponudniki in izdelki
(preprosti obrazci), paketi.
Domača stran po vrstnem redu: (1) glava z logotipom in povezavami Paketi,
Izdelki, Družina, Košarica; (2) hero: velika prava fotografija, stavek 'Naša
stvar.' in gumb 'Poglej pakete'; (3) paketi po priložnosti: Za turista, Za
dom, Za darilo; (4) družina: vrstica ponudnikov z imenom in krajem; (5) izbor
6 do 8 izdelkov z vrstico 'Zakaj smo ga izbrali'; (6) kratek manifest (3
stavki) z žigom; (7) noga.
Stran izdelka: velika slika, ime, cena, enota, ponudnik (povezava), 'Zakaj
smo ga izbrali', žig, gumb 'V košarico', podatek o dostavi.
Stran družine: velika fotografija ponudnika, njegova zgodba v njegovih
besedah, njegovi izdelki.

5. PRIJAVA PONUDNIKOV
/postani-del-druzine: obrazec s polji iz tabele applications, validacija na
strežniku (zod), honeypot proti spamu, shrani v bazo in meni pošlje e-pošto.
Jasno napiši, da je prijava pregled in ne samodejni vpis, in da je provizija
od 15 do 25 % (točen odstotek [DOPOLNI]). V /admin: seznam prijav,
spreminjanje statusa, gumb 'Sprejmi' ustvari ponudnika v tabeli producers.

6. BLAGOVNA PODOBA
Barve (Tailwind theme): olive #1E2E23, cream #F7F5F0, wine #5A1A22, honey
#C69214. Besedilo je vedno olive na cream; honey samo za gumbe in drobne
poudarke, nikoli kot barva besedila na kremni podlagi. Logotip: koza v krogu
in napis 'koza nostra.'; SVG datoteke so v mapi public/brand (če manjkajo,
pusti mesto in me opozori). Naslovi: serif s karakterjem (Fraunces SemiBold),
besedilo: Karla. Žig 'Odobreno od koze' je majhen krožni SVG.

7. PRAVILA ZA VIDEZ (ne sme izgledati generirano)

Koza Nostra: master prompt za gradnjo strani

Brez senc, gradientov, steklenih učinkov in velikih zaobljenih kartic; največ
2 px zaobljenosti. Tanke linije (1 px, olive pri 15 %) kot ločila. Veliko
praznega prostora, velika tipografija, asimetrične postavitve namesto vedno
enakih mrež. Fotografije so prave: v razvoju uporabi nevtralna ogradna polja
s pravimi razmerji (4:5, 3:2), nikoli stock ali AI slik. Ločila med razdelki
naj bodo majhen kozji motiv. Gumbi so pravokotni in olive polni, honey le za
glavni klic k dejanju. Animacije minimalne (fade, 150 ms). Mobile-first;
preveri tudi 360 px širine.

8. TON BESEDIL
Kratko, toplo, suhoparen humor, nikoli glasno. Brez besed: odkrijte,
ekskluzivno, premium, doživetje, unikatno, partnerji. Ponudniki so družina.
Brez mafijskih klišejev (brez pištol, klobukov, groženj). Primeri: prazna
košarica: 'Košarica je prazna. Koza je žalostna.'; hvala: 'Hvala. Koza je že
na poti.'; napaka 404: 'Te strani ni. Koza jo je pojedla.'; gumb: 'V
košarico'.

9. DOSTAVA IN CENE
Samo Slovenija. Poštnina 4,90 €, brezplačna nad 60 € (v lib/config.ts).
Stripe Checkout z zbiranjem naslova (SI) in telefona, locale sl. Paketi imajo
lastno ceno.

10. FAZE (po vsaki: typecheck, build, commit, kratko poročilo, počakaj na
potrditev)
1. Osnova: tema, pisave, glava, noga, komponente, shema in seed (primeri
označeni 'Primer:').
2. Katalog: izdelki, paketi, družina, strani izdelka.
3. Domača stran in /o-nas.
4. Košarica, checkout, webhook, /hvala.
5. Prijava ponudnikov in /admin.
6. Pravne in informativne strani (z [DOPOLNI]), SEO (title, description, Open
Graph, sitemap, robots), dostopnost (kontrast, fokus, alt), README z navodili
za Supabase, Stripe, webhook in Vercel.

11. ČESA NE DELAJ
Ne gradi portala za ponudnike, Stripe Connecta, uporabniških računov, ocen,
kuponov ali več jezikov. Ne dodajaj funkcij brez potrebe. Ne spreminjaj
imena, sloganov ali barv brez vprašanja.

12. DELOVANJE
Pred vsakim večjim korakom, ki ni jasen, vprašaj. Na koncu vsake faze povej,
kaj je narejeno, kaj še ni preizkušeno in kaj potrebuješ od mene (ključi,
fotografije, besedila).


