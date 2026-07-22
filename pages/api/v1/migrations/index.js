import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import db from "infra/database.js";
async function migrations(req, resp) {
  if (req.method !== "POST" && req.method !== "GET") {
    return resp.status(405).json({
      error: {
        message: "invalid method",
      },
    });
  }
  const dbclient = await db.getnewclient();

  const defaultmgoptions = {
    dbClient: dbclient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };
  try {
    if (req.method === "GET") {
      const migrations = await migrationRunner({
        ...defaultmgoptions,
        dryRun: true,
      });

      const request = req.body;
      const mg = await migrations;
      return resp.status(200).json(mg);
    } else if (req.method === "POST") {
      const migrations = await migrationRunner({
        ...defaultmgoptions,
        dryRun: false,
      });
      if (migrations.length > 0) {
        return resp.status(201).json(migrations);
      } else {
        return resp.status(200).json(migrations);
      }
    }
  } finally {
    await dbclient.end();
  }
}

export default migrations;
