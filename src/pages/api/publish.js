import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import dbConnect from "@/lib/dbConnect";
import Portfolio from "@/models/Portfolio";

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    await dbConnect();

    const { templateId, settings, userData } = req.body;

    // Ensure models array is properly formatted
    const formattedSettings = {
      ...settings,
      models:
        settings.models?.map((model) => ({
          type: String(model.type),
          scale: Number(model.scale || 1),
        })) || [],
    };

    const portfolioData = {
      userId: session.user.id,
      templateId,
      settings: formattedSettings,
      userData,
      publishedAt: new Date(),
      status: "published",
    };

    const portfolio = await Portfolio.create(portfolioData);
    return res.status(201).json(portfolio);
  } catch (error) {
    console.error("Publish error:", error);
    return res.status(500).json({
      error: error.message || "Failed to publish portfolio",
    });
  }
}
