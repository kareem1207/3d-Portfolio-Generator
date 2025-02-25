import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "@/lib/dbConnect";
import Portfolio from "@/models/Portfolio";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    await dbConnect();
    const portfolioData = {
      ...req.body,
      userId: session.user.id,
      publishedAt: new Date(),
      status: "published",
    };

    const portfolio = await Portfolio.create(portfolioData);
    return res.status(201).json(portfolio);
  } catch (error) {
    console.error("Publish error:", error);
    return res.status(500).json({ error: "Failed to publish portfolio" });
  }
}
