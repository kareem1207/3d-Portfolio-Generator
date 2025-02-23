import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import styles from "@/styles/dashboard.module.css";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className={styles.dashboard}>
      <h1>Welcome, {session.user.name}!</h1>
      <div className={styles.portfolioGrid}>
        {/* Portfolio items will go here */}
        <div className={styles.createNew}>
          <Link href="/create">
            <button className={styles.createButton}>
              Create New Portfolio
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
