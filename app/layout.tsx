import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soni Machinery Stores | Machinery Experts in Kanpur Since 1974",
  description: "Agricultural, dairy and general-purpose machinery with practical advice and dependable service in Kanpur since 1974.",
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}
