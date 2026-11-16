// Ločilo med razdelki: tanka črta z majhno kozo na sredini.
export function GoatDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`} role="separator">
      <span className="h-px flex-1 bg-olive/15" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/goat-olive.svg" alt="" width={20} height={24} className="opacity-70" />
      <span className="h-px flex-1 bg-olive/15" />
    </div>
  );
}
