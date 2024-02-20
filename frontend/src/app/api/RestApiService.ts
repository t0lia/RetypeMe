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
      body: JSON.stringify({userId: userId}),
    });

    const data = await res.json();
    return Response.json(data);
  }

  async getVersion(): Promise<string> {
    const res = await fetch(`${this.apiUrl}/actuator/info`);
    const tagData = await res.json();
    return tagData.git.closest.tag.name;
  }

  async fetchAuthData() {
    try {
      const response = await fetch(`${this.apiUrl}/auth`, {credentials: 'include'});
      return await response.json();
    } catch (error) {
      console.error('Error fetching API data:', error);
    }
  };

  async getNonce(address: string) {
    return await fetch(`${this.apiUrl}/nonce/${address}`, {credentials: 'include'})
      .then(response => response.text());
  };

  async sendLoginData(address: string, signature: string) {
    await fetch(`${this.apiUrl}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: new URLSearchParams({
        address: encodeURIComponent(address),
        signature: encodeURIComponent(signature),
      }),
      credentials: 'include'
    }).then((response) => {
      if (response.ok) {
        console.log('Login successful');
        window.location.href = response.url;
      } else {
        console.log('Login error');
      }
    });
  };

  async logout() {
    await fetch(`${this.apiUrl}/logout`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      credentials: 'include'
    }).then((response) => {
      if (response.ok) {
      } else {
      }
    });
  }
}
