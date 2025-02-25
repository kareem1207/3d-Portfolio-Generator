import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import PortfolioPreview from "@/components/PortfolioPreview";
import styles from "@/styles/preview.module.css";
import usePortfolioStore from "@/store/portfolioStore";

export default function PreviewPage() {
  const router = useRouter();
  const { userData, templateSettings } = usePortfolioStore();
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState(null);

  const handlePublish = async () => {
    setPublishing(true);
    setPublishError(null);

    // Validate required data
    if (!userData?.name || !userData?.title) {
      setPublishError("Name and title are required");
      setPublishing(false);
      return;
    }

    try {
      const portfolioData = {
        userData,
        templateSettings,
        userId: userData.email || `user_${Date.now()}`, // Fallback user ID
        data: {
          content: userData,
          design: templateSettings,
          timestamp: new Date().toISOString(),
        },
      };

      const response = await fetch("/api/portfolio/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ portfolioData }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to publish");
      }

      alert(`Portfolio published successfully!\nURL: ${data.url}`);
      router.push(`/portfolio/${data.portfolioId}`);
    } catch (error) {
      console.error("Publishing error:", error);
      setPublishError(error.message);
    } finally {
      setPublishing(false);
    }
  };

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
            className={`${styles.publishButton} ${
              publishing ? styles.publishing : ""
            }`}
            onClick={handlePublish}
            disabled={publishing}
          >
            {publishing ? "Publishing..." : "Publish Portfolio"}
          </button>
          <button
            className={styles.exitButton}
            onClick={() => router.push("/")}
          >
            Exit Preview
          </button>
        </div>
      </nav>

      {publishError && <div className={styles.errorBanner}>{publishError}</div>}

      <main className={styles.previewContent}>
        <PortfolioPreview fullScreen={true} />
      </main>
    </div>
  );
}
