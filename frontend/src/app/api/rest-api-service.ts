import ApiDomainService from "@/app/api/api-domain-service";
import {SessionsData} from "@/app/helpers/create-new-game-session";

type PlayersInput = {
  players: number;
};

type SiweSession = {
  address: string;
  chainId: number;
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
      credentials: 'include',
    });

    const data = await res.json();
    return data as T;
  }

  async getGameSession(id: string): Promise<SessionsData> {
    const res = await fetch(`${this.apiUrl}/sessions/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    });

    const data = await res.json();
    return data as SessionsData;
  }

  async getLeaderBoard(): Promise<any> {
    const res = await fetch(`${this.apiUrl}/statistics/leaderboard?limit=10`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    });

    const data = await res.json();
    return data as SessionsData;
  }

  async join<T>(id: string, userId: string | null): Promise<T> {
    const res = await fetch(`${this.apiUrl}/sessions/${id}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userId: userId}),
      credentials: 'include',
    });

    const data = await res.json();
    return data as T;
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
    return await fetch(`${this.apiUrl}/nonce`, {credentials: 'include'})
      .then(response => response.text());
  };

  async getSiweSession():Promise<SiweSession> {
    const apiUrl = new ApiDomainService().getRestUrl();
    return fetch(`${apiUrl}/siwe/session`, {
      credentials: "include",
    }).then((res) => (res.ok ? res.json() : null));
  };

  async sendLoginData(address: string, signature: string) {
    await fetch(`${this.apiUrl}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({address, signature}),
      credentials: 'include'
    }).then((response) => {
      if (response.ok) {
        console.log('Login successful');
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
