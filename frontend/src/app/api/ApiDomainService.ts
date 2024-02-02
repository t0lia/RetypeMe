export default class ApiDomainService {

  private domains: Map<string, string> = new Map([
    ["retypeme.apozdniakov.com", "retypeme-api.apozdniakov.com"],
    ["retypeme.vercel.app", "retypeme-api.apozdniakov.com"],
    ["retypeme.xyz", "app.retypeme.xyz"],
  ]);

  public getWebSocketUrl(): string {
    if (process.env.NODE_ENV === "production") {
      let domain = this.domains.get(window.location.hostname);
      return `wss://${domain}/api/ws`;
    }
    return `${process.env.API_WS}/api/ws`;
  }

  public getRestUrl(): string {
    if (process.env.NODE_ENV === "production") {
      let domain = this.domains.get(window.location.hostname);
      return `https://${domain}/api`;
    }
    return `${process.env.API_REST}/api`;
  }
}
