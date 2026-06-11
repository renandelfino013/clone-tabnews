function status(req, resp) {
  return resp.status(200).json({ status: "ok" });
}

export default status;
