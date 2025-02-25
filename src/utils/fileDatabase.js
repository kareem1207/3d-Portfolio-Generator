import fs from "fs/promises";
import path from "path";

const DB_DIR = path.join(process.cwd(), "database");
const PORTFOLIOS_FILE = path.join(DB_DIR, "portfolios.json");

// Initialize database
async function initDB() {
  try {
    await fs.mkdir(DB_DIR, { recursive: true });

    // Check if portfolios file exists, if not create it
    try {
      await fs.access(PORTFOLIOS_FILE);
    } catch {
      await fs.writeFile(PORTFOLIOS_FILE, JSON.stringify([]));
    }
  } catch (error) {
    console.error("Database initialization error:", error);
  }
}

// Portfolio operations
async function savePortfolio(portfolioData) {
  try {
    const portfolios = await readPortfolios();
    portfolios.push(portfolioData);
    await fs.writeFile(PORTFOLIOS_FILE, JSON.stringify(portfolios, null, 2));
    return portfolioData;
  } catch (error) {
    throw new Error("Failed to save portfolio: " + error.message);
  }
}

async function readPortfolios() {
  try {
    const data = await fs.readFile(PORTFOLIOS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function getPortfolioById(id) {
  const portfolios = await readPortfolios();
  return portfolios.find((p) => p.portfolioId === id);
}

// Initialize DB on module load
initDB();

export { savePortfolio, readPortfolios, getPortfolioById };
