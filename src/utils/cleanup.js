import fs from "fs/promises";
import path from "path";

const filesToDelete = [
  "/d:/3d-Portfolio-Generator/src/utils/modelValidator.js",
  "/d:/3d-Portfolio-Generator/PROJECT.md",
];

async function removeFiles() {
  for (const filePath of filesToDelete) {
    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
      console.log(`Successfully deleted: ${path.basename(filePath)}`);
    } catch (error) {
      console.error(
        `Error deleting ${path.basename(filePath)}: ${error.message}`
      );
    }
  }
}

removeFiles().catch(console.error);
