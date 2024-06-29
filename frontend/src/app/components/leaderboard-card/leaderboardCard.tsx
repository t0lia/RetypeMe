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
import { useAccount } from "wagmi";

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
  const { chainId } = useAccount();
  const chainBlockExplorerLinks: Record<number, string> = {
    // 5611: "https://opbnb-testnet.bscscan.com/address/",
    // 168587773: "https://testnet.blastscan.io/address/",
    84532: "https://sepolia.basescan.org/address/",
  };

  useEffect(() => {
    let api = new RestApiService();
    api.getLeaderBoard().then((data: LeaderboardEntry[]) => {
      setLeaderboard(data);
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
                  <TableRow
                    key={index}
                    className="flex justify-between font-mono"
                  >
                    <TableCell className="p-1 w-6">{place}.</TableCell>
                    <TableCell className="p-1 flex-grow">
                      <Link
                        href={
                          chainId
                            ? chainBlockExplorerLinks[chainId] + entry.userId
                            : ""
                        }
                        target="_blank"
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
