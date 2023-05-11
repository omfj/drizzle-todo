import Link from "next/link";

export default async function Home() {
  return (
    <main className="mx-auto my-10 max-w-2xl flex flex-col gap-10">
      <h1 className="text-3xl font-medium text-center">Drizzle examples</h1>

      <ul className="flex flex-col gap-2 text-center">
        <li>
          <Link href="/todo" className="hover:underline">
            TODO
          </Link>
        </li>
        <li>
          <Link href="/countries" className="hover:underline">
            Countries
          </Link>
        </li>
      </ul>
    </main>
  );
}
