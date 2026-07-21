
import { query } from "infra/database.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.development" });

import orchestrator from "test/orchestrator.js"

beforeAll(async () => {
  await orchestrator.waitForAllServices()
})
async function cleandb() {
  await query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
}
test("Get /api/v1/migrations should return 200", async () => {
  const result = await fetch("http://localhost:3000/api/v1/migrations/");

  const responsebody = await result.json();
  console.log(responsebody);
  expect(result.status).toBe(200);

  expect(Array.isArray(responsebody)).toBe(true);
  expect(responsebody.length).toBeGreaterThanOrEqual(0);
});
