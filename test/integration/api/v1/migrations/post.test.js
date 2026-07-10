import db from "infra/database.js";
async function cleandb() {
  await query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
}
async function migrationscomplete() {
  let result = await db.query("SELECT * FROM pgmigrations;");
  return result;
}

test("Post /api/v1/migrations (exist migrations to make apply?)", async () => {
  const result = await fetch("http://localhost:3000/api/v1/migrations/", {
    method: "POST",
    headers: {
      "Content-Type": "Aplication/json",
    },
    body: JSON.stringify({
      teste: "TESTE",
    }),
  });

  const responsebody = await result.json();
  if (result.status === 201) {
    expect(result.status).toBe(201);
    expect(Array.isArray(responsebody)).toBe(true);

    console.log("Migrations applied successfully ", result.status);
  } else {
    expect(result.status).toBe(200);
    console.log("No migrations to apply: ", result.status);
  }
});
test("this is a test to check if migrations were applied", async () => {
  let result = await migrationscomplete();
  if (result.length > 0) {
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    result.forEach((migration) => {
      expect(migration).toHaveProperty("run_on");
    });
    console.log("this is Migrations applied successfully:", result);
  } else {
    throw new Error("No migrations were applied");
  }
});
