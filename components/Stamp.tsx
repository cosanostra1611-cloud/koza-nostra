// Žig "Odobreno od koze": majhen krožni SVG, samo tipografija
// (znak koze dodamo, ko bo logotip izbran).
export function Stamp({ size = 88, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label="Odobreno od koze"
      className={`shrink-0 ${className}`}
    >
      <defs>
        <path id="stamp-ring" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
      </defs>
      <circle cx="50" cy="50" r="48.5" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <text
        fill="currentColor"
        fontFamily="var(--font-body), sans-serif"
        fontSize="7.2"
        fontWeight="600"
        letterSpacing="2"
      >
        <textPath href="#stamp-ring" startOffset="0" textLength="237" lengthAdjust="spacing">
          ODOBRENO OD KOZE · ODOBRENO OD KOZE ·{" "}
        </textPath>
      </text>
      <text
        x="50"
        y="47"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="var(--font-fraunces), Georgia, serif"
        fontStyle="italic"
        fontSize="12"
      >
        Naša
      </text>
      <text
        x="50"
        y="61"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="var(--font-fraunces), Georgia, serif"
        fontStyle="italic"
        fontSize="12"
      >
        stvar.
      </text>
    </svg>
  );
}
