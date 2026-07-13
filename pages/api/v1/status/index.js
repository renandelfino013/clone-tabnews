import db from "infra/database";
async function status(req, resp) {
  const updated_at = new Date().toISOString();
  const pgversion = await db.query("SHOW server_version;");
  const max_c = await db.query("SHOW max_connections");
  const active_c = await db.query(
    "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1",
    [process.env.POSTGRES_DB],
  );
  console.log("active connections", active_c);
  const active_c_text = active_c[0].count;
  const active_c_number = parseFloat(active_c_text);

  const max_c_text = max_c[0].max_connections;
  const max_c_number = parseFloat(max_c_text);
  const versiontext = pgversion[0].server_version;
  const vnumber = parseFloat(versiontext);
  return resp.status(200).json({
    updated_at: updated_at,
    dependencies: {
      database: {
        postgres_version: versiontext,
        max_connections: max_c_number,
        active_connections: active_c_text,
        teste:"branch de teste"
      },
    },
  });
}

export default status;
