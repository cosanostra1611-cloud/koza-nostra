import { GoatDivider } from "@/components/GoatDivider";
import { Photo } from "@/components/Photo";
import { Stamp } from "@/components/Stamp";
import { SITE } from "@/lib/config";

// Začasna domača stran (faza 1): pokaže temo in osnovne gradnike.
// Prava domača stran pride v fazi 3.
export default function Home() {
  return (
    <div>
      <section className="grid items-end gap-8 py-6 md:grid-cols-[3fr_2fr]">
        <Photo src={null} alt="Ogradno polje za glavno fotografijo" ratio="3:2" />
        <div>
          <h1 className="text-6xl leading-none sm:text-7xl">{SITE.tagline}</h1>
          <p className="mt-5 max-w-sm text-lg text-olive/80">{SITE.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="btn btn-honey">Poglej pakete</span>
            <span className="btn">V košarico</span>
            <span className="btn btn-line">Družina</span>
          </div>
        </div>
      </section>
      <GoatDivider className="my-16" />
      <section className="flex items-center gap-6">
        <Stamp />
        <p className="max-w-md text-olive/80">Stran je v gradnji. Koza še izbira.</p>
      </section>
    </div>
  );
}
