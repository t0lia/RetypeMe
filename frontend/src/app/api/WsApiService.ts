import {Client} from "@stomp/stompjs";

export interface CountDown {
  id: string;
  count: number;
}

export interface User {
  id: string,
  progress: number
}

export interface SessionStat {
  id: string,
  users: Array<User>
}

export interface UserStat {
  sessionId: string,
  userId: string,
  progress: number
}


export default class WsApiService {
  private static readonly API_URL: string = 'ws://localhost:8080/api/gs-guide-websocket';

  private readonly stompClient: Client;
  private readonly sessionId: string;

  constructor(sessionId: string,
              countDownHandler: (countDown: CountDown) => void,
              progressHandler: (stat: SessionStat) => void) {

    this.sessionId = sessionId;
    this.stompClient = new Client({brokerURL: WsApiService.API_URL});

    this.stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);

      this.stompClient.subscribe('/topic/' + sessionId + '/progress', (response: any) => {
        progressHandler(JSON.parse(response.body));
      });

      this.stompClient.subscribe('/topic/' + sessionId + '/countdown', (countdown: any) => {
        countDownHandler(JSON.parse(countdown.body));
      });
    };
    this.stompClient.activate();
  }

  public sendStat(userId: string, progress: number): void {
    const userStat: UserStat = {sessionId: this.sessionId, userId, progress};
    this.stompClient.publish({destination: "/app/stat", body: JSON.stringify(userStat)});
  }

}