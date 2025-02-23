const { execSync } = require("child_process");

const setupDatabase = async () => {
  try {
    // Create database
    execSync('psql -U postgres -c "CREATE DATABASE portfolio_db;"', {
      stdio: "inherit",
    });

    // Generate Prisma client
    execSync("npx prisma generate", { stdio: "inherit" });

    // Push schema to database
    execSync("npx prisma db push", { stdio: "inherit" });

    console.log("✅ Database setup completed successfully");
  } catch (error) {
    console.error("❌ Database setup failed:", error.message);
    process.exit(1);
  }
};

setupDatabase();
