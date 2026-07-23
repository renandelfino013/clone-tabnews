/* eslint-disable @typescript-eslint/no-var-requires */

const dotenv = require("dotenv");
dotenv.config({ path: ".env.development" });

const nextjest = require("next/jest");
const createjestConfig = nextjest({
  dir: ".",
});
const jestConfig = createjestConfig({
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testTimeout: 80000,
});
module.exports = jestConfig;
