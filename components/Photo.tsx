// Fotografija s fiksnim razmerjem. Dokler prave fotografije ni, pokaže
// miren barvni blok z imenom (nikoli stock ali AI slik).
const RATIOS = {
  "4:5": "aspect-[4/5]",
  "3:2": "aspect-[3/2]",
  "1:1": "aspect-square",
  "3:4": "aspect-[3/4]",
} as const;

const TONES = ["bg-sand", "bg-sage", "bg-blush", "bg-straw"];

function toneFor(text: string): string {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  return TONES[h % TONES.length];
}

export function Photo({
  src,
  alt,
  ratio = "4:5",
  className = "",
  priority = false,
}: {
  src: string | null;
  alt: string;
  ratio?: keyof typeof RATIOS;
  className?: string;
  priority?: boolean;
}) {
  const box = `${RATIOS[ratio]} w-full ${className}`;
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} className={`${box} object-cover`} />
    );
  }
  const label = alt.replace(/^Primer:\s*/, "");
  return (
    <div className={`${box} ${toneFor(label)} flex items-center justify-center p-6`} aria-hidden="true">
      <span className="text-center font-serif text-lg italic leading-snug text-olive/40 [text-wrap:balance] sm:text-xl">
        {label}
      </span>
    </div>
  );
}
