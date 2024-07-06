const domain = process.env.NEXT_PUBLIC_API_DOMAIN;

export default class ApiDomainService {

  private readonly wsUrl;
  private readonly restUrl;

  constructor() {
    this.wsUrl = this.getUrl(true);
    this.restUrl = this.getUrl(false);
  }

  private getUrl(isWebSocket: boolean): string {
    let api = ""
    if (domain === undefined || domain.includes("localhost")) {
      api = isWebSocket ? "ws://localhost:8080/api/ws" : "http://localhost:8080/api";
    } else {
      api = isWebSocket ? `wss://${domain}/api/ws` : `https://${domain}/api`;
    }
    return api;
  }

  getWebSocketUrl(): string {
    return this.wsUrl;
  }

  getRestUrl(): string {
    return this.restUrl;
  }
}
