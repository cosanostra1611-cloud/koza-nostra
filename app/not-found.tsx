import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap py-24 md:py-36">
      <p className="eyebrow text-olive/60">Napaka 404</p>
      <h1 className="mt-4 max-w-3xl text-5xl leading-[1.05] sm:text-7xl">
        Te strani ni. Koza jo je pojedla.
      </h1>
      <Link href="/" className="btn mt-10">
        Nazaj na začetek
      </Link>
    </div>
  );
}
