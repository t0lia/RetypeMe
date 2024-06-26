import { formatWallet } from "@/app/helpers";
import { DriverMetrics, RaceStatistic } from "@/app/api/ws-api-service";
import { BasicCar } from "@/app/public/cars/basic-car";

interface IProgressBar {
  userStats: DriverMetrics[];
  sessionStat: RaceStatistic;
  ingameUserId: string | null;
  ingameWalletId: string | null;
}

export default function ProgressBar({
  userStats,
  sessionStat,
  ingameUserId,
  ingameWalletId,
}: IProgressBar) {
  return (
    <div className="flex flex-col gap-2 mb-3">
      <p>Progress</p>
      {userStats.length > 0
        ? userStats.map((driver) => (
            <div
              className="w-[700px] bg-secondary border-2 border-gray-500 rounded-sm h-8 flex relative"
              key={driver.userId}
            >
              <span className="ml-1 align-middle absolute -left-40">
                {driver.userId === ingameUserId && ingameWalletId
                  ? formatWallet(ingameWalletId)
                  : formatWallet(
                      driver.walletId ? driver.walletId : driver.userId
                    )}{" "}
                {driver.userId === ingameUserId ? "(you)" : ""}
              </span>
              <div
                key={driver.userId}
                className="h-full transition-all duration-200 flex overflow-hidden"
                style={{ paddingLeft: `${driver.progress}%` }}
              >
                <BasicCar />
              </div>
              <span className="absolute right-0 top-0 mr-1">
                {driver.progress === 100 && driver.place === 1 && (
                  <>
                    <span className="align-middle">🎉 CPM: </span>
                    <b className="font-semibold align-middle">{driver.cpm}</b>
                    <span className="align-middle"> Place: 🥇</span>
                  </>
                )}
                {driver.progress === 100 && driver.place === 2 && (
                  <>
                    <span className="align-middle">🎉 CPM: </span>
                    <b className="font-semibold align-middle">{driver.cpm}</b>
                    <span className="align-middle"> Place: 🥈</span>
                  </>
                )}
                {driver.progress === 100 && driver.place === 3 && (
                  <>
                    <span className="align-middle">🎉 CPM: </span>
                    <b className="font-semibold align-middle">{driver.cpm}</b>
                    <span className="align-middle"> Place: 🥉</span>
                  </>
                )}
                {driver.progress === 100 &&
                  driver.place !== undefined &&
                  driver.place > 3 && (
                    <>
                      <span className="align-middle">CPM: </span>
                      <b className="font-semibold align-middle">{driver.cpm}</b>
                      <span className="align-middle">
                        {" "}
                        Place: <b>{driver.place} 😭</b>
                      </span>
                    </>
                  )}
              </span>
            </div>
          ))
        : sessionStat?.users
            ?.filter((driver, index, self) => {
              return (
                self.findIndex((d) => d.userId === driver.userId) === index
              );
            })
            .map((driver) => {
              return (
                <div
                  className="w-[700px] bg-secondary border-2 border-gray-500 rounded-sm h-8 flex relative"
                  key={driver.userId}
                >
                  <span className="ml-1 align-middle absolute -left-40">
                    {driver.userId === ingameUserId && ingameWalletId
                      ? formatWallet(ingameWalletId)
                      : formatWallet(
                          driver.walletId ? driver.walletId : driver.userId
                        )}{" "}
                    {driver.userId === ingameUserId ? "(you)" : ""}
                  </span>
                  <BasicCar />
                </div>
              );
            })}
    </div>
  );
}
