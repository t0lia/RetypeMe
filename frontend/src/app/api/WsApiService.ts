import { Client } from "@stomp/stompjs";
import ApiDomainService from "@/app/api/ApiDomainService";

export interface CountDown {
  id: string;
  count: number;
  text: string;
}

export interface User {
  id: string;
  cpm: number;
  progress: number;
  place: number;
}

export interface SessionStat {
  id: string;
  users: Array<User>;
}

export interface UserStat {
  sessionId: string;
  userId: string;
  progress: number;
}

export default class WsApiService {
  private readonly stompClient: Client;
  private readonly sessionId: string;

  constructor(
    sessionId: string,
    userId: string,
    countDownHandler: (countDown: CountDown) => void,
    progressHandler: (stat: SessionStat) => void,
    onRegistrationReceivedHandler: (reg: any) => void
  ) {
    const API_URL: string = new ApiDomainService().getWebSocketUrl();
    console.log("api url: " + API_URL);
    this.sessionId = sessionId;
    this.stompClient = new Client({ brokerURL: API_URL });

    this.stompClient.onConnect = (frame) => {
      console.log("Connected: " + frame);

      this.stompClient.subscribe(
        "/topic/" + sessionId + "/registration",
        (response: any) => {
          onRegistrationReceivedHandler(JSON.parse(response.body));
        }
      );

      this.stompClient.subscribe(
        "/topic/" + sessionId + "/progress",
        (response: any) => {
          progressHandler(JSON.parse(response.body));
        }
      );

      this.stompClient.subscribe(
        "/topic/" + sessionId + "/countdown",
        (countdown: any) => {
          countDownHandler(JSON.parse(countdown.body));
        }
      );

      this.join(userId);
    };
    this.stompClient.activate();
    console.log("stomp activated");
  }

  public sendStat(userId: string, progress: number): void {
    const userStat: UserStat = { sessionId: this.sessionId, userId, progress };
    let body = JSON.stringify(userStat);
    console.log("send stat: " + body);
    this.stompClient.publish({
      destination: "/app/stat",
      body: JSON.stringify(userStat),
    });
  }

  public join(userId: string): void {
    console.log("ws: session joined user:" + userId);
    this.action(userId, this.sessionId, "joined");
  }

  public register(userId: string): void {
    console.log("ws: session register user:" + userId);
    this.action(userId, this.sessionId, "registered");
  }

  private action(userId: string, sessionId: string, state: string): void {
    const userStat: any = { sessionId, userId, state };

    let body = JSON.stringify(userStat);
    console.log("send join: " + body);
    this.stompClient.publish({
      destination: "/app/reg",
      body: JSON.stringify(userStat),
    });
  }
}
