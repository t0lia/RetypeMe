import ApiDomainService from "@/app/api/api-domain-service";

type PlayersInput = {
  players: number;
};

export default class RestApiService {
  private readonly apiUrl: string;

  constructor() {
    this.apiUrl = new ApiDomainService().getRestUrl();
  }

  async create<T>(players: PlayersInput): Promise<T> {
    const res = await fetch(`${this.apiUrl}/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(players),
    });

    const data = await res.json();
    return data as T;
  }

  async join<T>(id: string, userId: string | null): Promise<T> {
    const res = await fetch(`${this.apiUrl}/sessions/${id}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }),
    });

    const data = await res.json();
    return data as T;
  }

  async getVersion(): Promise<string> {
    const res = await fetch(`${this.apiUrl}/actuator/info`);
    const tagData = await res.json();
    return tagData.git.closest.tag.name;
  }
}
