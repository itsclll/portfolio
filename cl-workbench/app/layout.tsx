import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CL_WORKBENCH — christian_portfolio",
  description: "Christian A. Lucina — IT Professional, Full-Stack Developer, QA Engineer",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-mono text-[13.5px]">{children}</body>
    </html>
  );
}
