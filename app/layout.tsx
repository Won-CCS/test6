import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Generated App",
  description: "Built with Voice Vibe Coding Studio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
