import { generateAllOgpImages } from "./ogp-generator";

generateAllOgpImages().catch((error) => {
  console.error("Error generating OGP images:", error);
  process.exit(1);
});
