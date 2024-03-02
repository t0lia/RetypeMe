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
    console.log("domain: " + this.uiDomain);
    let domain = this.domains.get(this.uiDomain);
    if (domain === undefined) {
      return isWebSocket? "ws://localhost:8080/api/ws" : "http://localhost:8080/api";
    }
    return isWebSocket? `wss://${domain}/api/ws` : `https://${domain}/api`;
  }

  getWebSocketUrl(): string {
    return this.getUrl(true);
  }

  getRestUrl(): string {
    return this.getUrl(false);
  }
}
