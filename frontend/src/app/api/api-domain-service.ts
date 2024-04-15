export default class ApiDomainService {
  private readonly uiDomain: string;
  private readonly domains: Map<string, string>;

  constructor() {
    this.uiDomain = window.location.hostname;
    this.domains = new Map([
      ["retypeme.apozdniakov.com", "retypeme-api.apozdniakov.com"],
      ["retypeme.vercel.app", "retypeme-api.apozdniakov.com"],
      ["retypeme.xyz", "app.retypeme.xyz"],
    ]);
  }

  private getUrl(isWebSocket: boolean): string {
    let domain = this.domains.get(this.uiDomain);
    let api = ""
    if (domain === undefined) {
      api = isWebSocket ? "ws://localhost:8080/api/ws" : "http://localhost:8080/api";
    } else {
      api = isWebSocket ? `wss://${domain}/api/ws` : `https://${domain}/api`;
    }
    return api;
  }

  getWebSocketUrl(): string {
    return this.getUrl(true);
  }

  getRestUrl(): string {
    return this.getUrl(false);
  }
}
