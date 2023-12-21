import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flexibl",
  description: "layout.js -> description (TODO)",
};

function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <Link href="/" className="btn btn-ghost text-xl">
        Flexibl
      </Link>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
