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

export function LeaderboardCard() {
  const [leaderboard, setLeaderboard] = useState([
    { userId: "0x0000000000000000", speed: "123" },
    { userId: "0x00000000sadfsdf4324r", speed: "200" },
    { userId: "0x0000000000000000", speed: "45" },
    { userId: "0x000000fa4000asdf002", speed: "201" },
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
                    <TableCell className="p-1 w-10">{place}.</TableCell>
                    <TableCell className="p-1 flex-grow">
                      {entry.userId}
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
