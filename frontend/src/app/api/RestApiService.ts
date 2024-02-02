import ApiDomainService from "@/app/api/ApiDomainService";

export default class RestApiService {
  private readonly apiUrl: string;

  constructor() {
    this.apiUrl = new ApiDomainService().getRestUrl();
  }

  async create(players: any): Promise<any> {
    const res = await fetch(`${this.apiUrl}/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(players),
    });

    const data = await res.json();
    return Response.json(data);
  }

  async join(id: string, userId: string | null): Promise<any> {
    const res = await fetch(`${this.apiUrl}/sessions/${id}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }),
    });

    const data = await res.json();
    return Response.json(data);
  }

  async getVersion(): Promise<string> {
    const res = await fetch(`${this.apiUrl}/actuator/info`);
    const tagData = await res.json();
    return tagData.git.closest.tag.name;
  }
}
