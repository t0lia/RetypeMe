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

interface LeaderboardEntry {
  userId: string;
  speed: number;
}

export function LeaderboardCard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    { userId: "0x470Eb274064Dc3134470DC0CB85f7c6E87164C18", speed: 434 },
  ]);

  useEffect(() => {
    new RestApiService().getLeaderBoard().then((data) => {
      setLeaderboard(data);
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
