import type { Metadata } from "next";
import Header from "./components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "30days Essence（30日間で見極めた本質）",
  description: "物価上昇に伴い、生活が苦しくなってきた今日この頃、もう一度自分に本当に必要なものは何かを見極める必要があると思い、このアプリを作りました。ぜひ活用して、本当に必要な物で生きてください",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
