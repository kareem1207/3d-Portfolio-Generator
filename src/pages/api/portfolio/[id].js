import { getPortfolioById } from "@/utils/portfolioDb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { id } = req.query;
    const portfolio = await getPortfolioById(id);

    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    return res.status(200).json(portfolio);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch portfolio" });
  }
}
