export default async function cleandb() {
  await query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
}
