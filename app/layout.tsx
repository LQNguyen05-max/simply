import type { Metadata } from "next";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { Provider } from "./provider";
import toast, { Toaster } from "react-hot-toast";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SimplyCard",
  description:
    "Use AI to study more efficiently by creating note cards tailored to your knowledge, and afterwards study with the note cards you created in study mode!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body
          className={cn(
            "min-h-screen font-sans antialiased",
            fontSans.variable
          )}
        >
          <Toaster />
          <Navbar />
          {children}
        </body>
      </Provider>
    </html>
  );
}
