import { CREATE } from "../api/route";

export async function handleCreateNewGameSession() {
  const response = await CREATE({ players: 2 });
  const data = await response.json();

  if (data) {
    return data;
  }
}
