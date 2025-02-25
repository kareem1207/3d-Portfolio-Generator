import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import usePortfolioStore from "@/store/portfolioStore";
import styles from "@/styles/preview.module.css";
import PortfolioPreview from "@/components/PortfolioPreview";

export default function PreviewPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [publishing, setPublishing] = useState(false);
  const { publishPortfolio } = usePortfolioStore();

  const handlePublish = async () => {
    setPublishing(true);
    try {
      if (!session) {
        alert("Please sign in to publish your portfolio");
        return;
      }

      const result = await publishPortfolio();
      if (result) {
        alert("Portfolio published successfully!");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Publishing error:", error);
      alert(error.message || "Failed to publish portfolio. Please try again.");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className={styles.previewContainer}>
      <nav className={styles.previewNav}>
        <button
          className={styles.backButton}
          onClick={() => router.push("/create")}
        >
          Back to Editor
        </button>
        <div className={styles.actionButtons}>
          <button
            className={`${styles.publishButton} ${
              publishing ? styles.publishing : ""
            }`}
            onClick={handlePublish}
            disabled={publishing}
          >
            {publishing ? "Publishing..." : "Publish Portfolio"}
          </button>
        </div>
      </nav>

      <main className={styles.previewContent}>
        <PortfolioPreview fullScreen={true} />
      </main>
    </div>
  );
}
