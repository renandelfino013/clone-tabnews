const dotenv = require("dotenv");
dotenv.config({ path: ".env.development" });

const nextjest = require("next/jest");
const createjestConfig = nextjest({
  dir: ".",
});
const jestConfig = createjestConfig({
  moduleDirectories: ["node_modules", "<rootDir>/"],
});
module.exports = jestConfig;
