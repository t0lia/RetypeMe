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
import Link from "next/link";

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
    api.getStatistic("add user here").then((data) => {
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
                    <TableCell className="p-1 w-6">{place}.</TableCell>
                    <TableCell className="p-1 flex-grow">
                      <Link
                        href={`https://opbnb-testnet.bscscan.com/address/${entry.userId}`}
                        target="_blanc"
                      >
                        {formatWallet(entry.userId)}
                      </Link>
                    </TableCell>
                    <TableCell className="p-1 text-end w-20">
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
