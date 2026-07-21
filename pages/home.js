import { useEffect } from "react";

function home() {
  async function callApi() {
    let resp = await fetch("http://localhost:3000/api/v1/status");
    let jsonresp = await resp.json();
    console.log(jsonresp);
    return <div>{JSON.stringify(jsonresp)}</div>;
  }

  return (
    <div>
      <h1>o amanhã é a consequência do hoje</h1>
    </div>
  );
}

export default home;
