import { useEffect, useState } from "react";
import RestApiService from "@/app/api/rest-api-service";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/app/components/ui/table";
import { formatWallet } from "@/app/helpers";

export interface LeaderboardEntry {
  userId: string;
  speed: number;
}

export interface Statistic {
  averageSpeed: number;
  completedDuels: number;
  maxSpeed: number;
  overallWinsInDuels: number;
  topSpeeds: number[];
  totalReward: number;
  userId: string;
}

export function LeaderboardCard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    let api = new RestApiService();
    api.getLeaderBoard().then((data: LeaderboardEntry[]) => {
      setLeaderboard(data);
      console.log(data);
    });
    api.getStatistic("add user here")
      .then((data) => {
        console.log(data);
      });

  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody className="flex flex-col flex-grow">
            {Array.from(
              new Map(leaderboard.map((obj) => [obj.userId, obj])).values()
            )
              .sort((a, b) => +b.speed - +a.speed)
              .map((entry, index) => {
                let place = index + 1;
                return (
                  <TableRow key={index} className="flex justify-between">
                    <TableCell className="p-1 w-auto">{place}.</TableCell>
                    <TableCell className="p-1 flex-grow">
                      {formatWallet(entry.userId)}
                    </TableCell>
                    <TableCell className="p-1 text-end w-auto">
                      {entry.speed} CPM
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
