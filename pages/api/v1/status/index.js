import { query } from "../../../../infra/database";
async function status(req, resp) {
  const result = await query("select 1 + 1;");
  console.log(result[0]);
  return resp.status(200).json({ status: "ok" });
}

export default status;
