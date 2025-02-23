"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FiSun, FiMoon } from "react-icons/fi";
import styles from "@/styles/navbar.module.css";
import ClientOnly from "./ClientOnly";

export default function Navbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <Link href="/" className={styles.logo}>
          3D Portfolio Generator
        </Link>
      </div>

      <div className={styles.navRight}>
        <ClientOnly>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={styles.themeToggle}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>

          {session ? (
            <>
              <Link href="/dashboard" className={styles.navLink}>
                Dashboard
              </Link>
              <span className={styles.userEmail}>{session.user.email}</span>
              <button onClick={() => signOut()} className={styles.signOutBtn}>
                Sign Out
              </button>
            </>
          ) : (
            <button onClick={() => signIn()} className={styles.signInBtn}>
              Sign In
            </button>
          )}
        </ClientOnly>
      </div>
    </nav>
  );
}
