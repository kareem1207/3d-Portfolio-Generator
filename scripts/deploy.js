const { execSync } = require("child_process");

const deploy = async () => {
  try {
    // Generate Prisma Client
    execSync("npm run prisma:generate", { stdio: "inherit" });

    // Build the application
    execSync("npm run build", { stdio: "inherit" });

    // Deploy to Vercel
    execSync("vercel --prod", { stdio: "inherit" });

    console.log("🚀 Deployment successful!");
  } catch (error) {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  }
};

deploy();
