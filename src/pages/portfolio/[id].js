import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PortfolioPreview from "@/components/PortfolioPreview";
import styles from "@/styles/portfolio.module.css";

export default function Portfolio() {
  const router = useRouter();
  const { id } = router.query;
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchPortfolio() {
      try {
        const response = await fetch(`/api/portfolio/${id}`);
        if (!response.ok) {
          throw new Error("Portfolio not found");
        }
        const data = await response.json();
        setPortfolioData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolio();
  }, [id]);

  if (loading)
    return <div className={styles.loading}>Loading portfolio...</div>;
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h1>Portfolio Not Found</h1>
        <p>{error}</p>
        <button onClick={() => router.push("/")} className={styles.homeButton}>
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className={styles.portfolioContainer}>
      <div className={styles.portfolioHeader}>
        <h1>{portfolioData.userData.name}'s Portfolio</h1>
        <button onClick={() => router.push("/")} className={styles.backButton}>
          ← Back to Home
        </button>
      </div>
      <main className={styles.portfolioContent}>
        <PortfolioPreview fullScreen={true} initialData={portfolioData} />
      </main>
    </div>
  );
}
