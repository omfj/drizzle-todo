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
        <Link href="/" className="hover:underline text-lg">
          &larr; Home
        </Link>
        {children}
      </body>
    </html>
  );
}
