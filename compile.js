const fs = require("fs/promises");
const path = require("path");

// Arguments passed from action.yml
const entrypoint = process.argv[2] || "main.opy";
const outputDir = process.argv[3] || "dist";
const language = process.argv[4] || "en-US";
const outFileType = process.argv[5] || ".ow";

// Load overpy_standalone dynamically
const overpy = require(path.resolve(".overpy/overpy_standalone.js"));

async function main() {
  const entryPath = path.resolve(entrypoint);
  const outputPath = path.resolve(outputDir, path.basename(entryPath, ".opy") + outFileType);

  try {
    const source = await fs.readFile(entryPath, "utf-8");
    await overpy.readyPromise;
    const compiled = (await overpy.compile(source, language, path.dirname(entryPath), entrypoint)).result;

    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(outputPath, compiled);

    console.log(`Compiled to ${outputPath}`);
  } catch (err) {
    console.error(`Failed to compile: ${err.message}`);
    process.exit(1);
  }
}

main();
