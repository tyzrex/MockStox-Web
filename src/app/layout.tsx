import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import NextAuthProvider from "@/providers/next-auth-provider";
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Outfit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mockstox: AI Powered Stock Trading Platform",
  description:
    "Mockstox is a mock stock trading platform that allows you to trade stocks with virtual money. It also provides stock price prediction using machine learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <NextAuthProvider>{children}</NextAuthProvider>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
