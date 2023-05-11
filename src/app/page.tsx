import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto my-10 max-w-2xl flex flex-col gap-10">
      <h1 className="text-3xl font-medium text-center">Drizzle examples</h1>

      <ul className="flex text-center flex-col gap-4">
        <li>
          <Link className="hover:underline" href="/todo">
            TODO
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/countries">
            Countries
          </Link>
        </li>
      </ul>
    </main>
  );
}
