import { Inter } from "next/font/google";
import { Providers } from "../components/Providers";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "3D Portfolio Generator",
  description: "Create stunning 3D portfolios with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
