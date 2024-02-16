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
    if (
      process.env.NODE_ENV === "production" &&
      this.uiDomain !== "localhost"
    ) {
      let domain = this.domains.get(this.uiDomain);
      return `${isWebSocket ? "wss" : "https"}://${domain}/api${
        isWebSocket ? "/ws" : ""
      }`;
    }
    return `${isWebSocket ? process.env.API_WS : process.env.API_REST}/api${
      isWebSocket ? "/ws" : ""
    }`;
  }

  getWebSocketUrl(): string {
    return this.getUrl(true);
  }

  getRestUrl(): string {
    return this.getUrl(false);
  }
}
