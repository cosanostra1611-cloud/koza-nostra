import Link from "next/link";

// Naslov razdelka z neobvezno povezavo na desni.
export function SectionHead({
  title,
  href,
  linkLabel,
  id,
}: {
  title: string;
  href?: string;
  linkLabel?: string;
  id?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b border-olive/15 pb-5">
      <h2 id={id} className="text-4xl leading-none sm:text-5xl">
        {title}
      </h2>
      {href && linkLabel && (
        <Link href={href} className="eyebrow link">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
