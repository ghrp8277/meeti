import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meeti",
  description: "Your social meeting platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="container min-h-screen bg-gray-50">{children}</div>
      </body>
    </html>
  );
}
