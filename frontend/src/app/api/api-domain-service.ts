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

  public getWebSocketUrl(): string {
    if (process.env.NODE_ENV === "production" && this.uiDomain !== "localhost") {
      let domain = this.domains.get(this.uiDomain);
      return `wss://${domain}/api/ws`;
    }
    return `${process.env.API_WS}/api/ws`;
  }

  public getRestUrl(): string {
    if (process.env.NODE_ENV === "production" && this.uiDomain !== "localhost") {
      let domain = this.domains.get(this.uiDomain);
      return `https://${domain}/api`;
    }
    return `${process.env.API_REST}/api`;
  }
}
