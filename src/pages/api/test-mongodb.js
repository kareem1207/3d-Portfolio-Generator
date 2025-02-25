import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    // Attempt to connect
    console.log("Testing MongoDB connection...");
    const client = await clientPromise;

    // Get database information
    const adminDb = client.db().admin();
    const dbInfo = await adminDb.listDatabases();

    // Test writing to a test collection
    const testDb = client.db("portfolioApp");
    const testCollection = testDb.collection("connectionTests");

    const testResult = await testCollection.insertOne({
      test: "Connection test",
      timestamp: new Date(),
    });

    return res.status(200).json({
      status: "success",
      message: "MongoDB connection is working correctly",
      databases: dbInfo.databases.map((db) => db.name),
      writeTest: testResult.acknowledged ? "success" : "failed",
    });
  } catch (error) {
    console.error("MongoDB connection test failed:", error);

    // Format error response based on error type
    let errorResponse = {
      status: "error",
      message: "MongoDB connection failed",
      error: error.message,
    };

    // Add specific error details for different MongoDB errors
    if (error.name === "MongoServerError") {
      errorResponse.errorCode = error.code;
      errorResponse.errorCodeName = error.codeName;

      if (error.code === 8000) {
        errorResponse.solution =
          "Your MongoDB credentials are incorrect. Please check your username and password in .env.local";
      } else if (error.code === 13) {
        errorResponse.solution =
          "You don't have sufficient permissions for this database operation";
      }
    } else if (error.name === "MongoNetworkError") {
      errorResponse.solution =
        "Check your network connection and MongoDB Atlas network settings";
    }

    return res.status(500).json(errorResponse);
  }
}
