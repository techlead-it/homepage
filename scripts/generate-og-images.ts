import { generateAllOgpImages } from "./ogp-generator";

generateAllOgpImages().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Error generating OGP images:", error);
  process.exit(1);
});
