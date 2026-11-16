import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20">
      <h1 className="text-4xl sm:text-6xl">Te strani ni. Koza jo je pojedla.</h1>
      <Link href="/" className="btn mt-8">
        Nazaj na začetek
      </Link>
    </div>
  );
}
