// Using CommonJS syntax for better compatibility with direct Node execution
const { MongoClient } = require("mongodb");

/**
 * Tests the MongoDB connection and returns detailed information
 * @returns {Promise<object>} Connection test results
 */
async function testMongoConnection() {
  // Load environment variables if not already loaded
  require("dotenv").config({ path: ".env.local" });

  if (!process.env.MONGODB_URI) {
    return {
      success: false,
      message: "MongoDB connection failed",
      error: "MONGODB_URI environment variable is not defined",
    };
  }

  let client;
  try {
    console.log("Testing MongoDB connection...");

    const uri = process.env.MONGODB_URI;
    const options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    client = new MongoClient(uri, options);
    await client.connect();

    // Ping the database to verify connection
    await client.db("admin").command({ ping: 1 });

    // Get list of available databases
    const adminDb = client.db().admin();
    const databaseList = await adminDb.listDatabases();

    return {
      success: true,
      message: "MongoDB connection successful",
      databases: databaseList.databases.map((db) => db.name),
      connectionInfo: {
        host: client.options.hosts[0],
        readPreference: client.readPreference.mode,
      },
    };
  } catch (error) {
    console.error("MongoDB connection test failed:", error);

    // Format the error response
    let errorDetails = {
      success: false,
      message: "MongoDB connection failed",
      errorName: error.name,
      errorMessage: error.message,
    };

    // Add specific error information based on error type
    if (error.name === "MongoServerError") {
      errorDetails.errorCode = error.code;
      errorDetails.codeName = error.codeName;

      if (error.code === 8000) {
        errorDetails.solution =
          "Your username or password is incorrect. Check your MongoDB connection string.";
      } else if (error.code === 13) {
        errorDetails.solution =
          "Authentication successful but you don't have access to this database.";
      }
    } else if (error.name === "MongoNetworkError") {
      errorDetails.solution =
        "Network error. Make sure your IP is whitelisted in MongoDB Atlas.";
    }

    return errorDetails;
  } finally {
    if (client) {
      await client.close();
    }
  }
}

// For direct invocation from command line
if (require.main === module) {
  testMongoConnection()
    .then((result) => console.log(JSON.stringify(result, null, 2)))
    .catch((err) => console.error("Unexpected error:", err))
    .finally(() => process.exit());
}

// Export for use with require()
module.exports = { testMongoConnection };
