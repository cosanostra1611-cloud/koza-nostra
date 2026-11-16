// Žig "Odobreno od koze": majhen krožni SVG.
export function Stamp({ size = 88, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label="Odobreno od koze"
      className={`shrink-0 text-olive ${className}`}
    >
      <defs>
        <path id="stamp-ring" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
      </defs>
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <text
        fill="currentColor"
        fontFamily="var(--font-body), sans-serif"
        fontSize="8.4"
        fontWeight="700"
        letterSpacing="2.1"
      >
        <textPath href="#stamp-ring" startOffset="0" textLength="231" lengthAdjust="spacing">
          ODOBRENO OD KOZE • ODOBRENO OD KOZE •{" "}
        </textPath>
      </text>
      <image href="/brand/goat-olive.svg" x="33" y="29.5" width="34" height="41" />
    </svg>
  );
}
