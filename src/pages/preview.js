import { useRouter } from "next/router";
import Link from "next/link";
import PortfolioPreview from "@/components/PortfolioPreview";
import styles from "@/styles/preview.module.css";
import usePortfolioStore from "@/store/portfolioStore";

export default function PreviewPage() {
  const router = useRouter();
  const { userData, templateSettings } = usePortfolioStore();

  // Redirect if no data
  if (!userData?.name || !templateSettings) {
    if (typeof window !== "undefined") {
      router.push("/create");
    }
    return null;
  }

  return (
    <div className={styles.container}>
      <nav className={styles.previewNav}>
        <div className={styles.navLeft}>
          <Link href="/create">
            <button className={styles.backButton}>← Back to Editor</button>
          </Link>
        </div>
        <div className={styles.navRight}>
          <div className={styles.userInfo}>Previewing as: {userData.name}</div>
          <button
            className={styles.publishButton}
            onClick={() => alert("Publishing coming soon!")}
          >
            Publish Portfolio
          </button>
          <button
            className={styles.exitButton}
            onClick={() => router.push("/")}
          >
            Exit Preview
          </button>
        </div>
      </nav>

      <main className={styles.previewContent}>
        <PortfolioPreview fullScreen={true} />
      </main>
    </div>
  );
}
