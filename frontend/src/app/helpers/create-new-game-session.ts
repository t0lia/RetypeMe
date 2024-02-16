import RestApiService from "@/app/api/rest-api-service";

interface SessionsData {
  id: string;
  players: number;
}

export async function handleCreateNewGameSession(): Promise<SessionsData | null> {
  try {
    const data: SessionsData = await new RestApiService().create<SessionsData>({
      players: 2,
    });

    return data;
  } catch (error) {
    console.error("Error creating new game session:", error);
    return null;
  }
}
