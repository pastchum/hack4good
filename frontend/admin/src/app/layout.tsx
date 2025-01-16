import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hack4Good Admin Dashboard",
  description: "Manage users, vouchers, and inventory.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground font-sans antialiased">
        <header className="bg-primary text-white p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Hack4Good Admin</h1>
            <ul className="flex space-x-4">
              <li>
                <a href="/voucher-requests" className="hover:underline">
                  Voucher Requests
                </a>
              </li>
              <li>
                <a href="/inventory" className="hover:underline">
                  Inventory
                </a>
              </li>
              <li>
                <a href="/users" className="hover:underline">
                  Users
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto p-6">{children}</main>
        <footer className="bg-primary text-white text-center p-4 mt-6">
          &copy; 2025 Hack4Good. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
