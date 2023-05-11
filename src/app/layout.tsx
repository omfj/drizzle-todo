import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Drizzle TODO",
  description: "Example TODO app using Drizzle",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="p-5">
          <h1 className="text-3xl font-medium text-center">
            <Link href="/">{metadata.title}</Link>
          </h1>
        </header>
        <hr />
        {children}
      </body>
    </html>
  );
}
