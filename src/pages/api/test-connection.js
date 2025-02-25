import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    // Test the connection
    const client = await clientPromise;
    const db = client.db("portfolioApp");

    // Ping the database
    await db.command({ ping: 1 });

    return res.status(200).json({
      status: "success",
      message: "MongoDB connection successful!",
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to connect to MongoDB",
      error: error.message,
    });
  }
}
