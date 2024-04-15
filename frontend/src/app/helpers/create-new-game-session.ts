import RestApiService from "@/app/api/rest-api-service";

export interface SessionsData {
  id: string;
  chain: number;
  players: number;
}

export default async function handleCreateNewGameSession(): Promise<SessionsData | null> {
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
