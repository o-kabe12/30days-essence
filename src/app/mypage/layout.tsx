import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "30days-essence:mypage",
  description: "30-Day Essence（30日間で見極めた本質）",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}
