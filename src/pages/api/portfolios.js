import { getSession } from "next-auth/react";
import dbConnect from "@/lib/dbConnect";
import Portfolio from "@/models/Portfolio";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  await dbConnect();

  if (req.method === "POST") {
    try {
      const portfolio = await Portfolio.create({
        userId: session.user.id,
        ...req.body,
      });
      return res.status(201).json(portfolio);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  if (req.method === "GET") {
    try {
      const portfolios = await Portfolio.find({ userId: session.user.id }).sort(
        { createdAt: -1 }
      );
      return res.status(200).json(portfolios);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
