"use client";

import RestApiService from "@/app/api/rest-api-service";
import Footer from "@/app/components/footer/footer";
import GamePageHeader from "@/app/components/game-page-header/gamePageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Statistic } from "@/app/components/leaderboard-card/leaderboardCard";
import { formatUnits } from "viem";

export default function UserProfile() {
  const [data, setData] = useState<Statistic>({
    averageSpeed: 0,
    completedDuels: 0,
    maxSpeed: 0,
    overallWinsInDuels: 0,
    topSpeeds: [],
    totalReward: 0,
    userId: "",
  });
  const { address } = useAccount();
  const pathname = usePathname();

  async function getUserStat() {
    let restApiService = new RestApiService();
    const data = await restApiService.getStatistic(address as string);
    console.log(typeof data);
    setData(data);
  }
  useEffect(() => {
    if (address) {
      getUserStat();
    }
  }, [pathname]);

  return (
    <>
      <GamePageHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="text-2xl font-semibold mt-2">Dashboard</div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {data && (
            <>
              <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Max Speed
                  </CardTitle>
                  {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data?.maxSpeed} CPM</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Wins In Duels
                  </CardTitle>
                  {/* <Users className="h-4 w-4 text-muted-foreground" /> */}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data?.overallWinsInDuels}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Rewards
                  </CardTitle>
                  {/* <CreditCard className="h-4 w-4 text-muted-foreground" /> */}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data.totalReward
                      ? formatUnits(BigInt(data?.totalReward), 10)
                      : "0"}{" "}
                    ETH
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completed Races
                  </CardTitle>
                  {/* <Activity className="h-4 w-4 text-muted-foreground" /> */}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data?.completedDuels}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +1 since last month
                  </p>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
