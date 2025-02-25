import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "@/styles/examples.module.css";

export default function ExamplesPage() {
  const [examples, setExamples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExamples() {
      try {
        const response = await fetch("/api/portfolio/examples");
        if (response.ok) {
          const data = await response.json();
          setExamples(data);
        }
      } catch (error) {
        console.error("Failed to load examples:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchExamples();
  }, []);

  if (loading) return <div className={styles.loading}>Loading examples...</div>;

  return (
    <div className={styles.container}>
      <h1>Example Portfolios</h1>

      {examples.length === 0 ? (
        <p className={styles.noExamples}>
          No example portfolios available yet.
        </p>
      ) : (
        <div className={styles.portfolioGrid}>
          {examples.map((example) => (
            <Link
              href={`/portfolio/${example.portfolioId}`}
              key={example.portfolioId}
              className={styles.portfolioCard}
            >
              <h2>{example.userData.name}</h2>
              <p>{example.userData.title}</p>
              <span className={styles.date}>
                Created: {new Date(example.createdAt).toLocaleDateString()}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
