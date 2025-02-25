import clientPromise from "@/lib/mongodb";

export async function savePortfolio(portfolioData) {
  const client = await clientPromise;
  const db = client.db("portfolioApp");

  const result = await db.collection("portfolios").insertOne(portfolioData);
  return { ...portfolioData, _id: result.insertedId };
}

export async function getPortfolioById(id) {
  const client = await clientPromise;
  const db = client.db("portfolioApp");

  return await db.collection("portfolios").findOne({ portfolioId: id });
}

export async function getAllPortfolios() {
  const client = await clientPromise;
  const db = client.db("portfolioApp");

  return await db
    .collection("portfolios")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
}
