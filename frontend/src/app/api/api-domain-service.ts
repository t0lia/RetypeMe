export default class apidomainservice {

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

  public getWebSocketUrl(): string {
    let domain = this.domains.get(this.uiDomain);
    if (domain === undefined) {
      return `ws://localhost:8080/api`;
    }
    return `wss://${domain}/api/ws`;
  }

  public getRestUrl(): string {
    let domain = this.domains.get(this.uiDomain);
    if (domain === undefined) {
      return `http://localhost:8080/api`;
    }
    return `https://${domain}/api`;
  }
}
