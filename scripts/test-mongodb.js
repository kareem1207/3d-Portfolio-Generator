// Simple script to test MongoDB connection
const { testMongoConnection } = require("../src/utils/mongo-test");

console.log("Testing MongoDB connection...");
testMongoConnection()
  .then((result) => {
    console.log("\nConnection Test Results:");
    console.log(JSON.stringify(result, null, 2));

    if (result.success) {
      console.log("\n✅ MongoDB connection successful!");
      console.log("Available databases:", result.databases.join(", "));
    } else {
      console.log("\n❌ MongoDB connection failed!");
      if (result.solution) {
        console.log("Suggested solution:", result.solution);
      }
    }
  })
  .catch((err) => console.error("Unexpected error:", err))
  .finally(() => process.exit());
