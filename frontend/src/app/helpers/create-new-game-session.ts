import RestApiService from "@/app/api/rest-api-service";

export async function handleCreateNewGameSession() {
  const response = await new RestApiService().create({ players: 2 });
  const data = await response.json();

  if (data) {
    return data;
  }
}
