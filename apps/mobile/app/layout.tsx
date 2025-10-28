import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

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
      <body className="antialiased bg-tin-grey-200">
        <Providers>
          <div className="container min-w-[375px] min-h-screen bg-white">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
