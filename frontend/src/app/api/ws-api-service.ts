import { Client, Message } from "@stomp/stompjs";
import ApiDomainService from "@/app/api/api-domain-service";

export interface CountDown {
  id: string;
  count: number;
  text: string;
}

export interface DriverMetrics {
  sessionId: string;
  userId: string;
  walletId: string;
  cpm?: number;
  progress?: number;
  place?: number;
  state?: string;
}

export interface RaceStatistic {
  id: string;
  users: DriverMetrics[];
}

export default class WsApiService {
  private readonly stompClient: Client;
  private readonly sessionId: string;

  constructor(
    sessionId: string,
    userId: string,
    walletId: string,
    countDownHandler: (countDown: CountDown) => void,
    progressHandler: (stat: RaceStatistic) => void,
    onRacePrepareHandler: (reg: RaceStatistic) => void
  ) {
    const API_URL: string = new ApiDomainService().getWebSocketUrl();
    console.log("api url: " + API_URL);
    this.sessionId = sessionId;
    this.stompClient = new Client({ brokerURL: API_URL });

    this.stompClient.onConnect = (frame) => {
      console.log("Connected: " + frame);

      this.stompClient.subscribe(
        "/topic/" + sessionId + "/registration",
        (response: Message) => {
          onRacePrepareHandler(JSON.parse(response.body));
        }
      );

      this.stompClient.subscribe(
        "/topic/" + sessionId + "/progress",
        (response: Message) => {
          progressHandler(JSON.parse(response.body));
        }
      );

      this.stompClient.subscribe(
        "/topic/" + sessionId + "/countdown",
        (countdown: Message) => {
          countDownHandler(JSON.parse(countdown.body));
        }
      );

      this.join(userId, walletId);
    };
    this.stompClient.activate();
    console.log("stomp activated");
  }

  public sendStat(userId: string, walletId: string, progress: number): void {
    const userStat: DriverMetrics = {
      sessionId: this.sessionId,
      userId: userId,
      walletId: walletId ?? "",
      cpm: 0,
      progress: progress,
      place: 0,
      state: "",
    };
    let body = JSON.stringify(userStat);
    console.log("send stat: " + body);
    this.stompClient.publish({
      destination: "/app/stat",
      body: JSON.stringify(userStat),
    });
  }

  public join(userId: string, walletId: string): void {
    console.log("ws: session joined user:" + userId);
    this.sendUserState(userId, walletId, this.sessionId, "joined");
  }

  public register(userId: string, walletId: string): void {
    console.log("ws: session register user:" + userId);
    this.sendUserState(userId, walletId, this.sessionId, "registered");
  }

  private sendUserState(
    userId: string,
    walletId: string,
    sessionId: string,
    state: string
  ): void {
    const userStat: DriverMetrics = {
      sessionId,
      userId,
      walletId,
      state,
    };

    let body = JSON.stringify(userStat);
    console.log("send join: " + body);
    this.stompClient.publish({
      destination: "/app/reg",
      body: JSON.stringify(userStat),
    });
  }
}
