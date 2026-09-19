import type { Metadata } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-bebas" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Central PA Lions Academy",
    template: "%s | Central PA Lions Academy",
  },
  description:
    "TJ Anderson's Central PA Lions Academy — youth basketball development serving Central Pennsylvania from Centre County.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${manrope.variable} w-full max-w-full overflow-x-clip`}>
      <body className="w-full max-w-full overflow-x-clip">{children}</body>
    </html>
  );
}
