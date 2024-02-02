import RestApiService from "@/app/api/RestApiService";

export async function handleCreateNewGameSession() {
  const response = await new RestApiService().create({ players: 2 });
  const data = await response.json();

  if (data) {
    return data;
  }
}
