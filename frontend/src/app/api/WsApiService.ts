import { Client } from "@stomp/stompjs";

export interface CountDown {
  id: string;
  count: number;
}

export interface User {
  id: string;
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
    countDownHandler: (countDown: CountDown) => void,
    progressHandler: (stat: SessionStat) => void
  ) {
    const API_URL: string = `${process.env.API_WS}/api/ws`;
    console.log("api url: " + API_URL);
    this.sessionId = sessionId;
    this.stompClient = new Client({ brokerURL: API_URL });

    this.stompClient.onConnect = (frame) => {
      console.log("Connected: " + frame);

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
    };
    this.stompClient.activate();
  }

  public sendStat(userId: string, progress: number): void {
    const userStat: UserStat = { sessionId: this.sessionId, userId, progress };
    this.stompClient.publish({
      destination: "/app/stat",
      body: JSON.stringify(userStat),
    });
  }
}
