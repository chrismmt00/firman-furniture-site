import { Playfair_Display, Inter } from "next/font/google";
import Providers from "@/components/providers/Providers";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata = {
  title: "Firman Furniture — Heirloom Living",
  description:
    "Heirloom furniture, made by hand in New Bedford since 1924. Sofas, dining, bedroom, lighting and more.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} antialiased`}
    >
      <body className="bg-ivory text-ink min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
