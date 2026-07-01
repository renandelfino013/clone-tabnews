test("Get /api/v1/status", async () => {
  const result = await fetch("http://localhost:3000/api/v1/status/");
  expect(result.status).toBe(200);

  const responsebody = await result.json();

  //active connections
  expect(responsebody.dependencies.database.active_connections).toBeDefined();
  expect(responsebody.dependencies.database.active_connections).toBe(1);
  expect(typeof responsebody.dependencies.database.active_connections).toBe(
    "number",
  );
  expect(
    responsebody.dependencies.database.active_connections,
  ).toBeGreaterThanOrEqual(1);

  //max connect from db
  expect(responsebody.dependencies.database.max_connections).toBeDefined();
  expect(typeof responsebody.dependencies.database.max_connections).toBe(
    "number",
  );
  expect(
    responsebody.dependencies.database.max_connections,
  ).toBeGreaterThanOrEqual(100);
  // Postgres version
  expect(responsebody.dependencies.database.postgres_version).toBeDefined();

  expect(responsebody.updated_at).toBeDefined();
  const parsed_date_at = new Date(responsebody.updated_at).toISOString();
  expect(responsebody.updated_at).toEqual(parsed_date_at);
});
