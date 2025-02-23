import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="data-theme">
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}
