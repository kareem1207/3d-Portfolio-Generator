import { getAllPortfolios } from "@/utils/portfolioDb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const portfolios = await getAllPortfolios();
    return res.status(200).json(portfolios);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to fetch example portfolios" });
  }
}
