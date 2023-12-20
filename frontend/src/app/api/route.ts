
const API_URL: string = `http://${(process.env.API_HOST)}:${(process.env.API_PORT)}/api`;

export async function CREATE(players:any) {
  const res = await fetch(`${API_URL}/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    } ,
    body: JSON.stringify(players),
  });

  const data = await res.json();

  return Response.json(data);
}

export async function JOIN(id: string) {
  const res = await fetch(`${API_URL}/sessions/${id}/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return Response.json(data);
}
