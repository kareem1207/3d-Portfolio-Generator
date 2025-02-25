import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import useExamplePortfoliosStore from "@/store/examplePortfoliosStore";
import { savePortfolio } from "@/utils/portfolioDb";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { portfolioData } = req.body;

    // Validate required fields
    if (!portfolioData) {
      return res.status(400).json({ error: "Portfolio data is required" });
    }

    // Check for required user data
    if (!portfolioData.userData?.name || !portfolioData.userData?.title) {
      return res.status(400).json({ error: "Name and title are required" });
    }

    // Generate unique ID
    const portfolioId = `portfolio_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    // Use the Vercel deployment URL
    const portfolioUrl = `https://3d-portfolio-generator.vercel.app/portfolio/${portfolioId}`;

    // Structure the data
    const dataToSave = {
      portfolioId,
      portfolioUrl,
      ...portfolioData,
      createdAt: new Date().toISOString(),
    };

    // Save to MongoDB
    const client = await clientPromise;
    const db = client.db("portfoliodb"); // Updated database name
    await db.collection("portfolios").insertOne(dataToSave);

    return res.status(200).json({
      success: true,
      url: portfolioUrl,
      portfolioId,
      message: "Portfolio published successfully!",
    });
  } catch (error) {
    console.error("Publish error:", error);
    return res.status(500).json({
      error: "Failed to publish portfolio",
      details: error.message,
    });
  }
}
