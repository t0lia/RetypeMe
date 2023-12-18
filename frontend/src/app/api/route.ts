export async function CREATE() {
  const res = await fetch("http://localhost:8080/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return Response.json(data);
}

export async function JOIN(id: string) {
  const res = await fetch(`http://localhost:8080/${id}/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return Response.json(data);
}
