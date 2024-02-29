import { formatWallet } from "@/app/helpers";
import { DriverMetrics, RaceStatistic } from "@/app/api/ws-api-service";

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
              key={driver.userId}
              className="w-[700px] relative bg-gray-300 border-2 border-gray-500 rounded-sm h-8 overflow-hidden"
            >
              <div
                key={driver.userId}
                className="bg-blue-300 h-full transition-all duration-200"
                style={{ width: `${driver.progress}%` }}
              >
                <span className="ml-1">
                  {sessionStat.users.map((userSession) => {
                    if (userSession.userId === driver.userId)
                      return userSession.walletId
                        ? formatWallet(userSession.walletId)
                        : formatWallet(driver.userId);
                  })}
                  {driver.userId === ingameUserId && "(you)"}
                </span>
              </div>
              <span className="absolute right-0 top-0 mr-1">
                {driver.progress === 100 && driver.place === 1 && (
                  <>
                    <span>🎉 CPM: </span>
                    <b className="font-semibold">{driver.cpm}</b>
                    <span> Place: 🥇</span>
                  </>
                )}
                {driver.progress === 100 && driver.place === 2 && (
                  <>
                    <span>🎉 CPM: </span>
                    <b className="font-semibold">{driver.cpm}</b>
                    <span> Place: 🥈</span>
                  </>
                )}
                {driver.progress === 100 && driver.place === 3 && (
                  <>
                    <span>🎉 CPM: </span>
                    <b className="font-semibold">{driver.cpm}</b>
                    <span> Place: 🥉</span>
                  </>
                )}
                {driver.progress === 100 &&
                  driver.place !== undefined &&
                  driver.place > 3 && (
                    <>
                      <span>CPM: </span>
                      <b className="font-semibold">{driver.cpm}</b>
                      <span>
                        {" "}
                        Place: <b>{driver.place} 😭</b>
                      </span>
                    </>
                  )}
              </span>
            </div>
          ))
        : sessionStat?.users?.map((driver) => {
            return (
              <div
                className="w-[700px] bg-gray-300 border-2 border-gray-500 rounded-sm h-8"
                key={driver.userId}
              >
                <span className="ml-1">
                  {driver.userId === ingameUserId && ingameWalletId
                    ? formatWallet(ingameWalletId)
                    : formatWallet(
                        driver.walletId ? driver.walletId : driver.userId
                      )}{" "}
                  {driver.userId === ingameUserId ? "(you)" : ""}
                </span>
              </div>
            );
          })}
    </div>
  );
}
