export async function CREATE(players:any) {
  const res = await fetch("http://localhost:8080/api/sessions", {
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
  const res = await fetch(`http://localhost:8080/api/sessions/${id}/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return Response.json(data);
}
