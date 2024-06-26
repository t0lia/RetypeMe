import { Client, Message } from "@stomp/stompjs";
import ApiDomainService from "@/app/api/api-domain-service";
import RestApiService from "@/app/api/rest-api-service";

export interface CountDown {
  id: string;
  count: number;
  text: string;
}

export interface DriverMetrics {
  sessionId: string;
  chain: number;
  userId: string;
  walletId: string;
  cpm?: number;
  progress?: number;
  place?: number;
  state?: string;
}

export interface RaceStatistic {
  id: string;
  errors: string[];
  users: DriverMetrics[];
}

export default class WsApiService {
  private readonly stompClient: Client;
  private readonly sessionId: string;
  private chain: number = 0;

  constructor(
    sessionId: string,
    userId: string,
    walletId: string,
    countDownHandler: (countDown: CountDown) => void,
    progressHandler: (stat: RaceStatistic) => void,
    onRacePrepareHandler: (reg: RaceStatistic) => void
  ) {
    const API_URL: string = new ApiDomainService().getWebSocketUrl();
    this.sessionId = sessionId;
    this.stompClient = new Client({ brokerURL: API_URL });

    this.stompClient.onConnect = (frame) => {
      console.log("Connected: " + frame);

      this.stompClient.subscribe(
        "/topic/" + sessionId + "/registration",
        (response: Message) => {
          let stat: RaceStatistic = JSON.parse(response.body);
          if (stat.errors.length > 0) {
            const error = stat.errors.join("\n");
            this.stompClient.deactivate().then(() => {
              console.log(
                "To initiate the session, please ensure you're logged in to the correct network.\n" +
                  error
              );
              window.location.href = "/";
            });
          } else {
            onRacePrepareHandler(stat);
          }
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

      new RestApiService().getSiweSession().then((session) => {
        this.chain = session.chainId;
        if (this.chain !== null) {
          this.join(userId, this.chain, walletId);
        }
      });
    };
    this.stompClient.activate();
    console.log("stomp activated");
  }

  public sendStat(userId: string, walletId: string, progress: number): void {
    const userStat: DriverMetrics = {
      sessionId: this.sessionId,
      chain: this.chain,
      userId: userId,
      walletId: walletId,
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

  public join(userId: string, chain: number, walletId: string): void {
    console.log("ws: session joined user:" + userId);
    this.sendUserState(userId, walletId, this.sessionId, chain, "joined");
  }

  public register(userId: string, walletId: string): void {
    console.log("ws: session register user:" + userId);
    this.sendUserState(
      userId,
      walletId,
      this.sessionId,
      this.chain,
      "registered"
    );
  }

  private sendUserState(
    userId: string,
    walletId: string,
    sessionId: string,
    chain: number,
    state: string
  ): void {
    const userStat: DriverMetrics = {
      sessionId,
      chain,
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
