// Fotografija s fiksnim razmerjem. Dokler prave fotografije ni, pokaže
// nevtralno ogradno polje (nikoli stock ali AI slik).
const RATIOS = {
  "4:5": "aspect-[4/5]",
  "3:2": "aspect-[3/2]",
  "1:1": "aspect-square",
} as const;

export function Photo({
  src,
  alt,
  ratio = "4:5",
  className = "",
}: {
  src: string | null;
  alt: string;
  ratio?: keyof typeof RATIOS;
  className?: string;
}) {
  const box = `${RATIOS[ratio]} w-full ${className}`;
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} loading="lazy" className={`${box} object-cover`} />;
  }
  return (
    <div className={`${box} flex items-end bg-olive/[0.07] p-3`} role="img" aria-label={alt}>
      <span className="text-xs uppercase tracking-widest text-olive/45">Fotografija {ratio}</span>
    </div>
  );
}
