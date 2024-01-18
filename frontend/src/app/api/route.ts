const API_URL: string = `${(process.env.API_REST)}/api`;

export async function CREATE(players: any) {
  const res = await fetch(`${API_URL}/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(players),
  });

  const data = await res.json();

  return Response.json(data);
}

export async function JOIN(id: string, userId: string|null) {
  const res = await fetch(`${API_URL}/sessions/${id}/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({"userId": userId}),
  });

  const data = await res.json();

  return Response.json(data);
}
